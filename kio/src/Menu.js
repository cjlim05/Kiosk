import React, { useState } from 'react';
import Coffee from './Coffee';
import Dessert from './Dessert';
import Cart from './Cart';
import './menu.css';
import { useLocation } from 'react-router-dom';
import Draggable from 'react-draggable';  // react-draggable import

export default function Menu() {
    const [selectedMenu, setSelectedMenu] = useState('coffee'); // 기본값 설정
    const [cart, setCart] = useState([]); // 장바구니 설정
    const [isCartOpen, setIsCartOpen] = useState(false); // 장바구니 열림 상태
    const location = useLocation();
    const { tableNumber } = location.state || {};

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    // Cart에 아이템 추가 함수
    const addToCart = (product) => {
        setCart((prevCart) => {
            const newCart = new Map(prevCart); // 기존 장바구니 복사
            const productName = product.name; // 상품 고유 ID

            if (newCart.has(productName)) {
                // 상품이 이미 장바구니에 있으면 수량 증가
                const existingProduct = newCart.get(product);
                existingProduct.quantity += 1; // 수량 증가
            } else {
                // 상품이 장바구니에 없으면 새로 추가
                newCart.set(product, { ...product, quantity: 1 });
            }
            return newCart;
        });
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen); // 장바구니 열고 닫는 상태 변경
    };

    return (
        <div className="main">
            {/* 메뉴 보이는 창 */}
            <div className="menus">
                <div className="tableNumber">{tableNumber}번 테이블</div>
                <div className="menus-click">
                    <p onClick={() => handleMenuClick('coffee')}>커피</p>
                    <p onClick={() => handleMenuClick('dessert')}>디저트</p>
                </div>
                <div className="menu-list">
                    {selectedMenu === 'coffee' && <Coffee addToCart={addToCart} />}
                    {selectedMenu === 'dessert' && <Dessert addToCart={addToCart} />}
                </div>
            </div>

            {/* 드래그 가능한 장바구니 */}
            <Draggable axis="y" bounds="parent" onStop={toggleCart}>
                <div className={`cart ${isCartOpen ? 'open' : 'closed'}`}>
                    <Cart cart={cart} setCart={setCart} />
                </div>
            </Draggable>
        </div>
    );
}
