import ApiManager from '../../../ApiManager';

export interface Beverage {
  beverageId: number;
  name: string;
  brand: string;
  imgUrl: string;
  category: string;
  consumeCount: number;
}

export interface BeverageResponse {
  status: number;
  code: number;
  message: string;
  data: Beverage[];
}

export const fetchPopularDrinks = async (
  cafeName: string,
): Promise<BeverageResponse> => {
  try {
    const response = await ApiManager.get<BeverageResponse>(
      `/api/beverages/brand/popular?brand-name=${encodeURIComponent(cafeName)}&top=3`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('음료 데이터 가져오기 실패:', error);
    throw error;
  }
};
