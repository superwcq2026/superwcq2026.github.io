import { motion } from "framer-motion";
import { ArrowLeft, Dumbbell, Sparkles, Target } from "lucide-react";
import { useMathStore } from "@/store/mathStore";

const habits = [
  { num: "一", title: "课前预习坚持好", desc: "课前预习不仅能培养我们的自学能力，而且还使自己的学习进度走在老师的前面。在上课的时候，就可以重点关注自己不太清楚的问题。", tip: "预习后需动手做一做相关的练习，既能检验预习效果，又能发现自己存在的问题。", warn: "课前预习的最大障碍是不能长期坚持下去！" },
  { num: "二", title: "课前准备应充分", desc: "现在的课堂只有40分钟，稍不注意，时间就跑得踪影全无，因此要珍惜课堂的40分钟。", tip: "1、准备好书、文具；2、准备好老师要求的相关资料；3、调整好自己的心态，排除外界干扰。", warn: "课前准备最不容易做到的是心态的调整！" },
  { num: "三", title: "课堂学习要高效", desc: "课堂学习的质量和效益是非常重要的，如果把学习的主阵地丢了，那么就无法谈学习的效率。", tip: "首先是听课要专注，其次是要勤动手，只有动手去做，才能促使自己动脑，发现自己存在的问题。", warn: "影响课堂学习效率的一个重要因素是想与邻桌讲闲话或不会排除干扰！" },
  { num: "四", title: "巧记笔记要勤动手", desc: "上课要先把老师讲的听懂，然后将较复杂的或自己认为较难的问题的解答过程的几个关键步骤记下来。", tip: "做了笔记而不去温习等于没有做笔记！", warn: "留好空白，待下课后或利用自习时间将笔记补全。" },
  { num: "五", title: "完成作业高质量", desc: "作业与当天学习的内容联系紧密，应对自己提出高要求，力争正确率要达到100%。同时力求书写工整、规范。", tip: "对作业的错误，切不可轻视，否则将会使错误越来越多。", warn: "对作业质量要求不高将会阻碍学习的进步！" },
  { num: "六", title: "复习巩固常记忆", desc: "'学而时习之''温故而知新'就是提醒我们要时时主动复习巩固，对所学知识进行归纳总结。", tip: "把有联系的知识连成线，总结常见的解题规律和方法，记住一些常见的结论。", warn: "缺乏主动性的人复习巩固常流于形式，是没有效果的！" },
  { num: "七", title: "自主拓展平台高", desc: "'学无止境'。我们在学习上要不断地拓展。", tip: "1、超前拓展，自学进度走在学校前面；2、深度拓展，在学习某方面知识后进行加深学习。", warn: "拓展学习时容易出现遇难而退的现象！" },
];

const persists = [
  { num: "一", title: "坚持适当练习", desc: "数学的学习是离不开练习的，而练习又要有针对性，要针对易出现错误的地方进行练习或不懂的一些知识点进行练习。练习后要总结，要归类，要反思，不能搞题海战术。" },
  { num: "二", title: "坚持作业纠错", desc: "每天的作业发下来之后，首先要看自己作业有哪些错误，在完成下一次作业之前一定要先将上次作业中错误的题改正过来。" },
  { num: "三", title: "坚持培养良好思维习惯", desc: "学数学其实就是学思维，数学的学习在于勤思考、勤动手。对遇到的问题要有一种不解决不罢休的精神，对已学过的知识及时进行归纳和总结，对薄弱环节进行分析和提高。" },
];

export default function HabitsPage() {
  const { setView } = useMathStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      <div className="bg-gradient-to-r from-violet-600 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button onClick={() => setView("home")} className="flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" /><span>返回首页</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">学习方法</h1>
              <p className="text-violet-100 text-sm">七个好习惯 · 三个常坚持</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Seven Habits */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-violet-500" />七个好习惯</h2>
          <div className="space-y-4">
            {habits.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="border-l-4 border-violet-400 pl-4 py-2">
                <h3 className="font-bold text-gray-800 text-sm">好习惯之{h.num}：{h.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{h.desc}</p>
                <p className="text-xs text-violet-600 mt-1 bg-violet-50 rounded-lg px-2 py-1 inline-block">{h.tip}</p>
                <p className="text-xs text-rose-500 mt-1">⚠️ {h.warn}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Three Persists */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-emerald-500" />三个常坚持</h2>
          <div className="space-y-4">
            {persists.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="border-l-4 border-emerald-400 pl-4 py-2">
                <h3 className="font-bold text-gray-800 text-sm">坚持之{p.num}：{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Encouragement */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-6 text-center">
          <p className="text-gray-500 text-sm">亲爱的同学们，学习数学是艰辛的，但也是快乐的！</p>
          <p className="text-gray-500 text-sm mt-1">只要在学习中树立信心、善于思考、不断努力，相信你会收获得越来越多！</p>
        </motion.div>
      </div>
    </div>
  );
}
