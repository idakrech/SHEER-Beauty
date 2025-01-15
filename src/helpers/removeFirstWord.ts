export function removeFirstWord(sentence: string, brandName: string): string {
  if (!sentence || typeof sentence !== "string") {
    return ""
  }

  if (!brandName || typeof brandName !== "string") {
    return sentence
  }

  const normalizedSentence = sentence.toLowerCase()
  const normalizedBrand = brandName.toLowerCase()

  if (normalizedSentence.startsWith(normalizedBrand)) {
    return sentence.split(" ").slice(brandName.split(" ").length).join(" ")
  }

  return sentence
}
