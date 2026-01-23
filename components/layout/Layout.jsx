"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

export default function Layout({ children, currentPage, setCurrentPage }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar setCurrentPage={setCurrentPage} setIsOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
