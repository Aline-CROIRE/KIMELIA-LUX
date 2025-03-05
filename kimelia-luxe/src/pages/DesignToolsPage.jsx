import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiCamera, FiPenTool, FiZap, FiEdit, FiArrowRight } from 'react-icons/fi';
import backgroundImage from '../assets/images/bg.webp'
import virtual from '../assets/images/virtual.webp'
import d3 from '../assets/images/3D.webp'
import suggestion from '../assets/images/suggestion.webp'
import edit from '../assets/images/editor.webp'

const DesignToolsPage = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>Fashion Design Tools</h1>
            <p>
              Innovative tools that empower designers and fashion enthusiasts to create, visualize, and customize clothing.
            </p>
          </HeroContent>
        </div>
      </HeroSection>

      {/* Tools Section */}
      <ToolsSection>
        <div className="container">
          <ToolsGrid>
            {/* Virtual Fitting Room */}
            <ToolItem>
              <ToolImage>
                <img src={virtual} alt="Virtual Fitting Room" />
              </ToolImage>
              <ToolContent>
                <ToolIcon>
                  <FiCamera />
                </ToolIcon>
                <h2>Virtual Fitting Room</h2>
                <p>
                  Upload photos and virtually try on clothes. Our technology ensures accurate sizing and fit, reducing returns and increasing customer satisfaction.
                </p>
                <FeatureList>
                  <li>
                    <FiArrowRight /> Accurate body measurements
                  </li>
                  <li>
                    <FiArrowRight /> Real-time visualization
                  </li>
                  <li>
                    <FiArrowRight /> Multiple angle views
                  </li>
                </FeatureList>
                <Link to="/design-tools/virtual-fitting" className="btn btn-gold">
                  Try Virtual Fitting <FiArrowRight />
                </Link>
              </ToolContent>
            </ToolItem>

            {/* 3D Fashion Sketch Tool */}
            <ToolItem reverse>
              <ToolImage>
                <img src={d3} alt="3D Fashion Sketch Tool" />
              </ToolImage>
              <ToolContent>
                <ToolIcon>
                  <FiPenTool />
                </ToolIcon>
                <h2>3D Fashion Sketch Tool</h2>
                <p>
                  Designers can create and view sketches in 3D. Simulate fabric drape, fit, and movement to visualize designs before production.
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
                </FeatureList>
                <Link to="/design-tools/sketch-tool" className="btn btn-gold">
                  Explore 3D Sketch Tool <FiArrowRight />
                </Link>
              </ToolContent>
            </ToolItem>

            {/* Outfit Suggestions */}
            <ToolItem>
              <ToolImage>
                <img src={suggestion}alt="Outfit Suggestions" />
              </ToolImage>
              <ToolContent>
                <ToolIcon>
                  <FiZap />
                </ToolIcon>
                <h2>Outfit Suggestions</h2>
                <p>
                  Our system suggests outfit combinations based on user preferences, body type, occasion, and current fashion trends.
                </p>
                <FeatureList>
                  <li>
                    <FiArrowRight /> Personalized recommendations
                  </li>
                  <li>
                    <FiArrowRight /> Trend-based suggestions
                  </li>
                  <li>
                    <FiArrowRight /> Occasion-specific outfits
                  </li>
                </FeatureList>
                <Link to="/design-tools/outfit-suggestions" className="btn btn-gold">
                  Get Outfit Suggestions <FiArrowRight />
                </Link>
              </ToolContent>
            </ToolItem>

            {/* Custom Design Editor */}
            <ToolItem reverse>
              <ToolImage>
                <img src={edit} alt="Custom Design Editor" />
              </ToolImage>
              <ToolContent>
                <ToolIcon>
                  <FiEdit />
                </ToolIcon>
                <h2>Custom Design Editor</h2>
                <p>
                  Create custom clothing designs with our intuitive editor. Choose fabrics, colors, and styles to bring your vision to life.
                </p>
                <FeatureList>
                  <li>
                    <FiArrowRight /> Extensive fabric library
                  </li>
                  <li>
                    <FiArrowRight /> Customizable elements
                  </li>
                  <li>
                    <FiArrowRight /> Direct to production
                  </li>
                </FeatureList>
                <Link to="/design-tools/custom-editor" className="btn btn-gold">
                  Start Designing <FiArrowRight />
                </Link>
              </ToolContent>
            </ToolItem>
          </ToolsGrid>
        </div>
      </ToolsSection>

      {/* CTA Section */}
      <CTASection>
        <div className="container">
          <CTAContent>
            <h2>Ready to Transform Your Fashion Designs?</h2>
            <p>
              Start using our design tools today and bring your fashion ideas to life.
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
 linear-gradient(to right, rgba(242, 240, 235, 0.9), rgba(227, 223, 214, 0.7))
`;

const HeroSection = styled.section`
   background: linear-gradient(
      to right,
      rgba(4, 5, 7, 0.7), /* Increased opacity of the overlay */
      rgba(223, 223, 224, 0.5)
    ),url(${backgroundImage});
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

const ToolsSection = styled.section`
  padding: 5rem 0;
`;

const ToolsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const ToolItem = styled.div`
  display: grid;
  grid-template-columns: ${props => props.reverse ? '1fr 1fr' : '1fr 1fr'};
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  ${props => props.reverse && `
    @media (min-width: 769px) {
      direction: rtl;
      text-align: left;
      
      > * {
        direction: ltr;
      }
    }
  `}
`;

const ToolImage = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ToolContent = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    
    svg {
      margin-left: 0.5rem;
    }
  }
`;

const ToolIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  
  svg {
    color: var(--gold-primary);
    font-size: 1.5rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    
    svg {
      color: var(--gold-primary);
      margin-right: 0.5rem;
      flex-shrink: 0;
    }
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
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  a {
    margin: 0.5rem;
  }

  .btn-outline {
    border-color: white;
    color: white;
  }

  .btn-outline:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default DesignToolsPage;