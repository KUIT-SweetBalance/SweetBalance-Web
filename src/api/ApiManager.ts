import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useNavigate } from 'react-router-dom';


// Axios 인스턴스 생성
const ApiManager: AxiosInstance = axios.create({
  baseURL: 'https://api.sweetbalance.site', // 기본 API URL
  headers: {
    'Content-Type': 'application/json'
    // username6의 access token
  },
  timeout: 5000, // 요청 타임아웃
});

// 요청 인터셉터
ApiManager.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const token = localStorage.getItem('token'); // 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log('token data: ', token);
    }
    console.log('요청 인터셉터 실행 성공');
    return config;
  },
  (error) => {
    // 요청 오류 처리
    console.log('요청 인터셉터 오류 발생');
    return Promise.reject(error);
  },
);
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
    
    } catch (error) {
    console.error("❌ Access Token 재발급 실패:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    delete ApiManager.defaults.headers.Authorization;
    
    // ✅ 로그인 페이지로 이동
    window.location.href = "/auth-selection";
    }
};
// 응답 인터셉터
ApiManager.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    console.error("❌ [interceptors.response] 요청 실패:", error);

    const originalRequest = error.config;
    const errorCode = error.response?.data?.code;

    console.log("🛑 [interceptors.response] 에러 코드:", errorCode);
    if (!originalRequest._retry) {
      originalRequest._retry = true; // ✅ 무한 루프 방지
      const errorCode = error.response?.data?.code;

      if ([402, 403, 404].includes(errorCode)) {
        console.log("🔄 토큰 만료 감지! 재발급 시도 중...");
         await reissueToken()
         return ApiManager(originalRequest); // ✅ 기존 요청 다시 시도

      }
      else if(([401,405,406,407,408,409].includes(errorCode)))
      {console.log("🔄 리프레쉬 토큰 이상 감지! 로그인으로 이동합니다....");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        delete ApiManager.defaults.headers.Authorization;
        window.location.href = "/auth-selection";
      }
    }

    return Promise.reject(error);
  }
);

export default ApiManager;
