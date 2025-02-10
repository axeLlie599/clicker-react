import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function Header() {
  const headerStyles = clsx(
    "flex flex-col gap-4",
    "w-full h-auto mx-auto",
    "justify-center items-center pt-12"
  );
  return (
    <header className={headerStyles}>
      <motion.span
        className="text-4xl font-[300] text-gray-900/60 select-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.2 },
        }}
      >
        <span>Counter</span>
      </motion.span>
    </header>
  );
}
