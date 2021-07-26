export default function dateToString(date) {
  return new Date(date).toLocaleDateString("ind-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
