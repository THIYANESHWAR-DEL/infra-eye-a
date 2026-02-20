import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  ScanFace,
  Sparkles,
  ImageIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScanResult {
  status: "safe" | "warning" | "danger" | "info";
  score: number;
  issues: string[];
  explanation: string;
  recommendations?: string[];
}

interface DeepfakeScannerProps {
  onClose: () => void;
}

export const DeepfakeScanner = ({ onClose }: DeepfakeScannerProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: language === "ta" ? "தவறான கோப்பு வகை" : "Invalid file type",
        description: language === "ta" ? "PNG, JPG அல்லது WEBP படத்தை பதிவேற்றவும்" : "Please upload a PNG, JPG, or WEBP image",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: language === "ta" ? "கோப்பு மிகப் பெரியது" : "File too large",
        description: language === "ta" ? "5MB க்கும் குறைவான படத்தை பதிவேற்றவும்" : "Please upload an image under 5MB",
        variant: "destructive",
      });
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      // Extract base64 without the data URL prefix
      const base64 = dataUrl.split(",")[1];
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleScan = async () => {
    if (!imageBase64) return;

    setIsScanning(true);
    setError(null);
    setResult(null);

    toast({
      title: language === "ta" ? "AI ஸ்கேன் செய்கிறது..." : "AI Scanning...",
      description: language === "ta" ? "படத்தை டீப்ஃபேக் அறிகுறிகளுக்கு பகுப்பாய்வு செய்கிறது" : "Analyzing image for deepfake indicators",
    });

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ai-scan", {
        body: {
          scanType: "deepfake",
          content: `[IMAGE UPLOADED] Filename: ${fileName}. Analyze this image for deepfake indicators.`,
          imageBase64,
          fileName,
        },
      });

      if (fnError) throw new Error(fnError.message);
      if (data.error) throw new Error(data.error);

      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Scan failed";
      setError(message);
    } finally {
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setResult(null);
    setError(null);
    setImagePreview(null);
    setImageBase64(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
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
        return language === "ta" ? "அசல் படம்!" : "Likely Authentic!";
      case "warning":
        return language === "ta" ? "சந்தேகத்திற்குரியது" : "Suspicious Content";
      case "danger":
        return language === "ta" ? "டீப்ஃபேக் கண்டறியப்பட்டது!" : "Deepfake Detected!";
      default:
        return language === "ta" ? "தகவல்" : "Information";
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
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 via-rose-500 to-pink-500 flex items-center justify-center">
            <ScanFace className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">
              {language === "ta" ? "டீப்ஃபேக் கண்டறிதல்" : "Deepfake Detection"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === "ta" ? "AI இயக்கப்பட்ட பட பகுப்பாய்வு" : "AI-Powered Image Analysis"}
            </p>
          </div>
        </div>

        {/* Upload & Scanning State */}
        {!result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {language === "ta" ? "AI பகுப்பாய்வு செய்கிறது..." : "AI Analyzing..."}
                </h3>
                <p className="text-muted-foreground">
                  {language === "ta" ? "டீப்ஃபேக் அறிகுறிகளை ஸ்கேன் செய்கிறது" : "Scanning for deepfake indicators"}
                </p>
              </div>
            ) : (
              <>
                {/* Image Preview */}
                {imagePreview ? (
                  <div className="relative mb-4">
                    <img
                      src={imagePreview}
                      alt="Upload preview"
                      className="w-full max-h-64 object-contain rounded-xl border border-border bg-muted/30"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                      onClick={resetScan}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">{fileName}</p>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-border rounded-xl p-8 mb-4 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="font-medium mb-1">
                      {language === "ta" ? "படத்தை பதிவேற்றவும்" : "Upload an Image"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === "ta" ? "PNG, JPG அல்லது WEBP (அதிகபட்சம் 5MB)" : "PNG, JPG, or WEBP (max 5MB)"}
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    {imagePreview
                      ? (language === "ta" ? "வேறு படம்" : "Change Image")
                      : (language === "ta" ? "படத்தை தேர்வு செய்" : "Choose Image")}
                  </Button>
                  <Button
                    variant="cyber"
                    className="flex-1"
                    onClick={handleScan}
                    disabled={!imageBase64}
                  >
                    <ScanFace className="w-4 h-4" />
                    {language === "ta" ? "பகுப்பாய்வு" : "Analyze"}
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
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Analyzed"
                className="w-full max-h-40 object-contain rounded-xl border border-border mb-4"
              />
            )}

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
              💡 <strong>{language === "ta" ? "பகுப்பாய்வு:" : "Analysis:"}</strong> {result.explanation}
            </p>

            {result.issues && result.issues.length > 0 && (
              <div className="text-left mb-4">
                <p className="text-sm font-medium mb-2">
                  {language === "ta" ? "கண்டறியப்பட்ட சிக்கல்கள்:" : "Issues Found:"}
                </p>
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
                <p className="text-sm font-medium mb-2">
                  {language === "ta" ? "பரிந்துரைகள்:" : "Recommendations:"}
                </p>
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
              <Button variant="outline" onClick={resetScan} className="flex-1">
                {language === "ta" ? "மீண்டும் ஸ்கேன்" : "Scan Again"}
              </Button>
              <Button variant="cyber" onClick={onClose} className="flex-1">
                {language === "ta" ? "மூடு" : "Close"}
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
