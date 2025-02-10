import { motion } from "framer-motion";

export default function Header() {
    return (
      <header className="flex flex-col w-full h-auto mx-auto gap-4 justify-center items-center pt-12">
        <motion.span
          className="text-4xl font-[300] text-gray-900/60 select-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.2 },
          }}
        >
          Counter
        </motion.span>
      </header>
    );
}