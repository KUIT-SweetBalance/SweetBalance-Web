import React from "react";
import styled from "styled-components";

interface Props {
    brand: string;
    drink: string;
    sugar: number;
    kcal: number;
    caffeine: number;
    scrap:boolean;
  }
type BrandProps = Pick<Props, 'brand' | 'drink'|'scrap'>;
const BrandrinkBox = styled.div`
  height: auto;
`;
const BrandBox = styled.div`
  display: flex;
  padding: 33px 9px 9px 25px;
  justify-content: space-between;
  align-items: center;
`;
const Brand = styled.div`
  color: #121212;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 111.111% */
  letter-spacing: 0.25px;
  
`;
const StarBox = styled.img`
  width: 97px;
  height: 30px;
  /* border-radius: 30px;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 13px;
  padding-right: 15px; */
`;
// const StarImg = styled.img`
// width: 18px;
// height: 18px;
// `;
// const Star = styled.div`
//   color: #000;
//   text-align: center;
//   font-family: Pretendard;
//   font-size: 12px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
// `;
const Drink = styled.div`
  color: #121212;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 35px; /* 116.667% */
  letter-spacing: 0.25px;

  padding: 0px 51px 15px 25px;
  /* height: 50px; */
  width: 22rem;
  overflow-wrap: break-word; /* 긴 단어를 줄바꿈 */
  word-break: break-word; /* 브라우저 호환성 추가 */
  white-space: normal; /* 자동 줄바꿈 허용 */
  overflow: hidden;
  display: block;
  height:auto;
`;

const Brandrink: React.FC<BrandProps & { onClick: () => void }&{onClick1:()=>void}> = ({ brand, drink, onClick,onClick1 ,scrap}) => {
    return (
        <BrandrinkBox>
            <BrandBox>
                <Brand>{brand}</Brand>
                <StarBox onClick={scrap?onClick1:onClick} src={scrap?"/fillstar.svg":"/unfillstar.svg"}alt="star">
                    {/* <StarImg src="/fillstar.svg" alt="star" />
                    <Star>즐겨찾기</Star> */}
                </StarBox>
            </BrandBox>
            <Drink>{drink}</Drink>
        </BrandrinkBox>
    );
};
export default Brandrink;
