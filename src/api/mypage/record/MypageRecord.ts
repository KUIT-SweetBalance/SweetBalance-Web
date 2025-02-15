import ApiManager from "../../ApiManager";
import { InfiniteData } from "@tanstack/react-query";
export interface RecoringDrink {
    beverageLogId: number;
    beverageId:number;
    beverageSizeId: number;
    createdAt: string; // 날짜 형식이므로 문자열로 유지
    brand: string;
    beverageName: string;
    imgUrl: string;
    sugar: number;
    syrupName: string | null;
    syrupCount: number;
    sizeType: string; // 다른 사이즈 확장 가능성 고려
  }
export interface RecoringDrinkData {
  status: number;
  code: number;
  message: string;
  data: RecoringDrink[];
}
export type InfiniteRecordDrinkData = InfiniteData<RecoringDrinkData>

export const fetchRecoringDrinks = async (page:number): Promise<RecoringDrinkData> => {
  try {
    const response = await ApiManager.get<RecoringDrinkData>(
      `https://13.125.187.188.nip.io/api/user/beverage-record?page=${page}&size=${8}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('음료 데이터 가져오기 실패:', error);
    throw error;
  }
};

export const DeleteRecordingDrinks = async (beverageLogId: number): Promise<void> => {
  try {
      const response = await ApiManager.delete(
      `https://13.125.187.188.nip.io/api/user/beverage-record/${beverageLogId}`,
      );
      console.log('삭제 성공!')
      return response.data;
  } catch (error) {
      console.error('음료 데이터 가져오기 실패:', error);
      throw error;
  }
  };

