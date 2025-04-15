import { createServerResponseAdapter } from "@/lib/server-response-adapter";
import { mcpHandler } from "../mcp";
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Explicitly use Node.js runtime
export const maxDuration = 60;

export async function POST(req: Request) {
  console.log("Message route hit", {
    url: req.url,
    method: req.method,
    headers: Object.fromEntries(req.headers.entries())
  });
  
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  try {
    const response = await createServerResponseAdapter(req.signal, (res) => {
      // Add headers to the response
      for (const [key, value] of Object.entries(headers)) {
        res.setHeader?.(key, value);
      }
      
      mcpHandler(req, res);
    });
    
    // Ensure response has CORS headers
    const headersObj = new Headers(response.headers);
    for (const [key, value] of Object.entries(headers)) {
      headersObj.set(key, value);
    }
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headersObj
    });
  } catch (error: unknown) {
    console.error("Error in message handler:", error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { 
        status: 500,
        headers
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
