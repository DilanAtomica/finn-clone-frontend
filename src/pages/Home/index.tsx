import React from 'react';
import useAuth from "../../stores/auth.ts";
import {signOut} from 'firebase/auth';
import {auth} from "../../firebase";
import {useTest} from "../../hooks/test.ts";

function HomePage() {

    const {isAuth, authToken} = useAuth();

    const {mutateAsync} = useTest(authToken);

    const handleOnClick = async()=> {
        await mutateAsync();
    }

    return (
        <div>
            {isAuth && <button onClick={() => signOut(auth)}>Log Out</button>}
            <h1>hello</h1>
            <button onClick={handleOnClick}>Am i authenticated?</button>
        </div>
    );
}

export default HomePage;