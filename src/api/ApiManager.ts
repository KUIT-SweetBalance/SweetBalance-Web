import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

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

// 응답 인터셉터
ApiManager.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('응답 인터셉터 실행 성공');
    return response;
  },
  (error) => {
    console.log('응답 인터셉터 실행 실패');
    return Promise.reject(error);
  },
);

export default ApiManager;
