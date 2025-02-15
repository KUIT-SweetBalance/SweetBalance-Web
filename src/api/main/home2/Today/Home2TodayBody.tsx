import ApiManager from '../../../ApiManager';

export interface DrinkListToday {
  beverageLogId: number;
  beverageId: number;
  beverageSizeId: number;
  createdAt: string;
  brand: string;
  beverageName: string;
  imgUrl: string;
  sugar: number;
  syrupName?: string;
  syrupCount: number;
  sizeType: string;
}

export interface DrinkListTodayResponse {
  status: number;
  code: number;
  message: string;
  data: DrinkListToday[] | null;
}

export const fetchDrinkListToday =
  async (): Promise<DrinkListTodayResponse> => {
    try {
      const response = await ApiManager.get<DrinkListTodayResponse>(
        '/api/user/daily-beverage-list',
      );
      console.log('fetchDrinkListToday succeeded', response.data);
      return response.data;
    } catch (error) {
      console.error('fetchDrinkListToday 요청 실패', error);
      throw error;
    }
  };
