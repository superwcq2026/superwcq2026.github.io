import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, CheckCircle, XCircle, Lightbulb, Trophy,
  ChevronRight, Calculator, Shapes, Brain,
  Star, Zap,
} from "lucide-react";
import { useMathStore } from "@/store/mathStore";
import { dailyPractices } from "@/data/mathProblems";

type SectionType = "calc" | "word" | "geometry" | "bonus" | "result";

export default function PracticeDayPage() {
  const { setView, selectedDay, updateProgress, addScore, addMistake } = useMathStore();
  const [section, setSection] = useState<SectionType>("calc");
  const [calcIndex, setCalcIndex] = useState(0);
  const [calcResults, setCalcResults] = useState<Record<number, boolean>>({});
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [wordResult, setWordResult] = useState<boolean | null>(null);
  const [geoResult, setGeoResult] = useState<boolean | null>(null);
  const [bonusResult, setBonusResult] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const dayData = dailyPractices.find((d) => d.day === selectedDay);
  if (!dayData) return null;

  const calc = dayData.calculations[calcIndex];

  const recordMistake = (q: string, userAns: string, correctAns: string, explanation: string) => {
    addMistake({ question: q, userAnswer: userAns, correctAnswer: correctAns, explanation, day: selectedDay });
  };

  const handleCalcCheck = () => {
    const isCorrect = input.trim() === calc.answer;
    if (!isCorrect) recordMistake(`计算：${calc.expression}`, input, calc.answer, `正确答案是 ${calc.answer}`);
    setCalcResults((prev) => ({ ...prev, [calcIndex]: isCorrect }));
    setChecked(true);
  };

  const handleWordCheck = (correct: boolean) => {
    if (!correct) recordMistake(dayData.wordProblem.question, "错误", dayData.wordProblem.answer, dayData.wordProblem.explanation);
    setWordResult(correct);
  };

  const handleGeoCheck = (correct: boolean) => {
    if (!correct) recordMistake(dayData.geometry.question, "错误", dayData.geometry.answer, dayData.geometry.explanation);
    setGeoResult(correct);
  };

  const handleBonusCheck = (correct: boolean) => {
    if (!correct) recordMistake(dayData.bonus.question, "错误", dayData.bonus.answer, dayData.bonus.explanation);
    setBonusResult(correct);
  };

  const finish = () => {
    const calcCorrect = Object.values(calcResults).filter(Boolean).length;
    const totalCorrect = calcCorrect + (wordResult ? 1 : 0) + (geoResult ? 1 : 0) + (bonusResult ? 1 : 0);
    const total = dayData.calculations.length + 3;
    const score = Math.round((totalCorrect / total) * 100);
    updateProgress(selectedDay, { completed: true, score, correctCount: totalCorrect, totalCount: total });
    addScore(score);
    setView("practice");
  };

  const nextCalc = () => {
    if (calcIndex < dayData.calculations.length - 1) {
      setCalcIndex((i) => i + 1); setInput(""); setChecked(false); setShowHint(false);
    } else {
      setSection("word");
    }
  };

  // Result screen
  if (section === "result") {
    const calcCorrect = Object.values(calcResults).filter(Boolean).length;
    const totalCorrect = calcCorrect + (wordResult ? 1 : 0) + (geoResult ? 1 : 0) + (bonusResult ? 1 : 0);
    const total = dayData.calculations.length + 3;
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <Trophy className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Day {selectedDay} 完成！</h2>
          <p className="text-4xl font-bold text-cyan-600 mb-1">{totalCorrect}/{total}</p>
          <p className="text-gray-500 mb-6">正确率 {Math.round((totalCorrect / total) * 100)}%</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setView("practice")} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">返回列表</button>
            <button onClick={finish} className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:from-cyan-600 hover:to-blue-600">完成</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-cyan-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => section === "calc" ? setView("practice") : setSection("calc")} className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" /><span className="text-sm">返回</span>
            </button>
            <span className="text-sm text-gray-400">Day {selectedDay} · {dayData.title}</span>
          </div>
          <div className="flex gap-1">
            {(["calc", "word", "geometry", "bonus"] as SectionType[]).map((s, i) => {
              const labels = ["计算", "应用题", "几何", "选作"];
              const icons = [Calculator, Brain, Shapes, Star];
              const Icon = icons[i];
              const done = s === "calc" ? calcIndex === dayData.calculations.length - 1 && checked :
                s === "word" ? wordResult !== null : s === "geometry" ? geoResult !== null : bonusResult !== null;
              return (
                <button key={s} onClick={() => {
                  const canNavigate = s === "calc" || (wordResult !== null && s === "word") || (geoResult !== null && (s === "geometry" || s === "bonus"));
                  if (canNavigate) setSection(s);
                }} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition ${section === s ? "bg-cyan-500 text-white" : done ? "bg-cyan-100 text-cyan-700" : "bg-gray-100 text-gray-400"}`}>
                  <Icon className="w-3.5 h-3.5" />{labels[i]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* Calculations */}
          {section === "calc" && (
            <motion.div key={`calc-${calcIndex}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <span className="text-xs text-gray-400">计算题 {calcIndex + 1}/{dayData.calculations.length}</span>
                {calc.tip && <button onClick={() => setShowHint(!showHint)} className="ml-2 text-xs text-amber-500 hover:text-amber-600"><Zap className="w-3 h-3 inline" />提示</button>}
                <h2 className="text-2xl font-bold text-gray-800 mt-2 font-mono">{calc.expression} = ?</h2>
                <AnimatePresence>{showHint && calc.tip && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }} className="text-sm text-amber-600 mt-2 bg-amber-50 rounded-lg px-3 py-2">💡 {calc.tip}</motion.p>
                )}</AnimatePresence>
              </div>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !checked && input && handleCalcCheck()}
                disabled={checked} placeholder="输入答案..."
                className={`w-full p-4 border-2 rounded-xl text-center text-xl font-bold focus:outline-none transition ${checked ? (calcResults[calcIndex] ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-rose-400 bg-rose-50 text-rose-700") : "border-gray-200 focus:border-cyan-400"}`} autoFocus />
              {checked && !calcResults[calcIndex] && <p className="text-rose-600 text-sm text-center mt-2">正确答案：{calc.answer}</p>}
              {checked ? (
                <button onClick={nextCalc} className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold">
                  {calcIndex < dayData.calculations.length - 1 ? "下一题" : "去应用题"}<ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button onClick={handleCalcCheck} disabled={!input} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold disabled:opacity-50">检查答案</button>
              )}
            </motion.div>
          )}

          {/* Word Problem */}
          {section === "word" && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4"><Brain className="w-5 h-5 text-cyan-500" /><span className="text-xs px-2 py-1 rounded-full bg-cyan-100 text-cyan-700">应用题</span></div>
              <h2 className="text-lg font-bold text-gray-800 mb-6 leading-relaxed">{dayData.wordProblem.question}</h2>
              {wordResult === null ? (
                <div className="space-y-3">
                  <button onClick={() => handleWordCheck(true)} className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-400 text-left font-medium transition">我做对了 ✓</button>
                  <button onClick={() => handleWordCheck(false)} className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-rose-400 text-left font-medium transition">我需要看解析 ✗</button>
                </div>
              ) : (
                <>
                  <div className={`text-center mb-4 ${wordResult ? "text-emerald-600" : "text-rose-600"}`}>
                    {wordResult ? <div className="flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /><span>太棒了！</span></div>
                      : <div className="flex items-center justify-center gap-2"><XCircle className="w-5 h-5" /><span>正确答案：{dayData.wordProblem.answer}</span></div>}
                  </div>
                  <AnimatePresence>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                      <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" /><p className="text-sm text-amber-800">{dayData.wordProblem.explanation}</p></div>
                    </motion.div>
                  </AnimatePresence>
                  <button onClick={() => setSection("geometry")} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold">去几何题<ChevronRight className="w-5 h-5" /></button>
                </>
              )}
            </motion.div>
          )}

          {/* Geometry */}
          {section === "geometry" && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4"><Shapes className="w-5 h-5 text-cyan-500" /><span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">图形解答题</span></div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">{dayData.geometry.question}</h2>
              {dayData.geometry.hint && <p className="text-sm text-gray-400 mb-4">💡 {dayData.geometry.hint}</p>}
              {geoResult === null ? (
                <div className="space-y-3 mt-4">
                  <button onClick={() => handleGeoCheck(true)} className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-400 text-left font-medium transition">我做对了 ✓</button>
                  <button onClick={() => handleGeoCheck(false)} className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-rose-400 text-left font-medium transition">我需要看解析 ✗</button>
                </div>
              ) : (
                <>
                  <div className={`text-center my-4 ${geoResult ? "text-emerald-600" : "text-rose-600"}`}>
                    {geoResult ? <div className="flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /><span>太棒了！</span></div>
                      : <div className="flex items-center justify-center gap-2"><XCircle className="w-5 h-5" /><span>答案：{dayData.geometry.answer}</span></div>}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" /><p className="text-sm text-amber-800">{dayData.geometry.explanation}</p></div>
                  </motion.div>
                  <button onClick={() => setSection("bonus")} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold">去选作题<ChevronRight className="w-5 h-5" /></button>
                </>
              )}
            </motion.div>
          )}

          {/* Bonus */}
          {section === "bonus" && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4"><Star className="w-5 h-5 text-amber-500" /><span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">选作题 · 挑战</span></div>
              <h2 className="text-lg font-bold text-gray-800 mb-6">{dayData.bonus.question}</h2>
              {bonusResult === null ? (
                <div className="space-y-3">
                  <button onClick={() => handleBonusCheck(true)} className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-400 text-left font-medium transition">我做对了 ✓</button>
                  <button onClick={() => handleBonusCheck(false)} className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-rose-400 text-left font-medium transition">我需要看解析 ✗</button>
                </div>
              ) : (
                <>
                  <div className={`text-center my-4 ${bonusResult ? "text-emerald-600" : "text-rose-600"}`}>
                    {bonusResult ? <div className="flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /><span>挑战成功！</span></div>
                      : <div className="flex items-center justify-center gap-2"><XCircle className="w-5 h-5" /><span>答案：{dayData.bonus.answer}</span></div>}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" /><p className="text-sm text-amber-800">{dayData.bonus.explanation}</p></div>
                  </motion.div>
                  <button onClick={() => setSection("result")} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold">查看成绩<ChevronRight className="w-5 h-5" /></button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
