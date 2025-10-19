"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-glow" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-primary-foreground">Redefining Africa's Future</span>
          </div>

          {/* Main headline */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight text-balance transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Empowering Africa's Next Generation Through <span className="text-white drop-shadow-lg">Mentorship</span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed text-pretty transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            From local dreams to global impact — AfriLead connects you with the mentors who see your potential before
            the world does.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-base md:text-lg px-10 py-7 rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 group font-semibold"
            >
              <Link href="/onboarding/role">
                Sign Up Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground border-2 border-white/40 hover:bg-white/10 hover:border-white/60 text-base md:text-lg px-10 py-7 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <Link href="/discover">
                Find a Mentor
              </Link>
            </Button>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-8 md:gap-12 pt-8 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Users className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-xs text-primary-foreground/80">Active Members</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <TrendingUp className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-primary-foreground/80">Expert Mentors</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-primary-foreground/80">Countries</div>
              </div>
            </div>
          </div>

          <div
            className={`mt-16 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="relative w-full max-w-4xl mx-auto">
              {/* Decorative elements around image */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-white/30 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-white/30 rounded-br-3xl" />

              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <img
                  src="/diverse-african-youth-collaborating-in-modern-tech.jpg"
                  alt="African youth connected through mentorship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />

                {/* Floating badge on image */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-primary">Join the Movement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  )
}
