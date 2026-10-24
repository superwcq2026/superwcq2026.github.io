import { motion } from "framer-motion";
import { ArrowLeft, Brain, CheckCircle, Star } from "lucide-react";
import { useMathStore } from "@/store/mathStore";
import { dailyPractices } from "@/data/mathProblems";

export default function PracticePage() {
  const { setView, selectDay, progress } = useMathStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button onClick={() => setView("home")} className="flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" /><span>返回首页</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">数学练习篇</h1>
              <p className="text-cyan-100 text-sm">天天练 · 20天挑战</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {dailyPractices.map((day, i) => {
            const p = progress[day.day];
            const done = p?.completed;
            return (
              <motion.button key={day.day} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                onClick={() => { selectDay(day.day); setView("practiceDay"); }}
                className={`rounded-xl p-4 text-center border-2 transition ${done ? "bg-white border-cyan-400 shadow-md" : "bg-white/80 border-white shadow-sm hover:border-cyan-300"}`}>
                {done && <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-cyan-500" />}
                <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${done ? "bg-cyan-100 text-cyan-700" : "bg-gray-100 text-gray-600"}`}>
                  {day.day}
                </div>
                <p className="text-xs font-medium text-gray-700 truncate">{day.title}</p>
                <p className="text-[10px] text-gray-400 mt-1">{day.calculations.length}计算+3题</p>
                {p?.score && p.score > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs text-amber-600">{p.score}</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
