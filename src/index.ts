import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {GetPromptResult, ListPromptsRequestSchema, CallToolResult, ReadResourceResult} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

// Get the current file's directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all resources in a single array
const resources = [
  {
    id: 'eigenlayer-blog-all-articles-combined',
    name: 'EigenLayer Blog Articles',
    description: 'A comprehensive collection of all EigenLayer blog articles combined into a single document',
    file: 'eigenlayer-blog-all-articles-combined.md',
    url: 'https://docs.eigenlayer.xyz/blog'
  },
  {
    id: 'eigenlayer-docs-overview',
    name: 'EigenLayer Documentation Overview',
    description: 'Overview documentation for EigenLayer',
    file: 'repomix-output-eigenlayer-docs-overview.md',
    url: 'https://docs.eigenlayer.xyz/docs/overview'
  },
  {
    id: 'eigenlayer-middleware-docs',
    name: 'EigenLayer Middleware Documentation',
    description: 'Documentation for EigenLayer middleware',
    file: 'repomix-output-eigenlayer-middleware-docs.md',
    url: 'https://docs.eigenlayer.xyz/docs/middleware'
  },
  {
    id: 'eigenlayer-middleware-src',
    name: 'EigenLayer Middleware Source',
    description: 'Source code documentation for EigenLayer middleware',
    file: 'repomix-output-eigenlayer-middleware-src.md.md',
    url: 'https://docs.eigenlayer.xyz/docs/middleware/source'
  },
  {
    id: 'eigenlayer-contracts-src',
    name: 'EigenLayer Contracts Source',
    description: 'Source code documentation for EigenLayer contracts',
    file: 'repomix-output-eigenlayer-contracts-src.md',
    url: 'https://docs.eigenlayer.xyz/docs/contracts/source'
  },
  {
    id: 'eigenlayer-docs-developer',
    name: 'EigenLayer Developer Documentation',
    description: 'Developer documentation for EigenLayer',
    file: 'repomix-output-eigenlayer-docs-developer.md',
    url: 'https://docs.eigenlayer.xyz/docs/developer'
  },
  {
    id: 'eigenlayer-contracts-docs',
    name: 'EigenLayer Contracts Documentation',
    description: 'Documentation for EigenLayer contracts',
    file: 'repomix-output-eigenlayer-contracts-docs.md',
    url: 'https://docs.eigenlayer.xyz/docs/contracts'
  }
];

// Create server instance
const server = new McpServer({
  name: "eigenlayer-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: Object.fromEntries(
      resources.map(resource => [
        resource.id,
        {
          name: resource.name,
          description: resource.description,
          type: "text",
          content: fs.readFileSync(path.join(__dirname, '..', 'static', resource.file), 'utf-8')
        }
      ])
    ),
    tools: {}
  },
});

// Register all resources
resources.forEach(resource => {
  server.resource(
    resource.id,
    resource.url,
    { mimeType: 'text/plain' },
    async (): Promise<ReadResourceResult> => {
      return {
        contents: [
          {
            uri: resource.url,
            text: fs.readFileSync(path.join(__dirname, '..', 'static', resource.file), 'utf-8'),
          },
        ],
      };
    }
  );
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