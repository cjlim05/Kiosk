import React, { useState } from 'react';
import Coffee from './Coffee';
import Dessert from './Dessert';
import Cart from './Cart';
import './menu.css';
import { useLocation } from 'react-router-dom';

export default function Menu() {
    const [selectedMenu, setSelectedMenu] = useState('coffee');
    const [cart, setCart] = useState(new Map()); // 초기 상태를 Map으로 설정 새로운 map 설정을 하지않으면 충돌오 오류 발생
    const [isCartOpen, setIsCartOpen] = useState(false);
    const location = useLocation();
    const { username } = location.state || {};

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const newCart = new Map(prevCart); // 상태 복사
            const productName = product.name;
    
            if (newCart.has(productName)) {
                const existingProduct = newCart.get(productName);
                existingProduct.quantity += 1;
            } else {
                newCart.set(productName, { ...product, quantity: 1 });
            }
            return newCart; // 새로운 Map 반환
        });
    };
    

    const toggleCart = () => {
        setIsCartOpen((prevState) => !prevState);
    };

    return (
        <div className="main">
            <div className="menus">
                <div className="username">{username}님 환영합니다!</div>
                <div className="menus-click">
                    <p onClick={() => handleMenuClick('coffee')}>커피</p>
                    <p onClick={() => handleMenuClick('dessert')}>디저트</p>
                </div>
                <div className="menu-list">
                    {selectedMenu === 'coffee' && <Coffee addToCart={addToCart} />}
                    {selectedMenu === 'dessert' && <Dessert addToCart={addToCart} />}
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
}
