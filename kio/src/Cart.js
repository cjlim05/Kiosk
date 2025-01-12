import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './cart.css';

const Cart = ({ cart, setCart }) => {
    const location = useLocation();
    const { tableNumber } = location.state || {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleQuantityChange = (name, newQuantity) => {
        setCart((prevCart) => {
            const newCart = new Map(prevCart);
            if (newCart.has(name)) {
                const menu = newCart.get(name);
                if (newQuantity > 0) {
                    menu.quantity = newQuantity;
                } else {
                    menu.quantity = 1;
                }
            }
            return newCart;
        });
    };

    const deleteMenu = (name) => {
        setCart((prevCart) => {
            const newCart = new Map(prevCart);
            newCart.delete(name);
            return newCart;
        });
    };

    const sendOrder = async () => {
        const orderData = Array.from(cart.values()).map((menu) => ({
            tableNumber: tableNumber,
            itemName: menu.name,
            quantity: menu.quantity,
            price: menu.price,
        }));

        try {
            const response = await axios.post("http://localhost:8080/api/orders", orderData);
            alert("주문이 완료되었습니다!");
            setCart(new Map());
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
            alert("주문 중 오류가 발생했습니다.");
        }
    };

    let totalCost = 0;

    return (
        <div className="cart-container">
            <h2>장바구니</h2>
            <div className="table-number">{tableNumber}번 테이블</div>
            <div className="cart-list-container">
                <ul className="cart-list">
                    {Array.from(cart.values()).map((menu) => {
                        const cost = menu.price * menu.quantity;
                        totalCost += cost;
                        return (
                            <li key={menu.id} className="cart-item">
                                {menu.name} - {menu.price}원 x {menu.quantity}
                                <button onClick={() => handleQuantityChange(menu.name, menu.quantity + 1)} className="cart-button">+</button>
                                <button onClick={() => handleQuantityChange(menu.name, menu.quantity - 1)} className="cart-button">-</button>
                                <span className="cart-cost">{cost}원</span>
                                <button onClick={() => deleteMenu(menu.name)} className="delete-button">X</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="cart-summary">
                <p>-----------------------------------------------------------</p>
                <p>총액: ₩{totalCost}</p>
            </div>
            <div className="order-buttons">
                <button onClick={() => setCart(new Map())} className="clear-cart-button">장바구니 비우기</button>
                <button onClick={() => setIsModalOpen(true)} className="checkout-button">결제하기</button>
            </div>

            {/* 모달 */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>주문 내역 확인</h2>
                        <ul>
                            {Array.from(cart.values()).map((menu) => (
                                <li key={menu.name}>
                                    {menu.name} - ₩{menu.price} x {menu.quantity}
                                </li>
                            ))}
                        </ul>
                        <p>총액: ₩{totalCost}</p>
                        <div className="modal-buttons">
                            <button onClick={() => setIsModalOpen(false)} className="modal-button">취소</button>
                            <button onClick={sendOrder} className="modal-button">결제하기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
