import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {GetPromptResult, ListPromptsRequestSchema} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

// Get the current file's directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
        content: fs.readFileSync(path.join(__dirname, 'static', 'eigenlayer-blog-all-articles-combined.md'), 'utf-8')
      },
      "eigenlayer-docs-overview": {
        name: "EigenLayer Documentation Overview",
        description: "Overview documentation for EigenLayer",
        type: "text",
        content: fs.readFileSync(path.join(__dirname, 'static', 'repomix-output-eigenlayer-docs-overview.md'), 'utf-8')
      },
      "eigenlayer-middleware-docs": {
        name: "EigenLayer Middleware Documentation",
        description: "Documentation for EigenLayer middleware",
        type: "text",
        content: fs.readFileSync(path.join(__dirname, 'static', 'repomix-output-eigenlayer-middleware-docs.md'), 'utf-8')
      },
      "eigenlayer-middleware-src": {
        name: "EigenLayer Middleware Source",
        description: "Source code documentation for EigenLayer middleware",
        type: "text",
        content: fs.readFileSync(path.join(__dirname, 'static', 'repomix-output-eigenlayer-middleware-src.md.md'), 'utf-8')
      },
      "eigenlayer-contracts-src": {
        name: "EigenLayer Contracts Source",
        description: "Source code documentation for EigenLayer contracts",
        type: "text",
        content: fs.readFileSync(path.join(__dirname, 'static', 'repomix-output-eigenlayer-contracts-src.md'), 'utf-8')
      },
      "eigenlayer-docs-developer": {
        name: "EigenLayer Developer Documentation",
        description: "Developer documentation for EigenLayer",
        type: "text",
        content: fs.readFileSync(path.join(__dirname, 'static', 'repomix-output-eigenlayer-docs-developer.md'), 'utf-8')
      },
      "eigenlayer-contracts-docs": {
        name: "EigenLayer Contracts Documentation",
        description: "Documentation for EigenLayer contracts",
        type: "text",
        content: fs.readFileSync(path.join(__dirname, 'static', 'repomix-output-eigenlayer-contracts-docs.md'), 'utf-8')
      }
    },
    tools: {},
    prompts: {
      "empty": {
        name: "Empty Prompt",
        description: "An empty prompt",
        content: ""
      }
    }
  },
});



async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("EigenLayer MCP Server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });