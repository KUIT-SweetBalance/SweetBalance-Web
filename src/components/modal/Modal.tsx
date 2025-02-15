// import React, { useState, useRef } from 'react';

import Button from '../button/Button';

// // 아직 사용한 곳 없음
const Modal = ({ onClose, email }: { onClose: () => void; email: string }) => {
  return (
    // fixed: 부모 요소나 다른 컨텍스트에 상관없이 뷰포트를 기준으로 위치가 고정
    // inset-0: top, right, bottom, left를 모두 0으로 설정하는 css속성, 즉 요소가 부모 전체를 꽉 채우도록 확장
    <div className="fixed inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center gap-[24px] bg-white rounded-[20px] shadow-lg p-6 w-[calc(100%-48px)] h-[200px]">
        <p className="text-[25px]">
          인증번호가 입력하신 이메일로 전송되었습니다.
        </p>
        <Button
          size="xl"
          bgColor="bg-primary"
          content="확인"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Modal;

// const Modal = ({ onClose, email }: { onClose: () => void; email: string }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-5 rounded-lg">
//         <p className="text-center">
//           인증번호가 입력하신 이메일로 전송되었습니다.
//         </p>
//         <p className="text-center font-semibold">{email}</p>
//         <button
//           onClick={onClose}
//           className="mt-3 w-full bg-red-500 text-white rounded-lg py-2"
//         >
//           확인
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;
