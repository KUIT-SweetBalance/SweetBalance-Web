import React from 'react';
import Mypages from './mypage-main/Mypages';
import Mypagerevise from './mypage-revise/Mypagerevise';
import MypageSettingManage from './mypage-Setting/MypageSettingManage';
import {MypageLogout,MypageRealLogout} from './mypage-Setting/mypage-logout-message/MypageLogout';
import {MypageWithdraw, MypageWithdrawLast} from './mypage-Setting/mypage-withdraw/MypageWithdraw';

const Mypage: React.FC = () => {
    return (
        <>
        {/* <Mypages/>메인 페이지  */}
        {/* <Mypagerevise/>수정하기 */}
        {/* <MypageSettingManage/> */}
        {/* <MypageLogout/>
        <MypageRealLogout/> */}
        <MypageWithdrawLast/>
        </>
    );
};

export default Mypage;