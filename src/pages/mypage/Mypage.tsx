import React from 'react';
import Mypages from './mypage-main/Mypages';
import Mypagerevise from './mypage-revise/Mypagerevise';
import MypageSettingManage from './mypage-Setting/MypageSettingManage';

const Mypage: React.FC = () => {
    return (
        <>
        {/* <Mypages/>메인 페이지  */}
        {/* <Mypagerevise/>수정하기 */}
        <MypageSettingManage/>
        </>
    );
};

export default Mypage;