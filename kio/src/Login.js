import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login/status", {
        method: "GET",
        credentials: "include", // 세션 유지
      });

      const data = await response.json();
      console.log("세션 상태:", data);

      if (data.loggedIn) {
        console.log(`현재 로그인된 사용자: ${data.user}`);
        navigate("/stores", { state: { username: data.user } });
      }
    } catch (error) {
      console.error("세션 확인 오류:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    setError("");

    try {
      console.log("전송 데이터:", username, password);
      
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 세션 유지
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem("username", username);
        navigate("/stores", { state: { username } });
      } else {
        let errorData;
        try {
          errorData = await response.json();
        } catch (err) {
          errorData = { message: "서버 오류 발생" };
        }
        console.error("로그인 실패:", errorData.message);
        setError(`로그인 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
      setError("서버와 통신하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <h2>정보입력</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="username">테이블 번호</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div>
          <Link to="/signup">회원가입</Link>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="button">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
