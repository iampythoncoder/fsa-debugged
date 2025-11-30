"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Users, MapPin } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const mockProjects = [
  {
    id: "1",
    title: "Books for Beginning Readers",
    school: "Lincoln Elementary",
    description: "Help us build a diverse library for our youngest readers",
    goalAmount: 5000,
    currentAmount: 3500,
    category: "books",
    studentCount: 250,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "2",
    title: "STEM Lab Equipment",
    school: "Washington Middle School",
    description: "Create hands-on learning experiences with modern tech",
    goalAmount: 8000,
    currentAmount: 6200,
    category: "technology",
    studentCount: 400,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Art Supplies for All",
    school: "Roosevelt High School",
    description: "Fund art classes for underserved students",
    goalAmount: 3000,
    currentAmount: 2100,
    category: "arts",
    studentCount: 180,
    imageUrl: "/placeholder.svg",
  },
]

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.school.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || project.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Find Your Perfect Project</h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Browse inspiring classroom projects from passionate teachers and students
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search projects or schools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="books">Books & Supplies</SelectItem>
                <SelectItem value="arts">Arts & Crafts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No Projects Found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setFilterCategory("all")
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-muted relative">
                    <Badge className="absolute top-3 right-3">{project.category}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.school}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">${project.currentAmount.toLocaleString()}</span>
                        <span className="text-muted-foreground">${project.goalAmount.toLocaleString()}</span>
                      </div>
                      <Progress value={getProgressPercentage(project.currentAmount, project.goalAmount)} />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Users className="w-4 h-4" />
                      {project.studentCount} students
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90">Support This Project</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
