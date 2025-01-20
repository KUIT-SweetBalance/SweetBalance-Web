import React from 'react';

import styled from 'styled-components';
import MypageContentMiddle from './MypageContentMiddle';
import MypageContentTop from './MypageContentTop';

const MypageContentBox = styled.div`
    width: 393px;
    display: inline-flex;
padding: 0px 24px 30px 24px;
flex-direction: column;
align-items: flex-start;
gap: 10px;  
`;
const MypageContentRealBox = styled.div`
display: flex;
padding: 20px 11.5px;
flex-direction: column;
align-items: center;
gap: 10px;
border-radius: 20px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
width: 345px;
height: 218px;
`;

const MypageContentBottom = styled.div`
color: #121212;
text-align: center;
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -0.3px;`;
const MypageContent: React.FC = () => {
    return (
        <MypageContentBox>
            <MypageContentRealBox>
                <MypageContentTop/>
                <MypageContentMiddle/>
                <MypageContentBottom>하루 적정 섭취량은 25g이에요.</MypageContentBottom>
            </MypageContentRealBox>
        </MypageContentBox>
    );
};

export default MypageContent;