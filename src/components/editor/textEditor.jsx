"use client"
import styled from "styled-components"
import { FiBold, FiItalic, FiAlignLeft, FiAlignCenter, FiAlignRight } from "react-icons/fi"
import Button from "../common/Button"
import { fonts } from "../../data/designAssets"

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const TextInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const ControlsRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 150px;
`

const FormLabel = styled.label`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
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

const FormatToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const FormatButton = styled.button`
  width: 36px;
  height: 36px;
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

  svg {
    color: ${(props) => (props.active ? "#D4AF37" : "black")};
  }
`

const PreviewContainer = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TextPreview = styled.div`
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => `${props.fontSize}px`};
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  font-style: ${(props) => (props.italic ? "italic" : "normal")};
  text-align: ${(props) => props.align};
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`

const TextEditor = ({
  text,
  setText,
  font,
  setFont,
  size,
  setSize,
  color,
  setColor,
  bold,
  setBold,
  italic,
  setItalic,
  align,
  setAlign,
  onAdd,
  onCancel,
}) => {
  return (
    <EditorContainer>
      <TextInput value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text here..." />

      <ControlsRow>
        <FormGroup>
          <FormLabel>Font</FormLabel>
          <FormSelect value={font} onChange={(e) => setFont(e.target.value)}>
            {fonts.map((fontOption) => (
              <option key={fontOption.name} value={fontOption.family}>
                {fontOption.name}
              </option>
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Size</FormLabel>
          <FormInput
            type="number"
            min="10"
            max="72"
            value={size}
            onChange={(e) => setSize(Number.parseInt(e.target.value))}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Color</FormLabel>
          <FormInput type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </FormGroup>
      </ControlsRow>

      <FormatToolbar>
        <FormatButton active={bold} onClick={() => setBold(!bold)}>
          <FiBold />
        </FormatButton>
        <FormatButton active={italic} onClick={() => setItalic(!italic)}>
          <FiItalic />
        </FormatButton>
        <FormatButton active={align === "left"} onClick={() => setAlign("left")}>
          <FiAlignLeft />
        </FormatButton>
        <FormatButton active={align === "center"} onClick={() => setAlign("center")}>
          <FiAlignCenter />
        </FormatButton>
        <FormatButton active={align === "right"} onClick={() => setAlign("right")}>
          <FiAlignRight />
        </FormatButton>
      </FormatToolbar>

      <PreviewContainer>
        <TextPreview fontFamily={font} fontSize={size} color={color} bold={bold} italic={italic} align={align}>
          {text || "Text Preview"}
        </TextPreview>
      </PreviewContainer>

      <ButtonContainer>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onAdd}>Add Text</Button>
      </ButtonContainer>
    </EditorContainer>
  )
}

export default TextEditor

