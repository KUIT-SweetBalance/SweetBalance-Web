import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiManager from "../../../api/ApiManager";

const Reissue: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ 현재 URL에서 `refreshToken`을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const refreshToken = urlParams.get("refresh");

    if (refreshToken) {
      console.log("🔄 Refresh Token 확인:", refreshToken);
      saveRefreshToken(refreshToken); // ✅ refreshToken 저장
      reissueToken();
    }
  }, []);

  // ✅ refreshToken을 localStorage와 쿠키에 저장하는 함수
  const saveRefreshToken = (refreshToken: string) => {
    localStorage.setItem("refreshToken", refreshToken);
    
    // ✅ 쿠키에 저장 (HttpOnly는 서버에서 설정해야 함)
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; SameSite=None`;
    
    console.log("✅ Refresh Token 저장 완료 6");
  };

  // ✅ refreshToken을 쿠키에 담아 accessToken을 재발급하는 함수
  const reissueToken = async () => {
    try {
      const response = await ApiManager.post(
        "https://13.125.187.188.nip.io/api/auth/reissue",
        {}, // ✅ body는 빈 객체
        {
          withCredentials: true, // ✅ 쿠키 자동 포함 (headers에 넣지 말 것!)
        }
      );

      console.log("✅ Access Token 재발급 성공:", response.data.data.access);
      console.log("응답",response)
      // ✅ 새로운 accessToken을 localStorage에 저장
      localStorage.setItem("accessToken", response.data.data.access);

      // ✅ ApiManager의 Authorization 헤더 업데이트
      ApiManager.defaults.headers.Authorization = `Bearer ${response.data.data.access}`;

      navigate("/home"); // ✅ 홈으로 이동
    } catch (error) {
      console.error("❌ Access Token 재발급 실패:", error);
      // navigate("/auth-selection"); // 로그인 화면으로 이동
    }
  };

  return <></>;
};

export default Reissue;
