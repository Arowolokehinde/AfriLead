"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { GraduationCap, Heart } from "lucide-react"

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
    <section ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold text-foreground text-balance transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Two Paths, One Purpose
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-accent to-transparent" />
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full animate-pulse" />

          {/* For Mentees */}
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
          >
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-primary-foreground h-full flex flex-col justify-between shadow-xl hover:shadow-2xl transition-shadow">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-balance">For Mentees</h3>

                <p className="text-lg md:text-xl leading-relaxed text-primary-foreground/90 text-pretty">
                  Learn from those who've walked the path you dream of.
                </p>

                <ul className="space-y-3 text-primary-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <span>Get personalized guidance from experienced professionals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <span>Access resources and opportunities tailored to your goals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white text-xl">•</span>
                    <span>Build confidence and clarity in your career journey</span>
                  </li>
                </ul>
              </div>

              <Button size="lg" className="mt-8 bg-white text-primary hover:bg-white/90 rounded-full w-full md:w-auto">
                Find Your Mentor
              </Button>
            </div>
          </div>

          {/* For Mentors */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
          >
            <div className="bg-gradient-to-br from-white to-white/95 rounded-3xl p-8 md:p-12 text-foreground h-full flex flex-col justify-between shadow-xl hover:shadow-2xl transition-shadow border-2 border-accent/20">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-balance">For Mentors</h3>

                <p className="text-lg md:text-xl leading-relaxed text-foreground/90 text-pretty">
                  Share your story. Shape the next generation.
                </p>

                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">•</span>
                    <span>Make a lasting impact on young lives across Africa</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">•</span>
                    <span>Give back to your community and inspire future leaders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">•</span>
                    <span>Grow your own leadership skills through mentoring</span>
                  </li>
                </ul>
              </div>

              <Button
                size="lg"
                className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-full md:w-auto"
              >
                Become a Mentor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
