import React from 'react';
import UserDataInput from '../../components/input/userDataInput/UserDataInput';
import { useForm } from 'react-hook-form';
import Button from '../../components/button/Button';

// 여기서 제출 버튼 만들고,
// getValues로 입력한 닉네임 값 가져와서 요청에 보내면 될 듯
interface UserPasswordProps {
  onNext: () => void; // 다음 단계로 이동하는 함수
}

const UserNickname: React.FC<UserPasswordProps> = ({ onNext }) => {
  const {
    // watch, // 입력 필드 값 확인
    // getValues,
    register, // 유효성 검사와 값 관리에 사용
    formState: { isValid, errors }, // 폼 상태 값
  } = useForm({ mode: 'onChange' }); // mode: onChange로 설정

  const onSubmit = () => {
    onNext(); // 부모 컴포넌트에서 전달된 onNext 호출
  };

  return (
    <div className="w-full flex flex-col items-center m-0">
      {' '}
      {/* 전체 wrapper */}
      {/* UserDataInput wrapper */}
      <div className="w-[300px] pb-[200px]">
        <UserDataInput
          id="userNickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          requiredMessage="닉네임은 필수 입력 항목입니다"
          pattern={{
            value: /^[가-힣]{2,5}$/, // 한글 2~5자 허용
            message: '5자 내로 작성해주세요',
          }}
          position="center"
          register={register}
          errors={errors}
        />
      </div>
      <Button
        content="다음"
        bgColor="bg-primary"
        size="xl"
        disabled={!isValid}
        onClick={onNext}
      />
    </div>
  );
};

export default UserNickname;
