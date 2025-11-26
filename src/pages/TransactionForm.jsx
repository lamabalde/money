import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTransaction,
  updateTransaction,
  getTransactionById,
  getCategories,
} from "../utils/storage";

export default function TransactionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = !!id;
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().slice(0,10),
    description: "",
  });
  const [error, setError] = useState("");

  useEffect(()=>{
    setCategories(getCategories());
    if (editing) {
      const tx = getTransactionById(id);
      if (!tx) {
        setError("Transaction introuvable.");
        return;
      }
      setForm({
        amount: tx.amount,
        type: tx.type,
        category: tx.category,
        date: tx.date.slice(0,10),
        description: tx.description || "",
      });
    } else {
      const cats = getCategories();
      if (cats.length > 0) setForm((f)=>({ ...f, category: cats[0] }));
    }
  }, [editing, id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s)=>({ ...s, [name]: value }));
  }

  function validate() {
    if (!form.amount || isNaN(Number(form.amount))) return "Montant invalide";
    if (!form.category) return "Choisir une catégorie";
    if (!form.date) return "Choisir une date";
    return "";
  }

  function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    const payload = {
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      description: form.description,
    };
    if (editing) {
      updateTransaction(id, payload);
    } else {
      createTransaction(payload);
    }
    navigate("/transactions");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">{editing ? "Modifier" : "Nouvelle"} transaction</h2>
      </div>

      <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow space-y-3">
        {error && <div className="text-red-600">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="text-sm block mb-1">Montant (€)</label>
            <input name="amount" value={form.amount} onChange={handleChange} className="border rounded w-full px-2 py-1" />
          </div>
          <div>
            <label className="text-sm block mb-1">Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="border rounded w-full px-2 py-1">
              <option value="expense">Dépense</option>
              <option value="income">Revenu</option>
            </select>
          </div>
          <div>
            <label className="text-sm block mb-1">Catégorie</label>
            <select name="category" value={form.category} onChange={handleChange} className="border rounded w-full px-2 py-1">
              {categories.map((c)=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm block mb-1">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="border rounded w-full px-2 py-1" />
          </div>
        </div>

        <div>
          <label className="text-sm block mb-1">Description</label>
          <input name="description" value={form.description} onChange={handleChange} className="border rounded w-full px-2 py-1" />
        </div>

        <div className="flex gap-2 justify-end">
          <button type="button" onClick={()=>navigate("/transactions")} className="px-3 py-1 border rounded">Annuler</button>
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">{editing ? "Enregistrer" : "Ajouter"}</button>
        </div>
      </form>
    </div>
  );
}