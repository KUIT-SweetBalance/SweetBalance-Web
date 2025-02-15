import React from 'react';
import SugarProgressCircle from './SugarProgressCircle';
import { useNavigate } from 'react-router-dom';
import useBottomNaviIndex from '../../../store/bottomNavi/BottomNaviIndex';
const EditCompleted = () => {
  const navigate = useNavigate();
  const { index, setBottomNaviIndex } = useBottomNaviIndex();

  const handleResumeClick = () => {
    setBottomNaviIndex(1);
    navigate('/search');
  };
  const handleHomeClick = () => {
    setBottomNaviIndex(0);
    navigate('/home');
  };

  return (
    <div className="flex flex-col h-full w-full justify-center items-center mt-[50px] mb-[20px]">
      {/* // mt-[50px]: statusbar영역 */}
      <div className="w-full h-full flex justify-center items-center mx-[60px] my-[85px]">
        <div className="flex justify-center items-center">
          <SugarProgressCircle sugarAmount={100} />
        </div>
      </div>

      {/* <div className="w-full h-[15px] mt-7 bg-[#F4F4F4]"></div> */}

      {/* <p className="text-[18px] w-full mt-[30px] pl-[34px] mb-[10px]">
        해당 메뉴를 즐겨찾기로 등록하시겠어요?
      </p>

      <div className="flex flex-col w-full mb-5">
        <DrinkInfo
          drinkName="아이스 아메리카노"
          isFavoriteBtnExist={true}
          cafeNameTop="투썸플레이스"
          sugar={1}
          syrupType='카라멜 시럽'
          syrup={1}
          size='tall'
        />
      </div> */}

      <div className="fixed bottom-0 w-full flex space-x-[17px] mt-[10px] mb-[30px] px-[24px]">
        <button
          type="button"
          className="flex-1 h-[50px] items-center justify-center text-primary text-[18px] border border-1-gray_text rounded-[100px]"
          onClick={handleResumeClick}
        >
          계속 기록하기
        </button>
        <button
          type="button"
          className="flex-1 h-[50px] items-center justify-center text-primary text-[18px] bg-primary text-white rounded-[100px]"
          onClick={handleHomeClick}
        >
          홈으로
        </button>
      </div>
    </div>
  );
};

export default EditCompleted;
