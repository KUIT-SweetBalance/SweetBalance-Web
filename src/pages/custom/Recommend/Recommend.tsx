import React from "react";
import styled from "styled-components";

interface Props {
    brand: string;
    drink: string;
    sugar: number;
    kcal: number;
    caffeine: number;
  }
type BrandjustProps = Pick<Props, 'brand'|'sugar'>;
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

interface DrinkAboutBrand {
  drink: string;
  sugar: number;
  src:string;
}
const DownColor = styled.div`
  color: #92ada4;
`;
const UpColor = styled.div`
  color: #fed8a6;
`;




const Recommend: React.FC<BrandjustProps> = ({ brand,sugar }) => {
    const recom: DrinkAboutBrand[] = [
      { drink: '한라봉 천혜향 블렌디드', sugar: 20,src:'/recommend/drink1.svg' },
      { drink: '유스베리 티', sugar: 6 ,src:'/recommend/drink2.svg'},
      { drink: '딸기 아사이 레모네이드', sugar: 34 ,src:'/recommend/drink3.svg'},
      { drink: '캐모마일 블랜드 티', sugar: 6 ,src:'/recommend/drink4.svg'},
      { drink: '캐모마일 블랜드 티', sugar: 6,src:'/recommend/drink4.svg' },
      { drink: '한라봉 천혜향 블렌디드', sugar: 20 ,src:'/recommend/drink1.svg'},
      { drink: '유스베리 티', sugar: 6 ,src:'/recommend/drink2.svg'},
      { drink: '딸기 아사이 레모네이드', sugar: 34 ,src:'/recommend/drink3.svg'},
    ];
    return (
      <RecommentBox>
        <RecommendTitle>
          당류가 비슷한<BoldText> '{brand}' </BoldText>음료 추천!
        </RecommendTitle>
        <RecommendDrinkBox>
          {recom.map((item, index) => (
            <RecommendDrink key={index}>
              <DrinkImg src={item.src} alt="drink" />
              <DrinkName>{item.drink}</DrinkName>
              <DrinkSugar>
                {sugar-item.sugar > 0 ? (
                  <DownColor>{sugar-item.sugar}g ▼</DownColor>
                ) : (
                  <UpColor>{item.sugar-sugar}  g ▲</UpColor>
                )}
              </DrinkSugar>
            </RecommendDrink>
          ))}
        </RecommendDrinkBox>
      </RecommentBox>
    );
  };

  export default Recommend