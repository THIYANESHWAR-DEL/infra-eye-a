import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { 
  GraduationCap, 
  Trophy, 
  Star, 
  CheckCircle2, 
  Lock,
  ChevronRight,
  Sparkles,
  CircleCheck,
  ArrowRight,
  BookOpen,
  Clock,
  Flame,
  Zap,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Difficulty = "beginner" | "intermediate" | "advanced";

interface Lesson {
  id: number;
  title: { en: string; ta: string; hi: string };
  description: { en: string; ta: string; hi: string };
  duration: string;
  xp: number;
  completed: boolean;
  locked: boolean;
  difficulty: Difficulty;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: { en: "Password Security Basics", ta: "கடவுச்சொல் பாதுகாப்பு அடிப்படைகள்", hi: "पासवर्ड सुरक्षा मूल बातें" },
    description: { en: "Learn to create and manage strong passwords", ta: "வலுவான கடவுச்சொற்களை உருவாக்க கற்றுக்கொள்ளுங்கள்", hi: "मजबूत पासवर्ड बनाना और प्रबंधित करना सीखें" },
    duration: "10 min",
    xp: 100,
    completed: true,
    locked: false,
    difficulty: "beginner",
  },
  {
    id: 2,
    title: { en: "Recognizing Phishing Emails", ta: "ஃபிஷிங் மின்னஞ்சல்களை அடையாளம் காணுதல்", hi: "फ़िशिंग ईमेल की पहचान" },
    description: { en: "Identify fake emails and protect your data", ta: "போலி மின்னஞ்சல்களை கண்டறிந்து உங்கள் தரவைப் பாதுகாக்கவும்", hi: "नकली ईमेल की पहचान करें और अपने डेटा की सुरक्षा करें" },
    duration: "15 min",
    xp: 150,
    completed: true,
    locked: false,
    difficulty: "beginner",
  },
  {
    id: 3,
    title: { en: "Social Media Safety", ta: "சமூக ஊடக பாதுகாப்பு", hi: "सोशल मीडिया सुरक्षा" },
    description: { en: "Protect your identity on social platforms", ta: "சமூக தளங்களில் உங்கள் அடையாளத்தைப் பாதுகாக்கவும்", hi: "सोशल प्लेटफॉर्म पर अपनी पहचान सुरक्षित रखें" },
    duration: "12 min",
    xp: 120,
    completed: false,
    locked: false,
    difficulty: "beginner",
  },
  {
    id: 4,
    title: { en: "Safe Online Shopping", ta: "பாதுகாப்பான ஆன்லைன் ஷாப்பிங்", hi: "सुरक्षित ऑनलाइन शॉपिंग" },
    description: { en: "Shop safely and avoid online fraud", ta: "பாதுகாப்பாக ஷாப்பிங் செய்து ஆன்லைன் மோசடியைத் தவிர்க்கவும்", hi: "सुरक्षित खरीदारी करें और ऑनलाइन धोखाधड़ी से बचें" },
    duration: "15 min",
    xp: 150,
    completed: false,
    locked: false,
    difficulty: "beginner",
  },
  {
    id: 5,
    title: { en: "UPI Payment Safety", ta: "UPI கட்டண பாதுகாப்பு", hi: "UPI भुगतान सुरक्षा" },
    description: { en: "Secure your UPI transactions from fraud", ta: "உங்கள் UPI பரிவர்த்தனைகளை மோசடியிலிருந்து பாதுகாக்கவும்", hi: "अपने UPI लेनदेन को धोखाधड़ी से सुरक्षित रखें" },
    duration: "12 min",
    xp: 120,
    completed: false,
    locked: false,
    difficulty: "beginner",
  },
  {
    id: 6,
    title: { en: "Understanding Deepfakes", ta: "டீப்ஃபேக்குகளைப் புரிந்துகொள்வது", hi: "डीपफेक को समझना" },
    description: { en: "Learn how AI generates fake media", ta: "AI போலி ஊடகங்களை எவ்வாறு உருவாக்குகிறது என்பதை அறியுங்கள்", hi: "जानें कि AI नकली मीडिया कैसे बनाता है" },
    duration: "20 min",
    xp: 200,
    completed: false,
    locked: false,
    difficulty: "intermediate",
  },
  {
    id: 7,
    title: { en: "Advanced Threat Detection", ta: "மேம்பட்ட அச்சுறுத்தல் கண்டறிதல்", hi: "उन्नत खतरा पहचान" },
    description: { en: "Master complex security scenarios", ta: "சிக்கலான பாதுகாப்பு சூழ்நிலைகளில் தேர்ச்சி", hi: "जटिल सुरक्षा परिदृश्यों में महारत हासिल करें" },
    duration: "25 min",
    xp: 250,
    completed: false,
    locked: false,
    difficulty: "intermediate",
  },
  {
    id: 8,
    title: { en: "Crypto Scam Awareness", ta: "கிரிப்டோ மோசடி விழிப்புணர்வு", hi: "क्रिप्टो स्कैम जागरूकता" },
    description: { en: "Identify and avoid cryptocurrency scams", ta: "கிரிப்டோகரன்சி மோசடிகளை அடையாளம் கண்டு தவிர்க்கவும்", hi: "क्रिप्टोकरेंसी स्कैम की पहचान करें और बचें" },
    duration: "18 min",
    xp: 180,
    completed: false,
    locked: false,
    difficulty: "intermediate",
  },
  {
    id: 9,
    title: { en: "Network Security Mastery", ta: "நெட்வொர்க் பாதுகாப்பு தேர்ச்சி", hi: "नेटवर्क सुरक्षा में महारत" },
    description: { en: "Expert-level network protection techniques", ta: "நிபுணர் நிலை நெட்வொர்க் பாதுகாப்பு நுட்பங்கள்", hi: "विशेषज्ञ-स्तर की नेटवर्क सुरक्षा तकनीकें" },
    duration: "30 min",
    xp: 300,
    completed: false,
    locked: false,
    difficulty: "advanced",
  },
  {
    id: 10,
    title: { en: "Digital Wellbeing", ta: "டிஜிட்டல் நல்வாழ்வு", hi: "डिजिटल कल्याण" },
    description: { en: "Balance your digital life for mental health", ta: "மன ஆரோக்கியத்திற்காக உங்கள் டிஜிட்டல் வாழ்க்கையை சமநிலைப்படுத்துங்கள்", hi: "मानसिक स्वास्थ्य के लिए अपने डिजिटल जीवन को संतुलित करें" },
    duration: "15 min",
    xp: 150,
    completed: false,
    locked: true,
    difficulty: "advanced",
  },
];

const sampleQuizQuestions = [
  {
    id: 1,
    question: { 
      en: "What is the minimum recommended password length?", 
      ta: "பரிந்துரைக்கப்பட்ட குறைந்தபட்ச கடவுச்சொல் நீளம் என்ன?",
      hi: "न्यूनतम अनुशंसित पासवर्ड लंबाई क्या है?"
    },
    options: {
      en: ["6 characters", "8 characters", "12 characters", "4 characters"],
      ta: ["6 எழுத்துக்கள்", "8 எழுத்துக்கள்", "12 எழுத்துக்கள்", "4 எழுத்துக்கள்"],
      hi: ["6 अक्षर", "8 अक्षर", "12 अक्षर", "4 अक्षर"]
    },
    correct: 2
  },
  {
    id: 2,
    question: { 
      en: "Which of these is a sign of a phishing email?", 
      ta: "இவற்றில் எது ஃபிஷிங் மின்னஞ்சலின் அறிகுறி?",
      hi: "इनमें से कौन सा फ़िशिंग ईमेल का संकेत है?"
    },
    options: {
      en: ["From a known sender", "Urgent action required", "No links in email", "Proper grammar"],
      ta: ["தெரிந்த அனுப்புநரிடமிருந்து", "உடனடி நடவடிக்கை தேவை", "மின்னஞ்சலில் இணைப்புகள் இல்லை", "சரியான இலக்கணம்"],
      hi: ["ज्ञात प्रेषक से", "तत्काल कार्रवाई आवश्यक", "ईमेल में कोई लिंक नहीं", "उचित व्याकरण"]
    },
    correct: 1
  },
  {
    id: 3,
    question: { 
      en: "What should you do if you receive a suspicious call?", 
      ta: "சந்தேகத்திற்குரிய அழைப்பு வந்தால் என்ன செய்ய வேண்டும்?",
      hi: "संदिग्ध कॉल मिलने पर क्या करना चाहिए?"
    },
    options: {
      en: ["Share OTP", "Hang up and verify", "Give bank details", "Click unknown links"],
      ta: ["OTP பகிர்வு", "அழைப்பை துண்டித்து சரிபார்க்கவும்", "வங்கி விவரங்களை கொடுங்கள்", "தெரியாத இணைப்புகளை கிளிக் செய்யுங்கள்"],
      hi: ["OTP साझा करें", "कॉल काटें और सत्यापित करें", "बैंक विवरण दें", "अज्ञात लिंक पर क्लिक करें"]
    },
    correct: 1
  },
  {
    id: 4,
    question: { 
      en: "What is a deepfake?", 
      ta: "டீப்ஃபேக் என்றால் என்ன?",
      hi: "डीपफेक क्या है?"
    },
    options: {
      en: ["A type of virus", "AI-generated fake media", "A secure website", "An encryption method"],
      ta: ["ஒரு வகை வைரஸ்", "AI உருவாக்கிய போலி ஊடகம்", "பாதுகாப்பான இணையதளம்", "குறியாக்க முறை"],
      hi: ["एक प्रकार का वायरस", "AI-जनित नकली मीडिया", "एक सुरक्षित वेबसाइट", "एक एन्क्रिप्शन विधि"]
    },
    correct: 1
  },
  {
    id: 5,
    question: { 
      en: "Which is the safest way to verify a UPI request?", 
      ta: "UPI கோரிக்கையை சரிபார்க்க பாதுகாப்பான வழி எது?",
      hi: "UPI अनुरोध को सत्यापित करने का सबसे सुरक्षित तरीका कौन सा है?"
    },
    options: {
      en: ["Click the link in SMS", "Call the sender directly", "Share OTP immediately", "Forward to friends"],
      ta: ["SMS இல் உள்ள இணைப்பை கிளிக் செய்யவும்", "அனுப்புநரை நேரடியாக அழைக்கவும்", "உடனடியாக OTP பகிரவும்", "நண்பர்களுக்கு அனுப்பவும்"],
      hi: ["SMS में लिंक पर क्लिक करें", "प्रेषक को सीधे कॉल करें", "तुरंत OTP साझा करें", "दोस्तों को फॉरवर्ड करें"]
    },
    correct: 1
  }
];

const getDifficultyConfig = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "beginner":
      return { 
        label: { en: "Beginner", ta: "தொடக்கநிலை" }, 
        color: "bg-green-500/10 text-green-600 border-green-500/30",
        icon: Zap
      };
    case "intermediate":
      return { 
        label: { en: "Intermediate", ta: "இடைநிலை" }, 
        color: "bg-amber-500/10 text-amber-600 border-amber-500/30",
        icon: Flame
      };
    case "advanced":
      return { 
        label: { en: "Advanced", ta: "மேம்பட்ட" }, 
        color: "bg-red-500/10 text-red-600 border-red-500/30",
        icon: Award
      };
  }
};

const Awareness = () => {
  const { language, t } = useLanguage();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "all">("all");

  const completedLessons = lessons.filter(l => l.completed).length;
  const totalXP = lessons.filter(l => l.completed).reduce((acc, l) => acc + l.xp, 0);
  const streak = 7; // Mock streak

  const filteredLessons = filterDifficulty === "all" 
    ? lessons 
    : lessons.filter(l => l.difficulty === filterDifficulty);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === sampleQuizQuestions[currentQuestion].correct) {
      setScore(score + 1);
      toast.success(language === "ta" ? "சரியான பதில்!" : "Correct answer!");
    } else {
      toast.error(language === "ta" ? "தவறான பதில்" : "Wrong answer");
    }

    if (currentQuestion < sampleQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowQuiz(false);
  };

  const handleStartLesson = (lesson: Lesson) => {
    if (lesson.locked) {
      toast.error(language === "ta" ? "இந்த பாடம் பூட்டப்பட்டுள்ளது" : "This lesson is locked");
      return;
    }
    setSelectedLesson(lesson);
    setShowLesson(true);
  };

  const finalScore = Math.round((score / sampleQuizQuestions.length) * 100);
  const isChampion = finalScore >= 90;

  return (
    <>
      <Helmet>
        <title>{language === "ta" ? "சைபர் விழிப்புணர்வு - சைபர்சுரக்ஷா AI" : "Cyber Awareness - CyberSuraksha AI"}</title>
        <meta name="description" content={language === "ta" ? "தமிழிலும் ஆங்கிலத்திலும் டிஜிட்டல் பாதுகாப்பைக் கற்றுக்கொள்ளுங்கள்" : "Learn digital safety through gamified lessons"} />
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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
              >
                <GraduationCap className="w-4 h-4" />
                {language === "ta" ? "கற்றல் மையம்" : "Learning Hub"}
              </motion.div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t("learn")}</span> & {language === "ta" ? "பாதுகாப்பாக இரு" : "Stay Safe"}
              </h1>
              <p className="text-muted-foreground">{t("gamifiedLessons")}</p>
            </motion.div>

            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            >
              <div className="p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("progress")}</p>
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
                    <p className="text-sm text-muted-foreground">{t("totalXP")}</p>
                    <p className="text-2xl font-bold font-display">{totalXP}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{language === "ta" ? "தொடர்" : "Streak"}</p>
                    <p className="text-2xl font-bold font-display">{streak} {language === "ta" ? "நாள்" : "days"}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("quizzesPassed")}</p>
                    <p className="text-2xl font-bold font-display">2/3</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {["all", "beginner", "intermediate", "advanced"].map((diff) => (
                <Button
                  key={diff}
                  variant={filterDifficulty === diff ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterDifficulty(diff as Difficulty | "all")}
                  className="rounded-full"
                >
                  {diff === "all" 
                    ? (language === "ta" ? "அனைத்தும்" : "All")
                    : getDifficultyConfig(diff as Difficulty).label[language]
                  }
                </Button>
              ))}
            </motion.div>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredLessons.map((lesson, index) => {
                const diffConfig = getDifficultyConfig(lesson.difficulty);
                const DiffIcon = diffConfig.icon;
                
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: lesson.locked ? 1 : 1.02, y: lesson.locked ? 0 : -5 }}
                    className={`relative p-6 rounded-2xl bg-card/70 backdrop-blur-xl border shadow-xl transition-all ${
                      lesson.locked 
                        ? "border-border/30 opacity-60" 
                        : lesson.completed 
                          ? "border-green-500/30 bg-green-500/5" 
                          : "border-border/50 hover:shadow-2xl"
                    }`}
                  >
                    {/* Completion badge */}
                    {lesson.completed && (
                      <div className="absolute -top-2 -right-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
                        >
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>
                    )}

                    {/* Lock overlay */}
                    {lesson.locked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl">
                        <Lock className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                        lesson.difficulty === "beginner" ? "from-green-400 to-emerald-500" :
                        lesson.difficulty === "intermediate" ? "from-amber-400 to-orange-500" :
                        "from-red-400 to-rose-500"
                      } flex items-center justify-center`}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold mb-1">{lesson.title[language]}</h3>
                        <p className="text-sm text-muted-foreground">{lesson.description[language]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${diffConfig.color} flex items-center gap-1`}>
                        <DiffIcon className="w-3 h-3" />
                        {diffConfig.label[language]}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      <span className="text-xs text-amber-500 font-medium flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        +{lesson.xp} XP
                      </span>
                    </div>

                    <Button
                      variant={lesson.completed ? "outline" : "default"}
                      className="w-full"
                      disabled={lesson.locked}
                      onClick={() => handleStartLesson(lesson)}
                    >
                      {lesson.completed 
                        ? (language === "ta" ? "மீண்டும் பார்" : "Review")
                        : (language === "ta" ? "தொடங்கு" : "Start")
                      }
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Take Quiz Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <Button
                size="lg"
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {language === "ta" ? "வினாடி வினா எடு" : "Take Quiz"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Quiz Modal */}
            <AnimatePresence>
              {showQuiz && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className={`w-full max-w-lg p-6 rounded-2xl bg-card border shadow-2xl ${
                      quizCompleted && isChampion ? "border-amber-500/50" : "border-border"
                    }`}
                  >
                    {!quizCompleted ? (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-display font-bold text-xl">
                            {language === "ta" ? "பாதுகாப்பு வினாடி வினா" : "Security Quiz"}
                          </h3>
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            {currentQuestion + 1}/{sampleQuizQuestions.length}
                          </span>
                        </div>
                        
                        <Progress value={((currentQuestion + 1) / sampleQuizQuestions.length) * 100} className="mb-6 h-2" />
                        
                        <p className="text-lg font-medium mb-6">
                          {sampleQuizQuestions[currentQuestion].question[language]}
                        </p>

                        <RadioGroup value={selectedAnswer?.toString()} onValueChange={(v) => setSelectedAnswer(parseInt(v))}>
                          <div className="space-y-3">
                            {sampleQuizQuestions[currentQuestion].options[language].map((option, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${
                                  selectedAnswer === idx 
                                    ? "border-primary bg-primary/5" 
                                    : "border-border hover:border-primary/50"
                                }`}
                                onClick={() => setSelectedAnswer(idx)}
                              >
                                <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                                <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>

                        <div className="flex gap-3 mt-6">
                          <Button variant="outline" onClick={resetQuiz} className="flex-1">
                            {language === "ta" ? "ரத்துசெய்" : "Cancel"}
                          </Button>
                          <Button 
                            onClick={handleAnswerSubmit} 
                            disabled={selectedAnswer === null}
                            className="flex-1"
                          >
                            {currentQuestion < sampleQuizQuestions.length - 1 
                              ? (language === "ta" ? "அடுத்தது" : "Next")
                              : (language === "ta" ? "சமர்ப்பி" : "Submit")
                            }
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6 relative overflow-hidden">
                        {/* Champion confetti effect */}
                        {isChampion && (
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(30)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ 
                                  opacity: 1, 
                                  y: -20, 
                                  x: `${Math.random() * 100}%`,
                                  rotate: 0 
                                }}
                                animate={{ 
                                  opacity: 0, 
                                  y: 300, 
                                  rotate: Math.random() * 360 
                                }}
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

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                            isChampion 
                              ? "bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/30" 
                              : "bg-gradient-to-br from-primary to-secondary"
                          }`}
                        >
                          <Trophy className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <h3 className="font-display font-bold text-2xl mb-2">
                          {language === "ta" ? "வினாடி வினா முடிந்தது!" : "Quiz Completed!"}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4">
                          {language === "ta" 
                            ? `உங்கள் மதிப்பெண்: ${score}/${sampleQuizQuestions.length}`
                            : `Your score: ${score}/${sampleQuizQuestions.length}`
                          }
                        </p>
                        
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className={`text-5xl font-bold font-display mb-4 ${
                            isChampion ? "text-amber-500" : "text-primary"
                          }`}
                        >
                          {finalScore}%
                        </motion.div>

                        {isChampion && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold text-sm shadow-lg mb-4"
                          >
                            <Trophy className="w-4 h-4" />
                            {language === "ta" ? "சைபர் சாம்பியன்!" : "Cyber Champion!"}
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                        )}

                        <Button onClick={resetQuiz} className="w-full mt-4">
                          {language === "ta" ? "மூடு" : "Close"}
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lesson Modal */}
            <AnimatePresence>
              {showLesson && selectedLesson && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="w-full max-w-2xl p-6 rounded-2xl bg-card border border-border shadow-2xl max-h-[80vh] overflow-y-auto"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl">
                          {selectedLesson.title[language]}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedLesson.duration} • +{selectedLesson.xp} XP
                        </p>
                      </div>
                    </div>

                    <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                      <p className="text-muted-foreground">
                        {selectedLesson.description[language]}
                      </p>
                      <div className="mt-4 p-4 rounded-xl bg-muted/50">
                        <p className="text-sm">
                          {language === "ta" 
                            ? "இந்த பாடத்தில் முக்கியமான பாதுகாப்பு நடைமுறைகளை கற்றுக்கொள்வீர்கள்."
                            : "In this lesson, you will learn important security practices to keep yourself safe online."
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowLesson(false)} className="flex-1">
                        {language === "ta" ? "மூடு" : "Close"}
                      </Button>
                      <Button 
                        onClick={() => {
                          toast.success(language === "ta" ? "பாடம் முடிந்தது!" : "Lesson completed!");
                          setShowLesson(false);
                        }} 
                        className="flex-1"
                      >
                        {language === "ta" ? "முடிந்தது எனக் குறி" : "Mark Complete"}
                        <CircleCheck className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
};

export default Awareness;
