import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Reissue: React.FC = () =>{
    const navigate = useNavigate()
    useEffect(() => {
        // 현재 URL에서 `refreshToken`을 가져옴
        const urlParams = new URLSearchParams(window.location.search);
        const refreshToken = urlParams.get("refresh");
        const saveRefreshTokenToCookie = (refreshToken: string) => {
            document.cookie = `refreshToken=${refreshToken}; path=/; secure; HttpOnly;`;
            console.log("쿠키 저장완료")
          };
        if (refreshToken) {
          console.log("🔄 Refresh Token 확인:", refreshToken);
          saveRefreshTokenToCookie(refreshToken);
          reissueToken(refreshToken);
        }
      }, []);
      
      const reissueToken = async (refreshToken: string) => {
        try {
          const response = await axios.post("/api/auth/reissue", 
            { refreshToken },
            { withCredentials: true } // 쿠키도 자동으로 포함
          );
    
          console.log("✅ Access Token 재발급 성공:", response.data.accessToken);
          localStorage.setItem("accessToken", response.data.accessToken);
        //   navigate("/home"); 
        } catch (error) {
          console.error("❌ Access Token 재발급 실패:", error);
        //   navigate("/auth-selection"); 

        }
      };
    return (
<>

</>
    )
}
export default Reissue;