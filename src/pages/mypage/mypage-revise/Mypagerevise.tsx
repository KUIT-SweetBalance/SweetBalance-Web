import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../../components/header/Header";
import { fetchUserInfo } from "../../../api/mypage/main/MypageMain";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeUserInfo, changeInfomation } from "../../../api/mypage/revise/Mypagerevise";
import { useNavigate } from "react-router-dom";

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
  width: 100%;
  height: 60px;
  padding: 15px 30px 15px 20px;
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
  width: 100%;
  height: 60px;
  padding: 18px 30px;
  border-radius: 100px;
  border: 2px solid #f3f3f3;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  appearance: none;
`;

const HeaderPadding = styled.div`
  padding: 0 14px 0 21px;
`;

const Mypagerevise: React.FC = () => {
  // ✅ useQuery를 가장 먼저 실행
  const { data, isLoading, error } = useQuery({
    queryKey: ["UserInfo"],
    queryFn: fetchUserInfo,
  });

  // ✅ 기본값 설정
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("OTHER");

  // ✅ useEffect를 사용하여 userinfo 데이터가 들어오면 업데이트
  useEffect(() => {
    if (data?.data) {
      setNickname(data.data.nickname);
      setGender(data.data.gender);
    }
  }, [data]);

  const queryClient = useQueryClient();

  const UserInfoMutation = useMutation({
    mutationFn: ChangeUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UserInfo"] });
    },
    onError: (error) => {
      console.error("유저 정보 수정 실패 ❌:", error);
    },
  });
  const navigate = useNavigate();
  const handleUser = () => {
    if (gender === "OTHER") {
      navigate('/mypage'); // API 호출 없이 바로 이동
      return;
    }
  
    const changeInfo: changeInfomation = {
      nickname,
      gender,
    };
  
    UserInfoMutation.mutate(changeInfo, {
      onSuccess: () => {
        navigate('/mypage'); // 성공 시 이동
      }
    });
  };
  

  // ✅ 로딩 및 오류 처리
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터를 불러오는 중 오류 발생</p>;

  return (
    <>
      <HeaderPadding>
        <Header headerTitle="내 프로필 편집하기" confirmButton="완료" handler={handleUser} />
      </HeaderPadding>
      <MypagereviseBox>
        <MypagereviseItem>
          <MypageTitle>닉네임</MypageTitle>
          <MypageInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="어플에서 사용할 닉네임을 입력해주세요."
          />
        </MypagereviseItem>

        <MypagereviseItem>
          <MypageTitle>이메일</MypageTitle>
          <MypageDisabledInput type="email" value={data?.data.email} disabled />
        </MypagereviseItem>

        <MypagereviseItem>
          <MypageTitle>성별</MypageTitle>
          <MypageSelect value={gender} onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE" | "OTHER")}>
            <option value="OTHER">성별</option>
            <option value="MALE">남자</option>
            <option value="FEMALE">여자</option>
          </MypageSelect>
        </MypagereviseItem>
      </MypagereviseBox>
    </>
  );
};

export default Mypagerevise;
