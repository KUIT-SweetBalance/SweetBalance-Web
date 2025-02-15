import { useNavigate } from 'react-router-dom';
import DailyIntake from './DailyIntake';
import DrinkInfo from '../../../../components/drinkInfo/DrinkInfo';

const DailyInfo = () => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/edit');
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 표 */}
      <div className="w-[calc(100%-48px)] mt-3">
        <DailyIntake></DailyIntake>
      </div>

      {/* 경계선 */}
      <div className="w-full h-[15px] mt-7 bg-[#F4F4F4]"></div>

      {/* 오늘 마신 음료수 */}
      <div className="flex justify-between w-[calc(100%-48px)] my-5">
        <div className="text-[17px]">오늘 마신 음료수</div>
        <button
          type="button"
          className="text-[14px] text-[#909090]"
          onClick={handleEditClick}
        >
          수정하기
        </button>
      </div>

      {/* 음료 정보 */}
      <div className="flex flex-col w-[calc(100%-70px)] space-y-6 mt-2 mb-5">
        <DrinkInfo
          cafeName="스타벅스"
          drinkName="아이스 아메리카노"
          sugar={0}
          syrupType="딸기시럽"
          syrup={2}
          size="tall"
        />
        <DrinkInfo
          cafeName="더벤티"
          drinkName="카페라떼"
          sugar={0}
          syrupType="딸기시럽"
          syrup={2}
          size="tall"
        />
        <DrinkInfo
          cafeName="스타벅스"
          drinkName="자몽 허니 블랙 티"
          sugar={0}
          syrupType="딸기시럽"
          syrup={2}
          size="tall"
        />
        <DrinkInfo
          cafeName="빽다방"
          drinkName="딸기 스무디"
          sugar={0}
          syrupType="딸기시럽"
          syrup={2}
          size="tall"
        />
      </div>
    </div>
  );
};

export default DailyInfo;
