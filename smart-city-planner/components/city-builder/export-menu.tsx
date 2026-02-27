"use client"

import { useState } from "react"
import { X, Download, Share2, FileText, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ExportMenuProps {
  onClose: () => void
  cityName?: string
}

export default function ExportMenu({ onClose, cityName = "Eco Harbor City" }: ExportMenuProps) {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)

  const exports = [
    {
      id: "image",
      name: "Export as Image",
      icon: ImageIcon,
      description: "Save city layout as PNG",
      format: "PNG",
    },
    {
      id: "pdf",
      name: "Export as PDF Report",
      icon: FileText,
      description: "Detailed analysis report with metrics",
      format: "PDF",
    },
    {
      id: "data",
      name: "Export Data File",
      icon: Download,
      description: "Save project file for later editing",
      format: "JSON",
    },
    {
      id: "share",
      name: "Generate Share Link",
      icon: Share2,
      description: "Create shareable project link",
      format: "Link",
    },
  ]

  const handleExport = (id: string) => {
    console.log(`Exporting as ${id}`)
    // Simulate export
    setTimeout(() => {
      alert(`${cityName} exported successfully as ${id}`)
      onClose()
    }, 500)
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold">Export City</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <p className="text-sm text-muted-foreground px-1">Choose an export format for "{cityName}"</p>

        {exports.map((exp) => {
          const Icon = exp.icon
          return (
            <Card
              key={exp.id}
              className="p-3 cursor-pointer transition border-2 hover:border-primary/50"
              onClick={() => handleExport(exp.id)}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{exp.name}</h4>
                  <p className="text-xs text-muted-foreground">{exp.description}</p>
                  <div className="mt-2">
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{exp.format}</span>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="p-3 border-t border-border space-y-2">
        <Button variant="outline" className="w-full text-sm bg-transparent" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
