// import axios from "axios";
// import React from "react";
// import styled from "styled-components";

// // 스타일드 컴포넌트로 버튼 정의
// const Button = styled.button`
//   display: inline-block;
//   text-align: center;
//   background-color: #fee500;
//   color: #3c1e1e;
//   border: none;
//   border-radius: 5px;
//   padding: 10px 20px;
//   font-size: 16px;
//   cursor: pointer;

//   &:hover {
//     background-color: #ffd700;
//   }
// `;

// const RedirectButton: React.FC = () => {
//   /**
//    * @description Axios를 이용해 백엔드로 GET 요청
//    */
//   const handleRedirect = async (): Promise<void> => {
//     try {
//       // Axios GET 요청
//       const response = await axios.get("http://13.209.98.76:8080/oauth2/authorization/kakao", {
//         withCredentials: true, // 쿠키 포함 여부
//       });

//       // 서버가 리디렉션 URL을 반환하는 경우
//       if (response.status === 302 && response.data.url) {
//         console.log("리디렉션 URL:", response.data.url);
//         window.location.href = response.data.url; // 리디렉션
//       } else {
//         console.error("응답에 URL이 없습니다.");
//         alert("요청이 성공했지만 URL이 없습니다.");
//       }
//     } catch (error) {
//       console.error("GET 요청 오류:", error);
//       alert("요청 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <Button onClick={handleRedirect}>
//       로그인 요청
//     </Button>
//   );
// };

// export default RedirectButton;

import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import kakao_logo from '../../../assets/onboarding/kakao_logo.svg';

// Axios 기본 설정
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://13.209.98.76:8080';

// // 요청을 보낼 때마다 쿠키가 포함됨
// const response = await axios.get("");

// 스타일드 컴포넌트로 버튼 정의
const Button = styled.a`
  width: 300px;
  height: 45px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  text-decoration: none;
  background-color: #fee500;
  color: #3c1e1e;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  // padding: 20px 30px;
  cursor: pointer;
  // margin-left: 40px;
  // margin-top: 20px;
  // margin-bottom: 20px;
  &:hover {
    background-color: #ffd700;
  }
`;

const RedirectButton: React.FC = () => {
  return (
    // href에 백엔드 리디렉션 엔드포인트 설정
    <Button href="https://13.125.187.188.nip.io/oauth2/authorization/kakao">
      <img className={`w-5 h-5 pr-1`} src={kakao_logo} alt="kakao_logo" />
      카카오 로그인
    </Button>
    // 리이슈에 대한 응답
  );
};

export default RedirectButton;
