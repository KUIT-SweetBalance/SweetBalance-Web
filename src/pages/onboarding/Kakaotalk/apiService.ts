import axios from './apiClient'; // 설정된 Axios 클라이언트 import

// 로그인 요청
export const login = async () => {
  try {
    const response = await axios.get('/oauth2/authorization/kakao');
    if (response.status === 200) {
      alert('로그인 요청 완료!');
    }
  } catch (error) {
    console.error('로그인 요청 중 오류:', error);
    alert('로그인 실패!');
  }
};
