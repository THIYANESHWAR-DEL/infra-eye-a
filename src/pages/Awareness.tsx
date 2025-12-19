import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { 
  GraduationCap, 
  Trophy, 
  Star, 
  CheckCircle, 
  Lock,
  ChevronRight,
  Languages,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Language = "en" | "ta";

const lessons = [
  {
    id: 1,
    title: { en: "Password Security Basics", ta: "கடவுச்சொல் பாதுகாப்பு அடிப்படைகள்" },
    description: { en: "Learn to create and manage strong passwords", ta: "வலுவான கடவுச்சொற்களை உருவாக்க கற்றுக்கொள்ளுங்கள்" },
    duration: "10 min",
    xp: 100,
    completed: true,
    locked: false,
  },
  {
    id: 2,
    title: { en: "Recognizing Phishing Emails", ta: "ஃபிஷிங் மின்னஞ்சல்களை அடையாளம் காணுதல்" },
    description: { en: "Identify fake emails and protect your data", ta: "போலி மின்னஞ்சல்களை கண்டறிந்து உங்கள் தரவைப் பாதுகாக்கவும்" },
    duration: "15 min",
    xp: 150,
    completed: true,
    locked: false,
  },
  {
    id: 3,
    title: { en: "Social Media Safety", ta: "சமூக ஊடக பாதுகாப்பு" },
    description: { en: "Protect your identity on social platforms", ta: "சமூக தளங்களில் உங்கள் அடையாளத்தைப் பாதுகாக்கவும்" },
    duration: "12 min",
    xp: 120,
    completed: false,
    locked: false,
  },
  {
    id: 4,
    title: { en: "Understanding Deepfakes", ta: "டீப்ஃபேக்குகளைப் புரிந்துகொள்வது" },
    description: { en: "Learn how AI generates fake media", ta: "AI போலி ஊடகங்களை எவ்வாறு உருவாக்குகிறது என்பதை அறியுங்கள்" },
    duration: "20 min",
    xp: 200,
    completed: false,
    locked: false,
  },
  {
    id: 5,
    title: { en: "Safe Online Shopping", ta: "பாதுகாப்பான ஆன்லைன் ஷாப்பிங்" },
    description: { en: "Shop securely and avoid scams", ta: "பாதுகாப்பாக ஷாப்பிங் செய்து மோசடிகளைத் தவிர்க்கவும்" },
    duration: "15 min",
    xp: 150,
    completed: false,
    locked: true,
  },
  {
    id: 6,
    title: { en: "Mobile Device Security", ta: "மொபைல் சாதன பாதுகாப்பு" },
    description: { en: "Secure your smartphone and tablet", ta: "உங்கள் ஸ்மார்ட்போன் மற்றும் டேப்லெட்டைப் பாதுகாக்கவும்" },
    duration: "18 min",
    xp: 180,
    completed: false,
    locked: true,
  },
];

const quizzes = [
  { id: 1, title: "Password Quiz", questions: 10, score: 85, completed: true },
  { id: 2, title: "Phishing Challenge", questions: 15, score: 90, completed: true },
  { id: 3, title: "Social Media Test", questions: 12, score: null, completed: false },
];

const Awareness = () => {
  const [language, setLanguage] = useState<Language>("en");
  const completedLessons = lessons.filter(l => l.completed).length;
  const totalXP = lessons.filter(l => l.completed).reduce((acc, l) => acc + l.xp, 0);

  return (
    <>
      <Helmet>
        <title>Cyber Awareness Learning - CyberSuraksha AI</title>
        <meta name="description" content="Learn digital safety through gamified lessons in Tamil and English. Master cyber security with interactive quizzes and earn XP." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Learn</span> & Stay Safe
                  </h1>
                  <p className="text-muted-foreground">Gamified cyber security lessons in your language</p>
                </div>
                
                {/* Language Toggle */}
                <div className="flex items-center gap-2 p-1 rounded-lg bg-muted">
                  <Button
                    variant={language === "en" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setLanguage("en")}
                    className="gap-2"
                  >
                    <Languages className="w-4 h-4" />
                    English
                  </Button>
                  <Button
                    variant={language === "ta" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setLanguage("ta")}
                    className="gap-2"
                  >
                    <Languages className="w-4 h-4" />
                    தமிழ்
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-2xl font-bold font-display">{completedLessons}/{lessons.length}</p>
                  </div>
                </div>
                <Progress value={(completedLessons / lessons.length) * 100} className="mt-4 h-2" />
              </div>

              <div className="p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total XP</p>
                    <p className="text-2xl font-bold font-display">{totalXP}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quizzes Passed</p>
                    <p className="text-2xl font-bold font-display">{quizzes.filter(q => q.completed).length}/{quizzes.length}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lessons */}
              <div className="lg:col-span-2">
                <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {language === "en" ? "Lessons" : "பாடங்கள்"}
                </h2>
                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`group p-5 rounded-2xl border transition-all duration-300 ${
                        lesson.locked 
                          ? "bg-muted/30 border-border/30 opacity-60" 
                          : lesson.completed
                          ? "bg-success/5 border-success/30 hover:border-success/50"
                          : "bg-card/70 border-border/50 hover:border-primary/50 hover:shadow-lg"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          lesson.completed 
                            ? "bg-success/20" 
                            : lesson.locked 
                            ? "bg-muted" 
                            : "bg-primary/10"
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle className="w-6 h-6 text-success" />
                          ) : lesson.locked ? (
                            <Lock className="w-6 h-6 text-muted-foreground" />
                          ) : (
                            <span className="text-xl font-bold font-display text-primary">{lesson.id}</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1">{lesson.title[language]}</h3>
                          <p className="text-sm text-muted-foreground truncate">{lesson.description[language]}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>⏱ {lesson.duration}</span>
                            <span>⭐ {lesson.xp} XP</span>
                          </div>
                        </div>

                        {!lesson.locked && (
                          <Button 
                            variant={lesson.completed ? "outline" : "cyber"} 
                            size="sm"
                            className="flex-shrink-0"
                          >
                            {lesson.completed ? "Review" : "Start"}
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quizzes */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-warning" />
                  {language === "en" ? "Quizzes" : "வினாடி வினா"}
                </h2>
                <div className="space-y-4">
                  {quizzes.map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`p-5 rounded-2xl border transition-all duration-300 ${
                        quiz.completed 
                          ? "bg-success/5 border-success/30" 
                          : "bg-card/70 border-border/50 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{quiz.title}</h3>
                        {quiz.completed && quiz.score && (
                          <span className="px-2 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                            {quiz.score}%
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{quiz.questions} questions</p>
                      <Button 
                        variant={quiz.completed ? "outline" : "cyber"} 
                        size="sm" 
                        className="w-full"
                      >
                        {quiz.completed ? "Retake" : "Start Quiz"}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Poster Generator Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                >
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    🎨 {language === "en" ? "Poster Generator" : "போஸ்டர் ஜெனரேட்டர்"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en" 
                      ? "Create awareness posters to share with your community" 
                      : "உங்கள் சமூகத்துடன் பகிர விழிப்புணர்வு போஸ்டர்களை உருவாக்கவும்"}
                  </p>
                  <Button variant="cyber-outline" size="sm" className="w-full">
                    {language === "en" ? "Create Poster" : "போஸ்டர் உருவாக்கு"}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Awareness;
