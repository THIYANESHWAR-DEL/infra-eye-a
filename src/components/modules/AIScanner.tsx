import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Loader2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Upload,
  Send,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAIScan, type ScanResult } from "@/hooks/useAIScan";
import { useToast } from "@/hooks/use-toast";

interface AIScannerProps {
  moduleId: string;
  moduleTitle: string;
  moduleColor: string;
  icon: React.ElementType;
  placeholder: string;
  onClose: () => void;
}

export const AIScanner = ({ 
  moduleId, 
  moduleTitle, 
  moduleColor, 
  icon: Icon,
  placeholder,
  onClose 
}: AIScannerProps) => {
  const [input, setInput] = useState("");
  const { toast } = useToast();
  const { isScanning, result, error, scan, reset } = useAIScan();

  const handleScan = async () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please provide content to analyze",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "AI Scanning...",
      description: "Analyzing your content for security issues",
    });

    await scan(moduleId, input);
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
        return <Sparkles className="w-12 h-12 text-primary" />;
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
        return "bg-primary/20";
    }
  };

  const getStatusTitle = (status: ScanResult["status"]) => {
    switch (status) {
      case "safe":
        return "All Clear!";
      case "warning":
        return "Caution Advised";
      case "danger":
        return "Threats Detected";
      default:
        return "Information";
    }
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
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${moduleColor} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">{moduleTitle}</h2>
            <p className="text-sm text-muted-foreground">AI-Powered Analysis</p>
          </div>
        </div>

        {/* Input/Scanning State */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isScanning ? (
              <div className="text-center py-8">
                <div className="relative w-32 h-32 mx-auto mb-6">
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
                  <motion.div
                    className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                    animate={{ top: ["10%", "90%", "10%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">AI Scanning...</h3>
                <p className="text-muted-foreground">Analyzing for potential threats</p>
              </div>
            ) : (
              <>
                <Textarea
                  placeholder={placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={6}
                  className="mb-4"
                />
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" disabled>
                    <Upload className="w-4 h-4" />
                    Upload File
                  </Button>
                  <Button
                    variant="cyber"
                    className="flex-1"
                    onClick={handleScan}
                    disabled={!input.trim()}
                  >
                    <Send className="w-4 h-4" />
                    Analyze
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Results */}
        {result && (
          <motion.div
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
              {getStatusTitle(result.status)}
            </h3>

            <div className="mb-4">
              <span className="text-4xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {result.score}
              </span>
              <span className="text-muted-foreground">/100</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 p-3 rounded-lg bg-muted/50 text-left">
              💡 <strong>Analysis:</strong> {result.explanation}
            </p>

            {result.issues && result.issues.length > 0 && (
              <div className="text-left mb-4">
                <p className="text-sm font-medium mb-2">Issues Found:</p>
                <ul className="space-y-1">
                  {result.issues.map((issue, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.recommendations && result.recommendations.length > 0 && (
              <div className="text-left mb-4">
                <p className="text-sm font-medium mb-2">Recommendations:</p>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-success flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { reset(); setInput(""); }} className="flex-1">
                Scan Again
              </Button>
              <Button variant="cyber" onClick={onClose} className="flex-1">
                Close
              </Button>
            </div>
          </motion.div>
        )}

        {error && (
          <p className="mt-4 text-sm text-destructive text-center">{error}</p>
        )}
      </motion.div>
    </motion.div>
  );
};
