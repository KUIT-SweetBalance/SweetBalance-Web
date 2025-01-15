import React from 'react';
import Mypages from './mypage-main/Mypages';
import Mypagerevise from './mypage-revise/Mypagerevise';

const Mypage: React.FC = () => {
    return (
        <>
        {/* <Mypages/>메인 페이지  */}
        <Mypagerevise/>
        </>
    );
};

export default Mypage;