import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import 'dotenv/config'

const server = new McpServer({
  name: "EigenLayer AVS service",
  version: "1.0.0",
});

server.tool(
  "getAVSs",
  {
    fullPrompt: z.string().describe("The complete user query about AVS data"),
    avsName: z.string().optional().describe("Optional specific AVS name to focus on"),
  },
  async ({ fullPrompt, avsName }) => {
    try {
      const response = await fetch('https://api.eigenexplorer.com/avs', {
        headers: {
          'X-API-Token': process.env.EIGEN_EXPLORER_API_KEY || '',
        }
      })
      const json = await response.json()
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-7-sonnet-20250219',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `
                You are an EigenLayer AVS data assistant. Your task is to analyze AVS data and respond to user queries.
                
                Here is the AVS data from the EigenExplorer API:
                ${JSON.stringify(json, null, 2)}
                
                User query: ${fullPrompt}

                AVS name: ${avsName}
                
                Provide a detailed, well-structured response that directly addresses the user's query about the AVS data.
                Focus on being accurate, informative, and comprehensive.
              `
            }
          ]
        })
      })
      const claudeJson = await claudeResponse.json()

      return {
        content: [
          {
            type: "text",
            text: `${claudeJson.content[0].text}`,
          },
        ],
      };
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching data ...`,
          },
        ],
      };
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);