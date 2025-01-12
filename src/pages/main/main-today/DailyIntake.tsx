import React from 'react';

const DailyIntake = () => {
  return (
    <div className="w-full flex flex-col p-5 border rounded-[20px]"> {/* ring-1 ring-[#F4F4F4] */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <div className='text-xs'>적정 섭취량&nbsp;&nbsp;</div>
            <div className='text-sm'>25g</div>
          </div>
          <div className="mt-3 text-xl">
            아직 당 00g을<br></br>더 마실 수 있어요!
          </div>
        </div>
        <div>
          <div className="w-32 h-32 bg-[#F4F4F4] rounded-xl"></div>
        </div>
      </div>
      <div className="flex mt-6">
        <div className="flex-1 flex-col">
          <div className="text-center">당 섭취량</div>
          <div className="text-center">00g</div>
        </div>
        <div className='w-[1.5px] h-10 bg-[#F4F4F4]'></div>
        <div className="flex-1">
          <div className="text-center">칼로리</div>
          <div className="text-center">000kcal</div>
        </div>
      </div>
    </div>
  );
};

export default DailyIntake;
