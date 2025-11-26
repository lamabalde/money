import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Inscription express',
      description: 'Créez votre compte en 30 secondes avec une vérification simplifiée',
      icon: '🚀',
      color: '#00D4AA'
    },
    {
      number: '02',
      title: 'Connectez vos comptes',
      description: 'Liez vos comptes bancaires en toute sécurité avec notre technologie cryptée',
      icon: '🔗',
      color: '#4361EE'
    },
    {
      number: '03',
      title: 'Automatisez le suivi',
      description: 'Vos transactions sont automatiquement catégorisées et analysées',
      icon: '🤖',
      color: '#7209B7'
    },
    {
      number: '04',
      title: 'Optimisez votre budget',
      description: 'Recevez des recommandations personnalisées pour économiser plus',
      icon: '📈',
      color: '#FFA502'
    }
  ];

  return (
    <section id="how-it-works" className="section how-it-works">
      <div className="container">
        <h2 className="section-title">Simple et efficace</h2>
        <p className="section-subtitle">
          Commencez à mieux gérer votre argent en moins de 5 minutes
        </p>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-header">
                <div 
                  className="step-number"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>
                <div className="step-icon">
                  {step.icon}
                </div>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && (
                <div className="step-connector"></div>
              )}
            </div>
          ))}
        </div>
        
        </div>
    </section>
  );
};

export default HowItWorks;