import React from 'react';
import { login } from './apiService'; // API 호출 함수 import

const LoginButton = () => {
  return (
    <button onClick={login}>로그인</button> // 클릭 시 로그인 함수 호출
  );
};

export default LoginButton;
