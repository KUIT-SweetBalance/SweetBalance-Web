import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../../../api/mypage/main/MypageMain';

const MypageTitleBox = styled.div`
width: 100%;
height:auto;
    display : inline-flex;
    padding: 30px 24px 10px 24px;
    align-items: center;
    gap: 18px;
    justify-content: space-between;

`;

const MyPageTitleLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 65%;
`;
const MypageTitleBoldText = styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 20px; /* 111.111% */
letter-spacing: -0.45px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
width:100%;
`;
const MypageTitleBoldTexts = styled.div`
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
    width:100%;
`;
const MypageTitleLeftRightH = styled.div`
    display: flex;
    gap: 3px;
    width:100%;
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
const MypageTitle: React.FC<{Danger:number;userinfo:UserData;additionalSugar:number}> = ({Danger,userinfo,additionalSugar}) => {

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
                <MypageTitleBoldText>{`${userinfo.nickname}님!`}</MypageTitleBoldText>
                <MypageTitleLeftRight>
                    <MypageTitleNormalText>
                    
                        {Danger===0?`아직 당 ${additionalSugar}g을 더 마실 수 있어요`:
                        Danger===1?`오늘의 당 허용량이 ${additionalSugar}g 남았어요! 조금 더 신경 써주세요!`:
                        `오늘의 당 섭취량이 초과됐어요!`}
                    
                        </MypageTitleNormalText>
                    
                    {/* <MypageTitleBoldTexts> </MypageTitleBoldTexts>
                    <MypageTitleBoldTexts></MypageTitleBoldTexts> */}
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