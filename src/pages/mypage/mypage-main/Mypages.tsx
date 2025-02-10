import React from 'react';
import MypageTitle from './mypage-main-state/MypageTitle';
import MypageContent from './mypage-main-state/MypageContent';
import styled from 'styled-components';
import MypageFeed from './Mypagefeed';
import MypageSetting from './MypageSetting';
import BottomNavi from '../../../components/BottomNavi/BottomNavi';

const MypageBox = styled.div`
    width: 393px;
`;
const CenterLine = styled.div`
display: inline-flex;
padding: 20px 0px;
flex-direction: column;
align-items: flex-start;
height:10px;
gap: 10px;
background-color:#FAFAFA;
`;
const Mypages: React.FC = () => {
    return (
        <>
        <MypageBox>
            <MypageTitle/>
            <MypageContent/>
        </MypageBox>
        <CenterLine/>
        <MypageFeed/>
        {/* <MypageSetting/> */}
        <BottomNavi/>
        </>
    );
};

export default Mypages;