"use client"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom" // Corrected Import
import { ThemeProvider } from "styled-components"
import { theme } from "./styles/theme"
import GlobalStyles from "./styles/GlobalStyles"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import HomePage from "./pages/HomePage.jsx"
import DesignToolsPage from "./pages/DesignToolsPage"
import MarketplacePage from "./pages/MarketplacePage"
import AboutPage from "./pages/AboutPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SingnupPage.jsx"

// Import design tool pages
import VirtualFittingPage from "./pages/design-tools/VirtualFittingPage"
import SketchToolPage from "./pages/design-tools/SketchToolPage"
import AiSuggestionsPage from "./pages/design-tools/AiSuggestionsPage"
import CustomEditorPage from "./pages/design-tools/CustomEditorPage"
import styled from "styled-components"
import CustomerDashboard from "./pages/CustomerDashboard.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import ProductDetailPage from "./pages/design-tools/ProductDetailpage.jsx"
import ContactPage from "./pages/ContactPage.jsx"
import DesignersPage from "./pages/DesignerPage.jsx"
import DesignerDetailPage from "./pages/DesignerDetailspaage.jsx"
import CartPage from "./pages/CartPage.jsx"
import CheckoutPage from "./pages/CheckoutPage.jsx"
import ShopPage from "./pages/ShopPage.jsx"
import FAQPage from "./pages/FAPage.jsx"
import PrivacyPolicyPage from "./pages/PrivacyPage.jsx"
import BecomeSellerPage from "./pages/SellerPsge.jsx"
import SellerApplicationPage from "./pages/SellerApplicationpage.jsx"
import SellerInformationPage from "./pages/SellerInformationPage"
import TeamPage from "./pages/TeamPage.jsx"

// Import dashboard pages
import AdminDashboard from "./pages/admin/dashboard"
import AdminProducts from "./pages/admin/products"
import DesignerDashboard from "./pages/designer/dashboard"
import SellerDashboard from "./pages/seller/dashboard"

// Import dashboard context providers
import DashboardThemeProvider from "./context/ThemeContext"
import LanguageProvider from "./context/LanguageContext"

// Styled component to apply dark mode styles to the main content
const MainContent = styled.main`
  /* Existing styles for main */
  min-height: calc(100vh - 160px); /* Example: Adjust height based on header/footer */
  /* Dark mode styles */
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.black.main : theme.colors.white};
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.black.main : theme.colors.black.main};
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition */
  position: relative; /* Ensure modals are positioned relative to MainContent */
`

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
`

// Dashboard wrapper component to provide necessary context
const DashboardWrapper = ({ children }) => {
  return (
    <DashboardThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </DashboardThemeProvider>
  )
}

// Dashboard navigation component that can be added to your navbar or profile dropdown
export const DashboardNavLinks = () => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Link
        to="/admin/dashboard"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "var(--color-primary)",
          color: "white",
          borderRadius: "0.5rem",
          textDecoration: "none",
        }}
      >
        Admin Dashboard
      </Link>
      <Link
        to="/designer/dashboard"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "var(--color-primary)",
          color: "white",
          borderRadius: "0.5rem",
          textDecoration: "none",
        }}
      >
        Designer Dashboard
      </Link>
      <Link
        to="/seller/dashboard"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "var(--color-primary)",
          color: "white",
          borderRadius: "0.5rem",
          textDecoration: "none",
        }}
      >
        Seller Dashboard
      </Link>
    </div>
  )
}

const AppContent = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode")
    return storedDarkMode === "true" || false
  })
  const [language, setLanguage] = useState("en")
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Check if current route is a dashboard route
  const isDashboardRoute =
    location.pathname.includes("/admin/") ||
    location.pathname.includes("/designer/") ||
    location.pathname.includes("/seller/")

  useEffect(() => {
    localStorage.setItem("darkMode", String(isDarkMode))
    document.body.classList.toggle("dark-mode", isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language")
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  const openLoginModal = () => {
    setShowLogin(true)
  }

  const closeLoginModal = () => {
    setShowLogin(false)
  }

  const openSignupModal = () => {
    setShowSignup(true)
  }

  const closeSignupModal = () => {
    setShowSignup(false)
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Only show Navbar if not on a dashboard route */}
      {!isDashboardRoute && (
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          language={language}
          changeLanguage={changeLanguage}
          openLoginModal={openLoginModal}
          openSignupModal={openSignupModal}
        />
      )}

      <MainContent isDarkMode={isDarkMode}>
        <Routes>
          {/* Main site routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/design-tools" element={<DesignToolsPage />} />
          <Route
            path="/design-tools/virtual-fitting"
            element={<VirtualFittingPage />}
          />
          <Route
            path="/design-tools/sketch-tool"
            element={<SketchToolPage />}
          />
          <Route
            path="/design-tools/outfit-suggestions"
            element={<AiSuggestionsPage />}
          />
          <Route
            path="/design-tools/custom-editor"
            element={<CustomEditorPage />}
          />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route
            path="/about"
            element={<AboutPage openSignupModal={openSignupModal} />}
          />
          <Route path="/cdashboard" element={<CustomerDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/support/faq" element={<FAQPage />} />
          <Route path="/support/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/marketplace/designers" element={<DesignersPage />} />
          <Route
            path="/marketplace/designers/:designerId"
            element={<DesignerDetailPage />}
          />
          <Route
            path="/marketplace/product/:productId"
            element={<ProductDetailPage />}
          />
          <Route path="seller" element={<BecomeSellerPage />} />
          <Route path="seller/apply" element={<SellerApplicationPage />} />
          <Route
            path="seller/information"
            element={<SellerInformationPage />}
          />
          <Route path="about/team" element={<TeamPage />} />

          {/* Dashboard routes - wrapped with necessary providers */}
          <Route
            path="/admin/dashboard"
            element={
              <DashboardWrapper>
                <AdminDashboard />
              </DashboardWrapper>
            }
          />
          <Route
            path="/admin/products"
            element={
              <DashboardWrapper>
                <AdminProducts />
              </DashboardWrapper>
            }
          />
          <Route
            path="/designer/dashboard"
            element={
              <DashboardWrapper>
                <DesignerDashboard />
              </DashboardWrapper>
            }
          />
          <Route
            path="/seller/dashboard"
            element={
              <DashboardWrapper>
                <SellerDashboard />
              </DashboardWrapper>
            }
          />
        </Routes>

        {showLogin && (
          <ModalOverlay>
            <LoginPage closeModal={closeLoginModal} />
          </ModalOverlay>
        )}
        {showSignup && (
          <ModalOverlay>
            <SignupPage
              closeModal={closeSignupModal}
              onSwitchToLogin={openLoginModal}
            />
          </ModalOverlay>
        )}
      </MainContent>

      {/* Only show Footer if not on a dashboard route */}
      {!isDashboardRoute && <Footer />}
    </>
  )
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App