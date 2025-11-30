import { Card } from "@/components/ui/card"
import { LinkedinIcon, TwitterIcon } from "lucide-react"

const team = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Founder & President",
    bio: "Passionate about education and community development.",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "VP of Operations",
    bio: "Strategic thinker focused on sustainable growth.",
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Head of Events",
    bio: "Creates memorable experiences that inspire change.",
  },
]

export default function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 px-4 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Dedicated individuals working together to achieve our mission.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.id} className="p-6 border border-border text-center">
              <div className="h-24 w-24 rounded-full bg-primary/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-primary font-semibold mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm mb-6">{member.bio}</p>
              <div className="flex justify-center gap-2">
                <LinkedinIcon size={18} className="text-muted-foreground hover:text-primary cursor-pointer" />
                <TwitterIcon size={18} className="text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
