"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FolderOpen, Save, Undo2, Redo2, ZoomIn, ZoomOut, TrendingUp, Sparkles, Home } from "lucide-react"
import Link from "next/link"
import CityCanvas from "@/components/city-builder/city-canvas"
import SimulationCanvas from "@/components/city-builder/simulation-canvas"
import PropertiesPanel from "@/components/city-builder/properties-panel"
import SimulationControls from "@/components/city-builder/simulation-controls"
import GreenScoreWidget from "@/components/city-builder/green-score-widget"
import ToolsPalette from "@/components/city-builder/tools-palette"
import AnalyticsPanel from "@/components/city-builder/analytics-panel"
import AiAssistant from "@/components/city-builder/ai-assistant"
import DisasterSimulator from "@/components/city-builder/disaster-simulator"
import ScenarioCompare from "@/components/city-builder/scenario-compare"
import AiChat from "@/components/city-builder/ai-chat"
import ExportMenu from "@/components/city-builder/export-menu"
import { GreenScoreCalculator } from "@/lib/green-score-calculator"

interface Building {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  pollution: number
  energy: number
  population?: number
}

export default function CityBuilderPage() {
  const [selectedTool, setSelectedTool] = useState("building")
  const [greenScore, setGreenScore] = useState(65)
  const [showProperties, setShowProperties] = useState(true)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [showDisaster, setShowDisaster] = useState(false)
  const [showScenario, setShowScenario] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [simulationRunning, setSimulationRunning] = useState(false)
  const [simMode, setSimMode] = useState<"edit" | "simulate">("edit")
  const [zoom, setZoom] = useState(1)
  const [selectedBuilding, setSelectedBuilding] = useState<Building | undefined>()
  const [buildings, setBuildings] = useState<Building[]>([
    { id: "1", type: "building", x: 100, y: 100, width: 60, height: 80, pollution: 45, energy: 2.3, population: 250 },
    { id: "2", type: "building", x: 200, y: 150, width: 60, height: 80, pollution: 35, energy: 1.8, population: 200 },
    { id: "3", type: "building", x: 350, y: 100, width: 60, height: 80, pollution: 50, energy: 2.8, population: 280 },
    { id: "4", type: "park", x: 500, y: 100, width: 100, height: 100, pollution: 0, energy: 0 },
  ])
  const [showHeatmap, setShowHeatmap] = useState<"pollution" | "traffic" | null>(null)
  const [simulationSpeed, setSimulationSpeed] = useState(1)

  // Update green score when buildings change
  const calculator = new GreenScoreCalculator()
  const scoreData = calculator.calculateFromBuildings(buildings)

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Toolbar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md px-6 py-3 flex items-center justify-between z-40">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hover:text-primary transition">
            <Home className="w-5 h-5" />
          </Link>
          <h2 className="text-lg font-semibold">Eco Harbor City</h2>
          <div className="flex gap-2">
            <Button variant={simMode === "edit" ? "default" : "outline"} size="sm" onClick={() => setSimMode("edit")}>
              Edit
            </Button>
            <Button
              variant={simMode === "simulate" ? "default" : "outline"}
              size="sm"
              onClick={() => setSimMode("simulate")}
            >
              Simulate
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <FolderOpen className="w-4 h-4" />
              Open
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Save className="w-4 h-4" />
              Save
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent" title="Undo">
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent" title="Redo">
            <Redo2 className="w-4 h-4" />
          </Button>
          <div className="border-l border-border mx-2 h-6" />
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">{(zoom * 100).toFixed(0)}%</span>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {simMode === "simulate" && (
            <>
              <Button
                variant={showHeatmap === "pollution" ? "default" : "outline"}
                size="sm"
                onClick={() => setShowHeatmap(showHeatmap === "pollution" ? null : "pollution")}
              >
                Pollution
              </Button>
              <Button
                variant={showHeatmap === "traffic" ? "default" : "outline"}
                size="sm"
                onClick={() => setShowHeatmap(showHeatmap === "traffic" ? null : "traffic")}
              >
                Traffic
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDisaster(!showDisaster)}
                title="Disaster Simulation"
              >
                Disaster
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowScenario(!showScenario)}
                title="Compare Scenarios"
              >
                Compare
              </Button>
            </>
          )}
          <Button
            variant={showAnalytics ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            <TrendingUp className="w-4 h-4" />
            Analytics
          </Button>
          <Button
            variant={showAI ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => setShowAI(!showAI)}
          >
            <Sparkles className="w-4 h-4" />
            AI
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowChat(!showChat)} title="AI Chat Assistant">
            Chat
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowExport(!showExport)} title="Export Options">
            Export
          </Button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools (only in edit mode) */}
        {simMode === "edit" && <ToolsPalette selectedTool={selectedTool} setSelectedTool={setSelectedTool} />}

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col relative bg-gradient-to-br from-muted/50 to-background">
          {simMode === "edit" ? (
            <CityCanvas selectedTool={selectedTool} onBuildingSelect={setSelectedBuilding} />
          ) : (
            <SimulationCanvas buildings={buildings} running={simulationRunning} showHeatmap={showHeatmap} />
          )}

          {/* Floating Simulation Controls - Only in simulate mode */}
          {simMode === "simulate" && (
            <div className="absolute bottom-6 left-6">
              <SimulationControls
                running={simulationRunning}
                onToggle={() => setSimulationRunning(!simulationRunning)}
                speed={simulationSpeed}
                onSpeedChange={setSimulationSpeed}
              />
            </div>
          )}

          {/* Floating Green Score */}
          <div className="absolute top-6 right-6">
            <GreenScoreWidget score={scoreData.totalScore} buildings={buildings} />
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        {showProperties && simMode === "edit" && (
          <div className="w-80 border-l border-border bg-card/50 backdrop-blur-md overflow-y-auto">
            <PropertiesPanel onClose={() => setShowProperties(false)} selectedBuilding={selectedBuilding} />
          </div>
        )}

        {/* Analytics Panel - Floating */}
        {showAnalytics && (
          <div className="absolute right-0 bottom-0 w-96 max-h-96 border-l border-t border-border bg-card/90 backdrop-blur-md rounded-tl-lg">
            <AnalyticsPanel onClose={() => setShowAnalytics(false)} />
          </div>
        )}

        {/* AI Assistant - Floating */}
        {showAI && (
          <div className="absolute right-0 bottom-0 w-96 max-h-[500px] border-l border-t border-border bg-card/90 backdrop-blur-md rounded-tl-lg">
            <AiAssistant onClose={() => setShowAI(false)} />
          </div>
        )}

        {/* Disaster Simulator - Floating */}
        {showDisaster && (
          <div className="absolute right-0 bottom-0 w-96 max-h-[500px] border-l border-t border-border bg-card/90 backdrop-blur-md rounded-tl-lg">
            <DisasterSimulator onClose={() => setShowDisaster(false)} />
          </div>
        )}

        {/* Scenario Comparison - Floating */}
        {showScenario && (
          <div className="absolute right-0 bottom-0 w-96 max-h-[500px] border-l border-t border-border bg-card/90 backdrop-blur-md rounded-tl-lg">
            <ScenarioCompare onClose={() => setShowScenario(false)} />
          </div>
        )}

        {/* AI Chat Assistant - Floating */}
        {showChat && (
          <div className="absolute right-0 bottom-0 w-96 max-h-[500px] border-l border-t border-border bg-card/90 backdrop-blur-md rounded-tl-lg">
            <AiChat onClose={() => setShowChat(false)} />
          </div>
        )}

        {/* Export Menu - Floating */}
        {showExport && (
          <div className="absolute right-0 bottom-0 w-96 max-h-[500px] border-l border-t border-border bg-card/90 backdrop-blur-md rounded-tl-lg">
            <ExportMenu onClose={() => setShowExport(false)} cityName="Eco Harbor City" />
          </div>
        )}
      </div>
    </div>
  )
}
