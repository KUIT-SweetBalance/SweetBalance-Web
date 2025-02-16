import React from 'react';
import styled from 'styled-components';
import left from '../../../assets/chevron-left.png'
import { useNavigate } from 'react-router-dom';


const CustomTTop = styled.div`
  width: 100%;
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
width:100%;
height:20px;
background : white;
border-radius: 20px 20px 0 0;
position:absolute;
bottom:-1px;
box-shadow: 0 -9px 10px rgba(0, 0, 0, 0.2);
z-index: 2;
`;
const Img = styled.img`
top:24px;
left:24px;
z-index:3;
width: 8px;
height: 14px;
position: absolute;
`;
const CustomTop: React.FC<{imgUrl:string}> = ({imgUrl}) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
    // 브라우저의 History API 사용(브라우저 히스토리를 프로그래밍적으로 다룰 수 있는 Javascript API)
  };
    return (
        // <CustomTo><DrinkImage src='/drink.svg'alt='drink'/></CustomTo>
        <CustomTTop>
            <Img
          src={left}
          alt="뒤로가기"
          className="w-[8px] h-[14px]"
          onClick={handleBackClick}
        />
            <DrinkImage src={`${imgUrl}`} alt='drink'/>
            <White/>
        </CustomTTop>
    );
};

export default CustomTop;