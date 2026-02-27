"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { GreenScoreCalculator } from "@/lib/green-score-calculator"
import { useState, useEffect } from "react"

interface GreenScoreWidgetProps {
  score: number
  buildings?: any[]
}

export default function GreenScoreWidget({ score, buildings }: GreenScoreWidgetProps) {
  const calculator = new GreenScoreCalculator()
  const [displayScore, setDisplayScore] = useState(score)
  const [breakdown, setBreakdown] = useState<any>(null)

  useEffect(() => {
    if (buildings && buildings.length > 0) {
      const scoreData = calculator.calculateFromBuildings(buildings)
      setDisplayScore(scoreData.totalScore)
      setBreakdown(scoreData)
    }
  }, [buildings])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 60) return "text-blue-600 bg-blue-50"
    if (score >= 40) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const grade = calculator.getScoreGrade(displayScore)

  return (
    <Card className="bg-card/80 backdrop-blur-md border-accent/50 p-6 w-64 shadow-lg hover:shadow-xl transition">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Green City Score</p>
            <p className={`text-4xl font-bold mt-1 ${getScoreColor(displayScore).split(" ")[0]}`}>{displayScore}</p>
          </div>
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${getScoreColor(displayScore)}`}
          >
            {grade}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress to 100</span>
            <span className="font-semibold">{displayScore}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${displayScore}%` }}
            />
          </div>
        </div>

        {breakdown?.recommendations && breakdown.recommendations.length > 0 && (
          <div className="pt-3 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Top Improvement
            </p>
            <p className="text-xs text-foreground">{breakdown.recommendations[0]}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
