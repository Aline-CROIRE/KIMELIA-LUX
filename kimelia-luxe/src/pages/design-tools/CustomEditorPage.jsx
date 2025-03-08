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

// *** UTILITY FUNCTIONS ***
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

// *** STYLED COMPONENTS ***

const PageWrapper = styled.div`
  background: #f5f5f5;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`

const HeroSection = styled.section`
  background: linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.7)),
    url('/images/custom-editor-hero.jpg');
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
      var(--gold-primary) 0%,
      var(--gold-light) 50%,
      var(--gold-primary) 100%
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
  transform: scale(${(props) => props.zoom / 100});
  transition: transform 0.3s ease;

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
  background: ${(props) =>
    props.selected ? "rgba(212, 175, 55, 0.1)" : "transparent"};
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
  background: linear-gradient(to right, var(--luxury-black), #1a1a1a);
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
      var(--gold-primary) 0%,
      var(--gold-light) 50%,
      var(--gold-primary) 100%
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

  a {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`
const PreviewButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`

// *** MOCK DATA ***

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

const historyData = [
  { id: 1, action: "Changed color to Black" },
  { id: 2, action: "Added logo" },
  { id: 3, action: "Resized text" },
  { id: 4, action: "Changed material to Cotton" },
]

// *** COMPONENT ***

const CustomDesignEditorPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [selectedColor, setSelectedColor] = useState(1)
  const [selectedMaterial, setSelectedMaterial] = useState(1)
  const [selectedElement, setSelectedElement] = useState(1)
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [elementX, setElementX] = useState(50) // Initialize X position
  const [elementY, setElementY] = useState(50) // Initialize Y position
  const [elementSize, setElementSize] = useState(100) // Initialize Size
  const [elementRotation, setElementRotation] = useState(0) // Initialize Rotation
  const [elementOpacity, setElementOpacity] = useState(100) // Initialize Opacity
  const [history, setHistory] = useState(historyData) // Initialize History

  const handleZoom = (amount) => {
    setZoom(clamp(zoom + amount, 50, 150))
  }

  return (
    <PageWrapper>
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
                  onClick={() => {
                    setSelectedColor(color.id)
                    setHistory([
                      ...history,
                      { id: Date.now(), action: `Changed color to ${color.name}` },
                    ]) // Added history
                  }}
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
                  onClick={() => {
                    setSelectedMaterial(material.id)
                    setHistory([
                      ...history,
                      { id: Date.now(), action: `Changed material to ${material.name}` },
                    ]) // Added history
                  }}
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
            <Canvas zoom={zoom}>
              <CanvasImage src="/placeholder.svg?height=600&width=500" alt="Design Preview" />
            </Canvas>
          </CanvasContainer>
          <CanvasControls>
            <CanvasControlButton onClick={() => handleZoom(-10)}>
              <FiMinus />
            </CanvasControlButton>
            <CanvasControlButton onClick={() => handleZoom(10)}>
              <FiPlus />
            </CanvasControlButton>
            <CanvasControlButton
              onClick={() => {
                // Basic Rotation - Enhance as needed
                setElementRotation((prev) => prev + 45)
              }}
            >
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
                <RangeInput
                  type="range"
                  min="0"
                  max="100"
                  value={elementX}
                  onChange={(e) => {
                    setElementX(parseInt(e.target.value))
                    setHistory([
                      ...history,
                      { id: Date.now(), action: `Changed Position X to ${e.target.value}` },
                    ]) // Added history
                  }}
                />
                <RangeValues>
                  <span>0</span>
                  <span>100</span>
                </RangeValues>
              </FormGroup>
              <FormGroup>
                <FormLabel>Position Y</FormLabel>
                <RangeInput
                  type="range"
                  min="0"
                  max="100"
                  value={elementY}
                  onChange={(e) => {
                    setElementY(parseInt(e.target.value))
                    setHistory([
                      ...history,
                      { id: Date.now(), action: `Changed Position Y to ${e.target.value}` },
                    ]) // Added history
                  }}
                />
                <RangeValues>
                  <span>0</span>
                  <span>100</span>
                </RangeValues>
              </FormGroup>
              <FormGroup>
                <FormLabel>Size</FormLabel>
                <RangeInput
                  type="range"
                  min="10"
                  max="200"
                  value={elementSize}
                  onChange={(e) => {
                    setElementSize(parseInt(e.target.value))
                    setHistory([
                      ...history,
                      { id: Date.now(), action: `Changed Size to ${e.target.value}` },
                    ]) // Added history
                  }}
                />
                <RangeValues>
                  <span>10%</span>
                  <span>200%</span>
                </RangeValues>
              </FormGroup>
              <FormGroup>
                <FormLabel>Rotation</FormLabel>
                <RangeInput
                  type="range"
                  min="0"
                  max="360"
                  value={elementRotation}
                  onChange={(e) => {
                    setElementRotation(parseInt(e.target.value))
                    setHistory([
                      ...history,
                      { id: Date.now(), action: `Changed Rotation to ${e.target.value}` },
                    ]) // Added history
                  }}
                />
                <RangeValues>
                  <span>0°</span>
                  <span>360°</span>
                </RangeValues>
              </FormGroup>
              <FormGroup>
                <FormLabel>Opacity</FormLabel>
                <RangeInput
                  type="range"
                  min="0"
                  max="100"
                  value={elementOpacity}
                  onChange={(e) => {
                    setElementOpacity(parseInt(e.target.value))
                    setHistory([
                      ...history,
                      { id: Date.now(), action: `Changed Opacity to ${e.target.value}` },
                    ]) // Added history
                  }}
                />
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
    </PageWrapper>
  )
}

export default CustomDesignEditorPage