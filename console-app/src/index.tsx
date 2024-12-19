import React from 'react';
import ReactDOM from 'react-dom/client';
import {Main} from './views';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ApplicationThemeProvider} from "./common/components";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ApplicationThemeProvider>
                <Main/>
            </ApplicationThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>);