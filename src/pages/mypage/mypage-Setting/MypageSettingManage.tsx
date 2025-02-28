import React from 'react';
import MypageSettingManagement from './MypageSettingManagement';
import Header from '../../../components/header/Header';
import styled from 'styled-components';
import { MypageLogout,MypageRealLogout } from './mypage-logout-message/MypageLogout'; 
import Button2 from '../../../components/button/Button2';
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ApiManager from '../../../api/ApiManager';
const HeaderPadding = styled.div`
  padding: 0 14px 0 21px;
`;
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
        withDrawMutation.mutate()
    }
    const handleWithdraw2Click = () =>{
        
        setwithdrawment(prev => !prev);
        setwithdrawment2(prev=>!prev);
    }
    const handleWithdraw3=()=>{
        setwithdrawment2(prev=>!prev);
        navigate("/");
    }
    const handleNumber=()=>{
        setnumber(prev=>!prev);
    }
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: async () => {
          return await ApiManager.post(
            "/api/auth/sign-out",
            {},
            { withCredentials: true } // ✅ 쿠키 자동 포함
          );
        },
        onSuccess: () => {
          console.log("✅ 로그아웃 성공");
          // ✅ localStorage에서 토큰 제거
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          delete ApiManager.defaults.headers.Authorization;
          // ✅ 홈으로 이동
          navigate("/");
        },
        onError: (error) => {
          console.error("❌ 로그아웃 실패:", error);
        },
      });


      const withDrawMutation = useMutation({
        mutationFn: async () => {
          return await ApiManager.delete(
            "/api/auth/withdraw" 
          );
        },
        onSuccess: () => {
          console.log("✅ 탈퇴 성공");
          // ✅ localStorage에서 토큰 제거
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        },
        onError: (error) => {
          console.error("❌ 탈퇴 실패:", error);
        },
      });   


    return (
        <><HeaderPadding>
            <Header headerTitle='설정 관리'/>
        </HeaderPadding>
            
            <MypageSettingManagement onClick={handleNumber}/>
            <ButtonBox>
            <Button2 content='로그아웃' bgColor='bg-white' size='xl' onClick={handleLogoutClick}/>
            <Withdraw onClick={handleWithClick}>회원탈퇴</Withdraw>
            {/* withdrawbottom.svg 2번째 사진 */}
            </ButtonBox>
            {logout && 
            <GrayBox>
                <MypageLogout onClick={handleLogoutClick} YesClick={() => logoutMutation.mutate()}/>
                {/* 로그아웃 들어갈 곳곳 */}
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