import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default function DonateSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="mx-auto max-w-3xl text-center">
        <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Make a Difference</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Your support directly funds scholarships, events, and innovative projects. Together, we're building a brighter
          future for tomorrow's leaders.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { amount: "$25", impact: "Supports 1 Student" },
            { amount: "$100", impact: "Funds an Event" },
            { amount: "$500", impact: "Scholarships" },
          ].map((tier, idx) => (
            <Card key={idx} className="p-6 border border-border">
              <div className="text-2xl font-bold text-primary mb-2">{tier.amount}</div>
              <p className="text-sm text-muted-foreground">{tier.impact}</p>
            </Card>
          ))}
        </div>

        <Button size="lg" className="bg-primary hover:bg-primary/90 text-base">
          Donate Now
        </Button>
      </div>
    </section>
  )
}
