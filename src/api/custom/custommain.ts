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
  

export const fetchCustomDrink = async (beverageId: number): Promise<BeverageDetailResponse> => {
  try {
    const response = await ApiManager.get<BeverageDetailResponse>(
      `https://api.sweetbalance.site/api/beverages/${beverageId}`,
    );
    return response.data;
  } catch (error) {
    console.error('음료 데이터 가져오기 실패:', error);
    throw error;
  }
};
export interface ReviseDrink{
  beverageSizeId: number;
  syrupName?: string;
  syrupCount?: number;
}
export interface ReviseDrinks{
  beverageLogId:number;
  beverageSizeId: number;
  beverageId:number;
  syrupName?: string;
  syrupCount?: number;
}
export const ReviseCustomDrink = async (revisedrinks: ReviseDrinks): Promise<void> => {
  
  const { beverageId,beverageLogId, ...revisedrink }: ReviseDrinks = revisedrinks;
  if (revisedrink.syrupName === '시럽 없음') {
    delete revisedrink.syrupName;
    delete revisedrink.syrupCount;
    console.log("지금입니다",revisedrink)
  }
  try {
    const response = await ApiManager.post<ReviseDrink>(
      `/api/user/beverage-record/${revisedrinks.beverageLogId}`,
      revisedrink
    );
    console.log('음료 수정 성공:', response.data);
  } catch (error) {
    console.error('음료 수정 실패:', error);
    throw error;
  }
};

export const ScrapCustomDrink = async (beverageId: number): Promise<void> => {

  try {
    const response = await ApiManager.post(
      `/api/user/favorite/${beverageId}`,
      
    );
    console.log('즐겨찾기에 추가 성공!:', response.data);
  } catch (error) {
    console.error('즐겨찾기에 추가 실패.:', error);
    throw error;
  }
};
export interface AddDrink{
  beverageSizeId: number,
  syrupName?: string,
  syrupCount?: number,
}
export const AddRecordDrink = async (adddrinkinfo: AddDrink): Promise<void> => {
  if (adddrinkinfo.syrupName === '시럽 없음') {
    delete adddrinkinfo.syrupName;
    delete adddrinkinfo.syrupCount;
    console.log("지금입니다",adddrinkinfo)
  }
  try {
    const response = await ApiManager.post<AddDrink>(
      `/api/user/beverage-record`,
      adddrinkinfo
    );
    console.log('음료 생성 성공:', response.data);
  } catch (error) {
    console.error('음료 생성 실패:', error);
    throw error;
  }
};