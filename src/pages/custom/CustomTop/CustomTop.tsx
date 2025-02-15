import React from 'react';
import styled from 'styled-components';


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
    top: 0;
    left: 0;
    z-index: 1;
`
const White = styled.div`
width:393px;
height:20px;
background : white;
border-radius: 20px 20px 0 0;
position:absolute;
bottom:-1px;
box-shadow: 0 -9px 10px rgba(0, 0, 0, 0.2);
z-index: 2;
`;
const CustomTop: React.FC<{imgUrl:string}> = ({imgUrl}) => {
    return (
        // <CustomTo><DrinkImage src='/drink.svg'alt='drink'/></CustomTo>
        <CustomTTop>
            <DrinkImage src={`${imgUrl}`} alt='drink'/>
            <White/>
        </CustomTTop>
    );
};

export default CustomTop;