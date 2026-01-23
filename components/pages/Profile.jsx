"use client"

import { User, Save, Lock, Bell } from "lucide-react"
import { useState } from "react"

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    location: "San Francisco, CA",
    bio: "Productivity enthusiast and task management expert",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="animate-slideDown">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="glass-lg border border-border/40 rounded-xl p-8 backdrop-blur-xl animate-slideUp" style={{ animationDelay: "100ms" }}>
        {/* Avatar */}
        <div className="flex justify-center mb-8 animate-scaleIn" style={{ animationDelay: "200ms" }}>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform duration-200 cursor-pointer">
            <User size={50} className="text-white" />
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-slideIn" style={{ animationDelay: "250ms" }}>
              <label className="block text-sm font-bold mb-3 text-foreground">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-4 py-3 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm transition-all backdrop-blur-xl"
              />
            </div>

            <div className="animate-slideIn" style={{ animationDelay: "300ms" }}>
              <label className="block text-sm font-bold mb-3 text-foreground">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-3 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm transition-all backdrop-blur-xl"
              />
            </div>

            <div className="animate-slideIn" style={{ animationDelay: "350ms" }}>
              <label className="block text-sm font-bold mb-3 text-foreground">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm transition-all backdrop-blur-xl"
              />
            </div>

            <div className="animate-slideIn" style={{ animationDelay: "400ms" }}>
              <label className="block text-sm font-bold mb-3 text-foreground">Location</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="w-full px-4 py-3 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm transition-all backdrop-blur-xl"
              />
            </div>
          </div>

          <div className="animate-slideIn" style={{ animationDelay: "450ms" }}>
            <label className="block text-sm font-bold mb-3 text-foreground">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 glass border border-border/40 rounded-lg focus:border-primary focus:outline-none text-sm resize-none transition-all backdrop-blur-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 hover:scale-102 active:scale-95 animate-slideUp"
            style={{ animationDelay: "500ms" }}
          >
            <Save size={20} />
            Save Changes
          </button>
        </form>

        {/* Settings */}
        <div className="mt-8 pt-8 border-t border-border/20 animate-slideUp" style={{ animationDelay: "550ms" }}>
          <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Preferences
          </h3>
          <div className="space-y-4">
            {[
              { icon: Bell, label: "Email notifications for tasks" },
              { icon: Bell, label: "Daily productivity summary" },
              { icon: Lock, label: "Show completed tasks" },
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:glass-accent transition-all duration-200 hover:translate-x-1 animate-slideIn"
                  style={{ animationDelay: `${560 + index * 50}ms` }}
                >
                  <input
                    type="checkbox"
                    defaultChecked={index < 2}
                    className="w-5 h-5 rounded border-2 border-primary/30 accent-primary cursor-pointer transition-all duration-200 hover:scale-110"
                  />
                  <IconComponent size={18} className="text-muted-foreground" />
                  <span className="text-sm font-medium">{item.label}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
