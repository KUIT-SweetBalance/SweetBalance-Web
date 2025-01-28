import React from 'react';
import styled from 'styled-components';

const CustomTo = styled.div`
  width: 393px;
  height: 361px;
  border-radius: 0px 0px 20px 20px;
  background: #722a2a;
  box-shadow: 0px 4px 10px 0px rgba(18, 18, 18, 0.2);
  position: relative;
`;
const CustomTTop = styled.div`
  width: 393px;
  height: 306px;
  background: #722a2a;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

`;
const DrinkImage= styled.img`
  position: absolute;
    top: 55px;
    left: 129px;
`
const White = styled.div`
width:393px;
height:20px;
background : white;
border-radius: 20px 20px 0 0;
position:absolute;
bottom:-1px;
box-shadow: 0 -9px 10px rgba(0, 0, 0, 0.2);
`;
const CustomTop: React.FC = () => {
    return (
        // <CustomTo><DrinkImage src='/drink.svg'alt='drink'/></CustomTo>
        <CustomTTop>
            <DrinkImage src='/drink.svg'alt='drink'/>
            <White/>
        </CustomTTop>
    );
};

export default CustomTop;