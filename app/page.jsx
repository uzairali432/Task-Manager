"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout/Layout"
import Dashboard from "@/components/pages/Dashboard"
import AllTasks from "@/components/pages/AllTasks"
import AddEditTask from "@/components/pages/AddEditTask"
import AIAssistant from "@/components/pages/AIAssistant"
import Profile from "@/components/pages/Profile"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, task])
    setCurrentPage("dashboard")
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    setEditingTask(null)
    setCurrentPage("dashboard")
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setCurrentPage("add-edit")
  }

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)))
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage === "dashboard" && (
        <Dashboard
          tasks={tasks}
          onEditTask={handleEditTask}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
      {currentPage === "all-tasks" && (
        <AllTasks
          tasks={tasks}
          onEditTask={handleEditTask}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
      {currentPage === "add-edit" && (
        <AddEditTask
          editingTask={editingTask}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onCancel={() => {
            setEditingTask(null)
            setCurrentPage("dashboard")
          }}
        />
      )}
      {currentPage === "ai-assistant" && <AIAssistant tasks={tasks} />}
      {currentPage === "profile" && <Profile />}
    </Layout>
  )
}
