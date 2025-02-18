import ApiManager from "../../ApiManager";
import { useNavigate } from "react-router-dom";
export const LogoutApi = async () =>{
    const navigate = useNavigate();

    try {
        const response = await ApiManager.post(
            "https://13.125.187.188.nip.io/api/auth/sign-out",
            {},
            {
                withCredentials: true, // ✅ 쿠키 자동 포함 (headers에 넣지 말 것!)
            }
        );
        console.log("logout 성공",response)
        navigate("/")
    }

    catch(error){
        console.error("logout 실패",error);
    }


}