
const calculateSimilarity = (text1, text2) => {
  // Simple similarity calculation based on common words (for demonstration purposes)
  const words1 = new Set(text1.toLowerCase().split(/\s+/))
  const words2 = new Set(text2.toLowerCase().split(/\s+/))

  const commonWords = [...words1].filter(word => words2.has(word))
  const totalWords = new Set([...words1, ...words2]).size

  return totalWords === 0 ? 0 : (commonWords.length / totalWords)
}

export { calculateSimilarity }