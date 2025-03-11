"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { 
  FiShoppingBag, 
  FiHeart, 
  FiEye, 
  FiFilter, 
  FiX, 
  FiChevronDown, 
  FiGrid, 
  FiList,
  FiSliders,
  FiCheck,
  FiArrowLeft,
  FiArrowRight,
  FiStar
} from "react-icons/fi"
import Button from "../components/common/Button"

// Sample product data
const products = [
  {
    id: 1,
    name: "Elegant Evening Gown",
    designer: "KIM Couture",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    isCustom: false,
    rating: 4.8,
    reviewCount: 24,
    isNew: true,
    isSale: true,
    colors: ["#000000", "#000080", "#800020"],
    sizes: ["XS", "S", "M", "L"],
    tags: ["Formal", "Evening", "Luxury"]
  },
  {
    id: 2,
    name: "Tailored Business Suit",
    designer: "Modern Tailor",
    price: 399.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Suits",
    isCustom: true,
    rating: 4.9,
    reviewCount: 18,
    isNew: false,
    isSale: false,
    colors: ["#000000", "#1a1a1a", "#333333"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["Formal", "Business", "Custom"]
  },
  {
    id: 3,
    name: "Summer Collection Blouse",
    designer: "Fresh Designs",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Tops",
    isCustom: false,
    rating: 4.5,
    reviewCount: 32,
    isNew: true,
    isSale: true,
    colors: ["#ffffff", "#ffb6c1", "#add8e6"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["Casual", "Summer", "Lightweight"]
  },
  {
    id: 4,
    name: "Handcrafted Leather Jacket",
    designer: "Artisan Leathers",
    price: 499.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    isCustom: true,
    rating: 5.0,
    reviewCount: 15,
    isNew: true,
    isSale: false,
    colors: ["#8b4513", "#000000", "#a52a2a"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["Casual", "Leather", "Handmade"]
  },
  {
    id: 5,
    name: "Casual Denim Collection",
    designer: "Urban Style",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Jeans",
    isCustom: false,
    rating: 4.3,
    reviewCount: 41,
    isNew: false,
    isSale: false,
    colors: ["#000080", "#4169e1", "#1e90ff"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tags: ["Casual", "Denim", "Everyday"]
  },
  {
    id: 6,
    name: "Silk Evening Scarf",
    designer: "Luxury Accessories",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    isCustom: false,
    rating: 4.7,
    reviewCount: 28,
    isNew: false,
    isSale: true,
    colors: ["#ff0000", "#800080", "#ffd700"],
    sizes: ["One Size"],
    tags: ["Accessories", "Silk", "Luxury"]
  },
  {
    id: 7,
    name: "Custom Wedding Dress",
    designer: "Bridal Dreams",
    price: 1299.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Wedding",
    isCustom: true,
    rating: 5.0,
    reviewCount: 9,
    isNew: true,
    isSale: false,
    colors: ["#ffffff", "#fffdd0", "#f5f5dc"],
    sizes: ["Custom"],
    tags: ["Wedding", "Bridal", "Custom"]
  },
  {
    id: 8,
    name: "Handmade Wool Sweater",
    designer: "Cozy Knits",
    price: 149.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Knitwear",
    isCustom: true,
    rating: 4.6,
    reviewCount: 22,
    isNew: false,
    isSale: true,
    colors: ["#a0522d", "#deb887", "#d2b48c"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["Casual", "Winter", "Handmade"]
  },
  {
    id: 9,
    name: "Designer Sunglasses",
    designer: "Luxury Accessories",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    isCustom: false,
    rating: 4.4,
    reviewCount: 17,
    isNew: true,
    isSale: false,
    colors: ["#000000", "#8b4513", "#708090"],
    sizes: ["One Size"],
    tags: ["Accessories", "Summer", "Luxury"]
  },
  {
    id: 10,
    name: "Embroidered Cocktail Dress",
    designer: "KIM Couture",
    price: 249.99,
    originalPrice: 299.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    isCustom: false,
    rating: 4.9,
    reviewCount: 13,
    isNew: false,
    isSale: true,
    colors: ["#000000", "#800080", "#008080"],
    sizes: ["XS", "S", "M", "L"],
    tags: ["Formal", "Cocktail", "Embroidered"]
  },
  {
    id: 11,
    name: "Linen Summer Shirt",
    designer: "Fresh Designs",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Tops",
    isCustom: false,
    rating: 4.2,
    reviewCount: 31,
    isNew: true,
    isSale: false,
    colors: ["#ffffff", "#f5f5dc", "#add8e6"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["Casual", "Summer", "Linen"]
  },
  {
    id: 12,
    name: "Handcrafted Leather Bag",
    designer: "Artisan Leathers",
    price: 349.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    isCustom: true,
    rating: 4.8,
    reviewCount: 19,
    isNew: false,
    isSale: true,
    colors: ["#8b4513", "#000000", "#a52a2a"],
    sizes: ["One Size"],
    tags: ["Accessories", "Leather", "Handmade"]
  }
];

// Sample categories
const categories = [
  { id: 1, name: "Dresses", count: 42 },
  { id: 2, name: "Suits", count: 28 },
  { id: 3, name: "Tops", count: 56 },
  { id: 4, name: "Outerwear", count: 31 },
  { id: 5, name: "Jeans", count: 25 },
  { id: 6, name: "Accessories", count: 47 },
  { id: 7, name: "Wedding", count: 18 },
  { id: 8, name: "Knitwear", count: 22 }
];

// Sample designers
const designers = [
  { id: 1, name: "KIM Couture", count: 24 },
  { id: 2, name: "Modern Tailor", count: 18 },
  { id: 3, name: "Fresh Designs", count: 32 },
  { id: 4, name: "Artisan Leathers", count: 15 },
  { id: 5, name: "Urban Style", count: 27 },
  { id: 6, name: "Luxury Accessories", count: 19 },
  { id: 7, name: "Bridal Dreams", count: 12 },
  { id: 8, name: "Cozy Knits", count: 16 }
];

const PageWrapper = styled.div`
  background: white;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const ShopHeader = styled.div`
  background: linear-gradient(to right, #000, #333);
  color: white;
  padding: 3rem 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    font-size: 1.1rem;
    max-width: 600px;
    opacity: 0.9;
  }
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #D4AF37;
    }
  }
  
  span {
    margin: 0 0.5rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ShopContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FilterSidebar = styled.aside`
  @media (max-width: 992px) {
    display: ${props => props.mobileOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 1000;
    overflow-y: auto;
    padding: 2rem;
  }
`;

const MobileFilterHeader = styled.div`
  display: none;
  
  @media (max-width: 992px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h3 {
      font-size: 1.5rem;
    }
    
    button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    button {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.5);
      
      &:hover {
        color: #D4AF37;
      }
    }
  }
`;

const FilterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FilterItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FilterCheckbox = styled.div`
  display: flex;
  align-items: center;
  
  input {
    margin-right: 0.75rem;
    cursor: pointer;
    
    &:checked {
      accent-color: #D4AF37;
    }
  }
  
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    
    span.count {
      font-size: 0.85rem;
      color: rgba(0, 0, 0, 0.5);
      background: rgba(0, 0, 0, 0.05);
      padding: 0.1rem 0.5rem;
      border-radius: 12px;
    }
  }
`;

const PriceRange = styled.div`
  margin-top: 1rem;
`;

const PriceInputs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const PriceInput = styled.div`
  flex: 1;
  
  label {
    display: block;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    color: rgba(0, 0, 0, 0.6);
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    
    &:focus {
      outline: none;
      border-color: #D4AF37;
    }
  }
`;

const ColorOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ColorOption = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.selected ? '#D4AF37' : 'transparent'};
  position: relative;
  
  &:hover {
    transform: scale(1.1);
  }
  
  ${props => props.selected && `
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E") no-repeat center center;
      background-size: contain;
    }
  `}
`;

const ApplyFiltersButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  
  @media (min-width: 993px) {
    display: none;
  }
`;

const ShopContent = styled.div`
  width: 100%;
`;

const ShopControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ResultCount = styled.div`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  
  span {
    font-weight: 600;
    color: black;
  }
`;

const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SortDropdown = styled.div`
  position: relative;
  min-width: 200px;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    border-color: #D4AF37;
  }
`;

const SortOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-top: 0.25rem;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const SortOption = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    color: #D4AF37;
    opacity: ${props => props.selected ? 1 : 0};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.active ? 'rgba(0, 0, 0, 0.05)' : 'white'};
  border: none;
  cursor: pointer;
  color: ${props => props.active ? '#D4AF37' : 'rgba(0, 0, 0, 0.5)'};
  
  &:hover {
    color: #D4AF37;
  }
`;

const MobileFilterButton = styled.button`
  display: none;
  
  @media (max-width: 992px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    
    &:hover {
      border-color: #D4AF37;
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${props => props.viewMode === 'grid' ? '250px' : '100%'}, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: ${props => props.viewMode === 'grid' ? 'block' : 'flex'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  position: relative;
  aspect-ratio: ${props => props.viewMode === 'grid' ? '3/4' : 'auto'};
  width: ${props => props.viewMode === 'grid' ? '100%' : '300px'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Badge = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  
  &.new {
    background: #000;
    color: white;
  }
  
  &.sale {
    background: #D4AF37;
    color: black;
  }
  
  &.custom {
    background: #4A90E2;
    color: white;
  }
`;

const ProductActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: rgba(0, 0, 0, 0.7);
  
  &:hover {
    background: #D4AF37;
    color: white;
    transform: translateY(-2px);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

const ProductCategory = styled.div`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #D4AF37;
    }
  }
`;

const ProductDesigner = styled.div`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 0.75rem;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  
  svg {
    color: #FFC107;
  }
  
  span {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  .current {
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .original {
    font-size: 0.9rem;
    text-decoration: line-through;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const ProductColors = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

const ProductColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProductSizes = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const ProductSize = styled.div`
  font-size: 0.75rem;
  padding: 0.15rem 0.4rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.7);
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
  }
  
  svg {
    font-size: 1rem;
  }
`;

const QuickViewButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    border-color: black;
  }
  
  svg {
    font-size: 1rem;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const PaginationButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${props => props.active ? 'black' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  margin: 0 0.25rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: black;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuickViewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const ModalImage = styled.div`
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ModalInfo = styled.div`
  padding: 2rem;
`;

const ModalCategory = styled.div`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.5rem;
`;

const ModalName = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
`;

const ModalDesigner = styled.div`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
`;

const ModalRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  svg {
    color: #FFC107;
  }
  
  span {
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const ModalPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  .current {
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .original {
    font-size: 1.1rem;
    text-decoration: line-through;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const ModalDescription = styled.div`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.8);
`;

const ModalOptions = styled.div`
  margin-bottom: 1.5rem;
`;

const OptionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.75rem;
`;

const ModalColors = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ModalColor = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.selected ? 'black' : 'transparent'};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ModalSizes = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const ModalSize = styled.div`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.selected ? 'black' : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => props.selected ? 'black' : 'transparent'};
  color: ${props => props.selected ? 'white' : 'black'};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    border-color: black;
  }
`;

const ModalQuantity = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: none;
  border-right: none;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ModalAddToCart = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
  }
`;

const ModalViewDetails = styled(Link)`
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
 
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: black;
  }
`;

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  const handleSortChange = (option) => {
    setSortOption(option);
    setSortOpen(false);
  };
  
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
  };
  
  const closeQuickView = () => {
    setQuickViewOpen(false);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  return (
    <PageWrapper>
      <ShopHeader>
        <HeaderContent>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/marketplace">Marketplace</Link>
            <span>/</span>
            <span>Shop</span>
          </Breadcrumb>
          <h1>Shop Our Collection</h1>
          <p>Discover our curated selection of ready-made and custom fashion pieces from talented designers around the world.</p>
        </HeaderContent>
      </ShopHeader>
      
      <ShopContainer>
        <FilterSidebar mobileOpen={mobileFiltersOpen}>
          <MobileFilterHeader>
            <h3>Filters</h3>
            <button onClick={() => setMobileFiltersOpen(false)}>
              <FiX />
            </button>
          </MobileFilterHeader>
          
          <FilterSection>
            <h3>
              Categories
              <button>
                <FiChevronDown />
              </button>
            </h3>
            <FilterList>
              {categories.map(category => (
                <FilterItem key={category.id}>
                  <FilterCheckbox>
                    <input type="checkbox" id={`category-${category.id}`} />
                    <label htmlFor={`category-${category.id}`}>
                      {category.name}
                      <span className="count">{category.count}</span>
                    </label>
                  </FilterCheckbox>
                </FilterItem>
              ))}
            </FilterList>
          </FilterSection>
          
          <FilterSection>
            <h3>
              Designers
              <button>
                <FiChevronDown />
              </button>
            </h3>
            <FilterList>
              {designers.map(designer => (
                <FilterItem key={designer.id}>
                  <FilterCheckbox>
                    <input type="checkbox" id={`designer-${designer.id}`} />
                    <label htmlFor={`designer-${designer.id}`}>
                      {designer.name}
                      <span className="count">{designer.count}</span>
                    </label>
                  </FilterCheckbox>
                </FilterItem>
              ))}
            </FilterList>
          </FilterSection>
          
          <FilterSection>
            <h3>
              Price Range
              <button>
                <FiChevronDown />
              </button>
            </h3>
            <PriceRange>
              <PriceInputs>
                <PriceInput>
                  <label>Min</label>
                  <input type="number" placeholder="0" />
                </PriceInput>
                <PriceInput>
                  <label>Max</label>
                  <input type="number" placeholder="1000" />
                </PriceInput>
              </PriceInputs>
              <Button  variant="outline" size="sm">Apply</Button>
            </PriceRange>
          </FilterSection>
          
          <FilterSection>
            <h3>
              Product Type
              <button>
                <FiChevronDown />
              </button>
            </h3>
            <FilterList>
              <FilterItem>
                <FilterCheckbox>
                  <input type="checkbox" id="type-ready" />
                  <label htmlFor="type-ready">
                    Ready-made
                  </label>
                </FilterCheckbox>
              </FilterItem>
              <FilterItem>
                <FilterCheckbox>
                  <input type="checkbox" id="type-custom" />
                  <label htmlFor="type-custom">
                    Custom Design
                  </label>
                </FilterCheckbox>
              </FilterItem>
            </FilterList>
          </FilterSection>
          
          <FilterSection>
            <h3>
              Colors
              <button>
                <FiChevronDown />
              </button>
            </h3>
            <ColorOptions>
              <ColorOption color="#000000" selected={false} />
              <ColorOption color="#ffffff" selected={false} />
              <ColorOption color="#ff0000" selected={false} />
              <ColorOption color="#0000ff" selected={false} />
              <ColorOption color="#008000" selected={false} />
              <ColorOption color="#800080" selected={false} />
              <ColorOption color="#ffd700" selected={false} />
              <ColorOption color="#a52a2a" selected={false} />
            </ColorOptions>
          </FilterSection>
          
          <ApplyFiltersButton onClick={() => setMobileFiltersOpen(false)}>
            Apply Filters
          </ApplyFiltersButton>
        </FilterSidebar>
        
        <ShopContent>
          <ShopControls>
            <ResultCount>
              Showing <span>{indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}</span> of <span>{products.length}</span> products
            </ResultCount>
            
            <ControlsRight>
              <MobileFilterButton onClick={() => setMobileFiltersOpen(true)}>
                <FiSliders /> Filters
              </MobileFilterButton>
              
              <SortDropdown>
                <SortButton onClick={() => setSortOpen(!sortOpen)}>
                  Sort by: {sortOption === 'featured' ? 'Featured' : 
                           sortOption === 'price-low' ? 'Price: Low to High' : 
                           sortOption === 'price-high' ? 'Price: High to Low' : 
                           sortOption === 'newest' ? 'Newest' : 'Best Selling'}
                  <FiChevronDown />
                </SortButton>
                
                <SortOptions isOpen={sortOpen}>
                  <SortOption 
                    selected={sortOption === 'featured'} 
                    onClick={() => handleSortChange('featured')}
                  >
                    Featured
                    {sortOption === 'featured' && <FiCheck />}
                  </SortOption>
                  <SortOption 
                    selected={sortOption === 'price-low'} 
                    onClick={() => handleSortChange('price-low')}
                  >
                    Price: Low to High
                    {sortOption === 'price-low' && <FiCheck />}
                  </SortOption>
                  <SortOption 
                    selected={sortOption === 'price-high'} 
                    onClick={() => handleSortChange('price-high')}
                  >
                    Price: High to Low
                    {sortOption === 'price-high' && <FiCheck />}
                  </SortOption>
                  <SortOption 
                    selected={sortOption === 'newest'} 
                    onClick={() => handleSortChange('newest')}
                  >
                    Newest
                    {sortOption === 'newest' && <FiCheck />}
                  </SortOption>
                  <SortOption 
                    selected={sortOption === 'best-selling'} 
                    onClick={() => handleSortChange('best-selling')}
                  >
                    Best Selling
                    {sortOption === 'best-selling' && <FiCheck />}
                  </SortOption>
                </SortOptions>
              </SortDropdown>
              
              <ViewToggle>
                <ViewButton 
                  active={viewMode === 'grid'} 
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </ViewButton>
                <ViewButton 
                  active={viewMode === 'list'} 
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </ViewButton>
              </ViewToggle>
            </ControlsRight>
          </ShopControls>
          
          <ProductGrid viewMode={viewMode}>
            {currentProducts.map(product => (
              <ProductCard key={product.id} viewMode={viewMode}>
                <ProductImage viewMode={viewMode}>
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  <ProductBadges>
                    {product.isNew && <Badge className="new">New</Badge>}
                    {product.isSale && <Badge className="sale">Sale</Badge>}
                    {product.isCustom && <Badge className="custom">Custom</Badge>}
                  </ProductBadges>
                  <ProductActions>
                    <ActionButton>
                      <FiHeart />
                    </ActionButton>
                    <ActionButton onClick={() => openQuickView(product)}>
                      <FiEye />
                    </ActionButton>
                  </ProductActions>
                </ProductImage>
                <ProductInfo>
                  <ProductCategory>{product.category}</ProductCategory>
                  <ProductName>
                    <Link to={`/marketplace/product/${product.id}`}>{product.name}</Link>
                  </ProductName>
                  <ProductDesigner>{product.designer}</ProductDesigner>
                  <ProductRating>
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} fill={i < Math.floor(product.rating) ? "#FFC107" : "none"} />
                    ))}
                    <span>({product.reviewCount})</span>
                  </ProductRating>
                  <ProductPrice>
                    <span className="current">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="original">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </ProductPrice>
                  
                  {viewMode === 'list' && (
                    <>
                      <ProductColors>
                        {product.colors.slice(0, 3).map((color, index) => (
                          <ProductColor key={index} color={color} />
                        ))}
                      </ProductColors>
                      <ProductSizes>
                        {product.sizes.slice(0, 4).map((size, index) => (
                          <ProductSize key={index}>{size}</ProductSize>
                        ))}
                      </ProductSizes>
                    </>
                  )}
                  
                  <ProductFooter>
                    <AddToCartButton>
                      <FiShoppingBag /> Add to Cart
                    </AddToCartButton>
                    {viewMode === 'list' && (
                      <QuickViewButton onClick={() => openQuickView(product)}>
                        <FiEye /> Quick View
                      </QuickViewButton>
                    )}
                  </ProductFooter>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
          
          {totalPages > 1 && (
            <PaginationContainer>
              <PaginationButton 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FiArrowLeft />
              </PaginationButton>
              
              {[...Array(totalPages)].map((_, index) => (
                <PaginationButton 
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationButton>
              ))}
              
              <PaginationButton 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <FiArrowRight />
              </PaginationButton>
            </PaginationContainer>
          )}
        </ShopContent>
      </ShopContainer>
      
      {quickViewOpen && quickViewProduct && (
        <QuickViewModal isOpen={quickViewOpen}>
          <ModalContent>
            <CloseButton onClick={closeQuickView}>
              <FiX />
            </CloseButton>
            <ModalImage>
              <img src={quickViewProduct.image || "/placeholder.svg"} alt={quickViewProduct.name} />
            </ModalImage>
            <ModalInfo>
              <ModalCategory>{quickViewProduct.category}</ModalCategory>
              <ModalName>{quickViewProduct.name}</ModalName>
              <ModalDesigner>{quickViewProduct.designer}</ModalDesigner>
              <ModalRating>
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} fill={i < Math.floor(quickViewProduct.rating) ? "#FFC107" : "none"} />
                ))}
                <span>({quickViewProduct.reviewCount} reviews)</span>
              </ModalRating>
              <ModalPrice>
                <span className="current">${quickViewProduct.price.toFixed(2)}</span>
                {quickViewProduct.originalPrice && (
                  <span className="original">${quickViewProduct.originalPrice.toFixed(2)}</span>
                )}
              </ModalPrice>
              <ModalDescription>
                <p>This stunning {quickViewProduct.name.toLowerCase()} features premium materials and exceptional craftsmanship. Perfect for any occasion, this piece combines timeless elegance with modern design elements.</p>
              </ModalDescription>
              <ModalOptions>
                <OptionTitle>Color</OptionTitle>
                <ModalColors>
                  {quickViewProduct.colors.map((color, index) => (
                    <ModalColor 
                      key={index} 
                      color={color} 
                      selected={selectedColor === index}
                      onClick={() => setSelectedColor(index)}
                    />
                  ))}
                </ModalColors>
                
                <OptionTitle>Size</OptionTitle>
                <ModalSizes>
                  {quickViewProduct.sizes.map((size, index) => (
                    <ModalSize 
                      key={index} 
                      selected={selectedSize === index}
                      onClick={() => setSelectedSize(index)}
                    >
                      {size}
                    </ModalSize>
                  ))}
                </ModalSizes>
                
                <OptionTitle>Quantity</OptionTitle>
                <ModalQuantity>
                  <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
                  <QuantityInput 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
                </ModalQuantity>
                
                <ModalButtons>
                  <ModalAddToCart>
                    <FiShoppingBag /> Add to Cart
                  </ModalAddToCart>
                  <ModalViewDetails to={`/product/${quickViewProduct.id}`}>
                    View Full Details
                  </ModalViewDetails>
                </ModalButtons>
              </ModalOptions>
            </ModalInfo>
          </ModalContent>
        </QuickViewModal>
      )}
    </PageWrapper>
  );
};

export default ShopPage;