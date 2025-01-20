import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AppTitle from '../components/appTitle/AppTitle';
import App from '../App';
import Home from '../pages/main/home/Home';
import SearchDrink from '../pages/search/searchDrink/SearchDrink';
import EditDrink from '../pages/main/edit/EditDrink';
import EditCompleted from '../pages/main/edit/EditCompleted';
import Mypage from '../pages/mypage/Mypage';
import Mypagerevise from '../pages/mypage/mypage-revise/Mypagerevise';
import MypageSettingManage from '../pages/mypage/mypage-Setting/MypageSettingManage';
import MypageFeedContent from '../pages/mypage/mypage-main/mypage-feed/MypageFeedContent';
import MypageRecord from '../pages/mypage/mypage-record/MypageRecord';
import BottomNavi from '../components/BottomNavi/BottomNavi';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppTitle />,
      children: [
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/search',
          element: <SearchDrink />,
        },
        {
          path: '/edit',
          element: <EditDrink />,
        },
        {
          path: '/mypage',
          element: <Mypage />,
        },
        {
          path: '/mypage/revise',
          element: <Mypagerevise />,
        },
        {
          path: '/mypage/setting',
          element: <MypageSettingManage />,
        },
        {
          path: '/mypage/record',
          element: <MypageRecord />,
        },
        {
          path: '/mypage/navi',
          element: <BottomNavi />,
        },
        
        // {BottomNavi
        //   path: '/edit/completed',
        //   element: <EditCompleted />
        // }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
