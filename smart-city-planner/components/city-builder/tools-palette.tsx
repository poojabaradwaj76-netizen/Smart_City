"use client"

import { Button } from "@/components/ui/button"
import { Building2, Trees, Zap, Droplet, Radio, ShoppingCart as ShoppingCenter, Factory, Trash2 } from "lucide-react"

const tools = [
  { id: "building", label: "Residential", icon: Building2 },
  { id: "commercial", label: "Commercial", icon: ShoppingCenter },
  { id: "industrial", label: "Industrial", icon: Factory },
  { id: "park", label: "Parks", icon: Trees },
  { id: "energy", label: "Energy", icon: Zap },
  { id: "water", label: "Water", icon: Droplet },
  { id: "transport", label: "Transport", icon: Radio },
  { id: "delete", label: "Delete", icon: Trash2 },
]

interface ToolsPaletteProps {
  selectedTool: string
  setSelectedTool: (tool: string) => void
}

export default function ToolsPalette({ selectedTool, setSelectedTool }: ToolsPaletteProps) {
  return (
    <div className="w-20 bg-card/50 backdrop-blur-md border-r border-border flex flex-col items-center gap-2 p-3 overflow-y-auto">
      {tools.map((tool) => {
        const Icon = tool.icon
        return (
          <Button
            key={tool.id}
            variant={selectedTool === tool.id ? "default" : "outline"}
            size="icon"
            onClick={() => setSelectedTool(tool.id)}
            title={tool.label}
            className="w-14 h-14"
          >
            <Icon className="w-5 h-5" />
          </Button>
        )
      })}
    </div>
  )
}
