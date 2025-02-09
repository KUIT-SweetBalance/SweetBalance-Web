import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  DailyNutritionIntake,
  DailyNutritionIntakeResponse,
  fetchDailyNutritionIntake,
} from '../../../../api/main/home2/Today/Home2TodayHeader';

const Home2TodayHeader = () => {
  const navigate = useNavigate();
  const handleAlarmClick = () => {
    navigate('/alarm');
    // 브라우저의 History API 사용(브라우저 히스토리를 프로그래밍적으로 다룰 수 있는 Javascript API)
  };

  const {
    data: dailyNutritionIntakeData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<DailyNutritionIntakeResponse, Error>({
    queryKey: ['DailyNutritionIntakeResponse'],
    queryFn: fetchDailyNutritionIntake,
  });
  const fetchedData = dailyNutritionIntakeData?.data;
  const recommendedSugarIntake =
    (fetchedData?.totalSugar ?? 0) + (fetchedData?.additionalSugar ?? 0);

  return (
    <div>
      <div className="flex px-[24px] py-[20px] justify-between">
        <div className="flex flex-col">
          <div className="flex mb-[10px]">
            <span className="text-[12px] text-white text-opacity-50">
              적정 섭취량
            </span>
            <span className="text-[12px] text-white">
              &nbsp;{recommendedSugarIntake}g
            </span>
          </div>

          {(() => {
            if (
              fetchedData &&
              fetchedData.totalSugar >= 0 &&
              fetchedData.totalSugar <= 20
            ) {
              return (
                <p className="text-white text-[30px]">
                  <span>
                    오늘 섭취 가능한
                    <br />
                    당이&nbsp;
                    <span className="font-[600]">
                      {fetchedData.additionalSugar}g
                    </span>
                    &nbsp;남았어요!
                  </span>
                </p>
              );
            } else if (
              fetchedData &&
              fetchedData.totalSugar >= 21 &&
              fetchedData.totalSugar <= 25
            ) {
              return (
                <p className="text-white text-[30px]">
                  <span>오늘 섭취 가능한</span>
                  <br />
                  당이&nbsp;
                  <span className="font-[600]">
                    {fetchedData.additionalSugar}g
                  </span>
                  &nbsp;남았어요
                  <br />
                  <span>
                    조금 더 신경 <br /> 써주세요!
                  </span>
                </p>
              );
            } else if (fetchedData && fetchedData.totalSugar >= 26) {
              return (
                <p className="text-white text-[30px]">
                  <span>오늘 당 섭취량을</span>
                  <br />
                  <span>초과했어요</span>
                  <br />
                  <span>
                    내일부터 <br />
                    조절해볼까요?
                  </span>
                </p>
              );
            }
          })()}
        </div>

        <button
          type="button"
          className="w-[39px] h-[39px] flex items-center justify-center border rounded-full"
          onClick={handleAlarmClick}
        >
          <div className="relative inline-block">
            <img src="/bell2.png" alt="알림" className="w-[16px] h-[18px]" />
            {Number.isFinite(
              dailyNutritionIntakeData?.data?.unreadAlarmCount,
            ) &&
              dailyNutritionIntakeData?.data?.unreadAlarmCount !== 0 && (
                <div className="absolute top-0 right-0 w-[6px] h-[6px] bg-alert rounded-full"></div>
              )}
          </div>
        </button>
      </div>

      {(() => {
        if (
          fetchedData &&
          fetchedData.totalSugar >= 0 &&
          fetchedData.totalSugar <= 20
        ) {
          return (
            <div className="flex justify-end mr-[28px] transform translate-y-[-30px]">
              <img
                src="/sugar/sugar_heart.png"
                alt="설탕이"
                className="w-[160px] h-[170px]"
              />
            </div>
          );
        } else if (
          fetchedData &&
          fetchedData.totalSugar >= 21 &&
          fetchedData.totalSugar <= 25
        ) {
          return (
            <div className="flex justify-end mr-[32px] mt-[-10px] transform translate-y-[-30px]">
              <img
                src="/sugar/sugar_concern.png"
                alt="설탕이"
                className="w-[147px] h-[180px]"
              />
            </div>
          );
        } else if (fetchedData && fetchedData.totalSugar >= 26) {
          return (
            <div className="flex justify-end mr-[27px] mt-[-10px] transform translate-y-[-30px]">
              <img
                src="/sugar/sugar_angry_big.png"
                alt="설탕이"
                className="w-[160px] h-[180px]"
              />
            </div>
          );
        }
      })()}

      <div className="flex">
        <div className="flex-1 flex-col space-y-1">
          <div className="text-center text-secondary text-[12px]">
            당 섭취량
          </div>
          <div className="text-center text-white">
            {dailyNutritionIntakeData?.data?.totalSugar}g
          </div>
        </div>
        <div className="w-[1.5px] h-10 bg-[#F4F4F4]"></div>
        <div className="flex-1 flex-col space-y-1">
          <div className="text-center text-secondary text-[12px]">
            하루 음료 섭취량
          </div>
          <div className="text-center text-white">
            {dailyNutritionIntakeData?.data?.beverageCount}잔
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home2TodayHeader;
