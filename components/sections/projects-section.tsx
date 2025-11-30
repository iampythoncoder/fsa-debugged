import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Tech for Good Initiative",
    category: "Technology",
    description: "Leveraging technology to solve real-world problems in underserved communities.",
    progress: 75,
  },
  {
    id: 2,
    title: "Scholarship Fund",
    category: "Education",
    description: "Supporting talented students with financial aid and mentorship.",
    progress: 60,
  },
  {
    id: 3,
    title: "Research Hub",
    category: "Innovation",
    description: "Collaborative research projects pushing boundaries in multiple fields.",
    progress: 45,
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 px-4 bg-secondary/5">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore the initiatives we're working on to make a lasting impact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="p-6 border border-border">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                {project.category}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-6">{project.description}</p>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{project.progress}%</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                View Project
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
