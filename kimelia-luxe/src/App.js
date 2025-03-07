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
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProductDetailPage from './pages/design-tools/ProductDetailpage.jsx';
import ContactPage from './pages/ContactPage.jsx';

// Styled component to apply dark mode styles to the main content
const MainContent = styled.main`
    /* Existing styles for main */
    min-height: calc(100vh - 160px); /* Example: Adjust height based on header/footer */
    /* Dark mode styles */
    background-color: ${({theme, isDarkMode}) => isDarkMode ? theme.colors.black.main : theme.colors.white};
    color: ${({theme, isDarkMode}) => isDarkMode ? theme.colors.white : theme.colors.black.main};
    transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition */
    position: relative; /* Ensure modals are positioned relative to MainContent */
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensure it's on top of everything */
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
    };

    const closeLoginModal = () => {
        setShowLogin(false);
    };

    const openSignupModal = () => {
        setShowSignup(true);
    };

    const closeSignupModal = () => {
        setShowSignup(false);
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
                    <Route path="/design-tools/sketch-tool" element={<SketchToolPage/>}/>
                    <Route path="/design-tools/outfit-suggestions" element={<AiSuggestionsPage/>}/>
                    <Route path="/design-tools/custom-editor" element={<CustomEditorPage/>}/>
                    <Route path="/marketplace" element={<MarketplacePage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/cdashboard" element={<CustomerDashboard/>}/>
                    <Route path='/profile' element={<ProfilePage/>}/>
                    <Route path='/detail' element={<ProductDetailPage/>}/>
                    <Route path='/contact' element={<ContactPage/>}/>
             
                </Routes>
                {showLogin && (
                    <ModalOverlay>
                        <LoginPage closeModal={closeLoginModal}/>
                    </ModalOverlay>
                )}
                {showSignup && (
                    <ModalOverlay>
                        <SignupPage closeModal={closeSignupModal}/>
                    </ModalOverlay>
                )}
            </MainContent>
            <Footer/>
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