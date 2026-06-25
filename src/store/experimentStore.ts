import { create } from 'zustand';

interface Answer {
  questionId: number;
  answer: string;
}

interface ExperimentState {
  currentQuestion: number;
  answers: Answer[];
  isComplete: boolean;
  setCurrentQuestion: (question: number) => void;
  setAnswer: (questionId: number, answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  complete: () => void;
  reset: () => void;
}

export const useExperimentStore = create<ExperimentState>((set) => ({
  currentQuestion: 0,
  answers: [],
  isComplete: false,
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setAnswer: (questionId, answer) =>
    set((state) => {
      const existingIndex = state.answers.findIndex((a) => a.questionId === questionId);
      if (existingIndex >= 0) {
        const newAnswers = [...state.answers];
        newAnswers[existingIndex] = { questionId, answer };
        return { answers: newAnswers };
      }
      return { answers: [...state.answers, { questionId, answer }] };
    }),
  nextQuestion: () =>
    set((state) => ({
      currentQuestion: Math.min(state.currentQuestion + 1, 7),
    })),
  previousQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(state.currentQuestion - 1, 0),
    })),
  complete: () => set({ isComplete: true }),
  reset: () => set({ currentQuestion: 0, answers: [], isComplete: false }),
}));
