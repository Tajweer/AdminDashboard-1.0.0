import React from 'react';
import CurrencyIcon from '../components/CurrencyIcon';

export const formatPrice = (price, showIcon = true, size = 16) => {
  const formattedPrice = parseFloat(price || 0).toFixed(2);
  
  if (showIcon) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        <CurrencyIcon size={size} />
        {formattedPrice}
      </span>
    );
  }
  
  return formattedPrice;
};

export const formatPriceText = (price) => {
  return parseFloat(price || 0).toFixed(2);
};
