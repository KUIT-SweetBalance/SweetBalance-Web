import React,{useState} from 'react';
import styled from 'styled-components';
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
const ModalContent = styled.div`
  
  background: #fff;
  border-radius: 20px;
  text-align: center;
  width: 345px;
  height: 373px;
`;

const ModalTitleBox = styled.div`
height: 102px;
padding: 26px 94px 19px 30px;
display: flex;
flex-direction: column;
`;

const ModalTitle = styled.div`
  /* color: #722A2A; */
  color: var(--text, #121212);
font-family: Pretendard;
font-size: 25px;
font-style: normal;
font-weight: 500;
line-height: 28px;
letter-spacing: -0.625px;
`;
const ModalTitleColor =styled.div`
color: var(--primary, #722A2A);
font-family: Pretendard;
font-size: 25px;
font-style: normal;
font-weight: 500;
line-height: 28px;
letter-spacing: -0.625px;`;
const Mo = styled.div`display:flex;
gap: 5px;`;
const ModalSubTitle = styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 28px; /* 200% */
letter-spacing: -0.35px;
text-align: left;`

const ModalContentContent = styled.div`
padding: 0 30px;
display: flex;
flex-direction: column;
gap: 20px;
`;
const SizeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text, #121212);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 28px; /* 140% */
letter-spacing: -0.5px;
`;

const StarIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ModalButton = styled.button`
  width: 100%;
  height:47px;
  background: #722A2A;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
`;
interface SizeProps {
    name: string;
    size: number;
  }

const Modal: React.FC<{ onClick: () => void; sizes: SizeProps[] }> = ({ onClick, sizes })  => {
    
        const [selectedSize, setSelectedSize] = useState<string | null>(null); // 선택된 사이즈
    return (
        <ModalContainer>
                    <ModalContent>
                        <ModalTitleBox>
                            <Mo><ModalTitleColor>즐겨찾는 메뉴</ModalTitleColor><ModalTitle> 등록하기</ModalTitle></Mo>
                            <ModalSubTitle>음료 커스텀 저장은 불가능해요</ModalSubTitle>
                        </ModalTitleBox>
                        <ModalContentContent>
                            {sizes.map((size, index) => (
                                <SizeItem key={index}>
                                    <span>{size.name}</span>
                                    <StarIcon
                                        src={selectedSize === size.name ? "/fillstar.svg" : "/emptystar.svg"}
                                        onClick={() => setSelectedSize(size.name)}
                                    />
                                </SizeItem>
                            ))}
                            <ModalButton onClick={onClick}>완료</ModalButton>
                        </ModalContentContent>
                    </ModalContent>
                </ModalContainer>
    );
};

export default Modal;