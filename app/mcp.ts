
import { initializeMcpApiHandler } from "../lib/mcp-api-handler";
import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import * as fs from 'fs';
import * as path from 'path';


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

export const mcpHandler = initializeMcpApiHandler(
  (server) => {
    resources.forEach(resource => {
      server.resource(
        resource.id,
        resource.url,
        { mimeType: 'text/plain' },
        async (uri) => ({
          contents: [{
            uri: resource.url,
            text: fs.readFileSync(path.join(process.cwd(), 'public', 'static', resource.file), 'utf-8'),
          },
        ],
        })
        
      );
    });
    
  },
  {
  "capabilities": {
    "resources": {} // Neither feature supported
  }
}
);
