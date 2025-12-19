import { motion } from "framer-motion";
import { 
  Shield, 
  Phone, 
  Eye, 
  Network, 
  GraduationCap, 
  FileSearch,
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "App Security Scanner",
    description: "Analyze app permissions and detect risky behaviors with AI-powered security scoring.",
    color: "from-blue-500 to-cyan-500",
    link: "/modules",
  },
  {
    icon: Phone,
    title: "Scam Call Detector",
    description: "Identify phishing attempts and fraudulent calls before they cause harm.",
    color: "from-purple-500 to-pink-500",
    link: "/modules",
  },
  {
    icon: Eye,
    title: "Deepfake Detection",
    description: "Spot AI-generated fake profiles and manipulated media with confidence.",
    color: "from-orange-500 to-red-500",
    link: "/modules",
  },
  {
    icon: Network,
    title: "Network Anomaly",
    description: "Visualize and understand suspicious network activities and IPDR data.",
    color: "from-green-500 to-emerald-500",
    link: "/modules",
  },
  {
    icon: GraduationCap,
    title: "Cyber Awareness",
    description: "Learn digital safety through gamified lessons in Tamil and English.",
    color: "from-indigo-500 to-violet-500",
    link: "/awareness",
  },
  {
    icon: FileSearch,
    title: "Threat Reports",
    description: "Track your scan history and understand your digital security posture.",
    color: "from-amber-500 to-orange-500",
    link: "/reports",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Complete Cyber Protection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From threat detection to digital awareness, our AI-powered platform keeps you safe across all fronts.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Link to={feature.link}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative h-full p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center text-primary font-medium">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
