import React from 'react'
import WeeklyIntake from './WeeklyIntake'
import WeeklyStats from './WeeklyStats'

const WeeklyInfo = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* 표 */}
      <div className="w-[calc(100%-48px)] mt-3">
        <WeeklyIntake></WeeklyIntake>
      </div>
      
      {/* 경계선 */}
      <div className="w-full h-[15px] mt-7 bg-[#F4F4F4]"></div>

      {/* 주간 음료수 당 통계 */}
      <div className="flex justify-between w-[calc(100%-48px)] my-6">
        <div className="text-[17px]">주간 음료수 당 통계</div>
      </div>

      {/* 섭취량 통계표 */}
      <div className=' w-[calc(100%-45px)] flex space-x-3 '>
        <WeeklyStats 
            title='주간 음료수 섭취량'
            weeklyDrinkIntake={12}
        />
        <WeeklyStats 
            title='주간 당 섭취량'
            weeklySugarIntake={1}
            dailySugarIntake={1}
            weeklyKcalIntake={1}
        />
      </div>
    </div>
  )
}

export default WeeklyInfo
