import React, { useEffect, useState } from 'react';
import './menus.css'; // 공통 CSS 임포트

const Coffee = ({ addToCart }) => {
    const [menus, setmenus] = useState([]); // 커피 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태


    //페이징

    const[currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    const totalPages = Math.ceil(menus.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMenus = menus.slice(startIndex, endIndex); 

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };


    useEffect(() => {
        fetch('http://localhost:8080/api/coffee') // Spring Boot API 호출
            .then((response) => response.json())
            .then((data) => {
                setmenus(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching coffee data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="menu-container">
          <h1>커피 메뉴</h1>
          <ul className="menu-list">
          {currentMenus.map((menu) => (
            <li key={menu.name} onClick={() => addToCart(menu)} className="menu-item">
              <div className="menu-image-container">
                <img src={`/images/beverage/${menu.imagefile}`} alt={menu.name} />
              </div>
              <div className="menu-info">
                <p className="menu-name">{menu.name}</p>
                <p className="menu-price">{menu.price}원</p>
              </div>
            </li>
          ))}
        </ul>

    
          {/* 페이지네이션 버튼 */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                style={{
                  margin: "5px",
                  backgroundColor: currentPage === pageNumber ? "lightblue" : "lightgray",
                }}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      );
    };

export default Coffee;
