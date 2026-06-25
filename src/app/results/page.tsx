"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Disclaimer from "@/components/Disclaimer";
import ShareCard from "@/components/ShareCard";
import { useExperimentStore } from "@/store/experimentStore";
import { useResultsStore } from "@/store/resultsStore";
import { calculatePersonalityScores, determineArchetype } from "@/lib/psychologyEngine";

export default function ResultsPage() {
  const router = useRouter();
  const { answers, reset: resetExperiment } = useExperimentStore();
  const {
    archetype,
    scores,
    aiResult,
    isPremium,
    isLoading,
    setArchetype,
    setScores,
    setAIResult,
    setPremium,
    setLoading,
  } = useResultsStore();

  const [showPaywall, setShowPaywall] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    const generateResults = async () => {
      if (answers.length === 0) {
        router.push("/");
        return;
      }

      // Calculate scores and archetype
      const calculatedScores = calculatePersonalityScores(answers);
      const determinedArchetype = determineArchetype(calculatedScores);
      
      setScores(calculatedScores);
      setArchetype(determinedArchetype);

      // Generate AI insights
      try {
        const response = await fetch("/api/generate-insights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            archetype: determinedArchetype,
            scores: calculatedScores,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setAIResult(result);
        }
      } catch (error) {
        console.error("Error generating insights:", error);
      } finally {
        setLoading(false);
      }
    };

    generateResults();
  }, [answers, router, setScores, setArchetype, setAIResult, setLoading]);

  const handleUnlock = () => {
    setShowPaywall(true);
  };

  const handleShare = () => {
    setShowShareCard(true);
  };

  const handleRestart = () => {
    resetExperiment();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-background via-secondary to-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-4"
        >
          🔮
        </motion.div>
        <p className="text-text-muted">Generating your reading...</p>
        <Disclaimer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-background via-secondary to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        {/* Archetype Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-poppins bg-gradient-to-r from-accent via-yellow-200 to-accent bg-clip-text text-transparent mb-2">
            {archetype}
          </h1>
          {aiResult?.headline && (
            <p className="text-lg text-text-muted">{aiResult.headline}</p>
          )}
        </motion.div>

        {/* Insights */}
        <AnimatePresence mode="wait">
          {!showPaywall ? (
            <motion.div
              key="free-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Free Insight */}
              {aiResult?.insights[0] && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/30"
                >
                  <h3 className="text-accent font-semibold font-poppins mb-3">
                    Your First Insight
                  </h3>
                  <p className="text-white leading-relaxed">
                    {aiResult.insights[0].text}
                  </p>
                </motion.div>
              )}

              {/* Blurred Insights */}
              <div className="space-y-4 blur-sm opacity-50">
                {aiResult?.insights.slice(1).map((insight, index) => (
                  <div
                    key={index}
                    className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/30"
                  >
                    <h3 className="text-accent font-semibold font-poppins mb-3">
                      {insight.type.replace(/_/g, " ").toUpperCase()}
                    </h3>
                    <p className="text-white leading-relaxed">
                      {insight.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Unlock Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlock}
                className="w-full py-4 bg-gradient-to-r from-accent to-yellow-600 text-black font-semibold font-poppins rounded-full text-lg shadow-lg hover:shadow-accent/50 transition-all duration-300"
              >
                Unlock Complete Reading
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="paywall"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 border border-accent/50 text-center"
              >
                <h2 className="text-2xl font-extrabold font-poppins mb-2 text-accent">
                  Your Mind Map is Ready
                </h2>
                <p className="text-text-muted mb-6">
                  Unlock your complete reading
                </p>

                <div className="space-y-3 text-left mb-8">
                  {[
                    "✓ Complete personality profile",
                    "✓ Hidden strengths revealed",
                    "✓ Relationship patterns",
                    "✓ Emotional tendencies",
                    "✓ Personalized insights",
                  ].map((item, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-text-muted"
                    >
                      {item}
                    </motion.p>
                  ))}
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-accent to-yellow-600 text-black font-semibold font-poppins rounded-full text-lg"
                  >
                    Unlock for ₹19
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 border-2 border-accent text-accent font-semibold font-poppins rounded-full text-lg hover:bg-accent/10 transition-all"
                  >
                    Premium ₹49
                    <span className="block text-xs font-normal text-text-muted">
                      Extended report + Relationship analysis
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              <motion.button
                onClick={() => setShowPaywall(false)}
                className="w-full text-text-muted hover:text-white transition-colors font-poppins"
              >
                ← Back to free result
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex-1 py-3 bg-primary/50 border border-primary/30 rounded-full font-poppins font-semibold hover:bg-primary/70 transition-all"
          >
            Share Results
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="flex-1 py-3 bg-primary/50 border border-primary/30 rounded-full font-poppins font-semibold hover:bg-primary/70 transition-all"
          >
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Share Card Modal */}
      <AnimatePresence>
        {showShareCard && aiResult?.shareable_line && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowShareCard(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <ShareCard
                archetype={archetype}
                shareableLine={aiResult.shareable_line}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareCard(false)}
                className="w-full mt-4 py-3 bg-primary/50 border border-primary/30 rounded-full font-poppins font-semibold hover:bg-primary/70 transition-all"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Disclaimer />
    </div>
  );
}
