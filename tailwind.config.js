/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF8F0',
          deep: '#FBEFE1',
        },
        blush: {
          light: '#FBE1EB',
          DEFAULT: '#F4B8CE',
          deep: '#E17497',
        },
        lavender: {
          light: '#EDE4F8',
          DEFAULT: '#CBB6EA',
          deep: '#A98DD1',
        },
        beige: {
          DEFAULT: '#EDE0D4',
          deep: '#D9C4AE',
        },
        ink: '#6B5150',
        gold: '#D9A857',
        cinema: {
          dusk: '#2B1A2E',
          night: '#1A1025',
          plum: '#3D2140',
          ember: '#E8794A',
          sunset: '#F2A65A',
          rose: '#E8628C',
          cream: '#FBEAD9',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Nunito"', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(107, 81, 80, 0.15)',
        soft: '0 4px 24px rgba(225, 116, 151, 0.15)',
        cinemaGlow: '0 0 40px rgba(232, 121, 74, 0.25)',
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FFF8F0 0%, #FBE1EB 45%, #EDE4F8 100%)',
        'cinema-gradient': 'linear-gradient(180deg, #E8794A 0%, #3D2140 45%, #1A1025 100%)',
        'cinema-radial': 'radial-gradient(ellipse at 50% 20%, rgba(242,166,90,0.25) 0%, rgba(26,16,37,0) 60%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-med': 'float 5s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'sparkle': 'sparkle 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}

