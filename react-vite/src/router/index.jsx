import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage';
import Layout from './Layout';
import SongDetails from '../components/SongDetails';
import SongFormPage from '../components/SongFormPage';
import UserProfile from '../components/UserProfile/profile';
import LoginFormPage from '../components/LoginFormPage/LoginFormPage';
import UserTracks from '../components/UserProfile/UserTracks/userTracks';
<<<<<<< HEAD
import LikedSongs from '../components/UserProfile/UserPlaylists/userLikes';
import UpdateSong from '../components/UpdateSongs/UpdateSongs';
=======
import LikedSongs from '../components/UserProfile/UserLikes/userLikes';
>>>>>>> parent of b545ed1 (b)

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/songs/:songId",
        element: <SongDetails/>
      },
      {
        path: "/songs/new",
        element: <SongFormPage/>,
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
<<<<<<< HEAD
      },
      {
        path: '/song/:songId/edit',
        element: <UpdateSong />
      },
      {
        path: "/*",
        element: <h1>Page not Found</h1>
      }
=======
      }
      // {
      //   path: "/signup",
      //   element: <SignupFormPage />,
      // },
      // {
      //   path: "test",
      //   element: <TestPage />
      // }
>>>>>>> parent of b545ed1 (b)
    ],
  },
]);
