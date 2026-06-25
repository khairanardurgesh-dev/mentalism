"use client";

import { motion } from "framer-motion";
import Disclaimer from "@/components/Disclaimer";

export default function AdminDashboard() {
  // Mock data - in production, this would come from the database
  const stats = [
    { label: "Total Visitors", value: "125,432", change: "+12%" },
    { label: "Started Experiments", value: "89,234", change: "+8%" },
    { label: "Completed Experiments", value: "67,891", change: "+15%" },
    { label: "Conversion Rate", value: "76%", change: "+3%" },
    { label: "Revenue", value: "₹4,52,345", change: "+22%" },
  ];

  const topArchetypes = [
    { name: "The Overthinker", count: 23456, percentage: 35 },
    { name: "The Dreamer", count: 18923, percentage: 28 },
    { name: "The Silent Achiever", count: 12456, percentage: 18 },
    { name: "The Romantic", count: 8934, percentage: 13 },
    { name: "The Explorer", count: 6122, percentage: 6 },
  ];

  const dropOffPoints = [
    { question: "Question 3", dropOff: 15, reason: "Overthinking question" },
    { question: "Question 6", dropOff: 12, reason: "Thought exercise" },
    { question: "Paywall", dropOff: 45, reason: "Payment friction" },
  ];

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-background via-secondary to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold font-poppins bg-gradient-to-r from-accent via-yellow-200 to-accent bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-text-muted">MindMirror Analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/30"
            >
              <p className="text-text-muted text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-extrabold font-poppins text-white mb-1">
                {stat.value}
              </p>
              <p className="text-accent text-sm">{stat.change} this week</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Archetypes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/30"
          >
            <h3 className="text-xl font-extrabold font-poppins text-accent mb-6">
              Most Common Archetypes
            </h3>
            <div className="space-y-4">
              {topArchetypes.map((archetype, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white font-semibold">{archetype.name}</span>
                    <span className="text-text-muted">{archetype.count}</span>
                  </div>
                  <div className="h-2 bg-primary/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${archetype.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-accent to-yellow-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Drop-off Points */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/30"
          >
            <h3 className="text-xl font-extrabold font-poppins text-accent mb-6">
              Top Drop-off Points
            </h3>
            <div className="space-y-4">
              {dropOffPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-primary/20 rounded-xl"
                >
                  <div>
                    <p className="text-white font-semibold">{point.question}</p>
                    <p className="text-text-muted text-sm">{point.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold font-poppins text-accent">
                      {point.dropOff}%
                    </p>
                    <p className="text-text-muted text-xs">drop-off</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/30"
        >
          <h3 className="text-xl font-extrabold font-poppins text-accent mb-6">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { action: "New payment received", user: "user@example.com", time: "2 min ago" },
              { action: "Experiment completed", user: "guest session", time: "5 min ago" },
              { action: "Share on WhatsApp", user: "user@example.com", time: "8 min ago" },
              { action: "Premium upgrade", user: "user@example.com", time: "12 min ago" },
              { action: "Experiment started", user: "guest session", time: "15 min ago" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-primary/20 rounded-xl"
              >
                <div>
                  <p className="text-white font-semibold">{activity.action}</p>
                  <p className="text-text-muted text-sm">{activity.user}</p>
                </div>
                <p className="text-text-muted text-sm">{activity.time}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <Disclaimer />
    </div>
  );
}
