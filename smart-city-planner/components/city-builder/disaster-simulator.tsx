"use client"

import { useState } from "react"
import { X, Cloud, Flame, Zap, Droplet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface DisasterSimulatorProps {
  onClose: () => void
  onApply?: (disasterType: string) => void
}

const disasters = [
  {
    id: "flood",
    name: "Flood Simulation",
    icon: Droplet,
    description: "Simulate heavy rainfall and flooding impact",
    effects: ["Low-lying areas affected", "Traffic disrupted", "Power outages possible"],
    severity: "high",
  },
  {
    id: "heatwave",
    name: "Heatwave Simulation",
    icon: Flame,
    description: "Simulate extreme temperature conditions",
    effects: ["Energy demand increases", "Water stress high", "Air quality worsens"],
    severity: "medium",
  },
  {
    id: "storm",
    name: "Storm Simulation",
    icon: Cloud,
    description: "Simulate severe storm conditions",
    effects: ["Infrastructure damage", "Traffic chaos", "Power grid strain"],
    severity: "high",
  },
  {
    id: "blackout",
    name: "Power Grid Failure",
    icon: Zap,
    description: "Simulate city-wide power outage",
    effects: ["All systems offline", "Emergency services affected", "Social disruption"],
    severity: "critical",
  },
]

export default function DisasterSimulator({ onClose, onApply }: DisasterSimulatorProps) {
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null)
  const [simulationResults, setSimulationResults] = useState<any>(null)

  const handleSimulate = () => {
    if (!selectedDisaster) return

    const results = {
      disasterType: selectedDisaster,
      affectedPopulation: Math.floor(Math.random() * 100000) + 50000,
      propertyDamage: Math.floor(Math.random() * 500) + 100,
      recoveryTime: Math.floor(Math.random() * 30) + 5,
      recommendations: [
        "Strengthen critical infrastructure",
        "Increase emergency response capacity",
        "Develop evacuation routes",
        "Improve early warning systems",
      ],
    }
    setSimulationResults(results)
    onApply?.(selectedDisaster)
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold">Disaster Simulation</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {!simulationResults ? (
          <>
            {disasters.map((disaster) => {
              const Icon = disaster.icon
              return (
                <Card
                  key={disaster.id}
                  className={`p-3 cursor-pointer transition border-2 ${
                    selectedDisaster === disaster.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedDisaster(disaster.id)}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{disaster.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{disaster.description}</p>
                      <div className="flex gap-1 mt-2">
                        {disaster.effects.map((effect, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}

            <Button onClick={handleSimulate} disabled={!selectedDisaster} className="w-full mt-4">
              Run Simulation
            </Button>
          </>
        ) : (
          <div className="space-y-3">
            <Card className="p-4 bg-destructive/5 border-destructive/20">
              <h4 className="font-semibold text-sm mb-3">Simulation Results</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Affected Population</span>
                  <span className="font-semibold">{simulationResults.affectedPopulation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Damage</span>
                  <span className="font-semibold">${simulationResults.propertyDamage}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recovery Time</span>
                  <span className="font-semibold">{simulationResults.recoveryTime} days</span>
                </div>
              </div>
            </Card>

            <div>
              <h4 className="text-sm font-semibold mb-2">Recovery Recommendations</h4>
              <div className="space-y-2">
                {simulationResults.recommendations.map((rec: string, i: number) => (
                  <div key={i} className="text-xs bg-muted/50 p-2 rounded">
                    {rec}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => setSimulationResults(null)}
              >
                Try Another
              </Button>
              <Button size="sm" className="flex-1" onClick={onClose}>
                Apply Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
