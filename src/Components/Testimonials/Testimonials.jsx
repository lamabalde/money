import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Lambert',
      role: 'Freelance Designer',
      avatar: 'ML',
      rating: 5,
      content: 'MoneyWise m\'a aidé à économiser 40% de plus chaque mois. Les analyses de dépenses sont incroyablement précises !',
      savings: '€4,200',
      joined: 'Il y a 8 mois',
      color: '#00D4AA'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      role: 'Ingénieur logiciel',
      avatar: 'TD',
      rating: 5,
      content: 'Enfin une app qui comprend vraiment mes besoins financiers. L\'assistant IA a repéré des frais cachés que je payais depuis des années !',
      savings: '€7,800',
      joined: 'Il y a 1 an',
      color: '#4361EE'
    },
    {
      id: 3,
      name: 'Sophie Martin',
      role: 'Cheffe de projet',
      avatar: 'SM',
      rating: 5,
      content: 'Les rapports PDF sont parfaits pour mes déclarations d\'impôts. J\'économise des heures de travail chaque mois.',
      savings: '€3,150',
      joined: 'Il y a 6 mois',
      color: '#7209B7'
    }
  ];

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <h2 className="section-title">Ils nous font confiance</h2>
        <p className="section-subtitle">
          Rejoignez des milliers d'utilisateurs qui ont transformé leur relation avec l'argent
        </p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="user-info">
                  <div 
                    className="user-avatar"
                    style={{ backgroundColor: testimonial.color }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div className="user-details">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
                <div className="rating">
                  {'★'.repeat(testimonial.rating)}
                </div>
              </div>
              
              <p className="testimonial-content">"{testimonial.content}"</p>
              
              <div className="testimonial-stats">
                <div className="stat">
                  <div className="stat-value">{testimonial.savings}</div>
                  <div className="stat-label">Économisés</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{testimonial.joined}</div>
                  <div className="stat-label">Utilise MoneyWise</div>
                </div>
              </div>
              
              <div className="testimonial-footer">
                <div className="verified-badge">
                  <span>✅</span>
                  Vérifié
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Utilisateurs actifs</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Note moyenne</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">€12M+</div>
            <div className="stat-label">Économisés collectivement</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction clients</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;