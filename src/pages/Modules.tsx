import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { 
  ShieldCheck, 
  MailWarning, 
  ScanFace, 
  Activity, 
  EyeOff,
  GraduationCap,
  ChevronRight,
  Scan,
  Sparkles,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScamCallScanner } from "@/components/modules/ScamCallScanner";
import { PhishingScanner } from "@/components/modules/PhishingScanner";
import { AIScanner } from "@/components/modules/AIScanner";
import { useLanguage } from "@/contexts/LanguageContext";

const modules = [
  {
    id: "scam-detection",
    icon: ShieldCheck,
    title: { en: "Scam Detection", ta: "மோசடி கண்டறிதல்", hi: "स्कैम पहचान" },
    description: { en: "Detect and prevent online scams in real-time", ta: "நிகழ்நேரத்தில் ஆன்லைன் மோசடிகளைக் கண்டறிந்து தடுக்கவும்", hi: "रियल-टाइम में ऑनलाइन स्कैम का पता लगाएं और रोकें" },
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    features: ["Real-time Detection", "AI Analysis", "Risk Scoring", "Prevention Tips"],
    placeholder: "Describe the suspicious message, email, or activity you want to analyze...",
    scanType: "app-security",
  },
  {
    id: "scam-call",
    icon: Phone,
    title: { en: "Scam Call Detection", ta: "மோசடி அழைப்பு கண்டறிதல்", hi: "स्कैम कॉल पहचान" },
    description: { en: "Detect fraudulent phone calls and voice scams", ta: "மோசடி தொலைபேசி அழைப்புகள் மற்றும் குரல் மோசடிகளைக் கண்டறியவும்", hi: "धोखाधड़ी वाले फोन कॉल और वॉइस स्कैम का पता लगाएं" },
    gradient: "from-rose-400 via-pink-500 to-red-500",
    features: ["Voice Analysis", "Call Transcript", "Real-time Detection", "Vishing Alert"],
    placeholder: "",
    scanType: "scam-call",
  },
  {
    id: "phishing",
    icon: MailWarning,
    title: { en: "Phishing Detection", ta: "ஃபிஷிங் கண்டறிதல்", hi: "फ़िशिंग पहचान" },
    description: { en: "Identify phishing emails and fake websites", ta: "ஃபிஷிங் மின்னஞ்சல்கள் மற்றும் போலி இணையதளங்களைக் கண்டறியவும்", hi: "फ़िशिंग ईमेल और नकली वेबसाइटों की पहचान करें" },
    gradient: "from-purple-400 via-violet-500 to-indigo-500",
    features: ["Email Scanning", "URL Verification", "Link Analysis", "SMS Screening"],
    placeholder: "",
    scanType: "phishing",
  },
  {
    id: "deepfake",
    icon: ScanFace,
    title: { en: "Deepfake Detection", ta: "டீப்ஃபேக் கண்டறிதல்", hi: "डीपफेक पहचान" },
    description: { en: "Spot AI-generated fake media and profiles", ta: "AI உருவாக்கிய போலி ஊடகங்கள் மற்றும் சுயவிவரங்களைக் கண்டறியவும்", hi: "AI-जनित नकली मीडिया और प्रोफाइल का पता लगाएं" },
    gradient: "from-orange-400 via-rose-500 to-pink-500",
    features: ["Image Analysis", "Video Verification", "Profile Check", "AI Detection"],
    placeholder: "Describe the profile or content you want to verify...",
    scanType: "deepfake",
  },
  {
    id: "network",
    icon: Activity,
    title: { en: "Network Monitoring", ta: "நெட்வொர்க் கண்காணிப்பு", hi: "नेटवर्क मॉनिटरिंग" },
    description: { en: "Monitor and visualize network security", ta: "நெட்வொர்க் பாதுகாப்பைக் கண்காணித்து காட்சிப்படுத்தவும்", hi: "नेटवर्क सुरक्षा की निगरानी और दृश्य करें" },
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    features: ["Traffic Analysis", "Anomaly Detection", "Threat Mapping", "Real-time Alerts"],
    placeholder: `Example: "My router logs show repeated connection attempts from IP 185.234.72.xx to port 22 (SSH) every 30 seconds. Also noticing unusual outbound traffic to unknown servers in Eastern Europe around 3 AM daily. Device MAC address: AA:BB:CC:11:22:33 is consuming 5GB data overnight when all devices should be idle."`,
    scanType: "network",
  },
  {
    id: "dark-web",
    icon: EyeOff,
    title: { en: "Dark Web Awareness", ta: "டார்க் வெப் விழிப்புணர்வு", hi: "डार्क वेब जागरूकता" },
    description: { en: "Learn about dark web threats and protection", ta: "டார்க் வெப் அச்சுறுத்தல்கள் மற்றும் பாதுகாப்பு பற்றி அறியவும்", hi: "डार्क वेब खतरों और सुरक्षा के बारे में जानें" },
    gradient: "from-slate-400 via-zinc-500 to-gray-600",
    features: ["Threat Education", "Safety Tips", "Data Protection", "Privacy Guide"],
    placeholder: `Example: "I received an email claiming my credentials were found on the dark web. Email: john.doe@gmail.com, allegedly from a data breach. The sender demands $500 in Bitcoin or they'll release my 'private data'. They mentioned my old password 'Summer2019!' which I used years ago. Is this real? What should I do?"`,
    scanType: "dark-web",
  },
  {
    id: "learning",
    icon: GraduationCap,
    title: { en: "Cyber Learning Hub", ta: "சைபர் கற்றல் மையம்", hi: "साइबर लर्निंग हब" },
    description: { en: "Interactive lessons for digital safety", ta: "டிஜிட்டல் பாதுகாப்புக்கான ஊடாடும் பாடங்கள்", hi: "डिजिटल सुरक्षा के लिए इंटरैक्टिव पाठ" },
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    features: ["Video Lessons", "Quizzes", "Certifications", "Progress Tracking"],
    placeholder: "What topic would you like to learn about?",
    linkTo: "/awareness",
    scanType: "",
  },
];

const Modules = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const { language } = useLanguage();

  const handleScan = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module?.linkTo) {
      window.location.href = module.linkTo;
      return;
    }
    setActiveModule(moduleId);
  };

  const resetScan = () => {
    setActiveModule(null);
  };

  const activeModuleData = modules.find(m => m.id === activeModule);

  return (
    <>
      <Helmet>
        <title>{language === "ta" ? "பாதுகாப்பு தொகுதிகள் - சைபர்சுரக்ஷா AI" : language === "hi" ? "सुरक्षा मॉड्यूल - साइबरसुरक्षा AI" : "Security Modules - CyberSuraksha AI"}</title>
        <meta name="description" content="Access AI-powered security modules for scam detection, phishing identification, and network analysis." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
              >
                <Sparkles className="w-4 h-4" />
                {language === "ta" ? "AI இயக்கப்பட்ட பாதுகாப்பு" : language === "hi" ? "AI-संचालित सुरक्षा" : "AI-Powered Security"}
              </motion.div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {language === "ta" ? "பாதுகாப்பு" : language === "hi" ? "सुरक्षा" : "Security"}{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {language === "ta" ? "தொகுதிகள்" : language === "hi" ? "मॉड्यूल" : "Modules"}
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === "ta" 
                  ? "உண்மையான AI மூலம் உங்கள் டிஜிட்டல் பாதுகாப்பின் பல்வேறு அம்சங்களை ஸ்கேன் செய்து பகுப்பாய்வு செய்யுங்கள்"
                  : language === "hi"
                  ? "वास्तविक AI के साथ अपनी डिजिटल सुरक्षा के विभिन्न पहलुओं को स्कैन और विश्लेषण करें"
                  : "Scan and analyze different aspects of your digital security with real AI"
                }
              </p>
            </motion.div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  {/* Glassmorphism card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl" />
                  <div className="absolute inset-0 border border-white/20 dark:border-white/10 rounded-3xl" />
                  
                  {/* Gradient Header */}
                  <div className={`relative h-28 bg-gradient-to-br ${module.gradient}`}>
                    <div className="absolute inset-0 bg-black/10" />
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/30 rounded-full"
                          animate={{
                            y: [0, -20, 0],
                            x: [0, 10, 0],
                            opacity: [0.3, 0.7, 0.3],
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Icon */}
                    <div className="absolute -bottom-7 left-6 z-20">
                      <motion.div 
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: "spring" }}
                        className="w-14 h-14 rounded-2xl bg-card shadow-xl flex items-center justify-center border border-border/50 relative z-20"
                      >
                        <module.icon className="w-7 h-7 text-foreground relative z-30" strokeWidth={1.5} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6 pt-10 bg-card/80 dark:bg-card/50">
                    <h3 className="font-display font-semibold text-lg mb-2">
                      {module.title[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {module.description[language]}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {module.features.map((feature, i) => (
                        <motion.span 
                          key={i} 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="text-xs px-3 py-1.5 rounded-full bg-muted/50 text-muted-foreground border border-border/30"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    <Button 
                      variant="default"
                      className={`w-full group/btn bg-gradient-to-r ${module.gradient} hover:opacity-90 text-white border-0`}
                      onClick={() => handleScan(module.id)}
                    >
                      <Scan className="w-4 h-4" />
                      {language === "ta" ? "AI ஸ்கேன் தொடங்கு" : language === "hi" ? "AI स्कैन शुरू करें" : "Start AI Scan"}
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    style={{
                      background: `radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.15), transparent 70%)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Scam Call Scanner (with voice) */}
            {activeModule === "scam-call" && (
              <ScamCallScanner onClose={resetScan} />
            )}

            {/* Phishing Scanner */}
            {activeModule === "phishing" && (
              <PhishingScanner onClose={resetScan} />
            )}

            {/* Generic AI Scanner for other modules */}
            {activeModule && activeModule !== "scam-call" && activeModule !== "phishing" && activeModuleData && (
              <AIScanner
                moduleId={activeModuleData.scanType}
                moduleTitle={activeModuleData.title[language]}
                moduleColor={activeModuleData.gradient}
                icon={activeModuleData.icon}
                placeholder={activeModuleData.placeholder}
                onClose={resetScan}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Modules;
