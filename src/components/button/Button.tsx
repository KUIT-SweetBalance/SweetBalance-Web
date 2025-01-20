import React from 'react';

/* 버튼의 bgColor와 size만 props -> border color, font color는 버튼 종류에 따라 다르게 설정됨*/
interface ButtonProps {
  content: string; // 버튼 내용
  bgColor: 'bg-primary' | 'bg-gray_light' | 'bg-white'; // 버튼 배경 색상
  size: 'xl' | 'lg' | 'md' | 'sm'; // 버튼 사이즈
  disabled?: boolean;
  onClick?: () => void;
}

const sizeClass = {
  xl: 'w-[calc(100%-48px)] h-[6.52vh]',
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
      className={`${combinedClassName} ${bgColor} ${sizeClass[size]} flex justify-center items-center rounded-[100px]`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
