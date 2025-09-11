import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../services/api';
import Header from '../components/Header';

export default function OTP() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('green');
  const navigate = useNavigate();

  const phone = localStorage.getItem("phone");

  const handleChange = (e) => setOtp(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageColor('green');

    if (!phone) {
      setMessage("Phone number not found. Please register again.");
      setMessageColor('red');
      return;
    }

    try {
      const response = await verifyOTP({ phone, otp });
    
      const token = response.access_token;
      const role = response.user?.role;
    
      if (token && role?.toLowerCase() === "admin") {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("phone");
        navigate("/", {
          state: {
            message: "Your account is under review. Please wait.",
            color: "green",
          },
        });
      }
    } catch (err) {
      console.error("OTP Verification Failed:", err);
    }
  };

  return (
    <main className="main-page">
      <div className="container animate-fade-in-scale">
      <div className="header animate-float">
        <img src="/src/assets/Logo.png" alt="Tajweer Logo" />
        <h2>Verify Code</h2>
      </div>

      <p style={{ 
        textAlign: 'center', 
        color: 'var(--text-muted)', 
        marginBottom: 'var(--spacing-xl)',
        fontSize: '1.1rem'
      }}>
        We've sent a verification code to your phone
      </p>

      <form onSubmit={handleSubmit} className="animate-fade-in">
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <label htmlFor="otp">Verification Code</label>
          <input
            id="otp"
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={handleChange}
            required
            maxLength="6"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              letterSpacing: '8px',
              fontFamily: 'monospace',
              fontWeight: '600'
            }}
          />
        </div>

        {message && (
          <div 
            className={`animate-fade-in ${messageColor === 'red' ? 'error-message' : 'success'}`}
            style={{ 
              marginTop: '10px', 
              textAlign: 'center',
              padding: '12px 16px',
              borderRadius: 'var(--radius-lg)',
              fontWeight: '600'
            }}
          >
            {message}
          </div>
        )}

        <button type="submit" className="animate-pulse">
          <span>🔐</span> Verify & Login
        </button>
      </form>

        <div className="footer">
          <p>Didn't receive the code?</p>
          <a href="/login" className="support-link">Try again</a>
        </div>
      </div>
    </main>
  );
}