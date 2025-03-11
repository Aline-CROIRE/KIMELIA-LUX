// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiX, FiUser, FiHeart, FiShoppingBag, FiPhone, FiSun, FiMoon } from 'react-icons/fi';
import logo from '../../assets/images/logo.png';
import PropTypes from 'prop-types';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SingnupPage'; // Corrected the import

const NavbarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 50px;
  margin-right: 10px;
`;

const LogoText = styled.span`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.7rem;
  font-weight: 700;
  background: ${props => props.theme.gradients.goldGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none; /* Hide on mobile */
  }
`;

const NavLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.black.main};
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.gold.main};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.black.main};
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.gold.main};
  }
`;

const UserMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: ${props => (props.isOpen ? 'block' : 'none')};
  min-width: 150px;
  padding: 0.5rem 0;
  z-index: 1001;

  button {  // Changed from Link to button
    display: block;
    padding: 10px;
    text-align: center;
    color: ${props => props.theme.colors.black.main};
    text-decoration: none;
    font-size: 0.9rem;
    transition: background 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      background: ${props => props.theme.colors.gray.light};
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.black.main};
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block; /* Show on mobile */
  }
`;

const MobileMenu = styled.nav`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  background: white;
  position: absolute;
  top: 60px;
  right: 0;
  width: 200px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  a {
    padding: 10px;
    text-decoration: none;
    color: ${props => props.theme.colors.black.main};
    transition: background 0.3s ease;

    &:hover {
      background: ${props => props.theme.colors.gray.light};
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px; /* Ensure it matches LoginPage/SignupPage max-width */
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.black.main};
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;

  &:hover {
    color: ${props => props.theme.colors.gold.main};
  }
`;


const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(null); // 'login' or 'signup' or null

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen(prev => !prev);

  const openLoginModal = (e) => {
    e.preventDefault();
    setIsUserMenuOpen(false);
    setShowModal('login');
  };

  const openSignupModal = (e) => {
    e.preventDefault();
    setIsUserMenuOpen(false);
    setShowModal('signup');
  };

  const closeModal = () => setShowModal(null);

  // Switching between login and signup
  const switchToSignup = () => setShowModal('signup');
  const switchToLogin = () => setShowModal('login');


  return (
    <NavbarContainer>
      <NavContent>
        <LogoContainer to="/">
          <LogoImage src={logo} alt="KIMELIA LUXE logo" />
          <LogoText>KIMELIA LUXE</LogoText>
        </LogoContainer>

        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/design-tools">Design Tools</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>
          <NavLink to="/about">About</NavLink>
        </NavLinks>

        <NavActions>
          <IconButton aria-label="User Account" onClick={toggleUserMenu}>
            <FiUser />
          </IconButton>
          <UserMenu isOpen={isUserMenuOpen}>
            <button onClick={openLoginModal}>Login</button>
            <button onClick={openSignupModal}>Register</button>
          </UserMenu>

          <IconButton aria-label="Toggle Dark Mode" onClick={toggleDarkMode}>
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </IconButton>

          <IconButton aria-label="Wishlist">
            <FiHeart />
          </IconButton>
          <IconButton aria-label="Shopping Bag">
            <FiShoppingBag />
          </IconButton>

          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Menu">
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </NavActions>
      </NavContent>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink>
        <NavLink to="/design-tools" onClick={toggleMobileMenu}>Design Tools</NavLink>
        <NavLink to="/marketplace" onClick={toggleMobileMenu}>Marketplace</NavLink>
        <NavLink to="/about" onClick={toggleMobileMenu}>About</NavLink>
        <NavLink to="/login" onClick={toggleMobileMenu}>Login</NavLink>
        <NavLink to="/signup" onClick={toggleMobileMenu}>Register</NavLink>
      </MobileMenu>

      {/* Login Overlay */}
      {showModal === 'login' && (
        <Overlay>
          <ModalContent>
            <CloseButton onClick={closeModal} aria-label="Close">
              <FiX />
            </CloseButton>
            <LoginPage onClose={closeModal} onSwitchToSignup={switchToSignup} />
          </ModalContent>
        </Overlay>
      )}

      {/* Signup Overlay */}
      {showModal === 'signup' && (
        <Overlay>
          <ModalContent>
            <CloseButton onClick={closeModal} aria-label="Close">
              <FiX />
            </CloseButton>
            <SignupPage onClose={closeModal} onSwitchToLogin={switchToLogin} />
          </ModalContent>
        </Overlay>
      )}
    </NavbarContainer>
  );
};

// Prop Types for better type-checking
Navbar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Navbar;