"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, Zap, Droplet, Users, Building2, Trees } from "lucide-react"

interface ScoreBreakdownPanelProps {
  factors: {
    treeCoverage: number
    pollutionLevel: number
    renewableEnergy: number
    trafficCongestion: number
    waterEfficiency: number
    populationDensity: number
    publicTransport: number
    greenSpaces: number
  }
}

export default function ScoreBreakdownPanel({ factors }: ScoreBreakdownPanelProps) {
  const factorsList = [
    {
      label: "Tree Coverage",
      value: factors.treeCoverage,
      icon: Trees,
      color: "text-green-600",
      weight: 0.15,
    },
    {
      label: "Pollution Level",
      value: factors.pollutionLevel,
      icon: Leaf,
      color: "text-orange-600",
      weight: 0.2,
    },
    {
      label: "Renewable Energy",
      value: factors.renewableEnergy,
      icon: Zap,
      color: "text-yellow-600",
      weight: 0.18,
    },
    {
      label: "Traffic Flow",
      value: factors.trafficCongestion,
      icon: Building2,
      color: "text-blue-600",
      weight: 0.15,
    },
    {
      label: "Water Efficiency",
      value: factors.waterEfficiency,
      icon: Droplet,
      color: "text-cyan-600",
      weight: 0.12,
    },
    {
      label: "Public Transport",
      value: factors.publicTransport,
      icon: Users,
      color: "text-purple-600",
      weight: 0.1,
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Score Breakdown</h3>
      {factorsList.map((factor, i) => {
        const Icon = factor.icon
        const contribution = (factor.value / 100) * factor.weight * 100

        return (
          <Card key={i} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${factor.color}`} />
                <span className="text-sm font-medium">{factor.label}</span>
              </div>
              <span className="text-sm font-bold text-primary">{Math.round(factor.value)}/100</span>
            </div>
            <Progress value={factor.value} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Weight: {(factor.weight * 100).toFixed(0)}%</span>
              <span>Contribution: {contribution.toFixed(1)} pts</span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
