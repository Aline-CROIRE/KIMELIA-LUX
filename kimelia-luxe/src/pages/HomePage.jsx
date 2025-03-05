// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

import { FiCamera, FiPenTool, FiZap, FiEdit, FiShoppingBag, FiUser, FiTruck, FiCreditCard } from "react-icons/fi";

import Button from '../components/common/Button';

// Hero Section
const HeroSection = styled.section`
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.7));
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0.4;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${props => props.theme.colors.white};
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

// Features Section
const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.gray.light};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  color: ${props => props.theme.colors.gray.dark};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: ${props => props.theme.gradients.goldGradient};
  
  svg {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.black.main};
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.gray.dark};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FeatureLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.gold.main};
  font-weight: 500;
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

// E-commerce Section
const EcommerceSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.white};
`;

const EcommerceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const EcommerceInfo = styled.div``;

const EcommerceTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const EcommerceDescription = styled.p`
  color: ${props => props.theme.colors.gray.dark};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const FeatureItemIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background: ${props => props.theme.colors.gold.main}20;
  
  svg {
    font-size: 1rem;
    color: ${props => props.theme.colors.gold.main};
  }
`;

const FeatureItemContent = styled.div``;

const FeatureItemTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const FeatureItemDescription = styled.p`
  color: ${props => props.theme.colors.gray.dark};
  font-size: 0.9rem;
`;

const EcommerceImage = styled.div`
  position: relative;
  
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .accent-image {
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 200px;
    height: 200px;
    border-radius: 8px;
    border: 4px solid ${props => props.theme.colors.white};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }
`;

// CTA Section
const CTASection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.gradients.darkGradient};
  color: ${props => props.theme.colors.white};
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  opacity: 0.9;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
  }
`;

// Mock data for features
const features = [
  {
    icon: "FiCamera",
    title: "Virtual Fitting Room",
    description: "Upload photos and virtually try on clothes. AI ensures accurate sizing and fit.",
    link: "/design-tools/virtual-fitting"
  },
  {
    icon: "FiPenTool",
    title: "3D Fashion Sketch Tool",
    description: "Designers create and view sketches in 3D. Simulate fabric drape, fit, and movement.",
    link: "/design-tools/3d-sketch"
  },
  {
    icon: "FiZap",
    title: "AI Outfit Suggestions",
    description: "AI suggests outfit combinations based on user preferences and style.",
    link: "/design-tools/ai-suggestions"
  },
  {
    icon: "FiEdit",
    title: "Custom Design Editor",
    description: "Create custom clothing designs. Choose fabrics, colors, and styles.",
    link: "/design-tools/custom-editor"
  }
];

// Mock data for e-commerce features
const ecommerceFeatures = [
  {
    icon: "FiShoppingBag",
    title: "Multi-vendor Marketplace",
    description: "Designers and tailors list products for sale."
  },
  {
    icon: "FiUser",
    title: "Customer Dashboard",
    description: "Track orders, manage profiles, and save designs."
  },
  {
    icon: "FiTruck",
    title: "Order Tracking",
    description: "Real-time updates on delivery status."
  },
  {
    icon: "FiCreditCard",
    title: "Secure Payment Integration",
    description: "Mobile Money (MoMo), PayPal, and Credit Cards."
  }
];

const HomePage = () => {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="gold-gradient-text"
          >
            Revolutionizing Fashion
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kimelia Luxe blends modern technology with fashion design, offering custom designs, 
            virtual fitting rooms, and AI outfit suggestions.
          </HeroSubtitle>
          <HeroButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button as={Link} to="/design-tools">
              Explore Design Tools
            </Button>
            <Button as={Link} to="/marketplace" variant="outline">
              Shop Now
            </Button>
          </HeroButtons>
        </HeroContent>
      </HeroSection>
      
      <FeaturesSection>
        <SectionTitle>Fashion Design Tools</SectionTitle>
        <SectionSubtitle>
          Our innovative tools empower designers and fashion enthusiasts to create, visualize, and customize clothing.
        </SectionSubtitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureIcon>
                {/* Dynamic import of icons */}
                {feature.icon === "FiCamera" && <FiCamera />}
                {feature.icon === "FiPenTool" && <FiPenTool />}
                {feature.icon === "FiZap" && <FiZap />}
                {feature.icon === "FiEdit" && <FiEdit />}
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <FeatureLink to={feature.link}>
                Learn more <FiArrowRight />
              </FeatureLink>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>
      
      <EcommerceSection>
        <EcommerceContent>
          <EcommerceInfo>
            <EcommerceTitle>E-commerce Marketplace</EcommerceTitle>
            <EcommerceDescription>
              The platform serves as an e-commerce marketplace where users can buy ready-made or custom fashion from designers and tailors.
            </EcommerceDescription>
            <FeatureList>
              {ecommerceFeatures.map((feature, index) => (
                <FeatureItem key={index}>
                  <FeatureItemIcon>
                    {/* Dynamic import of icons */}
                    {feature.icon === "FiShoppingBag" && <FiShoppingBag />}
                    {feature.icon === "FiUser" && <FiUser />}
                    {feature.icon === "FiTruck" && <FiTruck />}
                    {feature.icon === "FiCreditCard" && <FiCreditCard />}
                  </FeatureItemIcon>
                  <FeatureItemContent>
                    <FeatureItemTitle>{feature.title}</FeatureItemTitle>
                    <FeatureItemDescription>{feature.description}</FeatureItemDescription>
                  </FeatureItemContent>
                </FeatureItem>
              ))}
            </FeatureList>
            <Button as={Link} to="/marketplace">
              Explore Marketplace <FiArrowRight />
            </Button>
          </EcommerceInfo>
          <EcommerceImage>
            <img src="/images/marketplace.jpg" alt="E-commerce Marketplace" />
            <img src="/images/custom-design.jpg" alt="Custom Design" className="accent-image" />
          </EcommerceImage>
        </EcommerceContent>
      </EcommerceSection>
      
      <CTASection>
        <CTAContent>
          <CTATitle className="gold-gradient-text">
            Ready to Transform Your Fashion Experience?
          </CTATitle>
          <CTADescription>
            Join Kimelia Luxe today and discover the future of fashion technology.
          </CTADescription>
          <CTAButtons>
            <Button as={Link} to="/signup">
              Sign Up Now
            </Button>
            <Button as={Link} to="/about" variant="outline">
              Learn More
            </Button>
          </CTAButtons>
        </CTAContent>
      </CTASection>
    </>
  );
};

export default HomePage;