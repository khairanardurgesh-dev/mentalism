"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import html2canvas from "html2canvas";

interface ShareCardProps {
  archetype: string;
  shareableLine: string;
}

export default function ShareCard({ archetype, shareableLine }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#050505",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `mindmirror-${archetype.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Apparently I'm ${archetype}. ${shareableLine}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleTwitterShare = () => {
    const text = `Apparently this experiment thinks I'm ${archetype}. ${shareableLine}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleInstagramShare = () => {
    // Instagram doesn't have a direct share URL, so we download the image
    handleDownload();
  };

  return (
    <div className="space-y-4">
      {/* Share Card Preview */}
      <div
        ref={cardRef}
        className="bg-gradient-to-br from-primary via-secondary to-background rounded-3xl p-8 border border-accent/30 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="text-2xl font-extrabold font-poppins text-accent mb-2">
            MindMirror
          </h3>
          <p className="text-text-muted text-sm mb-6">
            The experiment that knows you surprisingly well
          </p>
          
          <div className="bg-gradient-to-br from-accent/20 to-yellow-600/20 backdrop-blur-sm rounded-2xl p-6 border border-accent/40 mb-4">
            <p className="text-sm text-text-muted mb-2">Apparently this experiment thinks I'm</p>
            <p className="text-2xl font-extrabold font-poppins text-white mb-3">
              {archetype}
            </p>
            <p className="text-text-muted text-sm leading-relaxed italic">
              "{shareableLine}"
            </p>
          </div>

          <p className="text-xs text-text-muted">
            Try it yourself at mindmirror.app
          </p>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppShare}
          className="flex-1 py-3 h-14 bg-green-600 text-white font-semibold font-poppins rounded-full hover:bg-green-700 transition-all"
        >
          WhatsApp
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTwitterShare}
          className="flex-1 py-3 h-14 bg-blue-400 text-white font-semibold font-poppins rounded-full hover:bg-blue-500 transition-all"
        >
          Twitter
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleInstagramShare}
          className="flex-1 py-3 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold font-poppins rounded-full hover:opacity-90 transition-all"
        >
          Instagram
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="flex-1 py-3 h-14 bg-accent text-black font-semibold font-poppins rounded-full hover:bg-yellow-600 transition-all"
        >
          Download
        </motion.button>
      </div>
    </div>
  );
}
