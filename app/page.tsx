"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Heart, Users, ShieldCheck, Calendar, MapPin, Clock, Lightbulb } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

type AnimatedNumberProps = {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  format?: (value: number) => string
}

const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 1200, format }: AnimatedNumberProps) => {
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
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [duration, value])

  const formattedValue = format ? format(displayValue) : displayValue.toLocaleString()

  return (
    <div ref={displayRef}>
      {prefix}
      {formattedValue}
      {suffix}
    </div>
  )
}

export default function Home() {
  const stats = [
    {
      id: "projects",
      Icon: BookOpen,
      value: 3,
      label: "Projects Funded",
      sublabel: "Since founded",
    },
    {
      id: "students",
      Icon: Users,
      value: 1500,
      label: "Students Helped",
      sublabel: "Across 2 states",
      suffix: "+",
    },
    {
      id: "donations",
      Icon: Heart,
      value: 15000,
      label: "Total Donated",
      sublabel: "By people like you",
      prefix: "$",
      format: (val: number) => val.toLocaleString(),
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/5 px-4 py-20">
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Welcome to Future Scholars Association
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Building Brighter Classrooms Together
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Empower Classrooms. Support Future Scholars. Every classroom deserves the resources to thrive. From books
            and supplies to transformative technology, your support fuels real classrooms led by passionate teachers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-base" asChild>
              <Link href="/projects">See Classroom Projects</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
              <Link href="/team">Meet the Team</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Verified classroom needs</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Transparent giving</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">1,500+ students reached</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Making an Impact Together</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of people who believe every student deserves access to quality education resources
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map(({ id, Icon, value, label, sublabel, prefix, suffix, format }) => (
              <div key={id} className="text-center">
                <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedNumber value={value} prefix={prefix} suffix={suffix} format={format} />
                </div>
                <p className="font-semibold text-lg">{label}</p>
                <p className="text-sm text-muted-foreground">{sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Event</h2>

          <Card className="border-2">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl mb-2">STEM & Creativity Corner</CardTitle>
              <CardDescription className="text-base">
                Join us for hands-on competitions and creative challenges for kids!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-muted-foreground">December 13th</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-muted-foreground">9:30 AM – 12:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">Eva Perry Regional Library</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-4">What to Expect:</p>
                <p className="text-muted-foreground mb-6">
                  This event will feature hands-on competitions and creative challenges for kids, such as a paper
                  airplane distance contest and a build-a-bridge challenge.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Paper Airplane Contest", "Build-a-Bridge Challenge", "Problem Solving", "Fun Activities"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Three Simple Steps</h2>
          <p className="text-center text-muted-foreground mb-12">
            Supporting a classroom project is easy and rewarding
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "Find a Project",
                desc: "Browse projects from real teachers in schools across the country.",
              },
              { num: "2", title: "Make a Donation", desc: "Every dollar counts. Choose an amount that works for you." },
              {
                num: "3",
                title: "See the Impact",
                desc: "Teachers send thank-you notes and photos showing the difference.",
              },
            ].map((step, i) => (
              <div key={i}>
                <div className="text-5xl font-bold text-primary mb-4">{step.num}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Your Support Changes Lives</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Every donation helps a teacher create a better learning environment. Start browsing projects and see where
            you can make an impact today.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/projects">Find a Project to Support</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
