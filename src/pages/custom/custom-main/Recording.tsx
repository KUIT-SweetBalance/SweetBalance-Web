import React from 'react';
import styled from 'styled-components';
const RecodingButton = styled.button`
  width: 345px;
  height: 56px;
  border-radius: 100px;
  background: #722a2a;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 100% */
  letter-spacing: -0.45px;
  border: none; /* 버튼 테두리 제거 */
  cursor: pointer;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
`;
interface Props {
    brand: string;
    drink: string;
    sugar: number;
    kcal: number;
    caffeine: number;
  }
const Recoding : React.FC<Pick<Props, 'sugar'>& { onClick: () => void }> = ({sugar,onClick}) => {
    const name = `당류 ${sugar}g 기록하기`;
    return (
        <>
            <Center>
                <RecodingButton onClick={onClick}>{name}</RecodingButton> 
            </Center>
       </>
    )
}
export default Recoding;