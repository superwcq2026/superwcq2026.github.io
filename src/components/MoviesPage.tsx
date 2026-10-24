import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Film,
  Clapperboard,
  Play,
  X,
  Star,
} from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { movieRecommendations } from "@/data/reading";

export default function MoviesPage() {
  const { setView } = useGameStore();
  const [filter, setFilter] = useState<"all" | "动画电影" | "剧情电影">("all");
  const [selectedMovie, setSelectedMovie] = useState<typeof movieRecommendations[0] | null>(null);

  const filtered =
    filter === "all"
      ? movieRecommendations
      : movieRecommendations.filter((m) => m.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
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
              <Film className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">英文电影推荐</h1>
              <p className="text-rose-100 text-sm">适合小学生看的英文电影</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(["all", "动画电影", "剧情电影"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f
                  ? "bg-rose-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f === "all" ? "全部" : f}
            </button>
          ))}
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((movie, index) => (
            <motion.div
              key={movie.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => setSelectedMovie(movie)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center shrink-0">
                  <Clapperboard className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 truncate">
                      {movie.title.split("(")[0]}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">
                    {movie.title.match(/\(([^)]+)\)/)?.[1] || ""}
                  </p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      movie.type === "动画电影"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {movie.type}
                  </span>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {movie.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Movie Detail Modal */}
        <AnimatePresence>
          {selectedMovie && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedMovie(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {selectedMovie.title.split("(")[0]}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {selectedMovie.title.match(/\(([^)]+)\)/)?.[1] || ""}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedMovie.type === "动画电影"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {selectedMovie.type}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed mt-4">
                  {selectedMovie.description}
                </p>
                <div className="mt-6 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
