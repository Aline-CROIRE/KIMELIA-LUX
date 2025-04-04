"use client"

import { useState, useRef } from "react"
import styled from "styled-components"
import { FiUpload, FiLink, FiImage } from "react-icons/fi"

const UploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const UploadTabs = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${(props) => (props.active ? "rgba(212, 175, 55, 0.1)" : "transparent")};
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? "#D4AF37" : "transparent")};
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    font-size: 1rem;
  }
`

const TabContent = styled.div`
  padding: 1rem 0;
`

const DropZone = styled.div`
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
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

const UrlInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const PreviewContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImagePreview = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => (props.primary ? "#D4AF37" : "white")};
  color: ${(props) => (props.primary ? "white" : "#333")};
  border: 1px solid ${(props) => (props.primary ? "#D4AF37" : "#e0e0e0")};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${(props) => (props.primary ? "#c4a030" : "#f0f0f0")};
  }
`

const ErrorMessage = styled.div`
  color: #e53935;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const ImageUploader = ({ onImageUpload, onCancel }) => {
  const [activeTab, setActiveTab] = useState("upload")
  const [imageUrl, setImageUrl] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [error, setError] = useState("")
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file type
    if (!file.type.match("image.*")) {
      setError("Please select an image file (JPEG, PNG, GIF, etc.)")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB")
      return
    }

    setError("")
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]

      // Check file type
      if (!file.type.match("image.*")) {
        setError("Please select an image file (JPEG, PNG, GIF, etc.)")
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB")
        return
      }

      setError("")
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value)
  }

  const handleUrlSubmit = () => {
    if (!imageUrl) {
      setError("Please enter an image URL")
      return
    }

    // Simple URL validation
    if (!imageUrl.match(/^(http|https):\/\/[^ "]+$/)) {
      setError("Please enter a valid URL")
      return
    }

    setError("")
    setPreviewUrl(imageUrl)
  }

  const handleAddImage = () => {
    if (!previewUrl) {
      setError("Please select or enter an image first")
      return
    }

    onImageUpload(previewUrl)
  }

  return (
    <UploaderContainer>
      <UploadTabs>
        <Tab active={activeTab === "upload"} onClick={() => setActiveTab("upload")}>
          <FiUpload /> Upload
        </Tab>
        <Tab active={activeTab === "url"} onClick={() => setActiveTab("url")}>
          <FiLink /> URL
        </Tab>
      </UploadTabs>

      <TabContent>
        {activeTab === "upload" ? (
          <>
            <DropZone onClick={() => fileInputRef.current.click()} onDrop={handleDrop} onDragOver={handleDragOver}>
              <FiImage />
              <p>Drag and drop an image here</p>
              <p className="upload-hint">or click to browse files</p>
              <HiddenInput type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
            </DropZone>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </>
        ) : (
          <>
            <div>
              <UrlInput type="text" placeholder="Enter image URL..." value={imageUrl} onChange={handleUrlChange} />
              <Button style={{ marginTop: "0.75rem" }} onClick={handleUrlSubmit}>
                Preview
              </Button>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>
          </>
        )}

        {previewUrl && (
          <PreviewContainer>
            <ImagePreview>
              <img src={previewUrl || "/placeholder.svg"} alt="Preview" />
            </ImagePreview>
          </PreviewContainer>
        )}
      </TabContent>

      <ButtonContainer>
        <Button onClick={onCancel}>Cancel</Button>
        <Button primary onClick={handleAddImage}>
          Add Image
        </Button>
      </ButtonContainer>
    </UploaderContainer>
  )
}

export default ImageUploader

