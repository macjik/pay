import './App.css';
import React, { useEffect } from 'react';
import {
  createHashRouter,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import RootLayout from './Components/RootLayout';
import ErrorPage from './Components/ErrorPage';
import Form from './Components/Form';
import SuccessPage from './Components/SuccessPage';
import HomePage from './Components/HomePage';

const telegramBot = window.Telegram.WebApp;
// initDataUnsafe.query_id
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      { path: 'success', element: <SuccessPage></SuccessPage> },
    ],
  },
]);

function App() {
  useEffect(() => {
    // console.log(telegramBot.version);
    // console.log(telegramBot.initData);
    // console.log(telegramBot.query_id);
    // console.log(telegramBot);
    // // const { first_name, last_name, username } =
    // // window.Telegram.WebApp.initDataUnsafe.user;
    // telegramBot.sendData([
    //   JSON.stringify({ data: 'From web app' }),
    //   telegramBot.version,
    //   telegramBot.initData,
    //   telegramBot.query_id,
    //   telegramBot.WebAppUser,
    //   telegramBot.WebAppInitData,
    //   // telegramBot.KeyboardButton,
    //   // first_name,
    //   // last_name,
    //   // username,
    //   // telegramBot,
    // ]);
    telegramBot.ready();
  }, []);

  return (
    <React.Fragment>
      <RouterProvider router={router}></RouterProvider>;
    </React.Fragment>
  );
}

export default App;
