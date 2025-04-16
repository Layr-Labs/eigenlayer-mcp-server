export async function GET(req: Request) {
    console.log("Ping route handler invoked!");
    return new Response("pong", { status: 200 });
  }