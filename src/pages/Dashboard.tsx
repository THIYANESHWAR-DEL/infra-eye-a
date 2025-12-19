import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { AlertsTimeline } from "@/components/dashboard/AlertsTimeline";
import { ThreatChart } from "@/components/dashboard/ThreatChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { LearningProgress } from "@/components/dashboard/LearningProgress";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Shield, BookOpen, Activity, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const { t, language } = useLanguage();

  const stats = [
    { 
      labelKey: "appsScanned", 
      value: "47", 
      change: `+12 ${t("thisWeek")}`, 
      icon: Shield,
      gradient: "from-teal-400 to-cyan-500" 
    },
    { 
      labelKey: "callsAnalyzed", 
      value: "128", 
      change: `+34 ${t("thisWeek")}`, 
      icon: Activity,
      gradient: "from-purple-400 to-pink-500" 
    },
    { 
      labelKey: "profilesChecked", 
      value: "23", 
      change: `+8 ${t("thisWeek")}`, 
      icon: CheckCircle,
      gradient: "from-orange-400 to-red-500" 
    },
    { 
      labelKey: "lessonsCompleted", 
      value: "15", 
      change: `3 ${t("remaining")}`, 
      icon: BookOpen,
      gradient: "from-green-400 to-emerald-500" 
    },
  ];

  return (
    <>
      <Helmet>
        <title>{language === "ta" ? "டாஷ்போர்டு - சைபர்சுரக்ஷா AI" : "Dashboard - CyberSuraksha AI"}</title>
        <meta name="description" content={language === "ta" ? "உங்கள் சைபர் பாதுகாப்பு நிலையை கண்காணிக்கவும்" : "Monitor your cyber security status"} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  <Sparkles className="w-3 h-3" />
                  {language === "ta" ? "AI இயக்கப்பட்டது" : "AI-Powered"}
                </motion.div>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                {t("welcomeBack")}, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t("user")}</span> 👋
              </h1>
              <p className="text-muted-foreground">{t("overviewStatus")}</p>
            </motion.div>

            {/* Quick Actions */}
            <div className="mb-8">
              <QuickActions />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Score Card with Radial Gauge */}
              <div className="lg:col-span-1">
                <ScoreCard score={92} trend="up" trendValue={5} />
              </div>

              {/* Alerts Timeline */}
              <div className="lg:col-span-2">
                <AlertsTimeline />
              </div>
            </div>

            {/* Chart & Progress Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <ThreatChart />
              </div>
              <div className="lg:col-span-1">
                <LearningProgress 
                  completedLessons={15} 
                  totalLessons={20} 
                  xp={2450} 
                  streak={7} 
                />
              </div>
            </div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="relative p-5 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden group"
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold font-display">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
                  <div className="text-xs text-primary mt-1 font-medium">{stat.change}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
