import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./stores.css";
import axios from "axios";
import { Link } from 'react-router-dom';

// 하트 UI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const Stores = () => {
  const [favorites, setFavorites] = useState([]); // 즐겨찾기 상태
  const [stores, setStores] = useState([]); // 매장 목록 상태
  const [page, setPage] = useState(1); // 페이지네이션 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  // 초기 데이터 로딩
  useEffect(() => {
    fetchStores();
    checkSession(); // 세션 확인
  }, []);

  // 세션 확인 및 생성
  const checkSession = () => {
    axios
      .get("http://localhost:8080/api/session", { withCredentials: true })
      .then((response) => {
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          setFavorites(response.data.favorites || []);
        }
      })
      .catch((error) => {
        console.error("세션 확인 실패:", error);
      });
  };

  // 매장 정보 가져오기
  const fetchStores = (page = 1, query = "") => {
    axios
      .get(`http://localhost:8080/api/store?page=${page}&query=${query}`)
      .then((response) => {
        if (page === 1) {
          setStores(response.data);
        } else {
          setStores((prevStores) => [...prevStores, ...response.data]);
        }
        setPage(page + 1);
        if (response.data.length === 0) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // 추가 데이터 불러오기
  const fetchMoreData = () => {
    fetchStores(page, searchQuery);
  };

  // 즐겨찾기 토글 (세션과 연동)
  const toggleFavorite = (id) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }

      // 세션 업데이트
      axios
        .post("http://localhost:8080/api/session/favorites", 
          { favorites: [...newFavorites] },
          { withCredentials: true }
        )
        .catch((error) => {
          console.error("즐겨찾기 업데이트 실패:", error);
        });

      return [...newFavorites];
    });
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 실행
  const handleSearchSubmit = () => {
    setPage(1);
    setHasMore(true);
    fetchStores(1, searchQuery);
  };

  return (
    <div className="stores">
      <header className="search-header">
        <input
          type="text"
          placeholder="Search stores..."
          className="search-bar"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearchSubmit}>
          🔍
        </button>
      </header>
      <InfiniteScroll
        dataLength={stores.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more stores to load.</p>}
        className="shop-list"
      >
        {stores.map((shop) => (
          <div key={shop.storeId} className="shop-card">
            <Link to={`/store/${shop.storeId}`} className="shop-link">
              <img
                src={shop.logoImg || "https://via.placeholder.com/150"}
                alt={shop.storeName}
                className="shop-image"
              />
              <div className="shop-info">
                <h3>{shop.storeName}</h3>
                <p>{shop.detailAddress}</p>
              </div>
            </Link>
            <button
              className="favorite-btn"
              onClick={() => toggleFavorite(shop.storeId)}
            >
              <FontAwesomeIcon
                icon={favorites.includes(shop.storeId) ? solidHeart : regularHeart}
                color={favorites.includes(shop.storeId) ? "red" : "#ccc"}
              />
            </button>
          </div>
        ))}
      </InfiniteScroll>
      <footer className="footer-fixed">
        <nav className="bottom-nav">
          <a href="/search" className="nav-item">🔍</a>
          <a href="/favorites" className="nav-item">❤️</a>
          <a href="/account" className="nav-item">👤</a>
        </nav>
      </footer>
    </div>
  );
};

export default Stores;
