import React from 'react';
import MypageSettingManagement from './MypageSettingManagement';
import NavigateHeader from '../../../components/header/NavigateHeader';
import styled from 'styled-components';
import { MypageLogout,MypageRealLogout } from './mypage-logout-message/MypageLogout'; 
import Button2 from '../../../components/button/Button2';

const ButtonBox = styled.div`
/* padding: 24px; */
display:flex;
flex-direction:column;
align-items:center;
gap: 30px;
margin-top: 18rem;
/* position:absolute; */
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
const Withdraw = styled.button`
color: var(--gray-text, #909090);
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 128.571% */
letter-spacing: -0.35px;
text-decoration-line: underline;
text-decoration-style: solid;
text-decoration-skip-ink: auto;
text-decoration-thickness: auto;
text-underline-offset: auto;
text-underline-position: from-font;`;
const MypageSettingManage: React.FC = () => {
    const [logout, setLogout] = React.useState(false);
    const [withdraw, setWithdraw] = React.useState(false);
    const [withdrawment,setwithdrawment] = React.useState(false);
    const [withdrawment2,setwithdrawment2] = React.useState(false);
    const [number,setnumber] = React.useState(false);

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
    const handleWithdraw2Click = () =>{
        
        setwithdrawment(prev => !prev);
        setwithdrawment2(prev=>!prev);
    }
    const handleWithdraw3=()=>{
        setwithdrawment2(prev=>!prev);

    }
    const handleNumber=()=>{
        setnumber(prev=>!prev);

    }
    return (
        <>
            <NavigateHeader headerTitle='설정 관리'/>
            <MypageSettingManagement onClick={handleNumber}/>
            <ButtonBox>
            <Button2 content='로그아웃' bgColor='bg-white' size='xl' onClick={handleLogoutClick}/>
            <Withdraw onClick={handleWithClick}>회원탈퇴</Withdraw>
            {/* withdrawbottom.svg 2번째 사진 */}
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
                <With src='/WithDraw.svg' alt='dl'onClick={handleWithdraw2Click}/>
            </GrayBox>
            }
            {withdrawment2&&
            <GrayBox>
                <With src='/withdrawbottom.svg' alt='dl'onClick={handleWithdraw3}/>
            </GrayBox>
            }
            {number&&
            <GrayBox>
                <With src='/phonenumber.svg' alt='phone' onClick={handleNumber}/>
            </GrayBox>
            }
        </>
    );
};

export default MypageSettingManage;