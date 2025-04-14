import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from 'fs';
import path from 'path';


// Create server instance
const server = new McpServer({
  name: "eigenlayer-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {
      "eigenlayer-blog-all-articles-combined": {
        name: "EigenLayer Blog Articles",
        description: "A comprehensive collection of all EigenLayer blog articles combined into a single document",
        type: "text",
        content: fs.readFileSync(path.join(process.cwd(), 'library', 'eigenlayer-blog-all-articles-combined.md'), 'utf-8')
      }
    },
    tools: {},
  },
});


async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });