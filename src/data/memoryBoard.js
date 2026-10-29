// ============================================================
// MEMORY BOARD DATA  (Page 4 — Our Little Corner)
// ============================================================
//
// How to add your files:
//
//  1. HER FAVOURITE SONG  ──  set spotifyTrackId to the track ID
//     found at the end of any Spotify track URL:
//     https://open.spotify.com/track/<TRACK_ID_HERE>
//     e.g. "7j6Cb59M9yOq3aw4fmDzQj"
//
//  2. YOUR SUNO SONG  ──  save your generated song as:
//     public/audio/suno-song.mp3   (or .m4a / .wav)
//     Then set src: "/audio/suno-song.mp3"
//
//  3. YOUR VOICE NOTE  ──  save your recording as:
//     public/audio/voice-note.mp3
//     Then set src: "/audio/voice-note.mp3"
//
//  4. SURPRISE LETTER  ──  edit the `poem` array below.
// ============================================================

export const memoryCards = [
  {
    id: "fav-song",
    type: "spotify",
    icon: "💿",
    title: "Her Favourite Song",
    subtitle: "the one that always makes me think of you",
    hint: "tap to listen 🎵",
    glowColor: "#1DB954",
    glowRgba: "rgba(29, 185, 84, 0.35)",
    bgFrom: "#e8f5e9",
    bgTo: "#f0fff4",
    borderColor: "rgba(29, 185, 84, 0.25)",
    badgeColor: "#1DB954",
    badgeLabel: "SPOTIFY",
    // ▼ REPLACE THIS with the real Spotify track ID
    spotifyTrackId: "7j6Cb59M9yOq3aw4fmDzQj",
  },
  {
    id: "suno-song",
    type: "audio",
    icon: "🎵",
    title: "A Song I Made For You",
    subtitle: "written from my heart, sung just for you ✨",
    hint: "tap to hear it 🎵",
    glowColor: "#A98DD1",
    glowRgba: "rgba(169, 141, 209, 0.4)",
    bgFrom: "#f3e8ff",
    bgTo: "#ede4f8",
    borderColor: "rgba(169, 141, 209, 0.3)",
    badgeColor: "#A98DD1",
    badgeLabel: "MY SONG",
    src: "/audio/suno-song.mp3",
    coverArt: "/audio/suno-cover.jpg",
    artistLabel: "Made with Suno AI 🎵 — just for Selva ❤️",
  },
  {
    id: "voice-note",
    type: "audio",
    icon: "🎙️",
    title: "My Voice Note",
    subtitle: "something I really wanted you to hear 💭",
    hint: "tap to listen 🔊",
    glowColor: "#E17497",
    glowRgba: "rgba(225, 116, 151, 0.4)",
    bgFrom: "#fce4ec",
    bgTo: "#fbe1eb",
    borderColor: "rgba(225, 116, 151, 0.3)",
    badgeColor: "#E17497",
    badgeLabel: "VOICE",
    // ▼ Place your voice recording at public/audio/voice-note.mp3
    src: "/audio/voice-note.mp3",
    artistLabel: "Recorded by Bhuvana, just for Selva ❤️",
  },
  {
    id: "sweet-letter",
    type: "letter",
    icon: "💌",
    title: "A Little Letter",
    subtitle: "sealed with all my love 💛",
    hint: "tap to open 💛",
    glowColor: "#D9A857",
    glowRgba: "rgba(217, 168, 87, 0.35)",
    bgFrom: "#fffde7",
    bgTo: "#fff8e1",
    borderColor: "rgba(217, 168, 87, 0.3)",
    badgeColor: "#D9A857",
    badgeLabel: "FOR YOU",
    // ▼ Edit this poem / letter any time
    poem: [
      "Some days I find myself smiling for no reason,",
      "and then I remember — it's always because of you.",
      "",
      "You make the ordinary feel like something worth keeping.",
      "You make quiet moments feel like enough.",
      "",
      "I don't always know how to say these things out loud,",
      "so I wrote them here, where I could be sure",
      "you'd find them.",
      "",
      "You are, quite simply, my favourite kind of forever.",
      "",
      "— Bhuvana ❤️",
    ],
  },
];
