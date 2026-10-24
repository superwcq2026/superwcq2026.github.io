import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  UserCircle,
  Copy,
  CheckCircle,
  Lightbulb,
  PenLine,
} from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { selfIntroTemplate } from "@/data/reading";

export default function SelfIntroPage() {
  const { setView } = useGameStore();
  const [copied, setCopied] = useState(false);
  const [userWriting, setUserWriting] = useState("");
  const [activeTab, setActiveTab] = useState<"template" | "practice">("template");

  const handleCopy = () => {
    navigator.clipboard.writeText(selfIntroTemplate.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sentences = selfIntroTemplate.template.split("\n\n");

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <button
            onClick={() => setView("home")}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <UserCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">自我介绍</h1>
              <p className="text-violet-100 text-sm">第四部分 · 开口说英语</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("template")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "template"
                ? "bg-violet-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            参考模板
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "practice"
                ? "bg-violet-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <PenLine className="w-4 h-4" />
            写作练习
          </button>
        </div>

        {activeTab === "template" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Hints */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800 mb-1">
                    写作提示
                  </p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    {selfIntroTemplate.hints.map((hint, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Template Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">模板一</h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-100 text-violet-700 text-sm hover:bg-violet-200 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      复制
                    </>
                  )}
                </button>
              </div>
              <div className="space-y-4">
                {sentences.map((para, i) =>
                  para ? (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-gray-700 leading-relaxed text-sm"
                    >
                      {para}
                    </motion.p>
                  ) : null
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "practice" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-2">
                用英语写一段自我介绍
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                参考模板，试着写一段属于自己的自我介绍吧！
              </p>
              <textarea
                value={userWriting}
                onChange={(e) => setUserWriting(e.target.value)}
                placeholder="Hello, everyone. My name is..."
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl text-sm leading-relaxed focus:border-violet-400 focus:outline-none resize-none"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-400">
                  {userWriting.length} 字符
                </span>
                <button
                  onClick={() => {
                    if (userWriting.trim()) {
                      alert("太棒了！继续练习，你会越来越好的！");
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-medium hover:from-violet-600 hover:to-purple-600 transition-colors"
                >
                  提交练习
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function BookOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
