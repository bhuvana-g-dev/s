// ============================================================
// PAGE 3 — CINEMA OF MEMORIES
// ============================================================
// HOW TO ADD YOUR VIDEO:
// 1. Put your video file inside:  public/videos/our-movie.mp4
// 2. That's it! It will automatically play in the cinema gallery
//    and theater modal.
// ============================================================

export const cinemaMemories = [
  {
    id: "m1",
    type: "photo",
    src: "/photos/us-1.jpg",
    caption: "The afternoon the light did something unreal.",
    date: "Golden Days",
    location: "Somewhere golden",
  },
  {
    id: "m2",
    type: "video",
    src: "/videos/our-movie.mp4",
    poster: "/photos/us-3.jpg",
    caption: "Our Special Movie — Every second with you is a treasure. 🎬❤️",
    date: "Our Movie",
    location: "Recorded with love",
  },
  {
    id: "m3",
    type: "photo",
    src: "/photos/selva-5.jpg",
    caption: "Grace in every step you take... pure royalty. ✨",
    date: "Precious Smiles",
    location: "In my heart",
  },
  {
    id: "m4",
    type: "photo",
    src: "/photos/selva-6.jpg",
    caption: "The prettiest girl with the sweetest butterfly soul. 🦋",
    date: "Quiet Magic",
    location: "Everywhere with you",
  },
  {
    id: "m5",
    type: "video",
    src: "/videos/memory-2.mp4",
    poster: "/photos/selva-7.jpg",
    caption: "Thirty seconds of us being completely ourselves. 🎥",
    date: "Sweet Moments",
    location: "The road ahead",
  },
  {
    id: "m6",
    type: "photo",
    src: "/photos/selva-9.jpg",
    caption: "That radiant red dress and the smile that lights up my universe. 💖",
    date: "Forever Us",
    location: "Sunflower",
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
