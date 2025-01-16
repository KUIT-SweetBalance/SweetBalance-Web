import React from 'react'

interface AlarmItemProps {
    // date: string;
    time: string;
    drinkName: string;
    alarm: string;
}

const AlarmItem = () => {
  return (
    <div className='flex px-[10px] py-[12px] justify-between justify-center items-center rounded-[10px] border border-1-[#F4F4F4]'>
      <span className='flex w-[63px] justify-center items-center text-center py-[6px] rounded-full bg-[#F4F4F4] text-primary text-[14px]'>17:34</span>
      <span className='font-[500] text-[15px] truncate mx-[10px]'>스타벅스 아이스 아메리카노</span>
      <button type="button" className='flex w-[63px] justify-center items-center text-center py-[6px] rounded-full bg-primary text-white text-[14px]'>확인</button>
    </div>
  )
}

export default AlarmItem
