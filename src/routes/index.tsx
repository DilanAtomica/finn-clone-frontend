import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import PublicRoutes from "./PublicRoutes.tsx";
import React from "react";
import AuthRoutes from "./AuthRoutes.tsx";

const Login = React.lazy(() => import("../pages/Login/index"));
const Register = React.lazy(() => import("../pages/Register/index"));
const Home = React.lazy(() => import("../pages/Home/index"));

function AppRoutes() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route errorElement={<h1>There is nothing to see here...</h1>}>
                <Route element={<><PublicRoutes/></>}>
                    <Route element={<><Home/></>} path="/home"/>
                </Route>
                <Route element={<><AuthRoutes/></>}>
                    <Route element={<><Login/></>} path="/login"/>
                    <Route element={<><Register/></>} path="/register"/>
                </Route>
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    );
}

export default AppRoutes;