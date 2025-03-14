"use client"

import { useState } from "react"
import styled from "styled-components"
import { Package, Edit, Trash2, X } from "lucide-react"

import DashboardLayout from "../../Layouts/Dashboard-Layout"
import DataTable from "../../components/common/DataTable"

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const PageDescription = styled.p`
  font-size: 1rem;
  color: var(--color-foreground);
  opacity: 0.7;
  margin-bottom: 2rem;
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }
  
  button {
    background: none;
    border: none;
    color: var(--color-foreground);
    cursor: pointer;
    
    &:hover {
      color: var(--color-error);
    }
  }
`

const ModalBody = styled.div`
  padding: 1.5rem;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
`

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background-color: var(--color-primary);
    color: white;
    border: none;
    
    &:hover {
      background-color: var(--color-primary-dark);
    }
  }
  
  &.secondary {
    background-color: var(--color-background);
    color: var(--color-foreground);
    border: 1px solid var(--color-border);
    
    &:hover {
      background-color: var(--color-muted);
    }
  }
  
  &.danger {
    background-color: var(--color-error);
    color: white;
    border: none;
    
    &:hover {
      background-color: #d32f2f;
    }
  }
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-size: 0.875rem;
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .error {
    color: var(--color-error);
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border-radius: var(--radius-md);
  border: 1px dashed var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder {
    color: var(--color-foreground);
    opacity: 0.5;
    text-align: center;
    padding: 1rem;
  }
`

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("add") // 'add', 'edit', 'view', 'delete'
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    status: "active",
  })

  // Mock data for products
  const products = [
    {
      id: "PRD-001",
      name: "Summer Dress - Floral",
      category: "Dresses",
      price: "$89.99",
      stock: 24,
      status: "active",
      image: "/placeholder.svg?height=200&width=200",
      description: "A beautiful floral summer dress perfect for warm weather.",
    },
    {
      id: "PRD-002",
      name: "Formal Blazer - Black",
      category: "Formal Wear",
      price: "$129.99",
      stock: 8,
      status: "low-stock",
      image: "/placeholder.svg?height=200&width=200",
      description: "Classic black blazer for formal occasions.",
    },
    {
      id: "PRD-003",
      name: "Casual T-Shirt - Blue",
      category: "Casual Wear",
      price: "$29.99",
      stock: 42,
      status: "active",
      image: "/placeholder.svg?height=200&width=200",
      description: "Comfortable blue t-shirt for everyday wear.",
    },
    {
      id: "PRD-004",
      name: "Evening Gown - Red",
      category: "Formal Wear",
      price: "$199.99",
      stock: 0,
      status: "out-of-stock",
      image: "/placeholder.svg?height=200&width=200",
      description: "Elegant red evening gown for special occasions.",
    },
    {
      id: "PRD-005",
      name: "Jeans - Slim Fit",
      category: "Casual Wear",
      price: "$59.99",
      stock: 15,
      status: "active",
      image: "/placeholder.svg?height=200&width=200",
      description: "Classic slim fit jeans for a modern look.",
    },
  ]

  // Columns for products table
  const productColumns = [
    {
      header: "Image",
      accessor: "image",
      cell: (row) => (
        <img
          src={row.image || "/placeholder.svg"}
          alt={row.name}
          style={{ width: "50px", height: "50px", borderRadius: "var(--radius-md)", objectFit: "cover" }}
        />
      ),
    },
    { header: "Product ID", accessor: "id", sortable: true },
    { header: "Name", accessor: "name", sortable: true },
    { header: "Category", accessor: "category", sortable: true },
    { header: "Price", accessor: "price", sortable: true },
    { header: "Stock", accessor: "stock", sortable: true },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      cell: (row) => {
        let statusClass = ""
        let statusText = ""

        switch (row.status) {
          case "active":
            statusClass = "success"
            statusText = "Active"
            break
          case "low-stock":
            statusClass = "warning"
            statusText = "Low Stock"
            break
          case "out-of-stock":
            statusClass = "error"
            statusText = "Out of Stock"
            break
          default:
            statusClass = "info"
            statusText = row.status
        }

        return <span className={`badge ${statusClass}`}>{statusText}</span>
      },
    },
  ]

  // Handle opening modal for add, edit, view, delete
  const handleOpenModal = (mode, product = null) => {
    setModalMode(mode)
    setSelectedProduct(product)

    if (mode === "add") {
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: "",
        status: "active",
      })
    } else if (product) {
      // Remove $ from price
      const price = product.price.replace("$", "")

      setFormData({
        name: product.name,
        category: product.category,
        price,
        stock: product.stock,
        description: product.description,
        image: product.image,
        status: product.status,
      })
    }

    setIsModalOpen(true)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Here you would typically make an API call to save the data

    // Close the modal
    setIsModalOpen(false)
  }

  // Handle delete confirmation
  const handleDelete = () => {
    console.log("Delete product:", selectedProduct)
    // Here you would typically make an API call to delete the product

    // Close the modal
    setIsModalOpen(false)
  }

  // Render modal content based on mode
  const renderModalContent = () => {
    switch (modalMode) {
      case "add":
        return (
          <>
            <ModalHeader>
              <h2>Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </ModalHeader>
            <ModalBody>
              <ImagePreview>
                {formData.image ? (
                  <img src={formData.image || "/placeholder.svg"} alt="Product preview" />
                ) : (
                  <div className="placeholder">
                    <Package size={48} />
                    <p>Product image preview</p>
                  </div>
                )}
              </ImagePreview>

              <FormGroup>
                <label htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="">Select category</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Formal Wear">Formal Wear</option>
                    <option value="Casual Wear">Casual Wear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="active">Active</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button className="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button className="primary" onClick={handleSubmit}>
                Add Product
              </Button>
            </ModalFooter>
          </>
        )

      case "edit":
        return (
          <>
            <ModalHeader>
              <h2>Edit Product</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </ModalHeader>
            <ModalBody>
              <ImagePreview>
                {formData.image ? (
                  <img src={formData.image || "/placeholder.svg"} alt="Product preview" />
                ) : (
                  <div className="placeholder">
                    <Package size={48} />
                    <p>Product image preview</p>
                  </div>
                )}
              </ImagePreview>

              <FormGroup>
                <label htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="">Select category</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Formal Wear">Formal Wear</option>
                    <option value="Casual Wear">Casual Wear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="active">Active</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button className="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button className="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )

      case "view":
        return (
          <>
            <ModalHeader>
              <h2>Product Details</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </ModalHeader>
            <ModalBody>
              <ImagePreview>
                {selectedProduct?.image && (
                  <img src={selectedProduct.image || "/placeholder.svg"} alt={selectedProduct.name} />
                )}
              </ImagePreview>

              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                  {selectedProduct?.name}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-foreground)", opacity: "0.7" }}>
                  {selectedProduct?.id}
                </p>
              </div>

              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}
              >
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Category</p>
                  <p>{selectedProduct?.category}</p>
                </div>

                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Price</p>
                  <p>{selectedProduct?.price}</p>
                </div>

                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Stock</p>
                  <p>{selectedProduct?.stock}</p>
                </div>

                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Status</p>
                  <span className={`badge ${selectedProduct?.status}`}>
                    {selectedProduct?.status === "active"
                      ? "Active"
                      : selectedProduct?.status === "low-stock"
                        ? "Low Stock"
                        : selectedProduct?.status === "out-of-stock"
                          ? "Out of Stock"
                          : selectedProduct?.status}
                  </span>
                </div>
              </div>

              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem" }}>Description</p>
                <p style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>{selectedProduct?.description}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button className="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button
                className="primary"
                onClick={() => {
                  setIsModalOpen(false)
                  handleOpenModal("edit", selectedProduct)
                }}
              >
                <Edit size={16} />
                Edit Product
              </Button>
            </ModalFooter>
          </>
        )

      case "delete":
        return (
          <>
            <ModalHeader>
              <h2>Delete Product</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete the product "{selectedProduct?.name}"?</p>
              <p style={{ marginTop: "0.5rem", color: "var(--color-error)" }}>This action cannot be undone.</p>
            </ModalBody>
            <ModalFooter>
              <Button className="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button className="danger" onClick={handleDelete}>
                <Trash2 size={16} />
                Delete Product
              </Button>
            </ModalFooter>
          </>
        )

      default:
        return null
    }
  }

  return (
    <DashboardLayout title="Product Management">
      <PageTitle>Product Management</PageTitle>
      <PageDescription>Manage your fashion products inventory</PageDescription>

      <DataTable
        title="Products"
        description="View and manage all products in your inventory"
        columns={productColumns}
        data={products}
        onView={(row) => handleOpenModal("view", row)}
        onEdit={(row) => handleOpenModal("edit", row)}
        onDelete={(row) => handleOpenModal("delete", row)}
        addButtonLabel="Add Product"
        onAdd={() => handleOpenModal("add")}
      />

      {isModalOpen && (
        <Modal>
          <ModalContent>{renderModalContent()}</ModalContent>
        </Modal>
      )}
    </DashboardLayout>
  )
}

export default ProductsPage

