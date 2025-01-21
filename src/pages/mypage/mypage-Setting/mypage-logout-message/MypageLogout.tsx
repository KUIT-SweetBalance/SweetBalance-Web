import React from 'react';
import styled from 'styled-components';
import MiniButton from './MiniButton';

const MypageLogoutBox = styled.div`
display: flex;
width:345px;
height:173px;
padding: 30px 20px;
flex-direction: column;
align-items: center;
gap: 35px;
align-self: stretch;
border-radius: 20px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;
const MypageLogoutRealBox = styled.div`
display: flex;
width:345px;
height:223px;

padding: 30px 20px;
flex-direction: column;
align-items: center;
gap: 23px;
align-self: stretch;
border-radius: 20px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const MypageLogoutTop = styled.div`
color: var(--text, #121212);
text-align: center;
font-family: Pretendard;
font-size: 25px;
font-style: normal;
font-weight: 500;
line-height: 28px; /* 112% */
letter-spacing: -0.625px;
`;

const MypageLogoutBottom = styled.div`
display: flex;
align-items: center;
gap: 13px;
`;
const MypageLogoutMiddle = styled.div`
color: rgba(18, 18, 18, 0.50);
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
letter-spacing: -0.35px;

`;

export const MypageLogout: React.FC<{ onClick: () => void }> = ({ onClick }) => {

   

    return (
        <MypageLogoutBox>
            <MypageLogoutTop>로그아웃 하시겠습니까?</MypageLogoutTop>
            <MypageLogoutBottom>
                <MiniButton onClick={onClick}/>
            </MypageLogoutBottom>
        </MypageLogoutBox>
    );
};

export const MypageRealLogout: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <MypageLogoutRealBox>
            <MypageLogoutTop>정말 떠나시겠어요?</MypageLogoutTop>
            <MypageLogoutMiddle>지금까지 커스텀 음료 기록과 <br />맞춤형 추천 서비스를 유지할 수 없게 돼요.</MypageLogoutMiddle>
            <MypageLogoutBottom>
                <MiniButton onClick={onClick} />
            </MypageLogoutBottom>
        </MypageLogoutRealBox>
    );
};

