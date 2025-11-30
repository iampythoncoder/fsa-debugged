import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Leadership Summit 2025",
    date: "March 15, 2025",
    location: "Convention Center",
    attendees: 200,
    description: "Annual summit bringing together leaders and innovators.",
  },
  {
    id: 2,
    title: "Mentorship Kickoff",
    date: "April 1, 2025",
    location: "Online",
    attendees: 150,
    description: "Connect with mentors and start your growth journey.",
  },
  {
    id: 3,
    title: "Community Service Day",
    date: "May 10, 2025",
    location: "Multiple Locations",
    attendees: 300,
    description: "Make a difference in the community together.",
  },
]

export default function EventsSection() {
  return (
    <section id="events" className="py-16 md:py-24 px-4 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Upcoming Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Connect, learn, and grow with our community through engaging events and experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="p-6 border border-border hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>
              <p className="text-muted-foreground mb-4">{event.description}</p>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users size={16} />
                  <span>{event.attendees} expected</span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">Learn More</Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
