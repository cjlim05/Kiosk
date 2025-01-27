import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signup.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationCodeInput, setShowVerificationCodeInput] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailVerificationMessage, setEmailVerificationMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(0); // 타이머 남은 시간

  const navigate = useNavigate();

  // 타이머 관리
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && showVerificationCodeInput) {
      setShowVerificationCodeInput(false);
      setEmailVerificationMessage('인증 코드 입력 시간이 초과되었습니다. 다시 시도해주세요.');
    }
  }, [timeLeft, showVerificationCodeInput]);

  // 이메일 인증 요청
  const emailVerify = async () => {
    if (!email) {
      setEmailVerificationMessage('이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setShowVerificationCodeInput(true);
        setTimeLeft(300); // 타이머를 5분으로 설정
      } else {
        const errorData = await response.json();
        setEmailVerificationMessage(`이메일 인증 실패: ${errorData.message}`);
        setShowVerificationCodeInput(false);
      }
    } catch (error) {
      setEmailVerificationMessage('서버와 통신하는 중 오류가 발생했습니다.');
      setShowVerificationCodeInput(false);
    }
  };

  // 인증 코드 검증
  const verifyCode = async () => {
    if (!email || !verificationCode) {
      setEmailVerificationMessage('인증번호를 다시 확인해주세요');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          code: verificationCode,
        }),
      });

      if (response.ok) {
        setEmailVerificationMessage('인증이 성공적으로 완료되었습니다.');
        setShowVerificationCodeInput(false); 
        setEmailVerified(true);
      } else {
        const errorData = await response.json();
        setEmailVerificationMessage(`인증 실패: ${errorData.message}`);
        setEmailVerified(false);
      }
    } catch (error) {
      setEmailVerificationMessage('서버와 통신하는 중 오류가 발생했습니다.');
      setEmailVerified(false);
    }
  };

  // 회원가입 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userid || !username || !password || !confirmPassword || !email) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (!emailVerified) {
      setError('이메일 인증을 완료해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          userid,
          password,
          email,
        }),
      });

      if (response.ok) {
        setSuccess('회원가입 성공! 로그인 페이지로 이동합니다.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorData = await response.json();
        setError(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      setError('서버와 통신하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <label htmlFor="userid">이름</label>
          <input
            type="text"
            id="userid"
            value={userid}
            onChange={(e) => setUserId(e.target.value)}
            className="input"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="아이디를 입력하세요"
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
        </div>
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <button type="button" onClick={emailVerify} className="verify-button">
          이메일 인증하기
        </button>
        {showVerificationCodeInput && (
          <>
            <div className="input-group">
              <label htmlFor="verificationCode">인증 코드</label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="input"
                placeholder="인증 코드를 입력하세요"
              />
            </div>
            <button type="button" onClick={verifyCode} className="verify-button">
              인증 코드 확인
            </button>
            <div className="timer">
              남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
              <br />
              인증코드를 확인해주세요
            </div>
          </>
        )}
        {emailVerificationMessage && <div className="message">{emailVerificationMessage}</div>}
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit" className="submit-button">
          회원가입
        </button>
        <Link to="/login" className="signup-link">로그인으로 돌아가기</Link>
      </form>
    </div>
  );
};

export default SignUp;
