// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.black.main};
  color: ${props => props.theme.colors.white};
  padding: 4rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  span {
    background: ${props => props.theme.gradients.goldGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const FooterDescription = styled.p`
  color: ${props => props.theme.colors.gray.main};
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.gray.main};
  font-size: 1.2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gold.main};
  }
`;

const FooterHeading = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.white};
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: ${props => props.theme.colors.gray.main};
    font-size: 0.9rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.gold.main};
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: ${props => props.theme.colors.gray.main};
  font-size: 0.8rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo>
            <span>KIMELIA LUXE</span>
          </FooterLogo>
          <FooterDescription>
            Revolutionizing fashion with AI, 3D modeling, and e-commerce.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">
              <FiFacebook />
            </SocialLink>
            <SocialLink href="#" aria-label="Instagram">
              <FiInstagram />
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <FiTwitter />
            </SocialLink>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Design Tools</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <Link to="/design-tools/virtual-fitting">Virtual Fitting Room</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/design-tools/3d-sketch">3D Fashion Sketch Tool</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/design-tools/ai-suggestions">AI Outfit Suggestions</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/design-tools/custom-editor">Custom Design Editor</Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Marketplace</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <Link to="/marketplace/ready-made">Ready-made Items</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/marketplace/custom">Custom Designs</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/marketplace/designers">Designers & Tailors</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/marketplace/trending">Trending Styles</Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Support</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <Link to="/support/faq">FAQ</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/support/contact">Contact Us</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/support/shipping">Shipping & Returns</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/support/privacy">Privacy Policy</Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; {new Date().getFullYear()} Kimelia Luxe. All rights reserved. Created by Aline NIYONIZERA</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;