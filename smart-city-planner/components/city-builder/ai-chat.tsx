"use client"

import { useState } from "react"
import { X, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AiChatProps {
  onClose: () => void
}

const aiResponses: Record<string, string> = {
  pollution:
    "High pollution detected in Zone B. Consider adding 3-4 parks and relocating industrial zones away from residential areas. This could reduce pollution by 25-30%.",
  traffic:
    "Traffic congestion is highest during peak hours. I recommend expanding the metro network by 2-3 stations and adding bus rapid transit corridors on main roads.",
  energy:
    "Your city is using 45% renewable energy. To reach 70%, add 5 more solar plants in industrial zones and 2 wind turbines in open areas.",
  water:
    "Water efficiency is at 72%. Consider adding water recycling facilities in commercial zones and increasing green coverage to improve retention.",
  green:
    "To improve your Green Score from 65 to 75+, prioritize: 1) Increase parks to 18%, 2) Reduce pollution by 20%, 3) Expand renewable energy to 60%.",
  build:
    "To create a new residential building, select the Residential tool from the left palette and click where you want to place it. Drag to adjust its size.",
  population:
    "Your city supports approximately 750,000 residents with the current layout. Adding more residential zones could increase this to 1M+.",
  export:
    "You can export your city design as an image or PDF report from the top toolbar. Reports include detailed analytics and recommendations.",
}

export default function AiChat({ onClose }: AiChatProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI City Assistant. Ask me about pollution, traffic, energy, water efficiency, or how to improve your Green Score.",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    setMessages((prev) => [...prev, { role: "user", content: input }])
    setInput("")
    setLoading(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const lowerInput = input.toLowerCase()
    let response =
      "I'm not sure about that. Try asking about pollution, traffic, energy, water, green score, or how to build."

    for (const [key, value] of Object.entries(aiResponses)) {
      if (lowerInput.includes(key)) {
        response = value
        break
      }
    }

    setMessages((prev) => [...prev, { role: "assistant", content: response }])
    setLoading(false)
  }

  const suggestedQuestions = [
    "How to reduce pollution?",
    "Improve traffic flow",
    "Increase renewable energy",
    "Better water efficiency",
  ]

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">AI City Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, i) => (
          <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground border border-border"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground border border-border px-3 py-2 rounded-lg text-sm">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="p-3 space-y-2 border-t border-border">
          <p className="text-xs text-muted-foreground font-medium">Suggested questions:</p>
          <div className="space-y-1">
            {suggestedQuestions.map((question, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left text-xs h-auto py-2 bg-transparent"
                onClick={() => {
                  setInput(question)
                }}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="p-3 border-t border-border space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="h-8 text-xs"
          />
          <Button size="icon" onClick={handleSend} disabled={loading || !input.trim()} className="h-8 w-8">
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
