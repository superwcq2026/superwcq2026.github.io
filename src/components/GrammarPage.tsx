import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Star, PenTool } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { grammarDays } from "@/data/grammar";

export default function GrammarPage() {
  const { setView, selectDay, grammarProgress } = useGameStore();

  const handleSelectDay = (day: number) => {
    selectDay(day);
    setView("grammarDay");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={() => setView("home")}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">小学英语语法每日一练</h1>
              <p className="text-sky-100 text-sm">第二部分 · 小学核心语法练习</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {grammarDays.map((day, index) => {
            const progress = grammarProgress[day.day];
            const isCompleted = progress?.completed;
            const score = progress?.score ?? 0;

            return (
              <motion.button
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectDay(day.day)}
                className={`rounded-xl p-5 text-left border-2 transition-all ${
                  isCompleted
                    ? "bg-white border-sky-400 shadow-md"
                    : "bg-white/80 border-white shadow-sm hover:border-sky-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCompleted
                          ? "bg-sky-100 text-sky-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {day.day}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{day.title}</h3>
                      <p className="text-xs text-gray-400">
                        {day.questions.length} 道题目
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-sky-500" />
                    )}
                    {score > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm text-amber-600">{score}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {Array.from(new Set(day.questions.map((q) => q.type))).map(
                    (type) => (
                      <span
                        key={type}
                        className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-500"
                      >
                        {type === "fill_blank"
                          ? "填空题"
                          : type === "multiple_choice"
                          ? "选择题"
                          : type === "sentence_transform"
                          ? "句型转换"
                          : "改错"}
                      </span>
                    )
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
