import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>CyberSuraksha AI - AI-Powered Cyber Security Platform</title>
        <meta name="description" content="Protect yourself from scams, deepfakes, and digital threats with CyberSuraksha AI. Your unified AI-powered cyber security and digital awareness platform." />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
