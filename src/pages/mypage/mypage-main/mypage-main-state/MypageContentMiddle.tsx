import React from "react";
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
const ProgressBarFill = styled.div<{ width: number }>`
  height: 100%;
  width: ${(props) => props.width}%;
  background: linear-gradient(to right, #F0807F, #ffa07a);
  transition: width 0.3s ease-in-out;
  border-radius: 10px;
`;

const MypageContentMiddle: React.FC<{ totalSugar: number;gendersugar:number }> = ({ totalSugar,gendersugar }) => {
  const sugarPercentage = Math.min(totalSugar * (100/gendersugar), 100); // ✅ 최대 100% 제한

  return (
    <div>
      <ProgressBarContainer>
        {/* ✅ width를 props로 전달하여 Styled Components에서 반영 */}
        <ProgressBarFill width={sugarPercentage} />
      </ProgressBarContainer>
    </div>
  );
};

export default MypageContentMiddle;
