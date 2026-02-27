"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, MapPin, Clock, Edit2, Trash2, Copy, Download } from "lucide-react"

const mockProjects = [
  {
    id: 1,
    name: "Eco Harbor City",
    lastEdited: "2025-01-15",
    greenScore: 78,
    population: 250000,
    status: "Active",
  },
  {
    id: 2,
    name: "Mountain Valley Living",
    lastEdited: "2025-01-10",
    greenScore: 65,
    population: 150000,
    status: "Draft",
  },
  {
    id: 3,
    name: "Coastal Sustainability Hub",
    lastEdited: "2025-01-08",
    greenScore: 82,
    population: 300000,
    status: "Active",
  },
]

export default function DashboardPage() {
  const [projects] = useState(mockProjects)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">City Projects</h1>
              <p className="text-muted-foreground mt-1">Manage and create your smart city designs</p>
            </div>
            <Link href="/city-builder">
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                New City Project
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:border-primary/50 transition group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4" />
                        {project.population.toLocaleString()} residents
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{project.greenScore}</div>
                      <div className="text-xs text-muted-foreground">Green Score</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Last edited: {new Date(project.lastEdited).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        project.status === "Active" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Link href={`/city-builder?project=${project.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">Create your first smart city to get started</p>
            <Link href="/city-builder">
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Create First City
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
