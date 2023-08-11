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

const telegramBot = window.Telegram.WebApp;
const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "",
        element: <Form />,
      },
      { path: "success", element: <SuccessPage></SuccessPage> },
    ],
  },
]);

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
