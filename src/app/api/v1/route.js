export async function GET(request) {
  const params = new URL(request.url).searchParams
  return new Response('Hello, this is the API route!' + params.toString())
}

export async function POST(request) {
  const body = await request.json()
  return new Response('Received POST data: ' + JSON.stringify(body))
}