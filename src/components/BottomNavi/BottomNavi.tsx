import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 정의
const BottomNaviContainer = styled.div`
  position: fixed;
  bottom: 18px;
  left: 5%;
  width: 90%;
  height: 72px;
  background-color: white;
  box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1); /* 위쪽 그림자 */
  border-radius: 100px; /* 둥근 모서리 */
  padding: 10px;
  display: flex;
  justify-content: space-around; /* 균등 간격 */
  align-items: center;
`;

// const Padding = styled.div`
//   display: flex;
//   justify-content: space-around; /* 균등 간격 */
//   align-items: center;
// `;

const NavItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px; /* 아이콘과 텍스트 간격 */

  & img {
    opacity: ${(props) => (props.active ? 1 : 0.5)}; /* 비활성화된 아이콘 투명도 */
  }
`;

const Icon = styled.img`
  width: 28px; /* 아이콘 크기 */
  height: 28px;
`;

const Label = styled.span<{ active: boolean }>`
  color: ${(props) => (props.active ? 'var(--primary, #722A2A)' : '#90909033')};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.35px;
`;

// 컴포넌트 정의
const BottomNavi: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0); // 활성화된 아이템의 인덱스

  // 네비게이션 데이터
  const navItems = [
    { id: 0, label: '홈', src: '/Homefill1.svg', inactiveSrc: '/Homefill2.svg' },
    { id: 1, label: '음료탐색', src: '/Drinkfill1.svg', inactiveSrc: '/Drinkfill2.svg' },
    { id: 2, label: '마이', src: '/Myfill1.svg', inactiveSrc: '/Myfill2.svg' },
  ];

  return (
    <BottomNaviContainer>
      {/* <Padding> */}
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            active={item.id === activeIndex}
            onClick={() => setActiveIndex(item.id)} // 클릭 시 활성화된 인덱스 변경
          >
            <Icon
              src={item.id === activeIndex ? item.src : item.inactiveSrc} // 활성화 상태에 따라 이미지 변경
              alt={item.label}
            />
            <Label active={item.id === activeIndex}>{item.label}</Label>
          </NavItem>
        ))}
      {/* </Padding> */}
    </BottomNaviContainer>
  );
};

export default BottomNavi;
