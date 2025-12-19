import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ScanResult {
  status: "safe" | "warning" | "danger" | "info";
  score: number;
  issues: string[];
  explanation: string;
  recommendations?: string[];
  scamType?: string;
}

interface UseAIScanReturn {
  isScanning: boolean;
  result: ScanResult | null;
  error: string | null;
  scan: (scanType: string, content: string, fileName?: string) => Promise<ScanResult | null>;
  transcribeAndScan: (audioBlob: Blob) => Promise<{ transcript: string; result: ScanResult } | null>;
  reset: () => void;
}

export const useAIScan = (): UseAIScanReturn => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scan = async (scanType: string, content: string, fileName?: string): Promise<ScanResult | null> => {
    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ai-scan", {
        body: { scanType, content, fileName },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Scan failed";
      setError(message);
      return null;
    } finally {
      setIsScanning(false);
    }
  };

  const transcribeAndScan = async (audioBlob: Blob): Promise<{ transcript: string; result: ScanResult } | null> => {
    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      // Convert blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = '';
      const chunkSize = 0x8000;
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
        binary += String.fromCharCode.apply(null, Array.from(chunk));
      }
      const audioBase64 = btoa(binary);

      // First, transcribe the audio
      const { data: transcriptData, error: transcriptError } = await supabase.functions.invoke("voice-transcribe", {
        body: { audioBase64, mimeType: audioBlob.type },
      });

      if (transcriptError || transcriptData?.error) {
        throw new Error(transcriptData?.error || transcriptError?.message || "Transcription failed");
      }

      const transcript = transcriptData.transcript;
      
      // Then analyze for scams
      const { data: scanData, error: scanError } = await supabase.functions.invoke("ai-scan", {
        body: { 
          scanType: "scam-detector", 
          content: `Phone call transcript:\n${transcript}` 
        },
      });

      if (scanError || scanData?.error) {
        throw new Error(scanData?.error || scanError?.message || "Scan failed");
      }

      setResult(scanData);
      return { transcript, result: scanData };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Voice analysis failed";
      setError(message);
      return null;
    } finally {
      setIsScanning(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setIsScanning(false);
  };

  return {
    isScanning,
    result,
    error,
    scan,
    transcribeAndScan,
    reset,
  };
};
