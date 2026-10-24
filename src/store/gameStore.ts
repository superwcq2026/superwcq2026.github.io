import { create } from "zustand";

export type GameView =
  | "home"
  | "vocabulary"
  | "vocabularyDay"
  | "grammar"
  | "grammarDay"
  | "reading"
  | "readingPassage"
  | "selfIntro"
  | "movies"
  | "mistakes";

export type GameMode = "learn" | "quiz" | "spelling" | "match";

export interface MistakeItem {
  id: string;
  type: "vocabulary" | "grammar" | "reading";
  question: string;
  correctAnswer: string;
  userAnswer: string;
  explanation: string;
  dayOrPassage: string;
  timestamp: number;
  reviewed: boolean;
}

interface DayProgress {
  completed: boolean;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}

interface GameState {
  currentView: GameView;
  previousView: GameView | null;
  selectedDay: number;
  selectedPassageId: number;
  gameMode: GameMode;
  vocabularyProgress: Record<number, DayProgress>;
  grammarProgress: Record<number, DayProgress>;
  readingProgress: Record<number, DayProgress>;
  totalScore: number;
  streakDays: number;
  mistakes: MistakeItem[];

  setView: (view: GameView) => void;
  goBack: () => void;
  selectDay: (day: number) => void;
  selectPassage: (id: number) => void;
  setGameMode: (mode: GameMode) => void;
  updateVocabularyProgress: (day: number, progress: Partial<DayProgress>) => void;
  updateGrammarProgress: (day: number, progress: Partial<DayProgress>) => void;
  updateReadingProgress: (id: number, progress: Partial<DayProgress>) => void;
  addScore: (points: number) => void;
  addMistake: (mistake: Omit<MistakeItem, "id" | "timestamp">) => void;
  removeMistake: (id: string) => void;
  markMistakeReviewed: (id: string) => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentView: "home",
  previousView: null,
  selectedDay: 1,
  selectedPassageId: 1,
  gameMode: "learn",
  vocabularyProgress: {},
  grammarProgress: {},
  readingProgress: {},
  totalScore: 0,
  streakDays: 1,
  mistakes: [],

  setView: (view) =>
    set((state) => ({ previousView: state.currentView, currentView: view })),

  goBack: () =>
    set((state) => ({
      currentView: state.previousView ?? "home",
      previousView: null,
    })),

  selectDay: (day) => set({ selectedDay: day }),
  selectPassage: (id) => set({ selectedPassageId: id }),
  setGameMode: (mode) => set({ gameMode: mode }),

  updateVocabularyProgress: (day, progress) =>
    set((state) => ({
      vocabularyProgress: {
        ...state.vocabularyProgress,
        [day]: { ...state.vocabularyProgress[day], ...progress },
      },
    })),

  updateGrammarProgress: (day, progress) =>
    set((state) => ({
      grammarProgress: {
        ...state.grammarProgress,
        [day]: { ...state.grammarProgress[day], ...progress },
      },
    })),

  updateReadingProgress: (id, progress) =>
    set((state) => ({
      readingProgress: {
        ...state.readingProgress,
        [id]: { ...state.readingProgress[id], ...progress },
      },
    })),

  addScore: (points) =>
    set((state) => ({ totalScore: state.totalScore + points })),

  addMistake: (mistake) =>
    set((state) => {
      const exists = state.mistakes.some(
        (m) =>
          m.question === mistake.question &&
          m.type === mistake.type &&
          !m.reviewed
      );
      if (exists) return state;
      return {
        mistakes: [
          {
            ...mistake,
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            timestamp: Date.now(),
          },
          ...state.mistakes,
        ],
      };
    }),

  removeMistake: (id) =>
    set((state) => ({
      mistakes: state.mistakes.filter((m) => m.id !== id),
    })),

  markMistakeReviewed: (id) =>
    set((state) => ({
      mistakes: state.mistakes.map((m) =>
        m.id === id ? { ...m, reviewed: true } : m
      ),
    })),

  resetProgress: () =>
    set({
      vocabularyProgress: {},
      grammarProgress: {},
      readingProgress: {},
      totalScore: 0,
      streakDays: 1,
      mistakes: [],
    }),
}));
