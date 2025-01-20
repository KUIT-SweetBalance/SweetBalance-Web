import React from 'react';
import styled from 'styled-components';
interface MypageInfoItem {
    key: string;
    value: string;
  }
const MypagereviseBox = styled.div``;
const MypagereviseItem = styled.div`
display: inline-flex;
padding: 10px 24px 5px 24px;
flex-direction: column;
align-items: flex-start;
gap: 10px;`;
const MypageTitle = styled.div`
display: flex;
padding: 10px;
justify-content: center;
align-items: center;
gap: 10px;
color: var(--text, #121212);
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 111.111% */
letter-spacing: -0.45px;
`;
const MypageNickname = styled.div`
display: flex;
width: 345px;
height: 60px;
padding: 20px 30px;
align-items: center;
gap: 10px;
border-radius: 100px;
border: 2px solid var(--gray-light, #F3F3F3);
background: #FFF;
`;
const Mypagerevisecontent = styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 125% */
letter-spacing: -0.4px;`;
const Mypagerevise: React.FC = () => {
    const info: MypageInfoItem[] = [
        { key: 'nickname', value: '달달해' },
        { key: 'sex', value: '여성' },
        { key: 'introduce', value: '당뇨를 조심하자' },
      ];

    return (
        <MypagereviseBox>
            {info.map((item,index)=>(
                <MypagereviseItem key = {index}>
                    <MypageTitle>{item.key === 'nickname'?"닉네임":(item.key ==='sex'?"성별":"한 줄 소개")}</MypageTitle>
                    <MypageNickname><Mypagerevisecontent>{item.value}</Mypagerevisecontent></MypageNickname>
                </MypagereviseItem>
            ))}
           
        </MypagereviseBox>

            

    );
};

export default Mypagerevise;