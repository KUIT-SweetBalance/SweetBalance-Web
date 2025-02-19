import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppTitle from '../components/appTitle/AppTitle';
import Home from '../pages/main/home/Home';
import SearchDrink from '../pages/main/search/SearchDrink';
import EditDrink from '../pages/main/edit/EditDrink';
import EditCompleted from '../pages/main/edit/EditCompleted';
import Mypage from '../pages/mypage/Mypage';
import Mypagerevise from '../pages/mypage/mypage-revise/Mypagerevise';
import MypageSettingManage from '../pages/mypage/mypage-Setting/MypageSettingManage';
import MypageRecord from '../pages/mypage/mypage-record/MypageRecord';
import BottomNavi from '../components/BottomNavi/BottomNavi';
import Alarm from '../pages/main/alarm/Alarm';
import CustomMain from '../pages/custom/custom';
import CusSuccess from '../pages/custom/success/cussuccess';
import Home2 from '../pages/main/home2/Home2';
import Login from '../pages/onboarding/login/Login';
import AuthSelection from '../pages/onboarding/auth-selection/AuthSelection';
import Splash from '../pages/onboarding/splash/Splash';
import ForgotPassword from '../pages/onboarding/login/ForgotPassword';
import SignIn from '../pages/onboarding/sign-in/SignIn';
import AllBrands from '../pages/main/search/AllBrands';
import BrandSearchResult from '../pages/main/search/BrandSearchResult';
import DrinkSearchResult from '../pages/main/search/DrinkSearchResult';
import MypageScrap from '../pages/mypage/mypage-scrap/MypageScrap';
import KakaoSignIn from '../pages/onboarding/sign-in/KakaoSignIn';
import Reissue from '../pages/onboarding/Kakaotalk/Reissue';

const router = createBrowserRouter([
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
  {
    path: '/home',
    element: <Home2 />,
  },
  {
    path: '/alarm',
    element: <Alarm />,
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
    path: '/custom/:beverageId',
    element: (
      <CustomMain/>
    ),
  },
  {
    path: '/mypage/record/:beverageId',
    element: (
      <CustomMain/>
    ),
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
  // {
  //   path: '/mypage/record/custom',
  //   element: (
  //     <CustomMain
  //       brand="스타벅스"
  //       drink="아이스 아메리카노"
  //       sugar={0}
  //       kcal={0}
  //       caffeine={5}
  //       scrap ={false}
  //     />
  //   ),
  // },
  {
    path: '/mypage/scrap',
    element: <MypageScrap/>,
  },
  
  {
    path: '/edit/completed',
    element: <EditCompleted />,
  },
  {
    path: '/edit/completed',
    element: <EditCompleted />,
  },
  {
    path: '/all-brands',
    element: <AllBrands />,
  },
  {
    path: '/brand-result',
    element: <BrandSearchResult />,
  },
  {
    path: '/drink-result/:drinkName',
    element: <DrinkSearchResult />
  },
  {
    path: '/drink-result/:cafeName/:drinkName',
    element: <DrinkSearchResult />
  },
  {
    path:'/oauth2_redirect',
    element:<Reissue/>
  },
  {
    path:'/kakaosetting',
    element:<KakaoSignIn/>
  }
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;