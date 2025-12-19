import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Trophy, Sparkles, Crown, Star } from "lucide-react";

interface RadialGaugeProps {
  score: number;
  size?: number;
}

export const RadialGauge = ({ score, size = 200 }: RadialGaugeProps) => {
  const { language } = useLanguage();
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (score / 100) * circumference;
  const isChampion = score >= 90;

  const getScoreColor = () => {
    if (score >= 90) return "text-amber-500";
    if (score >= 70) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getGradientColors = () => {
    if (score >= 90) return { start: "#f59e0b", end: "#eab308" }; // Gold
    if (score >= 70) return { start: "#22c55e", end: "#10b981" }; // Green
    if (score >= 50) return { start: "#eab308", end: "#f59e0b" }; // Yellow
    return { start: "#ef4444", end: "#f97316" }; // Red
  };

  const colors = getGradientColors();

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Champion glow effect */}
      {isChampion && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/30 to-yellow-400/30 blur-xl"
          style={{ width: size + 40, height: size + 40, left: -20, top: -20 }}
        />
      )}

      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
          {isChampion && (
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={80}
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-muted/30"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={80}
          stroke="url(#scoreGradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          filter={isChampion ? "url(#glow)" : undefined}
        />
      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {isChampion && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Crown className="w-6 h-6 text-amber-500 mb-1" />
          </motion.div>
        )}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className={`text-4xl font-bold font-display ${getScoreColor()}`}
        >
          {score}
        </motion.span>
        <span className="text-sm text-muted-foreground">
          {language === "ta" ? "புள்ளிகள்" : "points"}
        </span>
      </div>

      {/* Champion badge */}
      {isChampion && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold text-sm shadow-lg"
        >
          <Trophy className="w-4 h-4" />
          {language === "ta" ? "சைபர் சாம்பியன்" : "Cyber Champion"}
          <Sparkles className="w-4 h-4" />
        </motion.div>
      )}
    </div>
  );
};
