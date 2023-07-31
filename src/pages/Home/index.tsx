import React from 'react';
import useAuth from "../../stores/auth.ts";
import {signOut} from 'firebase/auth';
import {auth} from "../../firebase";
import {useTest} from "../../hooks/test.ts";
import {useNavigate} from "react-router-dom";

function HomePage() {

    const {isAuth, authToken} = useAuth();
    const navigate = useNavigate();

    const {mutateAsync: test} = useTest(authToken);

    const handleOnClick = async()=> {
        await test();
    }

    const handleOnSignout = async() => {
        await signOut(auth);
        navigate("/login");
        navigate(0);
    }

    return (
        <div>
            {isAuth && <button onClick={handleOnSignout}>Log Out</button>}
            <h1>hello</h1>
            <button onClick={handleOnClick}>Am i authenticated?</button>
        </div>
    );
}

export default HomePage;