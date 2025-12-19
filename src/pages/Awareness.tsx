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
  Circle,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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

const quizData = [
  { id: 1, title: { en: "Password Quiz", ta: "கடவுச்சொல் வினாடி வினா" }, questions: 10, score: 85, completed: true },
  { id: 2, title: { en: "Phishing Challenge", ta: "ஃபிஷிங் சவால்" }, questions: 15, score: 90, completed: true },
  { id: 3, title: { en: "Social Media Test", ta: "சமூக ஊடக சோதனை" }, questions: 12, score: null, completed: false },
];

const sampleQuizQuestions = [
  {
    id: 1,
    question: { 
      en: "What is the minimum recommended password length?", 
      ta: "பரிந்துரைக்கப்பட்ட குறைந்தபட்ச கடவுச்சொல் நீளம் என்ன?" 
    },
    options: {
      en: ["6 characters", "8 characters", "12 characters", "4 characters"],
      ta: ["6 எழுத்துக்கள்", "8 எழுத்துக்கள்", "12 எழுத்துக்கள்", "4 எழுத்துக்கள்"]
    },
    correct: 2
  },
  {
    id: 2,
    question: { 
      en: "Which of these is a sign of a phishing email?", 
      ta: "இவற்றில் எது ஃபிஷிங் மின்னஞ்சலின் அறிகுறி?" 
    },
    options: {
      en: ["From a known sender", "Urgent action required", "No links in email", "Proper grammar"],
      ta: ["தெரிந்த அனுப்புநரிடமிருந்து", "உடனடி நடவடிக்கை தேவை", "மின்னஞ்சலில் இணைப்புகள் இல்லை", "சரியான இலக்கணம்"]
    },
    correct: 1
  },
  {
    id: 3,
    question: { 
      en: "What should you do if you receive a suspicious call?", 
      ta: "சந்தேகத்திற்குரிய அழைப்பு வந்தால் என்ன செய்ய வேண்டும்?" 
    },
    options: {
      en: ["Share OTP", "Hang up and verify", "Give bank details", "Click unknown links"],
      ta: ["OTP பகிர்வு", "அழைப்பை துண்டித்து சரிபார்க்கவும்", "வங்கி விவரங்களை கொடுங்கள்", "தெரியாத இணைப்புகளை கிளிக் செய்யுங்கள்"]
    },
    correct: 1
  }
];

const Awareness = () => {
  const { language, t } = useLanguage();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showLesson, setShowLesson] = useState(false);

  const completedLessons = lessons.filter(l => l.completed).length;
  const totalXP = lessons.filter(l => l.completed).reduce((acc, l) => acc + l.xp, 0);

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
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("quizzesPassed")}</p>
                    <p className="text-2xl font-bold font-display">{quizData.filter(q => q.completed).length}/{quizData.length}</p>
                  </div>
                </div>
              </div>
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
                    className="w-full max-w-lg p-6 rounded-2xl bg-card border border-border shadow-2xl"
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
                      <div className="text-center py-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                          <Trophy className="w-10 h-10 text-primary-foreground" />
                        </div>
                        <h3 className="font-display font-bold text-2xl mb-2">
                          {language === "ta" ? "வினாடி வினா முடிந்தது!" : "Quiz Completed!"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {language === "ta" 
                            ? `உங்கள் மதிப்பெண்: ${score}/${sampleQuizQuestions.length}`
                            : `Your score: ${score}/${sampleQuizQuestions.length}`
                          }
                        </p>
                        <div className="text-4xl font-bold font-display text-primary mb-6">
                          {Math.round((score / sampleQuizQuestions.length) * 100)}%
                        </div>
                        <Button onClick={resetQuiz} className="w-full">
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
              {showLesson && (
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
                          {language === "ta" ? "சமூக ஊடக பாதுகாப்பு" : "Social Media Safety"}
                        </h3>
                        <p className="text-sm text-muted-foreground">12 min • 120 XP</p>
                      </div>
                    </div>

                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <h4 className="font-display">{language === "ta" ? "அறிமுகம்" : "Introduction"}</h4>
                      <p className="text-muted-foreground">
                        {language === "ta" 
                          ? "சமூக ஊடகங்கள் நமது அன்றாட வாழ்க்கையின் ஒரு பகுதியாகிவிட்டன. ஆனால், இவற்றைப் பயன்படுத்தும்போது நமது தனிப்பட்ட தகவல்களைப் பாதுகாப்பது மிக முக்கியம்."
                          : "Social media has become part of our daily lives. However, protecting our personal information while using these platforms is crucial."
                        }
                      </p>

                      <h4 className="font-display mt-6">{language === "ta" ? "முக்கிய குறிப்புகள்" : "Key Tips"}</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CircleCheck className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{language === "ta" ? "வலுவான கடவுச்சொற்களைப் பயன்படுத்துங்கள்" : "Use strong passwords"}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CircleCheck className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{language === "ta" ? "இரு-படி சரிபார்ப்பை இயக்குங்கள்" : "Enable two-factor authentication"}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CircleCheck className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{language === "ta" ? "தனிப்பட்ட தகவல்களைப் பகிர்வதில் கவனமாக இருங்கள்" : "Be careful sharing personal information"}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CircleCheck className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{language === "ta" ? "தெரியாதவர்களிடமிருந்து வரும் நட்பு கோரிக்கைகளை ஏற்க வேண்டாம்" : "Don't accept friend requests from strangers"}</span>
                        </li>
                      </ul>

                      <h4 className="font-display mt-6">{language === "ta" ? "தவிர்க்க வேண்டியவை" : "Things to Avoid"}</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Circle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                          <span>{language === "ta" ? "உங்கள் இருப்பிடத்தை நேரடியாக பகிர்வது" : "Sharing your location in real-time"}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Circle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                          <span>{language === "ta" ? "பொது Wi-Fi இல் உள்நுழைவது" : "Logging in on public WiFi"}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Circle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                          <span>{language === "ta" ? "சந்தேகத்திற்குரிய இணைப்புகளை கிளிக் செய்வது" : "Clicking suspicious links"}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={() => setShowLesson(false)} className="flex-1">
                        {language === "ta" ? "மூடு" : "Close"}
                      </Button>
                      <Button className="flex-1" onClick={() => { setShowLesson(false); setShowQuiz(true); }}>
                        {language === "ta" ? "வினாடி வினா எடு" : "Take Quiz"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lessons */}
              <div className="lg:col-span-2">
                <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {t("lessons")}
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
                            <CheckCircle2 className="w-6 h-6 text-success" />
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
                            variant={lesson.completed ? "outline" : "default"} 
                            size="sm"
                            className="flex-shrink-0"
                            onClick={() => !lesson.completed && lesson.id === 3 && setShowLesson(true)}
                          >
                            {lesson.completed ? t("review") : t("start")}
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
                  {t("quizzes")}
                </h2>
                <div className="space-y-4">
                  {quizData.map((quiz, index) => (
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
                        <h3 className="font-semibold">{quiz.title[language]}</h3>
                        {quiz.completed && quiz.score && (
                          <span className="px-2 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                            {quiz.score}%
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{quiz.questions} {t("questions")}</p>
                      <Button 
                        variant={quiz.completed ? "outline" : "default"} 
                        size="sm" 
                        className="w-full"
                        onClick={() => setShowQuiz(true)}
                      >
                        {quiz.completed ? t("retake") : t("startQuiz")}
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
                    🎨 {t("posterGenerator")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("createPosterDesc")}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    {t("createPoster")}
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