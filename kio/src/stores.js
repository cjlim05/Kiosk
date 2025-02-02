import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./stores.css";
import axios from "axios";
import { Link } from 'react-router-dom';


//하트 ui
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";


const Stores = () => {
  const [favorites, setFavorites] = useState([]); // 즐겨찾기 상태
  const [stores, setStores] = useState([]); // 매장 목록 상태
  const [page, setPage] = useState(1); // 페이지네이션 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

  // 초기 데이터 로딩
  useEffect(() => {
    fetchStores();
  }, []);

  // 매장 정보 가져오기
  const fetchStores = (page = 1, query = "") => {
    axios
      .get(`http://localhost:8080/api/store?page=${page}&query=${query}`)
      .then((response) => {
        if (page === 1) {
          setStores(response.data); // 초기 데이터 설정
        } else {
          setStores((prevStores) => [...prevStores, ...response.data]); // 추가 데이터 설정
        }
        setPage(page + 1); // 다음 페이지로 업데이트
        if (response.data.length === 0) {
          setHasMore(false); // 더 불러올 데이터가 없음
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

  // 즐겨찾기 토글
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return [...newFavorites];
    });
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 실행
  const handleSearchSubmit = () => {
    setPage(1); // 페이지 초기화
    setHasMore(true); // 더 불러올 데이터가 있다고 가정
    fetchStores(1, searchQuery); // 검색어로 초기 데이터 로딩
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