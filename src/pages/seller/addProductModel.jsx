"use client"

import { useState } from "react"
import styled from "styled-components"
import { X, Upload } from "lucide-react"

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  color: var(--text-primary);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  
  &:hover {
    background-color: var(--silver-light)15;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: var(--background);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--gold-primary);
    box-shadow: 0 0 0 2px var(--gold-light)30;
  }
`

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: var(--background);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--gold-primary);
    box-shadow: 0 0 0 2px var(--gold-light)30;
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.875rem;
  min-height: 100px;
  resize: vertical;
  background-color: var(--background);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--gold-primary);
    box-shadow: 0 0 0 2px var(--gold-light)30;
  }
`

const ImageUploadContainer = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: 6px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: var(--gold-primary);
  }
`

const ImagePreview = styled.div`
  width: 100%;
  max-width: 200px;
  height: 200px;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: var(--gold-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--gold-dark);
  }
  
  &:disabled {
    background-color: var(--silver-light);
    cursor: not-allowed;
  }
`

const AddProductModal = ({ onClose, onSubmit, loading }) => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    status: "Active",
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData({
      ...productData,
      [name]: value,
    })

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)

      // Clear error for image
      if (errors.image) {
        setErrors({
          ...errors,
          image: "",
        })
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!productData.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!productData.category.trim()) {
      newErrors.category = "Category is required"
    }

    if (!productData.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number.parseFloat(productData.price)) || Number.parseFloat(productData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    if (!productData.stock.trim()) {
      newErrors.stock = "Stock quantity is required"
    } else if (isNaN(Number.parseInt(productData.stock)) || Number.parseInt(productData.stock) < 0) {
      newErrors.stock = "Stock must be a non-negative number"
    }

    if (!image) {
      newErrors.image = "Product image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const formData = {
        ...productData,
        price: Number.parseFloat(productData.price),
        stock: Number.parseInt(productData.stock),
        image: image,
      }

      onSubmit(formData)
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Add New Product</h2>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Product Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            {errors.name && <span style={{ color: "#f44336", fontSize: "0.75rem" }}>{errors.name}</span>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Select id="category" name="category" value={productData.category} onChange={handleChange}>
              <option value="">Select a category</option>
              <option value="Evening Wear">Evening Wear</option>
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
              <option value="Accessories">Accessories</option>
              <option value="Outerwear">Outerwear</option>
            </Select>
            {errors.category && <span style={{ color: "#f44336", fontSize: "0.75rem" }}>{errors.category}</span>}
          </FormGroup>

          <div style={{ display: "flex", gap: "1rem" }}>
            <FormGroup style={{ flex: 1 }}>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.price && <span style={{ color: "#f44336", fontSize: "0.75rem" }}>{errors.price}</span>}
            </FormGroup>

            <FormGroup style={{ flex: 1 }}>
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                type="number"
                id="stock"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                step="1"
              />
              {errors.stock && <span style={{ color: "#f44336", fontSize: "0.75rem" }}>{errors.stock}</span>}
            </FormGroup>
          </div>

          <FormGroup>
            <Label htmlFor="status">Status</Label>
            <Select id="status" name="status" value={productData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="OutOfStock">Out of Stock</option>
              <option value="Pending">Pending</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </FormGroup>

          <FormGroup>
            <Label>Product Image</Label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            <ImageUploadContainer as="label" htmlFor="image">
              <Upload size={24} color="var(--text-secondary)" />
              <span>Click to upload an image</span>
              {imagePreview && (
                <ImagePreview>
                  <img src={imagePreview || "/placeholder.svg"} alt="Product preview" />
                </ImagePreview>
              )}
            </ImageUploadContainer>
            {errors.image && <span style={{ color: "#f44336", fontSize: "0.75rem" }}>{errors.image}</span>}
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  )
}

export default AddProductModal

