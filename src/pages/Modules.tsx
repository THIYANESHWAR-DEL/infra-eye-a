import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Shield, 
  Phone, 
  Eye, 
  Network, 
  AlertTriangle,
  ChevronRight,
  Scan
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScamCallScanner } from "@/components/modules/ScamCallScanner";
import { AIScanner } from "@/components/modules/AIScanner";

const modules = [
  {
    id: "app-security",
    icon: Shield,
    title: "App Security Scanner",
    description: "Analyze app permissions and detect risky behaviors",
    color: "from-blue-500 to-cyan-500",
    features: ["Permission Analysis", "Risk Scoring", "Malware Detection", "Privacy Report"],
    placeholder: "Paste app permissions list, describe app behavior, or provide app details to analyze...",
  },
  {
    id: "scam-detector",
    icon: Phone,
    title: "Scam Call & Phishing Detector",
    description: "Identify fraudulent calls and phishing attempts",
    color: "from-purple-500 to-pink-500",
    features: ["Voice Analysis", "SMS Screening", "Email Scanning", "URL Verification"],
    placeholder: "",
  },
  {
    id: "deepfake",
    icon: Eye,
    title: "Fake Profile & Deepfake Detection",
    description: "Spot AI-generated fake profiles and media",
    color: "from-orange-500 to-red-500",
    features: ["Image Analysis", "Video Verification", "Profile Authentication", "AI Detection"],
    placeholder: "Describe the profile or content you want to verify. Include details like username, bio, posting patterns, or image descriptions...",
  },
  {
    id: "network",
    icon: Network,
    title: "Network Anomaly & IPDR",
    description: "Visualize suspicious network activities",
    color: "from-green-500 to-emerald-500",
    features: ["Traffic Analysis", "Anomaly Detection", "IPDR Visualization", "Threat Mapping"],
    placeholder: "Paste network logs, IP addresses, traffic patterns, or describe suspicious network activity...",
  },
  {
    id: "dark-web",
    icon: AlertTriangle,
    title: "Dark Web Awareness",
    description: "Educational visualization of dark web threats",
    color: "from-slate-500 to-gray-700",
    features: ["Threat Education", "Data Breach Alerts", "Identity Monitoring", "Safety Tips"],
    placeholder: "Ask about dark web threats, data breaches, or cybersecurity topics you want to learn about...",
  },
];

const Modules = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const handleScan = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  const resetScan = () => {
    setActiveModule(null);
  };

  const activeModuleData = modules.find(m => m.id === activeModule);

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
                Choose a module to scan and analyze different aspects of your digital security with real AI
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
                      Start AI Scan
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scam Call Scanner (with voice) */}
            {activeModule === "scam-detector" && (
              <ScamCallScanner onClose={resetScan} />
            )}

            {/* Generic AI Scanner for other modules */}
            {activeModule && activeModule !== "scam-detector" && activeModuleData && (
              <AIScanner
                moduleId={activeModuleData.id}
                moduleTitle={activeModuleData.title}
                moduleColor={activeModuleData.color}
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
