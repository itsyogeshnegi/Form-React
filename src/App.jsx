import React from "react";
import FormPage from "./Pages/FormPage";
import ThanksPage from "./Pages/ThanksPage";
import LogInPage from "./Pages/LogInPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <FormPage /> },
    { path: "/Thanks", element: <ThanksPage /> },
    { path: "/admin", element: <LogInPage /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
