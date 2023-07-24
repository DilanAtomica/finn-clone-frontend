import React, {Suspense} from 'react';
import {QueryClientProvider} from "@tanstack/react-query";
import {client} from "../lib/react-query";

type appProps = {
    children: React.ReactNode
}

function AppProvider({children}:appProps) {
    return (
        <div className="App">
            <Suspense fallback={<>fallback suspense</>}>
                <QueryClientProvider client={client}>
                    {children}
                </QueryClientProvider>
            </Suspense>
        </div>
    );
}

export default AppProvider;