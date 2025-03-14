"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, User, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ChatInterface() {
  const [
    messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
      }])
    } catch (error) {
      console.error("Chat Error:", error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] rounded-lg border border-[#30D5C8]/20 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${
              message.role === "assistant" 
                ? "bg-black/30" 
                : "bg-[#30D5C8]/10"
            } rounded-lg p-4`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === "assistant" 
                ? "bg-[#30D5C8]/20 text-[#30D5C8]" 
                : "bg-white/10"
            }`}>
              {message.role === "assistant" ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground/90">{message.content}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 bg-black/30 rounded-lg p-4"
          >
            <div className="w-8 h-8 rounded-full bg-[#30D5C8]/20 text-[#30D5C8] flex items-center justify-center">
              <Loader2 size={20} className="animate-spin" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground/60">OmniCore is thinking...</p>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-[#30D5C8]/20">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            placeholder="Ask a question about your data..."
            className="min-h-[44px] max-h-32"
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e as unknown as React.FormEvent)
              }
            }}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-[#30D5C8] hover:bg-[#30D5C8]/80"
          >
            <Send size={20} />
          </Button>
        </div>
      </form>
    </div>
  )
}
