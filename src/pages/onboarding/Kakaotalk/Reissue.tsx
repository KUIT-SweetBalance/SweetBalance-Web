import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiManager from "../../../api/ApiManager";

const Reissue: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ URL에서 refreshToken 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    let refreshToken = urlParams.get("refresh");

    // ✅ 쿠키에서 refreshToken 가져오기 (URL에 없으면)
    if (!refreshToken) {
      refreshToken = getRefreshTokenFromCookie();
    }

    if (refreshToken) {
      console.log("🔄 Refresh Token 확인:", refreshToken);
      saveRefreshToken(refreshToken); // ✅ refreshToken 저장
      reissueToken();
    }
  }, []);

  // ✅ 쿠키에서 refreshToken 가져오는 함수
  const getRefreshTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    const refreshTokenCookie = cookies.find((row) => row.startsWith("refreshToken="));

    return refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;
  };

  // ✅ refreshToken을 localStorage와 쿠키에 저장하는 함수
  const saveRefreshToken = (refreshToken: string) => {
    localStorage.setItem("refreshToken", refreshToken);
    
    // ✅ 쿠키에 저장 (HttpOnly는 서버에서 설정해야 함)
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; SameSite=None`;
    
    console.log("✅ Refresh Token 저장 완료");
  };

  // ✅ refreshToken을 쿠키에 담아 accessToken을 재발급하는 함수
  const reissueToken = async () => {
    try {
      const response = await ApiManager.post(
        "/api/auth/reissue",
        {}, // ✅ body는 빈 객체
        {
          withCredentials: true, // ✅ 쿠키 자동 포함
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
    }
  };

  return <></>;
};

export default Reissue;
