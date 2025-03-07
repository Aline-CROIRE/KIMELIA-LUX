import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiPenTool, FiLayers, FiGrid, FiDownload, FiShare2, FiSave, FiArrowRight, FiSliders } from 'react-icons/fi';
import backgroundImage from '../../assets/images/bg.webp';

const SketchToolPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>3D Fashion Sketch Tool</h1>
            <p>
              Bring your fashion designs to life with our professional-grade 3D sketching tool.
              Visualize fabrics, textures, and fits before production.
            </p>
            <ButtonGroup>
              <button className="btn btn-gold">
                Launch Sketch Tool
              </button>
              <button className="btn btn-outline">
                Watch Tutorial
              </button>
            </ButtonGroup>
          </HeroContent>
        </div>
      </HeroSection>

      {/* Tabs Section */}
      <TabsSection>
        <div className="container">
          <TabsContainer>
            <Tab 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </Tab>
            <Tab 
              active={activeTab === 'features'} 
              onClick={() => setActiveTab('features')}
            >
              Features
            </Tab>
            <Tab 
              active={activeTab === 'gallery'} 
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </Tab>
            <Tab 
              active={activeTab === 'pricing'} 
              onClick={() => setActiveTab('pricing')}
            >
              Pricing
            </Tab>
          </TabsContainer>

          <TabContent>
            {activeTab === 'overview' && (
              <OverviewTab>
                <h2>Revolutionize Your Design Process</h2>
                <p>
                  Our 3D Fashion Sketch Tool is a professional-grade solution for fashion designers, 
                  brands, and enthusiasts. Create detailed 3D fashion sketches, simulate different 
                  fabrics and materials, and view your designs from any angle.
                </p>

                <ToolPreview>
                  <img src="/placeholder.svg?height=500&width=800" alt="3D Sketch Tool Interface" />
                  <ToolOverlay>
                    <button className="btn btn-gold">
                      Try Demo
                    </button>
                  </ToolOverlay>
                </ToolPreview>

                <FeaturesGrid>
                  <FeatureCard>
                    <FeatureIcon>
                      <FiPenTool />
                    </FeatureIcon>
                    <h3>Intuitive Design Tools</h3>
                    <p>
                      Easy-to-use drawing tools specifically designed for fashion sketching.
                    </p>
                  </FeatureCard>
                  
                  <FeatureCard>
                    <FeatureIcon>
                      <FiLayers />
                    </FeatureIcon>
                    <h3>Fabric Simulation</h3>
                    <p>
                      Realistic fabric simulation with over 100 material presets.
                    </p>
                  </FeatureCard>
                  
                  <FeatureCard>
                    <FeatureIcon>
                      <FiGrid />
                    </FeatureIcon>
                    <h3>3D Visualization</h3>
                    <p>
                      View your designs from any angle with our 3D rendering engine.
                    </p>
                  </FeatureCard>
                </FeaturesGrid>
              </OverviewTab>
            )}

            {activeTab === 'features' && (
              <FeaturesTab>
                <h2>Powerful Features for Fashion Designers</h2>
                <p>
                  Our 3D Fashion Sketch Tool comes packed with features designed to streamline your creative process.
                </p>

                <FeaturesList>
                  <FeatureItem>
                    <FeatureImage>
                      <img src="/placeholder.svg?height=300&width=400" alt="Drawing Tools" />
                    </FeatureImage>
                    <FeatureInfo>
                      <h3>Advanced Drawing Tools</h3>
                      <p>
                        Precision drawing tools with pressure sensitivity support for detailed sketching.
                        Create smooth curves and precise lines with our specialized fashion design brushes.
                      </p>
                      <ul>
                        <li>Fashion-specific brush presets</li>
                        <li>Pressure sensitivity support</li>
                        <li>Symmetry drawing options</li>
                        <li>Pattern creation tools</li>
                      </ul>
                    </FeatureInfo>
                  </FeatureItem>

                  <FeatureItem reverse>
                    <FeatureImage>
                      <img src="/placeholder.svg?height=300&width=400" alt="Fabric Library" />
                    </FeatureImage>
                    <FeatureInfo>
                      <h3>Extensive Fabric Library</h3>
                      <p>
                        Choose from over 500 fabric types with realistic textures and behaviors.
                        Each fabric accurately simulates drape, weight, and movement.
                      </p>
                      <ul>
                        <li>500+ fabric presets</li>
                        <li>Custom fabric creation</li>
                        <li>Realistic drape simulation</li>
                        <li>Material property editor</li>
                      </ul>
                    </FeatureInfo>
                  </FeatureItem>

                  <FeatureItem>
                    <FeatureImage>
                      <img src="/placeholder.svg?height=300&width=400" alt="3D Visualization" />
                    </FeatureImage>
                    <FeatureInfo>
                      <h3>Real-time 3D Visualization</h3>
                      <p>
                        See your designs come to life in real-time with our powerful 3D rendering engine.
                        Rotate, zoom, and examine your creations from any angle.
                      </p>
                      <ul>
                        <li>360° view rotation</li>
                        <li>Realistic lighting options</li>
                        <li>Virtual mannequin with adjustable measurements</li>
                        <li>Animation capabilities for movement simulation</li>
                      </ul>
                    </FeatureInfo>
                  </FeatureItem>

                  <FeatureItem reverse>
                    <FeatureImage>
                      <img src="/placeholder.svg?height=300&width=400" alt="Export Options" />
                    </FeatureImage>
                    <FeatureInfo>
                      <h3>Professional Export Options</h3>
                      <p>
                        Export your designs in various formats suitable for production, presentation, or collaboration.
                      </p>
                      <ul>
                        <li>Production-ready pattern exports</li>
                        <li>High-resolution renders</li>
                        <li>3D model exports (OBJ, FBX, GLB)</li>
                        <li>Measurement specifications</li>
                      </ul>
                    </FeatureInfo>
                  </FeatureItem>
                </FeaturesList>
              </FeaturesTab>
            )}

            {activeTab === 'gallery' && (
              <GalleryTab>
                <h2>Design Gallery</h2>
                <p>
                  Explore designs created with our 3D Fashion Sketch Tool by professional designers and community members.
                </p>

                <GalleryFilter>
                  <FilterButton active>All Designs</FilterButton>
                  <FilterButton>Dresses</FilterButton>
                  <FilterButton>Outerwear</FilterButton>
                  <FilterButton>Accessories</FilterButton>
                  <FilterButton>Community Picks</FilterButton>
                </GalleryFilter>

                <GalleryGrid>
                  {[1, 2, 3, 4, 5, 6].map(item => {
                    const GalleryItem = GalleryItemContainer;
                    return (
                      <GalleryItem key={item}>
                        <img src={`/placeholder.svg?height=400&width=300&text=Design ${item}`} alt={`Design ${item}`} />
                        <GalleryItemOverlay>
                          <h3>Fashion Design {item}</h3>
                          <p>By Designer Name</p>
                          <GalleryItemActions>
                            <button>
                              <FiDownload /> Download
                            </button>
                            <button>
                              <FiShare2 /> Share
                            </button>
                          </GalleryItemActions>
                        </GalleryItemOverlay>
                      </GalleryItem>
                    );
                  })}
                </GalleryGrid>

                <ButtonGroup center>
                  <button className="btn btn-outline">
                    Load More Designs
                  </button>
                </ButtonGroup>
              </GalleryTab>
            )}

            {activeTab === 'pricing' && (
              <PricingTab>
                <h2>Choose Your Plan</h2>
                <p>
                  Select the plan that best fits your design needs and budget.
                </p>

                <PricingGrid>
                  <PricingCard>
                    <PricingHeader>
                      <h3>Basic</h3>
                      <PricingPrice>
                        <span className="currency">$</span>
                        <span className="amount">19</span>
                        <span className="period">/month</span>
                      </PricingPrice>
                    </PricingHeader>
                    <PricingFeatures>
                      <li>
                        <FiCheck /> Basic drawing tools
                      </li>
                      <li>
                        <FiCheck /> 50 fabric presets
                      </li>
                      <li>
                        <FiCheck /> Standard 3D visualization
                      </li>
                      <li>
                        <FiCheck /> 5 exports per month
                      </li>
                      <li className="disabled">
                        <FiX /> Advanced pattern tools
                      </li>
                      <li className="disabled">
                        <FiX /> Custom fabric creation
                      </li>
                    </PricingFeatures>
                    <button className="btn btn-outline">
                      Choose Basic
                    </button>
                  </PricingCard>

                  <PricingCard featured>
                    <PricingBadge>Most Popular</PricingBadge>
                    <PricingHeader>
                      <h3>Professional</h3>
                      <PricingPrice>
                        <span className="currency">$</span>
                        <span className="amount">49</span>
                        <span className="period">/month</span>
                      </PricingPrice>
                    </PricingHeader>
                    <PricingFeatures>
                      <li>
                        <FiCheck /> All drawing tools
                      </li>
                      <li>
                        <FiCheck /> 300 fabric presets
                      </li>
                      <li>
                        <FiCheck /> Advanced 3D visualization
                      </li>
                      <li>
                        <FiCheck /> Unlimited exports
                      </li>
                      <li>
                        <FiCheck /> Basic pattern tools
                      </li>
                      <li>
                        <FiCheck /> Custom fabric creation
                      </li>
                    </PricingFeatures>
                    <button className="btn btn-gold">
                      Choose Professional
                    </button>
                  </PricingCard>

                  <PricingCard>
                    <PricingHeader>
                      <h3>Enterprise</h3>
                      <PricingPrice>
                        <span className="currency">$</span>
                        <span className="amount">99</span>
                        <span className="period">/month</span>
                      </PricingPrice>
                    </PricingHeader>
                    <PricingFeatures>
                      <li>
                        <FiCheck /> All Professional features
                      </li>
                      <li>
                        <FiCheck /> 500+ fabric presets
                      </li>
                      <li>
                        <FiCheck /> Premium 3D visualization
                      </li>
                      <li>
                        <FiCheck /> Team collaboration tools
                      </li>
                      <li>
                        <FiCheck /> Advanced pattern tools
                      </li>
                      <li>
                        <FiCheck /> API access
                      </li>
                    </PricingFeatures>
                    <button className="btn btn-outline">
                      Choose Enterprise
                    </button>
                  </PricingCard>
                </PricingGrid>

                <PricingNote>
                  All plans include a 14-day free trial. No credit card required.
                </PricingNote>
              </PricingTab>
            )}
          </TabContent>
        </div>
      </TabsSection>

      {/* Tool Interface Preview */}
      <InterfaceSection>
        <div className="container">
          <h2>Powerful Yet Intuitive Interface</h2>
          <p>
            Our 3D Fashion Sketch Tool features a user-friendly interface designed specifically for fashion designers.
          </p>

          <InterfacePreview>
            <img src="/placeholder.svg?height=600&width=1000" alt="Sketch Tool Interface" />
            <InterfaceHighlights>
              <InterfaceHighlight style={{ top: '20%', left: '15%' }}>
                <span>1</span>
                <div className="tooltip">
                  <h4>Drawing Tools</h4>
                  <p>Specialized brushes for fashion design</p>
                </div>
              </InterfaceHighlight>
              <InterfaceHighlight style={{ top: '30%', left: '70%' }}>
                <span>2</span>
                <div className="tooltip">
                  <h4>3D Preview</h4>
                  <p>Real-time 3D visualization</p>
                </div>
              </InterfaceHighlight>
              <InterfaceHighlight style={{ top: '60%', left: '40%' }}>
                <span>3</span>
                <div className="tooltip">
                  <h4>Fabric Panel</h4>
                  <p>500+ fabric presets with realistic properties</p>
                </div>
              </InterfaceHighlight>
              <InterfaceHighlight style={{ top: '70%', left: '85%' }}>
                <span>4</span>
                <div className="tooltip">
                  <h4>Export Options</h4>
                  <p>Multiple export formats for production</p>
                </div>
              </InterfaceHighlight>
            </InterfaceHighlights>
          </InterfacePreview>
        </div>
      </InterfaceSection>

      {/* Testimonials */}
      <TestimonialsSection>
        <div className="container">
          <h2>What Designers Say</h2>
          
          <TestimonialsGrid>
            <TestimonialCard>
              <TestimonialContent>
                "This 3D sketch tool has completely transformed my design process. I can now visualize my ideas in 3D before creating physical samples, saving time and resources."
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/placeholder.svg?height=60&width=60" alt="Designer" />
                <div>
                  <h4>Sarah Johnson</h4>
                  <p>Fashion Designer, Paris</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialContent>
                "The fabric simulation is incredibly realistic. I can see exactly how different materials will drape and move, which has improved my design accuracy tremendously."
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/placeholder.svg?height=60&width=60" alt="Designer" />
                <div>
                  <h4>Michael Chen</h4>
                  <p>Creative Director, NYC</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialContent>
                "As a fashion design educator, this tool has been invaluable for teaching students. They can experiment freely without wasting materials and see immediate results."
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/placeholder.svg?height=60&width=60" alt="Designer" />
                <div>
                  <h4>Elena Rodriguez</h4>
                  <p>Fashion Institute Professor</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </div>
      </TestimonialsSection>

      {/* CTA Section */}
      <CTASection>
        <div className="container">
          <CTAContent>
            <h2>Ready to Transform Your Design Process?</h2>
            <p>
              Start creating stunning 3D fashion designs today with our powerful sketch tool.
            </p>
            <ButtonGroup>
              <Link to="/signup" className="btn btn-gold">
                Start Free Trial
              </Link>
              <Link to="/design-tools" className="btn btn-outline">
                Explore Other Tools
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
  background: linear-gradient(to right, rgba(242, 240, 235, 0.9), rgba(227, 223, 214, 0.7));
`;

const HeroSection = styled.section`
  background: linear-gradient(
    to right,
    rgba(4, 5, 7, 0.7),
    rgba(223, 223, 224, 0.5)
  ), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  color: white;
  padding: 8rem 0;
  text-align: center;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.3rem;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  margin-top: ${props => props.mt || '0'};

  @media (max-width: 576px) {
    flex-direction: column;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    svg {
      margin-left: 0.5rem;
    }
  }

  .btn-gold {
    background: var(--gold-primary);
    color: black;
    border: none;

    &:hover {
      background: var(--gold-dark);
    }
  }

  .btn-outline {
    background: transparent;
    color: white;
    border: 1px solid white;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const TabsSection = styled.section`
  padding: 3rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid ${props => props.active ? 'var(--gold-primary)' : 'transparent'};
  color: ${props => props.active ? 'black' : 'rgba(0, 0, 0, 0.6)'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: black;
  }
`;

const TabContent = styled.div`
  min-height: 400px;
`;

const OverviewTab = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: black;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 2rem;
    max-width: 800px;
  }
`;

const ToolPreview = styled.div`
  position: relative;
  margin-bottom: 3rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    display: block;
  }
`;

const ToolOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ToolPreview}:hover & {
    opacity: 1;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.6;
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  svg {
    font-size: 2rem;
    color: var(--gold-primary);
  }
`;

const FeaturesTab = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: black;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 3rem;
    max-width: 800px;
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const FeatureItem = styled.div`
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
      
      > * {
        direction: ltr;
      }
    }
  `}
`;

const FeatureImage = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureInfo = styled.div`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const GalleryTab = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: black;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 2rem;
    max-width: 800px;
  }
`;

const GalleryFilter = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  background: ${props => props.active ? 'var(--gold-primary)' : 'transparent'};
  color: ${props => props.active ? 'black' : 'rgba(0, 0, 0, 0.7)'};
  border: 1px solid ${props => props.active ? 'var(--gold-primary)' : 'rgba(0, 0, 0, 0.1)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--gold-primary);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const GalleryItemContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    
    .gallery-item-overlay {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    display: block;
  }
`;

const GalleryItemOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  class-name: gallery-item-overlay;

  h3 {
    color: white;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1.5rem;
  }
`;

const GalleryItemActions = styled.div`
  display: flex;
  gap: 1rem;

  button {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;

    svg {
      margin-right: 0.5rem;
    }

    &:hover {
      background: var(--gold-primary);
      color: black;
    }
  }
`;

const PricingTab = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: black;
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 3rem;
    max-width: 800px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const PricingCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  border: ${props => props.featured ? '2px solid var(--gold-primary)' : '1px solid rgba(0, 0, 0, 0.05)'};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  .btn {
    width: 100%;
    margin-top: 1.5rem;
  }

  .btn-outline {
    color: black;
    border-color: black;
  }
`;

const PricingBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gold-primary);
  color: black;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const PricingHeader = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: black;
  }
`;

const PricingPrice = styled.div`
  .currency {
    font-size: 1.5rem;
    vertical-align: top;
    position: relative;
    top: 0.5rem;
  }

  .amount {
    font-size: 3.5rem;
    font-weight: 700;
  }

  .period {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  text-align: left;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: rgba(0, 0, 0, 0.7);

    svg {
      margin-right: 0.75rem;
      color: var(--gold-primary);
      flex-shrink: 0;
    }

    &.disabled {
      color: rgba(0, 0, 0, 0.4);

      svg {
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
`;

const PricingNote = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
`;

const InterfaceSection = styled.section`
  padding: 5rem 0;
  background: rgba(0, 0, 0, 0.02);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: black;
  }

  p {
    text-align: center;
    margin-bottom: 3rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const InterfacePreview = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    display: block;
  }
`;

const InterfaceHighlights = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const InterfaceHighlight = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--gold-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;

  .tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 200px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 8px;
      border-style: solid;
      border-color: white transparent transparent transparent;
    }

    h4 {
      margin-bottom: 0.5rem;
      color: black;
    }

    p {
      margin-bottom: 0;
      font-size: 0.9rem;
      text-align: left;
    }
  }

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

const TestimonialsSection = styled.section`
  padding: 5rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
    color: black;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const TestimonialContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 2rem;
  font-style: italic;
  position: relative;

  &::before {
    content: '"';
    font-size: 4rem;
    color: rgba(212, 175, 55, 0.2);
    position: absolute;
    top: -1.5rem;
    left: -0.5rem;
    z-index: 0;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 1rem;
  }

  h4 {
    margin-bottom: 0.25rem;
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.9rem;
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

// Import these icons for the pricing section
const FiCheck = () => <span>✓</span>;
const FiX = () => <span>✗</span>;

export default SketchToolPage;
