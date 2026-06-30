"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Disclaimer from "@/components/Disclaimer";

const analysisSteps = [
  "Reading patterns...",
  "Comparing emotional tendencies...",
  "Looking for hidden similarities...",
  "One observation keeps appearing...",
  "Finalizing...",
];

export default function AnalyzingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000); // 2 seconds per step, total 10 seconds

    const timeout = setTimeout(() => {
      router.push("/results");
    }, 10000); // 10 seconds total

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-background via-secondary to-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Animated Circle */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-12"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-accent/30" />
          <div className="absolute inset-2 rounded-full border-4 border-accent/50" />
          <div className="absolute inset-4 rounded-full border-4 border-accent animate-pulse" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="text-4xl">🔮</div>
          </motion.div>
        </motion.div>

        {/* Analysis Steps */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index === currentStep ? 1 : index < currentStep ? 0.5 : 0,
                  y: index === currentStep ? 0 : index < currentStep ? -10 : 20,
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`text-xl md:text-2xl font-poppins font-semibold ${
                  index === currentStep
                    ? "text-accent animate-pulse"
                    : index < currentStep
                    ? "text-text-muted"
                    : "text-transparent"
                }`}
              >
                {step}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center gap-2"
        >
          {analysisSteps.map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{
                scale: index <= currentStep ? 1 : 0,
                backgroundColor: index <= currentStep ? "#D4AF37" : "#1C1638",
              }}
              transition={{ duration: 0.3 }}
              className="w-3 h-3 rounded-full"
            />
          ))}
        </motion.div>

        {/* Subtle hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-text-muted text-sm"
        >
          This usually takes about 10 seconds...
        </motion.p>
      </motion.div>

      <Disclaimer />
    </div>
  );
}
