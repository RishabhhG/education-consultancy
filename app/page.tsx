import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FeaturedPrograms } from "@/components/sections/FeaturedPrograms";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection"; 
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description:
    "India's #1 education consultancy for admission counselling, career guidance, technical training, international certifications, and placement assistance. Join 12,000+ students who shaped their future with EduNexus.",
  keywords: [
    "education consultancy India",
    "career counselling Gurugram",
    "admission guidance",
    "AWS certification training",
    "placement assistance",
    "full stack development course",
    "IELTS coaching",
    "German language classes",
  ],
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <PartnerLogos />
      <ServicesOverview />
      <WhyChooseUs />
      <FeaturedPrograms />
      {/* <Testimonials /> */}
      <FAQSection />
      <CTASection />
    </>
  );
}
