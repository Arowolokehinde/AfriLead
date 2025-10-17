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
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold text-foreground text-balance transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Voices of Change
          </h2>
          <p
            className={`text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Real stories from our community of mentors and mentees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-secondary/50">
                <CardContent className="p-6 space-y-4">
                  <Quote className="w-8 h-8 text-secondary" />

                  <p className="text-card-foreground leading-relaxed text-pretty">"{testimonial.quote}"</p>

                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
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
