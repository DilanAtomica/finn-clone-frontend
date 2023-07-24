import {Outlet, Navigate} from "react-router-dom";

function PublicRoutes() {

    return (
        1 === 1 ? <Outlet /> : <Navigate to="/home"/>
    );
}

export default PublicRoutes;