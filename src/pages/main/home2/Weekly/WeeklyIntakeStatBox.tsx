import React from 'react'

interface StatBoxProps {
  type?: string; // ex: 주간 음료 섭취량, 하루 평균 당 섭취량
  stat?: number; // 사용자 섭취량
  recommended?: number; // 권장섭취량(ex: 10(잔), 25(g), 300(kcal))
  unit?: string; // 단위(ex: g, kcal, 잔)
}

const WeeklyIntakeStatBox = (props: StatBoxProps) => {
  return (
    <div className='flex flex-col py-[10px] pl-[20px] border border-1-gray_text rounded-[20px] space-y-[5px]'>
      <p className='text-[14px] text-gray_text'><span className='text-[16px] text-text font-[600] pr-[5px]'>{props.stat}{props.unit}</span>/&nbsp;{props.recommended}{props.unit}</p>
      <p className='text-gray_text'>{props.type}</p>
    </div>
  )
}

export default WeeklyIntakeStatBox
