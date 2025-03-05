// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage.jsx';
import DesignToolsPage from './pages/DesignToolsPage';
import MarketplacePage from './pages/MarketplacePage';
// import AboutPage from './pages/AboutPage';

// Import design tool pages
import VirtualFittingPage from './pages/design-tools/VirtualFittingPage';
import SketchToolPage from './pages/design-tools/SketchToolPage';
import AiSuggestionsPage from './pages/design-tools/AiSuggestionsPage';
import CustomEditorPage from './pages/design-tools/CustomEditorPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/design-tools" element={<DesignToolsPage />} />
            <Route path="/design-tools/virtual-fitting" element={<VirtualFittingPage />} />
            <Route path="/design-tools/3d-sketch" element={<SketchToolPage />} />
            <Route path="/design-tools/ai-suggestions" element={<AiSuggestionsPage />} />
            <Route path="/design-tools/custom-editor" element={<CustomEditorPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;