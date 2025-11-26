import { Link } from "react-router-dom";
import transactionService from "../../services/transactionService";

export default function TransactionRow({ transaction, reload }) {
  const handleDelete = async () => {
    if (confirm("Voulez-vous supprimer cette transaction ?")) {
      await transactionService.remove(transaction.id);
      reload();
    }
  };

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            transaction.type === "income"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {transaction.type === "income" ? "Revenu" : "Dépense"}
        </span>
      </td>

      <td className="p-3 font-medium">{transaction.amount} CFA</td>
      <td className="p-3">{transaction.category}</td>
      <td className="p-3">{transaction.description}</td>
      <td className="p-3">{transaction.date}</td>

      <td className="p-3 flex gap-3">
        <Link
          to={`/transactions/${transaction.id}/edit`}
          className="text-blue-500 hover:underline"
        >
          Modifier
        </Link>

        <button
          className="text-red-500 hover:underline"
          onClick={handleDelete}
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
}
