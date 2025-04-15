import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const url = new URL(request.url);
  
  return NextResponse.json({
    url: request.url,
    pathname: url.pathname,
    origin: url.origin,
    headers: Object.fromEntries(request.headers.entries()),
    env: {
      REDIS_URL: process.env.REDIS_URL ? 'set' : 'not set',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_URL: process.env.VERCEL_URL || 'not set',
      BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || 'not set'
    }
  });
}