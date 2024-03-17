import React from "react";
import FormPage from "./Pages/FormPage";
import ThanksPage from "./Pages/ThanksPage";
import LogInPage from "./Pages/LogInPage";
import DataTable from "./Pages/DataTable";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "./Pages/AuthContext";
import { Protected } from "./Pages/Protected";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <FormPage /> },
    { path: "/Thanks", element: <ThanksPage /> },
    { path: "/admin", element: <LogInPage /> },
    {
      path: "/Data",
      element: (
        <Protected>
          <DataTable />
        </Protected>
      ),
    },
  ]);
  return (
    <>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </>
  );
}

export default App;
