"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [
  {
    text: "Please don't overthink your answers.",
    subtext: "Your first instincts matter most.",
  },
  {
    text: "We are looking for patterns, not right answers.",
    subtext: "There are no correct or incorrect choices.",
  },
  {
    text: "This experiment works best when you're honest with yourself.",
    subtext: "The more authentic your responses, the more accurate the reading.",
  },
];

export default function IntroPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/experiment");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-background via-secondary to-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center"
        >
          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex justify-center gap-2 mb-4">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? "bg-accent" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>
            <p className="text-text-muted text-sm">
              Step {currentStep + 1} of {steps.length}
            </p>
          </motion.div>

          {/* Main Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins leading-tight mb-6 text-white">
              {steps[currentStep].text}
            </h1>
            <p className="text-lg md:text-xl text-text-muted">
              {steps[currentStep].subtext}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="px-8 py-4 h-14 bg-gradient-to-r from-accent to-yellow-600 text-black font-semibold font-poppins rounded-full text-lg shadow-lg hover:shadow-accent/50 transition-all duration-300"
          >
            {currentStep < steps.length - 1 ? "Continue" : "Begin Experiment"}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
