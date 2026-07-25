import BirthdayRoom from "../components/birthday-room/BirthdayRoom";

// Page 5 — thin wrapper so App.jsx's existing import/wiring stays untouched
// while the actual room lives in components/birthday-room/BirthdayRoom.jsx.
export default function BirthdaySurpriseRoom() {
  return <BirthdayRoom />;
}
