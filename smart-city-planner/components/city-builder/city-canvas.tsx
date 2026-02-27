"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface Building {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  pollution: number
  energy: number
}

interface CityCanvasProps {
  selectedTool: string
  onBuildingSelect?: (building: Building) => void
}

export default function CityCanvas({ selectedTool, onBuildingSelect }: CityCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [buildings, setBuildings] = useState<Building[]>([
    { id: "1", type: "building", x: 100, y: 100, width: 60, height: 80, pollution: 45, energy: 2.3 },
    { id: "2", type: "building", x: 200, y: 150, width: 60, height: 80, pollution: 35, energy: 1.8 },
    { id: "3", type: "building", x: 350, y: 100, width: 60, height: 80, pollution: 50, energy: 2.8 },
    { id: "4", type: "park", x: 500, y: 100, width: 100, height: 100, pollution: 0, energy: 0 },
  ])
  const [dragging, setDragging] = useState(false)
  const [draggedBuilding, setDraggedBuilding] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const buildingColors: Record<string, string> = {
    building: "#1e88e5",
    commercial: "#ff9800",
    industrial: "#666666",
    park: "#66bb6a",
    energy: "#fdd835",
    water: "#0097a7",
    transport: "#7c4dff",
  }

  const draw = (ctx: CanvasRenderingContext2D, buildings: Building[]) => {
    const canvas = canvasRef.current
    if (!canvas) return

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

    // Draw buildings
    buildings.forEach((building, index) => {
      ctx.fillStyle = buildingColors[building.type] || "#999999"
      ctx.fillRect(building.x, building.y, building.width, building.height)

      // Draw border
      ctx.strokeStyle = draggedBuilding === building.id ? "#ff6b6b" : "#333333"
      ctx.lineWidth = draggedBuilding === building.id ? 3 : 2
      ctx.strokeRect(building.x, building.y, building.width, building.height)

      // Draw pollution indicator
      if (building.pollution > 0) {
        ctx.fillStyle = `rgba(255, 100, 100, ${building.pollution / 100})`
        ctx.fillRect(building.x + building.width + 5, building.y, 3, building.height)
      }
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    draw(ctx, buildings)
  }, [buildings, draggedBuilding])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (selectedTool === "delete") {
      // Delete mode
      const building = buildings.find((b) => x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height)
      if (building) {
        setBuildings(buildings.filter((b) => b.id !== building.id))
      }
      return
    }

    // Check if clicking on existing building
    const clickedBuilding = buildings.find((b) => x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height)

    if (clickedBuilding) {
      setDragging(true)
      setDraggedBuilding(clickedBuilding.id)
      onBuildingSelect?.(clickedBuilding)
    } else if (selectedTool !== "delete") {
      // Place new building
      const newBuilding: Building = {
        id: Math.random().toString(),
        type: selectedTool,
        x,
        y,
        width: selectedTool === "park" ? 100 : 60,
        height: selectedTool === "park" ? 100 : 80,
        pollution: selectedTool === "industrial" ? 80 : selectedTool === "building" ? 45 : 0,
        energy: selectedTool === "industrial" ? 5 : selectedTool === "building" ? 2.3 : 0,
      }
      setBuildings([...buildings, newBuilding])
      setDraggedBuilding(newBuilding.id)
      onBuildingSelect?.(newBuilding)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !dragging || !draggedBuilding) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setBuildings(
      buildings.map((b) =>
        b.id === draggedBuilding
          ? {
              ...b,
              x: Math.max(0, Math.min(x, canvas.width - b.width)),
              y: Math.max(0, Math.min(y, canvas.height - b.height)),
            }
          : b,
      ),
    )
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  )
}
