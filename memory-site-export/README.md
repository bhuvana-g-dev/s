# For You, Always 💌

A personalized, animated homepage built with React (Vite), Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
```

## Project structure

```
src/
  components/
    LoadingScreen.jsx     – full-screen loading sequence with changing messages
    AmbientAnimations.jsx – petals, butterflies, sparkles, hearts, cursor glow
    GreetingCard.jsx       – hero glass card: date, time-based greeting, daily message
    Celebration.jsx        – confetti + balloons shown only on birthday mode
    MemoryJar.jsx           – glass jar; tap to reveal today's folded note
    BikeRide.jsx            – bike illustration + idle animation
    RideTransition.jsx      – full-screen "riding away" transition between pages
    Scrapbook.jsx            – leather scrapbook with page-flip animation
    RollerCoaster.jsx         – mini amusement park scene, page 2
  pages/
    HomePage.jsx      – composes the homepage
    MemoriesBegin.jsx – page 2 ("Memories Begin")
  data/
    messages.js – all sweet messages, jar notes, loading messages, birthday copy
    photos.js   – scrapbook photo placeholders
  hooks/
    dateUtils.js – greeting logic, birthday detection, deterministic daily picker
App.jsx – wires loading → home → ride transition → memories page
```

## Customizing

- **Sweet messages & jar notes**: edit `src/data/messages.js`. A new message is
  picked automatically every day (deterministically, so it's stable all day).
- **Birthday date**: currently set to July 26 in `src/hooks/dateUtils.js`
  (`isBirthday`). Change the month/day there if needed.
- **Scrapbook photos**: add real images to `public/photos/` and update the
  `src` field for each page in `src/data/photos.js`, e.g.
  `src: "/photos/selva-1.jpg"`. Until then, pages show a soft placeholder frame.
- **Page-flip sound**: drop a short `.mp3` at `public/audio/page-flip.mp3` —
  the scrapbook will play it automatically on each page turn (it fails
  silently if the file isn't there yet).
- **Colors & fonts**: the full palette and type scale live in
  `tailwind.config.js` (`cream`, `blush`, `lavender`, `beige`, `ink`, `gold`,
  and the `display` / `body` / `hand` font families).

## Notes

- Page 2's "Start the Ride" button plays a short ride-away animation and ends
  on a placeholder message ("More memories are on their way soon...") since
  further pages weren't part of this build — swap that block in
  `MemoriesBegin.jsx` for a real page 3 when you're ready.
- Reduced-motion preferences are respected globally (see `src/index.css`).
