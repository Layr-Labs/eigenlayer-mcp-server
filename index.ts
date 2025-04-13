import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import 'dotenv/config';

const server = new McpServer({
  name: "EigenLayer Documentation Service",
  version: "1.0.0",
});

server.tool(
  "getEigenDocs",
  {
    query: z.string().describe("The query about EigenLayer documentation"),
    docsPath: z.string().optional().describe("Optional specific documentation path to focus on"),
  },
  async ({ query, docsPath }) => {
    try {
      // Base URL for EigenLayer documentation
      const baseUrl = "https://docs.eigenlayer.xyz";
      
      // Construct the specific URL based on docsPath if provided
      const url = docsPath ? `${baseUrl}/${docsPath}` : baseUrl;
      
      // Fetch the documentation content
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch documentation: ${response.status}`);
      }
      
      const htmlContent = await response.text();
      
      // Process with Claude to extract relevant information
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `
                You are an EigenLayer documentation assistant. Your task is to extract and summarize relevant information from the EigenLayer documentation to answer the user's query.
                
                Here is the HTML content from the EigenLayer documentation (${url}):
                ---
                ${htmlContent}
                ---
                
                User query: ${query}
                
                Provide a detailed, well-structured response that directly addresses the user's query about EigenLayer.
                Focus on being accurate, informative, and comprehensive. Include relevant details, definitions, and explanations.
                If you cannot find information related to the query in the provided documentation, clearly state that.
              `
            }
          ]
        })
      });
      
      const claudeJson = await claudeResponse.json();

      return {
        content: [
          {
            type: "text",
            text: claudeJson.content[0].text,
          },
        ],
      };
    } catch (err: unknown) {
      console.error("Error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return {
        content: [
          {
            type: "text",
            text: `Error fetching EigenLayer documentation: ${errorMessage}`,
          },
        ],
      };
    }
  },
);

// Tool to list available documentation sections
server.tool(
  "listEigenDocsSections",
  {},
  async () => {
    try {
      const response = await fetch("https://docs.eigenlayer.xyz");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch documentation: ${response.status}`);
      }
      
      const htmlContent = await response.text();
      
      // Use Claude to extract the documentation structure
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `
                Analyze the HTML content from the EigenLayer documentation homepage and extract the main documentation sections and their URLs.
                Format your response as a list of sections with their corresponding paths.
                
                HTML content:
                ---
                ${htmlContent}
                ---
                
                Provide a structured list of the main documentation sections available on the EigenLayer docs site.
              `
            }
          ]
        })
      });
      
      const claudeJson = await claudeResponse.json();

      return {
        content: [
          {
            type: "text",
            text: claudeJson.content[0].text,
          },
        ],
      };
    } catch (err: unknown) {
      console.error("Error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return {
        content: [
          {
            type: "text",
            text: `Error listing EigenLayer documentation sections: ${errorMessage}`,
          },
        ],
      };
    }
  },
);


// For local development using stdio
if (process.env.NODE_ENV !== 'production') {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// Export the server instance for use in Vercel API routes
export { server };