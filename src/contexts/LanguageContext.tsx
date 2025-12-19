import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ta";

interface Translations {
  [key: string]: {
    en: string;
    ta: string;
  };
}

export const translations: Translations = {
  // Navbar
  dashboard: { en: "Dashboard", ta: "டாஷ்போர்டு" },
  modules: { en: "Modules", ta: "தொகுதிகள்" },
  learn: { en: "Learn", ta: "கற்றுக்கொள்" },
  reports: { en: "Reports", ta: "அறிக்கைகள்" },
  getStarted: { en: "Get Started", ta: "தொடங்குங்கள்" },
  
  // Dashboard
  welcomeBack: { en: "Welcome back", ta: "மீண்டும் வரவேற்கிறோம்" },
  user: { en: "User", ta: "பயனர்" },
  overviewStatus: { en: "Here's an overview of your cyber security status", ta: "உங்கள் சைபர் பாதுகாப்பு நிலையின் கண்ணோட்டம்" },
  quickActions: { en: "Quick Actions", ta: "விரைவு செயல்கள்" },
  cyberRiskScore: { en: "Cyber Risk Score", ta: "சைபர் ஆபத்து மதிப்பெண்" },
  recentAlerts: { en: "Recent Alerts", ta: "சமீபத்திய எச்சரிக்கைகள்" },
  last24Hours: { en: "Last 24 hours", ta: "கடந்த 24 மணி நேரம்" },
  threatActivity: { en: "Threat Activity", ta: "அச்சுறுத்தல் செயல்பாடு" },
  weeklyOverview: { en: "Weekly overview of detected threats", ta: "கண்டறியப்பட்ட அச்சுறுத்தல்களின் வாராந்திர கண்ணோட்டம்" },
  detected: { en: "Detected", ta: "கண்டறியப்பட்டது" },
  blocked: { en: "Blocked", ta: "தடுக்கப்பட்டது" },
  
  // Quick Actions
  scanApp: { en: "Scan App", ta: "ஆப் ஸ்கேன்" },
  checkCall: { en: "Check Call", ta: "அழைப்பு சரிபார்" },
  detectFake: { en: "Detect Fake", ta: "போலி கண்டறி" },
  network: { en: "Network", ta: "நெட்வொர்க்" },
  
  // Stats
  appsScanned: { en: "Apps Scanned", ta: "ஸ்கேன் செய்யப்பட்ட ஆப்கள்" },
  callsAnalyzed: { en: "Calls Analyzed", ta: "பகுப்பாய்வு செய்யப்பட்ட அழைப்புகள்" },
  profilesChecked: { en: "Profiles Checked", ta: "சரிபார்க்கப்பட்ட சுயவிவரங்கள்" },
  lessonsCompleted: { en: "Lessons Completed", ta: "முடிக்கப்பட்ட பாடங்கள்" },
  thisWeek: { en: "this week", ta: "இந்த வாரம்" },
  remaining: { en: "remaining", ta: "மீதமுள்ளது" },
  
  // Risk Score
  excellent: { en: "Excellent", ta: "சிறப்பு" },
  good: { en: "Good", ta: "நல்லது" },
  fair: { en: "Fair", ta: "சராசரி" },
  atRisk: { en: "At Risk", ta: "ஆபத்தில்" },
  scans: { en: "Scans", ta: "ஸ்கேன்கள்" },
  threats: { en: "Threats", ta: "அச்சுறுத்தல்கள்" },
  resolved: { en: "Resolved", ta: "தீர்க்கப்பட்டது" },
  
  // Alerts
  phishing: { en: "Phishing", ta: "ஃபிஷிங்" },
  appSecurity: { en: "App Security", ta: "ஆப் பாதுகாப்பு" },
  scanComplete: { en: "Scan Complete", ta: "ஸ்கேன் முடிந்தது" },
  scamCall: { en: "Scam Call", ta: "மோசடி அழைப்பு" },
  deepfake: { en: "Deepfake", ta: "டீப்ஃபேக்" },
  suspiciousEmail: { en: "Suspicious Email Detected", ta: "சந்தேகத்திற்குரிய மின்னஞ்சல் கண்டறியப்பட்டது" },
  blockedPhishing: { en: "Blocked phishing attempt from unknown sender", ta: "அறியப்படாத அனுப்புநரிடமிருந்து ஃபிஷிங் முயற்சி தடுக்கப்பட்டது" },
  highRiskPermission: { en: "High Risk Permission", ta: "அதிக ஆபத்து அனுமதி" },
  cameraAccess: { en: "New app requesting camera access", ta: "புதிய ஆப் கேமரா அணுகலைக் கோருகிறது" },
  networkScanPassed: { en: "Network Scan Passed", ta: "நெட்வொர்க் ஸ்கேன் தேர்ச்சி" },
  noAnomalies: { en: "No anomalies detected in your network", ta: "உங்கள் நெட்வொர்க்கில் அசாதாரணங்கள் இல்லை" },
  potentialFraud: { en: "Potential Fraud Call", ta: "சாத்தியமான மோசடி அழைப்பு" },
  flaggedCall: { en: "Flagged call from suspicious number", ta: "சந்தேகத்திற்குரிய எண்ணிலிருந்து குறிக்கப்பட்ட அழைப்பு" },
  profileVerified: { en: "Profile Verified", ta: "சுயவிவரம் சரிபார்க்கப்பட்டது" },
  profileAuthenticated: { en: "Social media profile authenticated", ta: "சமூக ஊடக சுயவிவரம் அங்கீகரிக்கப்பட்டது" },
  
  // Time
  minAgo: { en: "min ago", ta: "நிமிடங்களுக்கு முன்" },
  hourAgo: { en: "hour ago", ta: "மணி நேரத்திற்கு முன்" },
  hoursAgo: { en: "hours ago", ta: "மணி நேரத்திற்கு முன்" },
  
  // Awareness
  learnStaySafe: { en: "Learn & Stay Safe", ta: "கற்றுக்கொள் & பாதுகாப்பாக இரு" },
  gamifiedLessons: { en: "Gamified cyber security lessons in your language", ta: "உங்கள் மொழியில் விளையாட்டு சைபர் பாதுகாப்பு பாடங்கள்" },
  progress: { en: "Progress", ta: "முன்னேற்றம்" },
  totalXP: { en: "Total XP", ta: "மொத்த XP" },
  quizzesPassed: { en: "Quizzes Passed", ta: "தேர்ச்சி பெற்ற வினாடி வினா" },
  lessons: { en: "Lessons", ta: "பாடங்கள்" },
  quizzes: { en: "Quizzes", ta: "வினாடி வினா" },
  review: { en: "Review", ta: "மதிப்பாய்வு" },
  start: { en: "Start", ta: "தொடங்கு" },
  retake: { en: "Retake", ta: "மீண்டும் எடு" },
  startQuiz: { en: "Start Quiz", ta: "வினாடி வினா தொடங்கு" },
  posterGenerator: { en: "Poster Generator", ta: "போஸ்டர் ஜெனரேட்டர்" },
  createPosterDesc: { en: "Create awareness posters to share with your community", ta: "உங்கள் சமூகத்துடன் பகிர விழிப்புணர்வு போஸ்டர்களை உருவாக்கவும்" },
  createPoster: { en: "Create Poster", ta: "போஸ்டர் உருவாக்கு" },
  questions: { en: "questions", ta: "கேள்விகள்" },
  
  // Dark mode
  darkMode: { en: "Dark Mode", ta: "இருண்ட பயன்முறை" },
  lightMode: { en: "Light Mode", ta: "வெளிச்ச பயன்முறை" },
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