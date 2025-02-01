import React from "react";
import styled from "styled-components";


  interface SizeProps {
    name: string;
    size: number;
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
const Sizeimg = styled.img`
  width: 73px;
  height: 73px;
`;
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
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.25px;
  padding: 2px 7px 0 10px;
  margin-top: 8px;
`;

const SizeComponent: React.FC<{ sizes: SizeProps[] }> = ({ sizes }) => {
    return (
      <SizeList>
        {sizes.map((size, index) => (
          <SizeBox key={index}>
            <Sizeimg src='/sizeimg.svg'alt='size'/>
            <SizeName>{size.name}</SizeName>
            <SizeMl>{size.size}ml</SizeMl>
          </SizeBox>
        ))}
      </SizeList>
    );
  };

  export default SizeComponent