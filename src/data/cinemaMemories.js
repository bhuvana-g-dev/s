// Placeholder gallery items for the cinematic memory page.
// Replace `src` with real photo/video paths once you have them
// (e.g. "/photos/beach-day.jpg" or "/videos/road-trip.mp4").
export const cinemaMemories = [
  {
    id: "m1",
    type: "photo",
    src: null,
    caption: "The afternoon the light did something unreal.",
    date: "March 2024",
    location: "Somewhere golden",
  },
  {
    id: "m2",
    type: "video",
    src: null,
    caption: "Thirty seconds of us being ridiculous.",
    date: "April 2024",
    location: null,
  },
  {
    id: "m3",
    type: "photo",
    src: null,
    caption: "You, mid-laugh, not knowing I was watching.",
    date: "June 2024",
    location: "The old bookstore",
  },
  {
    id: "m4",
    type: "photo",
    src: null,
    caption: "A quiet evening that felt like a whole world.",
    date: "August 2024",
    location: "The rooftop",
  },
  {
    id: "m5",
    type: "video",
    src: null,
    caption: "The drive we didn't want to end.",
    date: "October 2024",
    location: "The coastal road",
  },
  {
    id: "m6",
    type: "photo",
    src: null,
    caption: "This is the one I look at when I miss you.",
    date: "December 2024",
    location: null,
  },
];

// The hidden Polaroid revealed only after answering the secret question correctly.
export const secretMemory = {
  id: "secret",
  src: null,
  caption: "This memory was waiting only for you. ❤️",
  date: "A day only we remember",
};

// Accepted nicknames for the secret question (case + whitespace insensitive).
export const validNicknames = ["sel", "vasel", "honey", "darling", "baby", "bae", "eruma"];
