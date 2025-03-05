// src/pages/design-tools/VirtualFittingPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUpload, FiCheck, FiInfo } from 'react-icons/fi';
import Button from '../../components/common/Button';

const PageContainer = styled.div`
  padding-top: 80px; // For navbar
`;

const HeroSection = styled.section`
  background: ${props => props.theme.gradients.darkGradient};
  color: ${props => props.theme.colors.white};
  padding: 5rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  opacity: 0.9;
`;

const ContentSection = styled.section`
  padding: 5rem 2rem;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const UploadSection = styled.div``;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const SectionDescription = styled.p`
  color: ${props => props.theme.colors.gray.dark};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const UploadContainer = styled.div`
  border: 2px dashed ${props => props.theme.colors.gray.main};
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  transition: border-color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: ${props => props.theme.colors.gold.main};
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.gray.main};
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  margin-bottom: 1rem;
`;

const UploadInput = styled.input`
  display: none;
`;

const PreviewSection = styled.div``;

const PreviewContainer = styled.div`
  background: ${props => props.theme.colors.gray.light};
  border-radius: 8px;
  overflow: hidden;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PreviewPlaceholder = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.gray.dark};
  padding: 2rem;
`;

const ClothingOptions = styled.div`
  margin-top: 2rem;
`;

const ClothingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const ClothingItem = styled.div`
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &.selected {
    border-color: ${props => props.theme.colors.gold.main};
  }
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  background: ${props => props.theme.colors.gold.light}30;
  border-left: 4px solid ${props => props.theme.colors.gold.main};
  padding: 1.5rem;
  border-radius: 0 8px 8px 0;
  margin-top: 2rem;
  display: flex;
  align-items: flex-start;
  
  svg {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.gold.main};
    margin-right: 1rem;
    flex-shrink: 0;
  }
`;

const InfoText = styled.div`
  p {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
`;

// Mock clothing items
const clothingItems = [
  { id: 1, image: '/images/clothing-1.jpg', name: 'Elegant Evening Gown' },
  { id: 2, image: '/images/clothing-2.jpg', name: 'Business Suit' },
  { id: 3, image: '/images/clothing-3.jpg', name: 'Casual Dress' },
  { id: 4, image: '/images/clothing-4.jpg', name: 'Summer Blouse' },
  { id: 5, image: '/images/clothing-5.jpg', name: 'Winter Coat' },
  { id: 6, image: '/images/clothing-6.jpg', name: 'Denim Jeans' },
];

const VirtualFittingPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedClothing, setSelectedClothing] = useState(null);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleClothingSelect = (item) => {
    setSelectedClothing(item);
  };
  
  return (
    <PageContainer>
      <HeroSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeroTitle className="gold-gradient-text">Virtual Fitting Room</HeroTitle>
          <HeroDescription>
            Upload your photo and virtually try on clothes. Our AI ensures accurate sizing and fit.
          </HeroDescription>
        </motion.div>
      </HeroSection>
      
      <ContentSection>
        <ContentContainer>
          <UploadSection>
            <SectionTitle>Upload Your Photo</SectionTitle>
            <SectionDescription>
              Upload a full-body photo of yourself to try on different clothing items. 
              For best results, use a photo with a neutral background where you're standing straight.
            </SectionDescription>
            
            <label htmlFor="photo-upload">
              <UploadContainer>
                <UploadIcon>
                  <FiUpload />
                </UploadIcon>
                <UploadText>Drag and drop your photo here or click to browse</UploadText>
                <Button variant="outline">Select Photo</Button>
                <UploadInput 
                  type="file" 
                  id="photo-upload" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
              </UploadContainer>
            </label>
            
            <InfoBox>
              <FiInfo />
              <InfoText>
                <p>Your privacy is important to us. All uploaded photos are processed securely and are not stored permanently on our servers.</p>
                <p>The AI model will analyze your body measurements to provide accurate virtual fitting.</p>
              </InfoText>
            </InfoBox>
          </UploadSection>
          
          <PreviewSection>
            <SectionTitle>Preview</SectionTitle>
            <SectionDescription>
              See how the selected clothing items look on you in real-time.
            </SectionDescription>
            
            <PreviewContainer>
              {uploadedImage ? (
                <PreviewImage src={uploadedImage} alt="Your uploaded photo" />
              ) : (
                <PreviewPlaceholder>
                  <p>Your virtual fitting preview will appear here</p>
                  <p>Upload a photo to get started</p>
                </PreviewPlaceholder>
              )}
            </PreviewContainer>
            
            <ClothingOptions>
              <SectionTitle>Select Clothing</SectionTitle>
              <ClothingGrid>
                {clothingItems.map((item) => (
                  <ClothingItem 
                    key={item.id} 
                    className={selectedClothing?.id === item.id ? 'selected' : ''}
                    onClick={() => handleClothingSelect(item)}
                  >
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </ClothingItem>
                ))}
              </ClothingGrid>
            </ClothingOptions>
          </PreviewSection>
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
};

export default VirtualFittingPage;