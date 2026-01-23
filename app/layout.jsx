import "./globals.css"

export const metadata = {
  title: "TaskFlow - AI-Powered Task Manager",
  description: "Manage your tasks efficiently with AI assistance",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}
