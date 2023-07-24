import {useEffect} from 'react';
import AppProvider from "./providers/app";
import AppRoutes from "./routes";
import useScreenWidth from "./stores/screenWidth";

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

    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    );
}

export default App;