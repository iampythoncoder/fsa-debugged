"use client"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/5 px-4">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          Welcome to FSA
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Empowering Tomorrow's Leaders
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join a community dedicated to fostering innovation, collaboration, and scholarly excellence. Discover events,
          support meaningful projects, and connect with future leaders.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-base">
            Explore Events
          </Button>
          <Button size="lg" variant="outline" className="text-base bg-transparent">
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">500+</div>
            <p className="text-sm text-muted-foreground mt-2">Active Members</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">25+</div>
            <p className="text-sm text-muted-foreground mt-2">Events Yearly</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">$100K</div>
            <p className="text-sm text-muted-foreground mt-2">Donated</p>
          </div>
        </div>
      </div>
    </section>
  )
}
