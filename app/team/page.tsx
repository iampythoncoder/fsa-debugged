"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Lightbulb, Heart, Target } from "lucide-react"

const teamMembers = [
  {
    name: "Aarush Kadira",
    role: "Founder",
    bio: "Visionary leader dedicated to empowering students and creating opportunities for the next generation of scholars.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Joshua Castelino",
    role: "Secretary",
    bio: "Organizational expert ensuring smooth operations and effective communication across all initiatives.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    name: "Saatvik Santosh",
    role: "Public Affairs and Development Officer",
    bio: "Designed this website and manages all technical infrastructure. Building digital solutions for community impact.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
  {
    name: "Kabir Baig",
    role: "Design Manager",
    bio: "Creative visionary crafting compelling visual experiences and brand identity for maximum engagement.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
  {
    name: "Ketav Karthikeyan",
    role: "Community and Partnership Manager",
    bio: "Building meaningful relationships and strategic partnerships to expand our reach and community impact.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
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
  {
    icon: Heart,
    title: "Community",
    description: "Building a supportive network where every member can thrive.",
  },
  {
    icon: Target,
    title: "Impact",
    description: "Creating meaningful change in the lives of students and communities.",
  },
]

export default function Team() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Leadership Team</h1>
          <p className="text-xl text-muted-foreground">
            Passionate individuals working together to make education accessible and empower the next generation of
            leaders.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <value.icon className="w-8 h-8 text-primary mb-3" />
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
