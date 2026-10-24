import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Trophy,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { readingPassages } from "@/data/reading";

export default function ReadingPassagePage() {
  const {
    setView,
    selectedPassageId,
    updateReadingProgress,
    addScore,
    addMistake,
  } = useGameStore();
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const passage = readingPassages.find((p) => p.id === selectedPassageId);
  if (!passage) return null;

  const questions = passage.questions;
  const currentQ = questions[currentQIndex];

  const recordMistake = (userAns: string) => {
    const correctText =
      currentQ.options.find((o) => o.startsWith(currentQ.answer)) ??
      currentQ.answer;
    addMistake({
      type: "reading",
      question: currentQ.question,
      correctAnswer: correctText,
      userAnswer: userAns,
      explanation: currentQ.explanation,
      dayOrPassage: passage.title,
      reviewed: false,
    });
  };

  const handleCheck = () => {
    const isCorrect = selectedOption === currentQ.answer;
    if (!isCorrect) {
      recordMistake(selectedOption ?? "未选择");
    }
    setResults((prev) => ({ ...prev, [currentQIndex]: isCorrect }));
    setChecked(true);
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((i) => i + 1);
      setSelectedOption(null);
      setChecked(false);
    } else {
      setShowResult(true);
    }
  };

  const finish = () => {
    const correct = Object.values(results).filter(Boolean).length;
    const total = questions.length;
    const score = Math.round((correct / total) * 100);
    updateReadingProgress(selectedPassageId, {
      completed: true,
      score,
      totalQuestions: total,
      correctAnswers: correct,
    });
    addScore(score);
    setView("reading");
  };

  if (showResult) {
    const correct = Object.values(results).filter(Boolean).length;
    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center"
        >
          <Trophy className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">阅读测试完成！</h2>
          <p className="text-4xl font-bold text-emerald-600 mb-2">
            {correct}/{total}
          </p>
          <p className="text-lg text-gray-500 mb-6">正确率: {percentage}%</p>
          <button
            onClick={finish}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold hover:from-emerald-600 hover:to-green-600"
          >
            完成
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="bg-white border-b border-emerald-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setView("reading")}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">返回</span>
            </button>
            <span className="text-sm text-gray-400">
              {passage.title}
            </span>
          </div>
          {!showQuestions && (
            <div className="w-full bg-gray-100 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          )}
          {showQuestions && (
            <div className="w-full bg-gray-100 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQIndex + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {!showQuestions ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                <h2 className="text-xl font-bold text-gray-800">
                  {passage.title}
                </h2>
              </div>
              <p className="text-sm text-gray-400 mb-4">by {passage.author}</p>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {passage.content.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-gray-700 leading-relaxed text-sm"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowQuestions(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold hover:from-emerald-600 hover:to-green-600 transition-colors"
            >
              开始答题 ({questions.length}道题)
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                  第 {currentQIndex + 1} 题
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-800 mb-6 leading-relaxed">
                {currentQ.question}
              </h2>

              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption === opt.charAt(0);
                  const isCorrectAnswer = opt.startsWith(currentQ.answer);
                  const isWrong = checked && isSelected && !isCorrectAnswer;
                  const showCorrect = checked && isCorrectAnswer;

                  return (
                    <button
                      key={opt}
                      disabled={checked}
                      onClick={() => setSelectedOption(opt.charAt(0))}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        isWrong
                          ? "border-rose-400 bg-rose-50"
                          : showCorrect
                          ? "border-emerald-400 bg-emerald-50"
                          : isSelected
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{opt}</span>
                        {showCorrect && (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        )}
                        {isWrong && (
                          <XCircle className="w-5 h-5 text-rose-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {checked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-4"
                >
                  <p className="text-sm text-sky-800">
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}

              {!checked ? (
                <button
                  onClick={handleCheck}
                  disabled={!selectedOption}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold disabled:opacity-50 hover:from-emerald-600 hover:to-green-600 transition-colors"
                >
                  确认答案
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold hover:from-emerald-600 hover:to-green-600 transition-colors"
                >
                  {currentQIndex < questions.length - 1 ? "下一题" : "查看结果"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
