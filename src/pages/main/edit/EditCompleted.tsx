import React from 'react';
import EditCompletedImage from '../../../assets/edit-completed.png';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import SugarProgressCircle from './SugarProgressCircle';

// 디자인 미완료
const EditCompleted = () => {
  return (
    <div className="flex flex-col items-center mt-[50px]">
      {/* // mt-[50px]: statusbar영역 */}
      <div className="flex justify-center items-center mx-[60px] my-[85px]">
        <div className="flex justify-center items-center">
          <SugarProgressCircle sugarAmount={25} />
        </div>
      </div>

      <div className="w-full h-[15px] mt-7 bg-[#F4F4F4]"></div>

      <div className="w-[calc(100%-70px)]">
        <p className="text-[16px] mt-[30px] mb-[20px]">
          해당 메뉴를 즐겨찾기로 등록하시겠어요?
        </p>
        <div>
          <DrinkInfo
            cafeName="스타벅스"
            drinkName="아이스 아메리카노"
            sugar={0}
            syrupType="딸기 시럽"
            syrup={2}
            size="tall"
          />
        </div>
      </div>
    </div>
  );
};

export default EditCompleted;
