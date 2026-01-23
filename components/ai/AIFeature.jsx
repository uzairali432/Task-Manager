"use client"

export default function AIFeature({ feature, index = 0 }) {
  const Icon = feature.icon

  return (
    <button
      onClick={feature.action}
      style={{ animationDelay: `${100 + index * 80}ms` }}
      className="glass-lg border border-border/40 rounded-xl p-6 text-left hover:border-primary/50 transition-all duration-300 group w-full backdrop-blur-xl animate-slideUp hover:scale-102 hover:-translate-y-1 active:scale-98"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-200 hover:scale-115 hover:rotate-10">
          <Icon size={26} className="text-white" />
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors duration-200">{feature.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </button>
  )
}
