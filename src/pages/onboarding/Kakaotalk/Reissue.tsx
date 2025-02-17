import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiManager from "../../../api/ApiManager";

const Reissue: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 URL에서 `refreshToken`을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const refreshToken = urlParams.get("refresh");

    if (refreshToken) {
      console.log("🔄 Refresh Token 확인:", refreshToken);
    //   saveRefreshToken(refreshToken); // ✅ refreshToken 저장
      reissueToken();
    }
  }, []);

  // ✅ refreshToken을 localStorage와 쿠키에 저장하는 함수
//   const saveRefreshToken = (refreshToken: string) => {
//     localStorage.setItem("refreshToken", refreshToken);
//     document.cookie = `refresh=${refreshToken}; path=/; secure; HttpOnly`;
//     console.log("✅ Refresh Token 저장 완료");
//   };

  // ✅ refreshToken을 쿠키에 담아 accessToken을 재발급하는 함수
  const reissueToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("❌ Refresh Token 없음");

      const response = await axios.post(
        "/api/auth/reissue",
        {}, // ✅ body는 빈 객체
        {
          withCredentials: true, // ✅ 쿠키 자동 포함
          headers: {
            Cookie: `refresh=${refreshToken}`, // ✅ 쿠키 헤더에 refreshToken 추가
          },
        }
      );

      console.log("✅ Access Token 재발급 성공:", response.data.access);
      
      // ✅ 새로운 accessToken을 localStorage에 저장
      localStorage.setItem("accessToken", response.data.access);

      // ✅ ApiManager의 Authorization 헤더 업데이트
      ApiManager.defaults.headers.Authorization = `Bearer ${response.data.access}`;

      navigate("/home"); // ✅ 홈으로 이동
    } catch (error) {
      console.error("❌ Access Token 재발급 실패:", error);
      // navigate("/auth-selection"); // 로그인 화면으로 이동
    }
  };

  return <></>;
};

export default Reissue;
