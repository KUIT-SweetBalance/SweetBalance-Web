import ApiManager from "../ApiManager";

// 추천 음료 (recommends) 인터페이스
export interface RecommendedBeverage {
    beverageId: number;
    name: string;
    brand: string;
    imgUrl: string;
    sizeType: string;
    sizeTypeDetail: string;
    volume: number;
    sugarGap: number;
  }
  
  // 사이즈별 상세 정보 (sizeDetails) 인터페이스
  export interface SizeDetail {
    id: number;
    sizeType: string;
    sizeTypeDetail: string;
    volume: number;
    sugar: number;
    calories: number;
    caffeine: number;
    recommends: RecommendedBeverage[];
  }
  
  // 음료 상세 정보 (data) 인터페이스
  export interface BeverageDetail {
    beverageId: number;
    name: string;
    brand: string;
    imgUrl: string;  
    favorite: boolean;
    syrups: string[];
    sizeDetails: SizeDetail[];
  }
  
  // 전체 API 응답 데이터 인터페이스
  export interface BeverageDetailResponse {
    status: number;
    code: number;
    message: string;
    data: BeverageDetail;
  }
  

export const fetchCustomDrink = async (beverageId: string): Promise<BeverageDetailResponse> => {
  try {
    const response = await ApiManager.get<BeverageDetailResponse>(
      `https://13.125.187.188.nip.io/api/beverages/${beverageId}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('음료 데이터 가져오기 실패:', error);
    throw error;
  }
};
