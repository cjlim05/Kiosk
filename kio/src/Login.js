import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import './login.css'; // 공통 CSS 임포트

const LoginPage = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // navigate 함수 초기화


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tableNumber || !password) {
      setError('모든 필드를 입력해주세요.');
      setSuccess('');
      return;
    }

    // 요청을 보내기 전 에러 초기화
    setError('');
    setSuccess('');

    try {
      console.log('전송 데이터:', tableNumber, password);
      // Fetch API를 사용하여 백엔드로 요청 전송
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 전송
        },
        body: JSON.stringify({
          tableNumber,
          password,
        }),
      });
      // 응답 처리
      if (response.ok) {
        navigate("/", { state: { tableNumber } });  //테이블 값 파라이미터 값으로 넘김
      } else {
        const errorData = await response.json();
        console.error('로그인 실패:', errorData.message);
        setError(`로그인 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('요청 중 오류 발생:', error);
      setError('서버와 통신하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-container">
      <h2>정보입력</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="tableNumber">테이블 번호</label>
          <input
            type="text"
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="input"
            placeholder="테이블 번호를 입력하세요"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit" className="button">
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
