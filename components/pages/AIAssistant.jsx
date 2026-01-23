"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Lightbulb, TrendingUp, Wand2, Zap } from "lucide-react"
import AIFeature from "@/components/ai/AIFeature"
import { callGeminiAPI } from "@/app/actions/gemini"

export default function AIAssistant({ tasks }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Task Assistant powered by Google Gemini. I can help you with task suggestions, priority recommendations, categorization, and productivity insights. What would you like help with today?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const features = [
    {
      title: "Task Suggestions",
      description: "Get AI-powered suggestions for new tasks based on your activity",
      icon: Lightbulb,
      action: () => generateSuggestions(),
    },
    {
      title: "Smart Priorities",
      description: "AI recommends which tasks should be high priority",
      icon: TrendingUp,
      action: () => generatePriorities(),
    },
    {
      title: "Auto Categorize",
      description: "Automatically categorize your existing tasks",
      icon: Wand2,
      action: () => generateCategories(),
    },
    {
      title: "Productivity Summary",
      description: "Get insights into your productivity patterns",
      icon: Sparkles,
      action: () => generateSummary(),
    },
  ]

  const handleCallGeminiAPI = async (prompt) => {
    setLoading(true)
    try {
      const response = await callGeminiAPI(prompt)
      return response
    } catch (error) {
      console.error("[v0] Error calling Gemini API:", error)
      return "Error calling Gemini API. Please check your API key and try again."
    } finally {
      setLoading(false)
    }
  }

  const generateSuggestions = async () => {
    const userMessage = "Generate task suggestions"
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    const taskList = tasks
      .slice(-5)
      .map((t) => `- ${t.title} (${t.category})`)
      .join("\n")
    const prompt = `Based on these recent tasks:\n${taskList}\n\nSuggest 3-4 new tasks that would be helpful to add. Format as a bullet list.`

    const aiResponse = await handleCallGeminiAPI(prompt)
    setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
  }

  const generatePriorities = async () => {
    const userMessage = "Analyze priority levels"
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    const taskList = tasks
      .filter((t) => !t.completed)
      .slice(0, 5)
      .map((t) => `- ${t.title} (Deadline: ${t.deadline}, Current Priority: ${t.priority})`)
      .join("\n")

    const prompt = `Analyze these pending tasks and recommend priority levels:\n${taskList}\n\nProvide your recommendations with brief reasoning.`

    const aiResponse = await handleCallGeminiAPI(prompt)
    setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
  }

  const generateCategories = async () => {
    const userMessage = "Auto-categorize tasks"
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    const taskList = tasks.map((t) => `- ${t.title}`).join("\n")
    const prompt = `Analyze these tasks and suggest optimal categories (Work, Personal, Study, Health, Shopping):\n${taskList}\n\nProvide a brief categorization summary.`

    const aiResponse = await handleCallGeminiAPI(prompt)
    setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
  }

  const generateSummary = async () => {
    const userMessage = "Show productivity summary"
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    const completed = tasks.filter((t) => t.completed).length
    const total = tasks.length
    const highPriority = tasks.filter((t) => !t.completed && t.priority === "High").length

    const prompt = `Generate a motivational productivity summary based on these stats:
Total Tasks: ${total}
Completed: ${completed}
Pending: ${total - completed}
High Priority Pending: ${highPriority}

Include completion rate, insights, and encouragement.`

    const aiResponse = await handleCallGeminiAPI(prompt)
    setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInput("")

    const aiResponse = await handleCallGeminiAPI(userMessage)
    setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="animate-slideDown">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <div className="text-secondary animate-spin" style={{ animationDuration: "3s" }}>
            <Sparkles size={32} />
          </div>
          AI Assistant
        </h1>
        <p className="text-muted-foreground">Powered by Google Gemini AI</p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slideUp" style={{ animationDelay: "100ms" }}>
        {features.map((feature, index) => (
          <AIFeature key={index} feature={feature} index={index} />
        ))}
      </div>

      {/* Chat Interface */}
      <div className="glass-lg border border-border/40 rounded-2xl overflow-hidden flex flex-col h-96 backdrop-blur-xl animate-slideUp" style={{ animationDelay: "200ms" }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-primary/5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex animate-slideUp transition-all duration-300 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              style={{ animationDelay: `${50 * index}ms` }}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-xl ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 rounded-br-none"
                    : "glass border border-border/40 text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-slideUp">
              <div className="glass border border-border/40 px-4 py-3 rounded-xl">
                <div className="flex gap-2">
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                    style={{ animationDelay: "100ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-accent rounded-full animate-bounce"
                    style={{ animationDelay: "200ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="border-t border-border/40 p-4 flex gap-2 bg-muted/20">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything about your tasks..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            {loading ? <Zap size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  )
}
