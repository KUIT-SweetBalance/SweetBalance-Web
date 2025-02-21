import ApiManager from "../../ApiManager";

export interface UserInfoResponse {
  status: number;
  code: number;
  message: string;
  data: UserData;
}

export interface UserData {
  email: string;
  nickname: string;
  gender: "MALE" | "FEMALE" | "OTHER"; // 기타 옵션 추가 가능
}



export const fetchUserInfo = async (): Promise<UserInfoResponse> => {
  try {
    const response = await ApiManager.get<UserInfoResponse>(
      `/api/user/my-info`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('유저저 데이터 가져오기 실패:', error);
    throw error;
  }
};
