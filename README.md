# EigenLayer MCP Server

A Model Context Protocol (MCP) server for EigenLayer documentation, designed to run on Vercel.

## Features

- Provides EigenLayer documentation to Claude or other AI assistants via MCP
- Runs as a standalone server locally or as a serverless function on Vercel

Inspired by initial testing [here](https://x.com/dabit3/status/1902502245855383724).

Initially cloned from [MCP User Guide](https://modelcontextprotocol.io/quickstart/server#node). The [Vercel MCP template](https://vercel.com/templates/other/model-context-protocol-mcp-with-vercel-functions) involved more complexity than we wanted for the initial version.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build with: `npm run build`

3.  Run the server
```bash
npm start
```

Or test with inspector : `npx @modelcontextprotocol/inspector node public/index.js`
Additional notes [here](https://github.com/modelcontextprotocol/inspector).