export function splitB(b: string) {
  return [b.split("-")[0], b.split("-")[1] || ""];
}
export function capitalizeString(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
