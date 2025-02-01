import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AppTitle from '../components/appTitle/AppTitle';
import App from '../App';
import Home from '../pages/main/home/Home';
import SearchDrink from '../pages/main/search/SearchDrink';
import EditDrink from '../pages/main/edit/EditDrink';
import EditCompleted from '../pages/main/edit/EditCompleted';
import Mypage from '../pages/mypage/Mypage';
import Mypagerevise from '../pages/mypage/mypage-revise/Mypagerevise';
import MypageSettingManage from '../pages/mypage/mypage-Setting/MypageSettingManage';
import MypageFeedContent from '../pages/mypage/mypage-main/mypage-feed/MypageFeedContent';
import MypageRecord from '../pages/mypage/mypage-record/MypageRecord';
import BottomNavi from '../components/BottomNavi/BottomNavi';
import Header from '../components/header/Header';
import LargeFavoriteDrinkModal from '../pages/main/modal/LargeFavoriteDrinkModal';
import AllBrands from '../pages/main/search/AllBrands';
import BrandSearchResult from '../pages/main/search/BrandSearchResult';
import Alarm from '../pages/main/alarm/Alarm';
import Login from '../pages/onboarding/login/Login';
import AuthSelection from '../pages/onboarding/auth-selection/AuthSelection';
import Splash from '../pages/onboarding/splash/Splash';
import ForgotPassword from '../pages/onboarding/login/ForgotPassword';
import SignIn from '../pages/onboarding/sign-in/SignIn';

const Router = () => {
  const router = createBrowserRouter([
    // {
    //   path: '/',
    //   element: <Login />,
    //   children: [
    {
      path: '/',
      element: <Splash />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/auth-selection',
      element: <AuthSelection />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/sign-in',
      element: <SignIn />,
    },
      children: [
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/alarm',
          element: <Alarm />
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
          path: '/custom',
          element: <CustomMain brand="스타벅스" drink="아이스 아메리카노" sugar={0} kcal={0} caffeine={5}/>,
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
        {
          path: 'all-brands',
          element: <AllBrands />
        },
        {
          path: 'brand-result',
          element: <BrandSearchResult />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
