import React from 'react';
import UserDataInput from '../../components/input/userDataInput/UserDataInput';
import { useForm } from 'react-hook-form';

const UserNickname = () => {
    const {
        handleSubmit, // 폼 제출 메서드
        // watch, // 입력 필드 값 확인
        // getValues,
        register,
        formState: { isValid, errors }, // 폼 상태 값
      } = useForm({ mode: 'onChange' }); // mode: onChange로 설정

  // form 제출 시 실행되는 메서드
  const onSubmit = (data: unknown) => {
    console.log(data);
    console.log(isValid)
  };

  // 에러 핸들링용 메서드
  const onError = (errors: unknown) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <UserDataInput
        id="userNickname"
        type="text"
        placeholder="닉네임을 입력해주세요"
        requiredMessage="닉네임은 필수 입력 항목입니다"
        pattern={{
          value: /^[가-힣]{2,5}$/, // 한글 2~5자 허용
          message: '닉네임은 2자 이상 5자 이내의 한글이어야 합니다.',
        }}
        position="center"
        register={register}
        errors={errors}
      />
    </form>
  );
};

export default UserNickname;
