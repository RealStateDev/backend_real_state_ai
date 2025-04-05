"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar  from "@/components/ui/containers/NavBar";
import InfoSection from "@/components/ui/containers/InfoSection";
import Features from "@/components/ui/containers/Features";
import Questions from "@/components/ui/containers/Questions";
import CallToAction from "@/components/ui/containers/CallToAction";
import Footer from "@/components/ui/containers/Footer";
import BackdropCus from "@/components/ui/commons/BackdropCus";

export default function LandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
    setTimeout(() => router.push("/registerPage"), 1500);
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => router.push("/loginPage"), 1500);
  };

  return (
    <div className="min-h-screen bg-white-50 text-gray-800 font-sans">
      <Navbar onLogin={handleLogin} />
      <InfoSection onStart={handleStart} />
      <Features />
      <Questions />
      <CallToAction onStart={handleStart} />
      <Footer />
      <BackdropCus open={isLoading} color="#155dfc" />
    </div>
  );
}
