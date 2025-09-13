import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import Logo from '../assets/Logo.png';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    navigate('/');
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.header-navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header-navbar">
      <div className="header-container">
        <Link to="/" className="header-logo" onClick={closeMobileMenu}>
          <img src={Logo} alt="Logo" />
          <span>Tajweer</span>
        </Link>

        <nav className="header-links">
          {token ? (
            <>
              <Link to="/dashboard" className="header-item">Home</Link>
              <button onClick={handleLogout} className="header-item logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-item">Log in</Link>
              <Link to="/signup" className="header-item signup-btn">Sign up</Link>
            </>
          )}
        </nav>

        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <nav className="header-links">
          {token ? (
            <>
              <Link to="/dashboard" className="header-item" onClick={closeMobileMenu}>Home</Link>
              <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="header-item logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-item" onClick={closeMobileMenu}>Log in</Link>
              <Link to="/signup" className="header-item signup-btn" onClick={closeMobileMenu}>Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}