"use client"

import { useState } from "react"

import { Search, Bell, User, Menu, X, Key } from "lucide-react"

export default function Navbar({ setCurrentPage, setIsOpen, isSidebarOpen }) {
  const apiKey = "your_api_key_here"; // Declare apiKey variable
  const [isApiSet, setIsApiSet] = useState(false); // Declare isApiSet state
  const [showApiModal, setShowApiModal] = useState(false); // Declare setShowApiModal state

  const handleSetApiKey = () => {
    // Handle setting the API key logic here
    console.log("API Key set:", apiKey)
    setShowApiModal(false)
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-all duration-300">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => setIsOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:scale-105 active:scale-95"
            title="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Search bar - hidden on small screens */}
          <div className="hidden sm:block flex-1 max-w-md transition-transform duration-200 hover:scale-102">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none text-sm transition-all duration-200 hover:bg-gray-100 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 ml-4">


          {/* Notifications */}
          <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 relative text-gray-600 hover:scale-105 active:scale-95">
            <Bell size={20} />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* Profile */}
          <button
            onClick={() => setCurrentPage("profile")}
            className="p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-600 hover:scale-105 active:scale-95"
          >
            <User size={20} />
          </button>
        </div>
      </nav>
    </>
  )
}
