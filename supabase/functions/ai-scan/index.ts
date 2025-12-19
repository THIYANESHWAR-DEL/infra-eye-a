import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scanType, content, fileName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Starting AI scan for type: ${scanType}`);

    const systemPrompts: Record<string, string> = {
      "app-security": `You are a cybersecurity AI that analyzes app permissions and behaviors. 
        Analyze the provided content for security risks. Return a JSON response with:
        - status: "safe" | "warning" | "danger"
        - score: number 0-100 (100 = completely safe)
        - issues: array of specific issues found
        - explanation: brief explanation of why this rating was given
        - recommendations: array of actionable recommendations`,
      
      "scam-detector": `You are an AI specialized in detecting scam calls and phishing attempts.
        Analyze the provided call transcript or message for scam indicators. Look for:
        - Urgency tactics, threats, or pressure
        - Requests for personal/financial information
        - Impersonation of officials or companies
        - Too-good-to-be-true offers
        - Suspicious links or callback numbers
        Return a JSON response with:
        - status: "safe" | "warning" | "danger"
        - score: number 0-100 (100 = completely safe)
        - issues: array of specific scam indicators found
        - explanation: detailed explanation of the analysis
        - scamType: type of scam if detected (e.g., "phishing", "vishing", "impersonation")
        - recommendations: what the user should do`,
      
      "deepfake": `You are an AI that helps identify potential fake profiles and deepfake content.
        Analyze the provided content description for authenticity indicators. Return a JSON response with:
        - status: "safe" | "warning" | "danger"
        - score: number 0-100 (100 = likely authentic)
        - issues: array of suspicious elements
        - explanation: why this content may or may not be authentic
        - recommendations: steps to verify authenticity`,
      
      "network": `You are a network security AI that analyzes traffic patterns and anomalies.
        Analyze the provided network data for suspicious activities. Return a JSON response with:
        - status: "safe" | "warning" | "danger"
        - score: number 0-100 (100 = completely safe)
        - issues: array of anomalies detected
        - explanation: technical explanation of findings
        - recommendations: security measures to implement`,
      
      "dark-web": `You are a cybersecurity educator explaining dark web threats.
        Provide educational information about the query. Return a JSON response with:
        - status: "info"
        - score: 50
        - issues: array of related threats to be aware of
        - explanation: educational explanation
        - recommendations: safety tips and best practices`,
    };

    const systemPrompt = systemPrompts[scanType] || systemPrompts["app-security"];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: `Analyze the following ${scanType === "scam-detector" ? "call transcript/message" : "content"}: ${content}${fileName ? ` (File: ${fileName})` : ""}`
          }
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const resultText = data.choices?.[0]?.message?.content;
    
    console.log("AI response received:", resultText);

    let result;
    try {
      result = JSON.parse(resultText);
    } catch {
      result = {
        status: "warning",
        score: 50,
        issues: [],
        explanation: resultText,
        recommendations: ["Unable to fully parse AI response"]
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI scan error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
