import React from 'react';
import MypageTitle from './mypage-main-state/MypageTitle';
import MypageContent from './mypage-main-state/MypageContent';
import styled from 'styled-components';
import MypageFeed from './Mypagefeed';
import MypageSetting from './MypageSetting';

const MypageBox = styled.div`
    width: 393px;
`;

const Mypages: React.FC = () => {
    return (
        <>
        <MypageBox>
            <MypageTitle/>
            <MypageContent/>
        </MypageBox>
        <MypageFeed/>
        <MypageSetting/>
        </>
    );
};

export default Mypages;