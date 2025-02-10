import ApiManager from "../../ApiManager";

export interface Sugar {
    totalSugar: number;
  beverageCount: number;
}

export interface SugarResponse {
  status: number;
  code: number;
  message: string;
  data: Sugar[];
}

export const fetchPopularDrinks = async (): Promise<SugarResponse> => {
  try {
    const response = await ApiManager.get<SugarResponse>(
      `/api/user/daily-beverage-list`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('음료 데이터 가져오기 실패:', error);
    throw error;
  }
};
