export const capitalize = (string: string) => {
  return string
    .trim()
    .split(" ")
    .map(word => {
      if (word.length <= 2) return word
      return word[0].toUpperCase().concat(word.substring(1))
    })
    .join(" ")
}
