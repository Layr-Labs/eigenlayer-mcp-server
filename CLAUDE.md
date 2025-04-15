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

## TypeScript Configuration
- Strict typing enabled with proper null/undefined handling
- Path aliases: Use `@/*` for absolute imports
- Target: ES2017 with ESNext modules

## Code Style Guidelines
- TypeScript with explicit type annotations for all functions and parameters
- Use interfaces for complex types and exported type definitions
- Import ordering: Node.js built-ins → external packages → internal modules
- Error handling: Use try/catch blocks for async code with proper logging
- Maintain clean async/await patterns for promise-based code
- Use Zod for schema validation where appropriate
- Follow existing patterns in app/mcp.ts when extending MCP functionality
- Use JSDoc comments for important functions and complex logic