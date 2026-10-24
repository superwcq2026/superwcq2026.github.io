import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Shuffle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  ChevronRight,
  Volume2,
} from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { vocabularyDays } from "@/data/vocabulary";
import { speak } from "@/lib/speech";

export default function VocabularyDayPage() {
  const {
    setView,
    selectedDay,
    updateVocabularyProgress,
    addScore,
    addMistake,
  } = useGameStore();
  const [mode, setMode] = useState<"learn" | "quiz" | "spelling" | "result">(
    "learn"
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [spellingInput, setSpellingInput] = useState("");
  const [spellingChecked, setSpellingChecked] = useState(false);
  const [spellingResults, setSpellingResults] = useState<
    Record<number, boolean>
  >({});
  const [options, setOptions] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const dayData = vocabularyDays.find((d) => d.day === selectedDay);
  if (!dayData) return null;

  const words = shuffled
    ? [...dayData.words].sort(() => Math.random() - 0.5)
    : dayData.words;
  const currentWord = words[currentIndex];

  const generateQuizOptions = useCallback(
    (wordIndex: number) => {
      const correct = words[wordIndex].english;
      const others = words
        .filter((_, i) => i !== wordIndex)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.english);
      return [...others, correct].sort(() => Math.random() - 0.5);
    },
    [words]
  );

  const handleSpeak = (word: string) => {
    setIsSpeaking(true);
    speak(word);
    setTimeout(() => setIsSpeaking(false), 1000);
  };

  const recordMistake = (word: typeof currentWord, userAns: string) => {
    addMistake({
      type: "vocabulary",
      question: `${word.chinese} 的英文是？`,
      correctAnswer: word.english,
      userAnswer: userAns,
      explanation: `正确答案是 ${word.english}，中文意思是 ${word.chinese}`,
      dayOrPassage: `Day ${selectedDay}`,
      reviewed: false,
    });
  };

  const startQuiz = () => {
    setMode("quiz");
    setCurrentIndex(0);
    setQuizAnswers({});
    setOptions(generateQuizOptions(0));
  };

  const startSpelling = () => {
    setMode("spelling");
    setCurrentIndex(0);
    setSpellingResults({});
    setSpellingInput("");
    setSpellingChecked(false);
  };

  const handleQuizAnswer = (answer: string) => {
    const isCorrect = answer === currentWord.english;
    if (!isCorrect) {
      recordMistake(currentWord, answer);
    }
    setQuizAnswers((prev) => ({ ...prev, [currentIndex]: isCorrect }));
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex((i) => i + 1);
        setOptions(generateQuizOptions(currentIndex + 1));
      } else {
        setMode("result");
      }
    }, 800);
  };

  const handleSpellingCheck = () => {
    const isCorrect =
      spellingInput.trim().toLowerCase() === currentWord.english.toLowerCase();
    if (!isCorrect) {
      recordMistake(currentWord, spellingInput);
    }
    setSpellingResults((prev) => ({ ...prev, [currentIndex]: isCorrect }));
    setSpellingChecked(true);
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex((i) => i + 1);
        setSpellingInput("");
        setSpellingChecked(false);
      } else {
        setMode("result");
      }
    }, 1200);
  };

  const finish = () => {
    const totalQuestions = words.length;
    let correctCount = 0;
    if (mode === "result") {
      const results =
        Object.keys(quizAnswers).length > 0 ? quizAnswers : spellingResults;
      correctCount = Object.values(results).filter(Boolean).length;
    }
    const score = Math.round((correctCount / totalQuestions) * 100);
    updateVocabularyProgress(selectedDay, {
      completed: true,
      score,
      totalQuestions,
      correctAnswers: correctCount,
    });
    addScore(score);
    setView("vocabulary");
  };

  if (mode === "result") {
    const results =
      Object.keys(quizAnswers).length > 0 ? quizAnswers : spellingResults;
    const correct = Object.values(results).filter(Boolean).length;
    const total = words.length;
    const percentage = Math.round((correct / total) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center"
        >
          <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">测试完成！</h2>
          <p className="text-4xl font-bold text-amber-600 mb-2">
            {correct}/{total}
          </p>
          <p className="text-lg text-gray-500 mb-6">
            正确率: {percentage}%
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setMode("learn")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              重新学习
            </button>
            <button
              onClick={finish}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-amber-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() =>
                mode === "learn" ? setView("vocabulary") : setMode("learn")
              }
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">返回</span>
            </button>
            <span className="text-sm text-gray-400">
              Day {selectedDay} · {currentIndex + 1}/{words.length}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / words.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Mode Selector (Learn Mode) */}
      {mode === "learn" && (
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex gap-2 justify-center mb-4">
            <button
              onClick={startQuiz}
              className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
            >
              选择题模式
            </button>
            <button
              onClick={startSpelling}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
            >
              拼写模式
            </button>
            <button
              onClick={() => setShuffled(!shuffled)}
              className="px-4 py-2 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors flex items-center gap-1"
            >
              <Shuffle className="w-4 h-4" />
              {shuffled ? "恢复" : "乱序"}
            </button>
          </div>
        </div>
      )}

      {/* Card */}
      <div className="max-w-2xl mx-auto px-4 py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + mode}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Learn Mode */}
            {mode === "learn" && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                {/* Speak Chinese */}
                <button
                  onClick={() => handleSpeak(currentWord.chinese)}
                  className="mb-2 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs hover:bg-gray-200 transition-colors"
                >
                  🔊 听中文
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {currentWord.chinese}
                </h2>
                <AnimatePresence>
                  {showEnglish && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6"
                    >
                      <p className="text-3xl font-bold text-amber-600 mb-4">
                        {currentWord.english}
                      </p>
                      <button
                        onClick={() => handleSpeak(currentWord.english)}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all ${
                          isSpeaking
                            ? "bg-indigo-600 scale-105"
                            : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
                        }`}
                      >
                        <Volume2 className="w-5 h-5" />
                        {isSpeaking ? "播放中..." : "发音"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowEnglish(!showEnglish)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                  >
                    {showEnglish ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                    {showEnglish ? "隐藏" : "显示"}
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Mode */}
            {mode === "quiz" && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-500 text-sm">选择正确的英文单词</p>
                  <button
                    onClick={() => handleSpeak(currentWord.chinese)}
                    className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {currentWord.chinese}
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {options.map((opt) => {
                    const isAnswered = quizAnswers[currentIndex] !== undefined;
                    const isCorrect = opt === currentWord.english;

                    let btnClass =
                      "p-4 rounded-xl border-2 text-left transition-all ";
                    if (isAnswered) {
                      if (isCorrect) {
                        btnClass +=
                          "border-emerald-400 bg-emerald-50 text-emerald-700";
                      } else {
                        btnClass +=
                          "border-gray-200 bg-gray-50 text-gray-400";
                      }
                    } else {
                      btnClass +=
                        "border-gray-200 hover:border-amber-400 hover:bg-amber-50";
                    }

                    return (
                      <button
                        key={opt}
                        disabled={isAnswered}
                        onClick={() => handleQuizAnswer(opt)}
                        className={btnClass}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{opt}</span>
                          {isAnswered && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spelling Mode */}
            {mode === "spelling" && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-500 text-sm">
                    根据中文意思拼写英文单词
                  </p>
                  <button
                    onClick={() => handleSpeak(currentWord.chinese)}
                    className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {currentWord.chinese}
                </h2>
                <div className="mb-4">
                  <div className="flex gap-2 flex-wrap justify-center">
                    {currentWord.english.split("").map((char, i) => (
                      <div
                        key={i}
                        className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center text-lg font-bold ${
                          spellingChecked
                            ? spellingInput[i]?.toLowerCase() ===
                              char.toLowerCase()
                              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                              : spellingInput[i]
                              ? "border-rose-400 bg-rose-50 text-rose-700"
                              : "border-gray-200 bg-gray-50 text-gray-300"
                            : "border-gray-300"
                        }`}
                      >
                        {spellingChecked
                          ? spellingInput[i] || char
                          : spellingInput[i] || ""}
                      </div>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  value={spellingInput}
                  onChange={(e) => setSpellingInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    !spellingChecked &&
                    spellingInput.length > 0 &&
                    handleSpellingCheck()
                  }
                  disabled={spellingChecked}
                  placeholder="输入英文单词..."
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-center text-lg focus:border-amber-400 focus:outline-none mb-4"
                  autoFocus
                />
                {spellingChecked && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-4"
                  >
                    {spellingResults[currentIndex] ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>正确！</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-rose-600">
                        <XCircle className="w-5 h-5" />
                        <span>
                          正确答案: {currentWord.english}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
                {!spellingChecked && (
                  <button
                    onClick={handleSpellingCheck}
                    disabled={spellingInput.length === 0}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold disabled:opacity-50 hover:from-amber-600 hover:to-orange-600 transition-colors"
                  >
                    检查
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {mode === "learn" && (
          <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                setCurrentIndex((i) => Math.max(0, i - 1));
                setShowEnglish(false);
              }}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-lg bg-white text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors"
            >
              上一个
            </button>
            <button
              onClick={() => {
                if (currentIndex < words.length - 1) {
                  setCurrentIndex((i) => i + 1);
                  setShowEnglish(false);
                }
              }}
              disabled={currentIndex === words.length - 1}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors"
            >
              下一个
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
