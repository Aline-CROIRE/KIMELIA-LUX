import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowRight, FiPenTool } from 'react-icons/fi';

const SketchToolPage = () => {
  return (
    <PageContainer>
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>3D Fashion Sketch Tool</h1>
            <p>
              Create and visualize your fashion designs in 3D with our advanced sketch tool.
            </p>
          </HeroContent>
        </div>
      </HeroSection>

      <ToolSection>
        <div className="container">
          <ToolGrid>
            <ToolContent>
              <ToolIcon>
                <FiPenTool />
              </ToolIcon>
              <h2>Design in 3D</h2>
              <p>
                Our 3D Fashion Sketch Tool allows designers to create and view sketches in three dimensions. 
                Simulate fabric drape, fit, and movement to visualize designs before production.
              </p>
              <FeatureList>
                <li>
                  <FiArrowRight /> Realistic fabric simulation
                </li>
                <li>
                  <FiArrowRight /> 360° view of designs
                </li>
                <li>
                  <FiArrowRight /> Export to manufacturing
                </li>
                <li>
                  <FiArrowRight /> Collaborate with team members
                </li>
              </FeatureList>
              <ButtonGroup>
                <Link to="/design-tools/sketch-tool/demo" className="btn btn-gold">
                  Try Demo
                </Link>
                <Link to="/signup" className="btn btn-outline">
                  Sign Up for Full Access
                </Link>
              </ButtonGroup>
            </ToolContent>
            <ToolImage>
              <img src="/images/sketch-tool-detail.jpg" alt="3D Fashion Sketch Tool" />
            </ToolImage>
          </ToolGrid>
        </div>
      </ToolSection>

      <FeaturesSection>
        <div className="container">
          <SectionTitle>
            <h2>Key Features</h2>
            <p>
              Our 3D Fashion Sketch Tool offers a range of features to help designers create stunning fashion pieces.
            </p>
          </SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <h3>Fabric Library</h3>
              <p>
                Access a vast library of fabric textures and materials, each with realistic physical properties.
              </p>
            </FeatureCard>
            <FeatureCard>
              <h3>3D Modeling</h3>
              <p>
                Create detailed 3D models of garments with precise measurements and proportions.
              </p>
            </FeatureCard>
            <FeatureCard>
              <h3>Physics Simulation</h3>
              <p>
                Simulate how fabrics drape, fold, and move on different body types and in motion.
              </p>
            </FeatureCard>
            <FeatureCard>
              <h3>Color & Pattern Editor</h3>
              <p>
                Experiment with colors, patterns, and prints to find the perfect combination.
              </p>
            </FeatureCard>
            <FeatureCard>
              <h3>Export Options</h3>
              <p>
                Export designs in various formats for manufacturing, presentations, or e-commerce.
              </p>
            </FeatureCard>
            <FeatureCard>
              <h3>Collaboration Tools</h3>
              <p>
                Share designs with team members and clients for feedback and approval.
              </p>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <CTASection>
        <div className="container">
          <CTAContent>
            <h2>Ready to Start Designing?</h2>
            <p>
              Sign up today and bring your fashion ideas to life with our 3D Fashion Sketch Tool.
            </p>
            <ButtonGroup>
              <Link to="/signup" className="btn btn-gold">
                Create Free Account
              </Link>
              <Link to="/pricing" className="btn btn-outline">
                View Pricing
              </Link>
            </ButtonGroup>
          </CTAContent>
        </div>
      </CTASection>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  background: linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.7)), url('/images/sketch-tool-hero.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
  }
`;

const ToolSection = styled.section`
  padding: 5rem 0;
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ToolContent = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const ToolIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    color: var(--gold-primary);
    font-size: 1.8rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    
    svg {
      color: var(--gold-primary);
      margin-right: 0.75rem;
      flex-shrink: 0;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  a {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`;

const ToolImage = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background-color: #f9f9f9;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    max-width: 600px;
    margin: 0 auto;
    color: var(--text-secondary);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--gold-primary);
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const CTASection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(to right, var(--luxury-black), #1a1a1a);
  color: white;
`;

const CTAContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    opacity: 0.9;
  }

  .btn-outline {
    border-color: white;
    color: white;
  }

  .btn-outline:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default SketchToolPage;