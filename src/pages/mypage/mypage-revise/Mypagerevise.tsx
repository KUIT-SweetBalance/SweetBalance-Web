import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../../components/header/Header";

const MypagereviseBox = styled.div`
  margin-top: 35px;
`;

const MypagereviseItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 24px 5px 24px;
  gap: 10px;
`;

const MypageTitle = styled.div`
  color: #121212;
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.45px;
`;

const MypageInput = styled.input`
  width: 345px;
  height: 60px;
  padding: 20px 30px;
  border-radius: 100px;
  border: 2px solid #f3f3f3;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  outline: none;
`;

const MypageDisabledInput = styled(MypageInput)`
  background: #f1f1f1;
  color: #b3b3b3;
  cursor: not-allowed;
`;

const MypageSelect = styled.select`
  width: 345px;
  height: 60px;
  padding: 18px 30px;
  border-radius: 100px;
  border: 2px solid #f3f3f3;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
`;

const Mypagerevise: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [sex, setSex] = useState("");

  return (
    <>
      <Header headerTitle="내 프로필 편집하기" confirmButton="완료" />
      <MypagereviseBox>
        {/* 닉네임 입력 */}
        <MypagereviseItem>
          <MypageTitle>닉네임</MypageTitle>
          <MypageInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="어플에서 사용할 닉네임을 입력해주세요."
          />
        </MypagereviseItem>

        {/* 이메일 (수정 불가능) */}
        <MypagereviseItem>
          <MypageTitle>이메일</MypageTitle>
          <MypageDisabledInput
            type="email"
            value="sweetbalance@naver.com"
            disabled
          />
        </MypagereviseItem>

        {/* 성별 선택 */}
        <MypagereviseItem>
          <MypageTitle>성별</MypageTitle>
          <MypageSelect value={sex} onChange={(e) => setSex(e.target.value)}>
          <option value="성별">성별</option>
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </MypageSelect>
        </MypagereviseItem>

       
      </MypagereviseBox>
    </>
  );
};

export default Mypagerevise;
