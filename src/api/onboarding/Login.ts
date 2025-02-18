import ApiManager from '../ApiManager';

interface LoginInfo {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  status: number;
  code: string;
  message: string;
  data?: LoginInfo;
}

interface RegisterUserParams {
  userId: string;
  userPassword: string;
}

export const registerUser = async (
  userData: RegisterUserParams,
): Promise<LoginResponse> => {
  try {
    const requestBody = {
      email: userData.userId,
      password: userData.userPassword,
    };

    const response = await ApiManager.post('/api/auth/sign-in', requestBody);
    console.log('registerUser succeeded', response.data);
    return response.data;
  } catch (error) {
    console.error('registerUser failed:', error);
    throw error;
  }
};
