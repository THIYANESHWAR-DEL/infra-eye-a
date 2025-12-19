import { motion } from "framer-motion";
import { 
  AlertOctagon, 
  ShieldCheck, 
  ShieldAlert, 
  PhoneOff, 
  ScanEye, 
  Wifi 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Alert {
  id: string;
  type: "warning" | "danger" | "safe";
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  time: string;
  icon: React.ElementType;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "danger",
    categoryKey: "phishing",
    titleKey: "suspiciousEmail",
    descriptionKey: "blockedPhishing",
    time: "2",
    icon: AlertOctagon,
  },
  {
    id: "2",
    type: "warning",
    categoryKey: "appSecurity",
    titleKey: "highRiskPermission",
    descriptionKey: "cameraAccess",
    time: "15",
    icon: ScanEye,
  },
  {
    id: "3",
    type: "safe",
    categoryKey: "scanComplete",
    titleKey: "networkScanPassed",
    descriptionKey: "noAnomalies",
    time: "60",
    icon: Wifi,
  },
  {
    id: "4",
    type: "warning",
    categoryKey: "scamCall",
    titleKey: "potentialFraud",
    descriptionKey: "flaggedCall",
    time: "180",
    icon: PhoneOff,
  },
  {
    id: "5",
    type: "safe",
    categoryKey: "deepfake",
    titleKey: "profileVerified",
    descriptionKey: "profileAuthenticated",
    time: "300",
    icon: ShieldCheck,
  },
];

const typeStyles = {
  danger: {
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    icon: "text-destructive",
    badge: "bg-destructive/20 text-destructive",
  },
  warning: {
    bg: "bg-warning/10",
    border: "border-warning/30",
    icon: "text-warning",
    badge: "bg-warning/20 text-warning",
  },
  safe: {
    bg: "bg-success/10",
    border: "border-success/30",
    icon: "text-success",
    badge: "bg-success/20 text-success",
  },
};

export const AlertsTimeline = () => {
  const { t, language } = useLanguage();

  const formatTime = (minutes: string) => {
    const mins = parseInt(minutes);
    if (mins < 60) return `${mins} ${t("minAgo")}`;
    if (mins < 120) return `1 ${t("hourAgo")}`;
    return `${Math.floor(mins / 60)} ${t("hoursAgo")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg">{t("recentAlerts")}</h3>
        <span className="text-sm text-muted-foreground">{t("last24Hours")}</span>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {alerts.map((alert, index) => {
          const styles = typeStyles[alert.type];
          const Icon = alert.icon;

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 rounded-xl ${styles.bg} border ${styles.border} hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-lg ${styles.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${styles.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${styles.badge}`}>
                      {t(alert.categoryKey)}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatTime(alert.time)}</span>
                  </div>
                  <h4 className="font-medium text-sm">{t(alert.titleKey)}</h4>
                  <p className="text-xs text-muted-foreground truncate">{t(alert.descriptionKey)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};