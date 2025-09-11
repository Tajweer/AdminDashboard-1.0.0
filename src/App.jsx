import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Login from './pages/Login';
import OTP from './pages/OTP';
import Dashboard from './pages/Dashboard';
import InsertProduct from './pages/InsertProduct';
import './App.css';

export default function App() {
  const { pathname } = useLocation();

  const hideFooterOn = ['/', '/login', '/signup', '/otp'];
  const showFooter = !hideFooterOn.includes(pathname);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<InsertProduct />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}
