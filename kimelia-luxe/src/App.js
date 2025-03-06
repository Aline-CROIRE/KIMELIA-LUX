// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useLocation
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage.jsx';
import DesignToolsPage from './pages/DesignToolsPage';
import MarketplacePage from './pages/MarketplacePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingnupPage.jsx';

// Import design tool pages
import VirtualFittingPage from './pages/design-tools/VirtualFittingPage';
import SketchToolPage from './pages/design-tools/SketchToolPage';
import AiSuggestionsPage from './pages/design-tools/AiSuggestionsPage';
import CustomEditorPage from './pages/design-tools/CustomEditorPage';
import styled from 'styled-components';

// Styled component to apply dark mode styles to the main content
const MainContent = styled.main`
    /* Existing styles for main */
    min-height: calc(100vh - 160px); /* Example: Adjust height based on header/footer */
    /* Dark mode styles */
    background-color: ${({theme, isDarkMode}) => isDarkMode ? theme.colors.black.main : theme.colors.white};
    color: ${({theme, isDarkMode}) => isDarkMode ? theme.colors.white : theme.colors.black.main};
    transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition */
`;

const AppContent = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        return storedDarkMode === 'true' || false;
    });
    const [language, setLanguage] = useState('en');
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('darkMode', String(isDarkMode));
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    const openLoginModal = () => {
        setShowLogin(true);
        navigate('/login');
    };

    const closeLoginModal = () => {
        setShowLogin(false);
        navigate(location.pathname);
    };

    const openSignupModal = () => {
        setShowSignup(true);
        navigate('/signup');
    };

    const closeSignupModal = () => {
        setShowSignup(false);
        navigate(location.pathname);
    };

    return (
        <>
            <Navbar
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                language={language}
                changeLanguage={changeLanguage}
                openLoginModal={openLoginModal}
                openSignupModal={openSignupModal}
            />
            <MainContent isDarkMode={isDarkMode}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/design-tools" element={<DesignToolsPage/>}/>
                    <Route path="/design-tools/virtual-fitting" element={<VirtualFittingPage/>}/>
                    <Route path="/design-tools/3d-sketch" element={<SketchToolPage/>}/>
                    <Route path="/design-tools/ai-suggestions" element={<AiSuggestionsPage/>}/>
                    <Route path="/design-tools/custom-editor" element={<CustomEditorPage/>}/>
                    <Route path="/marketplace" element={<MarketplacePage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>

                    <Route path="/login" element={LoginPage}/>
                    <Route path="/signup" element={SignupPage}/>
                </Routes>
            </MainContent>
            {showLogin && <LoginPage closeModal={closeLoginModal}/>}
            {showSignup && <SignupPage closeModal={closeSignupModal}/>}
            <Footer/>git
        </>
    );
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <Router>
                <AppContent/>
            </Router>
        </ThemeProvider>
    );
};

export default App;