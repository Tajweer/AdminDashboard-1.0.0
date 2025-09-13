import React, { useEffect, useState } from 'react';
import { fetchOrders, fetchProducts, deleteProduct, clearAuthData } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/currency.jsx';
import config from '../config/config.js';
import { colors } from '../constants/colors';
import '../App.css';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: ordersData } = await fetchOrders();
      const { data: productsData } = await fetchProducts();
      
      setOrders(ordersData || []);
      setProducts(productsData || []);
      setLoading(false);
    } catch (err) {
      console.error("Error loading data:", err.response?.data || err.message);
      
      setLoading(false);
      setError(err.message || 'Unknown error');
      
      if (err.message?.includes("Authentication expired") || 
          err.message?.includes("No authentication token") ||
          err.message?.includes("Authentication token has expired") ||
          err.response?.status === 401) {
        clearAuthData();
        navigate('/login');
        return;
      }
      
      alert(`Error loading data: ${err.message || 'Unknown error'}`);
    }
  };

  const handleAdd = () => navigate('/add-product');
  const handleEdit = (productId) => navigate(`/add-product?edit=${productId}`);

  const handleDelete = async (productId, productTitle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productTitle}"? This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    try {
      await deleteProduct(productId);
      // Remove the product from the local state
      setProducts(products.filter(prod => prod.id !== productId));
      alert('Product deleted successfully!');
    } catch (err) {
      console.error("Error deleting product:", err.response?.data || err.message);
      alert(`Error deleting product: ${err.message || 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '1.2rem',
          color: 'var(--text-muted)'
        }}>
          Loading dashboard data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          gap: '16px'
        }}>
          <div style={{ 
            fontSize: '1.2rem',
            color: 'var(--error-color)',
            textAlign: 'center'
          }}>
            Error loading dashboard: {error}
          </div>
          <button 
            onClick={loadData}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--primary-color)',
              color: colors.text.inverse,
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header animate-fade-in">
        <div>
          <h1>My Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', margin: '8px 0 0 0', fontSize: '1.1rem' }}>
            Manage your products and track orders
          </p>
        </div>
        <div className="dashboard-actions">
          <button onClick={handleAdd}>
            <span>➕</span> Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid animate-fade-in" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-2xl)'
      }}>
        <div className="stat-card" style={{
          background: 'var(--card-background)',
          padding: 'var(--spacing-xl)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'var(--gradient-primary)'
          }}></div>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📦</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: colors.primary, marginBottom: '4px' }}>
            {products.length}
          </div>
          <div style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Total Products</div>
        </div>
        
        <div className="stat-card" style={{
          background: 'var(--card-background)',
          padding: 'var(--spacing-xl)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'var(--gradient-primary)'
          }}></div>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🛒</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: colors.success, marginBottom: '4px' }}>
            {orders.length}
          </div>
          <div style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Total Orders</div>
        </div>
        
        <div className="stat-card" style={{
          background: 'var(--card-background)',
          padding: 'var(--spacing-xl)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'var(--gradient-primary)'
          }}></div>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>💰</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: colors.warning, marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {formatPrice(orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0), true, 24)}
          </div>
          <div style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Total Revenue</div>
        </div>
      </div>

      <section className="dashboard-section animate-fade-in">
        <h2>Recent Orders</h2>
        {orders.length === 0 ? (
          <div className="empty">
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
            <p>No orders yet.</p>
            <p style={{ fontSize: '0.9rem', opacity: '0.7' }}>Orders will appear here once customers start purchasing your products.</p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {orders.slice(0, 6).map((order) => (
              <div key={order.id} className="dashboard-card animate-fade-in-scale">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4>Order #{order.order_summary_number || `TEMP-${order.id.substring(0, 8)}`}</h4>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    background: order.status === 'completed' ? 'var(--success-color)' : 'var(--warning-color)',
                    opacity: '0.1',
                    color: order.status === 'completed' ? 'var(--success-color)' : 'var(--warning-color)',
                    border: `1px solid ${order.status === 'completed' ? 'var(--success-color)' : 'var(--warning-color)'}`
                  }}>
                    {order.status}
                  </span>
                </div>
                
                {order.user ? (
                  <div style={{ marginBottom: '12px' }}>
                    <p><strong>👤 Customer:</strong> {order.user.name}</p>
                    <p><strong>📞 Phone:</strong> {order.user.phone}</p>
                  </div>
                ) : (
                  <div style={{ marginBottom: '12px' }}>
                    <p><strong>👤 Customer:</strong> <em>User {order.user_id}</em></p>
                    <p><strong>📞 Phone:</strong> <em>Unknown-{order.user_id}</em></p>
                  </div>
                )}
                
                <div style={{ 
                  background: 'var(--background-tertiary)', 
                  padding: '12px', 
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: '12px'
                }}>
                  <p><strong>💰 Total:</strong> {formatPrice(order.total_amount)}</p>
                  <p><strong>📅 Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                
                {order.items && order.items.length > 0 && (
                  <div>
                    <p><strong>📦 Items:</strong></p>
                    {order.items.map((item, index) => (
                      <div key={index} style={{ 
                        marginLeft: '12px', 
                        fontSize: '0.9em',
                        padding: '4px 8px',
                        background: 'var(--primary-color)',
                        opacity: '0.1',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '4px'
                      }}>
                        • {item.product_name} (Qty: {item.quantity}) - {formatPrice(item.price)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section animate-fade-in">
        <h2>Your Products</h2>
        {products.length === 0 ? (
          <div className="empty">
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📦</div>
            <p>No products added yet.</p>
            <p style={{ fontSize: '0.9rem', opacity: '0.7' }}>Start by adding your first product to begin selling.</p>
            <button 
              onClick={handleAdd}
              style={{
                marginTop: '16px',
                background: 'var(--gradient-primary)',
                color: colors.text.inverse,
                border: 'none',
                padding: '12px 24px',
                borderRadius: 'var(--radius-full)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)'
              }}
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="dashboard-grid">
            {products.map((prod) => (
              <div key={prod.id} className="dashboard-card animate-fade-in-scale">
                {prod.image && (
                  <img
                    src={`${config.getApiBaseUrl()}/${prod.image.replace(/^\/+/, '')}`}
                    alt={prod.title}
                    className="product-image"
                  />
                )}
                
                <div style={{ marginBottom: '16px' }}>
                  <h3>{prod.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {prod.description}
                  </p>
                </div>
                
                <div style={{ 
                  background: 'var(--background-tertiary)', 
                  padding: '16px', 
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: '16px'
                }}>
                  <p><strong>🏷️ Category:</strong> {prod.category}</p>
                  <p><strong>💰 Price:</strong> {formatPrice(prod.current_price)}</p>
                  <p><strong>📉 Min Price:</strong> {formatPrice(prod.minimum_price)}</p>
                  <p><strong>📦 Stock:</strong> {prod.quantity} units</p>
                </div>

                <div className="card-actions">
                  <button onClick={() => handleEdit(prod.id)}>
                    <span>✏️</span> Edit Product
                  </button>
                  <button 
                    onClick={() => handleDelete(prod.id, prod.title)}
                    style={{ 
                      backgroundColor: colors.error, 
                      color: colors.text.inverse,
                      border: 'none'
                    }}
                  >
                    <span>🗑️</span> Delete Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}