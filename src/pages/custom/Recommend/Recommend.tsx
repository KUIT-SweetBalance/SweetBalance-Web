import React from "react";
import styled from "styled-components";

interface Props {
    brand: string;
    drink: string;
    sugar: number;
    kcal: number;
    caffeine: number;
  }
type BrandjustProps = Pick<Props, 'brand'>;
const RecommentBox = styled.div`
  width: 393px;
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

type DrinkAboutBrand = Pick<Props, 'drink' | 'sugar'>;
const DownColor = styled.div`
  color: #92ada4;
`;
const UpColor = styled.div`
  color: #fed8a6;
`;




const Recommend: React.FC<BrandjustProps> = ({ brand }) => {
    const recom: DrinkAboutBrand[] = [
      { drink: '허니 자몽 블랙티', sugar: 25 },
      { drink: '유스베리 티', sugar: 0 },
      { drink: '잉글리시 블랙티', sugar: 0 },
      { drink: '캐모마일 티', sugar: 0 },
      { drink: '캐모마일 티', sugar: 0 },
      { drink: '캐모마일 티', sugar: 0 },
      { drink: '캐모마일 티', sugar: 0 },
      { drink: '캐모마일 티', sugar: 0 },
    ];
    return (
      <RecommentBox>
        <RecommendTitle>
          당류가 비슷한<BoldText> '{brand}' </BoldText>음료 추천!
        </RecommendTitle>
        <RecommendDrinkBox>
          {recom.map((item, index) => (
            <RecommendDrink key={index}>
              <DrinkImg src="/recomimg.svg" alt="drink" />
              <DrinkName>{item.drink}</DrinkName>
              <DrinkSugar>
                {item.sugar > 0 ? (
                  <DownColor>{item.sugar}g ▼</DownColor>
                ) : (
                  <UpColor>{item.sugar}g ▼</UpColor>
                )}
              </DrinkSugar>
            </RecommendDrink>
          ))}
        </RecommendDrinkBox>
      </RecommentBox>
    );
  };

  export default Recommend