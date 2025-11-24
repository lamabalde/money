"use client"

import { useMemo, useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/lib/store"

export default function VisualisationPage() {
  const { transactions, categories } = useStore()
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [selectedMonth, setSelectedMonth] = useState("all")

  const years = useMemo(() => {
    const yearSet = new Set(transactions.map((t) => new Date(t.date).getFullYear().toString()))
    return Array.from(yearSet).sort().reverse()
  }, [transactions])

  const months = [
    { value: "all", label: "Toute l'année" },
    { value: "0", label: "Janvier" },
    { value: "1", label: "Février" },
    { value: "2", label: "Mars" },
    { value: "3", label: "Avril" },
    { value: "4", label: "Mai" },
    { value: "5", label: "Juin" },
    { value: "6", label: "Juillet" },
    { value: "7", label: "Août" },
    { value: "8", label: "Septembre" },
    { value: "9", label: "Octobre" },
    { value: "10", label: "Novembre" },
    { value: "11", label: "Décembre" },
  ]

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const date = new Date(t.date)
      const yearMatch = date.getFullYear().toString() === selectedYear
      const monthMatch = selectedMonth === "all" || date.getMonth().toString() === selectedMonth
      return yearMatch && monthMatch
    })
  }, [transactions, selectedYear, selectedMonth])

  const expensesByCategory = useMemo(() => {
    const categoryTotals: Record<string, number> = {}

    filteredTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
      })

    return Object.entries(categoryTotals)
      .map(([name, value]) => {
        const category = categories.find((c) => c.name === name)
        return {
          name,
          value,
          color: category?.color || "#ef4444",
        }
      })
      .sort((a, b) => b.value - a.value)
  }, [filteredTransactions, categories])

  const monthlyData = useMemo(() => {
    const monthlyTotals: Record<string, { month: string; income: number; expense: number }> = {}

    filteredTransactions.forEach((t) => {
      const date = new Date(t.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      const monthLabel = date.toLocaleDateString("fr-FR", {
        month: "short",
        year: "numeric",
      })

      if (!monthlyTotals[monthKey]) {
        monthlyTotals[monthKey] = { month: monthLabel, income: 0, expense: 0 }
      }

      if (t.type === "income") {
        monthlyTotals[monthKey].income += t.amount
      } else {
        monthlyTotals[monthKey].expense += t.amount
      }
    })

    return Object.values(monthlyTotals).sort((a, b) => {
      const [aYear, aMonth] = a.month.split(" ")
      const [bYear, bMonth] = b.month.split(" ")
      return aYear === bYear
        ? months.findIndex((m) => m.label.toLowerCase().startsWith(aMonth)) -
            months.findIndex((m) => m.label.toLowerCase().startsWith(bMonth))
        : Number.parseInt(aYear) - Number.parseInt(bYear)
    })
  }, [filteredTransactions])

  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
            }).format(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  const BarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}:{" "}
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-7xl py-8">
          <PageHeader title="Visualisation" description="Analysez vos finances avec des graphiques interactifs" />

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Période</span>
                </div>
                <div className="flex-1 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Année</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.length === 0 ? (
                          <SelectItem value="none" disabled>
                            Aucune donnée
                          </SelectItem>
                        ) : (
                          years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Mois</label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Revenus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(totalIncome)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Dépenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(totalExpenses)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Solde</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${balance >= 0 ? "text-success" : "text-destructive"}`}>
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(balance)}
                </div>
              </CardContent>
            </Card>
          </div>

          {filteredTransactions.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">Aucune donnée pour cette période</h3>
                <p className="text-sm text-muted-foreground">
                  Ajoutez des transactions ou changez la période sélectionnée
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Dépenses par catégorie</CardTitle>
                  <CardDescription>Répartition de vos dépenses par catégorie</CardDescription>
                </CardHeader>
                <CardContent>
                  {expensesByCategory.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      Aucune dépense pour cette période
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={expensesByCategory}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.name} (${((entry.value / totalExpenses) * 100).toFixed(0)}%)`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {expensesByCategory.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-2">
                        {expensesByCategory.map((category) => (
                          <div key={category.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: category.color }} />
                              <span className="text-sm text-foreground">{category.name}</span>
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {new Intl.NumberFormat("fr-FR", {
                                style: "currency",
                                currency: "EUR",
                              }).format(category.value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenus vs Dépenses</CardTitle>
                  <CardDescription>Évolution mensuelle de vos finances</CardDescription>
                </CardHeader>
                <CardContent>
                  {monthlyData.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      Aucune donnée mensuelle disponible
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} tickFormatter={(value) => `${value}€`} />
                        <Tooltip content={<BarTooltip />} />
                        <Legend />
                        <Bar dataKey="income" name="Revenus" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="expense" name="Dépenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
