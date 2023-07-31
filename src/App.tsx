import {useEffect} from 'react';
import AppProvider from "./providers/app";
import AppRoutes from "./routes";
import useScreenWidth from "./stores/screenWidth";
import useAuth from "./stores/auth.ts";
import {auth} from "./firebase";
import {onAuthStateChanged} from 'firebase/auth';

function App() {

    const {changeWidth} = useScreenWidth();

    useEffect(() => {
        changeWidth(window.innerWidth);
        function handleWindowResize() {
            changeWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const {changeIsAuth, changeToken} = useAuth();

    useEffect(() => {
        authentication();
    }, []);

    const authentication = async()=> {
        await onAuthStateChanged(auth, async(user)=> {
            console.log(user);
            if(user) {
                const authToken = await user.getIdToken();
                changeToken(authToken);
                console.log(authToken);
                changeIsAuth(true);
            }
            else {
                changeIsAuth(false);
                changeToken(null);
            }
        })
    }

    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    );
}

export default App;