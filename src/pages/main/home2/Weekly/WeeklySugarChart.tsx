import React, { useState, useEffect } from 'react';
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
import annotationPlugin, { AnnotationOptions } from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  annotationPlugin,
);

interface WeeklySugarChartProps {
  data: number[]; // 7일 간의 당 섭취량 데이터
  todayWeekDayIndex: number;
}

const WeeklySugarChart = (props: WeeklySugarChartProps) => {
  const labels = ['일', '월', '화', '수', '목', '금', '토'];


  // useEffect(() => {
  //   const img = new Image();
  //   img.src = '/sugar_angry.png';
  //   img.onload = () => {
  //     img.width = 50; //
  //     img.height = 50; //
  //     console.log('angrySugar 이미지 로드 성공', img);
  //   };
  //   img.onerror = () => {
  //     console.error('angrySugar 이미지 로드 실패');
  //   };
  // }, []);

  // Chart.js에 전달할 데이터 및 스타일 설정
  // <Line />에 chartData를 넘겨줌
  const chartData = {
    labels,
    datasets: [
      {
        label: '당 섭취량(g)',
        data: props.data,
        fill: false,
        borderColor: 'rgba(240, 128, 127, 1)',
        borderWidth: 2,
        // tension: 0.3,
        pointRadius: (context: any) => {
          return context.dataIndex === props.data.length - 1 ? 3 : 0.1;
        },
        // pointStyle: (context: any) => {
        //   return context.raw > 25 ? angrySugar || 'triangle' : 'circle';
        // },
      },
    ],
  };

  // Chart.js 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 범례 숨김
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw}g`,
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            mode: 'horizontal', // 가로선
            yMin: 25, // Y축 값 25에 선 고정
            yMax: 25,
            borderColor: 'white', // 흰색 선
            borderWidth: 1.5, // 선 두께
          } as AnnotationOptions,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: (context: any) => {
            return context.index === props.todayWeekDayIndex
              ? 'white' // todayWeekDayIndex에 해당하는 요일은 흰색
              : 'rgba(214, 172, 138, 1)'; // 나머지는 기본 색상
          },
        },
        grid: {
          display: false, // X축 그리드 숨김
        },
        offset: true,
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          color: (context: any) => {
            if (context.tick.value === 25) {
              return 'white'; // ✅ 25일 때 흰색 선
            }
            return 'rgba(214, 172, 138, 0.5)'; // ✅ 기본 X축 가로선 색상
          },
          drawTicks: false,
          drawBorder: false,
        },
        offset: true,
      },
    },
  };

  return (
    <div className="px-[26px] h-[200px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeeklySugarChart;
