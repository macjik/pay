import "./App.css";
import React, { useEffect } from "react";
import {
  createHashRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import ErrorPage from "./Components/ErrorPage";
import Form from "./Components/Form";
import SuccessPage from "./Components/SuccessPage";
import HomePage from "./Components/HomePage";

const telegramBot = window.Telegram.WebApp;
const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      { path: "success", element: <SuccessPage></SuccessPage> },
    ],
  },
]);

function App() {
  useEffect(() => {
    console.log(telegramBot)
    console.log(telegramBot.version)
    telegramBot.sendData([telegramBot, telegramBot.version])
    telegramBot.ready();
  }, []);

  return (
    <React.Fragment>
      <RouterProvider router={router}></RouterProvider>;
    </React.Fragment>
  );
}

export default App;
