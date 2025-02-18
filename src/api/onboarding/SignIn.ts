import ApiManager from '../ApiManager';

// 이메일 중복확인
interface CheckEmailAvailabilityResponse {
  status: number;
  code: number;
  message: string;
  data: null;
}

export const checkEmailAvailability = async (
  email: string,
): Promise<CheckEmailAvailabilityResponse> => {
  try {
    const requestBody = {
      email: email,
    };

    const response = await ApiManager.post(
      '/api/auth/email-duplicate',
      requestBody,
    );
    console.log('checkEmailAvailability succeeded', response.data);
    return response.data;
  } catch (error) {
    console.error('checkEmailAvailability failed:', error);
    throw error;
  }
};

// 인증코드 발송
interface SendVerificationCodeResponse {
  status: number;
  code: number;
  message: string;
  data: null;
}

export const sendVerificationCode = async (
  email: string,
): Promise<SendVerificationCodeResponse> => {
  try {
    const requestBody = {
      email: email,
    };

    const response = await ApiManager.post(
      '/api/auth/email-verification',
      requestBody,
    );
    console.log('sendVerificationCode succeeded', response.data);
    return response.data;
  } catch (error) {
    console.error('sendVerificationCode failed:', error);
    throw error;
  }
};

// 인증코드 일치 검증
interface CheckVerificationCodeResponse {
  status: number;
  code: number;
  message: string;
  data: null;
}

export const checkVerificationCode = async (
  email: string,
  code: string,
): Promise<CheckVerificationCodeResponse> => {
  try {
    const requestBody = {
      email: email,
      code: code,
    };

    console.log('checkVerificationCode Request Body:', requestBody); // 확인용 로그 추가

    const response = await ApiManager.post(
      '/api/auth/email-verification-code-check',
      requestBody,
    );
    console.log('checkVerificationCode succeeded', response.data);
    return response.data;
  } catch (error) {
    console.error('checkVerificationCode failed:', error);
    throw error;
  }
};

// 회원가입
interface SignInResponse {
  status: number;
  code: number;
  message: string;
  data: null;
}

export const signUp = async (
  email: string,
  password: string,
  nickname: string,
  gender: string,
): Promise<SignInResponse> => {
  try {
    const requestBody = {
      email: email,
      password: password,
      nickname: nickname,
      gender: gender,
    };
    console.log('requestBody: ', requestBody);

    const response = await ApiManager.post('/api/auth/sign-up', requestBody);
    console.log('signUp succeeded', response.data);
    return response.data;
  } catch (error) {
    console.error('signUp failed:', error);
    throw error;
  }
};
