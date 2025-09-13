import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { colors } from '../constants/colors';
import Logo from '../assets/Logo.png';

export default function Login() {
  const navigate = useNavigate();
  const prefix = '+9665';
  const [phone, setPhone] = useState(prefix);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
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
      setErrorMsg('Phone number must follow the format +9665********');
      return;
    }

    try {
      await loginUser({ phone });
      navigate('/otp');
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        'Login failed. Please try again.';

      if (
        message.toLowerCase().includes('not authorized') ||
        message.toLowerCase().includes('will be verified')
      ) {
        navigate('/', {
          state: {
            message,
            color: message.includes('authorized') ? colors.error : colors.success,
          },
        });
      } else {
        setErrorMsg(message);
      }
    }
  };

  return (
    <main className="main-page">
      <div className="landing-container animate-fade-in-scale">
        <div className="header animate-float">
          <img src={Logo} alt="Tajweer Logo" />
          <h2>Welcome Back</h2>
        </div>

        <p className="animate-fade-in">
          Enter your phone number to receive a verification code
        </p>

        <form onSubmit={handleSubmit} className="animate-fade-in">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={handleChange}
              onFocus={(e) => {
                const pos = e.target.value.length;
                setTimeout(() => e.target.setSelectionRange(pos, pos), 0);
              }}
              onClick={(e) => {
                if (e.target.selectionStart < prefix.length) {
                  e.target.setSelectionRange(phone.length, phone.length);
                }
              }}
              placeholder="+9665********"
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
            <span>📱</span> Send OTP Code
          </button>
        </form>

        <div className="footer animate-fade-in">
          <p>Don't have an account?</p>
          <a href="/signup" className="support-link">Sign up here</a>
        </div>
      </div>
    </main>
  );
}