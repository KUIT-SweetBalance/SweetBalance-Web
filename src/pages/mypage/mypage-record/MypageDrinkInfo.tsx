import React from 'react';
import styled from 'styled-components';
interface RecoringDrink {
    beverageLogId: number;
    beverageSizeId: number;
    createdAt: string; // 날짜 형식이므로 문자열로 유지
    brand: string;
    beverageName: string;
    imgUrl: string;
    sugar: number;
    syrupName: string | null;
    syrupCount: number;
    sizeType: string; // 다른 사이즈 확장 가능성 고려
  }
const ItemBox = styled.div`
    display: flex;
    padding: 10px 24px;
    align-items: center;
    gap: 20px;
    align-self: stretch;
    border-bottom: 1px solid var(--gray-light, rgba(144, 144, 144, 0.20));
`;
const DrinkImg = styled.img`
width: 67px;
/* height: 67px; */
border-radius: 50%;
`;
const ContentBox= styled.div`
    display: flex;
width: 100%;
flex-direction: column;
align-items: flex-start;
gap: 7px;
`;
const Top = styled.div`
    display :flex;
    width:100%;
justify-content: space-between;
`
const LeftTop = styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -0.3px;
`;
const RightImg = styled.img`
width:14px;
`;
const RightTop = styled.div`
display: flex;
gap: 5px;
`;
const Middle= styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.4px;
white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px; 
`;
const Bottom = styled.div`
    display: flex;
align-items: center;
gap: 11px;
align-self: stretch;


`
const Name = styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -0.3px;
`;
const MypageDrinkInfo: React.FC<{drink:RecoringDrink;onClick:()=>void;onClick1:()=>void}> = ({drink,onClick,onClick1}) => {
    
    return (
        <ItemBox>
            <DrinkImg src={drink.imgUrl}/>
            <ContentBox>
                <Top>
                    <LeftTop>{drink.createdAt}</LeftTop>
                    <RightTop>
                        <RightImg src='/Edit.svg' alt='edit' onClick={onClick}/>
                        <RightImg src='/Dele.svg' alt='Dele' onClick={onClick1}/>
                    </RightTop>
                </Top>
                <Middle>
                    {drink.brand} {drink.beverageName}
                </Middle>
                <Bottom>
                    
                    <Name>당 {drink.sugar}g</Name>
                    |
                    <Name>{drink.syrupName ? drink.syrupName +` ${drink.syrupCount}` : '시럽 없음'}</Name>
                    |
                    <Name>사이즈 {drink.sizeType}</Name>
                    
                    
                    {/* <Name>{drink.calories}kcal</Name> */}
                </Bottom>
            </ContentBox>
        </ItemBox>
    );
};

export default MypageDrinkInfo;