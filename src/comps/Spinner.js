import React from 'react';

export const Spinner = ({ size }) => {
  const fontSize = size === 'large' ? '35px' : '22px';
  return (
    <div className="spinner" style={{ fontSize, lineHeight: fontSize }}>
      {'🌀'}
    </div>
  );
};
