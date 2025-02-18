import React, { useState, useEffect } from "react";
import styled from "styled-components";

// ✅ Progress Bar 컨테이너 (width를 props로 받아 반응형 조정)
const ProgressBarContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px; /* ✅ 동적으로 width 적용 */
  background-color: #f0f0f0;
  height:20px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

// ✅ Progress Bar 채우기 부분
const ProgressBarFill = styled.div<{ fillWidth: number }>`
  height: 100%;
  width: ${(props) => props.fillWidth}%;
  background: linear-gradient(to right, #F0807F, #ffa07a);
  transition: width 0.3s ease-in-out;
  border-radius: 10px;
`;

const MypageContentMiddle: React.FC<{ totalSugar: number; gendersugar: number }> = ({ totalSugar, gendersugar }) => {
  const sugarPercentage = Math.min((totalSugar / gendersugar) * 100, 100); // ✅ 최대 100% 제한
  const [containerWidth, setContainerWidth] = useState(0);

  // ✅ 화면 크기 감지하여 width 80%로 설정
  useEffect(() => {
    const updateWidth = () => {
      setContainerWidth(Math.min(window.innerWidth * 0.8, 345)); // ✅ 화면 크기의 80% & 최대 345px
    };
    updateWidth(); // 초기값 설정
    window.addEventListener("resize", updateWidth); // 화면 크기 변경 감지
    return () => window.removeEventListener("resize", updateWidth); // 클린업
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <ProgressBarContainer width={containerWidth}>
        <ProgressBarFill fillWidth={sugarPercentage} />
      </ProgressBarContainer>
    </div>
  );
};

export default MypageContentMiddle;
