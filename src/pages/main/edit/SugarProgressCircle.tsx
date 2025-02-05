import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

interface SugarProgressCircleProps {
  sugarAmount: number; // 당 수치 (props)
}

const SugarProgressCircle = ({ sugarAmount }: SugarProgressCircleProps) => {
  const [progress, setProgress] = useState(0); // 애니메이션용 진행도

  // 화면이 나타날 때 애니메이션 적용
  useEffect(() => {
    setTimeout(() => {
      setProgress(sugarAmount);
    }, 400);
  }, [sugarAmount]);

  // 전체 100g 기준 비율 계산
  const percentage = (progress / 100) * 100;

  // 차트 데이터
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage], // 현재 값 vs 남은 값
        backgroundColor: ['#C9A47F', '#EDEDED'], // 그래프 색상
        borderWidth: 0, // 경계선 제거
        cutout: '97%', // 원형 두께 (가운데 공간 비율)
        radius: '100%'
      },
    ],
  };

  // 차트 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true, // 회전 애니메이션
      duration: 1800, // 애니메이션 지속 시간(ms)
    },
    plugins: {
      legend: { display: false }, // 범례 제거
      tooltip: { enabled: false }, // 툴팁 제거
    },
  };

  return (
    <div className="relative w-[275px] h-[275px] flex items-center justify-center">
      {/* 원형 그래프 */}
      <Doughnut data={data} options={options} />

      {/* 가운데 아이콘 및 텍스트 */}
      <div className="absolute flex flex-col items-center">
        <img src="/DrinkSugar.png" alt="음료 아이콘" className="w-[59px] h-[88px]" />
        <p className="text-[17px] mt-2">당 {sugarAmount}g</p>
        <p className="text-[17px] text-secondary font-[500] mt-1">수정 완료!</p>
      </div>
    </div>
  );
};

export default SugarProgressCircle;