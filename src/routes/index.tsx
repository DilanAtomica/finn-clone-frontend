import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import PublicRoutes from "./PublicRoutes.tsx";
import React from "react";

const Login = React.lazy(() => import("../pages/Login/index"));

function AppRoutes() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route errorElement={<h1>There is nothing to see here...</h1>}>
                <Route element={<><PublicRoutes/></>}>
                    <Route element={<><Login/></>} path="/login"/>
                </Route>
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    );
}

export default AppRoutes;