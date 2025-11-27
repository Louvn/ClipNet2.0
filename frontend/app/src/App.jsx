import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Article from "./pages/Article"

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
        return <Navigate to="/login" state={{ redirect: location.pathname + location.search}} />
    }
    
    return <>
        {isLoggedIn && <Navbar />}
        <main style={{minHeight: "70vh"}}>
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
                            </Routes>
                        </ProtectedRoutes>
                    }
                />
            
            </Routes>
        </main>

        {isLoggedIn && <Footer />}
    </>
}

export default App;