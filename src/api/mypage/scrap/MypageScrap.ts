import ApiManager from "../../ApiManager";
import { InfiniteData } from "@tanstack/react-query";
interface FavoriteDrink {
    favoriteId: number;   // 즐겨찾기 음료 고유 ID
    beverageId: number;   // 음료 ID
    name: string;         // 음료 이름
    brand: string;        // 브랜드명 (예: "스타벅스")
    imgUrl: string;       // 음료 이미지 URL
    sugarPer100ml: number;        // 당 함량
    timeString: string;   // 기록된 시간 (문자열 형식)
}
export interface ScrapDrinkData {
    status: number;
    code: number;
    message: string;
    data: FavoriteDrink[];
}

export type InfiniteScrapDrinkData = InfiniteData<ScrapDrinkData>

export const fetchScrapDrinks = async (page:number, isReversed: boolean): Promise<ScrapDrinkData> => {
    const Old = isReversed?"old":""

try {
    const response = await ApiManager.get<ScrapDrinkData>(
    `https://13.125.187.188.nip.io/api/user/favorite?page=${page}&size=${8}&sort=${Old}`,
    );
    console.log(response.data);
    return response.data;
} catch (error) {
    console.error('음료 데이터 가져오기 실패:', error);
    throw error;
}
};
export const DeleteScrapDrinks = async (favoriteId: number): Promise<void> => {
    try {
        const response = await ApiManager.delete(
        `https://13.125.187.188.nip.io/api/user/favorite/${favoriteId}`,
        );
        console.log('삭제 성공!')
        return response.data;
    } catch (error) {
        console.error('음료 데이터 가져오기 실패:', error);
        throw error;
    }
    };
