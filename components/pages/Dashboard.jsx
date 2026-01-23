"use client"

import { useMemo } from "react"
import { motion } from "framer-motion" // Import motion from framer-motion
import StatsCard from "@/components/dashboard/StatsCard"
import TasksChart from "@/components/dashboard/TasksChart"
import RecentTasks from "@/components/dashboard/RecentTasks"
import ProductivitySummary from "@/components/dashboard/ProductivitySummary"

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
} // Declare the item variable

export default function Dashboard({ tasks, onEditTask, onCompleteTask, onDeleteTask }) {
  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length
    const pending = tasks.filter((t) => !t.completed).length
    const overdue = tasks.filter((t) => !t.completed && new Date(t.deadline) < new Date()).length
    const highPriority = tasks.filter((t) => !t.completed && t.priority === "High").length

    return { total: tasks.length, completed, pending, overdue, highPriority }
  }, [tasks])

  return (
    <motion.div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <motion.div className="animate-slideDown">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-muted-foreground">Here's your task overview for today</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slideUp" style={{ animationDelay: "100ms" }}>
        <motion.div className="lg:col-span-2">
          <StatsCard title="Total Tasks" value={stats.total} icon="📊" color="from-primary to-purple-600" />
        </motion.div>
        <motion.div>
          <StatsCard title="Completed" value={stats.completed} icon="✅" color="from-green-500 to-teal-600" />
        </motion.div>
        <motion.div>
          <StatsCard title="Pending" value={stats.pending} icon="⏳" color="from-yellow-500 to-orange-600" />
        </motion.div>
        <motion.div>
          <StatsCard title="Overdue" value={stats.overdue} icon="🚨" color="from-red-500 to-pink-600" />
        </motion.div>
      </motion.div>

      {/* Charts and Summary */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slideUp" style={{ animationDelay: "150ms" }}>
        <motion.div className="lg:col-span-2">
          <TasksChart tasks={tasks} />
        </motion.div>
        <motion.div>
          <ProductivitySummary tasks={tasks} />
        </motion.div>
      </motion.div>

      {/* Recent Tasks */}
      <motion.div className="animate-slideUp" style={{ animationDelay: "200ms" }}>
        <RecentTasks
          tasks={tasks.slice(-5)}
          onEditTask={onEditTask}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
        />
      </motion.div>
    </motion.div>
  )
}
