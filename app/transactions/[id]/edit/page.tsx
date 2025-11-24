"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { PageHeader } from "@/components/page-header"
import { TransactionForm } from "@/components/transaction-form"
import { useStore } from "@/lib/store"

export default function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { getTransactionById } = useStore()
  const transaction = getTransactionById(id)

  if (!transaction) {
    notFound()
  }

  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-3xl py-8">
          <PageHeader title="Modifier la transaction" description="Modifiez les informations de cette transaction" />
          <TransactionForm mode="edit" transaction={transaction} />
        </div>
      </main>
    </div>
  )
}
