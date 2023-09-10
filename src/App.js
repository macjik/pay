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

const telegramBot = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    telegramBot.ready();
  }, []);

  return (
    <React.Fragment>
      <RouterProvider router={router}></RouterProvider>;
    </React.Fragment>
  );
}

export default App;
