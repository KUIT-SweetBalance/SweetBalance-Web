import apiClient from "../../ApiClient";

interface User {
    id: number;
    name: string;
    email: string;
}

export const fetchUsers = async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
}

interface CreateUserRequest {
    id: number;
    name: string;
    email: string;
}

export const createUser = async (userData: CreateUserRequest): Promise<User> => {
    const response = await apiClient.post<User>('/users', userData);
    return response.data;
}