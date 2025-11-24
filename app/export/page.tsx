"use client"

import { useState } from "react"
import { FileDown, FileSpreadsheet, FileText, Download } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { exportToPDF, exportToExcel } from "@/lib/export-utils"

export default function ExportPage() {
  const { transactions, categories } = useStore()
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = async () => {
    if (transactions.length === 0) {
      toast({
        title: "Aucune transaction",
        description: "Ajoutez des transactions avant d'exporter.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)
    try {
      await exportToPDF(transactions, categories)
      toast({
        title: "Export PDF réussi",
        description: "Votre fichier PDF a été téléchargé avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export PDF.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportExcel = async () => {
    if (transactions.length === 0) {
      toast({
        title: "Aucune transaction",
        description: "Ajoutez des transactions avant d'exporter.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)
    try {
      await exportToExcel(transactions, categories)
      toast({
        title: "Export Excel réussi",
        description: "Votre fichier Excel a été téléchargé avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export Excel.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-5xl py-8">
          <PageHeader title="Export" description="Exportez vos données financières en PDF ou Excel" />

          <div className="grid gap-6 mb-8 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{transactions.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenus totaux</CardTitle>
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
                <CardTitle className="text-sm font-medium text-muted-foreground">Dépenses totales</CardTitle>
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
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                    <FileText className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <CardTitle>Exporter en PDF</CardTitle>
                    <CardDescription className="mt-1">Format idéal pour l'impression et l'archivage</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    Document formaté et lisible
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    Résumé financier inclus
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    Tableau des transactions détaillé
                  </li>
                </ul>
                <Button
                  onClick={handleExportPDF}
                  disabled={isExporting || transactions.length === 0}
                  className="w-full"
                  size="lg"
                >
                  {isExporting ? (
                    <>Exportation en cours...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger PDF
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                    <FileSpreadsheet className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <CardTitle>Exporter en Excel</CardTitle>
                    <CardDescription className="mt-1">Format idéal pour l'analyse et les calculs</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    Compatible avec Excel et Google Sheets
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    Données modifiables et analysables
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    Toutes vos transactions exportées
                  </li>
                </ul>
                <Button
                  onClick={handleExportExcel}
                  disabled={isExporting || transactions.length === 0}
                  className="w-full bg-transparent"
                  size="lg"
                  variant="outline"
                >
                  {isExporting ? (
                    <>Exportation en cours...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger Excel
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {transactions.length === 0 && (
            <Card className="mt-6">
              <CardContent className="py-8 text-center">
                <FileDown className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Aucune donnée à exporter</h3>
                <p className="text-sm text-muted-foreground">
                  Ajoutez des transactions pour pouvoir les exporter en PDF ou Excel
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
