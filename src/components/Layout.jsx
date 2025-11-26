import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Money — Gestion</h1>
          <nav className="space-x-3">
            <Link to="/transactions" className="text-gray-700 hover:text-gray-900">Transactions</Link>
            <Link to="/categories" className="text-gray-700 hover:text-gray-900">Catégories</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}