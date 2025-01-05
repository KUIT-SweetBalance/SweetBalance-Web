import React from 'react';

const TailwindExample = () => {
  return (
    // 전체 화면을 중앙 정렬
    <div className="flex flex-col items-center justify-between h-screen bg-white">
      {/* 상단 로고 및 설명 */}
      <div className="text-center mt-16">
        {/* 로고 텍스트 */}
        <h1 className="text-4xl font-bold text-primary">Sweet Balance</h1>
        {/* 설명 텍스트 */}
        <p className="text-sm text-primary mt-2">
          스마트한 당 관리, 지금 바로 시작하세요!
        </p>
      </div>

      {/* 버튼 섹션 */}
      <div className="space-y-4 mb-16">
        {/* 로그인 버튼 */}
        <button className="w-64 py-3 border-2 border-primary rounded-full text-primary">
          로그인
        </button>
        {/* 회원가입 버튼 */}
        <button className="w-64 py-3 border-2 border-primary rounded-full text-primary">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default TailwindExample;
