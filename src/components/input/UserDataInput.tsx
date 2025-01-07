// 닉네임
// 비밀번호
// 프로필 한 줄 소개 설정
// 브랜드와 제품 검색, 나의 음료 기록 검색

import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

const UserDataInput = () => {
  // validation
  const {
    register, // 폼의 유효성 확인
    handleSubmit, // 폼 제출
    // watch, // 입력폼의 값 실시작 확인(e.target.value 확인하는 기능)
    formState: { errors }, // 폼의 에러, 제출여부 등 확인 // { errors, isSubmitting, isDirty, isValid }
  } = useForm({ mode: 'onChange' }); 
  // mode가 'onChange'면 입력 필드 값 변경마다 유효성 검사 실행
  // mode가 'OnBlur'면 입력 필드가 포커스를 잃을 때 유효성 검사 실행
  // onSubmit은 폼 제출 시에만 유효성 검사 실행 

  // form 제출 시 실행되는 메서드
  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  // 에러 핸들링용 메서드
  const onError = (errors: unknown) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* 닉네임 */}
      <div>
        <label htmlFor="userNickname"></label>
        <input
          id="userNickname"
          type="text"
          placeholder="닉네임을 입력해주세요."
          {...register('userNickname', {
            // 입력값이 제출될 때의 key값
            required: '닉네임은 필수 항목입니다.', // 필수 입력 메시지
            pattern: {
              value: /^[가-힣]{2,5}$/, // 한글 2~5자 정규식
              message: '닉네임은 2자 이상 5자 이내의 한글이어야 합니다.', // 유효성 검사를 통과하지 못했을 때, React Hook Form의 formState 객체의 errors에 저장됨
            },
          })}
        />
        {/* 유효성 검사 실패 시 오류 메시지 */}
        {typeof errors.userNickname?.message === 'string' && (
          <p>{errors.userNickname.message}</p>
          // jsx에서는 string만 렌더링 가능하므로 타입 명시
        )}
      </div>
    </form>
  );
};

export default UserDataInput;
