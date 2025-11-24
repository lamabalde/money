import type { Transaction, Category } from "./store"

export async function exportToPDF(transactions: Transaction[], categories: Category[]) {
  // Create PDF content
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  // Create HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>MoneyWise - Export des transactions</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 40px;
          color: #1f2937;
        }
        .header {
          margin-bottom: 40px;
          border-bottom: 3px solid #10b981;
          padding-bottom: 20px;
        }
        .header h1 {
          font-size: 32px;
          color: #10b981;
          margin-bottom: 8px;
        }
        .header .date {
          color: #6b7280;
          font-size: 14px;
        }
        .summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        .summary-card {
          padding: 20px;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
        }
        .summary-card .label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .summary-card .value {
          font-size: 28px;
          font-weight: bold;
        }
        .summary-card.income .value { color: #10b981; }
        .summary-card.expense .value { color: #ef4444; }
        .summary-card.balance .value { color: #1f2937; }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        thead {
          background-color: #f3f4f6;
        }
        th {
          padding: 12px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          border-bottom: 2px solid #d1d5db;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        tr:last-child td {
          border-bottom: none;
        }
        .category-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
        .amount-income { color: #10b981; font-weight: 600; }
        .amount-expense { color: #ef4444; font-weight: 600; }
        .footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #9ca3af;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>MoneyWise</h1>
        <div class="date">Export généré le ${new Date().toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}</div>
      </div>

      <div class="summary">
        <div class="summary-card income">
          <div class="label">Revenus totaux</div>
          <div class="value">+${totalIncome.toFixed(2)} €</div>
        </div>
        <div class="summary-card expense">
          <div class="label">Dépenses totales</div>
          <div class="value">-${totalExpenses.toFixed(2)} €</div>
        </div>
        <div class="summary-card balance">
          <div class="label">Solde</div>
          <div class="value">${balance.toFixed(2)} €</div>
        </div>
      </div>

      <h2 style="margin-bottom: 20px; font-size: 20px;">Transactions (${transactions.length})</h2>
      
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th style="text-align: right;">Montant</th>
          </tr>
        </thead>
        <tbody>
          ${sortedTransactions
            .map((transaction) => {
              const category = categories.find((c) => c.name === transaction.category)
              const formattedAmount = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(transaction.amount)

              return `
                <tr>
                  <td>${new Date(transaction.date).toLocaleDateString("fr-FR")}</td>
                  <td>${transaction.description}</td>
                  <td>
                    <span class="category-badge" style="background-color: ${category?.color}20; color: ${category?.color};">
                      ${transaction.category}
                    </span>
                  </td>
                  <td style="text-align: right;" class="amount-${transaction.type}">
                    ${transaction.type === "income" ? "+" : "-"}${formattedAmount}
                  </td>
                </tr>
              `
            })
            .join("")}
        </tbody>
      </table>

      <div class="footer">
        MoneyWise - Gestion financière simplifiée
      </div>
    </body>
    </html>
  `

  // Create a blob and download
  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `moneywise-transactions-${new Date().toISOString().split("T")[0]}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function exportToExcel(transactions: Transaction[], categories: Category[]) {
  // Create CSV content
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const headers = ["Date", "Type", "Description", "Catégorie", "Montant (€)"]
  const rows = sortedTransactions.map((transaction) => [
    new Date(transaction.date).toLocaleDateString("fr-FR"),
    transaction.type === "income" ? "Revenu" : "Dépense",
    transaction.description,
    transaction.category,
    transaction.type === "income" ? transaction.amount : -transaction.amount,
  ])

  // Add summary at the end
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  rows.push([])
  rows.push(["RÉSUMÉ", "", "", "", ""])
  rows.push(["Total Revenus", "", "", "", totalIncome])
  rows.push(["Total Dépenses", "", "", "", -totalExpenses])
  rows.push(["Solde", "", "", "", balance])

  // Create CSV content
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell?.toString().replace(/"/g, '""') || ""}"`).join(",")),
  ].join("\n")

  // Add BOM for Excel UTF-8 support
  const blob = new Blob(["\ufeff" + csvContent], {
    type: "text/csv;charset=utf-8;",
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `moneywise-transactions-${new Date().toISOString().split("T")[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
