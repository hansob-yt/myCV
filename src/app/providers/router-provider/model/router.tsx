import { createBrowserRouter } from 'react-router-dom';
import { CvPage } from '../../../../pages/cv-page';
import { NotFoundPage } from '../../../../pages/not-found-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CvPage />,
  },
  {
    path: '/bio',
    element: <CvPage />,
  },
  {
    path: '/terminal',
    element: <CvPage />,
  },
  {
    path: '/fsd-explorer',
    element: <CvPage />,
  },
  {
    path: '/projects/:projectId',
    element: <CvPage />,
  },
  {
    path: '/experience/:expId',
    element: <CvPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
