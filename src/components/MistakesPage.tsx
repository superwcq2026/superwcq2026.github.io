import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookX, CheckCircle, XCircle, Lightbulb, Trash2, RotateCcw, Filter } from "lucide-react";
import { useMathStore } from "@/store/mathStore";

type FilterType = "all" | "unreviewed" | "reviewed";

export default function MistakesPage() {
  const { setView, mistakes, removeMistake, markReviewed } = useMathStore();
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "all" ? mistakes :
    filter === "unreviewed" ? mistakes.filter((m) => !m.reviewed) :
    mistakes.filter((m) => m.reviewed);

  const unreviewedCount = mistakes.filter((m) => !m.reviewed).length;
  const reviewedCount = mistakes.filter((m) => m.reviewed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <button onClick={() => setView("home")} className="flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" /><span>返回首页</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <BookX className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">错题本</h1>
              <p className="text-rose-100 text-sm">{unreviewedCount} 道未复习 / {reviewedCount} 道已掌握</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {mistakes.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">太棒了！</h2>
            <p className="text-gray-500">你还没有错题，继续加油！</p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              {(["all", "unreviewed", "reviewed"] as FilterType[]).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${filter === f ? "bg-rose-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                  {f === "all" ? `全部 (${mistakes.length})` : f === "unreviewed" ? `未复习 (${unreviewedCount})` : `已掌握 (${reviewedCount})`}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {filtered.map((m, index) => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-xl border-2 transition ${m.reviewed ? "border-emerald-200 opacity-70" : "border-gray-100"}`}>
                    <div className="p-4 cursor-pointer" onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-medium">Day {m.day}</span>
                        {m.reviewed && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">已掌握</span>}
                      </div>
                      <p className="text-sm text-gray-800 font-medium line-clamp-2">{m.question}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <span className="text-rose-500 flex items-center gap-1"><XCircle className="w-3 h-3" />你的：{m.userAnswer}</span>
                        <span className="text-emerald-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" />正确：{m.correctAnswer}</span>
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedId === m.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-gray-100">
                          <div className="p-4">
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                              <div className="flex items-start gap-2"><Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /><p className="text-sm text-amber-800">{m.explanation}</p></div>
                            </div>
                            <div className="flex gap-2">
                              {!m.reviewed ? (
                                <button onClick={(e) => { e.stopPropagation(); markReviewed(m.id); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-sm hover:bg-emerald-200">
                                  <CheckCircle className="w-3.5 h-3.5" />标记已掌握
                                </button>
                              ) : (
                                <button onClick={(e) => { e.stopPropagation(); markReviewed(m.id); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">
                                  <RotateCcw className="w-3.5 h-3.5" />取消标记
                                </button>
                              )}
                              <button onClick={(e) => { e.stopPropagation(); removeMistake(m.id); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-100 text-rose-700 text-sm hover:bg-rose-200 ml-auto">
                                <Trash2 className="w-3.5 h-3.5" />删除
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
