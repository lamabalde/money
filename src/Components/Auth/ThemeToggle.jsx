import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialiser l'état directement depuis localStorage
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    // Synchroniser le DOM avec l'état
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]); // Dépendance sur darkMode

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center h-10 w-10 rounded-full bg-neutral-light/60 dark:bg-neutral-dark/40 text-text-muted-light dark:text-text-muted-dark transition-colors duration-300 hover:bg-neutral-light dark:hover:bg-neutral-dark"
      aria-label="Basculer le thème"
    >
      {darkMode ? (
        <span className="material-symbols-outlined text-lg">light_mode</span>
      ) : (
        <span className="material-symbols-outlined text-lg">dark_mode</span>
      )}
    </button>
  );
};

export default ThemeToggle;