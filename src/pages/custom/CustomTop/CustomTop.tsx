import React from 'react';
import styled from 'styled-components';

const CustomTo = styled.div`
  width: 393px;
  height: 361px;
  border-radius: 0px 0px 20px 20px;
  background: #722a2a;
  box-shadow: 0px 4px 10px 0px rgba(18, 18, 18, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DrinkImage= styled.img`
  
`
const CustomTop: React.FC = () => {
    return (
        <CustomTo><DrinkImage src='/drink.svg'alt='drink'/></CustomTo>

    );
};

export default CustomTop;