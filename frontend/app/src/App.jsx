import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("jwt") ? true : false);
    
    useEffect(() => {
        const handleStorageChange = (event) => {
            setLoggedIn(event.detail ? true: false);
        }

        window.addEventListener("jwtChange", handleStorageChange);
        return () => window.removeEventListener("jwtChange", handleStorageChange);
    }, []);

    const ProtectedRoutes = ({children}) => {
        const location = useLocation();
        if (isLoggedIn) {
            return children
        }

        // setting redirect for use after finishing login
        return <Navigate to="/login" state={{ redirect: location.pathname + location.search}} />
    }
    
    return <>
        {isLoggedIn && <Navbar />}

        <div className="page">
            <Routes>

                {/* public Routes */}
                <Route path="/login" element={<Login />} />

                {/* private Routes */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoutes>
                            <Routes>

                                <Route path="/" element={<Home />} />
                                <Route path="/wiki/:slug" element={<Article />} />

                                <Route path="/404" element={<NotFound />} />

                                <Route path="*" element={<NotFound />} />

                            </Routes>
                        </ProtectedRoutes>
                    }
                />
            
            </Routes>
        </div>

        {isLoggedIn && <Footer />}
    </>
}

export default App;