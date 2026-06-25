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
        // Picture preference - indicates personality traits
        if (answer.answer.includes("mountain")) {
          scores.confidence += 2;
          scores.selfDoubt -= 1;
        } else if (answer.answer.includes("city")) {
          scores.riskTaking += 2;
          scores.confidence += 1;
        } else if (answer.answer.includes("forest")) {
          scores.relationshipFocus += 2;
          scores.familyAttachment += 1;
        } else if (answer.answer.includes("ocean")) {
          scores.overthinking += 2;
          scores.needForValidation += 1;
        }
        break;

      case 2:
        // Life situation
        if (answer.answer.includes("stuck")) {
          scores.careerAnxiety += 3;
          scores.selfDoubt += 2;
          scores.confidence -= 1;
        } else if (answer.answer.includes("changes")) {
          scores.riskTaking += 2;
          scores.confidence += 1;
        } else if (answer.answer.includes("goals")) {
          scores.confidence += 3;
          scores.careerAnxiety += 1;
        } else if (answer.answer.includes("uncertain")) {
          scores.overthinking += 3;
          scores.needForValidation += 2;
        }
        break;

      case 3:
        // Overthinking frequency
        if (answer.answer.includes("never")) {
          scores.overthinking -= 2;
          scores.confidence += 2;
        } else if (answer.answer.includes("Sometimes")) {
          scores.overthinking += 1;
        } else if (answer.answer.includes("Often")) {
          scores.overthinking += 2;
          scores.selfDoubt += 1;
        } else if (answer.answer.includes("Constantly")) {
          scores.overthinking += 3;
          scores.selfDoubt += 2;
          scores.needForValidation += 1;
        }
        break;

      case 4:
        // Being misunderstood
        if (answer.answer.includes("No")) {
          scores.confidence += 2;
          scores.needForValidation -= 1;
        } else if (answer.answer.includes("Sometimes")) {
          scores.needForValidation += 1;
        } else if (answer.answer.includes("Often")) {
          scores.needForValidation += 2;
          scores.relationshipFocus += 1;
        } else if (answer.answer.includes("Yes")) {
          scores.needForValidation += 3;
          scores.relationshipFocus += 2;
          scores.selfDoubt += 1;
        }
        break;

      case 5:
        // Heart vs Logic
        if (answer.answer.includes("heart")) {
          scores.relationshipFocus += 2;
          scores.riskTaking += 1;
          scores.confidence += 1;
        } else if (answer.answer.includes("logic")) {
          scores.confidence += 2;
          scores.careerAnxiety += 1;
          scores.selfDoubt -= 1;
        } else if (answer.answer.includes("balance")) {
          scores.confidence += 3;
          scores.selfDoubt -= 1;
        } else if (answer.answer.includes("depends")) {
          scores.overthinking += 1;
          scores.needForValidation += 1;
        }
        break;

      case 6:
        // Thought question - always adds to relationship focus
        scores.relationshipFocus += 2;
        scores.needForValidation += 1;
        break;

      case 7:
        // Main worry
        if (answer.answer.includes("Career")) {
          scores.careerAnxiety += 3;
          scores.confidence -= 1;
        } else if (answer.answer.includes("Financial")) {
          scores.careerAnxiety += 2;
          scores.riskTaking -= 1;
        } else if (answer.answer.includes("Relationships")) {
          scores.relationshipFocus += 3;
          scores.needForValidation += 2;
        } else if (answer.answer.includes("future")) {
          scores.overthinking += 3;
          scores.selfDoubt += 2;
        }
        break;

      case 8:
        // Word attraction
        if (answer.answer.includes("Freedom")) {
          scores.riskTaking += 3;
          scores.confidence += 1;
        } else if (answer.answer.includes("Success")) {
          scores.careerAnxiety += 2;
          scores.confidence += 2;
          scores.needForValidation += 1;
        } else if (answer.answer.includes("Love")) {
          scores.relationshipFocus += 3;
          scores.needForValidation += 2;
        } else if (answer.answer.includes("Peace")) {
          scores.overthinking += 2;
          scores.familyAttachment += 1;
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
