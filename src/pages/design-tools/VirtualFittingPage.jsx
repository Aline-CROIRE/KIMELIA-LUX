import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiUpload, FiCamera, FiRotateCw, FiCheck, FiArrowRight, FiInfo } from 'react-icons/fi';
import backgroundImage from '../../assets/images/virtual.webp';

const VirtualFittingPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [uploadMethod, setUploadMethod] = useState('photo');
  const [selectedGarment, setSelectedGarment] = useState(null);

  const handleNextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const handleGarmentSelect = (id) => {
    setSelectedGarment(id);
  };

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>Virtual Fitting Room</h1>
            <p>
              Try on clothes virtually before you buy. Our advanced technology creates a realistic
              representation of how garments will look on your body.
            </p>
          </HeroContent>
        </div>
      </HeroSection>

      {/* Main Content */}
      <MainSection>
        <div className="container">
          <StepIndicator>
            <Step active={activeStep >= 1} completed={activeStep > 1}>
              <StepNumber>
                {activeStep > 1 ? <FiCheck /> : 1}
              </StepNumber>
              <StepLabel>Upload</StepLabel>
            </Step>
            <StepConnector completed={activeStep > 1} />
            <Step active={activeStep >= 2} completed={activeStep > 2}>
              <StepNumber>
                {activeStep > 2 ? <FiCheck /> : 2}
              </StepNumber>
              <StepLabel>Select Garments</StepLabel>
            </Step>
            <StepConnector completed={activeStep > 2} />
            <Step active={activeStep >= 3}>
              <StepNumber>3</StepNumber>
              <StepLabel>Try On</StepLabel>
            </Step>
          </StepIndicator>

          <StepContent>
            {activeStep === 1 && (
              <UploadStep>
                <h2>Upload Your Photo</h2>
                <p>
                  To get started, we need a photo of you. You can upload an existing photo or take a new one.
                </p>

                <UploadOptions>
                  <UploadOption 
                    active={uploadMethod === 'photo'} 
                    onClick={() => setUploadMethod('photo')}
                  >
                    <FiUpload />
                    <h3>Upload Photo</h3>
                    <p>Upload an existing photo from your device</p>
                  </UploadOption>
                  <UploadOption 
                    active={uploadMethod === 'camera'} 
                    onClick={() => setUploadMethod('camera')}
                  >
                    <FiCamera />
                    <h3>Take Photo</h3>
                    <p>Use your camera to take a new photo</p>
                  </UploadOption>
                </UploadOptions>

                {uploadMethod === 'photo' && (
                  <UploadArea>
                    <FiUpload />
                    <p>Drag and drop your photo here or</p>
                    <button className="btn btn-gold">Browse Files</button>
                    <small>Supported formats: JPG, PNG. Max size: 10MB</small>
                  </UploadArea>
                )}

                {uploadMethod === 'camera' && (
                  <CameraArea>
                    <div className="camera-placeholder">
                      <FiCamera />
                      <p>Camera preview will appear here</p>
                    </div>
                    <button className="btn btn-gold">Take Photo</button>
                  </CameraArea>
                )}

                <UploadTips>
                  <h3>Tips for best results:</h3>
                  <ul>
                    <li>Stand straight with arms slightly away from your body</li>
                    <li>Wear fitted clothing to get accurate measurements</li>
                    <li>Use a plain background if possible</li>
                    <li>Ensure good lighting for clear visibility</li>
                  </ul>
                </UploadTips>

                <ButtonGroup>
                  <button className="btn btn-gold" onClick={handleNextStep}>
                    Continue <FiArrowRight />
                  </button>
                </ButtonGroup>
              </UploadStep>
            )}

            {activeStep === 2 && (
              <SelectGarmentsStep>
                <h2>Select Garments to Try On</h2>
                <p>
                  Choose from our collection of garments to virtually try on.
                </p>

                <GarmentCategories>
                  <GarmentCategory active>All</GarmentCategory>
                  <GarmentCategory>Dresses</GarmentCategory>
                  <GarmentCategory>Tops</GarmentCategory>
                  <GarmentCategory>Bottoms</GarmentCategory>
                  <GarmentCategory>Outerwear</GarmentCategory>
                </GarmentCategories>

                <GarmentGrid>
                  {garments.map(garment => (
                    <GarmentCard 
                      key={garment.id} 
                      selected={selectedGarment === garment.id}
                      onClick={() => handleGarmentSelect(garment.id)}
                    >
                      <GarmentImage>
                        <img src={garment.image || "/placeholder.svg"} alt={garment.name} />
                        {selectedGarment === garment.id && (
                          <SelectedBadge>
                            <FiCheck />
                          </SelectedBadge>
                        )}
                      </GarmentImage>
                      <GarmentInfo>
                        <h3>{garment.name}</h3>
                        <p>{garment.price} RWF</p>
                      </GarmentInfo>
                    </GarmentCard>
                  ))}
                </GarmentGrid>

                <ButtonGroup>
                  <button className="btn btn-outline" onClick={handlePrevStep}>
                    Back
                  </button>
                  <button 
                    className="btn btn-gold" 
                    onClick={handleNextStep}
                    disabled={!selectedGarment}
                  >
                    Try On <FiArrowRight />
                  </button>
                </ButtonGroup>
              </SelectGarmentsStep>
            )}

            {activeStep === 3 && (
              <TryOnStep>
                <h2>Virtual Try-On</h2>
                <p>
                  Here's how the selected garment looks on you. You can rotate the view and try different sizes.
                </p>

                <TryOnContainer>
                  <TryOnViewer>
                    <div className="try-on-image">
                      <img src="/placeholder.svg?height=500&width=350" alt="Virtual try-on" />
                    </div>
                    <TryOnControls>
                      <button>
                        <FiRotateCw /> Rotate View
                      </button>
                    </TryOnControls>
                  </TryOnViewer>

                  <TryOnOptions>
                    <TryOnInfo>
                      <h3>Elegant Silk Evening Dress</h3>
                      <p className="price">199.99 RWF</p>
                      <p className="description">
                        This stunning silk evening dress features a flattering A-line silhouette with delicate embroidery details.
                      </p>

                      <div className="size-selector">
                        <h4>Size</h4>
                        <div className="sizes">
                          <SizeOption>XS</SizeOption>
                          <SizeOption active>S</SizeOption>
                          <SizeOption>M</SizeOption>
                          <SizeOption>L</SizeOption>
                          <SizeOption>XL</SizeOption>
                        </div>
                      </div>

                      <div className="color-selector">
                        <h4>Color</h4>
                        <div className="colors">
                          <ColorOption color="#000" active />
                          <ColorOption color="#000080" />
                          <ColorOption color="#800020" />
                          <ColorOption color="#50C878" />
                        </div>
                      </div>

                      <FitAnalysis>
                        <h4>Fit Analysis <FiInfo /></h4>
                        <FitBar>
                          <FitIndicator position={70} />
                        </FitBar>
                        <FitLabels>
                          <span>Too Tight</span>
                          <span>Perfect Fit</span>
                          <span>Too Loose</span>
                        </FitLabels>
                        <FitMessage>
                          This size fits you well in the shoulders and waist, but might be slightly tight in the hips.
                        </FitMessage>
                      </FitAnalysis>

                      <ButtonGroup>
                        <button className="btn btn-gold">
                          Add to Cart
                        </button>
                        <button className="btn btn-outline">
                          Save Design
                        </button>
                      </ButtonGroup>
                    </TryOnInfo>
                  </TryOnOptions>
                </TryOnContainer>

                <ButtonGroup>
                  <button className="btn btn-outline" onClick={handlePrevStep}>
                    Back
                  </button>
                  <Link to="/design-tools" className="btn btn-outline">
                    Try Another Tool
                  </Link>
                </ButtonGroup>
              </TryOnStep>
            )}
          </StepContent>
        </div>
      </MainSection>

      {/* Features Section */}
      <FeaturesSection>
        <div className="container">
          <h2>Key Features of Our Virtual Fitting Room</h2>
          
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <FiCamera />
              </FeatureIcon>
              <h3>Accurate Body Measurements</h3>
              <p>
                Our AI technology takes precise measurements from your photo to ensure accurate fitting.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <FiRotateCw />
              </FeatureIcon>
              <h3>360° Visualization</h3>
              <p>
                View garments from all angles to get a complete understanding of the fit and style.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <FiCheck />
              </FeatureIcon>
              <h3>Size Recommendations</h3>
              <p>
                Get personalized size recommendations based on your measurements and fit preferences.
              </p>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      {/* CTA Section */}
      <CTASection>
        <div className="container">
          <CTAContent>
            <h2>Ready to Revolutionize Your Shopping Experience?</h2>
            <p>
              Create an account to save your measurements and virtual try-ons for future shopping.
            </p>
            <ButtonGroup>
              <Link to="/signup" className="btn btn-gold">
                Create Free Account
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

// Mock data
const garments = [
  {
    id: 1,
    name: 'Elegant Silk Evening Dress',
    price: 199.99,
    image: '/placeholder.svg?height=300&width=200'
  },
  {
    id: 2,
    name: 'Casual Cotton Blouse',
    price: 59.99,
    image: '/placeholder.svg?height=300&width=200'
  },
  {
    id: 3,
    name: 'Tailored Wool Blazer',
    price: 149.99,
    image: '/placeholder.svg?height=300&width=200'
  },
  {
    id: 4,
    name: 'Floral Summer Dress',
    price: 89.99,
    image: '/placeholder.svg?height=300&width=200'
  },
  {
    id: 5,
    name: 'Classic Denim Jeans',
    price: 79.99,
    image: '/placeholder.svg?height=300&width=200'
  },
  {
    id: 6,
    name: 'Leather Moto Jacket',
    price: 249.99,
    image: '/placeholder.svg?height=300&width=200'
  }
];

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
  }
`;

const MainSection = styled.section`
  padding: 5rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  ${props => props.active && `
    .step-number {
      background-color: var(--gold-primary);
      color: black;
    }
  `}

  ${props => props.completed && `
    .step-number {
      background-color: var(--gold-primary);
      color: black;
    }
  `}
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--gold-primary)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${props => props.active ? 'black' : 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
`;

const StepLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
`;

const StepConnector = styled.div`
  width: 100px;
  height: 2px;
  background-color: ${props => props.completed ? 'var(--gold-primary)' : 'rgba(0, 0, 0, 0.1)'};
  margin: 0 1rem;

  @media (max-width: 768px) {
    width: 50px;
  }
`;

const StepContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const UploadStep = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 2rem;
    max-width: 700px;
  }
`;

const UploadOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const UploadOption = styled.div`
  padding: 2rem;
  border-radius: 8px;
  border: 2px solid ${props => props.active ? 'var(--gold-primary)' : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => props.active ? 'rgba(212, 175, 55, 0.05)' : 'white'};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--gold-primary);
  }

  svg {
    font-size: 2rem;
    color: var(--gold-primary);
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0;
    font-size: 0.9rem;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--gold-primary);
  }

  svg {
    font-size: 3rem;
    color: rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  small {
    display: block;
    margin-top: 1rem;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const CameraArea = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  .camera-placeholder {
    width: 100%;
    height: 400px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;

    svg {
      font-size: 3rem;
      color: rgba(0, 0, 0, 0.2);
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 0;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

const UploadTips = styled.div`
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: black;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

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

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .btn-outline {
    background: transparent;
    color: black;
    border: 1px solid black;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const SelectGarmentsStep = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 2rem;
    max-width: 700px;
  }
`;

const GarmentCategories = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const GarmentCategory = styled.div`
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

const GarmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const GarmentCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.selected ? 'var(--gold-primary)' : 'transparent'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const GarmentImage = styled.div`
  position: relative;
  height: 250px;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SelectedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--gold-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

const GarmentInfo = styled.div`
  padding: 1rem;
  background: white;

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: black;
  }

  p {
    color: var(--gold-primary);
    font-weight: 600;
    margin-bottom: 0;
  }
`;

const TryOnStep = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 2rem;
    max-width: 700px;
  }
`;

const TryOnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TryOnViewer = styled.div`
  .try-on-image {
    width: 100%;
    height: 500px;
    background: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const TryOnControls = styled.div`
  display: flex;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.05);
    border: none;
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    transition: all 0.3s ease;

    svg {
      margin-right: 0.5rem;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const TryOnOptions = styled.div``;

const TryOnInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: black;
  }

  .price {
    font-size: 1.2rem;
    color: var(--gold-primary);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .description {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: black;
  }

  .size-selector, .color-selector {
    margin-bottom: 1.5rem;
  }

  .sizes {
    display: flex;
    gap: 0.5rem;
  }

  .colors {
    display: flex;
    gap: 0.5rem;
  }
`;

const SizeOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${props => props.active ? 'var(--gold-primary)' : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => props.active ? 'var(--gold-primary)' : 'transparent'};
  color: ${props => props.active ? 'black' : 'rgba(0, 0, 0, 0.7)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--gold-primary);
  }
`;

const ColorOption = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.active ? 'var(--gold-primary)' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const FitAnalysis = styled.div`
  margin-bottom: 2rem;

  h4 {
    display: flex;
    align-items: center;

    svg {
      margin-left: 0.5rem;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

const FitBar = styled.div`
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  margin-bottom: 0.5rem;
`;

const FitIndicator = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--gold-primary);
  border-radius: 50%;
  top: 50%;
  left: ${props => props.position}%;
  transform: translate(-50%, -50%);
`;

const FitLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
`;

const FitMessage = styled.div`
  padding: 1rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 4px;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background: rgba(0, 0, 0, 0.02);

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

export default VirtualFittingPage;