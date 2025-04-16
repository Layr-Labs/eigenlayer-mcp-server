# EigenLayer MCP Server built on Next.js


## Features

- Provides EigenLayer documentation to Claude or other AI assistants via MCP
- Runs as a standalone server locally or as a serverless function on Vercel

Inspired by initial testing [here](https://x.com/dabit3/status/1902502245855383724).
Cloned from [Vercel Next.js MCP template](https://vercel.com/templates/next.js/model-context-protocol-mcp-with-next-js)



# Build, Run, Testing Locally

In terminal window 1
```
rm -rf .next node_modules .vercel
pnpm store prune
pnpm install
pnpm build
pnpm dev

node scripts/test-client.mjs https://localhost:3000
```

In terminal window 2
Test with MCP Inspector
```
npx @modelcontextprotocol/inspector node public/index.js
```
Additional notes [here](https://github.com/modelcontextprotocol/inspector).


## Add to Claude Code

```
claude mcp add
```
(then follow on screen instructions)

## Sample Client

`script/test-client.mjs` contains a sample client to try invocations.

```sh
node scripts/test-client.mjs http://localhost:3000
```


## Security Bugs
Please report security vulnerabilities to security@eigenlabs.org. Do NOT report security bugs via Github Issues.

## Disclaimer
🚧 EigenLayer MCP Server is under active development and has not been audited. EigenLayer MCP Server is rapidly being upgraded, features may be added, removed or otherwise improved or modified and interfaces will have breaking changes. EigenLayer MCP Server should be used only for testing purposes and not in production. EigenLayer MCP Server is provided "as is" and Eigen Labs, Inc. does not guarantee its functionality or provide support for its use in production. 🚧


