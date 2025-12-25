import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MailWarning, 
  Link as LinkIcon, 
  Loader2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Send,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAIScan, type ScanResult } from "@/hooks/useAIScan";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface PhishingScannerProps {
  onClose: () => void;
}

export const PhishingScanner = ({ onClose }: PhishingScannerProps) => {
  const [mode, setMode] = useState<"email" | "url">("email");
  const [emailContent, setEmailContent] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const { 
    isScanning, 
    result, 
    error: scanError, 
    scan,
    reset 
  } = useAIScan();

  const handleEmailScan = async () => {
    if (!emailContent.trim()) return;
    
    toast({
      title: language === "ta" ? "பகுப்பாய்வு..." : language === "hi" ? "विश्लेषण..." : "Analyzing...",
      description: language === "ta" ? "ஃபிஷிங் குறிகாட்டிகளை சரிபார்க்கிறது" : language === "hi" ? "फ़िशिंग संकेतकों की जाँच" : "Checking for phishing indicators",
    });
    
    await scan("phishing", emailContent);
  };

  const handleUrlScan = async () => {
    if (!urlInput.trim()) return;
    
    toast({
      title: language === "ta" ? "URL சரிபார்க்கிறது..." : language === "hi" ? "URL जाँच..." : "Verifying URL...",
      description: language === "ta" ? "இணையதள நம்பகத்தன்மையை பகுப்பாய்வு செய்கிறது" : language === "hi" ? "वेबसाइट विश्वसनीयता का विश्लेषण" : "Analyzing website credibility",
    });
    
    await scan("phishing", `Please analyze this URL for phishing: ${urlInput}`);
  };

  const getStatusIcon = (status: ScanResult["status"]) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="w-12 h-12 text-success" />;
      case "warning":
        return <AlertTriangle className="w-12 h-12 text-warning" />;
      case "danger":
        return <XCircle className="w-12 h-12 text-destructive" />;
      default:
        return <AlertTriangle className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getStatusBg = (status: ScanResult["status"]) => {
    switch (status) {
      case "safe":
        return "bg-success/20";
      case "warning":
        return "bg-warning/20";
      case "danger":
        return "bg-destructive/20";
      default:
        return "bg-muted/20";
    }
  };

  const labels = {
    title: { en: "Phishing Detector", ta: "ஃபிஷிங் கண்டறிதல்", hi: "फ़िशिंग डिटेक्टर" },
    subtitle: { en: "Email & URL Analysis", ta: "மின்னஞ்சல் & URL பகுப்பாய்வு", hi: "ईमेल और URL विश्लेषण" },
    email: { en: "Email", ta: "மின்னஞ்சல்", hi: "ईमेल" },
    url: { en: "URL", ta: "URL", hi: "URL" },
    emailPlaceholder: { en: "Paste the suspicious email content here...", ta: "சந்தேகத்திற்குரிய மின்னஞ்சல் உள்ளடக்கத்தை இங்கே ஒட்டவும்...", hi: "संदिग्ध ईमेल सामग्री यहां पेस्ट करें..." },
    urlPlaceholder: { en: "Enter suspicious URL (e.g., https://example.com)", ta: "சந்தேகத்திற்குரிய URL உள்ளிடவும்", hi: "संदिग्ध URL दर्ज करें" },
    analyze: { en: "Analyze", ta: "பகுப்பாய்வு", hi: "विश्लेषण" },
    verifyUrl: { en: "Verify URL", ta: "URL சரிபார்", hi: "URL सत्यापित करें" },
    analyzing: { en: "Analyzing...", ta: "பகுப்பாய்வு...", hi: "विश्लेषण..." },
    safe: { en: "Likely Legitimate", ta: "நம்பகமானதாக தெரிகிறது", hi: "संभवतः वैध" },
    warning: { en: "Suspicious Content", ta: "சந்தேகத்திற்குரிய உள்ளடக்கம்", hi: "संदिग्ध सामग्री" },
    danger: { en: "Phishing Detected!", ta: "ஃபிஷிங் கண்டறியப்பட்டது!", hi: "फ़िशिंग पाया गया!" },
    close: { en: "Close", ta: "மூடு", hi: "बंद करें" },
    scanAgain: { en: "Scan Again", ta: "மீண்டும் ஸ்கேன்", hi: "फिर से स्कैन करें" },
    issues: { en: "Warning Signs", ta: "எச்சரிக்கை அறிகுறிகள்", hi: "चेतावनी संकेत" },
    recommendations: { en: "Recommendations", ta: "பரிந்துரைகள்", hi: "सिफारिशें" },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-lg w-full p-6 rounded-2xl bg-card border border-border shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <MailWarning className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">{labels.title[language]}</h2>
            <p className="text-sm text-muted-foreground">{labels.subtitle[language]}</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={mode === "email" ? "cyber" : "outline"}
            className="flex-1"
            onClick={() => { setMode("email"); reset(); }}
          >
            <MailWarning className="w-4 h-4" />
            {labels.email[language]}
          </Button>
          <Button
            variant={mode === "url" ? "cyber" : "outline"}
            className="flex-1"
            onClick={() => { setMode("url"); reset(); }}
          >
            <Globe className="w-4 h-4" />
            {labels.url[language]}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {/* Email Mode */}
          {mode === "email" && !result && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Textarea
                placeholder={labels.emailPlaceholder[language]}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={6}
                className="mb-4"
              />
              <Button
                variant="cyber"
                className="w-full"
                onClick={handleEmailScan}
                disabled={isScanning || !emailContent.trim()}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {labels.analyzing[language]}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {labels.analyze[language]}
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* URL Mode */}
          {mode === "url" && !result && (
            <motion.div
              key="url"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="relative mb-4">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder={labels.urlPlaceholder[language]}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="cyber"
                className="w-full"
                onClick={handleUrlScan}
                disabled={isScanning || !urlInput.trim()}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {labels.analyzing[language]}
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    {labels.verifyUrl[language]}
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* Results */}
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${getStatusBg(result.status)}`}
              >
                {getStatusIcon(result.status)}
              </motion.div>

              <h3 className="font-display text-xl font-semibold mb-2">
                {result.status === "safe" ? labels.safe[language] :
                 result.status === "warning" ? labels.warning[language] :
                 labels.danger[language]}
              </h3>

              <div className="mb-4">
                <span className="text-4xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {result.score}
                </span>
                <span className="text-muted-foreground">/100</span>
              </div>

              {result.scamType && (
                <div className="inline-block px-3 py-1 rounded-full bg-destructive/20 text-destructive text-sm mb-4">
                  Type: {result.scamType}
                </div>
              )}

              <p className="text-sm text-muted-foreground mb-4 p-3 rounded-lg bg-muted/50 text-left">
                💡 {result.explanation}
              </p>

              {result.issues && (Array.isArray(result.issues) ? result.issues.length > 0 : result.issues) && (
                <div className="text-left mb-4">
                  <p className="text-sm font-medium mb-2">{labels.issues[language]}:</p>
                  <ul className="space-y-1">
                    {(Array.isArray(result.issues) ? result.issues : [result.issues]).map((issue, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.recommendations && (Array.isArray(result.recommendations) ? result.recommendations.length > 0 : result.recommendations) && (
                <div className="text-left mb-4">
                  <p className="text-sm font-medium mb-2">{labels.recommendations[language]}:</p>
                  <ul className="space-y-1">
                    {(Array.isArray(result.recommendations) ? result.recommendations : [result.recommendations]).map((rec, i) => (
                      <li key={i} className="text-sm text-success flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => { reset(); setEmailContent(""); setUrlInput(""); }} className="flex-1">
                  {labels.scanAgain[language]}
                </Button>
                <Button variant="cyber" onClick={onClose} className="flex-1">
                  {labels.close[language]}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {scanError && (
          <p className="mt-4 text-sm text-destructive text-center">{scanError}</p>
        )}
      </motion.div>
    </motion.div>
  );
};
