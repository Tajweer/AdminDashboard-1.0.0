import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addProduct, updateProduct, fetchProducts, checkProductAuction } from '../services/api';
import config from '../config/config.js';
import errorHandler from '../utils/errorHandler';
import { colors } from '../constants/colors';
import '../App.css';

export default function InsertProduct() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      existingImage: '',
      product_type: 'normal',
    },
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const editId = new URLSearchParams(search).get('edit');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const imageFile = watch('images')?.[0];
  const existingImage = watch('existingImage');
  const productType = watch('product_type');

  useEffect(() => {
    if (!editId) return;

    (async () => {
      try {
        const { data } = await fetchProducts();
        const product = data.find((p) => String(p.id) === editId);
        if (product) {
          // Check if this product has an auction room
          let productType = 'normal';
          try {
            const auctionResult = await checkProductAuction(editId);
            if (auctionResult.hasAuction) {
              productType = 'auction';
            } else {
              productType = 'normal';
            }
          } catch (auctionErr) {
            productType = 'normal';
          }

          reset({
            title: product.title,
            description: product.description,
            category: product.category,
            initial_price: product.initial_price,
            minimum_price: product.minimum_price,
            quantity: product.quantity,
            existingImage: `${config.getApiBaseUrl()}/${product.image}`,
            product_type: productType,
          });
        }
      } catch (err) {
        console.error('Failed to load product:', err);
      }
    })();
  }, [editId, reset]);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setErrorMessage('');
    
    // Validate that minimum price is equal to or less than initial price
    const priceValidation = errorHandler.validatePriceComparison(
      parseFloat(formData.initial_price), 
      parseFloat(formData.minimum_price)
    );
    
    if (!priceValidation.isValid) {
      setErrorMessage(errorHandler.getLocalizedErrorMessage(priceValidation.errorCode));
      setIsLoading(false);
      return;
    }
    
    const body = new FormData();


    if (formData.images?.[0]) {
      body.append('images', formData.images[0]);
    }

    body.append('title', formData.title);
    body.append('description', formData.description);
    body.append('category', formData.category);
    body.append('initial_price', formData.initial_price.toString());
    body.append('minimum_price', formData.minimum_price.toString());
    body.append('quantity', formData.quantity.toString());
    body.append('add_to_auction', formData.product_type === 'auction' ? 'true' : 'false');


    try {
      if (editId) {
        await updateProduct(editId, body);
      } else {
        await addProduct(body);
      }

      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to save product:', err);
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to save product';
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .product-type-option:hover {
            border-color: var(--primary-color) !important;
            box-shadow: var(--shadow-md);
            transform: translateY(-2px);
          }
          
          .product-type-option input[type="radio"]:checked + *,
          .product-type-option:has(input[type="radio"]:checked) {
            border-color: var(--primary-color) !important;
            background: linear-gradient(135deg, rgba(116, 98, 246, 0.05) 0%, rgba(139, 124, 246, 0.05) 100%) !important;
            box-shadow: 0 0 20px rgba(116, 98, 246, 0.3);
          }
          
          .product-type-option input[type="radio"] {
            accent-color: var(--primary-color);
          }
        `}
      </style>
      <div className="form-page">
      <div className="form-container animate-fade-in-scale">
        <div className="header animate-float" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <img src="/src/assets/Logo.png" alt="Tajweer Logo" />
          <h2>{editId ? 'Edit Product' : 'Add New Product'}</h2>
        </div>

        <p style={{ 
          textAlign: 'center', 
          color: 'var(--text-muted)', 
          marginBottom: 'var(--spacing-2xl)',
          fontSize: '1.1rem'
        }}>
          {editId ? 'Update your product information' : 'Fill in the details to add your product to the marketplace'}
        </p>

        {errorMessage && (
          <div className="error-message animate-fade-in" style={{ 
            marginBottom: 'var(--spacing-xl)',
            textAlign: 'center',
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--error-color)',
            opacity: '0.1',
            border: '1px solid var(--danger-color)'
          }}>
            <div style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-sm)' }}>⚠️</div>
            <div style={{ fontWeight: '600', color: 'var(--danger-color)' }}>{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="animate-fade-in">
          {/* Image Upload Section */}
          <div style={{ 
            background: 'var(--background-tertiary)', 
            padding: 'var(--spacing-xl)', 
            borderRadius: 'var(--radius-xl)',
            marginBottom: 'var(--spacing-xl)',
            border: '2px dashed var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📸</div>
            <label style={{ 
              display: 'block', 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-md)',
              color: 'var(--text-primary)'
            }}>
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('images', {
                validate: (files) => {
                  if (!editId && (!files || files.length === 0)) {
                    return 'Image is required';
                  }
                  return true;
                },
              })}
              style={{
                marginBottom: 'var(--spacing-md)',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--card-background)',
                cursor: 'pointer',
                width: '100%'
              }}
            />
            {errors.images && <span className="error">{errors.images.message}</span>}
            
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="image-preview"
              />
            ) : existingImage ? (
              <img
                src={existingImage}
                alt="Current Product Image"
                className="image-preview"
              />
            ) : (
              <div style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.9rem',
                marginTop: 'var(--spacing-md)'
              }}>
                No image selected
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <label>Product Name</label>
            <input 
              type="text" 
              placeholder="Enter product name"
              {...register('title', { required: 'Name is required' })} 
            />
            {errors.title && <span className="error">{errors.title.message}</span>}
          </div>

          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <label>Description</label>
            <textarea 
              placeholder="Describe your product in detail..."
              {...register('description', { required: 'Description is required' })} 
            />
            {errors.description && <span className="error">{errors.description.message}</span>}
          </div>

          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <label>Category</label>
            <select 
              {...register('category', { required: 'Category is required' })}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--card-background)',
                fontSize: '1rem',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Sports">Sports</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Beauty">Beauty</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && <span className="error">{errors.category.message}</span>}
          </div>

          {/* Pricing and Inventory */}
          <div style={{ 
            background: 'var(--background-tertiary)', 
            padding: 'var(--spacing-xl)', 
            borderRadius: 'var(--radius-xl)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            <h3 style={{ 
              marginBottom: 'var(--spacing-lg)', 
              color: 'var(--text-primary)',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              💰 Pricing & Inventory
            </h3>
            
            <div className="form-row">
              <div>
                <label>Initial Price (SAR)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  {...register('initial_price', { 
                    required: 'Initial price is required',
                    onChange: () => {
                      // Trigger re-validation of minimum price when initial price changes
                      const minimumPrice = watch('minimum_price');
                      if (minimumPrice) {
                        // Trigger validation for minimum price field
                        const form = document.querySelector('form');
                        if (form) {
                          const minimumPriceInput = form.querySelector('input[name="minimum_price"]');
                          if (minimumPriceInput) {
                            minimumPriceInput.dispatchEvent(new Event('blur', { bubbles: true }));
                          }
                        }
                      }
                    }
                  })}
                />
                {errors.initial_price && <span className="error">{errors.initial_price.message}</span>}
              </div>
              <div>
                <label>Minimum Price (SAR)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  {...register('minimum_price', { 
                    required: 'Minimum price is required',
                    validate: (value) => {
                      const initialPrice = watch('initial_price');
                      if (initialPrice) {
                        const priceValidation = errorHandler.validatePriceComparison(
                          parseFloat(initialPrice), 
                          parseFloat(value)
                        );
                        if (!priceValidation.isValid) {
                          return errorHandler.getLocalizedErrorMessage(priceValidation.errorCode);
                        }
                      }
                      return true;
                    }
                  })}
                />
                {errors.minimum_price && <span className="error">{errors.minimum_price.message}</span>}
              </div>
              <div>
                <label>Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register('quantity', { required: 'Quantity is required' })}
                />
                {errors.quantity && <span className="error">{errors.quantity.message}</span>}
              </div>
            </div>
          </div>

          {/* Product Type Selection */}
          <div style={{ 
            background: 'var(--background-tertiary)', 
            padding: 'var(--spacing-xl)', 
            borderRadius: 'var(--radius-xl)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            <h3 style={{ 
              marginBottom: 'var(--spacing-lg)', 
              color: 'var(--text-primary)',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              🎯 Product Type
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              {/* Normal Product Option */}
              <div 
                className="product-type-option"
                style={{
                  padding: 'var(--spacing-lg)',
                  background: productType === 'normal' 
                    ? colors.productTypes.normal.background
                    : colors.background.card,
                  borderRadius: 'var(--radius-lg)',
                  border: `3px solid ${productType === 'normal' ? colors.primary : colors.border.color}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  boxShadow: productType === 'normal' 
                    ? colors.productTypes.normal.shadow
                    : colors.shadows.sm,
                  transform: productType === 'normal' ? 'scale(1.02)' : 'scale(1)',
                  zIndex: productType === 'normal' ? '2' : '1'
                }}
                onClick={() => setValue('product_type', 'normal')}
              >
                <input
                  type="radio"
                  id="product_type_normal"
                  value="normal"
                  {...register('product_type', { required: 'Please select a product type' })}
                  style={{
                    position: 'absolute',
                    top: 'var(--spacing-md)',
                    right: 'var(--spacing-md)',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                  }}
                />
                {productType === 'normal' && (
                  <div style={{
                    position: 'absolute',
                    top: 'var(--spacing-md)',
                    right: 'var(--spacing-md)',
                    width: '20px',
                    height: '20px',
                    background: colors.primary,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.text.inverse,
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: 'var(--spacing-md)',
                  textAlign: 'center'
                }}>
                  🏠
                </div>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginBottom: 'var(--spacing-sm)',
                  color: productType === 'normal' ? colors.primary : colors.text.primary,
                  textAlign: 'center'
                }}>
                  Normal Product
                </h4>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  lineHeight: '1.4'
                }}>
                  Add to home page with automatic price dropping over time
                </p>
              </div>

              {/* Auction Product Option */}
              <div 
                className="product-type-option"
                style={{
                  padding: 'var(--spacing-lg)',
                  background: productType === 'auction' 
                    ? colors.productTypes.auction.background
                    : colors.background.card,
                  borderRadius: 'var(--radius-lg)',
                  border: `3px solid ${productType === 'auction' ? colors.success : colors.border.color}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  boxShadow: productType === 'auction' 
                    ? colors.productTypes.auction.shadow
                    : colors.shadows.sm,
                  transform: productType === 'auction' ? 'scale(1.02)' : 'scale(1)',
                  zIndex: productType === 'auction' ? '2' : '1'
                }}
                onClick={() => setValue('product_type', 'auction')}
              >
                <input
                  type="radio"
                  id="product_type_auction"
                  value="auction"
                  {...register('product_type', { required: 'Please select a product type' })}
                  style={{
                    position: 'absolute',
                    top: 'var(--spacing-md)',
                    right: 'var(--spacing-md)',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                  }}
                />
                {productType === 'auction' && (
                  <div style={{
                    position: 'absolute',
                    top: 'var(--spacing-md)',
                    right: 'var(--spacing-md)',
                    width: '20px',
                    height: '20px',
                    background: colors.success,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.text.inverse,
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: 'var(--spacing-md)',
                  textAlign: 'center'
                }}>
                  🏆
                </div>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginBottom: 'var(--spacing-sm)',
                  color: productType === 'auction' ? colors.success : colors.text.primary,
                  textAlign: 'center'
                }}>
                  Auction Product
                </h4>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  lineHeight: '1.4'
                }}>
                  Add to auction rooms for competitive bidding (10-minute sessions)
                </p>
              </div>
            </div>
            
            {errors.product_type && <span className="error" style={{ display: 'block', textAlign: 'center', marginTop: 'var(--spacing-md)' }}>{errors.product_type.message}</span>}
            
            <div style={{
              padding: 'var(--spacing-lg)',
              background: colors.productTypes.normal.background,
              borderRadius: 'var(--radius-lg)',
              border: `2px solid ${colors.productTypes.normal.border}`,
              boxShadow: colors.shadows.sm,
              marginTop: 'var(--spacing-lg)'
            }}>
              <div style={{ 
                fontSize: '1rem', 
                color: colors.text.primary,
                lineHeight: '1.6',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                <span style={{ 
                  color: colors.primary, 
                  fontWeight: '700',
                  fontSize: '1.1rem'
                }}>
                  ℹ️ Note:
                </span>
                <br />
                <span style={{ 
                  color: colors.text.primary,
                  marginTop: 'var(--spacing-sm)',
                  display: 'inline-block'
                }}>
                  Choose <strong style={{ color: colors.primary }}>"Normal Product"</strong> for home page with price dropping, or <strong style={{ color: colors.success }}>"Auction Product"</strong> for competitive bidding rooms.
                </span>
              </div>
            </div>
          </div>

          <input type="hidden" {...register('existingImage')} />

          <button 
            type="submit" 
            className="submit-btn animate-pulse" 
            disabled={isLoading}
            style={{ 
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <>
                <span>⏳</span> {editId ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              <>
                <span>{editId ? '✏️' : '➕'}</span> {editId ? 'Update Product' : 'Add Product'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}