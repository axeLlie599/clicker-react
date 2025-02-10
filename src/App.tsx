import { motion } from "framer-motion";
import Header from "./components/Header";
import containerVariants from "./framer/variants/MainContainer";
import Counter from "./components/counter/Counter";

function App() {
  return (
    <motion.div
      className="flex flex-col w-full h-screen mx-auto items-center bg-linear-to-t from-primary/60 to-white/10"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header />
      <Counter />
      <footer className="pb-8 text-sm text-gray-100 select-none">
        Made with ❤️ and React
      </footer>
    </motion.div>
  );
}

export default App;
