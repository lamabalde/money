"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  date: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  type: "income" | "expense" | "both"
  color: string
  createdAt: string
}

interface StoreState {
  transactions: Transaction[]
  categories: Category[]
  addTransaction: (transaction: Omit<Transaction, "id" | "createdAt">) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  addCategory: (category: Omit<Category, "id" | "createdAt">) => void
  deleteCategory: (id: string) => void
  getTransactionById: (id: string) => Transaction | undefined
}

const defaultCategories: Omit<Category, "id" | "createdAt">[] = [
  { name: "Salaire", type: "income", color: "#10b981" },
  { name: "Freelance", type: "income", color: "#059669" },
  { name: "Alimentation", type: "expense", color: "#ef4444" },
  { name: "Transport", type: "expense", color: "#dc2626" },
  { name: "Logement", type: "expense", color: "#b91c1c" },
  { name: "Loisirs", type: "expense", color: "#991b1b" },
]

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      transactions: [],
      categories: defaultCategories.map((cat) => ({
        ...cat,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString(),
      })),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: Math.random().toString(36).substring(7),
              createdAt: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        })),
      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            {
              ...category,
              id: Math.random().toString(36).substring(7),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
      getTransactionById: (id) => {
        return get().transactions.find((t) => t.id === id)
      },
    }),
    {
      name: "moneywise-storage",
    },
  ),
)
