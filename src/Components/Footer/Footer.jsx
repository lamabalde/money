import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Produit',
      links: [
        'Fonctionnalités',
        'Tableau de bord',
        'Analyses',
        'Export PDF/Excel',
        'Tarifs'
      ]
    },
    {
      title: 'Ressources',
      links: [
        'Blog financier',
        'Guides pratiques',
        'Calculatrices',
        'Modèles budget',
        'FAQ'
      ]
    },
    {
      title: 'Entreprise',
      links: [
        'À propos',
        'Carrières',
        'Presse',
        'Partenaires',
        'Contact'
      ]
    },
    {
      title: 'Légal',
      links: [
        'Confidentialité',
        'Conditions',
        'Cookies',
        'Sécurité',
        'GDPR'
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">💎</div>
              <span className="logo-text">MoneyWise</span>
            </div>
            <p className="brand-description">
              L'application de gestion financière la plus intuitive du marché. 
              Prenez le contrôle de votre argent et atteignez vos objectifs.
            </p>
            
            <div className="social-links">
              <a href="#" className="social-link">
                <span className="social-icon">🐦</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📘</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📷</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">💼</span>
              </a>
            </div>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="footer-newsletter">
            <h4>Restez informé</h4>
            <p>Recevez nos conseils financiers et les dernières nouveautés</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="newsletter-input"
              />
              <button className="btn btn-primary">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              © {currentYear} MoneyWise. Tous droits réservés.
            </div>
            
            <div className="footer-bottom-links">
              <a href="#">Mentions légales</a>
              <a href="#">Confidentialité</a>
              <a href="#">Cookies</a>
              <a href="#">RGPD</a>
            </div>
            
            <div className="payment-methods">
              <span className="payment-icon">💳</span>
              <span className="payment-icon">🔐</span>
              <span className="payment-icon">🏦</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;