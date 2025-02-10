import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const MypageTitleBox = styled.div`
width: 393px;
height:auto;
    display : inline-flex;
    padding: 30px 24px 10px 24px;
    align-items: center;
    gap: 18px;
`;

const MyPageTitleLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
`;
const MypageTitleBoldText = styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 20px; /* 111.111% */
letter-spacing: -0.45px;
`;
const MypageTitleLeftRight = styled.div`
    display: flex;
    gap: 3px;
`;
const MypageTitleNormalText = styled.div`
color: #121212;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 111.111% */
letter-spacing: -0.45px;
`;
const MyPageTitleRight = styled.button`
display: flex;
height: 30px;
padding: 8px 16px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 30px;
background: var(--primary, #722A2A);
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;
const RightBox = styled.div`
display:flex;
gap:10px;
`;
const Mypagesetting = styled.img``;
const MypageTitle: React.FC = () => {

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/mypage/revise');
    };
    const handleSettingClick = () => {
        navigate('/mypage/setting');
    };
   
    return (
        <MypageTitleBox>
            <MyPageTitleLeft>
                <MypageTitleBoldText>달달해님!</MypageTitleBoldText>
                <MypageTitleLeftRight>
                    <MypageTitleNormalText>아직 </MypageTitleNormalText>
                    
                    <MypageTitleBoldText> 당 00g</MypageTitleBoldText>
                    <MypageTitleNormalText>을 더 마실 수 있어요</MypageTitleNormalText>
                </MypageTitleLeftRight>
            </MyPageTitleLeft>
            {/* 안에 들어가는거 애매함  */}
            <RightBox>
            <MyPageTitleRight onClick={handleEditClick}>편집하기</MyPageTitleRight>
            <Mypagesetting src='mypagesetting.svg'alt='set'onClick={handleSettingClick}/>
            </RightBox>
        </MypageTitleBox>
    );
};

export default MypageTitle;