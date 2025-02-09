import React from 'react';
import AppTitle from '../../../components/appTitle/AppTitle';
import Header from '../../../components/header/Header';
import AlarmItem from './AlarmItem';
import { useQuery } from '@tanstack/react-query';
import { fetchAlarmResponse, AlarmResponse } from '../../../api/main/alarm/Alarm';

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
  const fetchedData = alarmResponse?.data

  return (
    <div className="flex flex-col items-center mb-[20px] overflow-y-auto scrollbar-hide">
      {/* <AppTitle /> */}

      <div className="w-[calc(100%-48px)] mt-[50px] mb-[30px]">
        <Header headerTitle="알림 페이지" />
      </div>

      <div className="w-[calc(100%-48px)]">
        <div className="flex font-[500] mb-[14px]">2024.11.22</div>
      

        <AlarmItem
          time="17:34"
          cafeName="스타벅스"
          drinkName="아이스 아메리카노"
        />
        <AlarmItem
          time="13:11"
          cafeName="투썸플레이스"
          drinkName="아이스 아메리카노"
        />
        <AlarmItem sugarAlarm={20} />
        <AlarmItem
          time="13:11"
          cafeName="투썸플레이스"
          drinkName="아이스 아메리카노"
        />

        <div className="flex font-[500] mt-[30px] my-[14px]">2024.11.20</div>
        <AlarmItem
          time="17:34"
          cafeName="스타벅스"
          drinkName="아이스 아메리카노"
        />
        <AlarmItem
          time="13:11"
          cafeName="투썸플레이스"
          drinkName="아이스 아메리카노"
        />
        <AlarmItem sugarAlarm={20} />
        <AlarmItem
          time="13:11"
          cafeName="투썸플레이스"
          drinkName="아이스 아메리카노"
        />
        <AlarmItem
          time="17:34"
          cafeName="스타벅스"
          drinkName="아이스 아메리카노"
        />
        <AlarmItem
          time="13:11"
          cafeName="투썸플레이스"
          drinkName="아이스 아메리카노"
        />
        <AlarmItem sugarAlarm={20} />
        <AlarmItem
          time="13:11"
          cafeName="투썸플레이스"
          drinkName="아이스 아메리카노"
        />
      </div>
    </div>
  );
};

export default Alarm;
