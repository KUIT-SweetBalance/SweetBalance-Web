import React from 'react';

import styled from 'styled-components';
import MypageContentMiddle from './MypageContentMiddle';
import MypageContentTop from './MypageContentTop';
import { DailyNutritionIntake } from '../../../../api/main/home2/Today/Home2TodayHeader';

const MypageContentBox = styled.div`
    width: 100%;
    display: inline-flex;
    padding: 30px 24px 10px 24px;
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
width: 100%;
aspect-ratio: 345 / 218; /* 비율 유지 */
justify-content: space-around;

/* height: 218px; */
`;

const MypageContentBottom = styled.div`
color: #121212;
text-align: center;
font-family: 'Pretendard';
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -0.3px;`;
const MypageContent: React.FC<{Sugar:DailyNutritionIntake;gender:"MALE"|"FEMALE"}> = ({Sugar,gender}) => {
    const gendersugar = gender==="MALE"?38:25;
    const Danger = Sugar.totalSugar > gendersugar 
  ? 2 
  : Sugar.totalSugar >= gendersugar - 5 && Sugar.totalSugar < gendersugar
    ? 1 
    : 0;

    return (
        <MypageContentBox>
            <MypageContentRealBox>
                <MypageContentTop totalSugar={Sugar.totalSugar} Danger={Danger}/>
                <MypageContentMiddle totalSugar={Sugar.totalSugar} gendersugar={gendersugar}/>
                <MypageContentBottom>{`하루 적정 섭취량은 ${gendersugar}g이에요.`}</MypageContentBottom>
            </MypageContentRealBox>
        </MypageContentBox>
    );
};

export default MypageContent;