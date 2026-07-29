// ============================================================
// MEMORY CALENDAR DATA
// ============================================================
// HOW TO EDIT:
// - `text` under each date = the message shown below the sticker
// - Change any text freely and redeploy
// - `sticker` = which photo sticker appears (1-11)
// - `icon` = the emoji shown on the calendar tile
// - `special: true` = yellow heart highlight on the tile
// ============================================================

export const calendarDates = [
  {
    id: "d1", month: 1, day: 8,
    icon: "⭐", label: "A Little Memory",
    special: true, sticker: 6,
    text: "[ Add your memory for Jan 8 here ]",
  },
  {
    id: "d2", month: 1, day: 14,
    icon: "🪁", label: "A Little Memory",
    special: true, sticker: 7,
    text: "[ Add your memory for Jan 14 here ]",
  },
  {
    id: "d3", month: 1, day: 31,
    icon: "🎁", label: "A Little Memory",
    special: true, sticker: 8,
    text: "[ Add your memory for Jan 31 here ]",
  },
  {
    id: "d4", month: 3, day: 6,
    icon: "🎂", label: "Bhuvana's Birthday",
    special: true, sticker: 9,
    text: "The birthday of the person who will always celebrate yours. ❤️",
  },
  {
    id: "d5", month: 7, day: 22,
    icon: "🤗", label: "A Little Memory",
    special: true, sticker: 10,
    text: "[ Add your memory for July 22 here ]",
  },
  {
    id: "d6", month: 7, day: 26,
    icon: "👑", label: "Selva's Birthday",
    special: true, birthday: true, sticker: 11,
    text: "The most beautiful day of my year because you were born.\n\nHappy Birthday Selva Meenakshi ❤️🌻",
  },
  {
    id: "d7", month: 10, day: 25,
    icon: "📸", label: "Our First Selfie",
    special: true, sticker: 1,
    text: "Our first selfie together — the beginning of everything. ❤️",
  },
  {
    id: "d8", month: 11, day: 26,
    icon: "😘", label: "Our Special Day",
    special: true, extraStickers: true, sticker: 2,
    text: "A memory only we understand ❤️",
  },
  {
    id: "d9", month: 11, day: 30,
    icon: "🌸", label: "A Little Memory",
    special: true, sticker: 3,
    text: "[ Add your memory for Nov 30 here ]",
  },
  {
    id: "d10", month: 12, day: 12,
    icon: "💌", label: "A Little Memory",
    special: true, sticker: 4,
    text: "[ Add your memory for Dec 12 here ]",
  },
  {
    id: "d11", month: 12, day: 13,
    icon: "🧸", label: "A Little Memory",
    special: true, sticker: 5,
    text: "[ Add your memory for Dec 13 here ]",
  },
];

// Month names for display
export const monthNames = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Days in each month (non-leap year for simplicity)
export const daysInMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];

// Day of week for Jan 1 2026 = Thursday = 4 (0=Sun)
// We'll compute offsets from this
export const YEAR = 2026;
