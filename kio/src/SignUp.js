import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link 컴포넌트 추가
import './signup.css'; // 스타일을 추가해 주세요


const SignUp = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 요청을 보내기 전 에러 초기화
    setError('');
    setSuccess('');

    try {
      console.log('회원가입 전송 데이터:', username, password);
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        setSuccess('회원가입 성공! 로그인 페이지로 이동합니다.');
      } else {
        const errorData = await response.json();
        console.error('회원가입 실패:', errorData.message);
        setError(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('서버와 통신 중 오류 발생:', error);
      setError('서버와 통신하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <label htmlFor="username">테이블 번호</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
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
        <div className="input-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            placeholder="비밀번호를 다시 입력하세요"
          />
          <div>
          <Link to="/login">로그인</Link> {/* 회원가입 링크 추가 */}
        </div>
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit" className="button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
