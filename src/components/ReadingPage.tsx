import { motion } from "framer-motion";
import { ArrowLeft, BookMarked, CheckCircle, Star } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { readingPassages } from "@/data/reading";

export default function ReadingPage() {
  const { setView, selectPassage, readingProgress } = useGameStore();

  const handleSelectPassage = (id: number) => {
    selectPassage(id);
    setView("readingPassage");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
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
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">悦读时光</h1>
              <p className="text-emerald-100 text-sm">第三部分 · 趣味阅读（选做）</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {readingPassages.map((passage, index) => {
            const progress = readingProgress[passage.id];
            const isCompleted = progress?.completed;
            const score = progress?.score ?? 0;

            return (
              <motion.button
                key={passage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectPassage(passage.id)}
                className={`w-full rounded-xl p-5 text-left border-2 transition-all ${
                  isCompleted
                    ? "bg-white border-emerald-400 shadow-md"
                    : "bg-white/80 border-white shadow-sm hover:border-emerald-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                        Day {passage.id}
                      </span>
                      <span className="text-xs text-gray-400">
                        by {passage.author}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {passage.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {passage.content[0]}
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                      <span>{passage.content.length} 段</span>
                      <span>{passage.questions.length} 道题目</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                    {score > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm text-amber-600">{score}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
