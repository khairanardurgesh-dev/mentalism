export interface PersonalityScores {
  overthinking: number;
  confidence: number;
  relationshipFocus: number;
  careerAnxiety: number;
  familyAttachment: number;
  needForValidation: number;
  riskTaking: number;
  selfDoubt: number;
}

export interface Answer {
  questionId: number;
  answer: string;
}

export interface PremiumReport {
  hiddenStrength: string;
  sidePeopleMiss: string;
  drainsEnergy: string;
  relationshipPattern: string;
  innerConflict: string;
  questionYouAvoid: string;
  reflectionAdvice: string;
}

export function calculatePersonalityScores(answers: Answer[]): PersonalityScores {
  const scores: PersonalityScores = {
    overthinking: 0,
    confidence: 0,
    relationshipFocus: 0,
    careerAnxiety: 0,
    familyAttachment: 0,
    needForValidation: 0,
    riskTaking: 0,
    selfDoubt: 0,
  };

  answers.forEach((answer) => {
    switch (answer.questionId) {
      case 1:
        // Which sentence feels more familiar?
        if (answer.answer.includes("replay")) {
          scores.overthinking += 3;
          scores.selfDoubt += 1;
        } else if (answer.answer.includes("move on")) {
          scores.confidence += 2;
          scores.overthinking -= 1;
        } else if (answer.answer.includes("Depends")) {
          scores.overthinking += 1;
          scores.needForValidation += 1;
        }
        break;

      case 2:
        // Which area of life feels most unfinished?
        if (answer.answer.includes("Career")) {
          scores.careerAnxiety += 3;
          scores.confidence -= 1;
        } else if (answer.answer.includes("Relationships")) {
          scores.relationshipFocus += 3;
          scores.needForValidation += 2;
        } else if (answer.answer.includes("Personal goals")) {
          scores.confidence += 2;
          scores.careerAnxiety += 1;
        } else if (answer.answer.includes("Something else")) {
          scores.overthinking += 2;
          scores.selfDoubt += 1;
        }
        break;

      case 3:
        // When you have free time, where does your mind go?
        if (answer.answer.includes("past")) {
          scores.overthinking += 2;
          scores.selfDoubt += 1;
        } else if (answer.answer.includes("future")) {
          scores.careerAnxiety += 2;
          scores.confidence += 1;
        } else if (answer.answer.includes("present")) {
          scores.confidence += 2;
          scores.overthinking -= 1;
        } else if (answer.answer.includes("Worrying")) {
          scores.overthinking += 3;
          scores.needForValidation += 2;
        }
        break;

      case 4:
        // Which of these feels most true about you?
        if (answer.answer.includes("details")) {
          scores.overthinking += 2;
          scores.confidence += 1;
        } else if (answer.answer.includes("big picture")) {
          scores.confidence += 2;
          scores.riskTaking += 1;
        } else if (answer.answer.includes("both")) {
          scores.confidence += 3;
        }
        break;

      case 5:
        // Think about a recent decision. How did you feel after?
        if (answer.answer.includes("Confident")) {
          scores.confidence += 3;
          scores.selfDoubt -= 1;
        } else if (answer.answer.includes("Worried")) {
          scores.overthinking += 3;
          scores.selfDoubt += 2;
          scores.needForValidation += 1;
        } else if (answer.answer.includes("Neutral")) {
          scores.confidence += 1;
        } else if (answer.answer.includes("still think")) {
          scores.overthinking += 2;
          scores.needForValidation += 1;
        }
        break;

      case 6:
        // Thought question - always adds to relationship focus
        scores.relationshipFocus += 2;
        scores.needForValidation += 1;
        break;

      case 7:
        // Which of these would you choose if you had to?
        if (answer.answer.includes("understood")) {
          scores.needForValidation += 3;
          scores.relationshipFocus += 1;
        } else if (answer.answer.includes("understand")) {
          scores.relationshipFocus += 2;
          scores.confidence += 1;
        } else if (answer.answer.includes("left alone")) {
          scores.confidence += 2;
          scores.familyAttachment -= 1;
        } else if (answer.answer.includes("Never be alone")) {
          scores.needForValidation += 2;
          scores.relationshipFocus += 2;
        }
        break;

      case 8:
        // When something unexpected happens, what's your first reaction?
        if (answer.answer.includes("Analyze")) {
          scores.confidence += 2;
          scores.overthinking += 1;
        } else if (answer.answer.includes("emotion")) {
          scores.relationshipFocus += 2;
          scores.needForValidation += 1;
        } else if (answer.answer.includes("fix")) {
          scores.confidence += 2;
          scores.riskTaking += 1;
        } else if (answer.answer.includes("Wait")) {
          scores.overthinking += 1;
          scores.riskTaking -= 1;
        }
        break;
    }
  });

  // Normalize scores to 0-10 range
  const normalizedScores: PersonalityScores = {
    overthinking: normalizeScore(scores.overthinking),
    confidence: normalizeScore(scores.confidence),
    relationshipFocus: normalizeScore(scores.relationshipFocus),
    careerAnxiety: normalizeScore(scores.careerAnxiety),
    familyAttachment: normalizeScore(scores.familyAttachment),
    needForValidation: normalizeScore(scores.needForValidation),
    riskTaking: normalizeScore(scores.riskTaking),
    selfDoubt: normalizeScore(scores.selfDoubt),
  };

  return normalizedScores;
}

function normalizeScore(score: number): number {
  // Assuming max possible score is around 10, min is -5
  const normalized = (score + 5) / 15 * 10;
  return Math.max(0, Math.min(10, normalized));
}

export function determineArchetype(scores: PersonalityScores): string {
  const archetypes = [
    {
      name: "The Dreamer",
      condition: (s: PersonalityScores) => 
        s.overthinking > 6 && s.relationshipFocus > 5 && s.confidence < 5,
    },
    {
      name: "The Overthinker",
      condition: (s: PersonalityScores) => 
        s.overthinking > 7 && s.selfDoubt > 5,
    },
    {
      name: "The Protector",
      condition: (s: PersonalityScores) => 
        s.relationshipFocus > 7 && s.familyAttachment > 6,
    },
    {
      name: "The Explorer",
      condition: (s: PersonalityScores) => 
        s.riskTaking > 6 && s.confidence > 5,
    },
    {
      name: "The Silent Achiever",
      condition: (s: PersonalityScores) => 
        s.confidence > 6 && s.careerAnxiety > 5 && s.needForValidation < 4,
    },
    {
      name: "The Romantic",
      condition: (s: PersonalityScores) => 
        s.relationshipFocus > 7 && s.needForValidation > 5,
    },
    {
      name: "The Rebuilder",
      condition: (s: PersonalityScores) => 
        s.selfDoubt > 5 && s.careerAnxiety > 5 && s.confidence < 5,
    },
    {
      name: "The Seeker",
      condition: (s: PersonalityScores) => 
        s.overthinking > 5 && s.riskTaking > 5,
    },
  ];

  for (const archetype of archetypes) {
    if (archetype.condition(scores)) {
      return archetype.name;
    }
  }

  // Default fallback based on highest score
  const maxScore = Math.max(...Object.values(scores));
  const highestTrait = Object.keys(scores).find(
    (key) => scores[key as keyof PersonalityScores] === maxScore
  );

  const traitToArchetype: Record<string, string> = {
    overthinking: "The Overthinker",
    confidence: "The Silent Achiever",
    relationshipFocus: "The Romantic",
    careerAnxiety: "The Rebuilder",
    familyAttachment: "The Protector",
    needForValidation: "The Dreamer",
    riskTaking: "The Explorer",
    selfDoubt: "The Rebuilder",
  };

  return traitToArchetype[highestTrait || "confidence"] || "The Seeker";
}

export function generatePremiumReport(scores: PersonalityScores, archetype: string): PremiumReport {
  const reports: Record<string, PremiumReport> = {
    "The Dreamer": {
      hiddenStrength: "Your imagination allows you to see possibilities others miss. You have a unique ability to connect seemingly unrelated ideas.",
      sidePeopleMiss: "Beneath your dreamy exterior, you possess a quiet determination. When something truly matters to you, you pursue it with surprising persistence.",
      drainsEnergy: "Rigid routines and people who dismiss your ideas without consideration drain your creative spirit.",
      relationshipPattern: "You're drawn to people who appreciate your depth but often feel misunderstood by those who prefer surface-level interactions.",
      innerConflict: "You crave stability but simultaneously fear it will stifle your creative freedom.",
      questionYouAvoid: "What if your dreams are actually achievable?",
      reflectionAdvice: "Ground one of your dreams in practical action this week. Small steps validate your vision without overwhelming it.",
    },
    "The Overthinker": {
      hiddenStrength: "Your analytical mind notices patterns and details that escape others. This makes you exceptionally good at problem-solving when you trust your instincts.",
      sidePeopleMiss: "You care deeply about doing things right. Your attention to detail comes from a place of genuine care, not perfectionism.",
      drainsEnergy: "Ambiguity and rushed decisions exhaust you. You need time to process information thoroughly.",
      relationshipPattern: "You seek partners who communicate clearly and directly. Mixed signals trigger your anxiety.",
      innerConflict: "You want to be spontaneous but your mind naturally calculates every possible outcome first.",
      questionYouAvoid: "What if you trusted your first instinct?",
      reflectionAdvice: "Practice making one small decision daily without overthinking. Notice that most outcomes are manageable regardless.",
    },
    "The Protector": {
      hiddenStrength: "You have an intuitive sense of what others need before they ask. Your emotional intelligence creates deep, lasting bonds.",
      sidePeopleMiss: "Your protective nature extends to yourself too. You have strong boundaries that you enforce when necessary.",
      drainsEnergy: "Conflict and seeing people you care about in distress significantly deplete your energy.",
      relationshipPattern: "You're naturally drawn to caretaking roles but must ensure you don't lose yourself in the process.",
      innerConflict: "You want to help everyone but recognize that you can't save people from their own journeys.",
      questionYouAvoid: "What if protecting others sometimes means letting them struggle?",
      reflectionAdvice: "Practice receiving help as gracefully as you give it. This strengthens your relationships and models healthy interdependence.",
    },
    "The Explorer": {
      hiddenStrength: "Your adaptability allows you to thrive in uncertain situations. You turn challenges into adventures.",
      sidePeopleMiss: "Beneath your adventurous spirit, you deeply value loyalty. Once you commit to someone or something, you're all in.",
      drainsEnergy: "Monotony and excessive rules stifle your natural enthusiasm. You need variety to feel alive.",
      relationshipPattern: "You're attracted to independent partners who have their own passions. Clinginess makes you feel trapped.",
      innerConflict: "You crave freedom but simultaneously desire a sense of belonging and home.",
      questionYouAvoid: "What if settling down doesn't mean giving up your freedom?",
      reflectionAdvice: "Create rituals that provide stability without stifling your need for exploration. Consistency in small things supports your big adventures.",
    },
    "The Silent Achiever": {
      hiddenStrength: "Your consistent effort compounds into remarkable results over time. You don't need recognition to stay motivated.",
      sidePeopleMiss: "You have a dry wit and sharp humor that surprises people once they get to know you well.",
      drainsEnergy: "Office politics and unnecessary drama waste your energy. You prefer direct communication and clear goals.",
      relationshipPattern: "You respect competence and ambition. You're drawn to partners who are building something meaningful.",
      innerConflict: "You want recognition for your achievements but feel uncomfortable asking for it.",
      questionYouAvoid: "What if you allowed yourself to be seen and celebrated?",
      reflectionAdvice: "Share one win with someone you trust this week. Practice receiving praise without deflecting or minimizing.",
    },
    "The Romantic": {
      hiddenStrength: "Your capacity for emotional depth makes you an exceptional friend and partner. You remember the small details that matter most.",
      sidePeopleMiss: "You have strong boundaries that you enforce when your values are violated. You're not as soft as you appear.",
      drainsEnergy: "Superficial connections and emotional unavailability leave you feeling empty and depleted.",
      relationshipPattern: "You fall deeply and quickly. You seek intensity and meaning in your connections.",
      innerConflict: "You want deep connection but fear vulnerability will lead to hurt.",
      questionYouAvoid: "What if vulnerability is actually strength?",
      reflectionAdvice: "Practice sharing one authentic feeling per day with someone safe. Gradual vulnerability builds trust without overwhelming you.",
    },
    "The Rebuilder": {
      hiddenStrength: "Your resilience allows you to transform setbacks into comebacks. You've learned how to start over without losing yourself.",
      sidePeopleMiss: "You have a sharp sense of humor about life's difficulties. Your ability to laugh in dark times inspires others.",
      drainsEnergy: "Pessimism and people who dwell on problems without seeking solutions drain your forward momentum.",
      relationshipPattern: "You're attracted to other survivors—people who have weathered storms and emerged stronger.",
      innerConflict: "You're always rebuilding but sometimes wonder when you'll get to just enjoy what you've built.",
      questionYouAvoid: "What if you don't need to prove your worth through overcoming challenges?",
      reflectionAdvice: "Take time to appreciate stability when you find it. Practice resting in good moments without immediately looking for the next challenge.",
    },
    "The Seeker": {
      hiddenStrength: "Your curiosity drives continuous growth. You're always learning, evolving, and expanding your understanding.",
      sidePeopleMiss: "You have strong opinions and convictions once you've done your research. You're not easily swayed by surface-level arguments.",
      drainsEnergy: "Closed-mindedness and rigid thinking frustrate you. You need intellectual freedom to thrive.",
      relationshipPattern: "You're drawn to people who challenge your thinking and introduce you to new perspectives.",
      innerConflict: "You want to find answers but also enjoy the process of seeking. Completion sometimes feels like an ending.",
      questionYouAvoid: "What if the journey matters more than the destination?",
      reflectionAdvice: "Practice being present with what you've already learned instead of immediately seeking the next insight. Integration is as important as discovery.",
    },
  };

  return reports[archetype] || reports["The Seeker"];
}
