"use client"

import { useEffect, useRef, useState } from "react"
import { UserPlus, Users, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your profile and share your aspirations",
  },
  {
    icon: Users,
    title: "Get Matched",
    description: "Connect with mentors who understand your journey",
  },
  {
    icon: TrendingUp,
    title: "Grow Together",
    description: "Transform your potential into real impact",
  },
]

export function VisionSection() {
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
    <section ref={sectionRef} id="vision" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 md:mb-16">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Bridging Ambition and Opportunity
          </h2>
          <p
            className={`text-base md:text-lg text-muted-foreground leading-relaxed text-pretty transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            AfriLead exists to ensure that no dream dies in isolation. We bring mentorship, resources, and real
            opportunities to youth who dare to lead.
          </p>
        </div>

        {/* 3-step process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/20 h-full flex flex-col items-center text-center space-y-4 group relative overflow-hidden">
                  {/* Icon with animated background */}
                  <div className="relative z-10">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Step number */}
                  <div className="relative z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 border border-accent/30">
                    <span className="text-sm font-bold text-accent">{index + 1}</span>
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-xl md:text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">{step.title}</h3>

                  {/* Description */}
                  <p className="relative z-10 text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Connecting line (hidden on mobile, shown on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 md:top-14 left-full w-8 h-0.5 bg-primary/30 -translate-x-4" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
