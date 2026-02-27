"use client"

import { useState } from "react"
import { X, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ScenarioCompareProps {
  onClose: () => void
}

const scenarios = [
  {
    id: "current",
    name: "Current City",
    score: 65,
    pollution: 52,
    traffic: 68,
    energy: 45,
    water: 72,
  },
  {
    id: "optimized",
    name: "Optimized Plan",
    score: 82,
    pollution: 32,
    traffic: 42,
    energy: 78,
    water: 88,
  },
  {
    id: "alternative",
    name: "Alternative Design",
    score: 71,
    pollution: 45,
    traffic: 55,
    energy: 65,
    water: 80,
  },
]

export default function ScenarioCompare({ onClose }: ScenarioCompareProps) {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(["current", "optimized"])

  const metrics = ["score", "pollution", "traffic", "energy", "water"] as const

  const getScenarioLabel = (id: string) => {
    return scenarios.find((s) => s.id === id)?.name || id
  }

  const getMetricValue = (scenario: (typeof scenarios)[0], metric: string) => {
    return scenario[metric as keyof typeof scenario] || 0
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Scenario Comparison</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Select Scenarios</h4>
          <div className="grid grid-cols-3 gap-2">
            {scenarios.map((scenario) => (
              <Button
                key={scenario.id}
                variant={selectedScenarios.includes(scenario.id) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedScenarios((prev) =>
                    prev.includes(scenario.id) ? prev.filter((s) => s !== scenario.id) : [...prev, scenario.id],
                  )
                }}
                className="text-xs"
              >
                {scenario.name}
              </Button>
            ))}
          </div>
        </div>

        {selectedScenarios.length > 0 && (
          <div className="space-y-3">
            {metrics.map((metric) => (
              <div key={metric} className="space-y-2">
                <h4 className="text-sm font-medium capitalize">{metric}</h4>
                <div className="space-y-2">
                  {selectedScenarios.map((scenarioId) => {
                    const scenario = scenarios.find((s) => s.id === scenarioId)
                    if (!scenario) return null

                    const value = getMetricValue(scenario, metric)
                    const isBetter = metric === "score" || metric === "energy" || metric === "water" ? true : false

                    return (
                      <div key={scenario.id} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{scenario.name}</span>
                          <span className="font-semibold">{value}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedScenarios.length >= 2 && (
          <Card className="p-3 bg-accent/5 border-accent/20">
            <h4 className="text-sm font-semibold mb-2">Winner</h4>
            <p className="text-xs text-muted-foreground">
              The "Optimized Plan" scenario performs best overall with a Green Score of 82, significantly reducing
              pollution and improving traffic flow.
            </p>
          </Card>
        )}
      </div>

      <div className="p-3 border-t border-border">
        <Button className="w-full text-sm" onClick={onClose}>
          Apply Best Scenario
        </Button>
      </div>
    </div>
  )
}
