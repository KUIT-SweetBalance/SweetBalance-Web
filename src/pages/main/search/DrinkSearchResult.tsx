import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import useLargeFavoriteDrinkModalStore from '../../../store/modal/LargeFavoriteModalStore';
import LargeFavoriteDrinkModal from '../modal/LargeFavoriteDrinkModal';

const DrinkSearchResult = () => {
  const { cafeName, drinkName } = useParams();

  const {
    // watch, // 입력 필드 값 실시간 확인
    getValues, // 입력값 가져오기
    register, // 유효성 검사와 값 관리에 사용
  } = useForm(); // mode: onChange로 설정

  // 검색버튼 클릭 시 실행되는 메서드
  const handleSearchClick = () => {
    const inputValue = getValues('SearchDrink');
    console.log(inputValue);
  };

  // 네비게이션
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center mt-[60px] w-full">
      {/* <AppTitle leftButton={true} /> */}

      <div className="flex justify-center w-full pb-[10px] px-[23px]">
        <button type="button" className="mr-[20px]">
          <img
            src="/chevron-left-primary.png"
            alt="뒤로가기"
            className="w-[8px] h-[14px]"
            onClick={handleBackClick}
          />
        </button>

        <div className="flex w-full">
          <SearchInput
            id="SearchDrink"
            type="text"
            placeholder="제품명을 검색해주세요."
            register={register}
            onSearch={handleSearchClick}
          />
        </div>
      </div>

      <p className="w-full my-[20px] pl-[24px] space-x-[6px]">
        {cafeName && (
          <span className="text-[18px] text-gray_text">
            {cafeName}&nbsp;내&nbsp;
          </span>
        )}
        <span className="text-[18px] font-[600]">'{drinkName}'&nbsp;</span>
        <span className="text-[18px] text-gray_text">검색 결과&nbsp;</span>
        <span className="text-[18px] text-primary">{8}</span>
      </p>

      <div className="flex flex-col w-full  mb-5">
        <DrinkInfo
          drinkName="아이스 아메리카노"
          isFavoriteBtnExist={true}
          cafeNameTop="투썸플레이스"
          sugar={1}
        />
        <DrinkInfo
          drinkName="아이스 아메리카노"
          isFavoriteBtnExist={true}
          cafeNameTop="투썸플레이스"
          sugar={1}
        />
        <DrinkInfo
          drinkName="아이스 아메리카노"
          isFavoriteBtnExist={true}
          cafeNameTop="투썸플레이스"
          sugar={1}
        />
        <DrinkInfo
          drinkName="아이스 아메리카노"
          isFavoriteBtnExist={true}
          cafeNameTop="투썸플레이스"
          sugar={1}
        />
      </div>
    </div>
  );
};

export default DrinkSearchResult;
