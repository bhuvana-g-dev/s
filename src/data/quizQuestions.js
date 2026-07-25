// Quiz questions for "How Well Do You Know Our Little World?"
// `alwaysCorrect: true` means every option is accepted (Q7 and Q10).
export const quizQuestions = [
  {
    id: 1,
    icon: "🌻",
    question: 'Who gave you the nickname "Sunflower"?',
    options: ["Selva", "Friends", "Bhuvana", "Family"],
    correct: "Bhuvana",
  },
  {
    id: 2,
    icon: "📸",
    question: "What happened on October 25?",
    options: ["First Call", "First Selfie", "Birthday", "First Gift"],
    correct: "First Selfie",
  },
  {
    id: 3,
    icon: "🎂",
    question: "When is Bhuvana's birthday?",
    options: ["March 6", "July 26", "November 26", "January 14"],
    correct: "March 6",
  },
  {
    id: 4,
    icon: "👑",
    question: "When is our first phone call?",
    options: ["August 16", "September 6", "July 30", "october 12"],
    correct: "August 16",
  },
  {
    id: 5,
    icon: "🎧",
    question: "Which song reminds us the most?",
    options: [
      "Sandakari Neethan",
      "Unnavida Intha Ulagathil",
      "Oh Shanthi Shanthi",
      "None of the Above",
    ],
    correct: "Unnavida Intha Ulagathil",
  },
  {
    id: 6,
    icon: "❤️",
    question: "What do I always say before ending many of our phone calls?",
    options: ["Bye", "Love You", "Okay", "Good Night"],
    correct: "Love You",
  },
  {
    id: 7,
    icon: "🌍",
    question: "Who loves Selva the most?",
    options: ["Bhuvana", "Bhuvana", "Bhuvana", "Bhuvana"],
    alwaysCorrect: true,
    popup: "The answer will always be Bhuvana ❤️",
  },
  {
    id: 8,
    icon: "🥹",
    question: "Who is the biggest cry baby?",
    options: ["Selva", "Both", "Bhuvana", "Nobody"],
    correct: "Bhuvana",
  },
  {
    id: 9,
    icon: "🤍",
    question: "Who usually says Sorry first?",
    options: ["Selva", "Both", "Nobody", "Bhuvana"],
    correct: "Bhuvana",
  },
   {
    id: 10,
    icon: "😜",
    question: "When is our first chat?",
    options: ["13 August", "6 August", "10 August", "17 August"],
    correct: "13 August",
  },
  {
    id: 11,
    icon: "💌",
    question: "Will Bhuvana ever forget you?",
    options: ["No", "Never", "Not Even in Another Lifetime", "Impossible"],
    alwaysCorrect: true,
    popup: "No matter which option you choose...\n\nI'll never forget you ❤️🌻",
  },
];

export const correctFeedback = [
  "Ummmmaaa... 😘❤️",
  "My smart girl ❤️",
  "Hehe... I knew you'd know this ❤️",
  "That's my Selva ❤️",
  "Yayyy!! Ummmmaaa 😘",
];

export const wrongFeedback = [
  "Nallaa yosi maduuu 🤭",
  "Aiyoo... Nallaa yosi 😂",
  "Hint venumaa? 😜",
  "Konjam yosichu paru ❤️",
  "Try once more 🤭",
];

export const hintIntro = "Sari sari...\n\nChinna clue kudukuren 🤭❤️";

export const perfectScorePopup = "Awww...\n\nUmmmmaaa ❤️\n\nYou know me better than anyone.";
