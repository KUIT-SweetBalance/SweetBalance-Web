import React, { useState } from "react";
import styled from "styled-components";

// Progress Bar 컨테이너
const ProgressBarContainer = styled.div`
  width: 300px;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

// Progress Bar의 채우기 부분
const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #F0807F, #ffa07a);
  transition: width 0.3s ease-in-out;
  border-radius: 10px;
`;


const MypageContentMiddle: React.FC = () => {
  const [value, setValue] = useState(50); // 초기값 50%

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(Number(e.target.value));
//     // 스타일을 직접 DOM에 반영
//    
//   };
const bar = document.getElementById("progress-bar");
    if (bar) {
      bar.style.width = `${value}%`;
    }
  return (
    <div>
      <ProgressBarContainer>
        {/* 채우기 부분에 클래스 대신 DOM 스타일 조작 */}
        <ProgressBarFill id="progress-bar" />
      </ProgressBarContainer>
    
    </div>
  );
};


export default MypageContentMiddle;