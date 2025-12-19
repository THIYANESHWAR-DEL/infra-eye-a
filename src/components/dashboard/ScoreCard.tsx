import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadialGauge } from "./RadialGauge";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";

interface ScoreCardProps {
  score: number;
  trend: "up" | "down";
  trendValue: number;
}

export const ScoreCard = ({ score, trend, trendValue }: ScoreCardProps) => {
  const { language } = useLanguage();
  const isChampion = score >= 90;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isChampion) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isChampion]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-2xl backdrop-blur-xl border shadow-xl overflow-hidden ${
        isChampion 
          ? "bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/30" 
          : "bg-card/70 border-border/50"
      }`}
    >
      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  y: -20, 
                  x: Math.random() * 100 + "%",
                  rotate: 0 
                }}
                animate={{ 
                  opacity: 0, 
                  y: 200, 
                  rotate: Math.random() * 360 
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2 + Math.random(), 
                  delay: Math.random() * 0.5 
                }}
                className="absolute"
              >
                <Sparkles className={`w-4 h-4 ${
                  i % 3 === 0 ? "text-amber-400" : i % 3 === 1 ? "text-yellow-400" : "text-orange-400"
                }`} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center">
        <h3 className="font-display font-semibold text-lg mb-4">
          {language === "ta" ? "சைபர் பாதுகாப்பு மதிப்பெண்" : "Cyber Safety Score"}
        </h3>
        
        <RadialGauge score={score} />

        <div className="flex items-center gap-2 mt-4">
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {trend === "up" ? "+" : "-"}{trendValue}% {language === "ta" ? "இந்த வாரம்" : "this week"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
