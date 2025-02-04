import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

// 슬라이더 컨테이너
const SliderContainer = styled.div`
  position: relative;
  width: 218px; /* 반원의 너비 */
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

// 기본 반원형 배경
const ArcBackground = styled.img`
  width: 218px;
  height: 103px;
  position: absolute;
  top: 0;
  left: 0;
`;

// 드래그 가능한 버튼 (반원 "안쪽"에서 이동)
const DraggableButton = styled.img`
  width: 34px; /* 버튼 크기 */
  height: 34px;
  position: absolute;
  cursor: grab;
  user-select: none;
  transform: translate(-50%, -50%);
`;

// 펌프 값 표시
const PumpValue = styled.div`
  position: absolute;
  bottom: 0px;
  font-size: 16px;
  font-weight: bold;
  color: #8b5a4b;
`;

const PumpSlider = () => {
  const [pumpValue, setPumpValue] = useState(0); // 초기 펌프 값
  const [angle, setAngle] = useState(-180); // 드래그 회전 각도 (-180 ~ 0)
  const sliderRef = useRef(null);
  const [realpumpValue, setRealPumpValue] = useState(0); // 초기 펌프 값

  const pumpimg = ['/pump-4.svg','/pump-3.svg','/pump-2.svg','/pump-1.svg','/pump.svg','/pump1.svg','/pump2.svg','/pump3.svg','/pump4.svg']
  // 버튼 위치 계산 함수 (반원 안쪽에서 이동)
  const getButtonPosition = (angle) => {
    const radius = 75.5; // 반지름 살짝 증가 → 더 넓은 범위에서 이동
    const centerX = 109; // 반원의 중심 X
    const centerY = 105; // 버튼이 조금 더 아래로 이동하도록 조정
    const radian = (angle * Math.PI) / 180;

    return {
      x: centerX + Math.cos(radian) * radius, // X 좌표 계산 (중심점 기준)
      y: centerY + Math.sin(radian) * radius, // Y 좌표 계산 (조금 더 아래쪽으로 이동)
    };
  };

  // 드래그 핸들러
  const handleDrag = (e) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height - 5; // 중심점 보정

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    // 각도 제한 (-180 ~ 0)
    if (newAngle > 0) newAngle = 0;
    if (newAngle < -180) newAngle = -180;

    setAngle(newAngle);
    setPumpValue(Math.round((newAngle + 180) / 21)>8?8:Math.round((newAngle + 180) / 21) );
    setRealPumpValue(pumpValue-4)
  };

  // 마우스 이벤트 설정
  useEffect(() => {
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseDown = () => document.addEventListener("mousemove", handleDrag);

  const { x, y } = getButtonPosition(angle);

  return (
    <SliderContainer ref={sliderRef}>
      <ArcBackground src={`/pump${pumpimg[pumpValue]}`} alt="배경" />
      <DraggableButton
        src="/pumpbutton.svg"
        alt="버튼"
        style={{ top: y, left: x }}
        onMouseDown={handleMouseDown}
        onTouchMove={handleDrag}
      />
      <PumpValue>{realpumpValue} 펌프</PumpValue>
    </SliderContainer>
  );
};

export default PumpSlider;
