import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiManager from "../../../api/ApiManager";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import { fetchUserInfo } from "../../../api/mypage/main/MypageMain";
const Reissue: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ 유저 정보 불러오기 (최상단에서 선언)
  const { data } = useQuery({
    queryKey: ["UserInfo"],
    queryFn: fetchUserInfo,
    enabled: false, // 처음에는 실행하지 않음
  });

  useEffect(() => {
    reissueToken();
  }, []);
 


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
    localStorage.setItem("refresh", response.data.data.refresh);
    localStorage.setItem("token", response.data.data.access);

    ApiManager.defaults.headers.Authorization = `Bearer ${response.data.data.access}`;
    

    await queryClient.invalidateQueries({ queryKey: ["UserInfo"] });

   
    console.log("데이터 잘 되는지",data)
    if(data?.data.gender===null){
        navigate("/kakaosetting"); // ✅ 홈으로 이동

    }      
    navigate("/kakaosetting"); // ✅ 홈으로 이동

    } catch (error) {
    console.error("❌ Access Token 재발급 실패:", error);
      navigate("/auth-selection"); // 로그인 화면으로 이동
    }
};

    return <></>;
};

export default Reissue;
