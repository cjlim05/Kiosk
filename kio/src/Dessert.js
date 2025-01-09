import React, { useEffect, useState } from 'react';
import './menus.css'; // 공통 CSS 임포트

const Dessert = ({ addToCart }) => {
    const [desserts, setDesserts] = useState([]); // 디저트 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 페이징 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 개수

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(desserts.length / itemsPerPage);

    // 현재 페이지에 해당하는 데이터 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDesserts = desserts.slice(startIndex, endIndex); // 현재 페이지에 해당하는 디저트 데이터

    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 디저트 데이터 불러오기
    useEffect(() => {
        fetch('http://localhost:8080/api/dessert') // 디저트 API 호출
            .then((response) => response.json())
            .then((data) => {
                setDesserts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching dessert data:', error);
                setLoading(false);
            });
    }, []);

    // 로딩 상태 처리
    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="menu-container">
            <h1>디저트 메뉴</h1>
            <ul className="menu-list">
                {/* 현재 페이지의 디저트 데이터만 렌더링 */}
                {currentDesserts.map((dessert) => (
                    <li
                        key={dessert.id}
                        onClick={() => addToCart(dessert)}  
                    >
                        {dessert.name} - ₩{dessert.price}
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
                            color: currentPage === pageNumber ? "white" : "black",
                        }}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dessert;
