import React from "react";
import styled from "styled-components";

interface Props {
    brand: string;
    drink: string;
    sugar: number;
    kcal: number;
    caffeine: number;
  }
type BrandProps = Pick<Props, 'brand' | 'drink'>;
const BrandrinkBox = styled.div`
  height: 112px;
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
const StarBox = styled.div`
  width: 97px;
  height: 30px;
  border-radius: 30px;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 13px;
  padding-right: 15px;
`;
const StarImg = styled.img`
width: 18px;
height: 18px;
`;
const Star = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Drink = styled.div`
  color: #121212;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 35px; /* 116.667% */
  letter-spacing: 0.25px;

  padding: 0px 51px 15px 25px;
  height: 50px;
`;

const Brandrink: React.FC<BrandProps & { onClick: () => void }> = ({ brand, drink, onClick }) => {
    return (
        <BrandrinkBox>
            <BrandBox>
                <Brand>{brand}</Brand>
                <StarBox onClick={onClick}>
                    <StarImg src="/fillstar.svg" alt="star" />
                    <Star>즐겨찾기</Star>
                </StarBox>
            </BrandBox>
            <Drink>{drink}</Drink>
        </BrandrinkBox>
    );
};
export default Brandrink;
