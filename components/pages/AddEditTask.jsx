"use client"

import { useState } from "react"
import { Save, X, Sparkles } from "lucide-react"

export default function AddEditTask({ editingTask, onAddTask, onUpdateTask, onCancel }) {
  const [formData, setFormData] = useState(
    editingTask || {
      title: "",
      description: "",
      category: "Work",
      priority: "Medium",
      deadline: "",
      completed: false,
    },
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingTask) {
      onUpdateTask({ ...editingTask, ...formData })
    } else {
      onAddTask(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto animate-slideUp">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="animate-slideDown">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h1>
            {!editingTask && <Sparkles size={28} className="text-secondary" />}
          </div>
          <p className="text-muted-foreground">Fill in the details below to manage your task</p>
        </div>

        {/* Form Container */}
        <div className="glass-lg border border-border/40 rounded-xl p-8 space-y-6 backdrop-blur-xl animate-slideUp" style={{ animationDelay: "100ms" }}>
          {/* Title */}
          <div className="animate-slideIn" style={{ animationDelay: "150ms" }}>
            <label className="block text-sm font-bold mb-3 text-foreground">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
              className="w-full px-4 py-3 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm transition-all backdrop-blur-xl"
            />
          </div>

          {/* Description */}
          <div className="animate-slideIn" style={{ animationDelay: "200ms" }}>
            <label className="block text-sm font-bold mb-3 text-foreground">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="4"
              className="w-full px-4 py-3 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm resize-none transition-all backdrop-blur-xl"
            />
          </div>

          {/* Grid: Category, Priority, Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="animate-slideIn" style={{ animationDelay: "250ms" }}>
              <label className="block text-sm font-bold mb-3 text-foreground">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm transition-all backdrop-blur-xl"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
                <option value="Health">Health</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div className="animate-slideIn" style={{ animationDelay: "300ms" }}>
              <label className="block text-sm font-bold mb-3 text-foreground">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm transition-all backdrop-blur-xl"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="animate-slideIn" style={{ animationDelay: "350ms" }}>
              <label className="block text-sm font-bold mb-3 text-foreground">Deadline</label>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm transition-all backdrop-blur-xl"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 animate-slideUp" style={{ animationDelay: "400ms" }}>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 hover:scale-102 active:scale-95"
            >
              <Save size={20} />
              {editingTask ? "Update Task" : "Create Task"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="flex-1 flex items-center justify-center gap-2 glass border border-border/40 text-foreground font-bold py-3 rounded-lg hover:bg-muted/30 transition-all duration-200 hover:scale-102 active:scale-95 backdrop-blur-xl"
            >
              <X size={20} />
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
