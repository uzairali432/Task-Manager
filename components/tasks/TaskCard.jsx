"use client"

import { Trash2, Edit2, CheckCircle2, Circle } from "lucide-react"

export default function TaskCard({ task, onEdit, onComplete, onDelete }) {
  const isOverdue = new Date(task.deadline) < new Date() && !task.completed
  const priorityColors = {
    Low: "from-blue-400 to-cyan-400",
    Medium: "from-yellow-400 to-orange-400",
    High: "from-red-400 to-pink-400",
  }

  const categoryEmojis = {
    Work: "💼",
    Personal: "📝",
    Study: "📚",
    Health: "🏃",
    Shopping: "🛒",
  }

  return (
    <div
      className={`glass-lg border rounded-xl p-5 transition-all duration-300 backdrop-blur-xl cursor-pointer hover:scale-102 hover:-translate-y-1 active:scale-98 ${
        isOverdue ? "border-red-500/40" : "border-border/40 hover:border-primary/40"
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <button
          onClick={() => onComplete(task.id)}
          className="mt-0.5 flex-shrink-0 text-primary hover:text-secondary transition-all duration-200 hover:scale-110 active:scale-90"
        >
          {task.completed ? (
            <div className="animate-scaleIn">
              <CheckCircle2 size={24} />
            </div>
          ) : (
            <Circle size={24} className="text-muted-foreground hover:text-foreground" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-sm break-words transition-all duration-200 ${
              task.completed ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {task.title}
          </h3>
          {task.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${priorityColors[task.priority]} text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200`}>
          {task.priority}
        </span>
        {task.category && (
          <span className="text-xs px-3 py-1 rounded-full glass-accent border border-border/40 text-foreground font-medium hover:scale-105 transition-transform duration-200">
            {categoryEmojis[task.category] || "📌"} {task.category}
          </span>
        )}
        {isOverdue && (
          <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30 animate-pulse">
            Overdue
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/20">
        <span className="text-xs text-muted-foreground font-medium">
          {task.deadline
            ? new Date(task.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })
            : "No deadline"}
        </span>

        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-muted rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:scale-115 active:scale-90"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="p-2 hover:bg-red-500/10 rounded-lg transition-all duration-200 text-muted-foreground hover:text-red-500 hover:scale-115 active:scale-90"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
