import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/30 border-t border-[#30D5C8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#30D5C8]">OmniCore AI</h2>
            <p className="text-sm text-foreground/70">
              Advanced AI data analysis platform for predictive modeling, anomaly detection,
              and pattern recognition.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="text-foreground/70 hover:text-[#30D5C8] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              {/* Add other social links similarly */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-foreground/70 hover:text-[#30D5C8] transition-colors"
                >
                  Data Analysis
                </Link>
              </li>
              {/* Add other product links */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-foreground/70 hover:text-[#30D5C8] transition-colors"
                >
                  About Us
                </Link>
              </li>
              {/* Add other company links */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-foreground/70 hover:text-[#30D5C8] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              {/* Add other legal links */}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#30D5C8]/20 text-center text-sm text-foreground/70">
          © {new Date().getFullYear()} OmniCore AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
