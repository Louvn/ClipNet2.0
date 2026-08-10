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
import NetworkError from "./pages/NetworkError";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import SplashScreen from "./components/SplashScreen";
import Banned from "./pages/Banned";

function App() {
    
    const { isLoggedIn, userLoading, user } = useAuth();

    const ProtectedRoutes = ({children}) => {
        const location = useLocation();
        if (isLoggedIn && !user?.is_banned) {
            return children
        }

        // setting redirect for use after finishing login
        if (!isLoggedIn) return <Navigate to="/login" state={{ redirect: location.pathname + location.search}} />;
        if (user?.is_banned) return <Navigate to="/banned" />;
    }
    
    // wait for user data to be there
    if (userLoading) return <SplashScreen />;

    // then show the sites
    if (!userLoading) return <>

        {isLoggedIn && <Navbar />}

        <ScrollToTop />

        <div className="page">
            <Routes>

                {/* public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/banned" element={<Banned />} />

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
                                <Route path="/community/user/:id" element={<UserProfile />} />
                                <Route path="/settings" element={<Settings />} />

                                <Route path="/404" element={<NotFound />} />
                                <Route path="network-error" element={<NetworkError />} />

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