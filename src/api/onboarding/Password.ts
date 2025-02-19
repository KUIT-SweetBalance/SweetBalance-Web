import ApiManager from "../ApiManager";

// 인증코드 일치 검증
interface ResetPasswordResponse {
    status: number;
    code: number;
    message: string;
    data: null;
  }
  
  export const resetPassword = async (
    email: string,
    newPassword: string,
  ): Promise<ResetPasswordResponse> => {
    try {
      const requestBody = {
        email: email,
        newPassword: newPassword,
      };
  
      console.log('resetPassword Request Body:', requestBody); // 확인용 로그 추가
  
      const response = await ApiManager.post(
        '/api/auth/reset-password',
        requestBody,
      );
      console.log('resetPassword succeeded', response.data);
      return response.data;
    } catch (error) {
      console.error('resetPassword failed:', error);
      throw error;
    }
  };