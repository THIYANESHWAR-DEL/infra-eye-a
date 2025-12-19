import { motion } from "framer-motion";
import { BookOpen, Trophy, Flame, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

interface LearningProgressProps {
  completedLessons: number;
  totalLessons: number;
  xp: number;
  streak: number;
}

export const LearningProgress = ({ 
  completedLessons, 
  totalLessons, 
  xp, 
  streak 
}: LearningProgressProps) => {
  const { language } = useLanguage();
  const progress = (completedLessons / totalLessons) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-display font-semibold">
            {language === "ta" ? "கற்றல் முன்னேற்றம்" : "Learning Progress"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {completedLessons}/{totalLessons} {language === "ta" ? "பாடங்கள்" : "lessons"}
          </p>
        </div>
      </div>

      <Progress value={progress} className="h-3 mb-6" />

      <div className="grid grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-3 rounded-xl bg-muted/50"
        >
          <div className="flex justify-center mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="text-lg font-bold font-display">{xp}</div>
          <div className="text-xs text-muted-foreground">XP</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-3 rounded-xl bg-muted/50"
        >
          <div className="flex justify-center mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="text-lg font-bold font-display">{streak}</div>
          <div className="text-xs text-muted-foreground">
            {language === "ta" ? "நாள்" : "Day Streak"}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-3 rounded-xl bg-muted/50"
        >
          <div className="flex justify-center mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="text-lg font-bold font-display">{completedLessons}</div>
          <div className="text-xs text-muted-foreground">
            {language === "ta" ? "முடிந்தது" : "Done"}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
