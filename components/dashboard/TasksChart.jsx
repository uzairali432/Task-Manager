"use client"

import { useMemo } from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function TasksChart({ tasks }) {
  const chartData = useMemo(() => {
    const categories = ["Work", "Personal", "Study", "Health", "Shopping"]
    return categories.map((cat) => ({
      name: cat,
      total: tasks.filter((t) => t.category === cat).length,
      completed: tasks.filter((t) => t.category === cat && t.completed).length,
      pending: tasks.filter((t) => t.category === cat && !t.completed).length,
    }))
  }, [tasks])

  const priorityData = useMemo(() => {
    return [
      { name: "High", value: tasks.filter((t) => t.priority === "High").length },
      { name: "Medium", value: tasks.filter((t) => t.priority === "Medium").length },
      { name: "Low", value: tasks.filter((t) => t.priority === "Low").length },
    ]
  }, [tasks])

  const COLORS = {
    high: "oklch(0.62 0.25 27)",
    medium: "oklch(0.68 0.26 48)",
    low: "oklch(0.68 0.22 183)",
    completed: "oklch(0.65 0.24 276)",
    pending: "oklch(0.68 0.26 48)",
  }

  const PRIORITY_COLORS = [COLORS.high, COLORS.medium, COLORS.low]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Bar Chart */}
      <div className="glass-lg border border-border/40 rounded-xl p-6 backdrop-blur-xl animate-slideUp" style={{ animationDelay: "100ms" }}>
        <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Tasks by Category
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.24 276)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="oklch(0.65 0.24 276)" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.68 0.26 48)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="oklch(0.68 0.26 48)" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                background: "rgba(18, 18, 25, 0.9)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                backdropFilter: "blur(10px)",
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value) => [value, ""]}
            />
            <Legend />
            <Bar dataKey="completed" fill="url(#colorCompleted)" radius={[8, 8, 0, 0]} name="Completed" />
            <Bar dataKey="pending" fill="url(#colorPending)" radius={[8, 8, 0, 0]} name="Pending" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Priority Distribution */}
      <div className="glass-lg border border-border/40 rounded-xl p-6 backdrop-blur-xl animate-slideUp" style={{ animationDelay: "200ms" }}>
        <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Priority Distribution
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(18, 18, 25, 0.9)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
