# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- **Run**: `node --loader ts-node/esm index.ts` or `pnpm dev`
- **Install**: `pnpm install`
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Test Client**: `node scripts/test-client.mjs [url]`

## Project Structure
- `app/`: Next.js app router components and API routes
- `lib/`: Shared utility code for MCP implementation
- `scripts/`: Utility scripts for testing

## Code Style
- **TypeScript**: Use strict typing with zod for validation
- **Imports**: Order - Node.js built-ins → external packages → internal modules
- **Path Aliases**: Use absolute imports with @ prefix (`@/lib/...`)
- **Formatting**: 2-space indentation, semicolons required
- **Naming**: camelCase for variables/functions, PascalCase for classes/interfaces
- **Error Handling**: Always use try/catch with specific error messages
- **Async**: Use async/await pattern consistently
- **Documentation**: Comment complex functions with JSDoc

## MCP Implementation
- Follow patterns in app/mcp.ts when extending functionality
- Properly validate tool parameters using zod schemas
- Return consistent response formats with proper error handling