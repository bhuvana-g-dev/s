import { motion } from "framer-motion";
import AmbientAnimations from "../components/AmbientAnimations";
import GreetingCard from "../components/GreetingCard";
import MemoryJar from "../components/MemoryJar";
import BikeRide from "../components/BikeRide";
import Celebration from "../components/Celebration";
import { isBirthday } from "../hooks/dateUtils";

export default function HomePage({ onRideAway }) {
  const birthday = isBirthday();

  return (
    <motion.div
      className="relative min-h-screen w-full bg-warm-gradient overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 1 }}
    >
      <AmbientAnimations />
      {birthday && <Celebration />}

      <div className="relative z-10 flex flex-col items-center pt-16 sm:pt-24">
        <GreetingCard />
        <MemoryJar />
        <BikeRide onRideAway={onRideAway} />
      </div>
    </motion.div>
  );
}
