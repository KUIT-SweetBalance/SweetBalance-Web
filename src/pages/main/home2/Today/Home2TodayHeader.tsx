import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  DailyNutritionIntake,
  DailyNutritionIntakeResponse,
  fetchDailyNutritionIntake,
} from '../../../../api/main/home2/Today/Home2TodayHeader';
import {
  fetchUserInfo,
  UserInfoResponse,
} from '../../../../api/mypage/main/MypageMain';

const Home2TodayHeader = () => {
  const navigate = useNavigate();

  const { data: dailyNutritionIntakeData } = useQuery<DailyNutritionIntakeResponse, Error>({
    queryKey: ['DailyNutritionIntakeResponse'],
    queryFn: fetchDailyNutritionIntake,
  });

  const { data: userInfoData } = useQuery<UserInfoResponse, Error>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });

  // 유저 성별
  const userGender = userInfoData?.data?.gender;
  const isMale = userGender === 'MALE';
  useEffect(() => {
    if (userInfoData?.data?.gender) {
      localStorage.setItem('gender', userInfoData.data.gender);
    }
  }, [userInfoData]);


  // 성별에 따른 적정 섭취량
  const recommendedSugarIntake = isMale ? 38 : 25;

  // 섭취량 데이터
  const fetchedData = dailyNutritionIntakeData?.data;
  const totalSugar = fetchedData?.totalSugar ?? 0;
  const additionalSugar = recommendedSugarIntake - totalSugar;

  // 성별에 따른 섭취량 구간 설정
  const sugarRanges = isMale
    ? { low: 33, mid: 38 } // 남성 기준: 0~33, 34~38, 38 초과
    : { low: 20, mid: 25 }; // 여성 기준: 0~20, 21~25, 25 초과

  // 섭취량에 따른 메시지 & 이미지 설정
  let message, imgSrc, imgStyle;

  if (totalSugar <= sugarRanges.low) {
    message = (
      <>
        오늘 섭취 가능한 <br />
        당이 <span className="font-[600]">{additionalSugar}g</span> 남았어요!
      </>
    );
    imgSrc = "/sugar/sugar_heart.png";
    imgStyle = "w-[160px] h-[170px]";
  } else if (totalSugar <= sugarRanges.mid) {
    message = (
      <>
        오늘 섭취 가능한 <br />
        당이 <span className="font-[600]">{additionalSugar}g</span> 남았어요!
        <br />
        조금 더 신경 <br /> 써주세요!
      </>
    );
    imgSrc = "/sugar/sugar_concern.png";
    imgStyle = "w-[147px] h-[180px] mt-[-10px]";
  } else {
    message = (
      <>
        오늘 당 섭취량을 <br />
        초과했어요! <br />
        내일부터 <br />조절해볼까요?
      </>
    );
    imgSrc = "/sugar/sugar_angry_big.png";
    imgStyle = "w-[160px] h-[170px] mt-[-65px]";
  }

  return (
    <div className="h-full">
      {/* 상단 알람 버튼 */}
      <div className="flex px-[24px] py-[20px] justify-between">
        <div className="flex flex-col">
          <div className="flex mb-[10px]">
            <span className="text-[12px] text-white text-opacity-50">적정 섭취량</span>
            <span className="text-[12px] text-white">&nbsp;{recommendedSugarIntake}g</span>
          </div>
          <p className="text-white text-[30px]">{message}</p>
        </div>

        <button
          type="button"
          className="w-[39px] h-[39px] flex items-center justify-center border rounded-full"
          onClick={() => navigate('/alarm')}
        >
          <div className="relative inline-block">
            <img src="/bell2.png" alt="알림" className="w-[16px] h-[18px]" />
            {Number.isFinite(fetchedData?.unreadAlarmCount) && fetchedData?.unreadAlarmCount !== 0 && (
              <div className="absolute top-0 right-0 w-[6px] h-[6px] bg-alert rounded-full"></div>
            )}
          </div>
        </button>
      </div>

      {/* 당 섭취량에 따른 캐릭터 */}
      <div className="flex justify-end mr-[28px] transform translate-y-[-30px]">
        <img src={imgSrc} alt="설탕이" className={imgStyle} />
      </div>

      {/* 당 섭취량 & 음료 섭취량 */}
      <div className="flex">
        <div className="flex-1 flex-col space-y-1">
          <div className="text-center text-secondary text-[12px]">당 섭취량</div>
          <div className="text-center text-white">{totalSugar}g</div>
        </div>
        <div className="w-[1.5px] h-10 bg-[#F4F4F4]"></div>
        <div className="flex-1 flex-col space-y-1">
          <div className="text-center text-secondary text-[12px]">하루 음료 섭취량</div>
          <div className="text-center text-white">{fetchedData?.beverageCount}잔</div>
        </div>
      </div>
    </div>
  );
};

export default Home2TodayHeader;