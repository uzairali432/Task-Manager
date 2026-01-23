"use client"
import { X, LayoutDashboard, ListTodo, Plus, Zap, Settings, CheckCircle2, ChevronRight } from "lucide-react"

export default function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "all-tasks", label: "All Tasks", icon: ListTodo },
    { id: "add-edit", label: "Add Task", icon: Plus },
    { id: "ai-assistant", label: "AI Assistant", icon: Zap },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-30 animate-fadeIn"
        />
      )}

      <aside
        className={`fixed md:relative w-64 lg:w-80 h-screen bg-white border-r border-gray-200 p-4 md:p-6 overflow-y-auto z-40 md:z-0 md:translate-x-0 md:block shadow-lg md:shadow-none transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Logo */}
        <div className="mb-8 md:mb-10 mt-8 md:mt-0">
          <div className="flex items-center gap-3 mb-2 animate-slideDown">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
              <CheckCircle2 size={24} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          <p className="text-xs text-gray-500 ml-13 md:ml-15">AI-Powered Task Manager</p>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2 mb-8">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setIsOpen(false)
                }}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group animate-slideIn ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:scale-102 active:scale-98"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {isActive && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />}
              </button>
            )
          })}
        </nav>

        {/* Stats Footer */}
        <div className="mt-auto pt-6 border-t border-gray-200 animate-slideUp">
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tasks Today</span>
              <span className="font-bold text-blue-600">5</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Completed</span>
              <span className="font-bold text-green-600">3</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 animate-fillProgress"
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
