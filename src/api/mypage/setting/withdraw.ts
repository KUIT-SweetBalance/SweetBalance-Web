import ApiManager from "../../ApiManager";
import { useNavigate } from "react-router-dom";
export const WithdrawApi = async () =>{
    const navigate = useNavigate();

    try {
        localStorage.clear();
        delete ApiManager.defaults.headers.Authorization;
        const response = await ApiManager.post(
            "/api/auth/withdraw"
            
        );
        console.log("탈퇴 성공",response);
        navigate("/")
    }

    catch(error){
        console.error("탈퇴 실패",error);
    }


}