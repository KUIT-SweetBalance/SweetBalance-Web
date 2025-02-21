import React from 'react';
import styled from 'styled-components';

const MypageContentTopBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between; /* 📌 좌우 균형 조정 */
   /* 📌 데스크탑에서 너무 넓어지지 않게 제한 */
  margin: 0 auto; /* 📌 가운데 정렬 */
  padding: 10px 20px;

  
`;

const MypageContentTopLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px; /* 📌 간격 줄이기 */
`;

const MypageContentTopLeftTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const MypageContentTopLeftTopText = styled.div`
  color: rgba(18, 18, 18, 0.5);
  font-family: Pretendard;
  font-size: clamp(14px, 1.5vw, 20px); /* 📌 가변 폰트 */
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.35px;
`;

const MypageContentTopLeftTopBoldText = styled.div`
  color: var(--text, #121212);
  font-family: Pretendard;
  font-size: clamp(24px, 2.5vw, 32px); /* 📌 가변 폰트 */
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.75px;
`;

const MypageContentTopLeftBottom = styled.div`
  color: #121212;
  font-family: 'Pretendard';
  font-size: clamp(12px, 1.2vw, 16px); /* 📌 가변 폰트 */
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.3px;
`;

const MypageContentTopRight = styled.img`
  width: 30%; /* 📌 캐릭터 이미지 크기 반응형 */
`;

const MypageContentTop: React.FC<{ totalSugar: number; Danger: number }> = ({ totalSugar, Danger }) => {
  return (
    <MypageContentTopBox>
      <MypageContentTopLeft>
        <MypageContentTopLeftTop>
          <MypageContentTopLeftTopText>나의 신호등 상태는?</MypageContentTopLeftTopText>
          <MypageContentTopLeftTopBoldText>
            {Danger === 0 ? '건강해요!' : Danger === 1 ? '주의해요!' : '위험해요.'}
          </MypageContentTopLeftTopBoldText>
        </MypageContentTopLeftTop>
        <MypageContentTopLeftBottom>{`현재 섭취량 ${totalSugar}g`}</MypageContentTopLeftBottom>
      </MypageContentTopLeft>
      <MypageContentTopRight src={`/character/Character${Danger}.svg`} alt="character" />
    </MypageContentTopBox>
  );
};

export default MypageContentTop;
