// 닉네임
// 비밀번호
// 프로필 한 줄 소개 설정
// 브랜드와 제품 검색, 나의 음료 기록 검색

import React from 'react';
import { useForm } from 'react-hook-form';

const UserDataInput = () => {
  // validation
  const {
    register, // 폼의 유효성 확인
    handleSubmit, // 폼 제출
    watch, // 입력폼의 값 실시작 확인(e.target.value 확인하는 기능)
    formState: { errors }, // 폼의 에러, 제출여부 등 확인 // { errors, isSubmitting, isDirty, isValid }
  } = useForm({ mode: 'onChange' }); //  mode: 'onChange'로 실시간 오류 메세지 출력 가능

  // form 제출 시 실행되는 메서드
  const onSubmit = (data: string) => {
    console.log(data);
  };

  // 에러 핸들링용 메서드
  const onError = (errors: string) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* 닉네임 */}
      <input
        type="text"
        placeholder="닉네임을 입력해주세요."
        {...register('userNickname', {
          required: '닉네임은 필수 항목입니다.',
          pattern: {},
        })}
      />
    </form>
  );
};

export default UserDataInput;
