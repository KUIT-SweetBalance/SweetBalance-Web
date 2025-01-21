import React from 'react';
import styled from 'styled-components';

// 스타일 정의
const MypageWithdrawBox = styled.div`
    display: inline-flex;
    padding: 0px 24px;
    flex-direction: column;
    align-items: center;
    position : relative;
    
`;

const MypageWithdrawImg = styled.img`
  width: 80px;
  height: 80px;
  z-index: 2;
  position:absolute;
  top:23px;
`;

const MypageWithdrawCircle = styled.div`
    display: flex;
    justify-content: center;
    width: 156px;
    height: 156px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
    position: absolute;
    top: 0px;
    left: 110px;
     /* Circle이 TextBox 위에 오도록 */
`;

const MypageWithdrawTextBox = styled.div`
    display: flex;
    width: 345px;
    padding: 31px 21px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 0 10px 0px rgba(0, 0, 0, 0.15);
    position: absolute;
    top: 90px;
    left: 15px;
    
    /* 원과 경계선을 없애기 위한 오버랩 처리 */
    &:before {
        content: '';
        position: absolute;
        top: -10px; /* Circle과 자연스럽게 겹치도록 */
        left: calc(50% - 78px); /* Circle의 중앙과 맞춤 */
        width: 156px;
        height: 30px;
        background-color: white;
        z-index: 1; /* TextBox의 상단 부분이 Circle과 같은 배경을 가짐 */
        border-bottom-left-radius: 78px;
        border-bottom-right-radius: 78px;
    }
`;

const MypageWithdrawBoldContent = styled.div`
    color: var(--text, #121212);
    text-align: center;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px; /* 112% */
    letter-spacing: -0.625px;
`;

const MypageWithdrawContent = styled.div`
    color: rgba(18, 18, 18, 0.50);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.35px;
`;
const TemporyBox = styled.div`
position:fixed;
top:50%;
left:50%;
transform: translate(-50%, -50%);

`;
export const MypageWithdraw: React.FC = () => {
  return (
    <TemporyBox>
      <MypageWithdrawBox>
        <MypageWithdrawCircle>
          <MypageWithdrawImg src="/Characterghost.svg" alt="Ghost" />
        </MypageWithdrawCircle>
        <MypageWithdrawTextBox>
          <MypageWithdrawBoldContent>그간의 여정이 너무 아쉬워요😢</MypageWithdrawBoldContent>
          <MypageWithdrawContent>
            탈퇴를 선택하시면 그동안 저장된 맞춤 음료 기록과<br/> 추천 데이터가 모두 삭제됩니다.
          </MypageWithdrawContent>
        </MypageWithdrawTextBox>
      </MypageWithdrawBox>
    </TemporyBox>
  );
};
export const MypageWithdrawLast: React.FC = () => {
    return (
      <TemporyBox>
      <MypageWithdrawBox>
        <MypageWithdrawCircle>
          <MypageWithdrawImg src="/Characterghost.svg" alt="Ghost" />
        </MypageWithdrawCircle>
        <MypageWithdrawTextBox>
          <MypageWithdrawBoldContent>함께 해주셔서 감사합니다!</MypageWithdrawBoldContent>
          <MypageWithdrawContent>
            불편한 점이 있다면 언제든 의견을 남겨주세요!
          </MypageWithdrawContent>
        </MypageWithdrawTextBox>
      </MypageWithdrawBox>
      </TemporyBox>
    );
  };

