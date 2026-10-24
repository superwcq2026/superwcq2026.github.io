import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, ChevronDown, FunctionSquare } from "lucide-react";
import { useMathStore } from "@/store/mathStore";
import { knowledgeSections } from "@/data/knowledge";

export default function KnowledgePage() {
  const { setView } = useMathStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button onClick={() => setView("home")} className="flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" /><span>返回首页</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">数学知识篇</h1>
              <p className="text-emerald-100 text-sm">公式总结 · 知识点梳理</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {knowledgeSections.map((section, i) => (
          <motion.div key={section.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button onClick={() => setExpandedId(expandedId === section.id ? null : section.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <FunctionSquare className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-gray-800">{section.title}</h3>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === section.id ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {expandedId === section.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-gray-100">
                  <div className="p-5">
                    {section.content.map((c, j) => (
                      <p key={j} className="text-sm text-gray-600 mb-2">{c}</p>
                    ))}
                    {section.formulas && (
                      <div className="mt-3 space-y-2">
                        {section.formulas.map((f) => (
                          <div key={f.name} className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
                            <span className="text-xs text-emerald-600 font-medium">{f.name}</span>
                            <p className="text-emerald-800 font-bold font-mono">{f.formula}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
