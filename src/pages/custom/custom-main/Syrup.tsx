import React ,{useState}from 'react';
import styled from 'styled-components';
import Recoding from './Recording';
import Pump from './pump';
import SyrupSelect from './SyrupSelect/SyrupSelect';
import { RecoringDrink } from '../../../api/mypage/record/MypageRecord';
import { ReviseCustomDrink, ReviseDrink,ReviseDrinks } from '../../../api/custom/custommain';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';


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
  z-index: 2;
  `;
const SlideUpContainer = styled.div`
 position: fixed;
  bottom: -40px;
  width: 100%;
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


const Syrup: React.FC<{Syrupmenu: string[];  Syrup:RecoringDrink;beverageSizeId:number;beverageId:number }> = ({Syrupmenu,Syrup,beverageSizeId,beverageId}) => {
  const [syrupName, setSyrupName] = useState(Syrup.syrupName ?? "시럽 없음");
  const [syrupCount, setSyrupCount] = useState(Syrup.syrupCount);
  const navigate = useNavigate();
  const handleSyrupCountChange = (newCount: number) => {
    if (newCount >= -4 && newCount <= 4) {
      setSyrupCount(newCount);
    }
  };

  // ✅ 시럽 이름 변경 함수
  const handleSyrupNameChange = (newName: string) => {
    setSyrupName(newName);
  };  

   // ✅ useMutation에서 `mutationFn`을 올바르게 사용
   const mutation = useMutation({
    mutationFn: ReviseCustomDrink, // 함수 자체를 참조 (호출 X)
    onSuccess: (data) => {
      console.log('음료 수정 성공:', data);
      alert('음료 수정이 완료되었습니다! 🎉');
    },
    onError: (error) => {
      console.error('음료 수정 실패:', error);
      alert('음료 수정 중 오류가 발생했습니다. ❌');
    },
  });
  let revisedrinks: ReviseDrinks | undefined;
  const beverageLogId = Syrup.beverageLogId
  if (
    syrupName && syrupName.trim().length > 0 && 
    Number.isInteger(beverageSizeId) && beverageSizeId > 0 &&  // ✅ 숫자 체크
    syrupCount !== undefined && syrupCount !== null
  ) {
    revisedrinks = {
      beverageSizeId,
      beverageId,
      syrupName,
      syrupCount,
      beverageLogId,
      //: beverageId.toString() // ✅ API가 문자열을 요구할 경우 변환
    };
  }
  // ✅ 버튼 클릭 시 mutation 실행
  const handleClick = () => {
    console.log(revisedrinks)
    if (revisedrinks) {
      mutation.mutate(revisedrinks);
      // 여기에 navigate 넣으면 됨
      navigate('/edit/completed')
    } else {
      console.log(revisedrinks)
      alert('음료 정보를 입력하세요.');
    }
  };
  return (
        <SlideUpContainers>
          <SlideUpContainer >
            <SyrupCotainer>
              <SyrupSelect Syrupmenu={Syrupmenu} syrupName={syrupName} onSyrupChange={handleSyrupNameChange}/>
            </SyrupCotainer>
                    {/* 시럽량 조절 */}
            <SyrupControlContainer>
              <SyrupTitle>
                <SyrupLabel>시럽량 조절</SyrupLabel>
                <SyrupsubLabel>최대 5펌프까지 빼거나 추가할 수 있어요</SyrupsubLabel>
              </SyrupTitle> 

              <Pump Syrup={syrupCount} handleSyrupCountChange={handleSyrupCountChange}/>
            </SyrupControlContainer>

            <Recoding  onClick={handleClick}/>
          </SlideUpContainer>
        </SlideUpContainers>
    );
};

export default Syrup;