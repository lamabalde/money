import React from 'react';
import './CTA.css';

const CTA = () => {
  const features = [
    '✓ Essai gratuit de 30 jours',
    '✓ Aucune carte de crédit requise',
    '✓ Support prioritaire 24/7',
    '✓ Annulation à tout moment'
  ];

  return (
    <section className="section cta">
      <div className="container">
        <div className="cta-content">
          <div className="cta-text">
            <h2>Prêt à révolutionner votre gestion financière ?</h2>
            <p>
              Rejoignez des milliers de personnes qui ont pris le contrôle de leurs finances 
              et atteignent leurs objectifs d'épargne plus rapidement.
            </p>
            
            <div className="cta-features">
              {features.map((feature, index) => (
                <div key={index} className="cta-feature">
                  {feature}
                </div>
              ))}
            </div>
            
            <div className="cta-actions">
              <button className="btn btn-primary btn-large">
                Commencer gratuitement
                <span className="icon">🚀</span>
              </button>
              <button className="btn btn-secondary btn-large">
                Voir les tarifs
              </button>
            </div>
            
            <div className="cta-security">
              <div className="security-badges">
                <div className="badge">
                  <span>🔒</span>
                  Cryptage bancaire
                </div>
                <div className="badge">
                  <span>✅</span>
                  Certifié GDPR
                </div>
                <div className="badge">
                  <span>⭐</span>
                  4.9/5 sur TrustPilot
                </div>
              </div>
            </div>
          </div>
          
          <div className="cta-visual">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Plan Essentiel</h3>
                <div className="price">
                  <span className="amount">Gratuit</span>
                  <span className="period">30 jours</span>
                </div>
              </div>
              
              <div className="pricing-features">
                <div className="feature">
                  <span className="check">✓</span>
                  <span>5 comptes bancaires</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Analyses de base</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Export PDF/Excel</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Support par email</span>
                </div>
                <div className="feature">
                  <span className="check">✓</span>
                  <span>Application mobile</span>
                </div>
              </div>
              
              <button className="btn btn-primary btn-full">
                Démarrer l'essai gratuit
              </button>
              
              <div className="pricing-note">
                Aucune carte de crédit requise • Annulation instantanée
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;