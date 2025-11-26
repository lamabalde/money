import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Maîtrisez vos finances avec 
              <span className="gradient-text"> intelligence</span>
            </h1>
            <p className="hero-description">
              MoneyWise transforme la façon dont vous gérez votre argent. 
              Suivez, analysez et optimisez vos finances avec des outils 
              intelligents et un design exceptionnel.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-large">
                Commencer gratuitement
                <span className="arrow">→</span>
              </button>

            </div>
            
          </div>
          <div className="hero-visual">
            <div className="floating-card income">
              <div className="card-header">
                <span className="card-icon">💰</span>
                <span>Revenus</span>
              </div>
              <div className="card-amount positive">+€3,250.00</div>
            </div>
            <div className="floating-card expenses">
              <div className="card-header">
                <span className="card-icon">🛒</span>
                <span>Dépenses</span>
              </div>
              <div className="card-amount negative">-€1,845.30</div>
            </div>
            <div className="floating-card savings">
              <div className="card-header">
                <span className="card-icon">🎯</span>
                <span>Épargne</span>
              </div>
              <div className="card-amount positive">+€1,404.70</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;