import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage';
import Layout from './Layout';
import UserProfile from '../components/UserProfile/profile';
import LoginFormPage from '../components/LoginFormPage/LoginFormPage';
import UserTracks from '../components/UserProfile/UserTracks/userTracks';
import LikedSongs from '../components/UserProfile/UserLikes/userLikes';
import UpdateSong from '../components/UpdateSongs/UpdateSongs';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/user/current",
        element: <UserProfile />,
        children: [
          {
            path: "tracks",
            element: <UserTracks />
          },
        ]
      },
      {
        path: 'user/current/likes',
        element: <LikedSongs />
      },
      {
        path: '/song/:songId/edit',
        element: <UpdateSong />
      }
      // {
      //   path: "/signup",
      //   element: <SignupFormPage />,
      // },
      // {
      //   path: "test",
      //   element: <TestPage />
      // }
    ],
  },
]);
