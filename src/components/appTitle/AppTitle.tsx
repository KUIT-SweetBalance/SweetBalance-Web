import React from 'react';
import { Outlet } from 'react-router-dom';

const AppTitle = () => {
  return (
    <div>
      <div className="w-auto flex justify-center items-center pt-9 pb-6 text-primary text-xl font-bold">
        Sweet Balance
      </div>
      <Outlet />
    </div>
  );
};

export default AppTitle;
