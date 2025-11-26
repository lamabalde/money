import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../Components/Auth/AuthLayout';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    if (error) setError('');
  };

  // Simulation d'appel API vers le back-end
  const authenticateUser = async (email, password) => {
    // REMPLACER CETTE FONCTION PAR L'APPEL RÉEL À VOTRE BACK-END
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulation de validation
        const validUsers = [
          { email: 'user@example.com', password: 'password123', firstName: 'Jean', lastName: 'Dupont' },
          { email: 'admin@moneywise.com', password: 'admin123', firstName: 'Marie', lastName: 'Martin' }
        ];

        const user = validUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          resolve({
            id: 1,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.firstName.charAt(0) + user.lastName.charAt(0)
          });
        } else {
          reject(new Error('Email ou mot de passe incorrect'));
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation côté client
      if (!formData.email || !formData.password) {
        throw new Error('Veuillez remplir tous les champs');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Format d\'email invalide');
      }

      // Appel au back-end (simulé pour l'instant)
      const userData = await authenticateUser(formData.email, formData.password);
      
      // Connexion réussie
      console.log('Connexion réussie:', userData);
      onLogin(userData);
      
    } catch (err) {
      setError(err.message || 'Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-title">
        <h1>Content de vous revoir</h1>
        <p className="auth-subtitle">Connectez-vous à votre compte</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {error && (
          <div className="auth-error">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            disabled={loading}
            required
          />
          <div className="forgot-password">
            <Link to="/forgot-password">Mot de passe oublié?</Link>
          </div>
        </div>

        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="button-spinner"></div>
              Connexion en cours...
            </>
          ) : (
            'Se connecter'
          )}
        </button>

        <div className="auth-link">
          <p>Pas encore de compte? <Link to="/register">Créer un compte</Link></p>
        </div>

        {/* Comptes de test pour la démo */}
        <div className="demo-accounts">
          <details>
            <summary>Comptes de démonstration</summary>
            <div className="demo-list">
              <p><strong>User:</strong> user@example.com / password123</p>
              <p><strong>Admin:</strong> admin@moneywise.com / admin123</p>
            </div>
          </details>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;