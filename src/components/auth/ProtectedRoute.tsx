import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <ShieldCheck className="w-12 h-12 text-primary animate-pulse" />
        <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
        <p className="text-muted-foreground text-sm">Verifying authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
