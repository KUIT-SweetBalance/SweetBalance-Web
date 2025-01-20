import React ,{useState} from 'react';
import styled from 'styled-components';

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
  height: 433px;
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

const SyrupSlider = styled.input`
  width: 310px;
  height: 7px;
  border-radius: 10px;
    background: var(--gray, #F4F4F4);
  outline: none;
  appearance: none;
  margin : 0 auto;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #722a2a;
    cursor: pointer;
    position: relative;

  }
 
    &::-moz-range-thumb {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #722a2a;
        cursor: pointer;
    }
`;
const SyrupValueBox = styled.div`
display: flex;
gap :18px;
margin-top: 12px;
justify-content: center;
`;
const Syruptiny = styled.div`
  display: flex;
    align-items: center;
    gap: 18px;
    color:#12121280;
`;
const SyrupValue = styled.div`
  color: var(--primary, #722A2A);
text-align: center;
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 116.667% */
letter-spacing: -0.3px;
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
const SyrupSliderTrack = styled.div`
  position: relative;
  width: 310px;
  height: 7px;
  margin: 0 auto;
  border-radius: 10px;
`;

const SyrupSliderLine = styled.div<{ width: string; left: string }>`
  position: fixed;
  bottom: 189px; /* 슬라이더 중앙 */
  left: ${(props) => props.left}; /* 선의 시작 위치 */
  width: ${(props) => props.width}; /* 선의 길이 */
  height: 7px;
  background-color: #722a2a;
  transform: translateY(-50%);
  transition: all 0.2s ease-in-out;
  border-radius:10px;
`;

const SyrupThumb = styled.div<{ left: string }>`
  position: absolute;
  top: 50%; /* 슬라이더 중앙 */
  left: ${(props) => props.left}; /* 실린더 위치 */
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #722a2a;
  transform: translate(-50%, -50%);
  z-index: 2;
`;


const Slinder = () => {
    // const handleSlideUpClose = () => {
    //     setIsSlideUpOpen(false); // 슬라이드 업 모달 닫기
    // };
    const handleSizeClick = (size: string) => {
        setSize(size);
      };
      const sizess = ["SHORT", "TALL", "GRANDE", "VENTI"];
      const [Size, setSize] = useState("SHORT"); // 선택된 사이즈
      const [syrupLevel, setSyrupLevel] = useState(3); // 시럽 레벨 (1~5)
     
     


      const [step, setStep] = useState(0); // 초기 step 값
    
      const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setSyrupLevel(value);
    
        // 특정 값을 기준으로 step 동적으로 변경
        if (value === 0) {
          setStep(1); // 처음에는 큰 간격
        } else {
          setStep(1); // 그 이후로는 일정한 간격
        }
      };
    const [drinkCount, setDrinkCount] = useState(1); // 기본값: 1잔

    const handleIncrease = () => {
      setDrinkCount((prev) => prev + 1); // +1
    };
  
    const handleDecrease = () => {
      setDrinkCount((prev) => (prev > 1 ? prev - 1 : 1)); // -1, 최소값은 1
    };
  return (
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

<SyrupSliderTrack>
{/* 움직이는 선 */}
<SyrupSliderLine
width={Math.abs(syrupLevel) * 31 + "px"} // 한 단위당 31px로 계산
left={syrupLevel >= 0 ? "50%" : `calc(50% - ${Math.abs(syrupLevel) * 31}px)`}
/>
{/* 슬라이더 Thumb */}

{/* 기본 슬라이더 */}
<SyrupSlider
type="range"
min="-5"
max="5"
step={step}
value={syrupLevel}
onChange={handleSliderChange}
/>
</SyrupSliderTrack>

<SyrupValueBox>
<Syruptiny>5&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;1</Syruptiny>
<SyrupValue>기본 시럽량</SyrupValue>
<Syruptiny>1&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;5</Syruptiny>
</SyrupValueBox>
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
        {/* <Recoding sugar={sugar} onClick ={handleSlideUpClose} /> */}
    </SlideUpContainer>
    </SlideUpContainers>
  );
};
export default Slinder;