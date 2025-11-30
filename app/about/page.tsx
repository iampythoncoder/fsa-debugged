"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Target, Heart, Users, BookOpen, Lightbulb } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 1200, format }: any) => {
  const displayRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>()
  const hasAnimatedRef = useRef(false)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const element = displayRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            const start = performance.now()

            const animate = (currentTime: number) => {
              const elapsed = currentTime - start
              const progress = Math.min(elapsed / duration, 1)
              const currentValue = Math.round(progress * value)
              setDisplayValue(currentValue)

              if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate)
              } else {
                setDisplayValue(value)
              }
            }

            frameRef.current = requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [duration, value])

  const formatted = format ? format(displayValue) : displayValue.toLocaleString()

  return (
    <div ref={displayRef}>
      {prefix}
      {formatted}
      {suffix}
    </div>
  )
}

const stats = [
  { icon: Users, value: 1500, suffix: "+", label: "Students Impacted" },
  { icon: BookOpen, value: 5, label: "Partner Schools" },
  { icon: Heart, value: 15000, prefix: "$", label: "Funds Raised" },
  { icon: Users, value: 20, label: "Active Members" },
]

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in education and leadership development.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embracing new ideas and creative solutions to empower students.",
  },
  { icon: Heart, title: "Community", description: "Building a supportive network where every member can thrive." },
  {
    icon: Target,
    title: "Impact",
    description: "Creating meaningful change in the lives of students and communities.",
  },
]

const milestones = [
  { year: "2020", title: "Foundation & Vision", description: "FSA founded with a bold vision" },
  { year: "2021", title: "First Campaign", description: "Raised $2,000 for student scholarships" },
  { year: "2022", title: "Community Growth", description: "Expanded to 5 partner schools" },
  { year: "2023", title: "Major Impact", description: "Reached $15,000 in funds and 1,500+ students" },
]

export default function About() {
  const [activeMilestone, setActiveMilestone] = useState(0)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Building Brighter Futures Together</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">
            From a small group of students with a vision to a thriving community making real change
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <stat.icon className="w-8 h-8 text-primary mb-3" />
                <div className="text-3xl font-bold">
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
                <value.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Our Journey</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            From vision to impact—witness the milestones that shaped our mission
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {milestones.map((m, i) => (
              <button
                key={i}
                onClick={() => setActiveMilestone(i)}
                className={`p-4 rounded-lg border transition-all ${
                  activeMilestone === i ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="font-bold text-lg text-primary">{m.year}</div>
                <div className="text-sm font-semibold mt-2">{m.title}</div>
              </button>
            ))}
          </div>

          <div className="p-8 rounded-lg border bg-card">
            <h3 className="text-2xl font-bold mb-3">{milestones[activeMilestone].title}</h3>
            <p className="text-muted-foreground">{milestones[activeMilestone].description}</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
