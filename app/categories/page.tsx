"use client"

import { useState } from "react"
import { Plus, Trash2, Palette } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const PRESET_COLORS = [
  "#10b981",
  "#059669",
  "#047857",
  "#065f46",
  "#ef4444",
  "#dc2626",
  "#b91c1c",
  "#991b1b",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#f59e0b",
  "#d97706",
  "#b45309",
  "#92400e",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
]

export default function CategoriesPage() {
  const { categories, addCategory, deleteCategory } = useStore()
  const { toast } = useToast()

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    type: "expense" as "income" | "expense" | "both",
    color: "#ef4444",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    } else if (categories.some((cat) => cat.name.toLowerCase() === formData.name.trim().toLowerCase())) {
      newErrors.name = "Cette catégorie existe déjà"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddCategory = () => {
    if (!validateForm()) return

    addCategory({
      name: formData.name.trim(),
      type: formData.type,
      color: formData.color,
    })

    toast({
      title: "Catégorie ajoutée",
      description: `La catégorie "${formData.name}" a été ajoutée avec succès.`,
    })

    setFormData({ name: "", type: "expense", color: "#ef4444" })
    setAddDialogOpen(false)
    setErrors({})
  }

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      const category = categories.find((c) => c.id === categoryToDelete)
      deleteCategory(categoryToDelete)

      toast({
        title: "Catégorie supprimée",
        description: `La catégorie "${category?.name}" a été supprimée.`,
      })

      setDeleteDialogOpen(false)
      setCategoryToDelete(null)
    }
  }

  const incomeCategories = categories.filter((cat) => cat.type === "income" || cat.type === "both")
  const expenseCategories = categories.filter((cat) => cat.type === "expense" || cat.type === "both")

  const CategoryCard = ({ category }: { category: any }) => (
    <Card className="relative group">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: category.color + "20" }}
            >
              <Palette className="h-5 w-5" style={{ color: category.color }} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{category.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">
                {category.type === "both" ? "Revenu & Dépense" : category.type === "income" ? "Revenu" : "Dépense"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteClick(category.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-5xl py-8">
          <PageHeader title="Catégories" description="Organisez vos transactions avec des catégories personnalisées">
            <Button onClick={() => setAddDialogOpen(true)} size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle catégorie
            </Button>
          </PageHeader>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                Revenus ({incomeCategories.length})
              </h2>
              <div className="space-y-3">
                {incomeCategories.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">Aucune catégorie de revenu</p>
                    </CardContent>
                  </Card>
                ) : (
                  incomeCategories.map((category) => <CategoryCard key={category.id} category={category} />)
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-destructive" />
                Dépenses ({expenseCategories.length})
              </h2>
              <div className="space-y-3">
                {expenseCategories.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">Aucune catégorie de dépense</p>
                    </CardContent>
                  </Card>
                ) : (
                  expenseCategories.map((category) => <CategoryCard key={category.id} category={category} />)
                )}
              </div>
            </div>
          </div>

          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter une catégorie</DialogTitle>
                <DialogDescription>Créez une nouvelle catégorie pour organiser vos transactions.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nom de la catégorie
                    {errors.name && <span className="text-destructive text-xs ml-2">{errors.name}</span>}
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: Restaurant, Transport..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? "border-destructive" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Revenu</SelectItem>
                      <SelectItem value="expense">Dépense</SelectItem>
                      <SelectItem value="both">Les deux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Couleur</Label>
                  <div className="grid grid-cols-8 gap-2">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={cn(
                          "h-8 w-8 rounded-md transition-all hover:scale-110",
                          formData.color === color && "ring-2 ring-offset-2 ring-foreground",
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddCategory}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer cette catégorie ? Les transactions associées ne seront pas
                  supprimées.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleDeleteConfirm}>
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
