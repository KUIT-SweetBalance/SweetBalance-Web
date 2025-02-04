import ApiManager from '../../ApiManager';

interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await ApiManager.get<User[]>('/users');
  return response.data;
};

interface CreateUserRequest {
  id: number;
  name: string;
  email: string;
}

export const createUser = async (
  userData: CreateUserRequest,
): Promise<User> => {
  const response = await ApiManager.post<User>('/users', userData);
  return response.data;
};
