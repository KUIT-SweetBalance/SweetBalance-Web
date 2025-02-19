import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useNavigate } from 'react-router-dom';


// Axios 인스턴스 생성
const ApiManager: AxiosInstance = axios.create({
  baseURL: 'https://13.125.187.188.nip.io', // 기본 API URL
  headers: {
    'Content-Type': 'application/json'
    // username6의 access token
  },
  timeout: 5000, // 요청 타임아웃
});

// 요청 인터셉터
ApiManager.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = localStorage.getItem('token'); // 토큰 가져오기
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    //   console.log('token data: ', token);
    // }
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
  const navigate = useNavigate()
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
    navigate("/auth-selection")
    }


};
// 응답 인터셉터
ApiManager.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest._retry) {
      originalRequest._retry = true; // ✅ 무한 루프 방지
      const errorCode = error.response?.data?.code;

      if ([402, 403, 404].includes(errorCode)) {
        console.log("🔄 토큰 만료 감지! 재발급 시도 중...");
        
        await reissueToken();
        return ApiManager(originalRequest); // ✅ 기존 요청 다시 시도
        
      }
    }

    return Promise.reject(error);
  }
);

export default ApiManager;
