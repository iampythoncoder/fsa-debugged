"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, CheckCircle } from "lucide-react"

export default function Donate() {
  const [donationAmount, setDonationAmount] = useState("")
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const tiers = [
    { id: "tier1", amount: 25, title: "Supporter", description: "Funds 5 student workbooks" },
    { id: "tier2", amount: 50, title: "Champion", description: "Supports a class project" },
    { id: "tier3", amount: 100, title: "Hero", description: "Funds school supplies for 10 students" },
    { id: "tier4", amount: 250, title: "Visionary", description: "Provides tech tools for a classroom" },
    { id: "tier5", amount: 500, title: "Leader", description: "Funds a complete school project" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      alert(`Thank you for your ${donationAmount || selectedTier} donation, ${donorName}!`)
      // Reset form
      setDonationAmount("")
      setSelectedTier(null)
      setDonorName("")
      setDonorEmail("")
      setSubmitted(false)
    }, 1500)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-2xl mx-auto py-20 px-4">
          <Card className="border-2 border-green-500">
            <CardContent className="pt-12 pb-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Thank You for Your Donation!</h2>
              <p className="text-muted-foreground mb-4">
                Your generous support will help make a real difference in students' lives.
              </p>
              <p className="font-semibold text-lg">Donation Amount: ${donationAmount || selectedTier}</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Make a Donation</h1>
            <p className="text-lg text-muted-foreground">
              Your contribution directly supports Title I schools and helps students reach their full potential.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donation Tiers */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Choose Your Impact Level</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {tiers.map((tier) => (
                  <Card
                    key={tier.id}
                    className={`cursor-pointer transition-all ${selectedTier === String(tier.amount) ? "ring-2 ring-primary border-primary" : ""}`}
                    onClick={() => {
                      setSelectedTier(String(tier.amount))
                      setDonationAmount(String(tier.amount))
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">${tier.amount}</CardTitle>
                      <p className="font-semibold text-lg">{tier.title}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Or enter a custom amount:</label>
                <div className="flex gap-2">
                  <span className="flex items-center px-4 bg-muted border border-input rounded-md">$</span>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={donationAmount}
                    onChange={(e) => {
                      setDonationAmount(e.target.value)
                      setSelectedTier(null)
                    }}
                    min="1"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-8 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>100% of your donation</strong> goes directly to Title I schools. We cover all operating costs
                  through grants and sponsorships.
                </p>
              </div>
            </div>

            {/* Donor Info */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Donation Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Total Donation</p>
                    <p className="text-3xl font-bold">${donationAmount || "0"}</p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-base py-6"
                    disabled={!donationAmount || !donorName || !donorEmail}
                  >
                    Donate Now
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Your donation is secure and confidential.</p>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
