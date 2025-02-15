import React from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';

const RecodingButton = styled.button`
  width: 345px;
  height: 56px;
  border-radius: 100px;
  background: #722a2a;
  color: #fff;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.45px;
  border: none;
  cursor: pointer;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;



const Recoding: React.FC<{onClick:()=>void}> = ({ onClick}) => {

  const location = useLocation();
  const { beverageId } = useParams<{ beverageId: string }>();

  // ✅ 현재 경로에 따라 버튼 텍스트 변경
  const buttonText = location.pathname.includes(`/mypage/record/${beverageId}`)
    ? '수정하기'
    : '기록하기';
  return (
    <Center>
      <RecodingButton onClick={onClick} >
        {buttonText}
      </RecodingButton>
    </Center>
  );
};

export default Recoding;
