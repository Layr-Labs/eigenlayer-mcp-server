import { createServerResponseAdapter } from "@/lib/server-response-adapter";
import { mcpHandler } from "../mcp";

// Export config for Vercel
export const config = {
  runtime: 'nodejs',
};

export const maxDuration = 60;

export async function POST(req: Request) {
  // Simple response for the message endpoint
  return createServerResponseAdapter(req.signal, (res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    mcpHandler(req, res);
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
