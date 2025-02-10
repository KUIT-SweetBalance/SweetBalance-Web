import React from "react";
import styled from "styled-components";


interface SizeProps {
  sizeType: string;
  volume: number;
}
const SizeList = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 25px 0 25px;
  /* 18px gap..? 존재 */
  height: 125px;
  margin-top: 9px;
`;

// Single Size Box
const SizeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Sizeimg = styled.div`
  width: 73px;
  height: 73px;
  border-radius: 50%;
  background: rgba(240, 128, 127, 0.20);
  border: 1.5px solid #F0807F;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Sizeimg2 = styled.div`
  width: 73px;
  height: 73px;
  border-radius: 50%;
  background:#f4f4f4;
  border: 1.5px solid #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img``;
const SizeName = styled.div`
  color: #121212;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: 0.25px;
  padding: 10px 10px 0px 9px;
  height: 20px;
`;
const SizeMl = styled.div`
  height: 20px;
  color: rgba(18, 18, 18, 0.5);
  text-align: center;
  font-family: 'Pretendard';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.25px;
  padding: 2px 7px 0 10px;
  margin-top: 8px;
`;

const SizeComponent: React.FC<{ sizes: SizeProps[]; selectedSize:number;handleSizeClick:(index:number)=>void}> = ({ sizes,selectedSize,handleSizeClick }) => {
  
    return (
      <SizeList>
        {sizes.map((size, index) => (
          <SizeBox key={index}>
            {  selectedSize===index?
                <Sizeimg onClick={() => handleSizeClick(index)}><Img src={`/size/fill${size.sizeType}.svg`} alt="size"/></Sizeimg>:
                <Sizeimg2 onClick={() => handleSizeClick(index)}><Img src={`/size/unfill${size.sizeType}.svg`} alt="size"/></Sizeimg2>
          }
            <SizeName>{size.sizeType}</SizeName>
            <SizeMl>{size.volume}ml</SizeMl>
          </SizeBox>
        ))}
      </SizeList>
    );
  };

  export default SizeComponent