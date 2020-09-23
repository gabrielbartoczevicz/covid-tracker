export default function firstCharToUppercase(dateFormatted: string): string {
  return `${dateFormatted.charAt(0).toUpperCase()}${dateFormatted.slice(1)}`;
}
