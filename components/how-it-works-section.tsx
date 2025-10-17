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
  },
  {
    icon: Search,
    title: "Get Matched with Mentors",
    description: "Find professionals who understand your journey",
    details: "Our smart matching connects you with mentors who have walked similar paths and can guide you forward.",
  },
  {
    icon: Rocket,
    title: "Start Your Growth Journey",
    description: "Connect, learn, and transform",
    details: "Build meaningful relationships, gain valuable insights, and unlock opportunities you never knew existed.",
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold text-foreground text-balance transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Your Journey Starts Here
          </h2>
          <p
            className={`text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Three simple steps to unlock your potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                <Card className="h-full border-2 hover:border-accent transition-all duration-300 hover:shadow-xl cursor-pointer overflow-hidden group">
                  <CardContent className="p-8 space-y-4">
                    {/* Icon */}
                    <div className="relative w-14 h-14 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                      <div className="absolute inset-0 bg-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground">{card.title}</h3>

                    {/* Description */}
                    <p className="text-muted-foreground font-medium">{card.description}</p>

                    {/* Details - shown on hover */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isHovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border">
                        {card.details}
                      </p>
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
