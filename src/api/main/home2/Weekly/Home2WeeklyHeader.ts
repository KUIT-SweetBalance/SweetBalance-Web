import ApiManager from "../../../ApiManager";

interface dailySugar {
    date: string;
    sugar: number;
}

interface WeeklyNutritionIntake {
    intake: number;
    totalSugar: number;
    averageSugar: number;
    totalCalories: number;
    unreadAlarmCount: number;
    dailySugar: dailySugar[];
}

export interface WeeklyNutritionIntakeResponse {
    status: number;
    code: number;
    message: string;
    data?: WeeklyNutritionIntake;
}

export const fetchWeeklyNutritionIntake = async (): Promise<WeeklyNutritionIntakeResponse> => {
    try {
        const response = await ApiManager.get<WeeklyNutritionIntakeResponse>(
            '/api/user/weekly-consume-info'
        )
        console.log('fetchWeeklyNutritionIntake', response.data);
        return response.data
    } catch (error) {
        console.error('fetchWeeklyNutritionIntake 요청 실패', error);
        throw error;
    }
}