import { createServerResponseAdapter } from "@/lib/server-response-adapter";
import { mcpHandler } from "../mcp";

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(req: Request) {
  console.log('SSE endpoint hit');
  console.log('Request headers:', Object.fromEntries(req.headers.entries()));
  
  return createServerResponseAdapter(req.signal, (res) => {
    console.log('SSE connection established');
    mcpHandler(req, res);
  });
}