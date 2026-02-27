"use client"

import { useState } from "react"
import { X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AiAssistantProps {
  onClose: () => void
}

const suggestions = [
  {
    title: "Add parks in high pollution zones",
    reason: "Areas around factories have elevated pollution levels",
    benefit: "↑ 12% improvement",
  },
  {
    title: "Relocate industries away from residential",
    reason: "Industrial zones too close to homes",
    benefit: "↑ 8% quality of life",
  },
  {
    title: "Expand metro network",
    reason: "Traffic congestion detected on main routes",
    benefit: "↓ 15% traffic",
  },
]

export default function AiAssistant({ onClose }: AiAssistantProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">AI Suggestions</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {suggestions.map((suggestion, i) => (
          <div key={i} className="bg-card/50 border border-border rounded-lg p-3 space-y-2">
            <h4 className="text-sm font-medium">{suggestion.title}</h4>
            <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-accent">{suggestion.benefit}</span>
              <Button size="sm" variant="outline" className="text-xs h-6 bg-transparent">
                Apply
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Ask AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-8 text-xs"
          />
          <Button size="icon" className="h-8 w-8">
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
