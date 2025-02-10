import { motion } from "framer-motion";
import ScoreCard from "./ScoreCard";
import { FaPlus, FaMinus, FaRedo } from "react-icons/fa";
import buttonVariants from "../../framer/variants/MainButton";
import useCounterStore from "../../stores/counter";
import ConfettiComponent from "./Confetties";

export default function Counter() {
  const counter = useCounterStore();
  return (
    <div className="flex flex-col gap-8 min-w-[20rem] max-w-[20rem] justify-center items-center flex-grow px-4">
      <ConfettiComponent />
      <ScoreCard />

      <div className="flex gap-4">
        <motion.button
          type="button"
          className=" shadow-2xl bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 flex items-center gap-2"
          onClick={() => counter.increment()}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Increment counter"
        >
          <FaPlus /> Increment
        </motion.button>

        <motion.button
          type="button"
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 flex items-center gap-2"
          onClick={() => counter.decrement()}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={counter.count <= 0}
          aria-label="Decrement counter"
          aria-disabled={counter.count <= 0}
          style={{
            opacity: counter.count <= 0 ? 0.5 : 1,
            cursor: counter.count <= 0 ? "not-allowed" : "pointer",
          }}
        >
          <FaMinus /> Decrement
        </motion.button>
      </div>

      <motion.button
        type="button"
        className="w-full bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold py-3 px-6 rounded-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 flex items-center justify-center gap-2"
        onClick={counter.reset}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label="Reset counter"
      >
        <FaRedo /> Reset
      </motion.button>
    </div>
  );
}
