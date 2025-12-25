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
    const { lessonId, topic, language = "en" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Generating lesson content for topic: ${topic}, language: ${language}`);

    const languageInstruction = language === "ta" 
      ? "Respond in Tamil (தமிழ்). Use Tamil script for all content."
      : language === "hi"
      ? "Respond in Hindi (हिंदी). Use Devanagari script for all content."
      : "Respond in English.";

    const systemPrompt = `You are a cybersecurity education expert creating engaging, practical lessons for everyday users.
    ${languageInstruction}
    
    Create educational content that is:
    - Easy to understand for non-technical users
    - Practical with real-world examples
    - Engaging and memorable
    - Culturally relevant for Indian users
    
    Return a JSON response with the following structure:
    {
      "title": "Lesson title",
      "introduction": "2-3 sentence introduction to the topic",
      "sections": [
        {
          "heading": "Section heading",
          "content": "Detailed content with examples (2-3 paragraphs)",
          "tip": "A practical safety tip"
        }
      ],
      "keyTakeaways": ["Key point 1", "Key point 2", "Key point 3"],
      "practicalExercise": {
        "title": "Exercise title",
        "description": "What the user should practice",
        "steps": ["Step 1", "Step 2", "Step 3"]
      },
      "quiz": [
        {
          "question": "Quiz question",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctIndex": 0,
          "explanation": "Why this answer is correct"
        }
      ]
    }`;

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
            content: `Create a comprehensive cybersecurity lesson about: "${topic}". 
            Include 3-4 detailed sections, 5 key takeaways, a practical exercise, and 3 quiz questions.
            Make it relevant to Indian users with examples like UPI, Aadhaar, and common scams in India.`
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

    console.log("Lesson content generated successfully");

    let lesson;
    try {
      lesson = JSON.parse(resultText);
    } catch {
      console.error("Failed to parse lesson JSON");
      throw new Error("Failed to generate lesson content");
    }

    return new Response(JSON.stringify({ success: true, lesson }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Generate lesson error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
