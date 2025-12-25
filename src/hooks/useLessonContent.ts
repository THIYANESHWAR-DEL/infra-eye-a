import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

export interface LessonSection {
  heading: string;
  content: string;
  tip: string;
}

export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticalExercise {
  title: string;
  description: string;
  steps: string[];
}

export interface LessonContent {
  title: string;
  introduction: string;
  sections: LessonSection[];
  keyTakeaways: string[];
  practicalExercise: PracticalExercise;
  quiz: LessonQuiz[];
}

export const useLessonContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const { language } = useLanguage();

  const generateLesson = useCallback(async (lessonId: number, topic: string) => {
    setIsLoading(true);
    setError(null);
    setLessonContent(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-lesson', {
        body: { lessonId, topic, language }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setLessonContent(data.lesson);
      return data.lesson;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate lesson";
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  const reset = useCallback(() => {
    setLessonContent(null);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    lessonContent,
    generateLesson,
    reset
  };
};
