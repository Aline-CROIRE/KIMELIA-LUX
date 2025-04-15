"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Rnd } from "react-rnd"
import html2canvas from "html2canvas"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
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
  FiTrash2,
  FiCopy,
  FiX,
  FiArrowLeft,
  FiBold,
  FiItalic,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiSquare,
  FiCircle,
  FiTriangle,
  FiSliders,
  FiUpload,
  FiCheck,
  FiCrop,
  FiDollarSign,
  FiTag,
  FiShield,
} from "react-icons/fi"
import { fonts, graphicElements } from "../../data/designAssets"
import image1 from "../../assets/images/t-sh.jpeg"
import image2 from "../../assets/images/hod.jpeg"
import image3 from "../../assets/images/pant.jpeg"
import image4 from "../../assets/images/dres1.jpg"

// *** UTILITY FUNCTIONS ***
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const generateUniqueId = () => `element_${Math.random().toString(36).substring(2, 9)}`

// *** STYLED COMPONENTS ***

const PageWrapper = styled.div`
  background: #f5f5f5;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`

const HeroSection = styled.section`
  background: linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.7)),
    url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 0;
  text-align: center;
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(
      135deg,
      var(--gold-primary, #D4AF37) 0%,
      var(--gold-light, #F5E7A3) 50%,
      var(--gold-primary, #D4AF37) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
  }
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
    background: rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  background-color: #f0f0f0;
  background-image: linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0), 
                    linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
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
  transform: scale(${(props) => props.zoom / 100});
  transition: transform 0.3s ease;

  @media (max-width: 576px) {
    width: 100%;
    height: 450px;
  }
`

const CanvasBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color || "white"};
  background-image: ${(props) => (props.materialImage ? `url(${props.materialImage})` : "none")};
  background-size: cover;
  background-position: center;
  z-index: 1;
`

const CanvasImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
  pointer-events: none;
`

const CanvasControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
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

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.2rem;
  }
`

const PanelSection = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

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
  transition: all 0.2s ease;
  position: relative;
  box-shadow: ${(props) => (props.selected ? "0 0 10px rgba(212, 175, 55, 0.5)" : "none")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => (props.selected ? "#D4AF37" : "rgba(212, 175, 55, 0.5)")};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(212, 175, 55, 0.2);
    opacity: ${(props) => (props.selected ? 0.3 : 0)};
    transition: opacity 0.3s ease;
  }
  
  &:hover:after {
    opacity: ${(props) => (props.selected ? 0.3 : 0.1)};
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

  &:active {
    transform: translateY(1px);
  }

  svg {
    font-size: 0.9rem;
  }
`

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
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
  background: ${(props) => (props.active ? "rgba(212, 175, 55, 0.1)" : "transparent")};

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

const FormTextarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;

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
`

const CTASection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(to right, var(--luxury-black, #121212), #1a1a1a);
  color: white;
`

const CTAContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(
      135deg,
      var(--gold-primary, #D4AF37) 0%,
      var(--gold-light, #F5E7A3) 50%,
      var(--gold-primary, #D4AF37) 100%
    );
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
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  a {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`

const PreviewButton = styled.button`
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #D4AF37;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #c4a030;
  }

  &:active {
    transform: translateY(1px);
  }
`

const GraphicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
`

const GraphicItem = styled.div`
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }

  img {
    width: 100%;
    height: 60px;
    object-fit: contain;
    padding: 5px;
  }
`

const FontSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`

const FontItem = styled.div`
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${(props) => (props.selected ? "#D4AF37" : "rgba(0, 0, 0, 0.1)")};
  background: ${(props) => (props.selected ? "rgba(212, 175, 55, 0.1)" : "transparent")};
  transition: all 0.3s ease;
  font-family: ${(props) => props.fontFamily};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

const TextFormatToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`

const FormatButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${(props) => (props.active ? "rgba(212, 175, 55, 0.2)" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    color: ${(props) => (props.active ? "#D4AF37" : "black")};
  }
`

const ColorPickerContainer = styled.div`
  margin-top: 0.5rem;
`

const UndoRedoContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #D4AF37;
  }
`

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PreviewImage = styled.div`
  width: 100%;
  max-width: 500px;
  height: 600px;
  position: relative;
  margin-bottom: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`

const ResizeHandle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #D4AF37;
  border-radius: 50%;
  z-index: 100;
`

const ShapeToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`

const ShapeButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    font-size: 1.2rem;
  }
`

const SuccessToast = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease-out forwards;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  svg {
    font-size: 1.2rem;
  }
`

const SizeControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const SizeControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`

const SizeLabel = styled.label`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.7);
`

const SizeInput = styled.input`
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const FileUploadContainer = styled.div`
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    border-color: #D4AF37;
    background: rgba(212, 175, 55, 0.05);
  }
  
  svg {
    font-size: 2.5rem;
    color: rgba(0, 0, 0, 0.3);
    margin-bottom: 1rem;
  }
  
  p {
    margin: 0.5rem 0;
    color: rgba(0, 0, 0, 0.6);
  }
  
  .upload-hint {
    font-size: 0.875rem;
  }
`

const HiddenInput = styled.input`
  display: none;
`

const CropContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  
  .ReactCrop {
    max-height: 400px;
    margin: 0 auto;
  }
`

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`

const Tab = styled.button`
  padding: 0.75rem 1rem;
  background: ${(props) => (props.active ? "rgba(212, 175, 55, 0.1)" : "transparent")};
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? "#D4AF37" : "transparent")};
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

const MarketplaceForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`

const PriceInput = styled.div`
  position: relative;
  
  input {
    padding-left: 1.5rem;
  }
  
  svg {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.5);
  }
`

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 20px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  
  svg {
    margin-right: 0.25rem;
  }
`

// *** MOCK DATA ***

const templates = [
  {
    id: 1,
    name: "T-Shirt",
    image:image1
    ,
    template:
      image1,
  },
  {
    id: 2,
    name: "Hoodie",
    image:
      image2,
    template: image2,
  },
  {
    id: 3,
    name: "Dress",
    image:
      image3,
    template: image3,
  },
  {
    id: 4,
    name: "Pants",
    image:
      image4,
    template:image4,
  },
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
  { id: 9, name: "Gold", code: "#D4AF37" },
  { id: 10, name: "Silver", code: "#C0C0C0" },
  { id: 11, name: "Pink", code: "#FFC0CB" },
  { id: 12, name: "Teal", code: "#008080" },
]

const materials = [
  {
    id: 1,
    name: "Cotton",
    image:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 2,
    name: "Silk",
    image:
      "https://images.unsplash.com/photo-1589036555921-e51a4a40db5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 3,
    name: "Linen",
    image:
      "https://images.unsplash.com/photo-1583878545126-f6b4d8194f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 4,
    name: "Denim",
    image:
      "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
]

const categories = [
  "Casual Wear",
  "Formal Wear",
  "Sportswear",
  "Streetwear",
  "Vintage",
  "Minimalist",
  "Bohemian",
  "Luxury",
  "Handmade",
  "Sustainable",
]

// *** COMPONENT ***

const CustomDesignEditorPage = () => {
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const cropImageRef = useRef(null)
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [selectedColor, setSelectedColor] = useState(2) // Default to white
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [selectedElement, setSelectedElement] = useState(null)
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [showPreview, setShowPreview] = useState(false)
  const [showTextEditor, setShowTextEditor] = useState(false)
  const [showImageUploader, setShowImageUploader] = useState(false)
  const [showCropTool, setShowCropTool] = useState(false)
  const [showMarketplaceForm, setShowMarketplaceForm] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [activeTab, setActiveTab] = useState("design")

  // Design state
  const [designElements, setDesignElements] = useState([])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [historyActions, setHistoryActions] = useState([])

  // Text editor state
  const [textContent, setTextContent] = useState("")
  const [textFont, setTextFont] = useState("Arial, sans-serif")
  const [textSize, setTextSize] = useState(24)
  const [textColor, setTextColor] = useState("#000000")
  const [textBold, setTextBold] = useState(false)
  const [textItalic, setTextItalic] = useState(false)
  const [textAlign, setTextAlign] = useState("center")

  // Shape state
  const [shapeType, setShapeType] = useState("square")
  const [shapeColor, setShapeColor] = useState("#D4AF37")

  // Crop state
  const [cropImage, setCropImage] = useState(null)
  const [crop, setCrop] = useState({ unit: "%", width: 50, height: 50, x: 25, y: 25 })
  const [completedCrop, setCompletedCrop] = useState(null)
  const [elementToCrop, setElementToCrop] = useState(null)

  // Marketplace form state
  const [designName, setDesignName] = useState("")
  const [designDescription, setDesignDescription] = useState("")
  const [designPrice, setDesignPrice] = useState("")
  const [designCategories, setDesignCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  // Order form state
  const [orderSize, setOrderSize] = useState("M")
  const [orderQuantity, setOrderQuantity] = useState(1)
  const [orderNotes, setOrderNotes] = useState("")

  // Get the template data
  const templateData = templates.find((t) => t.id === selectedTemplate)
  const colorData = colors.find((c) => c.id === selectedColor)

  // Initialize history
  useEffect(() => {
    // Save initial empty state to history
    saveToHistory([])
    setHistoryActions([{ action: "Started new design", timestamp: Date.now() }])
  }, [])

  // Show success toast
  const showToast = (message) => {
    setSuccessMessage(message)
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
    }, 3000)
  }

  // Save current state to history
  const saveToHistory = (newElements) => {
    // If we're not at the end of history, truncate
    if (historyIndex < history.length - 1) {
      setHistory(history.slice(0, historyIndex + 1))
    }

    // Add new state to history
    const newHistory = [...history, JSON.parse(JSON.stringify(newElements))]
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Add action to history
  const addHistoryAction = (action) => {
    const newAction = { action, timestamp: Date.now() }
    setHistoryActions([...historyActions, newAction])
  }

  // Handle undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setDesignElements(JSON.parse(JSON.stringify(history[historyIndex - 1])))
      addHistoryAction("Undo")
    }
  }

  // Handle redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setDesignElements(JSON.parse(JSON.stringify(history[historyIndex + 1])))
      addHistoryAction("Redo")
    }
  }

  // Add text element
  const addTextElement = () => {
    const newElement = {
      id: generateUniqueId(),
      type: "text",
      content: textContent || "Your Text Here",
      x: 150,
      y: 150,
      width: 200,
      height: 50,
      rotation: 0,
      fontSize: textSize,
      fontFamily: textFont,
      color: textColor,
      bold: textBold,
      italic: textItalic,
      textAlign: textAlign,
      zIndex: designElements.length + 10,
    }

    const newElements = [...designElements, newElement]
    setDesignElements(newElements)
    saveToHistory(newElements)
    setSelectedElement(newElement.id)
    setShowTextEditor(false)
    addHistoryAction(`Added text: "${textContent || "Your Text Here"}"`)
    showToast("Text added successfully!")
  }

  // Add graphic element
  const addGraphicElement = (graphic) => {
    const newElement = {
      id: generateUniqueId(),
      type: "graphic",
      src: graphic.src,
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 100,
      zIndex: designElements.length + 10,
    }

    const newElements = [...designElements, newElement]
    setDesignElements(newElements)
    saveToHistory(newElements)
    setSelectedElement(newElement.id)
    addHistoryAction(`Added graphic: ${graphic.name || "Graphic"}`)
    showToast("Graphic added successfully!")
  }

  // Add image element
  const addImageElement = (imageUrl) => {
    const newElement = {
      id: generateUniqueId(),
      type: "image",
      src: imageUrl,
      x: 150,
      y: 150,
      width: 150,
      height: 150,
      rotation: 0,
      opacity: 100,
      zIndex: designElements.length + 10,
    }

    const newElements = [...designElements, newElement]
    setDesignElements(newElements)
    saveToHistory(newElements)
    setSelectedElement(newElement.id)
    setShowImageUploader(false)
    addHistoryAction("Added image")
    showToast("Image added successfully!")
  }

  // Add shape element
  const addShapeElement = (shape) => {
    const newElement = {
      id: generateUniqueId(),
      type: "shape",
      shape: shape,
      x: 150,
      y: 150,
      width: 100,
      height: shape === "circle" ? 100 : 100,
      rotation: 0,
      color: shapeColor,
      zIndex: designElements.length + 10,
    }

    const newElements = [...designElements, newElement]
    setDesignElements(newElements)
    saveToHistory(newElements)
    setSelectedElement(newElement.id)
    addHistoryAction(`Added ${shape} shape`)
    showToast(`${shape.charAt(0).toUpperCase() + shape.slice(1)} added successfully!`)
  }

  // Update element position and size
  const updateElement = (id, updates) => {
    const newElements = designElements.map((el) => (el.id === id ? { ...el, ...updates } : el))

    setDesignElements(newElements)
    // Don't save to history on every update to avoid filling history with small changes
  }

  // Save element state after drag or resize is complete
  const finalizeElementUpdate = (action = "Updated element") => {
    saveToHistory([...designElements])
    addHistoryAction(action)
  }

  // Delete element
  const deleteElement = (id) => {
    const elementToDelete = designElements.find((el) => el.id === id)
    const elementType = elementToDelete ? elementToDelete.type : "element"

    const newElements = designElements.filter((el) => el.id !== id)
    setDesignElements(newElements)
    saveToHistory(newElements)
    setSelectedElement(null)
    addHistoryAction(`Deleted ${elementType}`)
    showToast(`${elementType.charAt(0).toUpperCase() + elementType.slice(1)} deleted successfully!`)
  }

  // Duplicate element
  const duplicateElement = (id) => {
    const elementToDuplicate = designElements.find((el) => el.id === id)
    if (elementToDuplicate) {
      const newElement = {
        ...JSON.parse(JSON.stringify(elementToDuplicate)),
        id: generateUniqueId(),
        x: elementToDuplicate.x + 20,
        y: elementToDuplicate.y + 20,
        zIndex: Math.max(...designElements.map((el) => el.zIndex || 0), 0) + 1,
      }

      const newElements = [...designElements, newElement]
      setDesignElements(newElements)
      saveToHistory(newElements)
      setSelectedElement(newElement.id)
      addHistoryAction(`Duplicated ${elementToDuplicate.type}`)
      showToast(
        `${elementToDuplicate.type.charAt(0).toUpperCase() + elementToDuplicate.type.slice(1)} duplicated successfully!`,
      )
    }
  }

  // Change element layer
  const changeElementLayer = (id, direction) => {
    const elements = [...designElements]
    const index = elements.findIndex((el) => el.id === id)

    if (index === -1) return

    if (direction === "up" && index < elements.length - 1) {
      // Swap zIndex with the element above
      const temp = elements[index].zIndex
      elements[index].zIndex = elements[index + 1].zIndex
      elements[index + 1].zIndex = temp
    } else if (direction === "down" && index > 0) {
      // Swap zIndex with the element below
      const temp = elements[index].zIndex
      elements[index].zIndex = elements[index - 1].zIndex
      elements[index - 1].zIndex = temp
    }

    setDesignElements([...elements].sort((a, b) => a.zIndex - b.zIndex))
    saveToHistory([...elements].sort((a, b) => a.zIndex - b.zIndex))
    addHistoryAction(`Changed layer order: ${direction}`)
  }

  const handleZoom = (amount) => {
    setZoom(clamp(zoom + amount, 50, 150))
  }

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId)

    // Make sure the template is immediately applied to the canvas
    const template = templates.find((t) => t.id === templateId)

    // Add a visual feedback for selection
    addHistoryAction(`Changed template to ${template.name}`)
    showToast(`Template changed to ${template.name}!`)

    // Force a re-render of the canvas
    setDesignElements([...designElements])
  }

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId)
    addHistoryAction(`Changed color to ${colors.find((c) => c.id === colorId).name}`)
    showToast(`Color changed to ${colors.find((c) => c.id === colorId).name}!`)
  }

  const handleMaterialChange = (materialId) => {
    setSelectedMaterial(materialId)
    addHistoryAction(`Changed material to ${materials.find((m) => m.id === materialId).name}`)
    showToast(`Material changed to ${materials.find((m) => m.id === materialId).name}!`)
  }

  const handleSaveDesign = () => {
    // In a real app, this would save to a database
    const designData = {
      template: selectedTemplate,
      color: selectedColor,
      material: selectedMaterial,
      elements: designElements,
    }

    // Convert to JSON string
    const designJSON = JSON.stringify(designData)

    // Create a blob and download link
    const blob = new Blob([designJSON], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "my-design.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    addHistoryAction("Saved design")
    showToast("Design saved successfully!")
  }

  const handleExportDesign = () => {
    if (!canvasRef.current) return

    // Use html2canvas to capture the canvas
    html2canvas(canvasRef.current, {
      allowTaint: true,
      useCORS: true,
      scale: 2, // Higher quality
    }).then((canvas) => {
      // Convert to PNG
      const dataUrl = canvas.toDataURL("image/png")

      // Create download link
      const a = document.createElement("a")
      a.href = dataUrl
      a.download = "my-design.png"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      addHistoryAction("Exported design")
      showToast("Design exported successfully!")
    })
  }

  // Handle file upload for images
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file type
    if (!file.type.match("image.*")) {
      alert("Please select an image file (JPEG, PNG, GIF, etc.)")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      addImageElement(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  // Handle drag and drop for images
  const handleDrop = (e) => {
    e.preventDefault()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]

      // Check file type
      if (!file.type.match("image.*")) {
        alert("Please select an image file (JPEG, PNG, GIF, etc.)")
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        addImageElement(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  // Open crop tool for an element
  const openCropTool = (id) => {
    const element = designElements.find((el) => el.id === id)
    if (element && (element.type === "image" || element.type === "graphic")) {
      setCropImage(element.src)
      setElementToCrop(id)
      setShowCropTool(true)
    }
  }

  // Apply crop to image
  const applyCrop = () => {
    if (!completedCrop || !cropImageRef.current) return

    const canvas = document.createElement("canvas")
    const scaleX = cropImageRef.current.naturalWidth / cropImageRef.current.width
    const scaleY = cropImageRef.current.naturalHeight / cropImageRef.current.height
    const ctx = canvas.getContext("2d")

    canvas.width = completedCrop.width
    canvas.height = completedCrop.height

    ctx.drawImage(
      cropImageRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    )

    const croppedImageUrl = canvas.toDataURL("image/png")

    // Update the element with cropped image
    const newElements = designElements.map((el) => (el.id === elementToCrop ? { ...el, src: croppedImageUrl } : el))

    setDesignElements(newElements)
    saveToHistory(newElements)
    addHistoryAction("Cropped image")
    setShowCropTool(false)
    showToast("Image cropped successfully!")
  }

  // Add category to marketplace form
  const addCategory = () => {
    if (selectedCategory && !designCategories.includes(selectedCategory)) {
      setDesignCategories([...designCategories, selectedCategory])
      setSelectedCategory("")
    }
  }

  // Remove category from marketplace form
  const removeCategory = (category) => {
    setDesignCategories(designCategories.filter((cat) => cat !== category))
  }

  // Submit design to marketplace
  const submitToMarketplace = async () => {
    if (!designName) {
      alert("Please enter a name for your design")
      return
    }

    if (!canvasRef.current) return

    // Capture design as image
    const canvas = await html2canvas(canvasRef.current, {
      allowTaint: true,
      useCORS: true,
      scale: 2,
    })

    const designImage = canvas.toDataURL("image/png")

    // Prepare design data
    const designData = {
      name: designName,
      baseProduct: templates.find((t) => t.id === selectedTemplate).name,
      designType: "fromScratch",
      category: designCategories.length > 0 ? designCategories[0] : "Casual Wear",
      description: designDescription,
      designElements: designElements,
      designImages: [designImage],
      designData: {
        template: selectedTemplate,
        color: selectedColor,
        material: selectedMaterial,
      },
      estimatedPrice: Number.parseFloat(designPrice) || 99.99,
    }

    // In a real app, this would be an API call
    console.log("Submitting design to marketplace:", designData)

    // Simulate API call
    setTimeout(() => {
      setShowMarketplaceForm(false)
      showToast("Design submitted to marketplace successfully!")
      addHistoryAction("Submitted design to marketplace")
    }, 1500)
  }

  // Submit order
  const submitOrder = async () => {
    if (!canvasRef.current) return

    // Capture design as image
    const canvas = await html2canvas(canvasRef.current, {
      allowTaint: true,
      useCORS: true,
      scale: 2,
    })

    const designImage = canvas.toDataURL("image/png")

    // Prepare order data
    const orderData = {
      items: [
        {
          product: templates.find((t) => t.id === selectedTemplate).name,
          customDesign: designName || "Custom Design",
          quantity: Number.parseInt(orderQuantity),
          price: Number.parseFloat(designPrice) || 99.99,
          size: orderSize,
          color: colors.find((c) => c.id === selectedColor).name,
          customizations: {
            material: selectedMaterial ? materials.find((m) => m.id === selectedMaterial).name : null,
          },
        },
      ],
      shippingAddress: {},
      billingAddress: {},
      paymentMethod: "credit_card",
      paymentDetails: {},
      subtotal: (Number.parseFloat(designPrice) || 99.99) * Number.parseInt(orderQuantity),
      shippingCost: 9.99,
      tax: (Number.parseFloat(designPrice) || 99.99) * Number.parseInt(orderQuantity) * 0.08,
      discount: 0,
      totalAmount: (Number.parseFloat(designPrice) || 99.99) * Number.parseInt(orderQuantity) * 1.08 + 9.99,
      notes: orderNotes,
    }

    // In a real app, this would be an API call
    console.log("Submitting order:", orderData)

    // Simulate API call
    setTimeout(() => {
      setShowOrderForm(false)
      showToast("Order submitted successfully!")
      addHistoryAction("Submitted order")
    }, 1500)
  }

  // Render design elements
  const renderDesignElements = () => {
    return designElements
      .sort((a, b) => a.zIndex - b.zIndex)
      .map((element) => {
        if (element.type === "text") {
          return (
            <Rnd
              key={element.id}
              default={{
                x: element.x,
                y: element.y,
                width: element.width,
                height: element.height,
              }}
              position={{ x: element.x, y: element.y }}
              size={{ width: element.width, height: element.height }}
              onDragStop={(e, d) => {
                updateElement(element.id, { x: d.x, y: d.y })
                finalizeElementUpdate("Moved text element")
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                updateElement(element.id, {
                  width: ref.offsetWidth,
                  height: ref.offsetHeight,
                  x: position.x,
                  y: position.y,
                })
                finalizeElementUpdate("Resized text element")
              }}
              onClick={() => setSelectedElement(element.id)}
              style={{
                zIndex: element.zIndex,
                border: selectedElement === element.id ? "2px dashed #D4AF37" : "none",
              }}
              bounds="parent"
              enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                topLeft: true,
                bottomRight: true,
                bottomLeft: true,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    element.textAlign === "center"
                      ? "center"
                      : element.textAlign === "right"
                        ? "flex-end"
                        : "flex-start",
                  fontFamily: element.fontFamily,
                  fontSize: `${element.fontSize}px`,
                  color: element.color,
                  fontWeight: element.bold ? "bold" : "normal",
                  fontStyle: element.italic ? "italic" : "normal",
                  textAlign: element.textAlign,
                  transform: `rotate(${element.rotation || 0}deg)`,
                  userSelect: "none",
                  cursor: "move",
                }}
              >
                {element.content}
              </div>
            </Rnd>
          )
        } else if (element.type === "graphic" || element.type === "image") {
          return (
            <Rnd
              key={element.id}
              default={{
                x: element.x,
                y: element.y,
                width: element.width,
                height: element.height,
              }}
              position={{ x: element.x, y: element.y }}
              size={{ width: element.width, height: element.height }}
              onDragStop={(e, d) => {
                updateElement(element.id, { x: d.x, y: d.y })
                finalizeElementUpdate(`Moved ${element.type} element`)
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                updateElement(element.id, {
                  width: ref.offsetWidth,
                  height: ref.offsetHeight,
                  x: position.x,
                  y: position.y,
                })
                finalizeElementUpdate(`Resized ${element.type} element`)
              }}
              onClick={() => setSelectedElement(element.id)}
              style={{
                zIndex: element.zIndex,
                border: selectedElement === element.id ? "2px dashed #D4AF37" : "none",
              }}
              bounds="parent"
              enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                topLeft: true,
                bottomRight: true,
                bottomLeft: true,
              }}
            >
              <img
                src={element.src || "/placeholder.svg"}
                alt="Design Element"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: `rotate(${element.rotation || 0}deg)`,
                  opacity: (element.opacity || 100) / 100,
                  userSelect: "none",
                  cursor: "move",
                }}
                crossOrigin="anonymous"
              />
            </Rnd>
          )
        } else if (element.type === "shape") {
          const shapeStyle = {}

          if (element.shape === "circle") {
            shapeStyle.borderRadius = "50%"
          } else if (element.shape === "triangle") {
            shapeStyle.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)"
          }

          return (
            <Rnd
              key={element.id}
              default={{
                x: element.x,
                y: element.y,
                width: element.width,
                height: element.height,
              }}
              position={{ x: element.x, y: element.y }}
              size={{ width: element.width, height: element.height }}
              onDragStop={(e, d) => {
                updateElement(element.id, { x: d.x, y: d.y })
                finalizeElementUpdate("Moved shape element")
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                updateElement(element.id, {
                  width: ref.offsetWidth,
                  height: ref.offsetHeight,
                  x: position.x,
                  y: position.y,
                })
                finalizeElementUpdate("Resized shape element")
              }}
              onClick={() => setSelectedElement(element.id)}
              style={{
                zIndex: element.zIndex,
                border: selectedElement === element.id ? "2px dashed #D4AF37" : "none",
              }}
              bounds="parent"
              enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                topLeft: true,
                bottomRight: true,
                bottomLeft: true,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: element.color,
                  transform: `rotate(${element.rotation || 0}deg)`,
                  cursor: "move",
                  ...shapeStyle,
                }}
              />
            </Rnd>
          )
        }
        return null
      })
  }

  return (
    <PageWrapper>
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>Custom Design Editor</h1>
            <p>Create your own custom clothing designs with our intuitive editor.</p>
          </HeroContent>
        </div>
      </HeroSection>
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
          <ActionButton onClick={handleSaveDesign}>
            <FiSave /> <span>Save</span>
          </ActionButton>
          <ActionButton>
            <FiShare2 /> <span>Share</span>
          </ActionButton>
          <ActionButton onClick={handleExportDesign}>
            <FiDownload /> <span>Export</span>
          </ActionButton>
          <ActionButton onClick={() => setShowOrderForm(true)}>
            <FiShoppingBag /> <span>Order</span>
          </ActionButton>
          <ActionButton onClick={() => setShowMarketplaceForm(true)}>
            <FiTag /> <span>Sell</span>
          </ActionButton>
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
                  onClick={() => handleTemplateChange(template.id)}
                  title={`Select ${template.name} template`}
                >
                  <img src={template.image || "/placeholder.svg"} alt={template.name} loading="eager" />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0,0,0,0.7)",
                      color: "white",
                      padding: "4px",
                      fontSize: "0.8rem",
                      textAlign: "center",
                    }}
                  >
                    {template.name}
                  </div>
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
                  onClick={() => handleColorChange(color.id)}
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
                  onClick={() => handleMaterialChange(material.id)}
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
            <ActionButton style={{ width: "100%" }} onClick={() => setShowTextEditor(true)}>
              <FiPlus /> Add Text
            </ActionButton>
          </PanelSection>

          <PanelSection>
            <PanelTitle>
              <FiImage /> Images
            </PanelTitle>
            <ActionButton style={{ width: "100%" }} onClick={() => setShowImageUploader(true)}>
              <FiPlus /> Add Image
            </ActionButton>
            <HiddenInput type="file" ref={fileInputRef} accept="image/*" onChange={handleFileUpload} />
            <FileUploadContainer
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <FiUpload />
              <p>Drag & drop an image here</p>
              <p className="upload-hint">or click to browse files</p>
            </FileUploadContainer>
          </PanelSection>

          <PanelSection>
            <PanelTitle>
              <FiSquare /> Shapes
            </PanelTitle>
            <ShapeToolbar>
              <ShapeButton onClick={() => addShapeElement("square")}>
                <FiSquare />
              </ShapeButton>
              <ShapeButton onClick={() => addShapeElement("circle")}>
                <FiCircle />
              </ShapeButton>
              <ShapeButton onClick={() => addShapeElement("triangle")}>
                <FiTriangle />
              </ShapeButton>
            </ShapeToolbar>
            <FormGroup style={{ marginTop: "0.5rem" }}>
              <FormLabel>Shape Color</FormLabel>
              <FormInput type="color" value={shapeColor} onChange={(e) => setShapeColor(e.target.value)} />
            </FormGroup>
          </PanelSection>

          <PanelSection>
            <PanelTitle>
              <FiGrid /> Graphics
            </PanelTitle>
            <GraphicsGrid>
              {graphicElements.map((graphic) => (
                <GraphicItem key={graphic.id} onClick={() => addGraphicElement(graphic)}>
                  <img src={graphic.src || "/placeholder.svg"} alt={graphic.name} />
                </GraphicItem>
              ))}
            </GraphicsGrid>
          </PanelSection>
        </LeftPanel>

        <CanvasArea>
          <CanvasContainer>
            <Canvas ref={canvasRef} zoom={zoom} onDrop={handleDrop} onDragOver={handleDragOver}>
              <CanvasBackground
                color={colorData?.code}
                materialImage={selectedMaterial ? materials.find((m) => m.id === selectedMaterial)?.image : null}
              />
              <CanvasImage src={templateData?.template} alt="Design Template" />
              {renderDesignElements()}
            </Canvas>
          </CanvasContainer>
          <CanvasControls>
            <CanvasControlButton onClick={() => handleZoom(-10)} title="Zoom Out">
              <FiMinus />
            </CanvasControlButton>
            <CanvasControlButton onClick={() => handleZoom(10)} title="Zoom In">
              <FiPlus />
            </CanvasControlButton>
            <CanvasControlButton
              onClick={() => {
                if (selectedElement) {
                  const element = designElements.find((el) => el.id === selectedElement)
                  if (element) {
                    updateElement(selectedElement, {
                      rotation: (element.rotation || 0) + 45,
                    })
                    finalizeElementUpdate("Rotated element")
                  }
                }
              }}
              disabled={!selectedElement}
              title="Rotate 45°"
            >
              <FiRotateCw />
            </CanvasControlButton>
            <CanvasControlButton onClick={() => setZoom(100)} title="Reset Zoom">
              <FiMaximize />
            </CanvasControlButton>
            <CanvasControlButton
              onClick={() => {
                if (selectedElement) {
                  duplicateElement(selectedElement)
                }
              }}
              disabled={!selectedElement}
              title="Duplicate Element"
            >
              <FiCopy />
            </CanvasControlButton>
            <CanvasControlButton
              onClick={() => {
                if (selectedElement) {
                  const element = designElements.find((el) => el.id === selectedElement)
                  if (element && (element.type === "image" || element.type === "graphic")) {
                    openCropTool(selectedElement)
                  }
                }
              }}
              disabled={
                !selectedElement || !designElements.find((el) => el.id === selectedElement)?.type.match(/image|graphic/)
              }
              title="Crop Image"
            >
              <FiCrop />
            </CanvasControlButton>
            <CanvasControlButton
              onClick={() => {
                if (selectedElement) {
                  deleteElement(selectedElement)
                }
              }}
              disabled={!selectedElement}
              title="Delete Element"
            >
              <FiTrash2 />
            </CanvasControlButton>
          </CanvasControls>
        </CanvasArea>

        <RightPanel isOpen={rightPanelOpen}>
          <PanelSection>
            <PanelTitle>
              <FiLayers /> Layers
            </PanelTitle>
            <ElementsList>
              {designElements
                .sort((a, b) => b.zIndex - a.zIndex)
                .map((element) => (
                  <ElementItem
                    key={element.id}
                    selected={selectedElement === element.id}
                    onClick={() => setSelectedElement(element.id)}
                  >
                    <ElementName>
                      {element.type === "text" ? (
                        <>
                          <FiType /> {element.content.substring(0, 15)}
                          {element.content.length > 15 ? "..." : ""}
                        </>
                      ) : element.type === "shape" ? (
                        element.shape === "circle" ? (
                          <>
                            <FiCircle /> Circle
                          </>
                        ) : element.shape === "triangle" ? (
                          <>
                            <FiTriangle /> Triangle
                          </>
                        ) : (
                          <>
                            <FiSquare /> Square
                          </>
                        )
                      ) : (
                        <>
                          <FiImage /> {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
                        </>
                      )}
                    </ElementName>
                    <ElementActions>
                      <ElementActionButton
                        onClick={(e) => {
                          e.stopPropagation()
                          changeElementLayer(element.id, "up")
                        }}
                        title="Move Up"
                      >
                        <FiChevronUp />
                      </ElementActionButton>
                      <ElementActionButton
                        onClick={(e) => {
                          e.stopPropagation()
                          changeElementLayer(element.id, "down")
                        }}
                        title="Move Down"
                      >
                        <FiChevronDown />
                      </ElementActionButton>
                      <ElementActionButton
                        onClick={(e) => {
                          e.stopPropagation()
                          duplicateElement(element.id)
                        }}
                        title="Duplicate"
                      >
                        <FiCopy />
                      </ElementActionButton>
                      <ElementActionButton
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteElement(element.id)
                        }}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </ElementActionButton>
                    </ElementActions>
                  </ElementItem>
                ))}
            </ElementsList>
            {designElements.length === 0 && (
              <div style={{ textAlign: "center", padding: "1rem", color: "rgba(0,0,0,0.5)" }}>
                No elements added yet. Add text, images, or shapes from the left panel.
              </div>
            )}
          </PanelSection>

          {selectedElement && (
            <PanelSection>
              <PanelTitle>
                <FiSliders /> Properties
              </PanelTitle>
              <PropertiesForm>
                {(() => {
                  const element = designElements.find((el) => el.id === selectedElement)
                  if (!element) return null

                  if (element.type === "text") {
                    return (
                      <>
                        <FormGroup>
                          <FormLabel>Text</FormLabel>
                          <FormInput
                            type="text"
                            value={element.content}
                            onChange={(e) => {
                              updateElement(selectedElement, { content: e.target.value })
                            }}
                            onBlur={() => finalizeElementUpdate("Updated text content")}
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Font</FormLabel>
                          <FormSelect
                            value={element.fontFamily}
                            onChange={(e) => {
                              updateElement(selectedElement, { fontFamily: e.target.value })
                              finalizeElementUpdate("Changed font")
                            }}
                          >
                            {fonts.map((font) => (
                              <option key={font.name} value={font.family}>
                                {font.name}
                              </option>
                            ))}
                          </FormSelect>
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Size</FormLabel>
                          <RangeInput
                            type="range"
                            min="10"
                            max="72"
                            value={element.fontSize}
                            onChange={(e) => {
                              updateElement(selectedElement, { fontSize: Number.parseInt(e.target.value) })
                            }}
                            onMouseUp={() => finalizeElementUpdate("Changed font size")}
                            onTouchEnd={() => finalizeElementUpdate("Changed font size")}
                          />
                          <RangeValues>
                            <span>10px</span>
                            <span>72px</span>
                          </RangeValues>
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Color</FormLabel>
                          <FormInput
                            type="color"
                            value={element.color}
                            onChange={(e) => {
                              updateElement(selectedElement, { color: e.target.value })
                            }}
                            onBlur={() => finalizeElementUpdate("Changed text color")}
                          />
                        </FormGroup>
                        <SizeControls>
                          <SizeControl>
                            <SizeLabel>Width</SizeLabel>
                            <SizeInput
                              type="number"
                              value={Math.round(element.width)}
                              onChange={(e) => {
                                const value = Number.parseInt(e.target.value)
                                if (!isNaN(value) && value > 0) {
                                  updateElement(selectedElement, { width: value })
                                }
                              }}
                              onBlur={() => finalizeElementUpdate("Changed width")}
                              min="10"
                            />
                          </SizeControl>
                          <SizeControl>
                            <SizeLabel>Height</SizeLabel>
                            <SizeInput
                              type="number"
                              value={Math.round(element.height)}
                              onChange={(e) => {
                                const value = Number.parseInt(e.target.value)
                                if (!isNaN(value) && value > 0) {
                                  updateElement(selectedElement, { height: value })
                                }
                              }}
                              onBlur={() => finalizeElementUpdate("Changed height")}
                              min="10"
                            />
                          </SizeControl>
                        </SizeControls>
                        <FormGroup>
                          <FormLabel>Rotation (degrees)</FormLabel>
                          <RangeInput
                            type="range"
                            min="0"
                            max="360"
                            value={element.rotation || 0}
                            onChange={(e) => {
                              updateElement(selectedElement, { rotation: Number.parseInt(e.target.value) })
                            }}
                            onMouseUp={() => finalizeElementUpdate("Rotated element")}
                            onTouchEnd={() => finalizeElementUpdate("Rotated element")}
                          />
                          <RangeValues>
                            <span>0°</span>
                            <span>360°</span>
                          </RangeValues>
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Style</FormLabel>
                          <TextFormatToolbar>
                            <FormatButton
                              active={element.bold}
                              onClick={() => {
                                updateElement(selectedElement, { bold: !element.bold })
                                finalizeElementUpdate("Changed text style")
                              }}
                              title="Bold"
                            >
                              <FiBold />
                            </FormatButton>
                            <FormatButton
                              active={element.italic}
                              onClick={() => {
                                updateElement(selectedElement, { italic: !element.italic })
                                finalizeElementUpdate("Changed text style")
                              }}
                              title="Italic"
                            >
                              <FiItalic />
                            </FormatButton>
                            <FormatButton
                              active={element.textAlign === "left"}
                              onClick={() => {
                                updateElement(selectedElement, { textAlign: "left" })
                                finalizeElementUpdate("Changed text alignment")
                              }}
                              title="Align Left"
                            >
                              <FiAlignLeft />
                            </FormatButton>
                            <FormatButton
                              active={element.textAlign === "center"}
                              onClick={() => {
                                updateElement(selectedElement, { textAlign: "center" })
                                finalizeElementUpdate("Changed text alignment")
                              }}
                              title="Align Center"
                            >
                              <FiAlignCenter />
                            </FormatButton>
                            <FormatButton
                              active={element.textAlign === "right"}
                              onClick={() => {
                                updateElement(selectedElement, { textAlign: "right" })
                                finalizeElementUpdate("Changed text alignment")
                              }}
                              title="Align Right"
                            >
                              <FiAlignRight />
                            </FormatButton>
                          </TextFormatToolbar>
                        </FormGroup>
                      </>
                    )
                  } else if (element.type === "shape") {
                    return (
                      <>
                        <FormGroup>
                          <FormLabel>Color</FormLabel>
                          <FormInput
                            type="color"
                            value={element.color}
                            onChange={(e) => {
                              updateElement(selectedElement, { color: e.target.value })
                            }}
                            onBlur={() => finalizeElementUpdate("Changed shape color")}
                          />
                        </FormGroup>
                        <SizeControls>
                          <SizeControl>
                            <SizeLabel>Width</SizeLabel>
                            <SizeInput
                              type="number"
                              value={Math.round(element.width)}
                              onChange={(e) => {
                                const value = Number.parseInt(e.target.value)
                                if (!isNaN(value) && value > 0) {
                                  updateElement(selectedElement, { width: value })
                                }
                              }}
                              onBlur={() => finalizeElementUpdate("Changed width")}
                              min="10"
                            />
                          </SizeControl>
                          <SizeControl>
                            <SizeLabel>Height</SizeLabel>
                            <SizeInput
                              type="number"
                              value={Math.round(element.height)}
                              onChange={(e) => {
                                const value = Number.parseInt(e.target.value)
                                if (!isNaN(value) && value > 0) {
                                  updateElement(selectedElement, { height: value })
                                }
                              }}
                              onBlur={() => finalizeElementUpdate("Changed height")}
                              min="10"
                            />
                          </SizeControl>
                        </SizeControls>
                        <FormGroup>
                          <FormLabel>Rotation (degrees)</FormLabel>
                          <RangeInput
                            type="range"
                            min="0"
                            max="360"
                            value={element.rotation || 0}
                            onChange={(e) => {
                              updateElement(selectedElement, { rotation: Number.parseInt(e.target.value) })
                            }}
                            onMouseUp={() => finalizeElementUpdate("Rotated shape")}
                            onTouchEnd={() => finalizeElementUpdate("Rotated shape")}
                          />
                          <RangeValues>
                            <span>0°</span>
                            <span>360°</span>
                          </RangeValues>
                        </FormGroup>
                      </>
                    )
                  } else if (element.type === "image" || element.type === "graphic") {
                    return (
                      <>
                        <SizeControls>
                          <SizeControl>
                            <SizeLabel>Width</SizeLabel>
                            <SizeInput
                              type="number"
                              value={Math.round(element.width)}
                              onChange={(e) => {
                                const value = Number.parseInt(e.target.value)
                                if (!isNaN(value) && value > 0) {
                                  updateElement(selectedElement, { width: value })
                                }
                              }}
                              onBlur={() => finalizeElementUpdate("Changed width")}
                              min="10"
                            />
                          </SizeControl>
                          <SizeControl>
                            <SizeLabel>Height</SizeLabel>
                            <SizeInput
                              type="number"
                              value={Math.round(element.height)}
                              onChange={(e) => {
                                const value = Number.parseInt(e.target.value)
                                if (!isNaN(value) && value > 0) {
                                  updateElement(selectedElement, { height: value })
                                }
                              }}
                              onBlur={() => finalizeElementUpdate("Changed height")}
                              min="10"
                            />
                          </SizeControl>
                        </SizeControls>
                        <FormGroup>
                          <FormLabel>Opacity</FormLabel>
                          <RangeInput
                            type="range"
                            min="0"
                            max="100"
                            value={element.opacity || 100}
                            onChange={(e) => {
                              updateElement(selectedElement, {
                                opacity: Number.parseInt(e.target.value),
                              })
                            }}
                            onMouseUp={() => finalizeElementUpdate("Changed opacity")}
                            onTouchEnd={() => finalizeElementUpdate("Changed opacity")}
                          />
                          <RangeValues>
                            <span>0%</span>
                            <span>100%</span>
                          </RangeValues>
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Rotation (degrees)</FormLabel>
                          <RangeInput
                            type="range"
                            min="0"
                            max="360"
                            value={element.rotation || 0}
                            onChange={(e) => {
                              updateElement(selectedElement, { rotation: Number.parseInt(e.target.value) })
                            }}
                            onMouseUp={() => finalizeElementUpdate("Rotated image")}
                            onTouchEnd={() => finalizeElementUpdate("Rotated image")}
                          />
                          <RangeValues>
                            <span>0°</span>
                            <span>360°</span>
                          </RangeValues>
                        </FormGroup>
                        <ActionButton style={{ marginTop: "0.5rem" }} onClick={() => openCropTool(element.id)}>
                          <FiCrop /> Crop Image
                        </ActionButton>
                      </>
                    )
                  }
                })()}
              </PropertiesForm>
            </PanelSection>
          )}

          <PanelSection>
            <PanelTitle>
              <FiRefreshCw /> History
            </PanelTitle>
            <UndoRedoContainer>
              <ActionButton onClick={handleUndo} disabled={historyIndex <= 0}>
                <FiArrowLeft /> Undo
              </ActionButton>
              <ActionButton onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
                <FiArrowLeft style={{ transform: "scaleX(-1)" }} /> Redo
              </ActionButton>
            </UndoRedoContainer>
            <HistoryList>
              {historyActions
                .slice()
                .reverse()
                .map((item, index) => (
                  <HistoryItem key={index} active={index === 0}>
                    <FiRefreshCw />
                    <span>{item.action}</span>
                  </HistoryItem>
                ))}
            </HistoryList>
          </PanelSection>

          <PanelSection>
            <PreviewButton onClick={() => setShowPreview(true)}>
              <FiEye /> Preview Design
            </PreviewButton>
          </PanelSection>
        </RightPanel>
      </EditorContainer>

      {showTextEditor && (
        <Modal onClick={() => setShowTextEditor(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Add Text</h2>
              <CloseButton onClick={() => setShowTextEditor(false)}>
                <FiX />
              </CloseButton>
            </ModalHeader>
            <FormGroup>
              <FormLabel>Text Content</FormLabel>
              <FormInput
                type="text"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter your text here"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Font</FormLabel>
              <FormSelect value={textFont} onChange={(e) => setTextFont(e.target.value)}>
                {fonts.map((font) => (
                  <option key={font.name} value={font.family}>
                    {font.name}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Size</FormLabel>
              <RangeInput
                type="range"
                min="10"
                max="72"
                value={textSize}
                onChange={(e) => setTextSize(Number.parseInt(e.target.value))}
              />
              <RangeValues>
                <span>10px</span>
                <span>72px</span>
              </RangeValues>
            </FormGroup>
            <FormGroup>
              <FormLabel>Color</FormLabel>
              <FormInput type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Style</FormLabel>
              <TextFormatToolbar>
                <FormatButton active={textBold} onClick={() => setTextBold(!textBold)}>
                  <FiBold />
                </FormatButton>
                <FormatButton active={textItalic} onClick={() => setTextItalic(!textItalic)}>
                  <FiItalic />
                </FormatButton>
                <FormatButton active={textAlign === "left"} onClick={() => setTextAlign("left")}>
                  <FiAlignLeft />
                </FormatButton>
                <FormatButton active={textAlign === "center"} onClick={() => setTextAlign("center")}>
                  <FiAlignCenter />
                </FormatButton>
                <FormatButton active={textAlign === "right"} onClick={() => setTextAlign("right")}>
                  <FiAlignRight />
                </FormatButton>
              </TextFormatToolbar>
            </FormGroup>
            <div
              style={{
                padding: "1rem",
                border: "1px solid #eee",
                borderRadius: "4px",
                marginTop: "1rem",
                fontFamily: textFont,
                fontSize: `${textSize}px`,
                color: textColor,
                fontWeight: textBold ? "bold" : "normal",
                fontStyle: textItalic ? "italic" : "normal",
                textAlign: textAlign,
              }}
            >
              {textContent || "Preview Text"}
            </div>
            <ButtonGroup style={{ marginTop: "1.5rem" }}>
              <ActionButton onClick={() => setShowTextEditor(false)}>Cancel</ActionButton>
              <ActionButton
                onClick={addTextElement}
                style={{ backgroundColor: "#D4AF37", color: "white", borderColor: "#D4AF37" }}
              >
                Add Text
              </ActionButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}

      {showImageUploader && (
        <Modal onClick={() => setShowImageUploader(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Add Image</h2>
              <CloseButton onClick={() => setShowImageUploader(false)}>
                <FiX />
              </CloseButton>
            </ModalHeader>
            <FormGroup>
              <FormLabel>Image URL</FormLabel>
              <FormInput
                type="text"
                placeholder="https://example.com/image.jpg"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Or Upload Image</FormLabel>
              <FileUploadContainer
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <FiUpload />
                <p>Drag & drop an image here</p>
                <p className="upload-hint">or click to browse files</p>
              </FileUploadContainer>
            </FormGroup>
            <ButtonGroup style={{ marginTop: "1.5rem" }}>
              <ActionButton onClick={() => setShowImageUploader(false)}>Cancel</ActionButton>
              <ActionButton
                onClick={() => {
                  if (textContent) {
                    addImageElement(textContent)
                  } else {
                    alert("Please enter an image URL or upload an image")
                  }
                }}
                style={{ backgroundColor: "#D4AF37", color: "white", borderColor: "#D4AF37" }}
              >
                Add Image
              </ActionButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}

      {showCropTool && (
        <Modal onClick={() => setShowCropTool(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Crop Image</h2>
              <CloseButton onClick={() => setShowCropTool(false)}>
                <FiX />
              </CloseButton>
            </ModalHeader>
            <CropContainer>
              <ReactCrop
                src={cropImage}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={(c) => setCompletedCrop(c)}
              >
                <img
                  ref={cropImageRef}
                  src={cropImage || "/placeholder.svg"}
                  alt="Crop preview"
                  style={{ maxWidth: "100%" }}
                  crossOrigin="anonymous"
                />
              </ReactCrop>
            </CropContainer>
            <ButtonGroup style={{ marginTop: "1.5rem" }}>
              <ActionButton onClick={() => setShowCropTool(false)}>Cancel</ActionButton>
              <ActionButton
                onClick={applyCrop}
                style={{ backgroundColor: "#D4AF37", color: "white", borderColor: "#D4AF37" }}
              >
                Apply Crop
              </ActionButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}

      {showPreview && (
        <Modal onClick={() => setShowPreview(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Design Preview</h2>
              <CloseButton onClick={() => setShowPreview(false)}>
                <FiX />
              </CloseButton>
            </ModalHeader>
            <PreviewContainer>
              <PreviewImage>
                <CanvasBackground
                  color={colorData?.code}
                  materialImage={selectedMaterial ? materials.find((m) => m.id === selectedMaterial)?.image : null}
                />
                <CanvasImage src={templateData?.template} alt="Design Template" />
                {renderDesignElements()}
              </PreviewImage>
              <ButtonGroup>
                <ActionButton onClick={handleExportDesign}>
                  <FiDownload /> Download Design
                </ActionButton>
                <ActionButton onClick={() => setShowOrderForm(true)}>
                  <FiShoppingBag /> Order Now
                </ActionButton>
                <ActionButton onClick={() => setShowMarketplaceForm(true)}>
                  <FiTag /> Sell Design
                </ActionButton>
              </ButtonGroup>
            </PreviewContainer>
          </ModalContent>
        </Modal>
      )}

      {showMarketplaceForm && (
        <Modal onClick={() => setShowMarketplaceForm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Sell Your Design</h2>
              <CloseButton onClick={() => setShowMarketplaceForm(false)}>
                <FiX />
              </CloseButton>
            </ModalHeader>
            <TabsContainer>
              <Tab active={activeTab === "design"} onClick={() => setActiveTab("design")}>
                Design Info
              </Tab>
              <Tab active={activeTab === "pricing"} onClick={() => setActiveTab("pricing")}>
                Pricing
              </Tab>
            </TabsContainer>

            {activeTab === "design" && (
              <MarketplaceForm>
                <FormGroup>
                  <FormLabel>Design Name</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter a catchy name for your design"
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Description</FormLabel>
                  <FormTextarea
                    placeholder="Describe your design, inspiration, and what makes it special"
                    value={designDescription}
                    onChange={(e) => setDesignDescription(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Categories</FormLabel>
                  <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                    {designCategories.map((category) => (
                      <CategoryBadge key={category}>
                        {category}
                        <FiX
                          style={{ marginLeft: "0.25rem", cursor: "pointer" }}
                          onClick={() => removeCategory(category)}
                        />
                      </CategoryBadge>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <FormSelect
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{ flex: 1 }}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </FormSelect>
                    <ActionButton onClick={addCategory} disabled={!selectedCategory}>
                      Add
                    </ActionButton>
                  </div>
                </FormGroup>
                <ActionButton
                  onClick={() => setActiveTab("pricing")}
                  style={{ backgroundColor: "#D4AF37", color: "white", borderColor: "#D4AF37" }}
                >
                  Continue to Pricing
                </ActionButton>
              </MarketplaceForm>
            )}

            {activeTab === "pricing" && (
              <MarketplaceForm>
                <FormGroup>
                  <FormLabel>Price (USD)</FormLabel>
                  <PriceInput>
                    <FiDollarSign />
                    <FormInput
                      type="number"
                      placeholder="99.99"
                      value={designPrice}
                      onChange={(e) => setDesignPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </PriceInput>
                </FormGroup>
                <div
                  style={{
                    padding: "1rem",
                    background: "rgba(212, 175, 55, 0.1)",
                    borderRadius: "4px",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                    <FiShield style={{ color: "#D4AF37", marginRight: "0.5rem" }} />
                    <strong>Seller Protection</strong>
                  </div>
                  <p style={{ fontSize: "0.9rem", margin: 0 }}>
                    Your design will be protected with watermarks in the marketplace preview. Buyers will only receive
                    the full design after purchase.
                  </p>
                </div>
                <ButtonGroup>
                  <ActionButton onClick={() => setActiveTab("design")}>Back to Design Info</ActionButton>
                  <ActionButton
                    onClick={submitToMarketplace}
                    style={{ backgroundColor: "#D4AF37", color: "white", borderColor: "#D4AF37" }}
                  >
                    Submit to Marketplace
                  </ActionButton>
                </ButtonGroup>
              </MarketplaceForm>
            )}
          </ModalContent>
        </Modal>
      )}

      {showOrderForm && (
        <Modal onClick={() => setShowOrderForm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Order Your Custom Design</h2>
              <CloseButton onClick={() => setShowOrderForm(false)}>
                <FiX />
              </CloseButton>
            </ModalHeader>
            <MarketplaceForm>
              <FormGroup>
                <FormLabel>Size</FormLabel>
                <FormSelect value={orderSize} onChange={(e) => setOrderSize(e.target.value)}>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel>Quantity</FormLabel>
                <FormInput
                  type="number"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  min="1"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Special Instructions (Optional)</FormLabel>
                <FormTextarea
                  placeholder="Any special requests or notes for your order"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </FormGroup>
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(76, 175, 80, 0.1)",
                  borderRadius: "4px",
                  marginBottom: "1rem",
                  border: "1px solid rgba(76, 175, 80, 0.3)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Product:</span>
                  <strong>{templates.find((t) => t.id === selectedTemplate).name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Color:</span>
                  <strong>{colors.find((c) => c.id === selectedColor).name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Material:</span>
                  <strong>
                    {selectedMaterial ? materials.find((m) => m.id === selectedMaterial).name : "Standard"}
                  </strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Price per item:</span>
                  <strong>${Number.parseFloat(designPrice || 99.99).toFixed(2)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Quantity:</span>
                  <strong>{orderQuantity}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Subtotal:</span>
                  <strong>
                    ${(Number.parseFloat(designPrice || 99.99) * Number.parseInt(orderQuantity)).toFixed(2)}
                  </strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Shipping:</span>
                  <strong>$9.99</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Tax:</span>
                  <strong>
                    ${(Number.parseFloat(designPrice || 99.99) * Number.parseInt(orderQuantity) * 0.08).toFixed(2)}
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(76, 175, 80, 0.3)",
                    fontWeight: "bold",
                  }}
                >
                  <span>Total:</span>
                  <strong>
                    $
                    {(Number.parseFloat(designPrice || 99.99) * Number.parseInt(orderQuantity) * 1.08 + 9.99).toFixed(
                      2,
                    )}
                  </strong>
                </div>
              </div>
              <ButtonGroup>
                <ActionButton onClick={() => setShowOrderForm(false)}>Cancel</ActionButton>
                <ActionButton
                  onClick={submitOrder}
                  style={{ backgroundColor: "#D4AF37", color: "white", borderColor: "#D4AF37" }}
                >
                  Place Order
                </ActionButton>
              </ButtonGroup>
            </MarketplaceForm>
          </ModalContent>
        </Modal>
      )}

      {showSuccessToast && (
        <SuccessToast>
          <FiCheck />
          {successMessage}
        </SuccessToast>
      )}

      <CTASection>
        <div className="container">
          <CTAContent>
            <h2>Create Your Unique Fashion Statement</h2>
            <p>Sign up today and start designing clothing that reflects your personal style.</p>
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
    </PageWrapper>
  )
}

export default CustomDesignEditorPage

