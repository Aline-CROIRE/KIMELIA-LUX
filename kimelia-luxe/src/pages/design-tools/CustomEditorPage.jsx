import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowRight, FiEdit } from 'react-icons/fi';

const CustomEditorPage = () => {
  return (
    <PageContainer>
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>Custom Design Editor</h1>
            <p>
              Create your own custom clothing designs with our intuitive editor.
            </p>
          </HeroContent>
        </div>
      </HeroSection>

      <ToolSection>
        <div className="container">
          <ToolGrid>
            <ToolContent>
              <ToolIcon>
                <FiEdit />
              </ToolIcon>
              <h2>Design Your Dream Wardrobe</h2>
              <p>
                Our Custom Design Editor allows you to create personalized clothing designs. 
                Choose fabrics, colors, and styles to bring your fashion vision to life.
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
                <li>
                  <FiArrowRight /> Save and share designs
                </li>
              </FeatureList>
              <ButtonGroup>
                <Link to="/design-tools/custom-editor/demo" className="btn btn-gold">
                  Try Demo
                </Link>
                <Link to="/signup" className="btn btn-outline">
                  Sign Up for Full Access
                </Link>
              </ButtonGroup>
            </ToolContent>
            <ToolImage>
              <img src="/images/custom-editor-detail.jpg" alt="Custom Design Editor" />
            </ToolImage>
          </ToolGrid>
        </div>
      </ToolSection>

      <ProcessSection>
        <div className="container">
          <SectionTitle>
            <h2>Design Process</h2>
            <p>
              From concept to creation, our Custom Design Editor makes it easy to bring your ideas to life.
            </p>
          </SectionTitle>
          <ProcessSteps>
            <ProcessStep>
              <ProcessStepNumber>1</ProcessStepNumber>
              <ProcessStepContent>
                <h3>Choose a Base Design</h3>
                <p>
                  Select from a variety of base designs including dresses, shirts, pants, and more.
                </p>
              </ProcessStepContent>
            </ProcessStep>
            <ProcessStep>
              <ProcessStepNumber>2</ProcessStepNumber>
              <ProcessStepContent>
                <h3>Customize Elements</h3>
                <p>
                  Modify necklines, sleeves, lengths, and other design elements to match your vision.
                </p>
              </ProcessStepContent>
            </ProcessStep>
            <ProcessStep>
              <ProcessStepNumber>3</ProcessStepNumber>
              <ProcessStepContent>
                <h3>Select Fabrics & Colors</h3>
                <p>
                  Choose from our extensive library of fabrics and colors, or upload your own patterns.
                </p>
              </ProcessStepContent>
            </ProcessStep>
            <ProcessStep>
              <ProcessStepNumber>4</ProcessStepNumber>
              <ProcessStepContent>
                <h3>Add Details & Embellishments</h3>
                <p>
                  Enhance your design with buttons, zippers, embroidery, and other decorative elements.
                </p>
              </ProcessStepContent>
            </ProcessStep>
            <ProcessStep>
              <ProcessStepNumber>5</ProcessStepNumber>
              <ProcessStepContent>
                <h3>Preview in 3D</h3>
                <p>
                  See your design come to life in 3D and make adjustments as needed.
                </p>
              </ProcessStepContent>
            </ProcessStep>
            <ProcessStep>
              <ProcessStepNumber>6</ProcessStepNumber>
              <ProcessStepContent>
                <h3>Order Your Creation</h3>
                <p>
                  Submit your design for production by our network of skilled tailors and designers.
                </p>
              </ProcessStepContent>
            </ProcessStep>
          </ProcessSteps>
        </div>
      </ProcessSection>

      <GallerySection>
        <div className="container">
          <SectionTitle>
            <h2>Design Gallery</h2>
            <p>
              Get inspired by custom designs created by our community of fashion enthusiasts.
            </p>
          </SectionTitle>
          <GalleryGrid>
            <GalleryItem>
              <img src="/images/gallery/design1.jpg" alt="Custom Design" />
              <GalleryItemOverlay>
                <h4>Evening Gown</h4>
                <p>By Maria S.</p>
              </GalleryItemOverlay>
            </GalleryItem>
            <GalleryItem>
              <img src="/images/gallery/design2.jpg" alt="Custom Design" />
              <GalleryItemOverlay>
                <h4>Summer Dress</h4>
                <p>By James T.</p>
              </GalleryItemOverlay>
            </GalleryItem>
            <GalleryItem>
              <img src="/images/gallery/design3.jpg" alt="Custom Design" />
              <GalleryItemOverlay>
                <h4>Business Suit</h4>
                <p>By Priya K.</p>
              </GalleryItemOverlay>
            </GalleryItem>
            <GalleryItem>
              <img src="/images/gallery/design4.jpg" alt="Custom Design" />
              <GalleryItemOverlay>
                <h4>Casual Jacket</h4>
                <p>By David L.</p>
              </GalleryItemOverlay>
            </GalleryItem>
            <GalleryItem>
              <img src="/images/gallery/design5.jpg" alt="Custom Design" />
              <GalleryItemOverlay>
                <h4>Wedding Dress</h4>
                <p>By Sophie M.</p>
              </GalleryItemOverlay>
            </GalleryItem>
            <GalleryItem>
              <img src="/images/gallery/design6.jpg" alt="Custom Design" />
              <GalleryItemOverlay>
                <h4>Traditional Outfit</h4>
                <p>By Ahmed R.</p>
              </GalleryItemOverlay>
            </GalleryItem>
          </GalleryGrid>
          <ViewMoreButton>
            <Link to="/design-tools/custom-editor/gallery" className="btn btn-outline">
              View More Designs <FiArrowRight />
            </Link>
          </ViewMoreButton>
        </div>
      </GallerySection>

      <CTASection>
        <div className="container">
          <CTAContent>
            <h2>Create Your Unique Fashion Statement</h2>
            <p>
              Sign up today and start designing clothing that reflects your personal style.
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
  background: linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.7)), url('/images/custom-editor-hero.jpg');
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

const ProcessSection = styled.section`
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

const ProcessSteps = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ProcessStep = styled.div`
  display: flex;
  margin-bottom: 2rem;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 40px;
    left: 20px;
    width: 2px;
    height: calc(100% - 20px);
    background-color: rgba(212, 175, 55, 0.3);
  }
`;

const ProcessStepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  margin-right: 1.5rem;
  flex-shrink: 0;
  z-index: 1;
`;

const ProcessStepContent = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const GallerySection = styled.section`
  padding: 5rem 0;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 3/4;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const GalleryItemOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    opacity: 0.8;
  }
`;

const ViewMoreButton = styled.div`
  text-align: center;
  margin-top: 3rem;

  .btn {
    display: inline-flex;
    align-items: center;
    
    svg {
      margin-left: 0.5rem;
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

  .btn-outline {
    border-color: white;
    color: white;
  }

  .btn-outline:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default CustomEditorPage;