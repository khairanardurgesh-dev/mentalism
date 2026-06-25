"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Disclaimer from "@/components/Disclaimer";
import { questions } from "@/lib/questions";
import { useExperimentStore } from "@/store/experimentStore";

export default function ExperimentPage() {
  const router = useRouter();
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-background via-secondary to-background">
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
                    className={`w-full text-left p-4 md:p-6 rounded-xl border-2 transition-all duration-300 font-poppins font-semibold ${
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
                  className="w-full py-4 bg-gradient-to-r from-accent to-yellow-600 text-black font-semibold font-poppins rounded-full text-lg"
                >
                  I'm ready to continue
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentQuestion > 0 && (
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
