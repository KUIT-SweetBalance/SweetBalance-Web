import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';


const  MypageSettingBox = styled.div`
    padding : 24px;

`;
const MypageSettingManagementBox = styled.div`
    display: flex;
    padding: 20px 20px 30px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 69px;
    align-self: stretch;
    border-radius: 20px 20px 40px 20px;
background: #F4F4F4;
`;

const MypageSettingManagementContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

const MypageSettingManagementLeft = styled.div`
    color: #121212;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 100% */
    letter-spacing: -0.45px;
`;

const MypageSettingManagementImg = styled.img`
    display: flex;
    width: 100px;
    height: 50px;
    padding: 5px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
`;

const MypageSettingManagementRight = styled.div`
    color: #121212;
    text-align: right;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 100% */
    letter-spacing: -0.45px;
`;

const MypageSettingManagement: React.FC = () => {

        const [selected, setSelected] = useState<boolean>(false);
        const toggleSelected = () => {
            setSelected(prevSelected => !prevSelected);
        };
    return (
        <MypageSettingBox>
            <MypageSettingManagementBox>
                <MypageSettingManagementContent>
                    <MypageSettingManagementLeft>알림</MypageSettingManagementLeft>
                    <MypageSettingManagementImg src={selected ? '/SettingSelected.svg' : '/SettingunSelected.svg'} alt='selected?' onClick={toggleSelected}/>
                </MypageSettingManagementContent>

                <MypageSettingManagementContent>
                    <MypageSettingManagementLeft>서비스 가이드 보기 </MypageSettingManagementLeft>
                </MypageSettingManagementContent>

                <MypageSettingManagementContent>
                    <MypageSettingManagementLeft>버전 정보</MypageSettingManagementLeft>
                    <MypageSettingManagementRight>현재 ver 1.0</MypageSettingManagementRight>
                </MypageSettingManagementContent>

                <MypageSettingManagementContent>
                    <MypageSettingManagementLeft>1:1문의</MypageSettingManagementLeft>
                </MypageSettingManagementContent>

                <MypageSettingManagementContent>
                    <MypageSettingManagementLeft>서비스 이용 약관 </MypageSettingManagementLeft>
                </MypageSettingManagementContent>
            </MypageSettingManagementBox>
        </MypageSettingBox>
    );
};

export default MypageSettingManagement;