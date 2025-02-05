import React from 'react';
import styled from 'styled-components';
interface DrinkInfo {
    id: number; // 유니크한 식별자
    date: {
    year: number;
    month: number;
    day: number;
    weekday: string; // "월", "화" 등 요일
    };
    time: {
    hour: number;
    minute: number;
    };
    brand: string; // 브랜드 (예: "스타벅스")
    name: string; // 음료 이름 (예: "아이스 카페 아메리카노")
    size: string; // 사이즈 (예: "tall")
    syrup: number; // 시럽 개수 (예: 0)
    sugar: string; // 당 함량 (예: "0g")
    calories: string; // 칼로리 (예: "0 kcal")
    imageUrl: string; // 음료 이미지 URL
}
const ItemBox = styled.div`
    display: flex;
    padding: 20px 40px;
    align-items: center;
    gap: 15px;
    align-self: stretch;
    border-bottom: 1px solid var(--gray-light, rgba(144, 144, 144, 0.20));
`;
const DrinkImg = styled.img`
width: 67px;
height: 67px;
`;
const ContentBox= styled.div`
    display: flex;
width: 231px;
flex-direction: column;
align-items: flex-start;
gap: 7px;
`;
const Top = styled.div`
    display :flex;
    gap:90px;
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
letter-spacing: -0.4px;`;
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
const MypageDrinkInfo: React.FC<{drink:DrinkInfo;onClick:()=>void;onClick1:()=>void}> = ({drink,onClick,onClick1}) => {
    
    return (
        <ItemBox>
            <DrinkImg src={drink.imageUrl}/>
            <ContentBox>
                <Top>
                    <LeftTop>{drink.date.year}.{drink.date.month}.{drink.date.day}({drink.date.weekday}) {drink.time.hour}:{drink.time.minute}</LeftTop>
                    <RightTop>
                        <RightImg src='/Edit.svg' alt='edit' onClick={onClick}/>
                        <RightImg src='/Dele.svg' alt='Dele' onClick={onClick1}/>
                    </RightTop>
                </Top>
                <Middle>
                    {drink.brand} {drink.name}
                </Middle>
                <Bottom>
                    <Name>사이즈 {drink.size}</Name>
                    |
                    <Name>시럽 {drink.syrup}</Name>
                    |
                    <Name>당 {drink.sugar}g</Name>
                    |
                    <Name>{drink.calories}kcal</Name>
                </Bottom>
            </ContentBox>
        </ItemBox>
    );
};

export default MypageDrinkInfo;