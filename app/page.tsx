import { HeroSection } from "@/components/hero-section"
import { VisionSection } from "@/components/vision-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { DualValueSection } from "@/components/dual-value-section"
import { CommunityImpactSection } from "@/components/community-impact-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <VisionSection />
      <HowItWorksSection />
      <DualValueSection />
      <CommunityImpactSection />
      <CTASection />
      <Footer />
    </main>
  )
}
