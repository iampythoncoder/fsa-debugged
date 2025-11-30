import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-bold text-foreground mb-4">FSA</h3>
            <p className="text-sm text-muted-foreground">
              Empowering tomorrow's leaders through education and innovation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-foreground">
                  Team
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="mailto:contact@futurescholars.org" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/schools" className="text-muted-foreground hover:text-foreground">
                  Find Schools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Future Scholars Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
