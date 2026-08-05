import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts.css';
import './index.css';
import "./i18n.js";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { WikiIndexContextProvider } from './context/WikiIndexContext';
import { UserIndexContextProvider } from './context/UserIndexContext';
import { ToastNotificationContextProvider } from './context/ToastNotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>

        <ToastNotificationContextProvider>
        <AuthContextProvider>

            <WikiIndexContextProvider>
            <UserIndexContextProvider>
                    
                <App />    
                
            </UserIndexContextProvider>
            </WikiIndexContextProvider>
            
        </AuthContextProvider>
        </ToastNotificationContextProvider>

        </BrowserRouter>

    </React.StrictMode>
);