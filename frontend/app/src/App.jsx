import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import ArticleEditor from "./pages/ArticleEditor";

import { useAuth } from "./context/AuthContext";
import Search from "./pages/Search";
import PermissionEditor from "./pages/PermissionEditor";

function App() {
    
    const { isLoggedIn } = useAuth();

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

        <ScrollToTop />

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
                                <Route path="/editor/:slug" element={<ArticleEditor />} />
                                <Route path="/editor" element={<ArticleEditor />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/perm-editor/:slug" element={<PermissionEditor />} />

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