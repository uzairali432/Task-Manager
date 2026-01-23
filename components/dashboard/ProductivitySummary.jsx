"use client"

import { TrendingUp, Target, Zap } from "lucide-react"

export default function ProductivitySummary({ tasks }) {
  const completed = tasks.filter((t) => t.completed).length
  const total = tasks.length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  const highPriority = tasks.filter((t) => !t.completed && t.priority === "High").length

  const summaryItems = [
    { icon: TrendingUp, label: "Completion Rate", value: `${completionRate}%`, color: "from-green-500 to-teal-500" },
    { icon: Target, label: "High Priority", value: highPriority, color: "from-red-500 to-pink-500" },
    { icon: Zap, label: "Streak", value: "5 days", color: "from-yellow-500 to-orange-500" },
  ]

  return (
    <div className="glass-lg border border-border/40 rounded-xl p-6 h-full backdrop-blur-xl animate-slideUp" style={{ animationDelay: "300ms" }}>
      <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Productivity
      </h3>
      <div className="space-y-4">
        {summaryItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              style={{ animationDelay: `${350 + index * 100}ms` }}
              className="flex items-center gap-4 p-4 rounded-lg glass-accent border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-102 hover:translate-x-1 active:scale-98 animate-slideIn"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-10 transition-transform duration-200`}
              >
                <Icon size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fadeIn">
                  {item.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
