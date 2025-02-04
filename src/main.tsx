import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'normalize.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// QueryClient 생성
const queryClient = new QueryClient();
// queryClient 인스턴스에 defaultOptions: retry, refetch, staleTime 등 파라미터 넘겨줄 수 있음

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);

// QueryClient
// React Query의 상태와 캐싱 메커니즘을 관리하는 객체
// 캐싱 관리, 쿼리 동작(자동 Refetch, 재시도 횟수, 캐시 만료 시간) 설정 등 가능

// QueryClientProvider
// QueryClient 객체를 React 애플리케이션의 컨텍스트로 전달, 하위 컴포넌트에서 React Query를 사용 가능하게 함
// 다중 QueryClient 지원 -> 필요에 따라 여러 QueryClient를 생성, 특정 컴포넌트에 별도의 쿼리 설정 적용 가능