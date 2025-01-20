import React from 'react';

import styled from 'styled-components';

const MypageContentTopBox = styled.div`
 display: flex;
 align-items: center;
 gap: 106px;
 `;
const MypageContentTopLeft = styled.div`
display: flex;
flex-direction: column;
gap : 57px;
`;
const MypageContentTopLeftTop = styled.div`
display: flex;
flex-direction: column;
gap : 0;
`;
const MypageContentTopLeftTopText = styled.div`
color: rgba(18, 18, 18, 0.50);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.35px;`;
const MypageContentTopLeftTopBoldText = styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 30px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.75px;
`;
const MypageContentTopLeftBottom = styled.div`
color: #121212;
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -0.3px;
`;
const MypageContentTopRight = styled.img``;
const MypageContentTop: React.FC = () => {
    return (
        <MypageContentTopBox>
            <MypageContentTopLeft>
                <MypageContentTopLeftTop>
                    <MypageContentTopLeftTopText>나의 신호등 상태는?</MypageContentTopLeftTopText>
                    <MypageContentTopLeftTopBoldText>건강해요!</MypageContentTopLeftTopBoldText>
                </MypageContentTopLeftTop>
                <MypageContentTopLeftBottom>현재 섭취량 0g</MypageContentTopLeftBottom>
            </MypageContentTopLeft>
            <MypageContentTopRight src='/Character.svg' alt='character'/>
        </MypageContentTopBox>
    );
};

export default MypageContentTop;