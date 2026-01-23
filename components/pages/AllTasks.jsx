"use client"

import { useState, useMemo } from "react"
import { Search, Filter } from "lucide-react"
import TaskCard from "@/components/tasks/TaskCard"

export default function AllTasks({ tasks, onEditTask, onCompleteTask, onDeleteTask }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState("All")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")

  const categories = ["All", ...new Set(tasks.map((t) => t.category).filter(Boolean))]
  const priorities = ["All", "Low", "Medium", "High"]
  const statuses = ["All", "Completed", "Pending", "Overdue"]

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPriority = filterPriority === "All" || task.priority === filterPriority
      const matchesCategory = filterCategory === "All" || task.category === filterCategory

      let matchesStatus = true
      if (filterStatus !== "All") {
        if (filterStatus === "Completed") matchesStatus = task.completed
        if (filterStatus === "Pending") matchesStatus = !task.completed && new Date(task.deadline) >= new Date()
        if (filterStatus === "Overdue") matchesStatus = !task.completed && new Date(task.deadline) < new Date()
      }

      return matchesSearch && matchesPriority && matchesCategory && matchesStatus
    })
  }, [tasks, searchQuery, filterPriority, filterCategory, filterStatus])

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          All Tasks
        </h1>
        <p className="text-muted-foreground">Manage and track all your tasks</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 animate-slideUp" style={{ animationDelay: "100ms" }}>
        {/* Search Bar */}
        <div className="relative transition-transform duration-200 hover:scale-102">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 glass-lg border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm transition-all backdrop-blur-xl"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 mb-2">
          <Filter size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filters:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-3 glass-lg border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm backdrop-blur-xl transition-all duration-200 hover:scale-102"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p} Priority
              </option>
            ))}
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 glass-lg border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm backdrop-blur-xl transition-all duration-200 hover:scale-102"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 glass-lg border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm backdrop-blur-xl transition-all duration-200 hover:scale-102"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slideUp" style={{ animationDelay: "150ms" }}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div
              key={task.id}
              style={{ animationDelay: `${150 + index * 50}ms` }}
              className="animate-slideUp"
            >
              <TaskCard task={task} onEdit={onEditTask} onComplete={onCompleteTask} onDelete={onDeleteTask} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 rounded-xl glass-lg border border-border/40 animate-fadeIn" style={{ animationDelay: "150ms" }}>
            <div className="space-y-3">
              <p className="text-muted-foreground text-lg font-medium">No tasks found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your filters or create a new task</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
