export function removeFirstWord(sentence: string) {
  if (!sentence || typeof sentence !== "string") {
    return ""
  }
  const words = sentence.split(" ")
  words.shift()
  return words.join(" ")
}
