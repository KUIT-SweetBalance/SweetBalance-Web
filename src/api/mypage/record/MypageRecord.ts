import ApiManager from "../../ApiManager";

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

export const fetchRecoringDrinks = async (): Promise<RecoringDrinkData> => {
  try {
    const response = await ApiManager.get<RecoringDrinkData>(
      `https://13.125.187.188.nip.io/api/user/beverage-record?page=${0}&size=${8}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('음료 데이터 가져오기 실패:', error);
    throw error;
  }
};

export const DeleteRecordingDrinks = async (beverageId: number): Promise<void> => {
  try {
      const response = await ApiManager.delete(
      `https://13.125.187.188.nip.io/api/user/beverage-record/${beverageId}`,
      );
      console.log('삭제 성공!')
      return response.data;
  } catch (error) {
      console.error('음료 데이터 가져오기 실패:', error);
      throw error;
  }
  };

  export const ChangeRecordingDrinks = async (beverageId: number): Promise<void> => {
    try {
        const response = await ApiManager.post(
        `https://13.125.187.188.nip.io/api/user/beverage-record/${beverageId}`,
        );
        console.log('수정 성공!')
        return response.data;
    } catch (error) {
        console.error('음료 데이터 가져오기 실패:', error);
        throw error;
    }
    };