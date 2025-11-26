import React, { useEffect, useState } from "react";
import { getCategories, saveCategories } from "../utils/storage";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState("");

  useEffect(()=> {
    setCategories(getCategories());
  }, []);

  function addCategory(e) {
    e.preventDefault();
    const name = newCat.trim();
    if (!name) return;
    if (categories.includes(name)) {
      setNewCat("");
      return;
    }
    const next = [...categories, name];
    saveCategories(next);
    setCategories(next);
    setNewCat("");
  }

  function removeCategory(name) {
    const next = categories.filter(c=>c !== name);
    saveCategories(next);
    setCategories(next);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Catégories</h2>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <form onSubmit={addCategory} className="flex gap-2">
          <input value={newCat} onChange={(e)=>setNewCat(e.target.value)} placeholder="Nouvelle catégorie" className="border rounded px-2 py-1 flex-1" />
          <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">Ajouter</button>
        </form>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        {categories.length === 0 && <div className="text-gray-600">Aucune catégorie.</div>}
        {categories.map((c)=> (
          <div key={c} className="flex items-center justify-between">
            <div>{c}</div>
            <div>
              <button onClick={()=>removeCategory(c)} className="text-red-600 text-sm">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}