import { calculateSimilarity } from "@/lib/utils"

export async function POST(request) {
  try {
    const body = await request.json()
    const { text1, text2 } = body

    if (!text1 || !text2) {
      return new Response(JSON.stringify({ error: 'Missing text1 or text2 in request body' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

  // Placeholder similarity score calculation (for demonstration purposes)
  const similarityScore = calculateSimilarity(text1, text2)

  return new Response(JSON.stringify({ similarityScore }), {
    headers: { 'Content-Type': 'application/json' },
  })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}