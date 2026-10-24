import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Star, BookOpen } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { vocabularyDays } from "@/data/vocabulary";

export default function VocabularyPage() {
  const { setView, selectDay, vocabularyProgress } = useGameStore();

  const handleSelectDay = (day: number) => {
    selectDay(day);
    setView("vocabularyDay");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
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
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">小学词汇每日一测</h1>
              <p className="text-amber-100 text-sm">第一部分 · 小学词汇自测</p>
            </div>
          </div>
        </div>
      </div>

      {/* Day Grid */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {vocabularyDays.map((day, index) => {
            const progress = vocabularyProgress[day.day];
            const isCompleted = progress?.completed;
            const score = progress?.score ?? 0;

            return (
              <motion.button
                key={day.day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectDay(day.day)}
                className={`relative rounded-xl p-4 text-center border-2 transition-all ${
                  isCompleted
                    ? "bg-white border-amber-400 shadow-md"
                    : "bg-white/80 border-white shadow-sm hover:border-amber-300"
                }`}
              >
                {isCompleted && (
                  <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-amber-500" />
                )}
                <div
                  className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                    isCompleted
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {day.day}
                </div>
                <p className="text-xs font-medium text-gray-700 truncate">
                  Day {day.day}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {day.words.length}词
                </p>
                {score > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs text-amber-600">{score}</span>
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
