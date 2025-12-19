import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  Phone, 
  Loader2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  FileText,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useAIScan, type ScanResult } from "@/hooks/useAIScan";
import { useToast } from "@/hooks/use-toast";

interface ScamCallScannerProps {
  onClose: () => void;
}

export const ScamCallScanner = ({ onClose }: ScamCallScannerProps) => {
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [textInput, setTextInput] = useState("");
  const [transcript, setTranscript] = useState("");
  const { toast } = useToast();
  
  const { 
    isRecording, 
    startRecording, 
    stopRecording, 
    clearRecording,
    error: recorderError 
  } = useVoiceRecorder();
  
  const { 
    isScanning, 
    result, 
    error: scanError, 
    transcribeAndScan, 
    scan,
    reset 
  } = useAIScan();

  const handleVoiceRecord = async () => {
    if (isRecording) {
      const blob = await stopRecording();
      if (blob) {
        toast({
          title: "Processing voice...",
          description: "Transcribing and analyzing for scam indicators",
        });
        const response = await transcribeAndScan(blob);
        if (response) {
          setTranscript(response.transcript);
        }
      }
    } else {
      clearRecording();
      reset();
      setTranscript("");
      await startRecording();
    }
  };

  const handleTextScan = async () => {
    if (!textInput.trim()) return;
    
    toast({
      title: "Analyzing...",
      description: "Checking for scam indicators",
    });
    
    await scan("scam-detector", textInput);
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">Scam Call Detector</h2>
            <p className="text-sm text-muted-foreground">Voice or text analysis</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={mode === "voice" ? "cyber" : "outline"}
            className="flex-1"
            onClick={() => { setMode("voice"); reset(); }}
          >
            <Mic className="w-4 h-4" />
            Voice
          </Button>
          <Button
            variant={mode === "text" ? "cyber" : "outline"}
            className="flex-1"
            onClick={() => { setMode("text"); reset(); }}
          >
            <FileText className="w-4 h-4" />
            Text
          </Button>
        </div>

        {/* Voice Mode */}
        <AnimatePresence mode="wait">
          {mode === "voice" && !result && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              {/* Recording Button */}
              <motion.button
                onClick={handleVoiceRecord}
                disabled={isScanning}
                className={`relative w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all ${
                  isRecording 
                    ? "bg-destructive/20 border-2 border-destructive" 
                    : "bg-primary/20 border-2 border-primary hover:bg-primary/30"
                } ${isScanning ? "opacity-50 cursor-not-allowed" : ""}`}
                whileTap={{ scale: 0.95 }}
              >
                {isScanning ? (
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                ) : isRecording ? (
                  <>
                    <MicOff className="w-12 h-12 text-destructive" />
                    {/* Pulse animation */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-destructive"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </>
                ) : (
                  <Mic className="w-12 h-12 text-primary" />
                )}
              </motion.button>

              <p className="mt-4 text-muted-foreground">
                {isScanning 
                  ? "Analyzing voice for scam indicators..." 
                  : isRecording 
                    ? "Recording... Tap to stop" 
                    : "Tap to record a call or voice message"}
              </p>

              {recorderError && (
                <p className="mt-2 text-sm text-destructive">{recorderError}</p>
              )}

              {transcript && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50 text-left">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Transcript:</p>
                  <p className="text-sm">{transcript}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Text Mode */}
          {mode === "text" && !result && (
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Textarea
                placeholder="Paste a suspicious message, SMS, or describe the phone call..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={5}
                className="mb-4"
              />
              <Button
                variant="cyber"
                className="w-full"
                onClick={handleTextScan}
                disabled={isScanning || !textInput.trim()}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Analyze for Scams
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
                {result.status === "safe" ? "Likely Safe" :
                 result.status === "warning" ? "Suspicious Content" :
                 "Scam Detected!"}
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

              {result.issues && result.issues.length > 0 && (
                <div className="text-left mb-4">
                  <p className="text-sm font-medium mb-2">Warning Signs:</p>
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

              <Button variant="cyber" onClick={onClose} className="w-full">
                Close
              </Button>
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
