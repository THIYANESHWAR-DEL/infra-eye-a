import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Phone, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const emailSchema = z.string().trim().email("Invalid email address").max(255);
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(128);
const nameSchema = z.string().trim().min(1, "Name is required").max(100);
const phoneSchema = z.string().regex(/^\+?[1-9]\d{6,14}$/, "Invalid phone number (include country code, e.g. +91...)");

type AuthMode = "login" | "signup" | "forgot-password";
type AuthMethod = "email" | "phone";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [method, setMethod] = useState<AuthMethod>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (method === "email") {
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) errs.email = emailResult.error.errors[0].message;

      if (mode !== "forgot-password") {
        const passResult = passwordSchema.safeParse(password);
        if (!passResult.success) errs.password = passResult.error.errors[0].message;
      }

      if (mode === "signup") {
        const nameResult = nameSchema.safeParse(displayName);
        if (!nameResult.success) errs.displayName = nameResult.error.errors[0].message;
        if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";
      }
    } else {
      const phoneResult = phoneSchema.safeParse(phone);
      if (!phoneResult.success) errs.phone = phoneResult.error.errors[0].message;
      if (otpSent && otp.length !== 6) errs.otp = "OTP must be 6 digits";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) throw error;
  };

  const handleEmailSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { display_name: displayName.trim() },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    toast({
      title: "Verification email sent",
      description: "Please check your inbox to verify your email address before signing in.",
    });
    setMode("login");
  };

  const handleForgotPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    toast({
      title: "Reset link sent",
      description: "Check your email for a password reset link.",
    });
    setMode("login");
  };

  const handleSendOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({ phone: phone.trim() });
    if (error) throw error;
    setOtpSent(true);
    toast({ title: "OTP sent", description: "Check your phone for the verification code." });
  };

  const handleVerifyOtp = async () => {
    const { error } = await supabase.auth.verifyOtp({
      phone: phone.trim(),
      token: otp,
      type: "sms",
    });
    if (error) throw error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (method === "phone") {
        if (!otpSent) {
          await handleSendOtp();
        } else {
          await handleVerifyOtp();
        }
      } else {
        if (mode === "login") await handleEmailLogin();
        else if (mode === "signup") await handleEmailSignup();
        else await handleForgotPassword();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setErrors({});
    setOtpSent(false);
    setOtp("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="glass-card">
          <CardHeader className="text-center space-y-4">
            <motion.div
              className="mx-auto relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <ShieldCheck className="w-12 h-12 text-primary" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </motion.div>
            <CardTitle className="text-2xl font-bold cyber-gradient-text">
              CyberSuraksha AI
            </CardTitle>
            <CardDescription>
              {mode === "login" && "Sign in to access your security dashboard"}
              {mode === "signup" && "Create your account to get started"}
              {mode === "forgot-password" && "Enter your email to reset your password"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {mode === "forgot-password" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <button
                  type="button"
                  onClick={() => { setMode("login"); resetForm(); }}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to login
                </button>
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
                <Button type="submit" className="w-full cyber-gradient" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <>
                {/* Auth method toggle */}
                <Tabs value={method} onValueChange={(v) => { setMethod(v as AuthMethod); resetForm(); }} className="mb-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email" className="gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </TabsTrigger>
                    <TabsTrigger value="phone" className="gap-2">
                      <Phone className="w-4 h-4" /> Phone
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">
                    {method === "email" ? (
                      <motion.div
                        key="email-form"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        {mode === "signup" && (
                          <div className="space-y-2">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input
                              id="displayName"
                              placeholder="Your name"
                              value={displayName}
                              onChange={(e) => setDisplayName(e.target.value)}
                              autoComplete="name"
                            />
                            {errors.displayName && <p className="text-sm text-destructive">{errors.displayName}</p>}
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                          />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete={mode === "signup" ? "new-password" : "current-password"}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>
                        {mode === "signup" && (
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="••••••••"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              autoComplete="new-password"
                            />
                            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="phone-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={otpSent}
                          />
                          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                        </div>
                        {otpSent && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-2"
                          >
                            <Label htmlFor="otp">Enter OTP</Label>
                            <Input
                              id="otp"
                              type="text"
                              inputMode="numeric"
                              maxLength={6}
                              placeholder="123456"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            />
                            {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
                            <button
                              type="button"
                              onClick={() => { setOtpSent(false); setOtp(""); }}
                              className="text-xs text-primary hover:underline"
                            >
                              Change phone number
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button type="submit" className="w-full cyber-gradient" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    {method === "phone"
                      ? otpSent ? "Verify OTP" : "Send OTP"
                      : mode === "login" ? "Sign In" : "Create Account"
                    }
                  </Button>

                  {method === "email" && (
                    <div className="text-center space-y-2 text-sm">
                      {mode === "login" && (
                        <>
                          <button
                            type="button"
                            onClick={() => { setMode("forgot-password"); resetForm(); }}
                            className="text-primary hover:underline block mx-auto"
                          >
                            Forgot password?
                          </button>
                          <p className="text-muted-foreground">
                            Don't have an account?{" "}
                            <button
                              type="button"
                              onClick={() => { setMode("signup"); resetForm(); }}
                              className="text-primary hover:underline font-medium"
                            >
                              Sign up
                            </button>
                          </p>
                        </>
                      )}
                      {mode === "signup" && (
                        <p className="text-muted-foreground">
                          Already have an account?{" "}
                          <button
                            type="button"
                            onClick={() => { setMode("login"); resetForm(); }}
                            className="text-primary hover:underline font-medium"
                          >
                            Sign in
                          </button>
                        </p>
                      )}
                    </div>
                  )}
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
