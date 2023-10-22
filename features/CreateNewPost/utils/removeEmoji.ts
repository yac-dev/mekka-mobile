export function removeEmojis(inputString: string): string {
  // Regular expression to match emojis
  const emojiPattern = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;

  // Replace emojis with an empty string
  const stringWithoutEmojis = inputString.replace(emojiPattern, '');

  return stringWithoutEmojis;
}
