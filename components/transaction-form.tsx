"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore, type Transaction } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

interface TransactionFormProps {
  transaction?: Transaction
  mode: "add" | "edit"
}

export function TransactionForm({ transaction, mode }: TransactionFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { addTransaction, updateTransaction, categories } = useStore()

  const [formData, setFormData] = useState({
    type: transaction?.type || ("expense" as "income" | "expense"),
    amount: transaction?.amount?.toString() || "",
    description: transaction?.description || "",
    category: transaction?.category || "",
    date: transaction?.date || new Date().toISOString().split("T")[0],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const filteredCategories = categories.filter((cat) => cat.type === formData.type || cat.type === "both")

  useEffect(() => {
    if (formData.category && filteredCategories.length > 0) {
      const categoryExists = filteredCategories.some((cat) => cat.name === formData.category)
      if (!categoryExists) {
        setFormData((prev) => ({ ...prev, category: "" }))
      }
    }
  }, [formData.type, formData.category, filteredCategories])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Le montant doit être supérieur à 0"
    }
    if (!formData.description.trim()) {
      newErrors.description = "La description est requise"
    }
    if (!formData.category) {
      newErrors.category = "La catégorie est requise"
    }
    if (!formData.date) {
      newErrors.date = "La date est requise"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const transactionData = {
      type: formData.type,
      amount: Number.parseFloat(formData.amount),
      description: formData.description.trim(),
      category: formData.category,
      date: formData.date,
    }

    if (mode === "add") {
      addTransaction(transactionData)
      toast({
        title: "Transaction ajoutée",
        description: "La transaction a été ajoutée avec succès.",
      })
    } else if (transaction) {
      updateTransaction(transaction.id, transactionData)
      toast({
        title: "Transaction modifiée",
        description: "La transaction a été modifiée avec succès.",
      })
    }

    router.push("/transactions")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Informations de la transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type de transaction</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "income" | "expense") => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Revenu</SelectItem>
                <SelectItem value="expense">Dépense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">
              Montant (€)
              {errors.amount && <span className="text-destructive text-xs ml-2">{errors.amount}</span>}
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className={errors.amount ? "border-destructive" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description
              {errors.description && <span className="text-destructive text-xs ml-2">{errors.description}</span>}
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Ex: Course du mois, Salaire, etc."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={errors.description ? "border-destructive" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              Catégorie
              {errors.category && <span className="text-destructive text-xs ml-2">{errors.category}</span>}
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.length === 0 ? (
                  <div className="px-2 py-4 text-sm text-muted-foreground text-center">Aucune catégorie disponible</div>
                ) : (
                  filteredCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">
              Date
              {errors.date && <span className="text-destructive text-xs ml-2">{errors.date}</span>}
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={errors.date ? "border-destructive" : ""}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Link href="/transactions" className="flex-1">
          <Button type="button" variant="outline" className="w-full bg-transparent" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Annuler
          </Button>
        </Link>
        <Button type="submit" className="flex-1" size="lg">
          {mode === "add" ? "Ajouter" : "Modifier"}
        </Button>
      </div>
    </form>
  )
}
