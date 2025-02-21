import React from "react";
import styled from "styled-components";
import { RecommendedBeverage } from "../../../api/custom/custommain";

const RecommentBox = styled.div`
  width: 100%;
  z-index:2;
  position: relative;
  background-color:white;
`;
const RecommendTitle = styled.div`
  padding: 30px 0 30px 25px;
  color: #121212;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 111.111% */
  letter-spacing: 0.25px;
  
`;
const BoldText = styled.span`
  font-weight: 700; /* 굵게 표시 */
`;
const RecommendDrinkBox = styled.div`
  display: flex;
  overflow-x: auto; /* 가로 스크롤 활성화 */
  scrollbar-width: none;
  padding: 0 35px; /* 좌우 여백 추가 */
  gap: 22px;
`;

const RecommendDrink = styled.div`
  width: 79px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DrinkImg = styled.img`
  width: 79px;
  border-radius: 50%;
`;

const DrinkName = styled.div`
  color: var(--text, #121212);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.35px;
  text-align: center;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* 말줄임표 추가 */
  width: 79px;
`;

const DrinkSugar = styled.div`
  font-size: 12px;
  font-weight: 400;
`;


const DownColor = styled.div`
  color: #92ada4;
`;
const UpColor = styled.div`
  color: #fed8a6;
`;




const Recommend: React.FC<{brand:string;recom:RecommendedBeverage[]}> = ({ brand,recom }) => {
 
    return (
      <RecommentBox>
        <RecommendTitle>
          당류가 비슷한<BoldText> '{brand}' </BoldText>음료 추천!
        </RecommendTitle>
        <RecommendDrinkBox>
          {recom.map((item, index) => (
            <RecommendDrink key={index}>
              <DrinkImg src={item.imgUrl} alt="drink" />
              <DrinkName>{item.name}</DrinkName>
              <DrinkSugar>
                {item.sugarGap < 0 ? (
                  <DownColor>{Math.abs(item.sugarGap)}g ▼</DownColor>
                ) : (
                  <UpColor>{item.sugarGap}  g ▲</UpColor>
                )}
              </DrinkSugar>
            </RecommendDrink>
          ))}
        </RecommendDrinkBox>
      </RecommentBox>
    );
  };

  export default Recommend