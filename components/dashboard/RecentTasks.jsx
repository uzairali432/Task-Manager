"use client"

import TaskCard from "@/components/tasks/TaskCard"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"

export default function RecentTasks({ tasks, onEditTask, onCompleteTask, onDeleteTask }) {
  return (
    <motion.div className="space-y-4 animate-slideUp" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Recent Tasks
        </h2>
        {tasks.length > 0 && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
            {tasks.length} tasks
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task.id}
              style={{ animationDelay: `${400 + index * 80}ms` }}
              className="animate-slideUp"
            >
              <TaskCard task={task} onEdit={onEditTask} onComplete={onCompleteTask} onDelete={onDeleteTask} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 rounded-xl glass-lg border border-border/40 animate-fadeIn" style={{ animationDelay: "400ms" }}>
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="text-4xl animate-bounce">
                  <Plus size={40} className="text-primary" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm font-medium">No tasks yet</p>
              <p className="text-xs text-muted-foreground">Create your first task to get started!</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
