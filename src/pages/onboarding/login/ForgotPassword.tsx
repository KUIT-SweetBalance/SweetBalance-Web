import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';

const TopMessage = () => {
  return (
    <div className={`flex flex-col gap-[10px] pt-[45px] pl-[30px] pb-[30px]`}>
      <div className={`text-[30px]`}>비밀번호 찾기</div>
      <div className={`text-[18px]`}>
        이전에 사용하셨던 닉네임을 입력해주세요.
      </div>
    </div>
  );
};

const Input = ({ onSubmit }: { onSubmit: (nickname: string) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ nickname: string }>({ mode: 'onChange' }); // 실시간 유효성 검사

  const handleFormSubmit = (data: { nickname: string }) => {
    onSubmit(data.nickname); // 상위 컴포넌트에 닉네임 전달
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-[15px]"
    >
      <div
        className={`w-[100%-50px] mx-auto h-[550px] flex flex-col justify-center gap-[10px]`}
      >
        <input
          type="text"
          autoComplete="off" // 자동완성 비활성화
          placeholder="닉네임을 입력해주세요."
          {...register('nickname', {
            required: '닉네임은 필수 입력 항목입니다.',
          })}
          className={` h-[6.7vh] p-4 border rounded-full text-base focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.nickname ? 'border-red-500' : 'border-gray-300'
          } `}
        />
        {errors.nickname && (
          <p className="text-red-500 text-sm ">{errors.nickname.message}</p>
        )}
      </div>
      <Button
        content="다음"
        size="xl"
        bgColor="bg-primary"
        disabled={!isValid}
      />
    </form>
  );
};

const TempPasswordMessage = ({ tempPassword }: { tempPassword: string }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-[10px] pt-[45px] pl-[30px] pb-[30px]">
        <p className="text-[30px]">임시 비밀번호입니다</p>
        <p className="text-[18px]">보안을 위해 24시간 내 변경해주세요</p>
      </div>
      <div className={`h-[550px] flex items-center`}>
        <div
          className={`w-[calc(100%-150px)] h-[6.7vh] flex items-center justify-center bg-[rgba(214, 172, 138, 0.20)] text-[24px] rounded-full text-[#F0807F]
          border-[1px] 
          border-solid 
          border-[var(--alert,_#F0807F)]
          mx-auto
          `}
        >
          {tempPassword}
        </div>
      </div>
      <div className={`pt-[15px] pb-[20px]`}>
        <Button
          content="완료"
          bgColor="bg-primary"
          size="xl"
          disabled={false}
          onClick={() => navigate('/login')}
        />
      </div>
    </>
  );
};

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [tempPassword, setTempPassword] = useState('');

  const handleNicknameSubmit = (nickname: string) => {
    console.log('닉네임 입력됨:', nickname);
    // 여기서 임시 비밀번호 생성 (서버 요청으로 받아오기 ..?)
    const newPassword = '1234'; // 서버 연결 전 임시 비밀번호
    setTempPassword(newPassword);
    setStep(2); // 다음 페이지 렌더링
  };

  return (
    <>
      {step === 1 && (
        <>
          <TopMessage />
          <Input onSubmit={handleNicknameSubmit} />
        </>
      )}
      {step === 2 && <TempPasswordMessage tempPassword={tempPassword} />}
    </>
  );
};

export default ForgotPassword;
