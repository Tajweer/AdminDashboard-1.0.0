import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/api';

export default function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+9665');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const prefix = '+9665';

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrorMsg('');
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value;

    input = input.replace(/^(\+)?9665?/, '');

    input = input.replace(/\D/g, '');

    input = input.slice(0, 8);

    setPhone(prefix + input);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length !== prefix.length + 8) {
      setErrorMsg('Please enter a valid phone number in the format +9665********');
      return;
    }

    try {
      const { phone: normalizedPhone } = await signupUser({ name, phone });
      localStorage.setItem("phone", normalizedPhone);
      navigate("/otp");
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMsg("Registration failed. Please try again.");
    }
  };

  return (
    <main className="main-page">
      <div className="landing-container animate-fade-in-scale">
        <div className="header animate-float">
          <img src="/src/assets/Logo.png" alt="Tajweer Logo" />
          <h2>Join Tajweer</h2>
        </div>

        <p className="animate-fade-in">
          Create your account to start selling with dynamic pricing
        </p>

        <form onSubmit={handleSubmit} className="animate-fade-in">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="+9665********"
              value={phone}
              onChange={handlePhoneChange}
              onFocus={(e) => {
                const pos = e.target.value.length;
                setTimeout(() => e.target.setSelectionRange(pos, pos), 0);
              }}
              onClick={(e) => {
                if (e.target.selectionStart < prefix.length) {
                  e.target.setSelectionRange(phone.length, phone.length);
                }
              }}
              required
              className="phone-input"
            />
          </div>

          {errorMsg && (
            <div className="error-message animate-fade-in">
              {errorMsg}
            </div>
          )}

          <button type="submit" className="animate-pulse">
            <span>🚀</span> Create Account
          </button>
        </form>

        <div className="footer animate-fade-in">
          <p>Already have an account?</p>
          <a href="/login" className="support-link">Login here</a>
        </div>
      </div>
    </main>
  );
}