"use client"

import { useEffect, useRef, useCallback } from "react"
import { SimulationEngine, type SimulationState } from "@/lib/simulation-engine"

interface SimulationCanvasProps {
  buildings: any[]
  running: boolean
  showHeatmap: "pollution" | "traffic" | null
  onStateUpdate?: (state: SimulationState) => void
}

export default function SimulationCanvas({ buildings, running, showHeatmap, onStateUpdate }: SimulationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<SimulationEngine | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new SimulationEngine(buildings)
    }
  }, [buildings])

  const drawHeatmap = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    engine: SimulationEngine,
    type: "pollution" | "traffic",
  ) => {
    const gridSize = 50
    const state = engine.getState()

    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        const value = type === "pollution" ? engine.getPollutionAt(x, y) : engine.getTrafficAt(x, y)

        // Heat color gradient
        let hue: number
        if (value < 25)
          hue = 120 // Green
        else if (value < 50)
          hue = 60 // Yellow
        else if (value < 75)
          hue = 30 // Orange
        else hue = 0 // Red

        const saturation = Math.min(100, value)
        ctx.fillStyle = `hsl(${hue}, 100%, ${50 - saturation / 2}%)`
        ctx.globalAlpha = 0.3
        ctx.fillRect(x, y, gridSize, gridSize)
        ctx.globalAlpha = 1
      }
    }
  }

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const engine = engineRef.current
      if (!engine) return

      // Clear canvas
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = "#e5e5e5"
      ctx.lineWidth = 0.5
      const gridSize = 50

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw heatmap if enabled
      if (showHeatmap) {
        drawHeatmap(ctx, canvas, engine, showHeatmap)
      }

      // Draw roads
      ctx.strokeStyle = "#888888"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(0, 200)
      ctx.lineTo(canvas.width, 200)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(250, 0)
      ctx.lineTo(250, canvas.height)
      ctx.stroke()

      const buildingColors: Record<string, string> = {
        building: "#1e88e5",
        commercial: "#ff9800",
        industrial: "#666666",
        park: "#66bb6a",
        energy: "#fdd835",
        water: "#0097a7",
        transport: "#7c4dff",
      }

      // Draw buildings
      buildings.forEach((building) => {
        ctx.fillStyle = buildingColors[building.type] || "#999999"
        ctx.fillRect(building.x, building.y, building.width, building.height)

        // Draw border
        ctx.strokeStyle = "#333333"
        ctx.lineWidth = 2
        ctx.strokeRect(building.x, building.y, building.width, building.height)
      })

      // Draw citizens
      const state = engine.getState()
      ctx.fillStyle = "#ff6b6b"
      state.citizens.forEach((citizen) => {
        ctx.beginPath()
        ctx.arc(citizen.x, citizen.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
    },
    [buildings, showHeatmap],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const animate = () => {
      const engine = engineRef.current
      if (!engine) return

      if (running) {
        engine.step()
        onStateUpdate?.(engine.getState())
      }

      draw(ctx, canvas)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [running, draw, onStateUpdate])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ background: "white" }} />
}
