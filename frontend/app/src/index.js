import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { WikiIndexContextProvider } from './context/WikiIndexContext';
import { UserIndexContextProvider } from './context/UserIndexContext';
import { ToastNotificationContextProvider } from './context/ToastNotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

        <ToastNotificationContextProvider>
        <AuthContextProvider>

            <WikiIndexContextProvider>
            <UserIndexContextProvider>
                    
                <BrowserRouter>
                    <App />    
                </BrowserRouter>
                
            </UserIndexContextProvider>
            </WikiIndexContextProvider>
            
        </AuthContextProvider>
        </ToastNotificationContextProvider>

    </React.StrictMode>
);