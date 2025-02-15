import ApiManager from "../../ApiManager";

export interface UserInfoResponse {
  status: number;
  code: number;
  message: string;
  data: UserData;
}

export interface UserData {
  createdAt: string; // ISO 형식의 날짜 문자열
  updatedAt: string; // ISO 형식의 날짜 문자열
  userId: number;
  role: "USER" | "ADMIN"; // 역할이 확장될 가능성이 있다면 유니온 타입으로
  email: string;
  nickname: string;
  password: string; // 해시된 비밀번호 (보통 API 응답에서는 반환하지 않음)
  providerId: string | null; // 소셜 로그인 제공자 ID (null 가능)
  loginType: "BASIC" | "SOCIAL"; // 로그인 방식
  gender: "MALE" | "FEMALE" | "OTHER"; // 기타 옵션 추가 가능
  status: "ACTIVE" | "INACTIVE"; // 유저 상태 (활성/비활성)
}



export const fetchUserInfo = async (): Promise<UserInfoResponse> => {
  try {
    const response = await ApiManager.get<UserInfoResponse>(
      `/api/user/my-info`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('음료 데이터 가져오기 실패:', error);
    throw error;
  }
};
