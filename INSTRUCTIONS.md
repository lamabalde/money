# Instructions d'intégration — Pages Transactions & Catégories

1. Copier les fichiers fournis dans le dossier `src/` de ton projet Vite + React.
   - main.jsx, App.jsx, index.css
   - components/, pages/, utils/

2. Dépendances (si non déjà installées) :
   - react-router-dom
   - tailwindcss (si non déjà configuré)

Exemples d'install :
npm install react-router-dom
# tailwind si nécessaire (suivre la doc officielle pour config si pas déjà fait)
pm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

3. Configuration Tailwind (si tu n'en as pas) :
- Dans tailwind.config.js :
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}

- Dans src/index.css (fourni), les directives @tailwind sont déjà présentes.

4. Lancer le projet :
npm run dev

5. Routes disponibles :
- /transactions — liste, recherche, filtres
- /transactions/new — formulaire ajout
- /transactions/:id/edit — formulaire modification
- /categories — gestion catégories

6. Stockage :
Toutes les données sont stockées dans localStorage (clefs `money_transactions_v1` et `money_categories_v1`).

7. Remarques :
- Pas d'ID UUID externe : génération simple via Date.now()+random.
- Validation minimale dans le formulaire (montant numérique, catégorie, date).
- Tu peux adapter styles et UX selon tes besoins.