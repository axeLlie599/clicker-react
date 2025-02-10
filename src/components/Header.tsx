import { motion } from "framer-motion";
import { clsx } from "clsx";
import { FaCog, FaTimes } from "react-icons/fa";
import { useSettingsWindowStore } from "../stores/settingsWindow";

export default function Header() {
  const headerStyles = clsx(
    "relative flex flex-col gap-4",
    "w-full h-auto mx-auto",
    "justify-center items-center"
  );

  const settingsOpen = useSettingsWindowStore((state) => state.isOpen);
  const toggleSettings = useSettingsWindowStore((state) => state.toggle);

  return (
    <header className={headerStyles}>
      <motion.span
        className="relative pt-12 flex justify-center items-center w-full h-full text-4xl font-[300] text-gray-900/60 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-on-background/50">Counter</span>
        <motion.button
          className={clsx(
            "absolute right-4 top-4 p-2 rounded-full hover:bg-on-primary hover:text-primary transition duration-150",
            settingsOpen && "hover:bg-red-300/30 hover:text-red-500 z-999"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => toggleSettings()}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: settingsOpen ? 180 : 0 }}
            transition={{ duration: 0.35 }}
          >
            {settingsOpen ? (
              <FaTimes
                className="w-6 h-6"
                aria-label="Close settings"
                title="Close settings"
                fontWeight={100}
              />
            ) : (
              <FaCog className="w-6 h-6" />
            )}
          </motion.div>
        </motion.button>
      </motion.span>
    </header>
  );
}
