import { ChatInterface } from "@/components/chat-interface"

export default function ChatbotPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#30D5C8]">AI Assistant</h1>
            <p className="mt-2 text-foreground/70">
              Chat with our AI to analyze your data and get insights
            </p>
          </div>
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}
