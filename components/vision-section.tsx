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
    <section ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold text-foreground text-balance transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Bridging Ambition and Opportunity
          </h2>
          <p
            className={`text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            AfriLead exists to ensure that no dream dies in isolation. We bring mentorship, resources, and real
            opportunities to youth who dare to lead.
          </p>
        </div>

        {/* 3-step process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-border h-full flex flex-col items-center text-center space-y-4 group">
                  {/* Icon with animated background */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Step number */}
                  <div className="text-sm font-semibold text-accent">Step {index + 1}</div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-card-foreground">{step.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Connecting line (hidden on mobile, shown on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-accent to-transparent -translate-x-4" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
