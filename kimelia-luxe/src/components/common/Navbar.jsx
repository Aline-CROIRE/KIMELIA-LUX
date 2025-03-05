// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiX, FiShoppingBag, FiUser } from 'react-icons/fi';

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

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  
  span {
    background: ${props => props.theme.gradients.goldGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.black.main};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gold.main};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.black.main};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gold.main};
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.white};
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.2rem;
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <NavbarContainer>
      <NavContent>
        <Logo>
          <Link to="/">
            <span>KIMELIA LUXE</span>
          </Link>
        </Logo>
        
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/design-tools">Design Tools</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>
          <NavLink to="/about">About</NavLink>
        </NavLinks>
        
        <NavActions>
          <IconButton aria-label="Shopping Bag">
            <FiShoppingBag />
          </IconButton>
          <IconButton aria-label="User Account">
            <FiUser />
          </IconButton>
          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Menu">
            <FiMenu />
          </MobileMenuButton>
        </NavActions>
      </NavContent>
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuHeader>
          <Logo>
            <Link to="/">
              <span>KIMELIA LUXE</span>
            </Link>
          </Logo>
          <IconButton onClick={toggleMobileMenu} aria-label="Close Menu">
            <FiX />
          </IconButton>
        </MobileMenuHeader>
        
        <MobileNavLinks>
          <MobileNavLink to="/" onClick={toggleMobileMenu}>Home</MobileNavLink>
          <MobileNavLink to="/design-tools" onClick={toggleMobileMenu}>Design Tools</MobileNavLink>
          <MobileNavLink to="/marketplace" onClick={toggleMobileMenu}>Marketplace</MobileNavLink>
          <MobileNavLink to="/about" onClick={toggleMobileMenu}>About</MobileNavLink>
        </MobileNavLinks>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;