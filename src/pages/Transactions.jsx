import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getTransactions,
  deleteTransaction,
  getCategories,
} from "../utils/storage";
import ConfirmModal from "../components/ConfirmModal";

export default function Transactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    setTransactions(getTransactions());
    setCategories(getCategories());
  }, []);

  function applyFilters() {
    return transactions.filter((t) => {
      if (query && !(`${t.description || ""} ${t.category || ""}`.toLowerCase().includes(query.toLowerCase()))) return false;
      if (catFilter !== "all" && t.category !== catFilter) return false;
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      return true;
    }).sort((a,b)=> new Date(b.date) - new Date(a.date));
  }

  function handleDeleteConfirm() {
    deleteTransaction(deleteId);
    setTransactions(getTransactions());
    setDeleteId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <div className="flex gap-2">
          <Link to="/transactions/new" className="bg-blue-600 text-white px-3 py-1 rounded">+ Nouvelle</Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher description/catégorie..."
            className="border rounded px-2 py-1"
          />
          <select value={catFilter} onChange={(e)=>setCatFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="all">Toutes catégories</option>
            {categories.map((c)=> <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={typeFilter} onChange={(e)=>setTypeFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="all">Tous types</option>
            <option value="income">Revenu</option>
            <option value="expense">Dépense</option>
          </select>
          <div className="flex items-center">
            <button onClick={()=>{ setQuery(""); setCatFilter("all"); setTypeFilter("all"); }} className="text-sm text-gray-600">Réinitialiser</button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {applyFilters().length === 0 && (
          <div className="bg-white p-4 rounded shadow text-gray-600">Aucune transaction trouvée.</div>
        )}

        {applyFilters().map((t) => (
          <div key={t.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-4">
                <div className={`text-lg font-semibold ${t.type === "income" ? "text-green-700" : "text-red-600"}`}>  
                  {(t.type === "expense" ? "-" : "+")}{Math.abs(Number(t.amount)).toFixed(2)} €
                </div>
                <div className="text-sm text-gray-600">{t.category}</div>
                <div className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</div>
              </div>
              {t.description && <div className="text-sm text-gray-700 mt-1">{t.description}</div>}
            </div>

            <div className="flex gap-2">
              <button onClick={()=>navigate(`/transactions/${t.id}/edit`)} className="px-2 py-1 border rounded text-sm">Modifier</button>
              <button onClick={()=>setDeleteId(t.id)} className="px-2 py-1 border rounded text-sm text-red-600">Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="Supprimer la transaction"
        message="Voulez-vous vraiment supprimer cette transaction ? Cette action est irréversible."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}