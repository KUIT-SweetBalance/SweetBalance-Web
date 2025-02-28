import React from 'react';
import AppTitle from '../../../components/appTitle/AppTitle';
import Header from '../../../components/header/Header';
import AlarmItem from './AlarmItem';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAlarmResponse,
  AlarmResponse,
} from '../../../api/main/alarm/Alarm';
import useAlarmInfoModalStore from '../../../store/modal/AlarmInfo';
import AlarmInfoModal from '../modal/AlarmInfoModal';
import NoContents from '../../../components/noContents/NoContents';

const Alarm = () => {
  const {
    data: alarmResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<AlarmResponse, Error>({
    queryKey: ['AlarmResponse'],
    queryFn: fetchAlarmResponse,
  });
  const fetchedData = alarmResponse?.data;

  const { isOpen } = useAlarmInfoModalStore();

  if (!fetchedData || fetchedData.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center mt-[30px]">
        <div className="flex w-[calc(100%-48px)]">
          <Header headerTitle="알림 페이지" />
        </div>

        <div className="flex-grow flex mb-[70px]">
          <NoContents contentString="아직 기록이 없습니다" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mb-[20px] overflow-y-auto scrollbar-hide">
      {/* <AppTitle /> */}

      <div className="w-[calc(100%-48px)] mt-[30px] mb-[-10px]">
        <Header headerTitle="알림 페이지" />
      </div>

      {fetchedData?.map((alarm, index) => (
        <div key={index} className="w-[calc(100%-48px)]">
          <div className="flex font-[500] mb-[14px] mt-[40px]">
            {alarm?.date}
          </div>
          {alarm?.info.map((info, index) =>
            info.beverageLogInfo === null ? (
              <AlarmItem key={`no-log-${index}`} sugarAlarm={25} />
            ) : (
              (() => {
                const [cafeName, ...drinkNames] = info.message.split(' ');
                // cafeName: '스타벅스', drinkNames: ['여수', '윤슬', '헤이즐넛', '콜드브루']
                const drinkName = drinkNames.join(' '); // '여수 윤슬 헤이즐넛 콜드브루'

                return (
                  <AlarmItem
                    key={`log-${index}`}
                    date={alarm?.date}
                    time={info.timeString}
                    cafeName={cafeName}
                    drinkName={drinkName}
                    img={info.beverageLogInfo?.image}
                    sugar={info.beverageLogInfo?.sugar}
                    syrupType={info.beverageLogInfo?.syrupName}
                    syrup={info.beverageLogInfo?.syrupCount}
                    size={info.beverageLogInfo?.size}
                    isRead={info.beverageLogInfo?.isRead}
                    beverageLogId={info.beverageLogInfo?.beverageLogId}
                  />
                );
              })()
            ),
          )}
        </div>
      ))}

      {/* 모달을 조건부 렌더링 */}
      {isOpen && <AlarmInfoModal />}
    </div>
  );
};

export default Alarm;
