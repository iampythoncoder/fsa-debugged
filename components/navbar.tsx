"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/schools", label: "Schools" },
    { href: "/team", label: "Team" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <span className="hidden font-bold text-foreground md:inline-block">Future Scholars Association</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-1">
          {links.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/auth">Sign In</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/donate">Donate</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 border-b border-border bg-background p-4 md:hidden">
            <div className="flex flex-col space-y-2">
              {links.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className="justify-start"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
              <Button
                variant="outline"
                className="justify-start bg-transparent"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 justify-start" asChild onClick={() => setIsOpen(false)}>
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
