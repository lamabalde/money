import Link from "next/link"
import { ArrowRight, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-7xl py-8">
          <PageHeader title="Tableau de bord" description="Vue d'ensemble de vos finances" />

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Solde Total</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">0,00 €</div>
                <p className="text-xs text-muted-foreground mt-1">Commencez par ajouter des transactions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenus</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">0,00 €</div>
                <p className="text-xs text-muted-foreground mt-1">Ce mois-ci</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Dépenses</CardTitle>
                <TrendingDown className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">0,00 €</div>
                <p className="text-xs text-muted-foreground mt-1">Ce mois-ci</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/transactions/add">
                  <Button className="w-full justify-between" size="lg">
                    Ajouter une transaction
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" className="w-full justify-between bg-transparent" size="lg">
                    Gérer les catégories
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/visualisation">
                  <Button variant="outline" className="w-full justify-between bg-transparent" size="lg">
                    Voir les statistiques
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Bienvenue sur MoneyWise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  MoneyWise est votre compagnon pour une gestion financière simplifiée. Suivez vos transactions,
                  catégorisez vos dépenses et revenus, et visualisez vos finances avec des graphiques clairs.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-success mt-1.5" />
                    <p className="text-sm text-muted-foreground">Gérez vos transactions facilement</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-success mt-1.5" />
                    <p className="text-sm text-muted-foreground">Organisez avec des catégories</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-success mt-1.5" />
                    <p className="text-sm text-muted-foreground">Exportez vos données en PDF ou Excel</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
