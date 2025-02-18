import React,{useState} from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button/Button';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
`;
const ModalContent=styled.div`
display: inline-flex;
padding: 20px;
margin: 0 20px;
flex-direction: column;
align-items: flex-start;

border-radius: 20px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
`;
const Brand = styled.div`
color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -0.5px;
`;
const DrinkContent=styled.div`
display:flex;
gap:0;
flex-wrap: wrap;
word-break: break-word;
`;
const Drink = styled.div`
color: var(--primary, #722A2A);
font-family: 'Pretendard';
font-size: 25px;
font-style: normal;
font-weight: 600;
line-height: 30px; /* 120% */
letter-spacing: -0.625px;
`;

const Content = styled.div`
color: var(--text, #121212);
font-family: 'Pretendard';
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: 30px;
letter-spacing: -0.5px;
`;
const ButtonBox = styled.div`
display:flex;
padding-top:24px;
width: 100%;
justify-content:space-evenly;
`;
const DeleModal: React.FC<{ onClick: () => void; onClick1:()=>void;drink: string; brand:string; }> = ({ onClick,onClick1, drink,brand })  => {
    
    return (
        <ModalContainer>
          <ModalContent>
            <Brand>{brand}</Brand>
            <DrinkContent>
              <Drink>{drink}</Drink>
              <Content>을/를 삭제하시겠어요?</Content>
            </DrinkContent>
          <ButtonBox>
            <Button content='아니오' bgColor='bg-white' size='md'onClick={onClick}/>
            <Button content='삭제할래요' bgColor='bg-primary' size='md'onClick={onClick1}/>

          </ButtonBox>

          </ModalContent>
        </ModalContainer>
    );
};

export default DeleModal;