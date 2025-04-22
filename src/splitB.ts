export default function splitB(b: string) {
  return [b.split("-")[0], b.split("-")[1] || ""];
}
