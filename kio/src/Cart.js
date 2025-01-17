import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './cart.css';

const Cart = ({ cart, setCart }) => {


    // 테이블 번호값 가져오기 
    const location = useLocation();
    const { tableNumber } = location.state || {};

    // modal 사용하기
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가


    // 수량 조정하기
    const handleQuantityChange = (menuName, newQuantity) => {
        setCart((prevCart) => {
            const newCart = new Map(prevCart);
            if (newCart.has(menuName)) {
                const menu = newCart.get(menuName);
                if (newQuantity > 0) {
                    menu.quantity = newQuantity;
                } else {
                    menu.quantity = 1; // 최소 수량 제한
                }
            }
            return newCart;
        });
    };


    // 메뉴 삭제하기
    const deleteMenu = (name) => {
        setCart((prevCart) => {
            const newCart = new Map(prevCart); // 복사본 생성
            newCart.delete(name); // 키를 기준으로 삭제
            return newCart; // 새로운 상태 반환
        });
    };


    // 주문내역 디비로 전송하기
    const sendOrder = async () => {
        const orderData = Array.from(cart.values()).map((menu) => ({
            tableNumber: tableNumber,
            itemName: menu.name,
            quantity: menu.quantity,
            price: menu.price,
        }));

        console.log(orderData); // 확인을 위한 콘솔 출력

        try {
            const response = await axios.post("http://localhost:8080/api/orders", orderData);
            console.log(response.data);
            alert("주문이 완료되었습니다!");
            setCart(new Map()); // 주문 완료 후 장바구니 비우기
            setIsModalOpen(false); // 모달 닫기
        } catch (error) {
            console.error(error);
            alert("주문 중 오류가 발생했습니다.");
        }
    };

    let totalCost = 0;

    return (
        <div className="cart-container">
            <h2>장바구니</h2>
            <div className="table-number">{tableNumber}님의 주문내역</div>
            <div className="cart-list-container">
                <ul className="cart-list">
                    {Array.from(cart.values()).map((menu) => {
                        const cost = menu.price * menu.quantity;
                        totalCost += cost;
                        return (
                            <li key={menu.name} className="cart-item">
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
