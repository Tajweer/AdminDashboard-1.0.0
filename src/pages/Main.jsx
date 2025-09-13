import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '../constants/colors';

export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  const messageColor = location.state?.color || colors.success;

  useEffect(() => {
    if (location.state) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <main className="main-page">
      <div className="landing-container animate-fade-in-scale">
        <div className="header animate-float">
          <img src="/src/assets/Logo.png" alt="Tajweer Logo" />
          <h2>Welcome to Tajweer</h2>
        </div>

        <p className="animate-fade-in">
          Your premier destination for dynamic pricing and seamless e-commerce experiences. 
          Join thousands of satisfied customers and start your journey today.
        </p>

        {message && (
          <div 
            className={`animate-fade-in ${messageColor === colors.error ? 'error-message' : 'success'}`}
            style={{ 
              marginTop: '20px',
              textAlign: 'center',
              padding: '16px 24px',
              borderRadius: '12px',
              fontWeight: '600'
            }}
          >
            {message}
          </div>
        )}

        <div className="button-group animate-fade-in">
          <button
            className="landing-btn signup-btn animate-pulse"
            onClick={() => navigate('/signup')}
          >
            <span>🚀</span> Create Account
          </button>
          <button
            className="landing-btn login-btn"
            onClick={() => navigate('/login')}
          >
            <span>🔑</span> Login
          </button>
        </div>

        <div className="features-preview animate-fade-in" style={{ 
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          opacity: '1'
        }}>
          <div className="feature-item" style={{
            textAlign: 'center',
            padding: '16px',
            background: 'var(--background-tertiary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--primary-color)' }}>⚡</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Fast Setup</div>
          </div>
          <div className="feature-item" style={{
            textAlign: 'center',
            padding: '16px',
            background: 'var(--background-tertiary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--primary-color)' }}>🛡️</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Secure</div>
          </div>
          <div className="feature-item" style={{
            textAlign: 'center',
            padding: '16px',
            background: 'var(--background-tertiary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--primary-color)' }}>📱</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Mobile Ready</div>
          </div>
        </div>
      </div>
    </main>
  );
}