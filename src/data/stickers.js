// Stickers for the "Sticker Surprise Wall" (Page 4). Each has an `action`
// type the StickerWall component uses to decide what happens on tap.
export const stickers = [
  {
    id: "s-sunflower",
    icon: "🌻",
    action: "envelope",
    title: "A Little Birthday Voice",
    text: "A voice note placeholder — waiting to be recorded.",
  },
  {
    id: "s-ribbon",
    icon: "🎀",
    action: "qr-song",
    title: "A Song For You",
    text: "QR / song placeholder — waiting to be linked.",
  },
  {
    id: "s-teddy",
    icon: "🧸",
    action: "hug",
    title: null,
    text: null,
  },
  {
    id: "s-chocolate",
    icon: "🍫",
    action: "popup",
    title: null,
    text: "Chocolate always reminds me of your sweet smile 🍫❤️",
  },
  {
    id: "s-headphones",
    icon: "🎧",
    action: "player",
    title: "Our Song",
    text: null,
    spotifyUrl: "https://open.spotify.com/track/7j6Cb59M9yOq3aw4fmDzQj",
  },
  {
    id: "s-letter",
    icon: "💌",
    action: "letter",
    title: "A Little Letter",
    text: "A letter placeholder — waiting to be written.",
  },
  {
    id: "s-flower",
    icon: "🌸",
    action: "petals",
    title: null,
    text: null,
  },
  {
    id: "s-butterfly",
    icon: "🦋",
    action: "butterflies",
    title: null,
    text: null,
  },
  {
    id: "s-bear",
    icon: "🐻",
    action: "hug",
    title: null,
    text: null,
  },
  {
    id: "s-sparkle",
    icon: "✨",
    action: "popup",
    title: null,
    text: "A little sparkle, just because ✨",
  },
  {
    id: "s-strawberry",
    icon: "🍓",
    action: "popup",
    title: null,
    text: "Sweet, just like you 🍓",
  },
  {
    id: "s-camera",
    icon: "📷",
    action: "polaroid",
    title: null,
    text: null,
  },
  {
    id: "s-coffee",
    icon: "☕",
    action: "popup",
    title: null,
    text: "Every morning starts better thinking of you ☕",
  },
  {
    id: "s-cake",
    icon: "🎂",
    action: "popup",
    title: null,
    text: "Counting down to your day already 🎂",
  },
];

// The tiny, nearly-hidden swing sticker that transitions to Page 5.
export const secretSwingSticker = {
  id: "secret-swing",
  icon: "🎠",
  hoverText: "Let's go somewhere together ❤️",
};
