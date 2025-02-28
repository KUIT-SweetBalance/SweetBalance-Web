import React from 'react';
import styled from 'styled-components';

const MiniButtonBox = styled.div`
display: flex;
align-items: center;
gap: 13px;
`;
const MiniButtonYes = styled.button`
width: 146px;
height: 50px;
border-radius: 100px;
border: 1.5px solid var(--gray, #F4F4F4);
color: var(--primary, #722A2A);
text-align: center;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 50px; /* 166.667% */
letter-spacing: -0.45px;

`;
const MiniButtonNo = styled.button`
width: 146px;
height: 50px;
border-radius: 100px;
background: var(--primary, #722A2A);
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 50px; /* 166.667% */
letter-spacing: -0.45px;
`;



const MiniButton: React.FC<{ onClick: (response: boolean) => void ;YesClick:()=>void;}> = ({ onClick,YesClick }) => {
    return (
        <MiniButtonBox>
            <MiniButtonYes onClick={YesClick}>네</MiniButtonYes>
            <MiniButtonNo onClick={() => onClick(false)}>아니오</MiniButtonNo>
        </MiniButtonBox>
    );
};

export default MiniButton;