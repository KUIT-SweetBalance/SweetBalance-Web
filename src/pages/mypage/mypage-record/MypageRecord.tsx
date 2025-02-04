import React from 'react';
import Header from '../../../components/header/Header'; 
import SearchInput from '../../../components/input/searchInput/SearchInput';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
import Arrangement from './Arrangement';
import MypageDrinkInfo from './MypageDrinkInfo';
interface DrinkInfo {
  id: number; // 유니크한 식별자
  date: {
  year: number;
  month: number;
  day: number;
  weekday: string; // "월", "화" 등 요일
  };
  time: {
  hour: number;
  minute: number;
  };
  brand: string; // 브랜드 (예: "스타벅스")
  name: string; // 음료 이름 (예: "아이스 카페 아메리카노")
  size: string; // 사이즈 (예: "tall")
  syrup: number; // 시럽 개수 (예: 0)
  sugar: string; // 당 함량 (예: "0g")
  calories: string; // 칼로리 (예: "0 kcal")
  imageUrl: string; // 음료 이미지 URL
}
const Padding = styled.div`
padding: 25px;
`;
const MypageRecord: React.FC = () => {
  const drink: DrinkInfo = {
    id: 15,
    date: {
      year: 2024,
      month: 11,
      day: 26,
      weekday: "화",
    },
    time: {
      hour: 13,
      minute: 23,
    },
    brand: "스타벅스",
    name: "아이스 카페 아메리카노",
    size: "tall",
    syrup: 0,
    sugar: "0",
    calories: "0",
    imageUrl: "/Drinkinfo/americano.svg",
  };
     const {
        // watch, // 입력 필드 값 실시간 확인
        getValues, // 입력값 가져오기
        register, // 유효성 검사와 값 관리에 사용
      } = useForm(); // mode: onChange로 설정
      const handleSearchClick = () => {
        const inputValue = getValues('SearchDrink');
        console.log(inputValue);
      };
    return (
        <>
        <Header headerTitle='나의 기록 목록' confirmButton='완료' />
        <Padding>
            <SearchInput id='MypageRecord' type='input' placeholder='검색어로 빠르게 기록 찾기' register={register}
            onSearch={handleSearchClick} />
        </Padding>
        <Arrangement title ='내가 즐겨찾기한 음료'/>
        <MypageDrinkInfo drink = {drink}/>
        {/* <DrinkInfo/> */}
        </>
    );
};

export default MypageRecord;