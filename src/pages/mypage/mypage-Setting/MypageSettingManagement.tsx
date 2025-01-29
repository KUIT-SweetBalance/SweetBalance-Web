import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';


const  MypageSettingBox = styled.div`
    display: flex;
padding: 30px 23.5px;
flex-direction: column;
align-items: flex-start;
gap: 20px;

`;
const MypageSettingManagementBox = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    border-radius: 20px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
`;

const MypageSettingManagementContent = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content:space-between;
    /* gap: 168px; */
    align-self: stretch;
    border-radius: 20px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
`;

const MYpageSettingContentLeft = styled.div`
display: flex;
align-items: center;
gap: 10px;

`;
const MypageBell = styled.div`
border-radius: 20px;
border: 1px solid rgba(144, 144, 144, 0.20);
display: flex;
width:34px;
height:34px;
/* align-items: center; */
justify-content: space-around;
align-items: center;

`;
const Bell = styled.img`
width: 13px;
height: 14px;`;
const MypageSettingManagementLeft = styled.div`
   color: #121212;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 112.5% */
letter-spacing: -0.4px;
`;

const MypageSettingManagementImg = styled.img`
    display: flex;
    /* width: 100px; */
    height: 50px;
    padding: 5px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
`;
const Mypagegory = styled.img`
width: 10.703px;
height: 14px;
flex-shrink: 0;`;
const MypageSettingManagementver = styled.div`
color: var(--gray-text, #909090);
text-align: right;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 128.571% */
letter-spacing: -0.35px;`;
const MypageSettingManagementBottom = styled.div`
display: flex;
width: 306px;
justify-content: space-between;
align-items: center;`;
// const MypageSettingManagementRight = styled.div`
//     color: #121212;
//     text-align: right;
//     font-family: Pretendard;
//     font-size: 18px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 18px; /* 100% */
//     letter-spacing: -0.45px;
// `;

const MypageSettingManagement: React.FC = () => {

        const [selected, setSelected] = useState<boolean>(false);
        const toggleSelected = () => {
            setSelected(prevSelected => !prevSelected);
        };
    return (
        <MypageSettingBox>
            <MypageSettingManagementContent>
                    <MYpageSettingContentLeft>
                        <MypageBell>
                            <Bell src='/bell.svg' alt='bell'/>
                        </MypageBell>
                        <MypageSettingManagementLeft>알림설정</MypageSettingManagementLeft>
                    </MYpageSettingContentLeft>
                    <MypageSettingManagementImg src={selected ? '/SettingSelected.svg' : '/SettingunSelected.svg'} alt='selected?' onClick={toggleSelected}/>
            </MypageSettingManagementContent>

            <MypageSettingManagementBox>
                    <MypageSettingManagementBottom>
                        <MypageSettingManagementLeft>서비스 가이드 보기 </MypageSettingManagementLeft>
                        <Mypagegory src='/gory.svg'alt='gory'/>
                    </MypageSettingManagementBottom>
                    <MypageSettingManagementBottom>
                        <MypageSettingManagementLeft>버전 정보</MypageSettingManagementLeft>
                        <MypageSettingManagementver>현재 ver 1.0</MypageSettingManagementver>
                    </MypageSettingManagementBottom>
                    <MypageSettingManagementLeft>1:1문의</MypageSettingManagementLeft>
                    <MypageSettingManagementLeft>서비스 이용 약관 </MypageSettingManagementLeft>
                
            </MypageSettingManagementBox>
        </MypageSettingBox>
    );
};

export default MypageSettingManagement;