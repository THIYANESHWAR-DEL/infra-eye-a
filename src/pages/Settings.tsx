import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Sun, 
  Moon, 
  Globe, 
  Palette, 
  Bell, 
  User,
  Check,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const colorOptions = [
  { name: "Teal", value: "174 72% 40%", class: "bg-teal-500" },
  { name: "Purple", value: "280 60% 50%", class: "bg-purple-500" },
  { name: "Blue", value: "217 91% 60%", class: "bg-blue-500" },
  { name: "Orange", value: "25 95% 53%", class: "bg-orange-500" },
  { name: "Green", value: "142 76% 36%", class: "bg-green-500" },
  { name: "Rose", value: "346 77% 50%", class: "bg-rose-500" },
];

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState(0);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    alerts: true,
    weekly: false,
  });
  const [profile, setProfile] = useState({
    name: "Cyber User",
    avatar: "",
  });

  const handleColorChange = (index: number) => {
    setSelectedColor(index);
    document.documentElement.style.setProperty('--primary', colorOptions[index].value);
    toast.success(language === "ta" ? "நிறம் மாற்றப்பட்டது!" : "Color updated!");
  };

  const handleSaveProfile = () => {
    toast.success(language === "ta" ? "சுயவிவரம் சேமிக்கப்பட்டது!" : "Profile saved!");
  };

  return (
    <>
      <Helmet>
        <title>{language === "ta" ? "அமைப்புகள் - சைபர்சுரக்ஷா AI" : "Settings - CyberSuraksha AI"}</title>
        <meta name="description" content="Customize your CyberSuraksha AI experience" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                {language === "ta" ? "அமைப்புகள்" : "Settings"}
              </h1>
              <p className="text-muted-foreground">
                {language === "ta" ? "உங்கள் அனுபவத்தை தனிப்பயனாக்கவும்" : "Customize your experience"}
              </p>
            </motion.div>

            <div className="space-y-6">
              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="overflow-hidden border-border/50 bg-card/70 backdrop-blur-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        {theme === "dark" ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{language === "ta" ? "தீம்" : "Theme"}</CardTitle>
                        <CardDescription>{language === "ta" ? "தோற்றத்தை மாற்றவும்" : "Toggle appearance"}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sun className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">{language === "ta" ? "ஒளி" : "Light"}</span>
                      </div>
                      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{language === "ta" ? "இருள்" : "Dark"}</span>
                        <Moon className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Language Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="overflow-hidden border-border/50 bg-card/70 backdrop-blur-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{language === "ta" ? "மொழி" : "Language"}</CardTitle>
                        <CardDescription>{language === "ta" ? "விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்" : "Select preferred language"}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant={language === "en" ? "default" : "outline"}
                        className="justify-start gap-2"
                        onClick={() => setLanguage("en")}
                      >
                        {language === "en" && <Check className="w-4 h-4" />}
                        English
                      </Button>
                      <Button
                        variant={language === "ta" ? "default" : "outline"}
                        className="justify-start gap-2"
                        onClick={() => setLanguage("ta")}
                      >
                        {language === "ta" && <Check className="w-4 h-4" />}
                        தமிழ்
                      </Button>
                      <Button
                        variant={language === "hi" ? "default" : "outline"}
                        className="justify-start gap-2"
                        onClick={() => setLanguage("hi")}
                      >
                        {language === "hi" && <Check className="w-4 h-4" />}
                        हिंदी
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Color Picker */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="overflow-hidden border-border/50 bg-card/70 backdrop-blur-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                        <Palette className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{language === "ta" ? "முதன்மை நிறம்" : "Primary Color"}</CardTitle>
                        <CardDescription>{language === "ta" ? "உச்சரிப்பு நிறத்தைத் தேர்ந்தெடுக்கவும்" : "Choose accent color"}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {colorOptions.map((color, index) => (
                        <motion.button
                          key={color.name}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleColorChange(index)}
                          className={`w-12 h-12 rounded-xl ${color.class} flex items-center justify-center transition-all shadow-lg ${
                            selectedColor === index ? "ring-4 ring-offset-2 ring-offset-background ring-white/50" : ""
                          }`}
                        >
                          {selectedColor === index && <Check className="w-6 h-6 text-white" />}
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Notification Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="overflow-hidden border-border/50 bg-card/70 backdrop-blur-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{language === "ta" ? "அறிவிப்புகள்" : "Notifications"}</CardTitle>
                        <CardDescription>{language === "ta" ? "அறிவிப்பு விருப்பங்களை நிர்வகிக்கவும்" : "Manage notification preferences"}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notif" className="flex items-center gap-2 cursor-pointer">
                        {language === "ta" ? "மின்னஞ்சல் அறிவிப்புகள்" : "Email Notifications"}
                      </Label>
                      <Switch 
                        id="email-notif" 
                        checked={notifications.email}
                        onCheckedChange={(v) => setNotifications({...notifications, email: v})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notif" className="flex items-center gap-2 cursor-pointer">
                        {language === "ta" ? "புஷ் அறிவிப்புகள்" : "Push Notifications"}
                      </Label>
                      <Switch 
                        id="push-notif" 
                        checked={notifications.push}
                        onCheckedChange={(v) => setNotifications({...notifications, push: v})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="alert-notif" className="flex items-center gap-2 cursor-pointer">
                        {language === "ta" ? "பாதுகாப்பு எச்சரிக்கைகள்" : "Security Alerts"}
                      </Label>
                      <Switch 
                        id="alert-notif" 
                        checked={notifications.alerts}
                        onCheckedChange={(v) => setNotifications({...notifications, alerts: v})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="weekly-notif" className="flex items-center gap-2 cursor-pointer">
                        {language === "ta" ? "வாராந்திர சுருக்கம்" : "Weekly Summary"}
                      </Label>
                      <Switch 
                        id="weekly-notif" 
                        checked={notifications.weekly}
                        onCheckedChange={(v) => setNotifications({...notifications, weekly: v})}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Profile Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="overflow-hidden border-border/50 bg-card/70 backdrop-blur-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{language === "ta" ? "சுயவிவரம்" : "Profile"}</CardTitle>
                        <CardDescription>{language === "ta" ? "உங்கள் சுயவிவரத்தை புதுப்பிக்கவும்" : "Update your profile"}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                        {profile.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="name">{language === "ta" ? "பெயர்" : "Display Name"}</Label>
                        <Input 
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <Button onClick={handleSaveProfile} className="w-full">
                      {language === "ta" ? "சேமி" : "Save Profile"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
