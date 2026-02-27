"use client"

import { X, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface AnalyticsPanelProps {
  onClose: () => void
  data?: any
}

export default function AnalyticsPanel({ onClose, data }: AnalyticsPanelProps) {
  const [activeTab, setActiveTab] = useState<"trends" | "breakdown">("trends")

  const chartData = [
    { time: "0h", pollution: 45, traffic: 32, energy: 65 },
    { time: "4h", pollution: 52, traffic: 45, energy: 72 },
    { time: "8h", pollution: 48, traffic: 78, energy: 85 },
    { time: "12h", pollution: 55, traffic: 65, energy: 60 },
    { time: "16h", pollution: 60, traffic: 82, energy: 58 },
    { time: "20h", pollution: 42, traffic: 48, energy: 48 },
  ]

  const maxValue = 100

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">City Analytics</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-2 p-3 border-b border-border">
        <button
          onClick={() => setActiveTab("trends")}
          className={`text-xs font-medium px-3 py-1 rounded transition ${
            activeTab === "trends" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Trends
        </button>
        <button
          onClick={() => setActiveTab("breakdown")}
          className={`text-xs font-medium px-3 py-1 rounded transition ${
            activeTab === "breakdown" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Breakdown
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "trends" && (
          <>
            {/* Pollution Trend Chart */}
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                Pollution Level
              </h4>
              <div className="space-y-2">
                <div className="flex items-end justify-between gap-1 h-20 bg-muted/30 p-2 rounded">
                  {chartData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-red-400 rounded-t transition-all hover:opacity-75"
                        style={{ height: `${(d.pollution / maxValue) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{d.time}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Avg: 50 AQI</span>
                  <span>Peak: 60 AQI</span>
                </div>
              </div>
            </div>

            {/* Traffic Trend Chart */}
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full" />
                Traffic Density
              </h4>
              <div className="space-y-2">
                <div className="flex items-end justify-between gap-1 h-20 bg-muted/30 p-2 rounded">
                  {chartData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-orange-400 rounded-t transition-all hover:opacity-75"
                        style={{ height: `${(d.traffic / maxValue) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{d.time}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Avg: 59%</span>
                  <span>Peak: 82%</span>
                </div>
              </div>
            </div>

            {/* Energy Usage Chart */}
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                Energy Usage
              </h4>
              <div className="space-y-2">
                <div className="flex items-end justify-between gap-1 h-20 bg-muted/30 p-2 rounded">
                  {chartData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-yellow-400 rounded-t transition-all hover:opacity-75"
                        style={{ height: `${(d.energy / maxValue) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{d.time}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Avg: 65 MWh</span>
                  <span>Peak: 85 MWh</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "breakdown" && (
          <div className="space-y-3">
            {[
              { label: "Renewable Energy", value: 45, color: "bg-green-500" },
              { label: "Non-Renewable Energy", value: 55, color: "bg-gray-500" },
              { label: "Traffic Flow", value: 38, color: "bg-blue-500" },
              { label: "Air Quality", value: 62, color: "bg-teal-500" },
              { label: "Water Efficiency", value: 74, color: "bg-cyan-500" },
              { label: "Green Coverage", value: 28, color: "bg-lime-500" },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-border space-y-2">
        <Button variant="outline" className="w-full text-xs h-8 bg-transparent">
          Export Report
        </Button>
        <Button variant="outline" className="w-full text-xs h-8 bg-transparent">
          Download PDF
        </Button>
      </div>
    </div>
  )
}
