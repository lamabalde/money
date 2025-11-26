import React, { useState } from 'react';
import './Settings.css';
const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    username: 'ALEN',
    firstName: 'Alain',
    lastName: 'Dupont',
    email: 'alen@example.com',
    registrationDate: '15 Jan 2024',
    talent: 'Développeur Fullstack',
    status: 'Actif'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Logique pour changer le mot de passe
    console.log('Changement de mot de passe:', passwordData);
    alert('Mot de passe changé avec succès!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Mon Profil</h1>
        <p>Gérez vos informations personnelles et vos paramètres de compte</p>
      </div>

      <div className="settings-layout">
        {/* Navigation latérale */}
        <div className="settings-sidebar">
          <button 
            className={`sidebar-item ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            📝 Informations Personnelles
          </button>
          <button 
            className={`sidebar-item ${activeSection === 'password' ? 'active' : ''}`}
            onClick={() => setActiveSection('password')}
          >
            🔒 Changer le Mot de Passe
          </button>
        </div>

        {/* Contenu principal */}
        <div className="settings-content">
          {activeSection === 'profile' && (
            <div className="profile-section">
              <h2>Informations Personnelles</h2>
              
              <div className="profile-header">
                <div className="avatar-large">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </div>
                <div className="profile-info">
                  <h3>{formData.username}</h3>
                  <p className="talent-badge">{formData.talent}</p>
                  <span className={`status-badge ${formData.status === 'Actif' ? 'active' : 'inactive'}`}>
                    {formData.status}
                  </span>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-card">
                  <label>Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                </div>

                <div className="info-card">
                  <label>Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                </div>

                <div className="info-card">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                </div>
              </div>

              <button className="save-button">
                💾 Enregistrer les modifications
              </button>
            </div>
          )}

          {activeSection === 'password' && (
            <div className="password-section">
              <h2>Changer le Mot de Passe</h2>
              <p className="section-description">
                Pour assurer la sécurité de votre compte, utilisez un mot de passe fort et unique.
              </p>

              <form onSubmit={handlePasswordSubmit} className="password-form">
                <div className="form-group">
                  <label>Mot de passe actuel</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Entrez votre mot de passe actuel"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nouveau mot de passe</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Entrez votre nouveau mot de passe"
                    className="form-input"
                    required
                  />
                  <div className="password-strength">
                    <span className="strength-text">Force du mot de passe: Moyenne</span>
                    <div className="strength-bar">
                      <div className="strength-fill medium"></div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirmez votre nouveau mot de passe"
                    className="form-input"
                    required
                  />
                </div>

                <div className="password-requirements">
                  <h4>Exigences du mot de passe:</h4>
                  <ul>
                    <li>✅ Au moins 8 caractères</li>
                    <li>✅ Une lettre majuscule</li>
                    <li>✅ Un chiffre</li>
                    <li>✅ Un caractère spécial</li>
                  </ul>
                </div>

                <button type="submit" className="save-button password-button">
                  🔒 Changer le mot de passe
                </button>
              </form>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default Settings;