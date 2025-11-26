import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../Components/Auth/AuthLayout';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    console.log('Registration attempt:', formData);
    navigate('/login');
  };

  return (
    <AuthLayout>
      {/* Le logo MoneyWise est maintenant dans AuthLayout au-dessus */}
      <div className="auth-title">
        <h1>Créer un compte</h1>
        <p className="auth-subtitle">Commencez votre aventure financière</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Nom</label>
            <input
              id="lastName"
              type="text"
              placeholder="Votre nom"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">Prénom</label>
            <input
              id="firstName"
              type="text"
              placeholder="Votre prénom"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="vous@exemple.com"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Numéro de téléphone</label>
          <input
            id="phone"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
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
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="auth-button">
          S'inscrire
        </button>

        <div className="auth-link">
          <p>Vous avez déjà un compte? <Link to="/login">Se connecter</Link></p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;