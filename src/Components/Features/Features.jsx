import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '📊',
      title: 'Analyses détaillées',
      description: 'Graphiques interactifs et rapports personnalisés pour comprendre vos habitudes financières',
      color: '#00D4AA'
    },
    {
      icon: '🏷️',
      title: 'Catégorisation intelligente',
      description: 'Classement automatique de vos transactions avec apprentissage de vos habitudes',
      color: '#4361EE'
    },
    {
      icon: '📱',
      title: 'Sync multi-appareils',
      description: 'Accédez à vos finances depuis votre mobile, tablette ou ordinateur',
      color: '#7209B7'
    },
    {
      icon: '🔒',
      title: 'Sécurité bancaire',
      description: 'Cryptage de niveau bancaire pour protéger vos données sensibles',
      color: '#FFA502'
    },
    {
      icon: '📄',
      title: 'Export intelligent',
      description: 'Générez des rapports PDF/Excel pour vos impôts ou conseillers',
      color: '#FF4757'
    },
    {
      icon: '🤖',
      title: 'Assistant IA',
      description: 'Recommandations personnalisées pour optimiser votre budget',
      color: '#00D4AA'
    }
  ];

  return (
    <section id="features" className="section features">
      <div className="container">
        <h2 className="section-title">Fonctionnalités premium</h2>
        <p className="section-subtitle">
          Tout ce dont vous avez besoin pour prendre le contrôle total de vos finances
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div 
                className="feature-icon"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <span style={{ color: feature.color }}>{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;