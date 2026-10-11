# For You, Always 💌
> *A personalized, living digital love letter, memory museum, and interactive birthday universe dedicated to Selva Meenakshi.*

---

## 📖 The Story Behind the Screen

Some memories are too precious to stay locked in standard photo albums or fleeting messages. 

**"For You, Always"** was created as a timeless digital keepsake—an interactive universe that preserves our shared laughs, late-night phone calls, milestones, quiet glances, and celebratory moments. Spanning across five distinct thematic chapters, every single room has been hand-crafted with custom vector illustrations, tactile interactions, procedural audio, and romantic animations to create an unforgettable immersive experience.

---

## 🗺️ The Five Interactive Chapters

```
                     [ Prologue: Heartbeat Loading Screen ]
                                        │
                                        ▼
                         [ Chapter I: The Home Sanctuary ]
                         • Time-Aware Greeting & Daily Quote
                         • Glowing Fairy-Light Wishing Jar
                         • Scrapbook Polaroid Lightbox
                                        │ (Bicycle Ride Transition)
                                        ▼
                         [ Chapter II: Memories Begin ]
                         • 3D Leather Photo Scrapbook Album
                         • Whimsical Memory Roller Coaster
                                        │ (Vintage Drive-Away Transition)
                                        ▼
                       [ Chapter III: Cinema of Memories ]
                       • Velvet Curtain Retro Theater
                       • Film Reel & Golden Ticket Stubs
                       • Secret Ticket Booth Love Letter
                                        │ (Carousel Horse Swing Transition)
                                        ▼
                        [ Chapter IV: Our Little Corner ]
                        • Relationship Milestone Calendar
                        • Couple’s Trivia Quiz
                        • Late-Night Call Duration Tracker
                        • Interactive Peelable Sticker Wall
                                        │ (Cloud Parting Transition)
                                        ▼
                    [ Chapter V: The Birthday Surprise Room ]
                    • Draped Corner Fairy Light Garlands
                    • Interactive Tap-to-Burst Metallic Balloons
                      (with Falling Glowing Hearts & Air Re-inflation)
                    • Golden Filigree "Selva Meenakshi" Wall Banner
                    • Selva Spotlight Photo Carousel
                    • Blowable Candle Birthday Cake (Microphone Breath API)
                    • Dual Confetti Cannons & Secret Wax-Sealed Letter
```

---

### 🌸 Chapter I: The Home Sanctuary
- **Radiant Portrait Treatment**: Atmospheric background framing her portrait with warm, romantic radial vignettes that illuminate her smile while softening harsh backgrounds.
- **Dynamic Time-Aware Greeting**: Automatically transitions between *Good Morning*, *Good Afternoon*, and *Good Night*, paired with a deterministically picked daily love message.
- **Petite Glass Wishing Jar**: A chubby glass apothecary jar illuminated from within by a warm golden halo, surrounded by swirling glowing golden butterflies and hearts. Tapping the jar pops open an interactive folded origami note revealing today’s love quote.
- **Organic Polaroid Scrapbook Gallery**: Staggered, tilted polaroid photo cards held by colorful pastel washi tape strips. Tapping any polaroid opens a full-screen blurred lightbox modal with the high-resolution photo and a handwritten memory quote.

### 🎢 Chapter II: Memories Begin
- **3D Leather Scrapbook Album**: A dual-page photo album with realistic page-turning physics and subtle paper rustle audio.
- **Vintage Memory Roller Coaster**: A hand-illustrated amusement park rollercoaster carrying custom carts holding our memories along curved tracks.
- **Bicycle & Car Ride Transitions**: Seamless cinematic transitions that pedal or drive away across the screen to transport the visitor to the next chapter.

### 🎬 Chapter III: Cinema of Memories
- **The Golden-Age Movie Theater**: Rich velvet theater curtains, vintage film grain overlays, moving projector light beams, and rotating film reels.
- **Memory Filmstrip Carousel**: An organic carousel of moments styled as classic golden movie ticket stubs.
- **Secret Ticket Booth**: An interactive puzzle where entering our special date unlocks an exclusive hidden love letter.

### 🌻 Chapter IV: Our Little Corner
- **Memory Calendar**: An interactive calendar commemorating all our special relationship dates and anniversaries.
- **"How Well Do You Know Us?" Couple’s Quiz**: A playful trivia game celebrating our inside jokes and favorite moments, complete with instant feedback and score celebrations.
- **Late-Night Call Log Counter**: An animated stat card calculating hundreds of hours spent talking under the stars.
- **Interactive Sticker Wall**: Peel, reposition, and inspect adorable scrapbook stickers.
- **Carousel Horse Swing**: A hand-drawn carousel horse button that swings into the sky to transition into the clouds.

### 🎂 Chapter V: The Birthday Surprise Room (Grand Finale)
- **Draped Corner Fairy Lights**: Ambient glowing bulbs with authentic brass sockets and warm filament glows draped across the upper corners.
- **Interactive Pop-able Metallic Balloons**:
  - High-gloss 3D balloons in Metallic Rose Gold, Champagne Gold, and Soft Blush Pink.
  - **Tactile Burst Interaction**: Tapping any balloon triggers an immediate pop with a synthesized audio shockwave.
  - **Shower of Falling Glowing Hearts**: A cascade of glowing pink and golden hearts (`💖`, `💛`, `✨`, `💕`, `💗`) flutters downward under gravity.
  - **Air Re-Inflation Animation**: After 1.8 seconds, concentric air puffs appear at the knot as the balloon springs back to life, inflating with bouncy elasticity!
- **Selva Spotlight Carousel**: An illuminated rotating frame spotlighting her solo portraits.
- **Blowable Candle Chocolate Cake**:
  - Multi-tier chocolate birthday cake with realistic frosting, golden sprinkles, and flickering candle flames.
  - **Real Breath Detection**: Uses the browser microphone to detect when she blows on the screen, blowing out the candles in real time!
  - **Dual Confetti Cannons**: Firing celebratory confetti blasts from both sides of the screen when the candles are extinguished.
- **Wax-Sealed Love Letter**: An interactive envelope sealed with a red wax seal that unfolds into an emotional birthday letter.

### 💎 Global Floating Diamond Heart Navigation
- A floating diamond heart button always accessible on top of every page, allowing instant teleportation between any of the 5 rooms without needing to repeat cinematic transitions.

---

## 🛠️ Technical Architecture & Engineering Highlights

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CORE APPLICATION STACK                          │
├───────────────────┬───────────────────┬────────────────────────────────┤
│   React 19 + JSX  │  Vite Bundler     │  Tailwind CSS 3.4              │
│   Framer Motion   │  Web Audio API    │  HTML5 Canvas 2D Context       │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

### 1. Pure Mathematical Vector Illustrations (Zero 3D Bloat)
Rather than loading multi-megabyte 3D `.gltf` / `.obj` files with Three.js that would cause lag and battery drain on mobile phones, **every single visual asset**—the apothecary jar, metallic balloons, tiered chocolate cake, carousel horse, and fairy lights—is built using lightweight, mathematically precise **SVG vector paths** and layered radial/linear gradients.
- **Benefit**: Flawless 60 FPS performance on all mobile and desktop devices with virtually zero bundle weight.

### 2. Procedural Web Audio API Sound Synthesizers
The tactile sound effects (balloon pops, air re-inflation whooshes) require **zero external audio files**:
```javascript
// Procedural Balloon Pop Synthesizer
function playPopSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  // Downward frequency sweep mimics a crisp rubber pop
  osc.frequency.setValueAtTime(480, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.32, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}
```

### 3. Microphone Breath Detection API
The birthday cake candles feature an optional audio analysis stream using the Web Audio API’s `AnalyserNode`:
- Monitors audio frequency energy in the low-frequency noise spectrum (characteristic of blowing directly into a phone/laptop microphone).
- When energy crosses the threshold for >250ms, the candle flame physics transition from `flickering` to `smoke` and trigger the confetti explosion.

### 4. Deterministic Seeded Date Engine
The daily love notes and morning/night greetings are calculated deterministically via `dateUtils.js`:
- Uses the calendar date (year, month, day) as a hash seed.
- Guarantees that the visitor receives a consistent quote throughout their entire day without requiring a backend database or user session store.

### 5. Canvas 2D Screen-Blend Ripple Physics
- Interactive `<HeartRipples />` component uses an HTML5 Canvas running on `requestAnimationFrame`.
- Mouse movements and touch taps spawn gentle expanding cubic bezier heart waves rendered with CSS `mix-blend-mode: screen`, ensuring the background portrait is never darkened or obstructed.

---

## 📂 Project Structure

```
d:/s/
├── public/
│   ├── photos/               # High-res portraits, together memories & sticker assets
│   └── audio/                # Optional ambient soundtracks & page flips
├── src/
│   ├── components/
│   │   ├── AmbientAnimations.jsx       # Floating petals, butterflies, sparkles & hearts
│   │   ├── BikeRide.jsx                # Bicycle illustration & idle bounce
│   │   ├── Celebration.jsx             # Birthday confetti explosion
│   │   ├── GreetingCard.jsx            # Dynamic greeting & daily quote (unobscured text)
│   │   ├── HeartNav.jsx                # Global diamond heart quick-jump navigation
│   │   ├── LoadingScreen.jsx           # Heartbeat breathing loading sequence
│   │   ├── MadeWithLove.jsx            # Romantic footer badge
│   │   ├── MemoryJar.jsx               # Petite glowing mason jar & daily origami note
│   │   ├── RideTransition.jsx          # Full-screen bicycle transition
│   │   ├── birthday-room/
│   │   │   ├── BirthdayBanner.jsx      # Golden filigree wall banner
│   │   │   ├── BirthdayCake.jsx        # Multi-tier cake with blowable candles & confetti
│   │   │   ├── CornerBalloons.jsx      # Interactive burstable 3D balloons & air inflation
│   │   │   ├── CornerFairyLights.jsx   # Draped hanging filament bulb garland
│   │   │   └── CloudsIntro.jsx         # Parting cloud intro sequence
│   │   ├── cinema/                     # Retro cinema reels, curtains & ticket booth
│   │   ├── corner/                     # Couple's quiz, call log, calendar & carousel horse
│   │   └── scrapbook/                  # Dual-page leather album & roller coaster
│   ├── pages/
│   │   ├── HomePage.jsx                # Chapter I: The Home Sanctuary
│   │   ├── MemoriesBegin.jsx           # Chapter II: Scrapbook Album
│   │   ├── CinemaOfMemories.jsx        # Chapter III: Retro Cinema
│   │   ├── OurLittleCorner.jsx         # Chapter IV: Cozy Scrapbook Room
│   │   └── BirthdaySurpriseRoom.jsx    # Chapter V: Birthday Grand Finale
│   ├── hooks/
│   │   └── dateUtils.js                # Deterministic daily picker & greeting logic
│   ├── data/
│   │   ├── birthdayRoom.js             # Photos & signatures for birthday room
│   │   ├── messages.js                 # Daily sweet messages & jar notes
│   │   └── quizData.js                 # Couple trivia quiz questions
│   ├── App.jsx                         # Main router coordinating transitions
│   ├── main.jsx                        # React root entry point
│   └── index.css                       # Global styles, fonts & film-grain overlays
├── tailwind.config.js                  # Custom romantic color palettes & typefaces
├── vite.config.js                      # Vite bundler configuration
└── package.json                        # Dependencies & build scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or newer recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/bhuvana-g-dev/s.git

# Navigate into the project directory
cd s

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser to experience the universe.

### Production Build

```bash
# Build optimized static distribution
npm run build

# Preview the production build locally
npm run preview
```

---

## 🎨 Customizing for Your Own Story

1. **Daily Notes & Love Quotes**: Edit `src/data/messages.js` to add your own personal quotes, jar messages, and birthday copy.
2. **Photos**: Replace images in `public/photos/` with your own memories (polaroids, portraits, and milestones).
3. **Couple's Quiz**: Update `src/data/quizData.js` to test your partner on your unique first dates, favorite foods, and memorable trips.
4. **Special Dates**: Configure your anniversary or birthday dates in `src/hooks/dateUtils.js`.

---

<p align="center">
  Crafted with all the love in the universe for <b>Selva Meenakshi</b> ❤️🌻
</p>
