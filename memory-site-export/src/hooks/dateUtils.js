// Small, dependency-free date helpers used across the site.

/** Returns a greeting string + emoji based on the current hour. */
export function getTimeGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return { text: "Good Morning", emoji: "🌸" };
  if (hour >= 12 && hour < 17) return { text: "Good Afternoon", emoji: "☀️" };
  if (hour >= 17 && hour < 21) return { text: "Good Evening", emoji: "🌇" };
  return { text: "Good Night", emoji: "🌙" };
}

/** True when today is July 26th (any year) — birthday mode. */
export function isBirthday(date = new Date()) {
  return date.getMonth() === 6 && date.getDate() === 26; // month is 0-indexed
}

/** Day-of-year, used to seed "which message shows today" deterministically. */
function dayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 1000 / 60 / 60 / 24);
}

/**
 * Picks an item from a list deterministically based on today's date,
 * so the same message shows all day and changes tomorrow.
 */
export function pickForToday(list, date = new Date()) {
  const seed = dayOfYear(date) + date.getFullYear();
  const index = seed % list.length;
  return list[index];
}

export function formatDay(date = new Date()) {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function formatDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
