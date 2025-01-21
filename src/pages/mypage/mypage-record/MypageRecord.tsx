import React from 'react';
import NavigateHeader from '../../../components/header/NavigateHeader';
import SearchInput from '../../../components/input/searchInput/SearchInput';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DrinkInfo from '../../../components/drinkInfo/DrinkInfo';
const Padding = styled.div`
padding: 25px;
`;
const MypageRecord: React.FC = () => {
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
        <NavigateHeader headerTitle='나의 기록 목록' confirmButton='완료' />
        <Padding>
            <SearchInput id='MypageRecord' type='input' placeholder='검색어로 빠르게 기록 찾기' register={register}
            onSearch={handleSearchClick} />
        </Padding>
        {/* <DrinkInfo/> */}
        </>
    );
};

export default MypageRecord;