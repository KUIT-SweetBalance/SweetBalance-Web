import React from 'react';
import MypageSettingManagement from './MypageSettingManagement';
import Header from '../../../components/header/Header';
import Button from '../../../components/button/Button';
import styled from 'styled-components';
import { MypageLogout,MypageRealLogout } from './mypage-logout-message/MypageLogout'; 
import { MypageWithdraw,MypageWithdrawLast } from './mypage-withdraw/MypageWithdraw';

const ButtonBox = styled.div`
/* padding: 24px; */
display:flex;
flex-direction:column;
align-items:center;
gap: 30px;
`;
const GrayBox = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const With = styled.img`
    position:fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);

`;
const MypageSettingManage: React.FC = () => {
    const [logout, setLogout] = React.useState(false);
    const [withdraw, setWithdraw] = React.useState(false);
    const [withdrawment,setwithdrawment] = React.useState(false);
    const handleLogoutClick = () => {
        setLogout(prev => !prev);
    };
    const handleWithClick = () => {
        setWithdraw(prev => !prev);
    };
    const handleWithdrawClick = () =>{
        setLogout(false)
        setWithdraw(false)
        setwithdrawment(prev => !prev);
    }
    return (
        <>
            <Header headerTitle='설정 관리'/>
            <MypageSettingManagement/>
            <ButtonBox>
            <Button content='로그아웃' bgColor='bg-gray_light' size='xl' onClick={handleLogoutClick}/>
            <Button content='회원탈퇴' bgColor='bg-gray_light' size='xl' onClick={handleWithClick}/>
            </ButtonBox>
            {logout && 
            <GrayBox>
                <MypageLogout onClick={handleWithdrawClick}/>
            </GrayBox>
            }
            {withdraw &&
            <GrayBox>
                <MypageRealLogout onClick={handleWithdrawClick}/>
            </GrayBox>
            }
            {withdrawment&&
            <GrayBox>
                {/* <MypageWithdraw/> */}
                <With src='/WithDraw.svg' alt='dl'/>
            </GrayBox>
            }
        </>
    );
};

export default MypageSettingManage;