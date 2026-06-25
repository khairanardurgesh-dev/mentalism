import { create } from 'zustand';

interface Insight {
  type: string;
  text: string;
}

interface AIResult {
  headline: string;
  insights: Insight[];
  reflection_questions: string[];
  shareable_line: string;
}

interface ResultsState {
  archetype: string;
  scores: any;
  aiResult: AIResult | null;
  isPremium: boolean;
  isLoading: boolean;
  setArchetype: (archetype: string) => void;
  setScores: (scores: any) => void;
  setAIResult: (result: AIResult) => void;
  setPremium: (isPremium: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const useResultsStore = create<ResultsState>((set) => ({
  archetype: '',
  scores: null,
  aiResult: null,
  isPremium: false,
  isLoading: true,
  setArchetype: (archetype) => set({ archetype }),
  setScores: (scores) => set({ scores }),
  setAIResult: (result) => set({ aiResult: result }),
  setPremium: (isPremium) => set({ isPremium }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ 
    archetype: '', 
    scores: null, 
    aiResult: null, 
    isPremium: false, 
    isLoading: true 
  }),
}));
