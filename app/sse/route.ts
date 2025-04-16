import { createServerResponseAdapter } from "@/lib/server-response-adapter";
import { mcpHandler } from "@/lib/mcp";

export const maxDuration = 60;

export async function GET(req: Request) {
  console.log("SSE route handler invoked!");
  try {
    return createServerResponseAdapter(req.signal, (res) => {
      console.log("Inside createServerResponseAdapter callback");
      mcpHandler(req, res);
    });
  } catch (error) {
    console.error("Error in SSE route handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
