"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Receipt, FolderOpen, FileDown, BarChart3, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Catégories", href: "/categories", icon: FolderOpen },
  { name: "Visualisation", href: "/visualisation", icon: BarChart3 },
  { name: "Export", href: "/export", icon: FileDown },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Wallet className="h-6 w-6 text-success" />
        <span className="text-xl font-semibold text-foreground">MoneyWise</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border p-4">
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm font-medium text-foreground">MoneyWise v1.0</p>
          <p className="text-xs text-muted-foreground mt-1">Gestion financière simplifiée</p>
        </div>
      </div>
    </div>
  )
}
