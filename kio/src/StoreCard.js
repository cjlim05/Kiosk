// StoreCard.js
import React from 'react';

const StoreCard = ({ shop, onToggleFavorite, isFavorited }) => {
  return (
    <div className="shop-card">
      <img src={shop.image} alt={shop.store_name} className="shop-image" />
      <div className="shop-info">
        <h3>{shop.store_name}</h3>
        <p>{shop.address}</p>
      </div>
      <button
        className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
        onClick={() => onToggleFavorite(shop.store_id)}
      >
        ❤️
      </button>
    </div>
  );
};

export default StoreCard;
