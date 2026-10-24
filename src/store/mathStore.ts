import { create } from "zustand";

export type MathView =
  | "home"
  | "knowledge"
  | "practice"
  | "practiceDay"
  | "habits"
  | "mistakes";

interface DayProgress {
  completed: boolean;
  score: number;
  correctCount: number;
  totalCount: number;
}

export interface MistakeItem {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  day: number;
  reviewed: boolean;
}

interface MathState {
  currentView: MathView;
  selectedDay: number;
  progress: Record<number, DayProgress>;
  totalScore: number;
  mistakes: MistakeItem[];
  setView: (view: MathView) => void;
  selectDay: (day: number) => void;
  updateProgress: (day: number, progress: Partial<DayProgress>) => void;
  addScore: (points: number) => void;
  addMistake: (mistake: Omit<MistakeItem, "id" | "reviewed">) => void;
  removeMistake: (id: string) => void;
  markReviewed: (id: string) => void;
}

export const useMathStore = create<MathState>((set) => ({
  currentView: "home",
  selectedDay: 1,
  progress: {},
  totalScore: 0,
  mistakes: [],

  setView: (view) => set({ currentView: view }),
  selectDay: (day) => set({ selectedDay: day }),

  updateProgress: (day, p) =>
    set((state) => ({
      progress: {
        ...state.progress,
        [day]: { ...state.progress[day], ...p },
      },
    })),

  addScore: (points) =>
    set((state) => ({ totalScore: state.totalScore + points })),

  addMistake: (mistake) =>
    set((state) => {
      const exists = state.mistakes.some(
        (m) => m.question === mistake.question && !m.reviewed
      );
      if (exists) return state;
      return {
        mistakes: [
          ...state.mistakes,
          { ...mistake, id: Date.now().toString(), reviewed: false },
        ],
      };
    }),

  removeMistake: (id) =>
    set((state) => ({
      mistakes: state.mistakes.filter((m) => m.id !== id),
    })),

  markReviewed: (id) =>
    set((state) => ({
      mistakes: state.mistakes.map((m) =>
        m.id === id ? { ...m, reviewed: true } : m
      ),
    })),
}));
