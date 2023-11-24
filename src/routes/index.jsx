import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

const router = createBrowserRouter([
    {
        path: "*",
        element: <div>Routes Not Found!</div>
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/dashboard",
                element: <DashboardPage />,
            },
        ],
    }
]);

import React from 'react'

function AppRouter() {
  return (
    <>
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
    </>
  )
}

export default AppRouter;