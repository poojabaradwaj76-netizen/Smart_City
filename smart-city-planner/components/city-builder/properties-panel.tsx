"use client"

import { X, Zap, Droplet, Cog as Smog, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface PropertiesPanelProps {
  onClose: () => void
  selectedBuilding?: {
    id: string
    type: string
    x: number
    y: number
    pollution: number
    energy: number
  }
}

export default function PropertiesPanel({ onClose, selectedBuilding }: PropertiesPanelProps) {
  const [heatmapType, setHeatmapType] = useState<"pollution" | "energy" | "traffic" | null>(null)

  if (!selectedBuilding) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold">Properties</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Building2 className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">Select a building to view properties</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-semibold capitalize">{selectedBuilding.type}</h3>
          <p className="text-xs text-muted-foreground">ID: {selectedBuilding.id.slice(0, 8)}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Smog className="w-4 h-4 text-orange-500" />
            <label className="text-sm font-medium">Pollution Level</label>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-red-500"
                style={{ width: `${selectedBuilding.pollution}%` }}
              />
            </div>
            <span className="text-sm font-semibold min-w-fit">{selectedBuilding.pollution} AQI</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <label className="text-sm font-medium">Energy Usage</label>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: `${(selectedBuilding.energy / 10) * 100}%` }} />
            </div>
            <span className="text-sm font-semibold min-w-fit">{selectedBuilding.energy} MWh</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-4 h-4 text-blue-500" />
            <label className="text-sm font-medium">Water Usage</label>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: "45%" }} />
            </div>
            <span className="text-sm font-semibold min-w-fit">1.2 ML</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Impact Summary
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between bg-muted/50 p-2 rounded">
              <span>Population Served</span>
              <span className="font-semibold">2,450</span>
            </div>
            <div className="flex justify-between bg-muted/50 p-2 rounded">
              <span>Traffic Impact</span>
              <span className="font-semibold">Medium</span>
            </div>
            <div className="flex justify-between bg-muted/50 p-2 rounded">
              <span>Green Contribution</span>
              <span className="font-semibold text-accent">+8%</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="font-semibold text-sm mb-3">Heatmap Overlay</h4>
          <div className="grid grid-cols-2 gap-2">
            {["pollution", "energy", "traffic", "water"].map((type) => (
              <Button
                key={type}
                variant={heatmapType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setHeatmapType(heatmapType === type ? null : (type as any))}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          <Button variant="outline" className="w-full text-sm bg-transparent">
            Upgrade Building
          </Button>
          <Button variant="outline" className="w-full text-sm bg-transparent">
            Add Renewable Energy
          </Button>
          <Button variant="destructive" className="w-full text-sm">
            Demolish
          </Button>
        </div>
      </div>
    </div>
  )
}
