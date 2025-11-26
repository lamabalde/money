import React from "react";

export default function ConfirmModal({ open, title = "Confirmer", message, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 rounded border">Annuler</button>
          <button onClick={onConfirm} className="px-3 py-1 rounded bg-red-600 text-white">Supprimer</button>
        </div>
      </div>
    </div>
  );
}