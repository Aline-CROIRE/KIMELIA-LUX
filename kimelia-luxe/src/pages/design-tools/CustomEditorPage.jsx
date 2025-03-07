// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { FiArrowRight, FiEdit } from 'react-icons/fi';

// const CustomEditorPage = () => {
//   return (
//     <PageContainer>
//       <HeroSection>
//         <div className="container">
//           <HeroContent>
//             <h1>Custom Design Editor</h1>
//             <p>
//               Create your own custom clothing designs with our intuitive editor.
//             </p>
//           </HeroContent>
//         </div>
//       </HeroSection>

//       <ToolSection>
//         <div className="container">
//           <ToolGrid>
//             <ToolContent>
//               <ToolIcon>
//                 <FiEdit />
//               </ToolIcon>
//               <h2>Design Your Dream Wardrobe</h2>
//               <p>
//                 Our Custom Design Editor allows you to create personalized clothing designs. 
//                 Choose fabrics, colors, and styles to bring your fashion vision to life.
//               </p>
//               <FeatureList>
//                 <li>
//                   <FiArrowRight /> Extensive fabric library
//                 </li>
//                 <li>
//                   <FiArrowRight /> Customizable elements
//                 </li>
//                 <li>
//                   <FiArrowRight /> Direct to production
//                 </li>
//                 <li>
//                   <FiArrowRight /> Save and share designs
//                 </li>
//               </FeatureList>
//               <ButtonGroup>
//                 <Link to="/design-tools/custom-editor/demo" className="btn btn-gold">
//                   Try Demo
//                 </Link>
//                 <Link to="/signup" className="btn btn-outline">
//                   Sign Up for Full Access
//                 </Link>
//               </ButtonGroup>
//             </ToolContent>
//             <ToolImage>
//               <img src="/images/custom-editor-detail.jpg" alt="Custom Design Editor" />
//             </ToolImage>
//           </ToolGrid>
//         </div>
//       </ToolSection>

//       <ProcessSection>
//         <div className="container">
//           <SectionTitle>
//             <h2>Design Process</h2>
//             <p>
//               From concept to creation, our Custom Design Editor makes it easy to bring your ideas to life.
//             </p>
//           </SectionTitle>
//           <ProcessSteps>
//             <ProcessStep>
//               <ProcessStepNumber>1</ProcessStepNumber>
//               <ProcessStepContent>
//                 <h3>Choose a Base Design</h3>
//                 <p>
//                   Select from a variety of base designs including dresses, shirts, pants, and more.
//                 </p>
//               </ProcessStepContent>
//             </ProcessStep>
//             <ProcessStep>
//               <ProcessStepNumber>2</ProcessStepNumber>
//               <ProcessStepContent>
//                 <h3>Customize Elements</h3>
//                 <p>
//                   Modify necklines, sleeves, lengths, and other design elements to match your vision.
//                 </p>
//               </ProcessStepContent>
//             </ProcessStep>
//             <ProcessStep>
//               <ProcessStepNumber>3</ProcessStepNumber>
//               <ProcessStepContent>
//                 <h3>Select Fabrics & Colors</h3>
//                 <p>
//                   Choose from our extensive library of fabrics and colors, or upload your own patterns.
//                 </p>
//               </ProcessStepContent>
//             </ProcessStep>
//             <ProcessStep>
//               <ProcessStepNumber>4</ProcessStepNumber>
//               <ProcessStepContent>
//                 <h3>Add Details & Embellishments</h3>
//                 <p>
//                   Enhance your design with buttons, zippers, embroidery, and other decorative elements.
//                 </p>
//               </ProcessStepContent>
//             </ProcessStep>
//             <ProcessStep>
//               <ProcessStepNumber>5</ProcessStepNumber>
//               <ProcessStepContent>
//                 <h3>Preview in 3D</h3>
//                 <p>
//                   See your design come to life in 3D and make adjustments as needed.
//                 </p>
//               </ProcessStepContent>
//             </ProcessStep>
//             <ProcessStep>
//               <ProcessStepNumber>6</ProcessStepNumber>
//               <ProcessStepContent>
//                 <h3>Order Your Creation</h3>
//                 <p>
//                   Submit your design for production by our network of skilled tailors and designers.
//                 </p>
//               </ProcessStepContent>
//             </ProcessStep>
//           </ProcessSteps>
//         </div>
//       </ProcessSection>

//       <GallerySection>
//         <div className="container">
//           <SectionTitle>
//             <h2>Design Gallery</h2>
//             <p>
//               Get inspired by custom designs created by our community of fashion enthusiasts.
//             </p>
//           </SectionTitle>
//           <GalleryGrid>
//             <GalleryItem>
//               <img src="/images/gallery/design1.jpg" alt="Custom Design" />
//               <GalleryItemOverlay>
//                 <h4>Evening Gown</h4>
//                 <p>By Maria S.</p>
//               </GalleryItemOverlay>
//             </GalleryItem>
//             <GalleryItem>
//               <img src="/images/gallery/design2.jpg" alt="Custom Design" />
//               <GalleryItemOverlay>
//                 <h4>Summer Dress</h4>
//                 <p>By James T.</p>
//               </GalleryItemOverlay>
//             </GalleryItem>
//             <GalleryItem>
//               <img src="/images/gallery/design3.jpg" alt="Custom Design" />
//               <GalleryItemOverlay>
//                 <h4>Business Suit</h4>
//                 <p>By Priya K.</p>
//               </GalleryItemOverlay>
//             </GalleryItem>
//             <GalleryItem>
//               <img src="/images/gallery/design4.jpg" alt="Custom Design" />
//               <GalleryItemOverlay>
//                 <h4>Casual Jacket</h4>
//                 <p>By David L.</p>
//               </GalleryItemOverlay>
//             </GalleryItem>
//             <GalleryItem>
//               <img src="/images/gallery/design5.jpg" alt="Custom Design" />
//               <GalleryItemOverlay>
//                 <h4>Wedding Dress</h4>
//                 <p>By Sophie M.</p>
//               </GalleryItemOverlay>
//             </GalleryItem>
//             <GalleryItem>
//               <img src="/images/gallery/design6.jpg" alt="Custom Design" />
//               <GalleryItemOverlay>
//                 <h4>Traditional Outfit</h4>
//                 <p>By Ahmed R.</p>
//               </GalleryItemOverlay>
//             </GalleryItem>
//           </GalleryGrid>
//           <ViewMoreButton>
//             <Link to="/design-tools/custom-editor/gallery" className="btn btn-outline">
//               View More Designs <FiArrowRight />
//             </Link>
//           </ViewMoreButton>
//         </div>
//       </GallerySection>

//       <CTASection>
//         <div className="container">
//           <CTAContent>
//             <h2>Create Your Unique Fashion Statement</h2>
//             <p>
//               Sign up today and start designing clothing that reflects your personal style.
//             </p>
//             <ButtonGroup>
//               <Link to="/signup" className="btn btn-gold">
//                 Create Free Account
//               </Link>
//               <Link to="/pricing" className="btn btn-outline">
//                 View Pricing
//               </Link>
//             </ButtonGroup>
//           </CTAContent>
//         </div>
//       </CTASection>
//     </PageContainer>
//   );
// };

// // Styled Components
// const PageContainer = styled.div`
//   width: 100%;
// `;

// const HeroSection = styled.section`
//   background: linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.7)), url('/images/custom-editor-hero.jpg');
//   background-size: cover;
//   background-position: center;
//   color: white;
//   padding: 6rem 0;
//   text-align: center;
// `;

// const HeroContent = styled.div`
//   max-width: 800px;
//   margin: 0 auto;

//   h1 {
//     font-size: 3.5rem;
//     margin-bottom: 1.5rem;
//     background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   p {
//     font-size: 1.2rem;
//     line-height: 1.6;
//   }
// `;

// const ToolSection = styled.section`
//   padding: 5rem 0;
// `;

// const ToolGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 4rem;
//   align-items: center;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const ToolContent = styled.div`
//   h2 {
//     font-size: 2.5rem;
//     margin-bottom: 1.5rem;
//   }

//   p {
//     color: var(--text-secondary);
//     margin-bottom: 1.5rem;
//     line-height: 1.6;
//   }
// `;

// const ToolIcon = styled.div`
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   background-color: rgba(212, 175, 55, 0.1);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 1.5rem;
  
//   svg {
//     color: var(--gold-primary);
//     font-size: 1.8rem;
//   }
// `;

// const FeatureList = styled.ul`
//   list-style: none;
//   margin-bottom: 2rem;

//   li {
//     display: flex;
//     align-items: center;
//     margin-bottom: 0.75rem;
    
//     svg {
//       color: var(--gold-primary);
//       margin-right: 0.75rem;
//       flex-shrink: 0;
//     }
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   flex-wrap: wrap;

//   a {
//     margin-right: 1rem;
//     margin-bottom: 1rem;
//   }
// `;

// const ToolImage = styled.div`
//   img {
//     width: 100%;
//     border-radius: 8px;
//     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   }
// `;

// const ProcessSection = styled.section`
//   padding: 5rem 0;
//   background-color: #f9f9f9;
// `;

// const SectionTitle = styled.div`
//   text-align: center;
//   margin-bottom: 3rem;

//   h2 {
//     font-size: 2.5rem;
//     margin-bottom: 1rem;
//   }

//   p {
//     max-width: 600px;
//     margin: 0 auto;
//     color: var(--text-secondary);
//   }
// `;

// const ProcessSteps = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
// `;

// const ProcessStep = styled.div`
//   display: flex;
//   margin-bottom: 2rem;
//   position: relative;

//   &:not(:last-child)::after {
//     content: '';
//     position: absolute;
//     top: 40px;
//     left: 20px;
//     width: 2px;
//     height: calc(100% - 20px);
//     background-color: rgba(212, 175, 55, 0.3);
//   }
// `;

// const ProcessStepNumber = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   font-weight: 700;
//   margin-right: 1.5rem;
//   flex-shrink: 0;
//   z-index: 1;
// `;

// const ProcessStepContent = styled.div`
//   h3 {
//     font-size: 1.5rem;
//     margin-bottom: 0.5rem;
//   }

//   p {
//     color: var(--text-secondary);
//     line-height: 1.6;
//   }
// `;

// const GallerySection = styled.section`
//   padding: 5rem 0;
// `;

// const GalleryGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 1.5rem;
// `;

// const GalleryItem = styled.div`
//   position: relative;
//   border-radius: 8px;
//   overflow: hidden;
//   aspect-ratio: 3/4;
  
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.3s ease;
//   }

//   &:hover img {
//     transform: scale(1.05);
//   }
// `;

// const GalleryItemOverlay = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   padding: 1.5rem;
//   background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
//   color: white;

//   h4 {
//     font-size: 1.2rem;
//     margin-bottom: 0.25rem;
//   }

//   p {
//     font-size: 0.875rem;
//     opacity: 0.8;
//   }
// `;

// const ViewMoreButton = styled.div`
//   text-align: center;
//   margin-top: 3rem;

//   .btn {
//     display: inline-flex;
//     align-items: center;
    
//     svg {
//       margin-left: 0.5rem;
//     }
//   }
// `;

// const CTASection = styled.section`
//   padding: 5rem 0;
//   background: linear-gradient(to right, var(--luxury-black), #1a1a1a);
//   color: white;
// `;

// const CTAContent = styled.div`
//   text-align: center;
//   max-width: 800px;
//   margin: 0 auto;

//   h2 {
//     font-size: 2.5rem;
//     margin-bottom: 1.5rem;
//     background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   p {
//     margin-bottom: 2rem;
//     font-size: 1.2rem;
//     opacity: 0.9;
//   }

//   .btn-outline {
//     border-color: white;
//     color: white;
//   }

//   .btn-outline:hover {
//     background-color: rgba(255, 255, 255, 0.1);
//   }
// `;

// export default CustomEditorPage;


"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import {
  FiEdit,
  FiLayers,
  FiGrid,
  FiDroplet,
  FiType,
  FiImage,
  FiSave,
  FiShare2,
  FiDownload,
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiRotateCw,
  FiMaximize,
  FiEye,
  FiChevronUp,
  FiChevronDown,
  FiRefreshCw,
} from "react-icons/fi"
import Button from "../../components/common/Button"

const PageWrapper = styled.div`
  background: #f5f5f5;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`

const EditorHeader = styled.header`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
  text-decoration: none;
`

const HeaderTitle = styled.h1`
  font-size: 1.2rem;
  margin: 0;
  color: black;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: white;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    border-color: black;
  }

  svg {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
    padding: 0.5rem;
  }
`

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  height: calc(100vh - 64px);

  @media (max-width: 1200px) {
    grid-template-columns: 250px 1fr 250px;
  }

  @media (max-width: 992px) {
    grid-template-columns: 200px 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const LeftPanel = styled.div`
  background: white;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: 100%;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: fixed;
    top: 64px;
    left: 0;
    width: 250px;
    z-index: 90;
    height: calc(100vh - 64px);
  }
`

const RightPanel = styled.div`
  background: white;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: 100%;

  @media (max-width: 992px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: fixed;
    top: 64px;
    right: 0;
    width: 250px;
    z-index: 90;
    height: calc(100vh - 64px);
  }
`

const CanvasArea = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`

const CanvasContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const Canvas = styled.div`
  width: 500px;
  height: 600px;
  background: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  @media (max-width: 576px) {
    width: 100%;
    height: 450px;
  }
`

const CanvasImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const CanvasControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`

const CanvasControlButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

const PanelSection = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const PanelTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: black;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #D4AF37;
  }
`

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`

const TemplateItem = styled.div`
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? "#D4AF37" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
  }
`

const ColorPalette = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ColorSwatch = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? "black" : "transparent")};
  transition: transform 0.3s ease, border 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`

const MaterialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`

const MaterialItem = styled.div`
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? "#D4AF37" : "transparent")};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 80px;
    object-fit: cover;
  }

  .material-name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.25rem;
    font-size: 0.8rem;
    text-align: center;
  }
`

const ElementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ElementItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 4px;
  background: ${(props) => (props.selected ? "rgba(212, 175, 55, 0.1)" : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

const ElementName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`

const ElementActions = styled.div`
  display: flex;
  gap: 0.25rem;
`

const ElementActionButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 0.9rem;
  }
`

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  svg {
    color: #D4AF37;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: white;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`

const PropertiesForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FormLabel = styled.label`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
`

const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const FormSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const RangeInput = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #D4AF37;
    cursor: pointer;
  }
`

const RangeValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
`

const PreviewButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`

// Mock data
const templates = [
  { id: 1, name: "T-Shirt", image: "/placeholder.svg?height=100&width=120" },
  { id: 2, name: "Hoodie", image: "/placeholder.svg?height=100&width=120" },
  { id: 3, name: "Dress", image: "/placeholder.svg?height=100&width=120" },
  { id: 4, name: "Pants", image: "/placeholder.svg?height=100&width=120" },
]

const colors = [
  { id: 1, name: "Black", code: "#000000" },
  { id: 2, name: "White", code: "#FFFFFF" },
  { id: 3, name: "Navy", code: "#000080" },
  { id: 4, name: "Red", code: "#FF0000" },
  { id: 5, name: "Green", code: "#008000" },
  { id: 6, name: "Yellow", code: "#FFFF00" },
  { id: 7, name: "Purple", code: "#800080" },
  { id: 8, name: "Orange", code: "#FFA500" },
]

const materials = [
  { id: 1, name: "Cotton", image: "/placeholder.svg?height=80&width=120" },
  { id: 2, name: "Silk", image: "/placeholder.svg?height=80&width=120" },
  { id: 3, name: "Linen", image: "/placeholder.svg?height=80&width=120" },
  { id: 4, name: "Denim", image: "/placeholder.svg?height=80&width=120" },
]

const elements = [
  { id: 1, name: "Base T-Shirt", type: "template" },
  { id: 2, name: "Logo", type: "image" },
  { id: 3, name: "Text 1", type: "text" },
  { id: 4, name: "Pattern", type: "graphic" },
]

const history = [
  { id: 1, action: "Changed color to Black" },
  { id: 2, action: "Added logo" },
  { id: 3, action: "Resized text" },
  { id: 4, action: "Changed material to Cotton" },
]

const CustomDesignEditorPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [selectedColor, setSelectedColor] = useState(1)
  const [selectedMaterial, setSelectedMaterial] = useState(1)
  const [selectedElement, setSelectedElement] = useState(1)
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [zoom, setZoom] = useState(100)

  return (
    <PageWrapper>
      <EditorHeader>
        <HeaderLeft>
          <MobileMenuButton onClick={() => setLeftPanelOpen(!leftPanelOpen)}>
            <FiLayers />
          </MobileMenuButton>
          <Logo to="/design-tools">KIMELIA LUXE</Logo>
          <HeaderTitle>
            <FiEdit /> Custom Design Editor
          </HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <ActionButton>
            <FiSave /> <span>Save</span>
          </ActionButton>
          <ActionButton>
            <FiShare2 /> <span>Share</span>
          </ActionButton>
          <ActionButton>
            <FiDownload /> <span>Export</span>
          </ActionButton>
          <Button>
            <FiShoppingBag style={{ marginRight: "0.5rem" }} /> <span>Order</span>
          </Button>
          <MobileMenuButton onClick={() => setRightPanelOpen(!rightPanelOpen)}>
            <FiGrid />
          </MobileMenuButton>
        </HeaderRight>
      </EditorHeader>

      <EditorContainer>
        <LeftPanel isOpen={leftPanelOpen}>
          <PanelSection>
            <PanelTitle>
              <FiLayers /> Templates
            </PanelTitle>
            <TemplateGrid>
              {templates.map((template) => (
                <TemplateItem
                  key={template.id}
                  selected={selectedTemplate === template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <img src={template.image || "/placeholder.svg"} alt={template.name} />
                </TemplateItem>
              ))}
            </TemplateGrid>
          </PanelSection>

          <PanelSection>
            <PanelTitle>
              <FiDroplet /> Colors
            </PanelTitle>
            <ColorPalette>
              {colors.map((color) => (
                <ColorSwatch
                  key={color.id}
                  color={color.code}
                  selected={selectedColor === color.id}
                  onClick={() => setSelectedColor(color.id)}
                  title={color.name}
                />
              ))}
            </ColorPalette>
          </PanelSection>

          <PanelSection>
            <PanelTitle>
              <FiGrid /> Materials
            </PanelTitle>
            <MaterialGrid>
              {materials.map((material) => (
                <MaterialItem
                  key={material.id}
                  selected={selectedMaterial === material.id}
                  onClick={() => setSelectedMaterial(material.id)}
                >
                  <img src={material.image || "/placeholder.svg"} alt={material.name} />
                  <div className="material-name">{material.name}</div>
                </MaterialItem>
              ))}
            </MaterialGrid>
          </PanelSection>

          <PanelSection>
            <PanelTitle>
              <FiType /> Text
            </PanelTitle>
            <Button variant="outline" style={{ width: "100%" }}>
              <FiPlus style={{ marginRight: "0.5rem" }} /> Add Text
            </Button>
          </PanelSection>

          <PanelSection>
            <PanelTitle>
              <FiImage /> Graphics
            </PanelTitle>
            <Button variant="outline" style={{ width: "100%" }}>
              <FiPlus style={{ marginRight: "0.5rem" }} /> Add Graphic
            </Button>
          </PanelSection>
        </LeftPanel>

        <CanvasArea>
          <CanvasContainer>
            <Canvas>
              <CanvasImage src="/placeholder.svg?height=600&width=500" alt="Design Preview" />
            </Canvas>
          </CanvasContainer>
          <CanvasControls>
            <CanvasControlButton onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <FiMinus />
            </CanvasControlButton>
            <CanvasControlButton onClick={() => setZoom(Math.min(150, zoom + 10))}>
              <FiPlus />
            </CanvasControlButton>
            <CanvasControlButton>
              <FiRotateCw />
            </CanvasControlButton>
            <CanvasControlButton>
              <FiMaximize />
            </CanvasControlButton>
          </CanvasControls>
        </CanvasArea>

        <RightPanel isOpen={rightPanelOpen}>
          <PanelSection>
            <PanelTitle>
              <FiLayers /> Layers
            </PanelTitle>
            <ElementsList>
              {elements.map((element) => (
                <ElementItem
                  key={element.id}
                  selected={selectedElement === element.id}
                  onClick={() => setSelectedElement(element.id)}
                >
                  <ElementName>
                    {element.type === "template" && <FiLayers />}
                    {element.type === "image" && <FiImage />}
                    {element.type === "text" && <FiType />}
                    {element.type === "graphic" && <FiGrid />}
                    {element.name}
                  </ElementName>
                  <ElementActions>
                    <ElementActionButton>
                      <FiEye />
                    </ElementActionButton>
                    <ElementActionButton>
                      <FiChevronUp />
                    </ElementActionButton>
                    <ElementActionButton>
                      <FiChevronDown />
                    </ElementActionButton>
                  </ElementActions>
                </ElementItem>
              ))}
            </ElementsList>
          </PanelSection>

          <PanelSection>
            <PanelTitle>
              <FiEdit /> Properties
            </PanelTitle>
            <PropertiesForm>
              <FormGroup>
                <FormLabel>Position X</FormLabel>
                <RangeInput type="range" min="0" max="100" value="50" />
                <RangeValues>
                  <span>0</span>
                  <span>100</span>
                </RangeValues>
              </FormGroup>
              <FormGroup>
                <FormLabel>Position Y</FormLabel>
                <RangeInput type="range" min="0" max="100" value="50" />
                <RangeValues>
                  <span>0</span>
                  <span>100</span>
                </RangeValues>
              </FormGroup>
              <FormGroup>
                <FormLabel>Size</FormLabel>
                <RangeInput type="range" min="10" max="200" value="100" />
                <RangeValues>
                  <span>10%</span>
                  <span>200%</span>
                </RangeValues>
              </FormGroup>
              <FormGroup>
                <FormLabel>Rotation</FormLabel>
                <RangeInput type="range" min="0" max="360" value="0" />
                <RangeValues>
                  <span>0°</span>
                  <span>360°</span>
                </RangeValues>
              </FormGroup>
              <FormGroup>
                <FormLabel>Opacity</FormLabel>
                <RangeInput type="range" min="0" max="100" value="100" />
                <RangeValues>
                  <span>0%</span>
                  <span>100%</span>
                </RangeValues>
              </FormGroup>
            </PropertiesForm>
          </PanelSection>

          <PanelSection>
            <PanelTitle>
              <FiRefreshCw /> History
            </PanelTitle>
            <HistoryList>
              {history.map((item) => (
                <HistoryItem key={item.id}>
                  <FiRefreshCw />
                  {item.action}
                </HistoryItem>
              ))}
            </HistoryList>
          </PanelSection>

          <PanelSection>
            <PreviewButton>
              <FiEye style={{ marginRight: "0.5rem" }} /> Preview Design
            </PreviewButton>
          </PanelSection>
        </RightPanel>
      </EditorContainer>
    </PageWrapper>
  )
}

export default CustomDesignEditorPage

