import ApiManager from "../../ApiManager";




export interface changeInfomation {
  nickname: string;
  gender:"MALE"|"FEMALE";
}

export const ChangeUserInfo = async (userInfo: changeInfomation): Promise<void> => {
    try {
        const response = await ApiManager.post(
        `/api/user/meta-data`,
        userInfo
        );
        console.log(response)
        
    } catch (error) {
        console.error('음료 데이터 가져오기 실패:', error);
        throw error;
    }
    };