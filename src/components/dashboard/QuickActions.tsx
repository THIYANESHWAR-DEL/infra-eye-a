import { motion } from "framer-motion";
import { 
  Scan, 
  Phone, 
  Eye, 
  Network, 
  GraduationCap,
  FileSearch 
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  { icon: Scan, label: "Scan App", color: "from-blue-500 to-cyan-500", href: "/modules" },
  { icon: Phone, label: "Check Call", color: "from-purple-500 to-pink-500", href: "/modules" },
  { icon: Eye, label: "Detect Fake", color: "from-orange-500 to-red-500", href: "/modules" },
  { icon: Network, label: "Network", color: "from-green-500 to-emerald-500", href: "/modules" },
  { icon: GraduationCap, label: "Learn", color: "from-indigo-500 to-violet-500", href: "/awareness" },
  { icon: FileSearch, label: "Reports", color: "from-amber-500 to-orange-500", href: "/reports" },
];

export const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl"
    >
      <h3 className="font-display font-semibold text-lg mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {actions.map((action, index) => (
          <Link key={index} to={action.href}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {action.label}
              </span>
            </motion.button>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
