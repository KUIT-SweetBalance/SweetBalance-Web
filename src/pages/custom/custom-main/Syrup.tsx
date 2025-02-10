import React ,{useState}from 'react';
import styled from 'styled-components';
import Recoding from './Recording';
import Pump from './pump';
import SyrupSelect from './SyrupSelect/SyrupSelect';
import { RecoringDrink } from '../../../api/mypage/record/MypageRecord';
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

const SyrupCotainer = styled.div`
padding : 30px 30px 15px 30px;
`;

  interface BeverageSyrup {
    beverageSizeId: number; // 음료 사이즈 ID
    syrupName: string;      // 시럽 이름 (예: "바닐라")
    syrupCount: number;     // 시럽 개수
  }
const Syrup: React.FC<{ onClick: () => void;Syrup:RecoringDrink }> = ({Syrup,onClick}) => {
    return (
        <SlideUpContainers>
          <SlideUpContainer >
            <SyrupCotainer>
              <SyrupSelect brand={Syrup.brand} syrupName={Syrup.syrupName}/>
            </SyrupCotainer>
                    {/* 시럽량 조절 */}
            <SyrupControlContainer>
              <SyrupTitle>
                <SyrupLabel>시럽량 조절</SyrupLabel>
                <SyrupsubLabel>최대 5펌프까지 빼거나 추가할 수 있어요</SyrupsubLabel>
              </SyrupTitle>

              <Pump Syrup={Syrup.syrupCount}/>
            </SyrupControlContainer>

            <Recoding onClick ={onClick} />
          </SlideUpContainer>
        </SlideUpContainers>
    );
};

export default Syrup;