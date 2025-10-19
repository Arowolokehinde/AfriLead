import { HeroSection } from "@/components/landing/hero-section"
import { VisionSection } from "@/components/landing/vision-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { DualValueSection } from "@/components/landing/dual-value-section"
import { CommunityImpactSection } from "@/components/landing/community-impact-section"
import { CTASection } from "@/components/landing/cta-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <VisionSection />
      <HowItWorksSection />
      <DualValueSection />
      <CommunityImpactSection />
      <CTASection />
    </main>
  )
}
