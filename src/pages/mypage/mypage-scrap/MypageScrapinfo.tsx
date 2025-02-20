import React from 'react';
import styled from 'styled-components';
interface FavoriteDrink {
    favoriteId: number;   // 즐겨찾기 음료 고유 ID
    beverageId: number;   // 음료 ID
    name: string;         // 음료 이름
    brand: string;        // 브랜드명 (예: "스타벅스")
    imgUrl: string;       // 음료 이미지 URL
    sugarPer100ml: number;        // 당 함량
    timeString: string;   // 기록된 시간 (문자열 형식)
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
width: 74px;
height:74px;
flex-shrink:0;
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
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.4px;
white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px; /* 부모 요소에 맞춰 자동 조정 */
`;
const RightImg = styled.img`
width:14px;
`;
const RightTop = styled.div`
display: flex;
gap: 5px;
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
const MypageScrapInfo: React.FC<{drink:FavoriteDrink;onClick:()=>void}> = ({drink,onClick}) => {
    
    return (
        <ItemBox>
            <DrinkImg src={drink.imgUrl}/>
            <ContentBox>
                <Top>
                    <LeftTop>{drink.name}</LeftTop>
                    <RightTop>
                        <RightImg src='/Dele.svg' alt='Dele' onClick={onClick}/>
                    </RightTop>
                </Top>
                
                <Bottom>
                
                <Name>{drink.brand}</Name>
                <img src="/verticalBar.png" alt="구분선" className='h-[13px]'/>
                <Name>당 {drink.sugarPer100ml}g</Name>
                    
                    
                    
                    
                    {/* <Name>{drink.calories}kcal</Name> */}
                </Bottom>
            </ContentBox>
        </ItemBox>
    );
};

export default MypageScrapInfo;