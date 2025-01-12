import React ,{useState} from 'react';
import styled from 'styled-components';
import Dial from './dial';


interface Props {
    brand : string;
    drink : string;
    sugar : number;
    kcal: number;
    caffeine: number;
}
interface SizeProps {
    name: string;
    size: number;
}
const Container = styled.div`
    width: 100%;
    max-width: 393px;
    height: auto;
    background-color: #FFF;
    @media (max-width: 768px) {
    max-width: 100%;
    }
        `;
const CustomTop = styled.div`
    width: 100%;
    height: 312px;
    border-radius: 0px 0px 20px 20px;
background: #722A2A;
box-shadow: 0px 4px 10px 0px rgba(18, 18, 18, 0.20);
@media (max-width: 768px) {
    height: 200px;
  }
`;
type BrandProps = Pick<Props, 'brand'|'drink'>;
const BrandrinkBox = styled.div`
    height: 112px;
`;
const BrandBox = styled.div`
    display: flex;
    padding : 33px 9px 9px 25px;
    justify-content: space-between;
    align-items: center;
`;
const Brand = styled.div`
    color: #121212;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 111.111% */
    letter-spacing: 0.25px;
`;
const StarBox = styled.div`
    width: 97px;
    height: 30px;;
    border-radius: 30px;
background: #F4F4F4;
display: flex;
align-items: center;
gap:6px;
padding-left: 13px;
padding-right: 15px;
`;
const StarImg = styled.img`
width: 18px;
height: 18px;

`;
const Star = styled.div`
color: #000;
text-align: center;
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;
const Drink = styled.div`
color: #121212;
font-family: Pretendard;
font-size: 30px;
font-style: normal;
font-weight: 700;
line-height: 35px; /* 116.667% */
letter-spacing: 0.25px;

padding: 0px 51px 15px 25px;
height: 50px;

`;
const Brandrink: React.FC<BrandProps & { onClick: () => void }> = ({ brand, drink, onClick }) => {
    return (
        <BrandrinkBox>
            <BrandBox>
                <Brand>{brand}</Brand>
                <StarBox onClick={onClick}>
                    <StarImg src="/fillstar.svg" alt="star" />
                    <Star>즐겨찾기</Star>
                </StarBox>
            </BrandBox>
            <Drink>{drink}</Drink>
        </BrandrinkBox>
    );
};

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
height:20px;
color: rgba(18, 18, 18, 0.50);
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
const GrayBox = styled.div`
    width: 393px;
    height: 15px;
    background: #F4F4F4;
    `;
const SKCBox = styled.div`
    height:126px;
`;
const SKCList = styled.div`
    padding: 42px 60px 42px 59px;
    display: inline-flex;
    align-items: center;
    gap: 78px;`;
const SKCitem = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

`;
const SKCName = styled.div`
color: #121212;
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 142.857% */
letter-spacing: 0.25px;`;
const SKCnumber = styled.div`
color: #121212;
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 100% */
letter-spacing: 0.25px;`;
const SKC : React.FC<Pick<Props, 'sugar'|'kcal'|'caffeine'>> = ({sugar, kcal, caffeine}) => {
    return (
        <SKCBox>
               <SKCList>
                <SKCitem>
                        <SKCName>당류</SKCName>
                        <SKCnumber>{sugar}g</SKCnumber>
                    </SKCitem>
                    <SKCitem>
                        <SKCName>칼로리</SKCName>
                        <SKCnumber>{kcal}kcal</SKCnumber>
                    </SKCitem>
                    <SKCitem>
                        <SKCName>카페인</SKCName>
                        <SKCnumber>{caffeine}mg</SKCnumber>
                    </SKCitem>
               </SKCList>
        </SKCBox>
    )
}
type BrandjustProps = Pick<Props, 'brand'>;
const RecommentBox = styled.div`
    width: 393px;
    
    `;
const RecommendTitle = styled.div`
padding: 30px 0 30px 25px;
color: #121212;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 111.111% */
letter-spacing: 0.25px;
`;
const BoldText = styled.span`
  font-weight: 700; /* 굵게 표시 */
`;
const RecommendDrinkBox = styled.div`
  display: flex;
  overflow-x: auto; /* 가로 스크롤 활성화 */
  scrollbar-width: none;
  padding: 0 35px; /* 좌우 여백 추가 */
    gap : 22px;
`;

const RecommendDrink = styled.div`
  width: 79px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DrinkImg = styled.img`
  width: 79px;
  border-radius: 50%;
 
`;

const DrinkName = styled.div`
    color: var(--text, #121212);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.35px;
  text-align: center;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* 말줄임표 추가 */
  width: 79px;
`;

const DrinkSugar = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

type DrinkAboutBrand = Pick<Props, 'drink'|'sugar'>;
const DownColor = styled.div`
  color: #92ADA4;`;
const UpColor = styled.div`
color:#FED8A6;`;

const Recommend: React.FC<BrandjustProps> = ({brand}) => {
    const recom: DrinkAboutBrand[] = [
        { drink: '허니 자몽 블랙티', sugar: 25 },
        { drink: '유스베리 티', sugar: 0 },
        { drink: '잉글리시 블랙티', sugar: 0 },
        { drink: '캐모마일 티', sugar: 0 },
        { drink: '캐모마일 티', sugar: 0 },
        { drink: '캐모마일 티', sugar: 0 },
        { drink: '캐모마일 티', sugar: 0 },
        { drink: '캐모마일 티', sugar: 0 },
      ];
        return (
           <RecommentBox>
                <RecommendTitle>당류가 비슷한<BoldText> '{brand}' </BoldText>음료 추천!</RecommendTitle>
                <RecommendDrinkBox>
                    {recom.map((item, index) => (
                          <RecommendDrink key={index}>
                          <DrinkImg src="/recomimg.svg" alt="drink" />
                          <DrinkName>{item.drink}</DrinkName>
                          <DrinkSugar >
                            {item.sugar > 0 ? <DownColor>{item.sugar}g ▼</DownColor> : <UpColor>{item.sugar}g ▼</UpColor>}
                          </DrinkSugar>
                        </RecommendDrink>
                    ) )}
                </RecommendDrinkBox>
           </RecommentBox>
        );
    };
const Askinfo = styled.div`
    padding : 22px 0;
    width: 393px;
    color: rgba(18, 18, 18, 0.50);
text-align: center;
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 166.667% */
letter-spacing: -0.3px;
`;
const RecodingButton = styled.button`
width: 345px;
height: 56px;
border-radius: 100px;
background: #722A2A;
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 100% */
letter-spacing: -0.45px;
  border: none; /* 버튼 테두리 제거 */
  cursor: pointer; 
`
const Center = styled.div`
    display: flex;
    justify-content: center;
    `;

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
const SlideUpContainers = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  `;
const SlideUpContainer = styled.div`
 position: fixed;
  bottom: -40px;
  width: 393px;
  height: 570px;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  
  z-index: 10;`;
const SizeLabel = styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 28px; /* 140% */
letter-spacing: -0.5px;
padding: 24px 274px 10px 30px;
`;
const SizeSelector = styled.div`
  display: flex;
  padding: 0 30px 0 30px;
  border-radius : 100px;
`;

const SizeButton = styled.button`
  flex: 1;
  height: 50px;
  border: none;
  background: #f4f4f4; /* 문자열 제거 */
  color: #722a2a; /* 문자열 제거 */
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  &:first-child {
    border-radius: 100px 0 0 100px;
  }
  &:last-child {
    border-radius: 0 100px 100px 0;
  }
  cursor: pointer;
`;

const SizeButtonSelected = styled.button`
  flex: 1;
  height: 50px;
  border: none;
  background: #722a2a; /* 문자열 제거 */
  color: #fff; /* 문자열 제거 */
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  &:first-child {
    border-radius: 100px 0 0 100px;
  }
  &:last-child {
    border-radius: 0 100px 100px 0;
  }
  cursor: pointer;
`;


const SyrupControlContainer = styled.div`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  
`;
const SyrupTitle = styled.div`
    padding: 0 0 26px 0;
    gap:10px;
    display: flex;

`;
const SyrupLabel = styled.div`
    color: var(--text, #121212);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px; /* 140% */
    letter-spacing: -0.5px;
`;
const SyrupsubLabel = styled.div`
    color: rgba(186, 186, 186, 0.50);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
    letter-spacing: -0.3px;
    padding-top: 10px;
`;



const HowBox = styled.div`
  display: flex;
  gap: 148px;
  align-items: center;
  padding: 0 0 24px 30px ;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
`;

const HowTitle = styled.div`
  display: flex;
  align-items: center;
  color: var(--text, #121212);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 28px; /* 140% */
letter-spacing: -0.5px;`;



const DrinkControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ControlButton = styled.button`
    width: 16px;
    height: 16px;

    border-radius: 50%;
    border: 1px solid #ddd;
    background-color: var(--gray, #F4F4F4);
    color: #722a2a;
    font-size: 18px;
    cursor: pointer;
    line-height: 15px;
  
`;

const DrinkCount = styled.div`
 color: var(--text, #121212);
text-align: center;
font-family: Pretendard;
font-size: 25px;
font-style: normal;
font-weight: 600;
line-height: 28px; /* 112% */
letter-spacing: -0.625px;

`;





const CustomMain: React.FC<Props> = ({ brand, drink, sugar, kcal, caffeine }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [selectedSize, setSelectedSize] = useState<string | null>(null); // 선택된 사이즈
    const [isSlideUpOpen, setIsSlideUpOpen] = useState(false); // 슬라이드 업 모달
    const [Size, setSize] = useState("SHORT"); // 선택된 사이즈
    const sizes: SizeProps[] = [
        { name: 'SHORT', size: 236 },
        { name: 'TALL', size: 354 },
        { name: 'GRANDE', size: 473 },
        { name: 'VENTI', size: 591 },
    ];
    const sizess = ["SHORT", "TALL", "GRANDE", "VENTI"];

    const handleStarClick = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };
    const handleRecodingClick = () => {
        setIsSlideUpOpen(true); // 슬라이드 업 모달 열기
    };

    const handleSlideUpClose = () => {
        setIsSlideUpOpen(false); // 슬라이드 업 모달 닫기
    };
    const handleSizeClick = (size: string) => {
        setSize(size);
      };
    
     


    
      const [drinkCount, setDrinkCount] = useState(1); // 기본값: 1잔

      const handleIncrease = () => {
        setDrinkCount((prev) => prev + 1); // +1
      };
    
      const handleDecrease = () => {
        setDrinkCount((prev) => (prev > 1 ? prev - 1 : 1)); // -1, 최소값은 1
      };

      
    return (
        <Container>
            <CustomTop />
            {/* handleStarClick 전달 */}
            <Brandrink brand={brand} drink={drink} onClick={handleStarClick} />
            <SizeComponent sizes={sizes} />
            <SKC sugar={sugar} kcal={kcal} caffeine={caffeine} />
            <GrayBox />
            <Recommend brand={brand} />
            <Askinfo>정보 수정을 요청하고 싶어요</Askinfo>
            <Recoding sugar={sugar} onClick ={handleRecodingClick } />

            {/* 팝업 모달 */}
            {isModalOpen && (
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
                            <ModalButton onClick={handleModalClose}>완료</ModalButton>
                        </ModalContentContent>
                    </ModalContent>
                </ModalContainer>
            )}
              {isSlideUpOpen && (
                <SlideUpContainers>
                <SlideUpContainer >
                    <SizeLabel>사이즈 변경</SizeLabel>
                     <SizeSelector>
                     {sizess.map((size) =>
                      size === Size ? (
                            <SizeButtonSelected
                            key={size}
                            onClick={() => handleSizeClick(size)}
                            >
                            {size}
                            </SizeButtonSelected>
                        ) : (
                            <SizeButton
                            key={size}
                            onClick={() => handleSizeClick(size)}
                            >
                            {size}
                            </SizeButton>
                        )
                        )}
                    </SizeSelector>

                    {/* 시럽량 조절 */}
                    <SyrupControlContainer>
  <SyrupTitle>
    <SyrupLabel>시럽량 조절</SyrupLabel>
    <SyrupsubLabel>최대 5펌프까지 빼거나 추가할 수 있어요</SyrupsubLabel>
  </SyrupTitle>

  <Dial/>
</SyrupControlContainer>

                    <HowBox>
                <HowTitle>
                    몇 잔 마셨나요?
                </HowTitle>
                <DrinkControl>
                    <ControlButton onClick={handleDecrease}>-</ControlButton>
                    <DrinkCount>{drinkCount}</DrinkCount>
                    <ControlButton onClick={handleIncrease}>+</ControlButton>
                </DrinkControl>
              </HowBox>
                    <Recoding sugar={sugar} onClick ={handleSlideUpClose} />
                </SlideUpContainer>
                </SlideUpContainers>
            )}
            
        </Container>
    );
};


export default CustomMain;