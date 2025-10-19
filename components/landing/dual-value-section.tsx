"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { GraduationCap, Heart, ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export function DualValueSection() {
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 md:mb-16">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Two Paths, One Purpose
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-accent/30" />
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-lg" />

          {/* For Mentees */}
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
          >
            <div className="bg-primary rounded-3xl p-6 md:p-10 text-primary-foreground h-full flex flex-col justify-between shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group">

              <div className="space-y-5 relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-balance">For Mentees</h3>

                <p className="text-base md:text-lg leading-relaxed text-primary-foreground/90 text-pretty">
                  Learn from those who've walked the path you dream of.
                </p>

                <ul className="space-y-3 text-sm md:text-base text-primary-foreground/90">
                  <li className="flex items-start gap-3 group/item">
                    <div className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="group-hover/item:translate-x-1 transition-transform duration-200">Get personalized guidance from experienced professionals</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <div className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="group-hover/item:translate-x-1 transition-transform duration-200">Access resources and opportunities tailored to your goals</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <div className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="group-hover/item:translate-x-1 transition-transform duration-200">Build confidence and clarity in your career journey</span>
                  </li>
                </ul>
              </div>

              <Button asChild size="lg" className="mt-6 bg-white text-primary hover:bg-white/90 hover:scale-105 rounded-full w-full md:w-auto shadow-lg relative z-10 group/btn">
                <Link href="/onboarding/role?type=mentee" className="flex items-center justify-center gap-2">
                  Find Your Mentor
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* For Mentors */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
          >
            <div className="bg-card rounded-3xl p-6 md:p-10 text-foreground h-full flex flex-col justify-between shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 border border-accent/20 hover:border-accent/40 relative overflow-hidden group">
              <div className="space-y-5 relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-balance">For Mentors</h3>

                <p className="text-base md:text-lg leading-relaxed text-foreground/90 text-pretty">
                  Share your story. Shape the next generation.
                </p>

                <ul className="space-y-3 text-sm md:text-base text-foreground/80">
                  <li className="flex items-start gap-3 group/item">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="group-hover/item:translate-x-1 transition-transform duration-200">Make a lasting impact on young lives across Africa</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="group-hover/item:translate-x-1 transition-transform duration-200">Give back to your community and inspire future leaders</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="group-hover/item:translate-x-1 transition-transform duration-200">Grow your own leadership skills through mentoring</span>
                  </li>
                </ul>
              </div>

              <Button
                asChild
                size="lg"
                className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 rounded-full w-full md:w-auto shadow-lg relative z-10 group/btn"
              >
                <Link href="/onboarding/role?type=mentor" className="flex items-center justify-center gap-2">
                  Become a Mentor
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
