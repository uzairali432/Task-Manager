"use client"

export default function StatsCard({ title, value, icon, color }) {
  return (
    <div className="glass-lg border border-border/40 rounded-xl p-6 relative overflow-hidden group cursor-pointer backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-98">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-15 transition-all duration-300`}
      ></div>

      {/* Border glow on hover */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wide">{title}</h3>
          <span className="text-3xl animate-scaleIn">{icon}</span>
        </div>
        <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fadeIn">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-2 font-medium">Updated now</p>
      </div>
    </div>
  )
}
