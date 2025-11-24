import { AppSidebar } from "@/components/app-sidebar"
import { PageHeader } from "@/components/page-header"
import { TransactionForm } from "@/components/transaction-form"

export default function AddTransactionPage() {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-3xl py-8">
          <PageHeader title="Nouvelle transaction" description="Ajoutez une nouvelle transaction à votre historique" />
          <TransactionForm mode="add" />
        </div>
      </main>
    </div>
  )
}
