// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FiCamera, FiPenTool, FiZap, FiEdit, FiShoppingBag, FiUser, FiTruck, FiCreditCard } from "react-icons/fi";

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

import image1 from '../assets/images/hy8.jpg';
import image2 from '../assets/images/hy5.jpg';
import image3 from '../assets/images/hy6.jpg';

import market from '../assets/images/mmrkt.webp';
import custm from '../assets/images/cust.webp'

// Apply a global background gradient
const PageWrapper = styled.div`
  background: linear-gradient(135deg, #1a1a2e,rgb(55, 61, 77),rgb(31, 32, 33)); /* Deep, stylish gradient */
  color: #FFFFFF;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif; /* A more modern fashion-friendly font */
`;


// Keyframes for fading in
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Keyframes for fading out
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const HeroSection = styled.section`
  height: 70vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #232526, #414345);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  .image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${props => (props.isLeaving ? fadeOut : fadeIn)} 3s ease-in-out forwards;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  text-align: center;
  color: #FFFFFF;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  color: #EEEEEE;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

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
  background: transparent;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #FFFFFF;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  color: #D3D3D3;
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  background: #607D8B;

  svg {
    font-size: 1.5rem;
    color: #FFFFFF;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #FFFFFF;
`;

const FeatureDescription = styled.p`
  color: #D3D3D3;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FeatureLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #B0BEC5;
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
  background: transparent;
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
  color: #FFFFFF;
`;

const EcommerceDescription = styled.p`
  color: #D3D3D3;
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
  background: #607D8B;

  svg {
    font-size: 1rem;
    color: #FFFFFF;
  }
`;

const FeatureItemContent = styled.div``;

const FeatureItemTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #FFFFFF;
`;

const FeatureItemDescription = styled.p`
  color: #D3D3D3;
  font-size: 0.9rem;
`;

const EcommerceImage = styled.div`
  position: relative;

    img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        object-fit: contain; /* Changed to contain to show full images */
        object-position: center; /* Center images in container */
    }

    .accent-image {
        position: absolute;
        bottom: -30px;
        left: -30px;
        width: 200px;
        height: 200px;
        border-radius: 8px;
        border: 4px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        object-fit: cover;
        object-position: center;
        z-index: 1;
    }
`;

// CTA Section
const CTASection = styled.section`
  padding: 5rem 2rem;
  background: transparent;
  color: #FFFFFF;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
`;

const CTADescription = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  opacity: 0.9;
  color: #D3D3D3;
`;

const CTAButtons = styled.div`
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

// Mock data for features
const features = [
  {
    icon: "FiCamera",
    title: "Virtual Fitting Room",
    description: "Step into style! Upload your photo and instantly see clothes on you with advanced tech.",
    link: "/design-tools/virtual-fitting"
  },
  {
    icon: "FiPenTool",
    title: "3D Fashion Studio",
    description: "Unleash your inner designer! Create breathtaking 3D sketches, experiment with fabrics, and bring your visions to life.",
    link: "/design-tools/3d-sketch"
  },
  {
    icon: "FiZap",
    title: "Style Inspiration Engine",
    description: "Never run out of ideas! Get personalized outfit recommendations tailored to your unique style.",
    link: "/design-tools/intelligent-suggestions"
  },
  {
    icon: "FiEdit",
    title: "Bespoke Design Lab",
    description: "Take control of your style. Design custom clothes from the ground up, choosing every detail.",
    link: "/design-tools/custom-editor"
  }
];

// Mock data for e-commerce features
const ecommerceFeatures = [
  {
    icon: "FiShoppingBag",
    title: "Exclusive Designer Marketplace",
    description: "Discover handcrafted fashion and unique creations from independent designers and tailors."
  },
  {
    icon: "FiUser",
    title: "Your Personal Style Hub",
    description: "Manage orders, track your favorite designers, and curate your perfect wardrobe."
  },
  {
    icon: "FiTruck",
    title: "Seamless Order Tracking",
    description: "Know where your style is! Get real-time updates on your order's journey to your doorstep."
  },
  {
    icon: "FiCreditCard",
    title: "Safe & Simple Checkout",
    description: "Shop securely with Mobile Money (MoMo), PayPal, and all major Credit Cards."
  }
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3];
  const [isLeaving, setIsLeaving] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    const cycleImages = () => {
      setIsLeaving(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsLeaving(false);
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    };

    const intervalId = setInterval(cycleImages, 6000);

    cycleImages();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutRef.current);
    };
  }, [images.length]);

  return (
    <PageWrapper>
      <HeroSection isLeaving={isLeaving}>
        <div className="image-container">
          <img
            src={images[currentImageIndex]}
            alt="Hero Image"
          />
        </div>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Curate Your Style Story.
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Design your own pieces with our advanced tools, or discover one-of-a-kind finds from visionary creators in our marketplace.
          </HeroSubtitle>
          <HeroButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button as={Link} to="/design-tools">
             Design My Style
            </Button>
            <Button as={Link} to="/marketplace" variant="outline">
              Shop the Marketplace
            </Button>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Explore Cutting-Edge Design Tools</SectionTitle>
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
                Discover More <FiArrowRight />
                </FeatureLink>
              </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <EcommerceSection>
        <EcommerceContent>
          <EcommerceInfo>
            <EcommerceTitle>Discover Unique Fashion in Our Marketplace</EcommerceTitle>
            <EcommerceDescription>
              Shop ready-made or custom pieces, supporting independent designers and skilled tailors.
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
              See the Collections <FiArrowRight />
            </Button>
          </EcommerceInfo>
          <EcommerceImage>
            <img src={market} alt="E-commerce Marketplace" />
            <img src={custm} alt="Custom Design" className="accent-image" />
          </EcommerceImage>
        </EcommerceContent>
      </EcommerceSection>

      <CTASection>
        <CTAContent>
          <CTATitle>
            Ready to Transform Your Fashion Experience?
          </CTATitle>
          <CTADescription>
            Join Kimelia Luxe today and unlock endless possibilities for your personal style.
          </CTADescription>
          <CTAButtons>
            <Button as={Link} to="/signup">
              Create Your Free Account
            </Button>
            <Button as={Link} to="/about" variant="outline">
              About Kimelia Luxe
            </Button>
            </CTAButtons>
          </CTAContent>
      </CTASection>
    </PageWrapper>
  );
};

export default HomePage;