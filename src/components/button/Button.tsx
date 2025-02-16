import React from 'react';

/* 버튼의 bgColor와 size만 props -> border color, font color는 버튼 종류에 따라 다르게 설정됨*/
interface ButtonProps {
  content: string; // 버튼 내용
  bgColor: 'bg-primary' | 'bg-gray_light' | 'bg-white'; // 버튼 배경 색상
  size: 'xl' | 'lg' | 'md' | 'sm'; // 버튼 사이즈
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' 
}

const sizeClass = {
  xl: 'w-[calc(100%-48px)] h-[6.52vh] mx-auto',
  lg: 'w-full h-[6vh] max-w-[calc(100%-60px)] mx-auto', // <main page/오늘/모달/즐겨찾기>
  md: 'w-[35vw] h-[5vh]',
  sm: 'w-[16vw] h-[3.53vh] text-sm',
};

const Button: React.FC<ButtonProps> = ({
  content,
  bgColor,
  size,
  disabled,
  onClick,
  type = 'button' // 기본값
}) => {
  const combinedClassName = (() => {
    switch (bgColor) {
      case 'bg-primary':
        return 'border border-primary text-white';

      case 'bg-gray_light':
        return 'border border-gray_light text-black';

      case 'bg-white':
        return size === 'xl'
          ? 'border border-primary text-primary'
          : 'border border-gray_light text-primary';

      default:
        return '';
    }
  })();

  return (
    <button
      type={type} // type이 'submit'면 이 버튼을 form태그 안에서 사용했을 때 form의 'onSubmit'가 실행됨
      className={`
        ${
          disabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray_light' // disabled 상태
            : `${combinedClassName} ${bgColor}` // 활성 상태
        }
        ${sizeClass[size]} flex justify-center items-center rounded-[100px] 
        `}
      onClick={!disabled ? onClick : undefined} // 비활성화 상태에서 onClick 실행 방지
    >
      {content}
    </button>
  );
};

export default Button;
