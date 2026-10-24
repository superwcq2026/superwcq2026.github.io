import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Brain, Dumbbell, Sparkles, Trophy, BookX } from "lucide-react";
import { useMathStore } from "@/store/mathStore";
import type { MathView } from "@/store/mathStore";

const menuItems = [
  { id: "knowledge" as MathView, title: "数学知识篇", subtitle: "公式总结 · 知识点梳理", icon: BookOpen, color: "from-emerald-500 to-teal-500" },
  { id: "practice" as MathView, title: "数学练习篇", subtitle: "天天练 · 20天挑战", icon: Brain, color: "from-cyan-500 to-blue-500" },
  { id: "habits" as MathView, title: "学习方法", subtitle: "七个好习惯 · 三个常坚持", icon: Dumbbell, color: "from-violet-500 to-purple-500" },
];

export default function HomePage() {
  const { setView, totalScore, mistakes } = useMathStore();
  const unreviewed = mistakes.filter((m) => !m.reviewed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 left-12 w-24 h-24 rounded-full bg-white animate-pulse" />
          <div className="absolute top-20 right-16 w-14 h-14 rounded-full bg-white animate-pulse delay-500" />
          <div className="absolute bottom-6 left-1/2 w-18 h-18 rounded-full bg-white animate-pulse delay-1000" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-3">好习惯，助思维之花绽放</h1>
            <p className="text-lg md:text-xl opacity-90 mb-2">数学学科 · 小升初衔接</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex justify-center gap-6">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-5 py-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="font-bold text-lg">{totalScore}</span>
              <span className="text-sm opacity-80">积分</span>
            </div>
            {unreviewed > 0 && (
              <button onClick={() => setView("mistakes")} className="flex items-center gap-2 bg-white/20 rounded-full px-5 py-2 hover:bg-white/30 transition">
                <BookX className="w-5 h-5 text-rose-300" />
                <span className="font-bold text-lg text-rose-200">{unreviewed}</span>
                <span className="text-sm opacity-80">错题</span>
              </button>
            )}
          </motion.div>
        </div>
      </header>

      {/* Mistake Alert */}
      <AnimatePresence>
        {unreviewed > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto px-4 pt-4">
            <button onClick={() => setView("mistakes")} className="w-full bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <BookX className="w-5 h-5 text-rose-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-rose-700">你有 {unreviewed} 道错题待复习</p>
                <p className="text-xs text-rose-500">点击打开错题本，温故而知新</p>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.map((item, i) => (
            <motion.button key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i + 0.4 }}
              whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.97 }}
              onClick={() => setView(item.id)} className="bg-white rounded-2xl p-6 text-left shadow-sm hover:shadow-lg border border-gray-100 transition">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md mb-4`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </motion.button>
          ))}
          {/* Mistakes Card */}
          <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
            whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.97 }}
            onClick={() => setView("mistakes")} className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg border border-gray-100 transition relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-md mb-4">
              <BookX className="w-7 h-7 text-white" />
              {unreviewed > 0 && <span className="absolute top-5 right-5 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{unreviewed}</span>}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">错题本</h3>
            <p className="text-sm text-gray-500">{unreviewed > 0 ? `${unreviewed} 道待复习` : "记录错题，巩固提高"}</p>
          </motion.button>
        </div>

        {/* Welcome */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-3">亲爱的同学们：</h2>
          <p className="text-gray-600 text-sm leading-relaxed">你们好！欢迎你们来到七中育才学道分校。在这儿我们将一起继续学习我们都喜爱的数学，一起走进美妙的初中数学世界。这里有崭新的"代数"世界——不断扩充的数系、奇妙的字母表示数、威力巨大的方程、不等式、运动变化的函数；这里有崭新的"图形"世界——我们将一起拼剪、折叠、平移、旋转，探索图形的性质；在这里，我们还将一起畅游"数据"世界，学会从图表中获取信息。</p>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">下面是老师给你的"<strong>七个好习惯，三个常坚持</strong>"的学习方法，希望能够助你一臂之力。只要在学习中树立信心、善于思考、不断努力，相信你的数学学习能力会越来越强！</p>
          <p className="text-gray-500 text-sm mt-4 text-right">爱你的数学老师</p>
        </motion.div>
      </main>
    </div>
  );
}
