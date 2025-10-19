"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 md:top-20 left-5 md:left-10 w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-700 hover:bg-white/15 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-xs md:text-sm font-medium text-primary-foreground">Join the Movement</span>
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight text-balance transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Africa doesn't need permission to lead. <span className="text-white drop-shadow-lg">It just needs a platform.</span>
          </h2>

          <p
            className={`text-base md:text-lg text-primary-foreground/90 leading-relaxed text-pretty max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Be part of the movement that's redefining Africa's future, one mentorship at a time.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 justify-center items-center pt-2 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-base md:text-lg px-10 py-7 rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 group font-semibold"
            >
              <Link href="/onboarding/role?type=mentee">
                Join AfriLead
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground border-2 border-white/40 hover:bg-white/10 hover:border-white/60 text-base md:text-lg px-10 py-7 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <Link href="/onboarding/role?type=mentor">
                Start Mentoring Today
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div
            className={`flex flex-wrap justify-center gap-6 md:gap-8 pt-6 md:pt-8 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm font-medium">10,000+ Active Members</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm font-medium">500+ Expert Mentors</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm font-medium">50+ Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
