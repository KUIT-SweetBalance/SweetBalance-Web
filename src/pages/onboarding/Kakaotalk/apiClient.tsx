import axios from "axios";
import React from "react";
import styled from "styled-components";
/**
 * @description 백엔드에서 URL을 받아 리디렉션 처리
 */
const Button = styled.button`

background-color: #fee500;
color: #3c1e1e;
border: none;
border-radius: 5px;
padding: 10px 20px;
font-size: 16px;
cursor: pointer;
&:hover {
  background-color: #ffd700;
}`;
const RedirectButton: React.FC = () => {
  /**
   * @description Axios를 이용해 백엔드로 GET 요청을 보내고 URL로 리디렉션
   */
  const handleRedirect = async (): Promise<void> => {
    try {
      // Axios GET 요청
      const response = await axios.get<{ url: string }>("http://localhost:3001/api/redirect", {
        withCredentials: true, // 쿠키 포함 (필요시)
      });
      
      // 응답에서 URL 추출 및 리디렉션
      if (response.data.url) {
        window.location.href = response.data.url; // 해당 URL로 이동
      } else {
        console.error("응답에 URL이 없습니다.");
      }
    } catch (error) {
      console.error("GET 요청 오류:", error);
      alert("요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <Button onClick={handleRedirect}>
      로그인 요청
    </Button>
  );
};

export default RedirectButton;


// import React from "react";
// import styled from "styled-components";

// // 스타일드 컴포넌트로 버튼 정의
// const Button = styled.a`
//   display: inline-block;
//   text-align: center; 
//   text-decoration: none;
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
//   return (
//     // href에 백엔드 리디렉션 엔드포인트 설정
//     <Button href="http://localhost:3001/api/redirect">
//       로그인 요청
//     </Button>
//   );
// };

// export default RedirectButton;
