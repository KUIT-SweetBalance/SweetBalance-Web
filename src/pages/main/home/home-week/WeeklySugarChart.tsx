import React from 'react';
import {
  Chart as ChartJS, // Chart.js의 핵심 객체
  CategoryScale, // X축의 범주형 스케일 (요일 등 텍스트를 사용할 때)
  LinearScale, // Y축의 선형 스케일 (숫자 사용)
  PointElement, // 데이터 점 스타일
  LineElement, // 선 그래프 스타일
  Title, // 차트 제목 플러그인
  Tooltip, // 마우스 오버 시 데이터 툴팁
  Filler, // 영역 채우기 (그래프 아래 색상)
} from 'chart.js'; // Chart.js 라이브러리에서 필요한 요소를 가져옴
import { Line } from 'react-chartjs-2'; // React 전용 Chart.js 컴포넌트

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

interface WeeklySugarChartProps {
  data: number[]; // 7일 간의 당 섭취량 데이터
  startDate: string;
  endDate: string;
}

const WeeklySugarChart = (props: WeeklySugarChartProps) => {
  const labels = ['일', '월', '화', '수', '목', '금', '토'];

  // Chart.js에 전달할 데이터 및 스타일 설정
  // <Line />에 chartData를 넘겨줌
  const chartData = {
    labels,
    datasets: [
      {
        label: '당 섭취량(g)',
        data: props.data,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // 그래프가 초기화되지 않았으면 null 반환
          if (!chartArea) {
            return null;
          }

          // 그라데이션 생성
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, '#e8b3b3'); // 상단: 진한 핑크
          gradient.addColorStop(0.2634, 'rgba(223, 143, 142, 0.5)'); // 중간: 투명도 50%
          gradient.addColorStop(1, 'rgba(240, 128, 127, 0)'); // 하단: 완전 투명
          return gradient;
        },
        borderColor: 'rgba(255, 102, 127, 0.8)', // 진한 핑크 선
        borderWidth: 1,
        pointRadius: 1.5,
        tension: 0.4, // 곡선 정도
      },
    ],
  };

  // Chart.js 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례 숨김
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw}g`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // X축 그리드 숨김
        },
      },
      y: {
        ticks: {
          stepSize: 10, // Y축 간격 설정
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <button className="text-[16px]">{'<'}</button>
        <span className="text-[13px]">
          {props.startDate} - {props.endDate}
        </span>
        <button className="text-[16px]">{'>'}</button>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );

  return <div></div>;
};

export default WeeklySugarChart;
