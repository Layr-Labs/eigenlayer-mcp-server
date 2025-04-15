# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Dev Commands
- `pnpm dev`: Start development server
- `pnpm build`: Build production version
- `pnpm start`: Start production server
- `node scripts/test-client.mjs [url]`: Test MCP implementation with client

## Project Structure
- `app/`: Next.js app router components and API routes
- `lib/`: Shared utility code for MCP implementation
- `scripts/`: Utility scripts for testing

## Code Style Guidelines
- TypeScript with strict typing is required for all new code
- Use interfaces for complex types and exported type definitions
- Error handling: Use proper try/catch blocks for async code
- Import ordering: Node.js built-ins → external packages → internal modules
- Use absolute imports with @ prefix (`@/lib/...`) for project files
- Follow existing patterns for error handling with proper logging
- Maintain clean async/await style for promise-based code
- Function parameters should be properly typed with interfaces or inline types
- When extending MCP functionality, follow patterns in app/mcp.ts