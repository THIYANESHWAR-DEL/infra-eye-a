import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Shield, 
  Phone, 
  Eye, 
  Network, 
  AlertTriangle,
  ChevronRight,
  Scan,
  Upload,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  {
    id: "app-security",
    icon: Shield,
    title: "App Security Scanner",
    description: "Analyze app permissions and detect risky behaviors",
    color: "from-blue-500 to-cyan-500",
    features: ["Permission Analysis", "Risk Scoring", "Malware Detection", "Privacy Report"],
  },
  {
    id: "scam-detector",
    icon: Phone,
    title: "Scam Call & Phishing Detector",
    description: "Identify fraudulent calls and phishing attempts",
    color: "from-purple-500 to-pink-500",
    features: ["Call Analysis", "SMS Screening", "Email Scanning", "URL Verification"],
  },
  {
    id: "deepfake",
    icon: Eye,
    title: "Fake Profile & Deepfake Detection",
    description: "Spot AI-generated fake profiles and media",
    color: "from-orange-500 to-red-500",
    features: ["Image Analysis", "Video Verification", "Profile Authentication", "AI Detection"],
  },
  {
    id: "network",
    icon: Network,
    title: "Network Anomaly & IPDR",
    description: "Visualize suspicious network activities",
    color: "from-green-500 to-emerald-500",
    features: ["Traffic Analysis", "Anomaly Detection", "IPDR Visualization", "Threat Mapping"],
  },
  {
    id: "dark-web",
    icon: AlertTriangle,
    title: "Dark Web Awareness",
    description: "Educational visualization of dark web threats",
    color: "from-slate-500 to-gray-700",
    features: ["Threat Education", "Data Breach Alerts", "Identity Monitoring", "Safety Tips"],
  },
];

type ScanState = "idle" | "scanning" | "complete";

interface ScanResult {
  status: "safe" | "warning" | "danger";
  score: number;
  issues: string[];
  explanation: string;
}

const Modules = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const handleScan = async (moduleId: string) => {
    setActiveModule(moduleId);
    setScanState("scanning");
    setScanResult(null);

    // Simulate AI scanning
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock result
    const mockResults: ScanResult[] = [
      { status: "safe", score: 92, issues: [], explanation: "No threats detected. Your system appears secure." },
      { status: "warning", score: 65, issues: ["Suspicious permission request", "Outdated security certificate"], explanation: "Some potential risks identified. Review the flagged items." },
      { status: "danger", score: 23, issues: ["Malware signature detected", "Data leak vulnerability", "Unauthorized access attempt"], explanation: "Critical threats found! Immediate action recommended." },
    ];
    
    setScanResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
    setScanState("complete");
  };

  const resetScan = () => {
    setScanState("idle");
    setScanResult(null);
    setActiveModule(null);
  };

  return (
    <>
      <Helmet>
        <title>Security Modules - CyberSuraksha AI</title>
        <meta name="description" content="Access AI-powered security modules for app scanning, scam detection, deepfake identification, and network analysis." />
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
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Security <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Modules</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose a module to scan and analyze different aspects of your digital security
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
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {/* Gradient Header */}
                  <div className={`h-24 bg-gradient-to-br ${module.color} relative`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute -bottom-6 left-6">
                      <div className="w-14 h-14 rounded-xl bg-card shadow-lg flex items-center justify-center">
                        <module.icon className="w-7 h-7 text-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-10">
                    <h3 className="font-display font-semibold text-lg mb-2">{module.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{module.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {module.features.map((feature, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Button 
                      variant="cyber" 
                      className="w-full group/btn"
                      onClick={() => handleScan(module.id)}
                    >
                      <Scan className="w-4 h-4" />
                      Start Scan
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scan Modal/Overlay */}
            <AnimatePresence>
              {activeModule && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
                  onClick={scanState === "complete" ? resetScan : undefined}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative max-w-md w-full p-8 rounded-2xl bg-card border border-border shadow-2xl"
                    onClick={e => e.stopPropagation()}
                  >
                    {scanState === "scanning" && (
                      <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                          {/* Scanning Animation */}
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-primary/30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <motion.div
                            className="absolute inset-2 rounded-full border-4 border-t-primary border-transparent"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                          </div>
                          {/* Scan Line */}
                          <motion.div
                            className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                            animate={{ top: ["10%", "90%", "10%"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-2">AI Scanning...</h3>
                        <p className="text-muted-foreground">Analyzing for potential threats</p>
                      </div>
                    )}

                    {scanState === "complete" && scanResult && (
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                          className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                            scanResult.status === "safe" ? "bg-success/20" :
                            scanResult.status === "warning" ? "bg-warning/20" :
                            "bg-destructive/20"
                          }`}
                        >
                          {scanResult.status === "safe" ? (
                            <CheckCircle className="w-10 h-10 text-success" />
                          ) : scanResult.status === "warning" ? (
                            <AlertTriangle className="w-10 h-10 text-warning" />
                          ) : (
                            <XCircle className="w-10 h-10 text-destructive" />
                          )}
                        </motion.div>

                        <h3 className="font-display text-xl font-semibold mb-2">
                          {scanResult.status === "safe" ? "All Clear!" :
                           scanResult.status === "warning" ? "Caution Advised" :
                           "Threats Detected"}
                        </h3>

                        {/* Score */}
                        <div className="mb-4">
                          <span className="text-4xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {scanResult.score}
                          </span>
                          <span className="text-muted-foreground">/100</span>
                        </div>

                        {/* Explanation */}
                        <p className="text-sm text-muted-foreground mb-4 p-3 rounded-lg bg-muted/50">
                          💡 <strong>Why this result:</strong> {scanResult.explanation}
                        </p>

                        {/* Issues */}
                        {scanResult.issues.length > 0 && (
                          <div className="text-left mb-6">
                            <p className="text-sm font-medium mb-2">Issues Found:</p>
                            <ul className="space-y-2">
                              {scanResult.issues.map((issue, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <Button variant="cyber" onClick={resetScan} className="w-full">
                          Close
                        </Button>
                      </div>
                    )}
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

export default Modules;
