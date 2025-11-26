export default function Filters({
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  search,
  setSearch,
  categories,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-xl flex flex-wrap gap-4">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="">Tous les types</option>
        <option value="income">Revenus</option>
        <option value="expense">Dépenses</option>
      </select>

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="">Toutes les catégories</option>
        {categories?.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Rechercher…"
        className="border p-2 rounded-lg flex-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
