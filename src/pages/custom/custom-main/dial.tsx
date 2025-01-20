import React, { useState } from "react";
import styled from "styled-components";

const DialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DialSvg = styled.svg`
  width: 200px;
  height: 200px;
`;

const Dial: React.FC = () => {
  const [value, setValue] = useState(0);
  const [realvalue,setRealvalue] = useState(0);
  const convertToRealValue = (newValue: number): number => {
    const mapping: Record<number, number> = {
      "-3": 0,
      "-2": 1,
      "-1": 2,
      0: 3,
      1: -3,
      2: -2,
      3: -1,
    };
    return mapping[newValue];
  };
  const handleRotate   = (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = event.clientX - rect.left - centerX;
    const y = event.clientY - rect.top - centerY;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90; // 각도 계산
    const normalizedAngle = angle < 0 ? angle + 360 : angle;

    // 0~300도 범위를 -3 ~ 3 값으로 변환
    const newValue = Math.round((normalizedAngle / 300) * 6) - 3 > 3? 3 : Math.round((normalizedAngle / 300) * 6) - 3;
    
    setValue(newValue);
    setRealvalue(convertToRealValue(newValue));
    
  };

  return (
    <DialContainer>
      <DialSvg viewBox="-60 -60 220 220" onMouseMove={handleRotate}>
      <defs>
        <filter id="shadow">
            <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>
        {/* 다이얼 배경 */}
        <circle cx="50" cy="50" r="74" fill="#722a2a" filter="url(#shadow)"/>
        {/* 다이얼 테두리 */}
        <circle cx="50" cy="50" r="80" fill="none" stroke="#8b0000" strokeWidth="1" />

        {/* 다이얼 핸들 */}
        <line
      x1={`${50 + 50 * Math.cos(((value + 3) * 50 - 90) * (Math.PI / 180))}`} // 가장자리 시작
      y1={`${50 + 50 * Math.sin(((value + 3) * 50 - 90) * (Math.PI / 180))}`} // 가장자리 시작
      x2={`${50 +76 * Math.cos(((value + 3) * 50 - 90) * (Math.PI / 180))}`} // 안쪽으로 더 길게 설정
      y2={`${50 + 76 * Math.sin(((value + 3) * 50 - 90) * (Math.PI / 180))}`} // 안쪽으로 더 길게 설정
      stroke="white"
      strokeWidth="5"
      strokeLinecap="round"
    />
     {[...Array(7)].map((_, i) => {
      const angle = (i - 3) * 50; // -3부터 3까지 각도 계산
      const x = 50 + 100 * Math.cos((angle - 90) * (Math.PI / 180)); // 숫자의 x 좌표
      const y = 50 + 100 * Math.sin((angle - 90) * (Math.PI / 180)); // 숫자의 y 좌표

      return (
        <text
          key={i}
          x={x}
          y={y}
          fill="black"
          fontSize="20"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${angle} ${x} ${y})`} // 숫자를 해당 각도로 회전
        >
          {i - 3}
        </text>
      );
    })}
      </DialSvg>
    </DialContainer>
  );
};

export default Dial;
