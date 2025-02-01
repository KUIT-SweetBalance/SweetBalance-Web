import React from 'react'

const Home2TodayHeader = () => {
  return (
    <div>
      <div className="flex px-[24px] py-[20px] justify-between">
        <div className="flex flex-col">
          <div className="flex mb-[7px]">
            <span className="text-[12px] text-white text-opacity-50">
              적정 섭취량
            </span>
            <span className="text-[12px] text-white">&nbsp;25g</span>
          </div>

          <p className="text-white text-[30px]">
            <span>
              아직 당&nbsp;<span className="font-[600]">20g</span>을 더
            </span>
            <br />
            <span>마실 수 있어요!</span>
          </p>
        </div>

        <button
          type="button"
          className="w-[39px] h-[39px] flex items-center justify-center border rounded-full"
          // onClick={handleAlarmClick}
        >
          <img src="/bell2.png" alt="알림" className="w-[16px] h-[18px]" />
        </button>
      </div>

      <div className="flex justify-end mr-[32px] transform translate-y-[-30px]">
        <img
          src="/sugar_heart.png"
          alt="설탕이"
          className="w-[147px] h-[170px]"
        />
      </div>

      <div className="flex">
        <div className="flex-1 flex-col space-y-1">
          <div className="text-center text-secondary text-[12px]">당 섭취량</div>
          <div className="text-center text-white">00g</div>
        </div>
        <div className="w-[1.5px] h-10 bg-[#F4F4F4]"></div>
        <div className="flex-1 flex-col space-y-1">
          <div className="text-center text-secondary text-[12px]">칼로리</div>
          <div className="text-center text-white">000kcal</div>
        </div>
      </div>
    </div>
  )
}

export default Home2TodayHeader
