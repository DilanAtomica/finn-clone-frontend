import {Outlet, Navigate} from "react-router-dom";
import useAuth from "../stores/auth.ts";

function AuthRoutes() {

    const {isAuth} = useAuth();

    return (
        !isAuth ? <Outlet /> : <Navigate to="/home" />
    );
}

export default AuthRoutes;