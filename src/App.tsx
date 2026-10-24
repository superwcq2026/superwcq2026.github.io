import { AnimatePresence, motion } from "framer-motion";
import { useMathStore } from "@/store/mathStore";
import HomePage from "@/components/HomePage";
import KnowledgePage from "@/components/KnowledgePage";
import PracticePage from "@/components/PracticePage";
import PracticeDayPage from "@/components/PracticeDayPage";
import HabitsPage from "@/components/HabitsPage";
import MistakesPage from "@/components/MistakesPage";
import "./App.css";

function App() {
  const { currentView } = useMathStore();

  const renderView = () => {
    switch (currentView) {
      case "home": return <HomePage />;
      case "knowledge": return <KnowledgePage />;
      case "practice": return <PracticePage />;
      case "practiceDay": return <PracticeDayPage />;
      case "habits": return <HabitsPage />;
      case "mistakes": return <MistakesPage />;
      default: return <HomePage />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        {renderView()}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
