import React from 'react';
import styled from 'styled-components';
import MypageFeedContent from './mypage-feed/MypageFeedContent';


const MypageFeedBox = styled.div`
    width: 100%;
    margin-bottom:80px;`;
const MypageFeedTitle = styled.div`
display: inline-flex;
padding: 10px 0 10px 34px;
justify-content: center;
align-items: center;
gap: 10px;
color: var(--text, #121212);
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 111.111% */
letter-spacing: -0.45px;
`;
const MypageFeed: React.FC = () => {
    return (
        <MypageFeedBox>
            <MypageFeedTitle>피드 관리하기</MypageFeedTitle>
            <MypageFeedContent/>
                
        </MypageFeedBox>
    );
};

export default MypageFeed;