// react-query를 사용한 코드
// UserListTest1과 달리, useState 없이 useQuery로 상태관리를 다 하고 있음
// UserListTest1에서는 useState로 받을 데이터, 로딩상태, 에러상태 하나하나 다 선언함

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from './Example';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserListTest2 = () => {
  const {
    data: users, // useQuery에서 받은 응답 데이터를 users에 저장하겠다는 뜻
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    // 다른 화면에서 동일한 쿼리키를 사용할 경우, 데이터를 재사용해 불필요한 요청을 줄임
    queryFn: fetchUsers,
    // 컴포넌트가 처음 렌더링 될 때 queryFn을 호출해 데이터를 가져옴(useEffect와 같은 역할)
    // 만약 화면이 나타나자마자 실행되지 않아야 한다면, 
    // useQuery에 enabled 속성을 주고 refetch 메서드를 사용하거나
    // enabled속성과 useState를 함꼐 사용해 수동으로 메서드를 실행하거나
    // useMutation을 사용하면 됨(useMutation은 캐싱보다는 데이터 생성/수정/삭제 등 서버 데이터에 변화를 주는 작업에 적합)
  });

  if (isLoading) return <div> Loading ... </div>;
  if (isError) return <div> {error?.message || 'Failed to fetch users'} </div>;

  return (
    <div>
      <h1>User List</h1>
      <button type="button" onClick={() => refetch()}>
        요청하기
      </button>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListTest2;
