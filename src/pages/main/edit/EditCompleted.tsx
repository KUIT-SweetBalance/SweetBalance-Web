import React from 'react';
import EditCompletedImage from '../../../assets/edit-completed.png';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';

// 디자인 미완료
const EditCompleted = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-[calc(100%-48px)] items-center text-center mt-[50px] mb-[110px]">
        <p className="text-[18px] mb-[45px]">당 0g 기록을 완료했어요!</p>
        <img
          src={EditCompletedImage}
          alt="수정완료"
          className="w-[165px] h-[165px]"
        />
      </div>

      <div className="w-full h-[15px] mt-7 bg-[#F4F4F4]"></div>

      <div className='w-[calc(100%-70px)]'>
        <p className="text-[16px] mt-[30px] mb-[20px]">
          해당 메뉴를 즐겨찾기로 등록하시겠어요?
        </p>
        <div>
          <DrinkInfo
            cafeName="스타벅스"
            drinkName="아이스 아메리카노"
            sugar={0}
            kcal={0}
            size="tall"
            marginRight="4"
          />
        </div>
      </div>
    </div>
  );
};

export default EditCompleted;
