import React from 'react';
import UserDataInput from '../../components/input/userDataInput/UserDataInput';
import { useForm } from 'react-hook-form';

// 여기서 제출 버튼 만들고,
// getValues로 입력한 닉네임 값 가져와서 요청에 보내면 될 듯

const UserNickname = () => {
  const {
    // watch, // 입력 필드 값 확인
    // getValues,
    register, // 유효성 검사와 값 관리에 사용
    formState: { isValid, errors }, // 폼 상태 값
  } = useForm({ mode: 'onChange' }); // mode: onChange로 설정

  return (
    <div>
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
    </div>
  );
};

export default UserNickname;
