"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Disclaimer from "@/components/Disclaimer";
import { questions } from "@/lib/questions";
import { useExperimentStore } from "@/store/experimentStore";

const revelations = {
  3: {
    title: "Interesting...",
    text: "We noticed something already.",
  },
  5: {
    title: "Pause",
    text: "Most people with your choices share one particular trait. We'll tell you in a moment.",
  },
};

export default function ExperimentPage() {
  const router = useRouter();
  const [showRevelation, setShowRevelation] = useState(false);
  const {
    currentQuestion,
    answers,
    setAnswer,
    nextQuestion,
    previousQuestion,
    complete,
  } = useExperimentStore();

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestionData.id)?.answer;

  useEffect(() => {
    if (currentQuestion === questions.length) {
      complete();
      router.push("/analyzing");
    }
  }, [currentQuestion, complete, router]);

  const handleAnswer = (answer: string) => {
    setAnswer(currentQuestionData.id, answer);
    
    // Check if this question has a revelation
    if (revelations[currentQuestionData.id as keyof typeof revelations]) {
      setShowRevelation(true);
    } else {
      setTimeout(() => {
        nextQuestion();
      }, 300);
    }
  };

  const handleRevelationContinue = () => {
    setShowRevelation(false);
    setTimeout(() => {
      nextQuestion();
    }, 300);
  };

  const handleNext = () => {
    if (currentAnswer) {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const currentRevelation = revelations[currentQuestionData.id as keyof typeof revelations];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-background via-secondary to-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl w-full"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-text-muted mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-yellow-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          {!showRevelation ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-secondary/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/30"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold font-poppins mb-8 text-white leading-tight">
                {currentQuestionData.text}
              </h2>

              {currentQuestionData.type === "choice" && currentQuestionData.options && (
                <div className="space-y-4">
                  {currentQuestionData.options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option)}
                      className={`w-full text-left p-4 md:p-6 min-h-[56px] rounded-xl border-2 transition-all duration-300 font-poppins font-semibold flex items-center ${
                        currentAnswer === option
                          ? "border-accent bg-accent/20 text-accent"
                          : "border-primary/30 bg-primary/20 text-white hover:border-accent/50"
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

              {currentQuestionData.type === "thought" && (
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="text-6xl mb-4 animate-pulse-slow">🧠</div>
                    <p className="text-text-muted text-lg">Take your time...</p>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="w-full py-4 h-14 bg-gradient-to-r from-accent to-yellow-600 text-black font-semibold font-poppins rounded-full text-lg"
                  >
                    I'm ready to continue
                  </motion.button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="revelation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="bg-secondary/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-accent/30 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-5xl mb-6">✨</div>
                <h3 className="text-2xl md:text-3xl font-extrabold font-poppins text-accent mb-4">
                  {currentRevelation?.title}
                </h3>
                <p className="text-lg md:text-xl text-white mb-8">
                  {currentRevelation?.text}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRevelationContinue}
                  className="px-8 py-4 h-14 bg-gradient-to-r from-accent to-yellow-600 text-black font-semibold font-poppins rounded-full text-lg shadow-lg hover:shadow-accent/50 transition-all duration-300"
                >
                  Continue
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {currentQuestion > 0 && !showRevelation && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handlePrevious}
            className="mt-6 text-text-muted hover:text-white transition-colors font-poppins"
          >
            ← Previous question
          </motion.button>
        )}
      </motion.div>

      <Disclaimer />
    </div>
  );
}
