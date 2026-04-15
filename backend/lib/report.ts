import axios from "axios";

export async function calculateSimilarity(submission1: string, submission2: string): Promise<number> {
  // Using third party library
  try {
    const api_url = process.env.TEXT_SIMILARITY_API_URL!;
    const api_key = process.env.TEXT_SIMILARITY_API_KEY!;
    const response = await axios.post(api_url, {
      text_1: submission1,
      text_2: submission2,
    }, {
      headers: {
        'X-Api-Key': api_key,
      },
    })
    
    const score : number = Number(response.data.similarity);
    return score * 100;

  } catch (error) {
    throw new Error("Failed to calculate text similarity");
  }  
}