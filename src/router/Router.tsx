import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AppTitle from '../components/appTitle/AppTitle';
import App from '../App';
import Home from '../pages/main/home/Home';
import SearchDrink from '../pages/search/searchDrink/SearchDrink';
import EditDrink from '../pages/main/edit/EditDrink';
import EditCompleted from '../pages/main/edit/EditCompleted';

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
        // {
        //   path: '/edit/completed',
        //   element: <EditCompleted />
        // }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
