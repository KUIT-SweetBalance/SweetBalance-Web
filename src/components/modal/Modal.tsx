import React, { useState, useRef } from 'react';

// 아직 사용한 곳 없음
const Modal = () => {
  return (
    // fixed: 부모 요소나 다른 컨텍스트에 상관없이 뷰포트를 기준으로 위치가 고정
    // inset-0: top, right, bottom, left를 모두 0으로 설정하는 css속성, 즉 요소가 부모 전체를 꽉 채우도록 확장
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-[calc(100%-48px)]">
       
      </div>
    </div>
  );
};

export default Modal;
