import React from 'react';
import styled from 'styled-components';

const MypageSettingBox = styled.div`
display: flex;
padding: 20px 0 20px 34px;
flex-direction: column;
gap: 13px;
`;
const MypageSettingTitle = styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 111.111% */
letter-spacing: -0.45px;
padding-bottom:7px;
`;
const MypageSettingContent = styled.div`
color: rgba(18, 18, 18, 0.50);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -0.35px;`;
const MypageSetting: React.FC = () => {
    return (
        <MypageSettingBox>
            <MypageSettingTitle>설정 관리</MypageSettingTitle>
            <MypageSettingContent>알림허용</MypageSettingContent>
            <MypageSettingContent>서비스 가이드 보기</MypageSettingContent>

            <MypageSettingContent>1:1 문의</MypageSettingContent>

            <MypageSettingContent>서비스 정보(현재 ver1.0)</MypageSettingContent>

            <MypageSettingContent>개인정보 처리 방침</MypageSettingContent>

            <MypageSettingContent>서비스 이용 약관 </MypageSettingContent>

            <MypageSettingContent>로그아웃</MypageSettingContent>
        </MypageSettingBox>
    );
};

export default MypageSetting;