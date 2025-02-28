import ApiManager from "../../ApiManager";
import { InfiniteData } from "@tanstack/react-query";
export interface RecoringDrink {
    beverageLogId: number;//
    beverageId:number;
    beverageSizeId: number;
    createdAt: string; 
    brand: string;//
    beverageName: string;
    imgUrl: string;
    sugar: number;
    syrupName: string | null;
    syrupCount: number;
    sizeType: string; 
  }
export interface RecoringDrinkData {
  status: number;
  code: number;
  message: string;
  data: RecoringDrink[];
}
export type InfiniteRecordDrinkData = InfiniteData<RecoringDrinkData>

export const fetchRecoringDrinks = async (page:number, isReversed: boolean): Promise<RecoringDrinkData> => {
  const Old = isReversed?"old":""
  try {
    const response = await ApiManager.get<RecoringDrinkData>(
      `/api/user/beverage-record?page=${page}&size=${8}&sort=${Old}`,
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
      `/api/user/beverage-record/${beverageLogId}`,
      );
      console.log('삭제 성공!')
      return response.data;
  } catch (error) {
      console.error('음료 데이터 가져오기 실패:', error);
      throw error;
  }
  };

