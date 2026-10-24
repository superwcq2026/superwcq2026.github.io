import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { grammarDays } from "@/data/grammar";

export default function GrammarDayPage() {
  const {
    setView,
    selectedDay,
    updateGrammarProgress,
    addScore,
    addMistake,
  } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fillAnswer, setFillAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const dayData = grammarDays.find((d) => d.day === selectedDay);
  if (!dayData) return null;

  const questions = dayData.questions;
  const currentQ = questions[currentIndex];

  const recordMistake = (userAns: string) => {
    const correctText =
      currentQ.type === "multiple_choice"
        ? currentQ.options?.find((o) => o.startsWith(currentQ.answer)) ??
          currentQ.answer
        : currentQ.answer;
    addMistake({
      type: "grammar",
      question: currentQ.question,
      correctAnswer: correctText,
      userAnswer: userAns,
      explanation: currentQ.explanation,
      dayOrPassage: `语法 Day ${selectedDay} · ${dayData.title}`,
      reviewed: false,
    });
  };

  const handleCheck = () => {
    let isCorrect = false;
    let userAns = "";
    if (currentQ.type === "multiple_choice") {
      userAns = selectedOption ?? "";
      isCorrect = selectedOption?.startsWith(currentQ.answer) ?? false;
    } else {
      userAns = fillAnswer;
      isCorrect =
        fillAnswer.trim().toLowerCase() === currentQ.answer.toLowerCase();
    }
    if (!isCorrect) {
      recordMistake(userAns);
    }
    setResults((prev) => ({ ...prev, [currentIndex]: isCorrect }));
    setChecked(true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setFillAnswer("");
      setChecked(false);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const finish = () => {
    const correct = Object.values(results).filter(Boolean).length;
    const total = questions.length;
    const score = Math.round((correct / total) * 100);
    updateGrammarProgress(selectedDay, {
      completed: true,
      score,
      totalQuestions: total,
      correctAnswers: correct,
    });
    addScore(score);
    setView("grammar");
  };

  if (showResult) {
    const correct = Object.values(results).filter(Boolean).length;
    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center"
        >
          <Trophy className="w-16 h-16 text-sky-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">练习完成！</h2>
          <p className="text-4xl font-bold text-sky-600 mb-2">
            {correct}/{total}
          </p>
          <p className="text-lg text-gray-500 mb-6">正确率: {percentage}%</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setResults({});
                setChecked(false);
                setShowResult(false);
                setSelectedOption(null);
                setFillAnswer("");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <RotateCcw className="w-4 h-4" />
              重新练习
            </button>
            <button
              onClick={finish}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:from-sky-600 hover:to-blue-600"
            >
              <CheckCircle className="w-4 h-4" />
              完成
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="bg-white border-b border-sky-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setView("grammar")}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">返回</span>
            </button>
            <span className="text-sm text-gray-400">
              Day {selectedDay} · {currentIndex + 1}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-sky-500 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  currentQ.type === "multiple_choice"
                    ? "bg-purple-100 text-purple-700"
                    : currentQ.type === "fill_blank"
                    ? "bg-sky-100 text-sky-700"
                    : currentQ.type === "sentence_transform"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {currentQ.type === "multiple_choice"
                  ? "选择题"
                  : currentQ.type === "fill_blank"
                  ? "填空题"
                  : currentQ.type === "sentence_transform"
                  ? "句型转换"
                  : "改错"}
              </span>
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-6 leading-relaxed">
              {currentQ.question}
            </h2>

            {currentQ.type === "multiple_choice" && currentQ.options && (
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  const isCorrectAnswer = opt.startsWith(currentQ.answer);
                  const isWrong = checked && isSelected && !isCorrectAnswer;
                  const showCorrect = checked && isCorrectAnswer;

                  return (
                    <button
                      key={opt}
                      disabled={checked}
                      onClick={() => setSelectedOption(opt)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        isWrong
                          ? "border-rose-400 bg-rose-50"
                          : showCorrect
                          ? "border-emerald-400 bg-emerald-50"
                          : isSelected
                          ? "border-sky-400 bg-sky-50"
                          : "border-gray-200 hover:border-sky-300"
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
            )}

            {(currentQ.type === "fill_blank" ||
              currentQ.type === "sentence_transform" ||
              currentQ.type === "error_correction") && (
              <div className="mb-6">
                <input
                  type="text"
                  value={fillAnswer}
                  onChange={(e) => setFillAnswer(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    !checked &&
                    fillAnswer.length > 0 &&
                    handleCheck()
                  }
                  disabled={checked}
                  placeholder="输入你的答案..."
                  className={`w-full p-4 border-2 rounded-xl text-center text-lg focus:outline-none transition-colors ${
                    checked
                      ? results[currentIndex]
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-rose-400 bg-rose-50"
                      : "border-gray-200 focus:border-sky-400"
                  }`}
                  autoFocus
                />
                {checked && !results[currentIndex] && (
                  <p className="text-rose-600 text-sm mt-2 text-center">
                    正确答案: {currentQ.answer}
                  </p>
                )}
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4"
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-amber-800">
                    {currentQ.explanation}
                  </p>
                </div>
              </motion.div>
            )}

            {!checked ? (
              <button
                onClick={handleCheck}
                disabled={
                  currentQ.type === "multiple_choice"
                    ? !selectedOption
                    : !fillAnswer
                }
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold disabled:opacity-50 hover:from-sky-600 hover:to-blue-600 transition-colors"
              >
                检查答案
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold hover:from-sky-600 hover:to-blue-600 transition-colors"
              >
                {currentIndex < questions.length - 1 ? "下一题" : "查看结果"}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
