export interface Question {
  id: number;
  text: string;
  type: "choice" | "text" | "thought";
  options?: string[];
  placeholder?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Which picture feels most familiar to you?",
    type: "choice",
    options: [
      "A calm mountain lake at sunset",
      "A busy city street at night",
      "A quiet forest path",
      "An ocean wave crashing"
    ]
  },
  {
    id: 2,
    text: "Which statement best describes your life right now?",
    type: "choice",
    options: [
      "I feel stuck in a routine",
      "I am going through major changes",
      "I have many goals I'm pursuing",
      "I feel uncertain about the future"
    ]
  },
  {
    id: 3,
    text: "How often do you find yourself overthinking decisions?",
    type: "choice",
    options: [
      "Almost never",
      "Sometimes",
      "Often",
      "Constantly"
    ]
  },
  {
    id: 4,
    text: "Do you feel that people often misunderstand you?",
    type: "choice",
    options: [
      "No, people understand me well",
      "Sometimes",
      "Often",
      "Yes, most people don't get me"
    ]
  },
  {
    id: 5,
    text: "When making important decisions, do you trust your heart or your logic more?",
    type: "choice",
    options: [
      "My heart/intuition",
      "My logic/reasoning",
      "A balance of both",
      "It depends on the situation"
    ]
  },
  {
    id: 6,
    text: "Think about someone important to you. Don't tell us who, just focus on the feeling.",
    type: "thought",
    placeholder: "Take a moment to think..."
  },
  {
    id: 7,
    text: "What worries you most right now?",
    type: "choice",
    options: [
      "Career and professional growth",
      "Financial stability",
      "Relationships and connections",
      "The unknown future"
    ]
  },
  {
    id: 8,
    text: "Which word attracts you the most right now?",
    type: "choice",
    options: [
      "Freedom",
      "Success",
      "Love",
      "Peace"
    ]
  }
];
