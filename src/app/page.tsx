"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Disclaimer from "@/components/Disclaimer";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/intro");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-background via-secondary to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold font-poppins bg-gradient-to-r from-accent via-yellow-200 to-accent bg-clip-text text-transparent mb-2">
            MindMirror
          </h1>
          <p className="text-text-muted text-sm md:text-base">
            Sometimes the mind reveals more than you expect.
          </p>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins leading-tight mb-6 text-white">
            What if we could know something about you without asking directly?
          </h2>
          <p className="text-lg md:text-xl text-text-muted mb-4">
            This experiment has surprised thousands of people.
          </p>

          {/* Micro Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8 text-sm text-text-muted/80"
          >
            <p>No signup.</p>
            <p>No personal data.</p>
            <p>Just one strange experiment.</p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="px-8 py-4 h-14 bg-gradient-to-r from-accent to-yellow-600 text-black font-semibold font-poppins rounded-full text-lg shadow-lg hover:shadow-accent/50 transition-all duration-300 animate-glow"
          >
            Start Experiment
          </motion.button>

          {/* Social Proof with Animated Counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6"
          >
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-accent text-xl">★</span>
              ))}
            </div>
            <p className="text-text-muted text-sm">
              <span className="font-semibold text-white">103,481</span> people have taken the experiment.
            </p>
            <p className="text-text-muted text-sm">
              <span className="font-semibold text-white">92%</span> said at least one insight felt surprisingly accurate.
            </p>
          </motion.div>
        </motion.div>

        {/* Emotional Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/30"
        >
          <h3 className="text-lg font-semibold font-poppins mb-4 text-accent">
            Why try it?
          </h3>
          <ul className="space-y-3 text-left">
            {[
              "✓ No personal data required",
              "✓ Takes less than 60 seconds",
              "✓ Surprisingly personal results",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                className="text-text-muted"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <Disclaimer />
    </div>
  );
}
