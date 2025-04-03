export function strCapitalize(str: string) {
  return str
    .split(" ")
    .map((s) => s.trim().toLocaleLowerCase())
    .map((s) => s[0].toUpperCase() + s.substring(1))
    .join(" ");
}
