import { motion } from "framer-motion";
import { Shield, TrendingUp, TrendingDown } from "lucide-react";

interface RiskScoreCardProps {
  score: number;
  trend: "up" | "down";
  trendValue: number;
}

export const RiskScoreCard = ({ score, trend, trendValue }: RiskScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "At Risk";
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg">Cyber Risk Score</h3>
        <div className={`flex items-center gap-1 text-sm ${trend === "up" ? "text-success" : "text-destructive"}`}>
          {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{trendValue}%</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-52 h-52">
          {/* Background Circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="104"
              cy="104"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-muted"
            />
            <motion.circle
              cx="104"
              cy="104"
              r="90"
              fill="none"
              strokeWidth="12"
              strokeLinecap="round"
              className={getScoreColor(score)}
              style={{
                stroke: "url(#scoreGradient)",
                strokeDasharray: circumference,
              }}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2"
            >
              <Shield className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-4xl font-bold font-display"
            >
              {score}
            </motion.span>
            <span className={`text-sm font-medium ${getScoreColor(score)}`}>
              {getScoreLabel(score)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        {[
          { label: "Scans", value: "24" },
          { label: "Threats", value: "3" },
          { label: "Resolved", value: "21" },
        ].map((stat, i) => (
          <div key={i} className="p-3 rounded-lg bg-muted/50">
            <div className="text-xl font-bold font-display">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
