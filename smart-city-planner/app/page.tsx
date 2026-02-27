"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <div className="w-8 h-8 bg-primary rounded-full" />
            <span>Smart Green City</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition">
              Sign In
            </Link>
            <Link href="/signup">
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-accent">✨ AI-Powered Urban Planning</span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            Design &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Simulate </span>
            Sustainable Smart Cities
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto leading-relaxed">
            Create the future of urban planning with AI-powered insights. Design resilient, eco-friendly cities, run
            real-time simulations, and optimize for sustainability in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start Building →
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              View Demo ✨
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 border-t border-border bg-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Urban Planners</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to design and simulate sustainable cities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "⚡",
                title: "Interactive City Builder",
                desc: "Drag-and-drop placement of buildings, roads, parks, and renewable energy sources with real-time validation",
              },
              {
                emoji: "🌿",
                title: "Green Score System",
                desc: "Real-time sustainability scoring based on pollution, energy usage, tree coverage, and more",
              },
              {
                emoji: "👥",
                title: "AI Suggestions",
                desc: "Get smart recommendations to improve your city's sustainability and efficiency",
              },
              {
                emoji: "📊",
                title: "Advanced Simulation",
                desc: "Run traffic, pollution, and climate simulations to see how your city performs",
              },
              {
                emoji: "📈",
                title: "Real-Time Analytics",
                desc: "Monitor pollution, traffic, energy, and water consumption with live dashboards",
              },
              {
                emoji: "💡",
                title: "Auto-Generation",
                desc: "Generate fully optimized smart cities based on population, budget, and climate",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition">
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Active Planners" },
              { value: "1.2M", label: "Simulations Run" },
              { value: "98%", label: "Accuracy Rate" },
              { value: "48h", label: "Avg Time Saved" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build the Future?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join urban planners and climate researchers designing sustainable cities for tomorrow.
          </p>
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Create Your First City →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Smart Green City Planner. Designed for sustainable urban development.</p>
          <p className="mt-2">Using AI to build smarter, greener cities for everyone.</p>
        </div>
      </footer>
    </div>
  )
}
