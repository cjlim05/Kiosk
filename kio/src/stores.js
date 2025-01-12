import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./stores.css";
import axios from "axios";

const Stores = () => {
  const [shops, setShops] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(0);

  // Fetch initial data and more data
  const fetchShops = async (pageNumber) => {
    try {
      const response = await axios.get(`/api/shops?page=${pageNumber}`);
      const data = response.data;
      setShops((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching shops: ", error);
    }
  };

  useEffect(() => {
    fetchShops(0); // Load initial data
  }, []);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    fetchShops(nextPage);
    setPage(nextPage);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((fav) => fav !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <div className="stores">
      <header className="search-header">
        <input type="text" placeholder="Search shops..." className="search-bar" />
      </header>
      <InfiniteScroll
        dataLength={shops.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        className="shop-list"
      >
        {shops.map((shop) => (
          <div key={shop.id} className="shop-card">
            <img src={shop.image} alt={shop.name} className="shop-image" />
            <div className="shop-info">
              <h3>{shop.name}</h3>
              <p>{shop.address}</p>
            </div>
            <button
              className={`favorite-btn ${favorites.includes(shop.id) ? "favorited" : ""}`}
              onClick={() => toggleFavorite(shop.id)}
            >
              ❤️
            </button>
          </div>
        ))}
      </InfiniteScroll>
      <footer className="footer-fixed">
        <nav className="bottom-nav">
          <a href="/search" className="nav-item">
            🔍
          </a>
          <a href="/favorites" className="nav-item">
            ❤️
          </a>
          <a href="/account" className="nav-item">
            👤
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Stores;