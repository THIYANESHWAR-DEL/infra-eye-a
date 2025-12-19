import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { RiskScoreCard } from "@/components/dashboard/RiskScoreCard";
import { AlertsTimeline } from "@/components/dashboard/AlertsTimeline";
import { ThreatChart } from "@/components/dashboard/ThreatChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t, language } = useLanguage();

  const stats = [
    { labelKey: "appsScanned", value: "47", change: `+12 ${t("thisWeek")}`, color: "from-teal-500 to-cyan-500" },
    { labelKey: "callsAnalyzed", value: "128", change: `+34 ${t("thisWeek")}`, color: "from-purple-500 to-pink-500" },
    { labelKey: "profilesChecked", value: "23", change: `+8 ${t("thisWeek")}`, color: "from-orange-500 to-red-500" },
    { labelKey: "lessonsCompleted", value: "15", change: `3 ${t("remaining")}`, color: "from-green-500 to-emerald-500" },
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
              {/* Risk Score */}
              <div className="lg:col-span-1">
                <RiskScoreCard score={78} trend="up" trendValue={5} />
              </div>

              {/* Alerts Timeline */}
              <div className="lg:col-span-2">
                <AlertsTimeline />
              </div>
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThreatChart />
              
              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                      <span className="text-white font-bold">{stat.value.charAt(0)}</span>
                    </div>
                    <div className="text-2xl font-bold font-display">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
                    <div className="text-xs text-primary mt-1">{stat.change}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;