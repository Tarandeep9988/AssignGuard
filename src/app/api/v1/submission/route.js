export async function POST(request) {
  const body = await request.json()
  return new Response('Received submission data: ' + JSON.stringify(body))
}