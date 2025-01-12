import axios from 'axios';

// Axios 기본 설정
axios.defaults.baseURL = 'https://your-backend.com';
axios.defaults.withCredentials = true; // 쿠키 전송 허용

let accessToken = localStorage.getItem('accessToken'); // 초기 저장된 토큰 가져오기

// Axios 요청 인터셉터
axios.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios 응답 인터셉터
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.get('/oauth2/authorization/kakao');
        accessToken = data.accessToken;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        }
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (reissueError) {
        console.error('토큰 재발급 실패:', reissueError);
        handleLogout();
      }
      // 쿠키를 가지고고 reissue 를 해줘야한다. 
    }
    return Promise.reject(error);
  }
);

function handleLogout() {
  localStorage.removeItem('accessToken');
  alert('로그아웃되었습니다.');
}

export default axios; // default export 추가
