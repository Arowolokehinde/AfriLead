"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, Search, Rocket } from "lucide-react"

const cards = [
  {
    icon: User,
    title: "Create Your Profile",
    description: "Showcase your goals and interests",
    details: "Tell us about your dreams, skills, and what you want to achieve. Your story matters.",
    color: "bg-primary"
  },
  {
    icon: Search,
    title: "Get Matched with Mentors",
    description: "Find professionals who understand your journey",
    details: "Our smart matching connects you with mentors who have walked similar paths and can guide you forward.",
    color: "bg-accent"
  },
  {
    icon: Rocket,
    title: "Start Your Growth Journey",
    description: "Connect, learn, and transform",
    details: "Build meaningful relationships, gain valuable insights, and unlock opportunities you never knew existed.",
    color: "bg-blue-500"
  },
]

export function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
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
    <section ref={sectionRef} id="how-it-works" className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 md:mb-16">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Your Journey Starts Here
          </h2>
          <p
            className={`text-base md:text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Three simple steps to unlock your potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon
            const isHovered = hoveredCard === index

            return (
              <div
                key={index}
                className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className="h-full border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden group relative">
                  <CardContent className="p-6 md:p-8 space-y-4 relative z-10">
                    {/* Number badge */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>

                    {/* Icon */}
                    <div className="relative inline-block">
                      <div className={`w-14 h-14 md:w-16 md:h-16 ${card.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">{card.title}</h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground font-medium">{card.description}</p>

                    {/* Details - shown on hover */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-32 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pt-3 border-t border-border/50">
                        {card.details}
                      </p>
                    </div>

                    {/* Arrow indicator on hover */}
                    <div className={`flex items-center gap-2 text-primary font-semibold text-sm transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                      <span>Learn more</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
