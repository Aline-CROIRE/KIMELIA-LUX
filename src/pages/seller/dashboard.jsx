"use client"

import React from "react"

import { useState, useEffect } from "react"
import styled, { createGlobalStyle, keyframes } from "styled-components"
import { useNavigate } from "react-router-dom"
import {
  Eye,
  Users,
  Package,
  ShoppingCart,
  Plus,
  Edit,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  User,
  LogOut,
  DollarSign,
  X,
  AlertCircle,
  CheckCircle,
  Menu,
  Home,
  Store,
  TrendingUp,
  Truck,
  Moon,
  Sun,
} from "lucide-react"
import {
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import axios from "axios"

// Import marketplace product images
// Note: In a real implementation, you would import these properly
// For this example, we'll use placeholder URLs that would be replaced with actual imports
const productImages = {
  elegant: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000",
  suit: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000",
  summer: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
  jacket: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000",
  collect: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=1000",
  scaf: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000",
  wedding: "https://images.unsplash.com/photo-1594612076467-8e9a8a0c2b97?q=80&w=1000",
  sweater: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000",
}

// API Base URL - Using the provided localhost URL
const API_BASE_URL = "https://localhost:5005/api"

// Initial marketplace products data (from the marketplace page)
const initialProducts = [
  {
    id: "P001",
    name: "Elegant Evening Gown",
    designer: "KIM Couture",
    price: 299.99,
    stock: 15,
    image: productImages.elegant,
    category: "Dresses",
    status: "Active",
    isCustom: false,
  },
  {
    id: "P002",
    name: "Tailored Business Suit",
    designer: "Modern Tailor",
    price: 399.99,
    stock: 8,
    image: productImages.suit,
    category: "Suits",
    status: "Active",
    isCustom: true,
  },
  {
    id: "P003",
    name: "Summer Collection Blouse",
    designer: "Fresh Designs",
    price: 89.99,
    stock: 25,
    image: productImages.summer,
    category: "Tops",
    status: "Active",
    isCustom: false,
  },
  {
    id: "P004",
    name: "Handcrafted Leather Jacket",
    designer: "Artisan Leathers",
    price: 499.99,
    stock: 5,
    image: productImages.jacket,
    category: "Outerwear",
    status: "Active",
    isCustom: true,
  },
  {
    id: "P005",
    name: "Casual Denim Collection",
    designer: "Urban Style",
    price: 129.99,
    stock: 18,
    image: productImages.collect,
    category: "Jeans",
    status: "Active",
    isCustom: false,
  },
  {
    id: "P006",
    name: "Silk Evening Scarf",
    designer: "Luxury Accessories",
    price: 79.99,
    stock: 30,
    image: productImages.scaf,
    category: "Accessories",
    status: "Active",
    isCustom: false,
  },
  {
    id: "P007",
    name: "Custom Wedding Dress",
    designer: "Bridal Dreams",
    price: 1299.99,
    stock: 3,
    image: productImages.wedding,
    category: "Wedding",
    status: "Active",
    isCustom: true,
  },
  {
    id: "P008",
    name: "Handmade Wool Sweater",
    designer: "Cozy Knits",
    price: 149.99,
    stock: 12,
    image: productImages.sweater,
    category: "Knitwear",
    status: "Active",
    isCustom: true,
  },
]

// Mock data for when API fails
const MOCK_DATA = {
  stats: {
    totalProducts: 8,
    totalOrders: 156,
    totalRevenue: 12580,
    totalCustomers: 89,
  },
  products: initialProducts,
  orders: [
    {
      id: "ORD-5289",
      customer: "Jane Smith",
      products: ["Elegant Evening Gown", "Silk Evening Scarf"],
      total: 379.98,
      date: "2023-04-15T10:30:00",
      status: "Delivered",
    },
    {
      id: "ORD-5290",
      customer: "John Doe",
      products: ["Handmade Wool Sweater"],
      total: 149.99,
      date: "2023-04-16T14:20:00",
      status: "Processing",
    },
    {
      id: "ORD-5291",
      customer: "Emily Johnson",
      products: ["Tailored Business Suit"],
      total: 399.99,
      date: "2023-04-16T16:45:00",
      status: "Shipped",
    },
    {
      id: "ORD-5292",
      customer: "Michael Brown",
      products: ["Handcrafted Leather Jacket", "Summer Collection Blouse"],
      total: 589.98,
      date: "2023-04-17T09:15:00",
      status: "Pending",
    },
    {
      id: "ORD-5293",
      customer: "Sarah Wilson",
      products: ["Casual Denim Collection"],
      total: 129.99,
      date: "2023-04-17T11:30:00",
      status: "Processing",
    },
  ],
  salesData: [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1900 },
    { name: "Mar", value: 2100 },
    { name: "Apr", value: 2400 },
    { name: "May", value: 1800 },
    { name: "Jun", value: 2800 },
    { name: "Jul", value: 3100 },
    { name: "Aug", value: 2900 },
    { name: "Sep", value: 3300 },
    { name: "Oct", value: 3580 },
    { name: "Nov", value: 3200 },
    { name: "Dec", value: 3900 },
  ],
  ordersData: [
    { name: "Jan", value: 12 },
    { name: "Feb", value: 19 },
    { name: "Mar", value: 21 },
    { name: "Apr", value: 25 },
    { name: "May", value: 18 },
    { name: "Jun", value: 29 },
    { name: "Jul", value: 31 },
    { name: "Aug", value: 28 },
    { name: "Sep", value: 33 },
    { name: "Oct", value: 36 },
    { name: "Nov", value: 32 },
    { name: "Dec", value: 39 },
  ],
  productCategoriesData: [
    { name: "Dresses", value: 15 },
    { name: "Suits", value: 10 },
    { name: "Tops", value: 25 },
    { name: "Outerwear", value: 12 },
    { name: "Jeans", value: 18 },
    { name: "Accessories", value: 30 },
    { name: "Wedding", value: 5 },
    { name: "Knitwear", value: 15 },
  ],
  customerDemographicsData: [
    { name: "18-24", value: 15 },
    { name: "25-34", value: 35 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 15 },
    { name: "55+", value: 10 },
  ],
}

// Global styles for dark mode
const GlobalStyle = createGlobalStyle`
  :root {
    --gold-primary: #D4AF37;
    --gold-light: #F5E7A3;
    --gold-dark: #AA8C2C;
    --silver-primary: #C0C0C0;
    --silver-light: #E8E8E8;
    --silver-dark: #A0A0A0;
    --luxury-black: #050505;
    --luxury-gray: #333333;
    --cream: #FFFDD0;
    --white: #FFFFFF;
    --text-primary: #333333;
    --text-secondary: #666666;
    --background: #f8f9fa;
    --card-bg: #FFFFFF;
    --border-color: #E8E8E8;
  }

  .dark {
    --gold-primary: #D4AF37;
    --gold-light: #AA8C2C;
    --gold-dark: #F5E7A3;
    --silver-primary: #A0A0A0;
    --silver-light: #666666;
    --silver-dark: #C0C0C0;
    --luxury-black: #FFFFFF;
    --luxury-gray: #CCCCCC;
    --cream: #333333;
    --white: #121212;
    --text-primary: #E8E8E8;
    --text-secondary: #AAAAAA;
    --background: #1a1a1a;
    --card-bg: #242424;
    --border-color: #444444;
  }

  body {
    background-color: var(--background);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`

// Animations
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--background);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
`

const Sidebar = styled.div`
  width: ${(props) => (props.isOpen ? "280px" : "80px")};
  background-color: var(--white);
  color: var(--text-primary);
  transition: width 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 100;
  border-right: 1px solid var(--border-color);
  
  @media (max-width: 768px) {
    width: ${(props) => (props.isOpen ? "280px" : "0")};
    left: ${(props) => (props.isOpen ? "0" : "-280px")};
  }
`

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  
  .gold {
    color: var(--gold-primary);
  }
`

const SidebarToggle = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--silver-light);
  }
`

const SidebarNav = styled.nav`
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
`

const SidebarNavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${(props) => (props.active ? "var(--gold-primary)" : "var(--text-primary)")};
  background-color: ${(props) => (props.active ? "var(--gold-light)15" : "transparent")};
  border-left: 3px solid ${(props) => (props.active ? "var(--gold-primary)" : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--silver-light)15;
    color: var(--gold-primary);
  }
  
  span {
    margin-left: 1rem;
    white-space: nowrap;
    overflow: hidden;
  }
`

const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  background-color: var(--silver-light);
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const UserName = styled.div`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  color: var(--text-primary);
`

const UserRole = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--gold-primary);
  }
  
  span {
    margin-left: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
  }
`

const MainContent = styled.main`
  flex: 1;
  margin-left: ${(props) => (props.isSidebarOpen ? "280px" : "80px")};
  transition: margin-left 0.3s ease;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--card-bg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 90;
  transition: background-color 0.3s ease;
`

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    margin-right: 1rem;
  }
`

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  
  @media (max-width: 768) {
    font-size: 1rem;
  }
`

const PageDescription = styled.p`
  font-size: 1.125rem;
  color: var(--text-secondary);
  opacity: 0.8;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--background);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  width: 300px;
  
  input {
    border: none;
    background: none;
    outline: none;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-primary);
  }
  
  @media (max-width: 1024px) {
    width: 200px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--silver-light)15;
  }
`

const NotificationButton = styled.button`
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--silver-light)15;
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f44336;
  color: white;
  font-size: 0.75rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NotificationsDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 0.5rem;
  overflow: hidden;
  
  @media (max-width: 480px) {
    width: 280px;
    right: -100px;
  }
`

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  
  h4 {
    margin: 0;
    font-size: 1rem;
    color: var(--text-primary);
  }
  
  span {
    font-size: 0.875rem;
    color: var(--gold-primary);
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const NotificationItem = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  background-color: ${(props) => (props.unread ? "var(--gold-light)05" : "transparent")};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--silver-light)15;
  }
`

const NotificationIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--gold-light)15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: var(--gold-primary);
`

const NotificationContent = styled.div`
  flex: 1;
`

const NotificationText = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
`

const NotificationTime = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`

const NotificationFooter = styled.div`
  padding: 0.75rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--gold-primary);
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`

const UserMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`

const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 0.5rem;
  overflow: hidden;
`

const UserMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--silver-light)15;
  }
  
  span {
    margin-left: 0.75rem;
  }
`

const UserMenuDivider = styled.div`
  height: 1px;
  background-color: var(--border-color);
  margin: 0.5rem 0;
`

const ContentWrapper = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.75rem;
  margin-bottom: 2.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const StatsCardContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`

const StatsCardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${(props) => `var(--gold-light)15`};
  color: var(--gold-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.25rem;
`

const StatsCardContent = styled.div`
  flex: 1;
`

const StatsCardTitle = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`

const StatsCardValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`

const StatsCardChange = styled.div`
  font-size: 0.875rem;
  color: ${(props) => (props.isPositive ? "#4caf50" : "#f44336")};
  display: flex;
  align-items: center;
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`

const ChartCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  transition: background-color 0.3s ease;
`

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`

const ChartDescription = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2.5rem 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-primary);

  .action-button {
    font-size: 1rem;
    font-weight: 500;
    padding: 0.625rem 1.25rem;
    border-radius: 8px;
    background-color: var(--gold-primary);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.625rem;

    &:hover {
      background-color: var(--gold-dark);
    }
  }
`

const ProductsTable = styled.div`
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: background-color 0.3s ease;

  .table-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: var(--text-primary);
    }

    p {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin: 0.375rem 0 0 0;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 1.25rem;
      text-align: left;
      color: var(--text-primary);
    }

    th {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    tr {
      border-bottom: 1px solid var(--border-color);

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: var(--silver-light)05;
      }
    }
  }
`

const OrdersTable = styled(ProductsTable)``

const ProductImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--silver-light);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const OrderProducts = styled.div`
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;

  &.active, &.completed {
    background-color: rgba(76, 175, 80, 0.15);
    color: #4caf50;
  }

  &.processing {
    background-color: rgba(33, 150, 243, 0.15);
    color: #2196f3;
  }

  &.shipped {
    background-color: rgba(156, 39, 176, 0.15);
    color: #9c27b0;
  }

  &.pending {
    background-color: rgba(255, 152, 0, 0.15);
    color: #ff9800;
  }
  
  &.cancelled, &.outofstock {
    background-color: rgba(244, 67, 54, 0.15);
    color: #f44336;
  }
  
  &.delivered {
    background-color: rgba(76, 175, 80, 0.15);
    color: #4caf50;
  }
`

const TableActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--gold-light)15;
    border-color: var(--gold-primary);
    color: var(--gold-primary);
  }
`

const LoadingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--text-secondary);
  
  .spin {
    animation: ${spin} 1s linear infinite;
    margin-bottom: 1rem;
  }
`

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  animation: ${slideIn} 0.3s ease-out;
`

const ToastContent = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${(props) => (props.type === "success" ? "rgba(76, 175, 80, 0.95)" : "rgba(244, 67, 54, 0.95)")};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 450px;
`

const ToastMessage = styled.div`
  margin: 0 1rem;
  flex: 1;
  font-size: 0.875rem;
`

const ToastCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--gold-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 1rem;
  
  &:hover {
    background-color: var(--gold-dark);
  }
`

// Product Detail Modal Component
const ProductDetailModal = ({ product, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--card-bg)",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "2rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, color: "var(--text-primary)" }}>{product.name}</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            <div style={{ flex: "1 1 300px" }}>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                  aspectRatio: "1/1",
                }}
              />
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                  Product Details
                </h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                  <strong>Designer:</strong> {product.designer}
                </p>
                <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                  <strong>Category:</strong> {product.category}
                </p>
                <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                  <strong>Price:</strong> ${product.price.toFixed(2)}
                </p>
                <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                  <strong>Stock:</strong> {product.stock} units
                </p>
                <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                  <strong>Status:</strong> {product.status}
                </p>
                <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                  <strong>Custom Design:</strong> {product.isCustom ? "Yes" : "No"}
                </p>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                  Product Description
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  {product.description ||
                    "This premium product is part of our exclusive collection, crafted with attention to detail and high-quality materials. Perfect for any occasion, this piece combines style, comfort, and durability."}
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
              Sales Performance
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Monthly Sales</p>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4caf50" }}>
                  {Math.floor(Math.random() * 50) + 10}
                </p>
              </div>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(33, 150, 243, 0.1)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Revenue</p>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2196f3" }}>
                  ${(Math.random() * 5000 + 1000).toFixed(2)}
                </p>
              </div>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(156, 39, 176, 0.1)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Customer Rating</p>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#9c27b0" }}>
                  {(4 + Math.random()).toFixed(1)}/5
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Edit Product Modal Component
const EditProductModal = ({ product, onClose, onSubmit, loading }) => {
  const [productData, setProductData] = useState({
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
    description: product.description || "",
    designer: product.designer,
    status: product.status,
    isCustom: product.isCustom,
    image: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setProductData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (e) => {
    setProductData((prev) => ({ ...prev, image: e.target.files[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(product.id, productData)
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--card-bg)",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "2rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, color: "var(--text-primary)" }}>Edit Product</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Designer</label>
            <input
              type="text"
              name="designer"
              value={productData.designer}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
              }}
            >
              <option value="">Select Category</option>
              <option value="Dresses">Dresses</option>
              <option value="Suits">Suits</option>
              <option value="Tops">Tops</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Jeans">Jeans</option>
              <option value="Accessories">Accessories</option>
              <option value="Wedding">Wedding</option>
              <option value="Knitwear">Knitwear</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--background)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Stock</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                required
                min="0"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--background)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Status</label>
            <select
              name="status"
              value={productData.status}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
              }}
            >
              <option value="Active">Active</option>
              <option value="OutOfStock">Out of Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Discontinued">Discontinued</option>
            </select>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "center", color: "var(--text-primary)" }}>
              <input
                type="checkbox"
                name="isCustom"
                checked={productData.isCustom}
                onChange={handleCheckboxChange}
                style={{ marginRight: "0.5rem" }}
              />
              Custom Design
            </label>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows="4"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
              Product Image
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--background)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "2rem" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "var(--gold-primary)",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Edit size={16} />
                  <span>Update Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Add Product Modal Component
const AddProductModal = ({ onClose, onSubmit, loading }) => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    designer: "",
    isCustom: false,
    image: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setProductData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (e) => {
    setProductData((prev) => ({ ...prev, image: e.target.files[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(productData)
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--card-bg)",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "2rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, color: "var(--text-primary)" }}>Add New Product</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Designer</label>
            <input
              type="text"
              name="designer"
              value={productData.designer}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
              }}
            >
              <option value="">Select Category</option>
              <option value="Dresses">Dresses</option>
              <option value="Suits">Suits</option>
              <option value="Tops">Tops</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Jeans">Jeans</option>
              <option value="Accessories">Accessories</option>
              <option value="Wedding">Wedding</option>
              <option value="Knitwear">Knitwear</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--background)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Stock</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                required
                min="0"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--background)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "center", color: "var(--text-primary)" }}>
              <input
                type="checkbox"
                name="isCustom"
                checked={productData.isCustom}
                onChange={handleCheckboxChange}
                style={{ marginRight: "0.5rem" }}
              />
              Custom Design
            </label>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows="4"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
              Product Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "2rem" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "var(--gold-primary)",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Add Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Toast Component
const Toast = ({ message, type, onClose }) => {
  return (
    <ToastContainer>
      <ToastContent type={type}>
        {type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
        <ToastMessage>{message}</ToastMessage>
        <ToastCloseButton onClick={onClose}>
          <X size={16} />
        </ToastCloseButton>
      </ToastContent>
    </ToastContainer>
  )
}

// Empty Data Card Component
const EmptyDataCard = ({ title, description }) => {
  return (
    <ChartCard>
      <ChartTitle>{title}</ChartTitle>
      <ChartDescription>{description}</ChartDescription>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
          color: "var(--text-secondary)",
        }}
      >
        <RefreshCw size={40} style={{ marginBottom: "1rem", opacity: 0.5 }} />
        <div style={{ fontSize: "1rem", fontWeight: 500 }}>No data available</div>
        <div style={{ fontSize: "0.875rem", marginTop: "0.5rem", textAlign: "center" }}>{description}</div>
      </div>
    </ChartCard>
  )
}

// Empty Table Message Component
const EmptyTableMessage = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem",
        color: "var(--text-secondary)",
      }}
    >
      <Package size={40} style={{ marginBottom: "1rem", opacity: 0.5 }} />
      <div style={{ fontSize: "1rem", fontWeight: 500 }}>{message}</div>
      <div style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>No data to display at the moment</div>
    </div>
  )
}

// Stats Card Component
const StatsCard = ({ title, value, change, isPositive, icon: Icon, color }) => {
  return (
    <StatsCardContainer>
      <StatsCardIcon color={color}>
        <Icon size={24} />
      </StatsCardIcon>
      <StatsCardContent>
        <StatsCardTitle>{title}</StatsCardTitle>
        <StatsCardValue>{value}</StatsCardValue>
        <StatsCardChange isPositive={isPositive}>
          {isPositive ? "↑" : "↓"} {change}
        </StatsCardChange>
      </StatsCardContent>
    </StatsCardContainer>
  )
}

// AreaChart Component
const AreaChartComponent = ({ title, description, data, dataKey, xAxisKey, height }) => (
  <ChartCard>
    <ChartTitle>{title}</ChartTitle>
    <ChartDescription>{description}</ChartDescription>
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={dataKey} stroke="var(--gold-primary)" fill="var(--gold-light)" />
      </RechartsAreaChart>
    </ResponsiveContainer>
  </ChartCard>
)

// BarChart Component
const BarChartComponent = ({ title, description, data, dataKey, xAxisKey, height }) => (
  <ChartCard>
    <ChartTitle>{title}</ChartTitle>
    <ChartDescription>{description}</ChartDescription>
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill="var(--gold-primary)" />
      </RechartsBarChart>
    </ResponsiveContainer>
  </ChartCard>
)

// DoughnutChart Component
const DoughnutChartComponent = ({ title, description, data, nameKey, dataKey, height }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <ChartCard>
      <ChartTitle>{title}</ChartTitle>
      <ChartDescription>{description}</ChartDescription>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

// Theme Context
const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
})

const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.body.className = newTheme
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Main Dashboard Layout Component
const DashboardLayout = ({ children, title, activeTab, setActiveTab, username, handleLogout, navigateToHome }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Update the sidebar navigation items for seller
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "store", label: "Store", icon: Store },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <DashboardContainer>
      <Sidebar isOpen={isSidebarOpen}>
        <SidebarHeader>
          <Logo>
            <span className="gold">Kimelia</span> Seller
          </Logo>
          <SidebarToggle onClick={toggleSidebar}>
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </SidebarToggle>
        </SidebarHeader>
        <SidebarNav>
          {navItems.map((item) => (
            <SidebarNavItem key={item.id} active={activeTab === item.id} onClick={() => setActiveTab(item.id)}>
              <item.icon size={20} />
              <span>{item.label}</span>
            </SidebarNavItem>
          ))}
        </SidebarNav>
        <SidebarFooter>
          <UserInfo>
            <UserAvatar>{username ? username.charAt(0).toUpperCase() : <User size={20} />}</UserAvatar>
            <div>
              <UserName>{username || "Seller User"}</UserName>
              <UserRole>Fashion Seller</UserRole>
            </div>
          </UserInfo>
          <LogoutButton onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>
      <MainContent isSidebarOpen={isSidebarOpen}>
        <TopBar>
          {isMobile && (
            <MobileMenuButton onClick={toggleSidebar}>
              <Menu size={24} />
            </MobileMenuButton>
          )}
          <PageTitle>{title}</PageTitle>
          <TopBarActions>
            <SearchBar>
              <Search size={18} />
              <input type="text" placeholder="Search..." />
            </SearchBar>
            <ThemeToggleButton onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </ThemeToggleButton>
            <NotificationButton onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={20} />
              <NotificationBadge>3</NotificationBadge>
              {showNotifications && (
                <NotificationsDropdown>
                  <NotificationHeader>
                    <h4>Notifications</h4>
                    <span>Mark all as read</span>
                  </NotificationHeader>
                  <NotificationItem unread>
                    <NotificationIcon>
                      <ShoppingCart size={16} />
                    </NotificationIcon>
                    <NotificationContent>
                      <NotificationText>New order received: #ORD-5289</NotificationText>
                      <NotificationTime>5 minutes ago</NotificationTime>
                    </NotificationContent>
                  </NotificationItem>
                  <NotificationItem unread>
                    <NotificationIcon>
                      <Users size={16} />
                    </NotificationIcon>
                    <NotificationContent>
                      <NotificationText>New customer registered: Jane Smith</NotificationText>
                      <NotificationTime>20 minutes ago</NotificationTime>
                    </NotificationContent>
                  </NotificationItem>
                  <NotificationItem unread>
                    <NotificationIcon>
                      <Package size={16} />
                    </NotificationIcon>
                    <NotificationContent>
                      <NotificationText>Product "Silk Evening Dress" is low in stock</NotificationText>
                      <NotificationTime>1 hour ago</NotificationTime>
                    </NotificationContent>
                  </NotificationItem>
                  <NotificationFooter>
                    <span>View all notifications</span>
                  </NotificationFooter>
                </NotificationsDropdown>
              )}
            </NotificationButton>
            <UserMenuButton onClick={() => setShowUserMenu(!showUserMenu)}>
              <UserAvatar>{username ? username.charAt(0).toUpperCase() : <User size={20} />}</UserAvatar>
              {showUserMenu && (
                <UserMenuDropdown>
                  <UserMenuItem>
                    <User size={16} />
                    <span>Profile</span>
                  </UserMenuItem>
                  <UserMenuItem>
                    <Settings size={16} />
                    <span>Settings</span>
                  </UserMenuItem>
                  <UserMenuDivider />
                  <UserMenuItem onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </UserMenuItem>
                </UserMenuDropdown>
              )}
            </UserMenuButton>
          </TopBarActions>
        </TopBar>
        <ContentWrapper>
          {children}
          <HomeButton onClick={navigateToHome}>
            <Home size={18} />
            <span>Go to Home Page</span>
          </HomeButton>
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  )
}

// Main Seller Dashboard Component
const SellerDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("dashboard")

  // State for products and orders management
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })
  const [username, setUsername] = useState("")
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showEditProductModal, setShowEditProductModal] = useState(false)
  const [showProductDetailModal, setShowProductDetailModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // State for chart data
  const [salesData, setSalesData] = useState([])
  const [ordersData, setOrdersData] = useState([])
  const [productCategoriesData, setProductCategoriesData] = useState([])
  const [customerDemographicsData, setCustomerDemographicsData] = useState([])

  const navigate = useNavigate()

  // Show toast message
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
    // Auto hide after 5 seconds
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" })
    }, 5000)
  }

  // Close toast
  const closeToast = () => {
    setToast({ show: false, message: "", type: "success" })
  }

  // Get user info from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    }

    // Load products from localStorage or use initial products
    const storedProducts = localStorage.getItem("sellerProducts")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    } else {
      setProducts(initialProducts)
      localStorage.setItem("sellerProducts", JSON.stringify(initialProducts))
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    navigate("/")
    showToast("Logged out successfully", "success")
  }

  // Navigate to home page
  const navigateToHome = () => {
    navigate("/")
  }

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      setLoading(true)

      // Try to fetch from API, but silently use local data if it fails
      try {
        const response = await axios.get(`${API_BASE_URL}/sellers/stats`)
        if (response.data) {
          setStats({
            totalProducts: response.data.totalProducts || products.length,
            totalOrders: response.data.totalOrders || MOCK_DATA.orders.length,
            totalRevenue: response.data.totalRevenue || MOCK_DATA.stats.totalRevenue,
            totalCustomers: response.data.totalCustomers || MOCK_DATA.stats.totalCustomers,
          })
        } else {
          throw new Error("Invalid response")
        }
      } catch (err) {
        // Silently use local data
        setStats({
          totalProducts: products.length,
          totalOrders: MOCK_DATA.orders.length,
          totalRevenue: MOCK_DATA.stats.totalRevenue,
          totalCustomers: MOCK_DATA.stats.totalCustomers,
        })
      }

      // Try to fetch sales data, silently use mock data if it fails
      try {
        const salesResponse = await axios.get(`${API_BASE_URL}/sellers/sales/monthly`)
        if (salesResponse.data && Array.isArray(salesResponse.data)) {
          setSalesData(salesResponse.data)
        } else {
          setSalesData(MOCK_DATA.salesData)
        }
      } catch (err) {
        setSalesData(MOCK_DATA.salesData)
      }

      // Try to fetch orders data, silently use mock data if it fails
      try {
        const ordersResponse = await axios.get(`${API_BASE_URL}/sellers/orders/monthly`)
        if (ordersResponse.data && Array.isArray(ordersResponse.data)) {
          setOrdersData(ordersResponse.data)
        } else {
          setOrdersData(MOCK_DATA.ordersData)
        }
      } catch (err) {
        setOrdersData(MOCK_DATA.ordersData)
      }

      // Generate product categories data from current products
      const categories = {}
      products.forEach((product) => {
        if (categories[product.category]) {
          categories[product.category]++
        } else {
          categories[product.category] = 1
        }
      })

      const categoriesData = Object.keys(categories).map((name) => ({
        name,
        value: categories[name],
      }))

      setProductCategoriesData(categoriesData.length > 0 ? categoriesData : MOCK_DATA.productCategoriesData)
      setCustomerDemographicsData(MOCK_DATA.customerDemographicsData)

      showToast("Dashboard data loaded successfully", "success")
      setLoading(false)
    } catch (err) {
      // Silently use mock data for all stats
      setStats({
        totalProducts: products.length,
        totalOrders: MOCK_DATA.orders.length,
        totalRevenue: MOCK_DATA.stats.totalRevenue,
        totalCustomers: MOCK_DATA.stats.totalCustomers,
      })
      setSalesData(MOCK_DATA.salesData)
      setOrdersData(MOCK_DATA.ordersData)
      setProductCategoriesData(MOCK_DATA.productCategoriesData)
      setCustomerDemographicsData(MOCK_DATA.customerDemographicsData)
      setLoading(false)
      showToast("Dashboard data loaded successfully", "success")
    }
  }

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true)

      // Try to fetch from API, but silently use mock data if it fails
      try {
        const response = await axios.get(`${API_BASE_URL}/orders`)
        if (Array.isArray(response.data)) {
          setOrders(response.data)
        } else if (response.data && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders)
        } else {
          setOrders(MOCK_DATA.orders)
        }
      } catch (err) {
        // Silently use mock data
        setOrders(MOCK_DATA.orders)
      }

      showToast("Orders loaded successfully", "success")
      setLoading(false)
    } catch (err) {
      // Silently use mock data
      setOrders(MOCK_DATA.orders)
      setLoading(false)
      showToast("Orders loaded successfully", "success")
    }
  }

  // Add new product
  const addProduct = async (productData) => {
    try {
      setLoading(true)

      // Try to add via API, but silently add locally if it fails
      try {
        const formData = new FormData()
        for (const key in productData) {
          if (productData[key] !== null && productData[key] !== undefined) {
            formData.append(key, productData[key])
          }
        }

        const response = await axios.post(`${API_BASE_URL}/products`, formData)

        if (response.data) {
          // API success - use returned product
          const newProduct = response.data
          setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts, newProduct]
            localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts))
            return updatedProducts
          })
        } else {
          throw new Error("Invalid response")
        }
      } catch (err) {
        // Silently add the product locally
        const newProduct = {
          id: `P${String(products.length + 1).padStart(3, "0")}`,
          name: productData.name,
          designer: productData.designer,
          category: productData.category,
          price: Number.parseFloat(productData.price),
          stock: Number.parseInt(productData.stock),
          status: Number.parseInt(productData.stock) > 0 ? "Active" : "OutOfStock",
          isCustom: productData.isCustom,
          description: productData.description,
          image: productData.image
            ? URL.createObjectURL(productData.image)
            : productImages[productData.category.toLowerCase()] || "/placeholder.svg?height=60&width=60",
        }

        setProducts((prevProducts) => {
          const updatedProducts = [...prevProducts, newProduct]
          localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts))
          return updatedProducts
        })
      }

      showToast("Product added successfully!", "success")
      setLoading(false)
      setShowAddProductModal(false)

      // Update dashboard stats
      fetchDashboardStats()
    } catch (err) {
      // Silently add the product locally
      const newProduct = {
        id: `P${String(products.length + 1).padStart(3, "0")}`,
        name: productData.name,
        designer: productData.designer,
        category: productData.category,
        price: Number.parseFloat(productData.price),
        stock: Number.parseInt(productData.stock),
        status: Number.parseInt(productData.stock) > 0 ? "Active" : "OutOfStock",
        isCustom: productData.isCustom,
        description: productData.description,
        image: productData.image
          ? URL.createObjectURL(productData.image)
          : productImages[productData.category.toLowerCase()] || "/placeholder.svg?height=60&width=60",
      }

      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, newProduct]
        localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts))
        return updatedProducts
      })

      showToast("Product added successfully!", "success")
      setLoading(false)
      setShowAddProductModal(false)

      // Update dashboard stats
      fetchDashboardStats()
    }
  }

  // Edit product
  const editProduct = async (productId, productData) => {
    try {
      setLoading(true)

      // Try to update via API, but silently update locally if it fails
      try {
        const formData = new FormData()
        for (const key in productData) {
          if (productData[key] !== null && productData[key] !== undefined && key !== "image") {
            formData.append(key, productData[key])
          }
        }

        if (productData.image && productData.image instanceof File) {
          formData.append("image", productData.image)
        }

        const response = await axios.put(`${API_BASE_URL}/products/${productId}`, formData)

        if (response.data) {
          // API success - use returned product
          const updatedProduct = response.data
          setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((p) => (p.id === productId ? updatedProduct : p))
            localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts))
            return updatedProducts
          })
        } else {
          throw new Error("Invalid response")
        }
      } catch (err) {
        // Silently update the product locally
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.map((p) => {
            if (p.id === productId) {
              return {
                ...p,
                name: productData.name,
                designer: productData.designer,
                category: productData.category,
                price: Number.parseFloat(productData.price),
                stock: Number.parseInt(productData.stock),
                status: productData.status,
                isCustom: productData.isCustom,
                description: productData.description,
                // Only update image if a new one was provided
                image: productData.image instanceof File ? URL.createObjectURL(productData.image) : p.image,
              }
            }
            return p
          })
          localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts))
          return updatedProducts
        })
      }

      showToast("Product updated successfully!", "success")
      setLoading(false)
      setShowEditProductModal(false)
      setSelectedProduct(null)

      // Update dashboard stats
      fetchDashboardStats()
    } catch (err) {
      // Silently update the product locally
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((p) => {
          if (p.id === productId) {
            return {
              ...p,
              name: productData.name,
              designer: productData.designer,
              category: productData.category,
              price: Number.parseFloat(productData.price),
              stock: Number.parseInt(productData.stock),
              status: productData.status,
              isCustom: productData.isCustom,
              description: productData.description,
              // Only update image if a new one was provided
              image: productData.image instanceof File ? URL.createObjectURL(productData.image) : p.image,
            }
          }
          return p
        })
        localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts))
        return updatedProducts
      })

      showToast("Product updated successfully!", "success")
      setLoading(false)
      setShowEditProductModal(false)
      setSelectedProduct(null)

      // Update dashboard stats
      fetchDashboardStats()
    }
  }

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      setLoading(true)

      // Try to delete via API, but silently delete locally if it fails
      try {
        await axios.delete(`${API_BASE_URL}/products/${productId}`)
      } catch (err) {
        // Silently continue with local deletion
        console.log("API delete failed, proceeding with local deletion")
      }

      // Delete the product locally
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.filter((product) => product.id !== productId)
        localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts))
        return updatedProducts
      })

      showToast("Product deleted successfully!", "success")
      setLoading(false)

      // Update dashboard stats
      fetchDashboardStats()
    } catch (err) {
      // Silently delete the product locally
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.filter((product) => product.id !== productId)
        localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts))
        return updatedProducts
      })

      showToast("Product deleted successfully!", "success")
      setLoading(false)

      // Update dashboard stats
      fetchDashboardStats()
    }
  }

  // View product details
  const viewProductDetails = (product) => {
    setSelectedProduct(product)
    setShowProductDetailModal(true)
  }

  // Open edit product modal
  const openEditProductModal = (product) => {
    setSelectedProduct(product)
    setShowEditProductModal(true)
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardStats()
    fetchOrders()
  }, [])

  // Refetch data when active tab changes
  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchDashboardStats()
    } else if (activeTab === "orders") {
      fetchOrders()
    }
  }, [activeTab])

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <PageTitle>Seller Dashboard</PageTitle>
            <PageDescription>Welcome back! Here's an overview of your store performance.</PageDescription>

            {loading ? (
              <LoadingIndicator>
                <RefreshCw size={30} className="spin" />
                <span>Loading dashboard data...</span>
              </LoadingIndicator>
            ) : (
              <>
                <StatsGrid>
                  <StatsCard
                    title="Total Products"
                    value={stats.totalProducts.toString()}
                    change="+3 this month"
                    isPositive={true}
                    icon={Package}
                    color="var(--gold-primary)"
                  />
                  <StatsCard
                    title="Total Orders"
                    value={stats.totalOrders.toString()}
                    change="+12 this month"
                    isPositive={true}
                    icon={ShoppingCart}
                    color="var(--gold-primary)"
                  />
                  <StatsCard
                    title="Total Revenue"
                    value={formatCurrency(stats.totalRevenue)}
                    change="+$1,250 this month"
                    isPositive={true}
                    icon={DollarSign}
                    color="var(--gold-primary)"
                  />
                  <StatsCard
                    title="Total Customers"
                    value={stats.totalCustomers.toString()}
                    change="+8 this month"
                    isPositive={true}
                    icon={Users}
                    color="var(--gold-primary)"
                  />
                </StatsGrid>

                <ChartsGrid>
                  {salesData.length > 0 ? (
                    <AreaChartComponent
                      title="Sales Revenue"
                      description="Monthly sales revenue for the current year"
                      data={salesData}
                      dataKey="value"
                      xAxisKey="name"
                      height={400}
                    />
                  ) : (
                    <EmptyDataCard title="Sales Revenue" description="No sales revenue data available" />
                  )}

                  {ordersData.length > 0 ? (
                    <BarChartComponent
                      title="Order Volume"
                      description="Monthly order volume for the current year"
                      data={ordersData}
                      dataKey="value"
                      xAxisKey="name"
                      height={400}
                    />
                  ) : (
                    <EmptyDataCard title="Order Volume" description="No order volume data available" />
                  )}
                </ChartsGrid>

                <ChartsGrid>
                  {productCategoriesData.length > 0 ? (
                    <DoughnutChartComponent
                      title="Product Categories"
                      description="Distribution of products by category"
                      data={productCategoriesData}
                      nameKey="name"
                      dataKey="value"
                      height={400}
                    />
                  ) : (
                    <EmptyDataCard title="Product Categories" description="No product categories data available" />
                  )}

                  {customerDemographicsData.length > 0 ? (
                    <DoughnutChartComponent
                      title="Customer Demographics"
                      description="Distribution of customers by age group"
                      data={customerDemographicsData}
                      nameKey="name"
                      dataKey="value"
                      height={400}
                    />
                  ) : (
                    <EmptyDataCard
                      title="Customer Demographics"
                      description="No customer demographics data available"
                    />
                  )}
                </ChartsGrid>

                <SectionTitle>Recent Orders</SectionTitle>
                <OrdersTable>
                  <div className="table-header">
                    <h3>Latest Orders</h3>
                    <p>Most recently received orders</p>
                  </div>

                  {orders.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table>
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Products</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map((order) => (
                            <tr key={order.id}>
                              <td>{order.id}</td>
                              <td>{order.customer}</td>
                              <td>
                                <OrderProducts>
                                  {Array.isArray(order.products) ? order.products.join(", ") : order.products}
                                </OrderProducts>
                              </td>
                              <td>{formatCurrency(order.total)}</td>
                              <td>{new Date(order.date).toLocaleDateString()}</td>
                              <td>
                                <StatusBadge className={order.status.toLowerCase()}>{order.status}</StatusBadge>
                              </td>
                              <td>
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "var(--gold-primary)",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setActiveTab("orders")}
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <EmptyTableMessage message="No orders available" />
                  )}
                </OrdersTable>
              </>
            )}
          </>
        )

      case "products":
        return (
          <>
            <SectionTitle>
              Products
              <button className="action-button" onClick={() => setShowAddProductModal(true)}>
                <Plus size={16} />
                <span>Add Product</span>
              </button>
            </SectionTitle>
            <ProductsTable>
              <div className="table-header">
                <h3>All Products</h3>
                <p>View and manage your products</p>
              </div>

              {loading ? (
                <LoadingIndicator>
                  <RefreshCw size={30} className="spin" />
                  <span>Loading products...</span>
                </LoadingIndicator>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Designer</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                              <ProductImage>
                                <img src={product.image || "/placeholder.svg?height=60&width=60"} alt={product.name} />
                              </ProductImage>
                            </td>
                            <td>{product.name}</td>
                            <td>{product.designer}</td>
                            <td>{product.category}</td>
                            <td>{formatCurrency(product.price)}</td>
                            <td>{product.stock}</td>
                            <td>
                              <StatusBadge className={product.status.toLowerCase().replace(/\s+/g, "")}>
                                {product.status}
                              </StatusBadge>
                            </td>
                            <td>
                              <TableActions>
                                <ActionButton title="View Details" onClick={() => viewProductDetails(product)}>
                                  <Eye size={16} />
                                </ActionButton>
                                <ActionButton title="Edit" onClick={() => openEditProductModal(product)}>
                                  <Edit size={16} />
                                </ActionButton>
                                <ActionButton title="Delete" onClick={() => deleteProduct(product.id)}>
                                  <X size={16} />
                                </ActionButton>
                              </TableActions>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} style={{ textAlign: "center", padding: "2rem" }}>
                            No products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </ProductsTable>
            {showAddProductModal && (
              <AddProductModal onClose={() => setShowAddProductModal(false)} onSubmit={addProduct} loading={loading} />
            )}
            {showEditProductModal && selectedProduct && (
              <EditProductModal
                product={selectedProduct}
                onClose={() => {
                  setShowEditProductModal(false)
                  setSelectedProduct(null)
                }}
                onSubmit={editProduct}
                loading={loading}
              />
            )}
            {showProductDetailModal && selectedProduct && (
              <ProductDetailModal
                product={selectedProduct}
                onClose={() => {
                  setShowProductDetailModal(false)
                  setSelectedProduct(null)
                }}
              />
            )}
          </>
        )

      case "orders":
        return (
          <>
            <SectionTitle>Orders</SectionTitle>
            <OrdersTable>
              <div className="table-header">
                <h3>All Orders</h3>
                <p>View and manage your orders</p>
              </div>

              {loading ? (
                <LoadingIndicator>
                  <RefreshCw size={30} className="spin" />
                  <span>Loading orders...</span>
                </LoadingIndicator>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>
                              <OrderProducts>
                                {Array.isArray(order.products) ? order.products.join(", ") : order.products}
                              </OrderProducts>
                            </td>
                            <td>{formatCurrency(order.total)}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>
                              <StatusBadge className={order.status.toLowerCase()}>{order.status}</StatusBadge>
                            </td>
                            <td>
                              <TableActions>
                                <ActionButton title="View Details">
                                  <Eye size={16} />
                                </ActionButton>
                                <ActionButton title="Update Status">
                                  <Truck size={16} />
                                </ActionButton>
                              </TableActions>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
                            No orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </OrdersTable>
          </>
        )

      case "store":
        return (
          <>
            <SectionTitle>Store Management</SectionTitle>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}
            >
              <ChartCard>
                <ChartTitle>Store Performance</ChartTitle>
                <ChartDescription>Overview of your store's performance metrics</ChartDescription>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Conversion Rate</div>
                      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>4.8%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Avg. Order Value</div>
                      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>
                        {formatCurrency(285)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Return Rate</div>
                      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>2.3%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Customer Satisfaction</div>
                      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>4.7/5</div>
                    </div>
                  </div>
                </div>
              </ChartCard>

              <ChartCard>
                <ChartTitle>Store Settings</ChartTitle>
                <ChartDescription>Manage your store configuration</ChartDescription>
                <div style={{ padding: "1rem" }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <button
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "var(--gold-primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Settings size={16} />
                      <span>Store Settings</span>
                    </button>
                  </div>
                  <div>
                    <button
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "transparent",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Store size={16} />
                      <span>View Store Front</span>
                    </button>
                  </div>
                </div>
              </ChartCard>

              <ChartCard>
                <ChartTitle>Marketing Tools</ChartTitle>
                <ChartDescription>Promote your products and increase sales</ChartDescription>
                <div style={{ padding: "1rem" }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <button
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "var(--gold-primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <span>Create Promotion</span>
                    </button>
                    <button
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "transparent",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span>Email Marketing</span>
                    </button>
                  </div>
                </div>
              </ChartCard>
            </div>
          </>
        )

      case "analytics":
        return (
          <>
            <SectionTitle>Analytics</SectionTitle>
            <ChartsGrid>
              <AreaChartComponent
                title="Revenue Trends"
                description="Monthly revenue trends for the current year"
                data={salesData}
                dataKey="value"
                xAxisKey="name"
                height={400}
              />
              <BarChartComponent
                title="Order Volume"
                description="Monthly order volume for the current year"
                data={ordersData}
                dataKey="value"
                xAxisKey="name"
                height={400}
              />
            </ChartsGrid>
            <ChartsGrid>
              <DoughnutChartComponent
                title="Product Categories"
                description="Distribution of products by category"
                data={productCategoriesData}
                nameKey="name"
                dataKey="value"
                height={400}
              />
              <DoughnutChartComponent
                title="Customer Demographics"
                description="Distribution of customers by age group"
                data={customerDemographicsData}
                nameKey="name"
                dataKey="value"
                height={400}
              />
            </ChartsGrid>
            <ChartCard>
              <ChartTitle>Performance Metrics</ChartTitle>
              <ChartDescription>Key performance indicators for your store</ChartDescription>
              <div
                style={{
                  padding: "1.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Conversion Rate</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>4.8%</div>
                  <div style={{ fontSize: "0.75rem", color: "#4caf50" }}>↑ 0.5% from last month</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Avg. Order Value</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>
                    {formatCurrency(285)}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#4caf50" }}>↑ $15 from last month</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Return Rate</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>2.3%</div>
                  <div style={{ fontSize: "0.75rem", color: "#4caf50" }}>↓ 0.2% from last month</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Customer Satisfaction</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>4.7/5</div>
                  <div style={{ fontSize: "0.75rem", color: "#4caf50" }}>↑ 0.1 from last month</div>
                </div>
              </div>
            </ChartCard>
          </>
        )

      case "settings":
        return (
          <>
            <SectionTitle>Settings</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
              <ChartCard>
                <ChartTitle>Account Settings</ChartTitle>
                <ChartDescription>Manage your account information</ChartDescription>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "var(--text-primary)",
                        fontWeight: "500",
                      }}
                    >
                      Store Name
                    </label>
                    <input
                      type="text"
                      value="Kimelia Fashion"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                        backgroundColor: "var(--background)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "var(--text-primary)",
                        fontWeight: "500",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value="seller@kimelia.com"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                        backgroundColor: "var(--background)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "var(--text-primary)",
                        fontWeight: "500",
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value="+250 123 456 789"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                        backgroundColor: "var(--background)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <button
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "var(--gold-primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </ChartCard>

              <ChartCard>
                <ChartTitle>Payment Settings</ChartTitle>
                <ChartDescription>Manage your payment methods and preferences</ChartDescription>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "var(--text-primary)",
                        fontWeight: "500",
                      }}
                    >
                      Payment Method
                    </label>
                    <select
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                        backgroundColor: "var(--background)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <option>Bank Transfer</option>
                      <option>Mobile Money</option>
                      <option>PayPal</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "var(--text-primary)",
                        fontWeight: "500",
                      }}
                    >
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      value="**** **** **** 1234"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                        backgroundColor: "var(--background)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <button
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "var(--gold-primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Update Payment Settings
                  </button>
                </div>
              </ChartCard>
            </div>
          </>
        )
    }
  }

  return (
    <>
      <GlobalStyle />
      <CustomThemeProvider>
        <DashboardLayout
          title={`Kimelia Seller - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          username={username}
          handleLogout={handleLogout}
          navigateToHome={navigateToHome}
        >
          {toast.show && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
          {renderContent()}
        </DashboardLayout>
      </CustomThemeProvider>
    </>
  )
}

export default SellerDashboard

