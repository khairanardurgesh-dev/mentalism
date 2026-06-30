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
    text: "Which sentence feels more familiar?",
    type: "choice",
    options: [
      "I replay conversations in my head.",
      "I move on quickly.",
      "Depends on the situation.",
      "I don't know."
    ]
  },
  {
    id: 2,
    text: "Which area of life feels the most unfinished right now?",
    type: "choice",
    options: [
      "Career",
      "Relationships",
      "Personal goals",
      "Something else"
    ]
  },
  {
    id: 3,
    text: "When you have free time, where does your mind usually go?",
    type: "choice",
    options: [
      "Thinking about the past",
      "Planning the future",
      "Enjoying the present",
      "Worrying about something"
    ]
  },
  {
    id: 4,
    text: "Which of these feels most true about you?",
    type: "choice",
    options: [
      "I notice details others miss.",
      "I see the big picture easily.",
      "I'm good at both.",
      "I'm not sure."
    ]
  },
  {
    id: 5,
    text: "Think about a recent decision you made. How did you feel after?",
    type: "choice",
    options: [
      "Confident it was right",
      "Worried I made a mistake",
      "Neutral, it is what it is",
      "I still think about it"
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
    text: "Which of these would you choose if you had to?",
    type: "choice",
    options: [
      "Be understood by everyone",
      "Understand everyone",
      "Be left alone",
      "Never be alone"
    ]
  },
  {
    id: 8,
    text: "When something unexpected happens, what's your first reaction?",
    type: "choice",
    options: [
      "Analyze what caused it",
      "Feel the emotion first",
      "Try to fix it immediately",
      "Wait and see what happens"
    ]
  }
];
