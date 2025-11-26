// very small localStorage helper for transactions and categories
const TX_KEY = "money_transactions_v1";
const CAT_KEY = "money_categories_v1";

function readJSON(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

function writeJSON(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getCategories() {
  let cats = readJSON(CAT_KEY);
  if (!cats) {
    cats = ["Salaire", "Courses", "Logement", "Loisirs", "Autre"];
    writeJSON(CAT_KEY, cats);
  }
  return cats;
}

export function saveCategories(categories) {
  writeJSON(CAT_KEY, categories);
}

export function getTransactions() {
  const tx = readJSON(TX_KEY);
  if (!tx) {
    writeJSON(TX_KEY, []);
    return [];
  }
  return tx;
}

export function saveTransactions(transactions) {
  writeJSON(TX_KEY, transactions);
}

export function createTransaction(data) {
  const tx = getTransactions();
  const newTx = { ...data, id: String(Date.now()) + "-" + Math.floor(Math.random() * 10000) };
  tx.unshift(newTx); // newest first
  saveTransactions(tx);
  return newTx;
}

export function updateTransaction(id, data) {
  const tx = getTransactions();
  const idx = tx.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tx[idx] = { ...tx[idx], ...data, id };
  saveTransactions(tx);
  return tx[idx];
}

export function deleteTransaction(id) {
  const tx = getTransactions().filter((t) => t.id !== id);
  saveTransactions(tx);
  return tx;
}

export function getTransactionById(id) {
  return getTransactions().find((t) => t.id === id) || null;
}