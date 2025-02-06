import ApiManager from "../../../ApiManager";

export interface DailyNutritionIntake {
    totalSugar: number;
    beverageCount: number;
}

export interface DailyNutritionIntakeResponse {
    status: number;
    code: number;
    message: string;
    data: DailyNutritionIntake;
}

export const fetchDailyNutritionIntake = async (): Promise<DailyNutritionIntakeResponse> => {
    try {
        const response = await ApiManager.get<DailyNutritionIntakeResponse>(
            '/api/user/daily-consume-info'
        );
        console.log('fetchDailyNutritionIntake', response.data);
        return response.data;
    } catch (error) {
        console.error('fetchDailyNutritionIntake 요청 실패', error)
        throw error;
    }
}