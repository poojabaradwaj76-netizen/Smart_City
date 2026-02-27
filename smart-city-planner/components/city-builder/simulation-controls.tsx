"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, SkipForward, RotateCcw, Sliders } from "lucide-react"

interface SimulationControlsProps {
  running: boolean
  onToggle: () => void
  speed?: number
  onSpeedChange?: (speed: number) => void
  onReset?: () => void
}

export default function SimulationControls({
  running,
  onToggle,
  speed = 1,
  onSpeedChange,
  onReset,
}: SimulationControlsProps) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <Card className="bg-card/80 backdrop-blur-md border-primary/50">
      <div className="flex items-center gap-2 p-3">
        <Button size="icon" variant={running ? "default" : "outline"} onClick={onToggle} title="Play/Pause simulation">
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button size="icon" variant="outline" title="Fast forward">
          <SkipForward className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" title="Reset" onClick={onReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
        <div className="w-32 h-1 bg-muted rounded-full">
          <div className="h-full w-1/4 bg-primary rounded-full" />
        </div>
        <Button size="icon" variant="outline" onClick={() => setShowSettings(!showSettings)}>
          <Sliders className="w-4 h-4" />
        </Button>

        {showSettings && (
          <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg p-3 w-48 shadow-lg">
            <label className="text-xs font-medium block mb-2">Simulation Speed</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => onSpeedChange?.(Number.parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">{speed}x</p>
          </div>
        )}
      </div>
    </Card>
  )
}
