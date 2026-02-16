export async function GET(request) {
  return new Response(JSON.stringify({ success: true, message: 'Health check passed!' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}