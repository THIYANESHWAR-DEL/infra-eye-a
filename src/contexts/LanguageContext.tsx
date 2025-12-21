import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ta" | "hi";

interface Translations {
  [key: string]: {
    en: string;
    ta: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Navbar
  dashboard: { en: "Dashboard", ta: "டாஷ்போர்டு", hi: "डैशबोर्ड" },
  modules: { en: "Modules", ta: "தொகுதிகள்", hi: "मॉड्यूल" },
  learn: { en: "Learn", ta: "கற்றுக்கொள்", hi: "सीखें" },
  reports: { en: "Reports", ta: "அறிக்கைகள்", hi: "रिपोर्ट" },
  getStarted: { en: "Get Started", ta: "தொடங்குங்கள்", hi: "शुरू करें" },
  
  // Dashboard
  welcomeBack: { en: "Welcome back", ta: "மீண்டும் வரவேற்கிறோம்", hi: "वापसी पर स्वागत है" },
  user: { en: "User", ta: "பயனர்", hi: "उपयोगकर्ता" },
  overviewStatus: { en: "Here's an overview of your cyber security status", ta: "உங்கள் சைபர் பாதுகாப்பு நிலையின் கண்ணோட்டம்", hi: "यहाँ आपकी साइबर सुरक्षा स्थिति का अवलोकन है" },
  quickActions: { en: "Quick Actions", ta: "விரைவு செயல்கள்", hi: "त्वरित कार्रवाई" },
  cyberRiskScore: { en: "Cyber Risk Score", ta: "சைபர் ஆபத்து மதிப்பெண்", hi: "साइबर जोखिम स्कोर" },
  recentAlerts: { en: "Recent Alerts", ta: "சமீபத்திய எச்சரிக்கைகள்", hi: "हाल की अलर्ट" },
  last24Hours: { en: "Last 24 hours", ta: "கடந்த 24 மணி நேரம்", hi: "पिछले 24 घंटे" },
  threatActivity: { en: "Threat Activity", ta: "அச்சுறுத்தல் செயல்பாடு", hi: "खतरा गतिविधि" },
  weeklyOverview: { en: "Weekly overview of detected threats", ta: "கண்டறியப்பட்ட அச்சுறுத்தல்களின் வாராந்திர கண்ணோட்டம்", hi: "पाई गई धमकियों का साप्ताहिक अवलोकन" },
  detected: { en: "Detected", ta: "கண்டறியப்பட்டது", hi: "पता लगाया" },
  blocked: { en: "Blocked", ta: "தடுக்கப்பட்டது", hi: "ब्लॉक किया गया" },
  
  // Quick Actions
  scanApp: { en: "Scan App", ta: "ஆப் ஸ்கேன்", hi: "ऐप स्कैन" },
  checkCall: { en: "Check Call", ta: "அழைப்பு சரிபார்", hi: "कॉल जांचें" },
  detectFake: { en: "Detect Fake", ta: "போலி கண்டறி", hi: "नकली पहचानें" },
  network: { en: "Network", ta: "நெட்வொர்க்", hi: "नेटवर्क" },
  
  // Stats
  appsScanned: { en: "Apps Scanned", ta: "ஸ்கேன் செய்யப்பட்ட ஆப்கள்", hi: "स्कैन किए गए ऐप्स" },
  callsAnalyzed: { en: "Calls Analyzed", ta: "பகுப்பாய்வு செய்யப்பட்ட அழைப்புகள்", hi: "विश्लेषित कॉल" },
  profilesChecked: { en: "Profiles Checked", ta: "சரிபார்க்கப்பட்ட சுயவிவரங்கள்", hi: "जांची गई प्रोफाइल" },
  lessonsCompleted: { en: "Lessons Completed", ta: "முடிக்கப்பட்ட பாடங்கள்", hi: "पूर्ण पाठ" },
  thisWeek: { en: "this week", ta: "இந்த வாரம்", hi: "इस सप्ताह" },
  remaining: { en: "remaining", ta: "மீதமுள்ளது", hi: "शेष" },
  
  // Risk Score
  excellent: { en: "Excellent", ta: "சிறப்பு", hi: "उत्कृष्ट" },
  good: { en: "Good", ta: "நல்லது", hi: "अच्छा" },
  fair: { en: "Fair", ta: "சராசரி", hi: "ठीक" },
  atRisk: { en: "At Risk", ta: "ஆபத்தில்", hi: "जोखिम में" },
  scans: { en: "Scans", ta: "ஸ்கேன்கள்", hi: "स्कैन" },
  threats: { en: "Threats", ta: "அச்சுறுத்தல்கள்", hi: "धमकियां" },
  resolved: { en: "Resolved", ta: "தீர்க்கப்பட்டது", hi: "हल किया गया" },
  
  // Alerts
  phishing: { en: "Phishing", ta: "ஃபிஷிங்", hi: "फ़िशिंग" },
  appSecurity: { en: "App Security", ta: "ஆப் பாதுகாப்பு", hi: "ऐप सुरक्षा" },
  scanComplete: { en: "Scan Complete", ta: "ஸ்கேன் முடிந்தது", hi: "स्कैन पूर्ण" },
  scamCall: { en: "Scam Call", ta: "மோசடி அழைப்பு", hi: "स्कैम कॉल" },
  deepfake: { en: "Deepfake", ta: "டீப்ஃபேக்", hi: "डीपफेक" },
  suspiciousEmail: { en: "Suspicious Email Detected", ta: "சந்தேகத்திற்குரிய மின்னஞ்சல் கண்டறியப்பட்டது", hi: "संदिग्ध ईमेल पाया गया" },
  blockedPhishing: { en: "Blocked phishing attempt from unknown sender", ta: "அறியப்படாத அனுப்புநரிடமிருந்து ஃபிஷிங் முயற்சி தடுக்கப்பட்டது", hi: "अज्ञात प्रेषक से फ़िशिंग प्रयास ब्लॉक किया" },
  highRiskPermission: { en: "High Risk Permission", ta: "அதிக ஆபத்து அனுமதி", hi: "उच्च जोखिम अनुमति" },
  cameraAccess: { en: "New app requesting camera access", ta: "புதிய ஆப் கேமரா அணுகலைக் கோருகிறது", hi: "नया ऐप कैमरा एक्सेस मांग रहा है" },
  networkScanPassed: { en: "Network Scan Passed", ta: "நெட்வொர்க் ஸ்கேன் தேர்ச்சி", hi: "नेटवर्क स्कैन पास" },
  noAnomalies: { en: "No anomalies detected in your network", ta: "உங்கள் நெட்வொர்க்கில் அசாதாரணங்கள் இல்லை", hi: "आपके नेटवर्क में कोई असामान्यता नहीं मिली" },
  potentialFraud: { en: "Potential Fraud Call", ta: "சாத்தியமான மோசடி அழைப்பு", hi: "संभावित धोखाधड़ी कॉल" },
  flaggedCall: { en: "Flagged call from suspicious number", ta: "சந்தேகத்திற்குரிய எண்ணிலிருந்து குறிக்கப்பட்ட அழைப்பு", hi: "संदिग्ध नंबर से फ्लैग किया गया कॉल" },
  profileVerified: { en: "Profile Verified", ta: "சுயவிவரம் சரிபார்க்கப்பட்டது", hi: "प्रोफ़ाइल सत्यापित" },
  profileAuthenticated: { en: "Social media profile authenticated", ta: "சமூக ஊடக சுயவிவரம் அங்கீகரிக்கப்பட்டது", hi: "सोशल मीडिया प्रोफाइल प्रमाणित" },
  
  // Time
  minAgo: { en: "min ago", ta: "நிமிடங்களுக்கு முன்", hi: "मिनट पहले" },
  hourAgo: { en: "hour ago", ta: "மணி நேரத்திற்கு முன்", hi: "घंटे पहले" },
  hoursAgo: { en: "hours ago", ta: "மணி நேரத்திற்கு முன்", hi: "घंटे पहले" },
  
  // Awareness
  learnStaySafe: { en: "Learn & Stay Safe", ta: "கற்றுக்கொள் & பாதுகாப்பாக இரு", hi: "सीखें और सुरक्षित रहें" },
  gamifiedLessons: { en: "Gamified cyber security lessons in your language", ta: "உங்கள் மொழியில் விளையாட்டு சைபர் பாதுகாப்பு பாடங்கள்", hi: "आपकी भाषा में गेमीफाइड साइबर सुरक्षा पाठ" },
  progress: { en: "Progress", ta: "முன்னேற்றம்", hi: "प्रगति" },
  totalXP: { en: "Total XP", ta: "மொத்த XP", hi: "कुल XP" },
  quizzesPassed: { en: "Quizzes Passed", ta: "தேர்ச்சி பெற்ற வினாடி வினா", hi: "पास की गई क्विज़" },
  lessons: { en: "Lessons", ta: "பாடங்கள்", hi: "पाठ" },
  quizzes: { en: "Quizzes", ta: "வினாடி வினா", hi: "क्विज़" },
  review: { en: "Review", ta: "மதிப்பாய்வு", hi: "समीक्षा" },
  start: { en: "Start", ta: "தொடங்கு", hi: "शुरू करें" },
  retake: { en: "Retake", ta: "மீண்டும் எடு", hi: "फिर से लें" },
  startQuiz: { en: "Start Quiz", ta: "வினாடி வினா தொடங்கு", hi: "क्विज़ शुरू करें" },
  posterGenerator: { en: "Poster Generator", ta: "போஸ்டர் ஜெனரேட்டர்", hi: "पोस्टर जनरेटर" },
  createPosterDesc: { en: "Create awareness posters to share with your community", ta: "உங்கள் சமூகத்துடன் பகிர விழிப்புணர்வு போஸ்டர்களை உருவாக்கவும்", hi: "अपने समुदाय के साथ साझा करने के लिए जागरूकता पोस्टर बनाएं" },
  createPoster: { en: "Create Poster", ta: "போஸ்டர் உருவாக்கு", hi: "पोस्टर बनाएं" },
  questions: { en: "questions", ta: "கேள்விகள்", hi: "प्रश्न" },
  
  // Dark mode
  darkMode: { en: "Dark Mode", ta: "இருண்ட பயன்முறை", hi: "डार्क मोड" },
  lightMode: { en: "Light Mode", ta: "வெளிச்ச பயன்முறை", hi: "लाइट मोड" },
  
  // Settings
  settings: { en: "Settings", ta: "அமைப்புகள்", hi: "सेटिंग्स" },
  theme: { en: "Theme", ta: "தீம்", hi: "थीम" },
  language: { en: "Language", ta: "மொழி", hi: "भाषा" },
  primaryColor: { en: "Primary Color", ta: "முதன்மை நிறம்", hi: "प्राथमिक रंग" },
  notifications: { en: "Notifications", ta: "அறிவிப்புகள்", hi: "सूचनाएं" },
  profile: { en: "Profile", ta: "சுயவிவரம்", hi: "प्रोफ़ाइल" },
  save: { en: "Save", ta: "சேமி", hi: "सहेजें" },
  
  // Modules
  securityModules: { en: "Security Modules", ta: "பாதுகாப்பு தொகுதிகள்", hi: "सुरक्षा मॉड्यूल" },
  aiPowered: { en: "AI-Powered Security", ta: "AI இயக்கப்பட்ட பாதுகாப்பு", hi: "AI-संचालित सुरक्षा" },
  startAIScan: { en: "Start AI Scan", ta: "AI ஸ்கேன் தொடங்கு", hi: "AI स्कैन शुरू करें" },
  
  // Lesson content
  safeOnlineShopping: { en: "Safe Online Shopping", ta: "பாதுகாப்பான ஆன்லைன் ஷாப்பிங்", hi: "सुरक्षित ऑनलाइन शॉपिंग" },
  upiPaymentSafety: { en: "UPI Payment Safety", ta: "UPI கட்டண பாதுகாப்பு", hi: "UPI भुगतान सुरक्षा" },
  digitalWellbeing: { en: "Digital Wellbeing", ta: "டிஜிட்டல் நல்வாழ்வு", hi: "डिजिटल कल्याण" },
  cryptoScamAwareness: { en: "Crypto Scam Awareness", ta: "கிரிப்டோ மோசடி விழிப்புணர்வு", hi: "क्रिप्टो स्कैम जागरूकता" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
