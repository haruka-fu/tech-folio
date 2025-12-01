"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import HeroSection from "@/app/_components/home/HeroSection";
import FeaturesSection from "@/app/_components/home/FeaturesSection";
import HowToUseSection from "@/app/_components/home/HowToUseSection";
import UseCasesSection from "@/app/_components/home/UseCasesSection";
import CTASection from "@/app/_components/home/CTASection";

const supabase = createClient();
export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };
    checkAuth();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div className="mx-auto max-w-6xl">
      <HeroSection isLoggedIn={isLoggedIn} />
      <FeaturesSection />
      <HowToUseSection />
      <UseCasesSection />
      <CTASection isLoggedIn={isLoggedIn} />
    </div>
  );
}
