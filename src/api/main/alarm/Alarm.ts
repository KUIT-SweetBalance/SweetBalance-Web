import ApiManager from '../../ApiManager';

interface BeverageLogInfo {
  image: string;
  sugar: number;
  syrupName: string;
  syrupCount: number;
  size: string;
}

interface Alarm {
  timeString: string;
  message: string;
  beverageLogInfo?: BeverageLogInfo;
}

export interface AlarmResponse {
  status: number;
  code: string;
  message: string;
  data?: Alarm;
}

export const fetchAlarmResponse = async (): Promise<AlarmResponse> => {
  try {
    const response = await ApiManager.get<AlarmResponse>(
      '/api/user/notice-list',
    );
    console.log('fetchAlarmResponse succeeded', response.data);
    return response.data;
  } catch (error) {
    console.error('fetchAlarmResponse 요청 실패', error);
    throw error;
  }
};
