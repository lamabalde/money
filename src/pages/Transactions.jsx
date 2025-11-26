import { useEffect, useState } from "react";
import TransactionRow from "../Components/transactions/TransactionRow";
import Filters from "../Components/transactions/Filters";

// import Loader from "../components/Loader";
// import transactionService from "../services/transactionService";
// import categoryService from "../services/categoryService";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  // filters
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [search, setSearch] = useState("");

  // fetch data
  const loadData = async () => {
    setLoading(true);
    try {
      const [tData, cData] = await Promise.all([
        transactionService.getAll(),
        categoryService.getAll(),
      ]);
      setTransactions(tData);
      setCategories(cData);
    } catch (err) {
      console.error("Erreur:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // filtering logic
  const filtered = transactions.filter((t) => {
    return (
      (filterType ? t.type === filterType : true) &&
      (filterCategory ? t.category === filterCategory : true) &&
      (search ? t.description.toLowerCase().includes(search.toLowerCase()) : true)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Transactions</h1>

      <Filters
        filterType={filterType}
        setFilterType={setFilterType}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        search={search}
        setSearch={setSearch}
        categories={categories}
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow mt-5">
        {loading ? (
          <Loader />
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Montant</th>
                <th className="p-3 text-left">Catégorie</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    Aucune transaction trouvée.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <TransactionRow key={t.id} transaction={t} reload={loadData} />
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
