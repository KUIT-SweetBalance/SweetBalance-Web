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
width: 100%;
border-radius: 20px;
background: #FFF;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
text-align: center;
color: var(--text, #121212);
text-align: center;
font-family: Pretendard;
font-size: 25px;
font-style: normal;
font-weight: 500;
line-height: 40px; /* 120% */
letter-spacing: -0.625px;
height: 80px;
`;

const Deleted: React.FC<{ onClick: () => void; }> = ({ onClick})  => {
    
    return (
        <ModalContainer>
          <ModalContent onClick={onClick}>
            삭제가 완료되었습니다!
          </ModalContent>
        </ModalContainer>
    );
};

export default Deleted;