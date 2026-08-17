import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../model/router';

export const AppRouterProvider: React.FC = () => {
  return <RouterProvider router={router} />;
};
