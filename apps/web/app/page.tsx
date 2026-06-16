import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { HeroSection } from "@/components/home/hero-section";
import { ProblemStrip } from "@/components/home/problem-strip";
import { TrustStrip } from "@/components/home/trust-strip";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedCases } from "@/components/home/featured-cases";
import { MemberNotebook } from "@/components/home/member-notebook";
import { AiToolsPreview } from "@/components/home/ai-tools-preview";
import { RecruitmentPreview } from "@/components/home/recruitment-preview";
import { PricingPreview } from "@/components/home/pricing-preview";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-cream-card">
      <Header />
      <main className="pb-16 lg:pb-0">
        <HeroSection />
        <ProblemStrip />
        <TrustStrip />
        <CategoryGrid />
        <FeaturedCases />
        <RecruitmentPreview />
        <MemberNotebook />
        <AiToolsPreview />
        <PricingPreview />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
