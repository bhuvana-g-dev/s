// Placeholder gallery items for the cinematic memory page.
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

// Hidden photo slideshow — shown after a correct nickname answer.
// Each entry needs src (path) and caption. src: null shows a placeholder.
export const secretPhotos = [
  { id: "s1", src: "/photos/secret-1.jpg", caption: "This memory was waiting only for you. ❤️" },
  { id: "s2", src: "/photos/secret-2.jpg", caption: "Us, always. ❤️" },
  { id: "s3", src: "/photos/secret-3.jpg", caption: "One of my favourites. 🌻" },
  { id: "s4", src: "/photos/secret-4.jpg", caption: "Look at us. ❤️" },
  { id: "s5", src: "/photos/secret-5.jpg", caption: "A moment I keep close. 💌" },
  { id: "s6", src: "/photos/secret-6.jpg", caption: "Every photo with you is a treasure. ❤️" },
];

// Accepted nicknames — case + whitespace insensitive, comma-separated input OK.
// Add more any time — just lowercase them here.
export const validNicknames = [
  "sel", "vasel", "honey", "darling", "baby", "bae", "eruma",
  "sun flower", "sunflower", "thangamey", "chellamey", "pattu",
  "selvi", "kutty", "paavam",
];
