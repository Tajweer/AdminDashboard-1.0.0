import React from 'react';
import { HelpCircle, Mail, Shield, Zap, Globe } from 'lucide-react';
import '../App.css';
import Logo from '../assets/Logo.png';

export default function Footer() {
  return (
    <footer className="footer-modern">
      <div className="footer-content">
        <div className="footer-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
            <img src={Logo} alt="Tajweer Logo" style={{ height: '24px', width: '24px' }} />
            <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Tajweer</span>
          </div>
          <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Tajweer Platform. All rights reserved.
          </p>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>
            Empowering dynamic pricing solutions
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
            <Shield size={16} style={{ color: 'var(--success-color)' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Secure & Reliable</span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
            <Zap size={16} style={{ color: 'var(--warning-color)' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lightning Fast</span>
          </div>
        </div>

        <div className="footer-right">
          <a href="#" aria-label="Support" title="Get Support">
            <HelpCircle size={20} />
          </a>
          <a href="mailto:info@tajweer.com" aria-label="E-mail" title="Contact Us">
            <Mail size={20} />
          </a>
          <a href="https://tajweer.com" target="_blank" rel="noopener noreferrer" aria-label="Website" title="Visit our website">
            <Globe size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}