import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './menus.css';
import Cart from './Cart';

const MenuDetail = ({ addToCart, selectedCategory, setSelectedCategory }) => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 장바구니 상태
    const [cart, setCart] = useState(new Map()); 
    const [isCartOpen, setIsCartOpen] = useState(false);
    const location = useLocation();

    // 메뉴 데이터 가져오기
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/api/menu?category=${selectedCategory || ''}`)
            .then((response) => response.json())
            .then((data) => {
                setMenus(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching menu data:', error);
                setLoading(false);
            });
    }, [selectedCategory]);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    // 페이지네이션 처리
    const totalPages = Math.ceil(menus.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMenus = menus.slice(startIndex, endIndex);

    // 카테고리 변경 핸들러
    const handleMenuClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    // 장바구니 추가하기
    const addToCartHandler = (product) => {
        setCart((prevCart) => {
            const newCart = new Map(prevCart);
            const productName = product.menu_name;
    
            if (newCart.has(productName)) {
                const existingProduct = newCart.get(productName);
                newCart.set(productName, { ...existingProduct, quantity: existingProduct.quantity + 1 });
            } else {
                newCart.set(productName, { ...product, quantity: 1 });
            }
            return newCart;
        });
    };

    // 장바구니 토글
    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    return (
        <div className="main">
            <div className="menus">
                <div className="menus-click">
                    <p onClick={() => handleMenuClick('coffee')}>커피</p>
                    <p onClick={() => handleMenuClick('dessert')}>디저트</p>
                </div>
                <ul className="menu-list">
                    {currentMenus.map((menu) => (
                        <li key={menu.menu_name} onClick={() => addToCartHandler(menu)} className="menu-item">
                            <div className="menu-image-container">
                                <img src={`/images/beverage/${menu.imagefile}`} alt={menu.menu} />
                            </div>
                            <div className="menu-info">
                                <p className="menu-name">{menu.menu_name}</p>
                                <p className="menu-price">{menu.price}원</p>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* 페이지네이션 */}
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
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
            
            {/* 슬라이드 가능한 장바구니 */}
            <div className={`cart ${isCartOpen ? 'open' : ''}`}>
                <Cart cart={cart} setCart={setCart} />
            </div>

            {/* 장바구니 토글 버튼 */}
            <div className="cart-toggle" onClick={toggleCart}>
                {isCartOpen ? '장바구니 닫기' : '장바구니 열기'}
            </div>
        </div>
    );
};

export default MenuDetail;
