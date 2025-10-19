"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "My mentor helped me find clarity in my career path. I went from feeling lost to landing my dream job in tech.",
    name: "Amara O.",
    role: "Software Developer",
    location: "Lagos, Nigeria",
  },
  {
    quote: "Through AfriLead, I discovered my strength as a leader. The guidance I received changed everything for me.",
    name: "Kwame A.",
    role: "Social Entrepreneur",
    location: "Accra, Ghana",
  },
  {
    quote: "Being a mentor has been just as rewarding as being mentored. Watching young people grow is incredible.",
    name: "Zainab M.",
    role: "Marketing Director",
    location: "Nairobi, Kenya",
  },
  {
    quote:
      "AfriLead gave me access to opportunities I never knew existed. My mentor opened doors I didn't know were there.",
    name: "Thabo L.",
    role: "Data Analyst",
    location: "Johannesburg, South Africa",
  },
  {
    quote: "The community here is amazing. It's not just mentorship—it's a family that believes in your potential.",
    name: "Fatima S.",
    role: "UX Designer",
    location: "Kigali, Rwanda",
  },
  {
    quote: "I learned that my background doesn't limit my future. My mentor showed me that anything is possible.",
    name: "Emmanuel K.",
    role: "Business Analyst",
    location: "Kampala, Uganda",
  },
]

export function CommunityImpactSection() {
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
    <section ref={sectionRef} id="impact" className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 md:mb-16">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Voices of Change
          </h2>
          <p
            className={`text-base md:text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Real stories from our community of mentors and mentees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/30 hover:scale-[1.02] cursor-pointer overflow-hidden group relative">
                <CardContent className="p-6 md:p-8 space-y-4 relative z-10">
                  {/* Quote icon */}
                  <div className="relative inline-block">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-card-foreground leading-relaxed text-pretty">"{testimonial.quote}"</p>

                  <div className="pt-4 border-t border-border/50 space-y-1">
                    <p className="font-bold text-base text-card-foreground group-hover:text-primary transition-colors duration-300">{testimonial.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">{testimonial.role}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
