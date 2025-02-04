import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from './Example';

const UserListTest3 = () => {
  const queryClient = useQueryClient(); 
  // 캐시 관리, 자동 refetch, 요청 재시도, 데이터 동기화 등의 작업 수행 가능
  // main.tsx에서 new QueryClient()로 생성된 queryClient 인스턴스를
  // 하위 컴포넌트인 UserListTest3에서 useQueryClient()로 받아와 사용하는 것

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // useMutation 설정
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      console.log('사용자 추가 성공!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // 새로운 사용자를 추가한 후 ['users']쿼리를 무효화(invalidate)
      // -> React Query가 자동으로 새 데이터를 가져오도록 함
      // 즉, 새 사용자가 POST로 추가되면 기존 GET /users 요청이 다시 실행됨
    },
    onError: (error) => {
      console.error('사용자 추가 실패: ', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id: Date.now(), name, email });
  };

  return <div></div>;
};

export default UserListTest3;
