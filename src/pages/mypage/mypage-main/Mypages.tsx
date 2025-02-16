import React from 'react';
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import MypageTitle from './mypage-main-state/MypageTitle';
import MypageContent from './mypage-main-state/MypageContent';
import styled from 'styled-components';
import MypageFeed from './Mypagefeed';
import BottomNavi from '../../../components/BottomNavi/BottomNavi';
import { fetchUserInfo, UserData, UserInfoResponse } from '../../../api/mypage/main/MypageMain';
import { fetchDailyNutritionIntake, DailyNutritionIntake,DailyNutritionIntakeResponse } from '../../../api/main/home2/Today/Home2TodayHeader';

const MypageBox = styled.div`
    width: 100%;
`;

const CenterLine = styled.div`
    display: inline-flex;
    padding: 20px 0px;
    flex-direction: column;
    align-items: flex-start;
    height: 10px;
    gap: 10px;
    background-color: #FAFAFA;
`;

const defaultUserData: UserData = {
    createdAt: "",
    updatedAt: "",
    userId: 0,
    role: "USER",
    email: "",
    nickname: "",
    password: "",
    providerId: null,
    loginType: "BASIC",
    gender: "OTHER",
    status: "ACTIVE",
};

const defaultSugarData: DailyNutritionIntake = {
    totalSugar: 0,
    additionalSugar: 0,
    beverageCount: 0,
    unreadAlarmCount: 0,
};

const Mypages: React.FC = () => {
    const [userInfoQuery, SugarQuery] = useQueries({
        queries: [
            {
                queryKey: ["userInfo"], 
                queryFn: fetchUserInfo,
            },
            {
                queryKey: ["SugarData"], 
                queryFn: fetchDailyNutritionIntake,
            }
        ]
    }) as [UseQueryResult<UserInfoResponse>, UseQueryResult<DailyNutritionIntakeResponse>];

    // ✅ 둘 중 하나라도 로딩 중이면 "로딩 중" 표시
    if (userInfoQuery.isLoading || SugarQuery.isLoading) return <p>로딩 중...</p>;

    // ✅ 둘 중 하나라도 오류 발생하면 오류 메시지 표시
    if (userInfoQuery.error || SugarQuery.error) return <p>데이터를 불러오는 중 오류 발생</p>;

    // ✅ API 데이터 추출
    const userinfo: UserData = userInfoQuery.data?.data ?? defaultUserData;
    const Sugar: DailyNutritionIntake = SugarQuery.data?.data ?? defaultSugarData;
    const gendersugar = userinfo.gender==="MALE"?38:25;

    const Danger = Sugar.totalSugar > gendersugar 
  ? 2 
  : Sugar.totalSugar >= gendersugar - 5 && Sugar.totalSugar < gendersugar
    ? 1 
    : 0;
    return (
        <>
            <MypageBox>
                <MypageTitle userinfo={userinfo} additionalSugar={Sugar.additionalSugar}Danger={Danger}/>
                <MypageContent Sugar={Sugar} gender={userinfo.gender!="OTHER"?userinfo.gender:"MALE"}/>
            </MypageBox>
            <CenterLine/>
            <MypageFeed/>
            <BottomNavi/>
        </>
    );
};

export default Mypages;
