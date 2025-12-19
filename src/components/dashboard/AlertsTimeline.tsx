import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  Phone, 
  Eye, 
  Globe 
} from "lucide-react";

interface Alert {
  id: string;
  type: "warning" | "danger" | "safe";
  category: string;
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "danger",
    category: "Phishing",
    title: "Suspicious Email Detected",
    description: "Blocked phishing attempt from unknown sender",
    time: "2 min ago",
    icon: AlertTriangle,
  },
  {
    id: "2",
    type: "warning",
    category: "App Security",
    title: "High Risk Permission",
    description: "New app requesting camera access",
    time: "15 min ago",
    icon: Eye,
  },
  {
    id: "3",
    type: "safe",
    category: "Scan Complete",
    title: "Network Scan Passed",
    description: "No anomalies detected in your network",
    time: "1 hour ago",
    icon: Globe,
  },
  {
    id: "4",
    type: "warning",
    category: "Scam Call",
    title: "Potential Fraud Call",
    description: "Flagged call from suspicious number",
    time: "3 hours ago",
    icon: Phone,
  },
  {
    id: "5",
    type: "safe",
    category: "Deepfake",
    title: "Profile Verified",
    description: "Social media profile authenticated",
    time: "5 hours ago",
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg">Recent Alerts</h3>
        <span className="text-sm text-muted-foreground">Last 24 hours</span>
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
                      {alert.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{alert.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
