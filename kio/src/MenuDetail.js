import React, { useEffect, useState } from 'react';
import './menus.css';

const MenuDetail = ({ addToCart, selectedCategory }) => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch('http://localhost:8080/api/menu') // API에서 메뉴 데이터 가져오기
            .then((response) => response.json())
            .then((data) => {
                setMenus(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching menu data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    const handleMenuClick = (category) => {
        // 부모 컴포넌트에서 받아온 selectedCategory를 업데이트하는 로직은 필요하지 않음
        // 부모에서 해당 상태를 관리하고 있기 때문
    };

    // 선택된 카테고리에 따라 필터링
    const filteredMenus = menus.filter(menu => menu.category === selectedCategory);

    // 페이징 처리
    const totalPages = Math.ceil(filteredMenus.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMenus = filteredMenus.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="main">
            <div className="menus">
                <div className="menus-click">
                    <p onClick={() => handleMenuClick('coffee')}>커피</p>
                    <p onClick={() => handleMenuClick('dessert')}>디저트</p>
                </div>
                <div className="menu-list">
                    {currentMenus.map(menu => (
                        <div key={menu.menu_id} className="menu-item">
                            <h3>{menu.menu_name}</h3>
                            <p>{menu.description}</p>
                            <p>{menu.price}원</p>
                            <button onClick={() => addToCart(menu)}>장바구니에 담기</button>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuDetail;
