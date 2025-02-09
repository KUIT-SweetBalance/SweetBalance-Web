import ApiManager from '../../ApiManager';

interface BeverageLogInfo {
  image: string;
  sugar: number;
  syrupName: string;
  syrupCount: number;
  size: string;
  beverageLogId: number;
  isRead: boolean;
}

interface AlarmInfo {
  timeString: string;
  message: string;
  beverageLogInfo: BeverageLogInfo | null;
}

interface AlarmDate {
  date: string;
  info: AlarmInfo[];
}

export interface AlarmResponse {
  status: number;
  code: string;
  message: string;
  data: AlarmDate[] | null;
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

export interface AlarmReadResponse {
  status: number;
  code: number;
  message: string;
  data: null;
}

export const setAlarmAsRead = async (beverageLogId: number): Promise<AlarmReadResponse> => {
  const response = await ApiManager.post(`/api/user/notice/${beverageLogId}`);
  return response.data;
};
