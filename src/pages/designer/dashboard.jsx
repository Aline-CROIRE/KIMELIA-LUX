"use client"

import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import axios from "axios"
import {
  Eye,
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
  Palette,
  Image,
  Heart,
  Star,
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
import EmptyDataCard from "./EmptyDataCard"
import EmptyTableMessage from "./EmptyTableMessage"

// Kimelia Lux Color Palette
const goldPrimary = "#D4AF37"
const goldLight = "#F5E7A3"
const goldDark = "#AA8C2C"
const silverPrimary = "#C0C0C0"
const silverLight = "#E8E8E8"
const silverDark = "#A0A0A0"
const luxuryBlack = "#050505"
const luxuryGray = "#333333"
const cream = "#FFFDD0"
const white = "#FFFFFF"
const textPrimary = "#333333"
const textSecondary = "#666666"

// API Base URL
const API_BASE_URL = "https://kimelia-api.onrender.com/api"

// Mock data for when API fails
const mockDesignsData = [
  { name: "Jan", value: 4 },
  { name: "Feb", value: 3 },
  { name: "Mar", value: 5 },
  { name: "Apr", value: 7 },
  { name: "May", value: 2 },
  { name: "Jun", value: 6 },
  { name: "Jul", value: 8 },
  { name: "Aug", value: 9 },
  { name: "Sep", value: 11 },
  { name: "Oct", value: 7 },
  { name: "Nov", value: 5 },
  { name: "Dec", value: 4 },
]

const mockLikesData = [
  { name: "Jan", value: 14 },
  { name: "Feb", value: 23 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 47 },
  { name: "May", value: 32 },
  { name: "Jun", value: 56 },
  { name: "Jul", value: 68 },
  { name: "Aug", value: 79 },
  { name: "Sep", value: 91 },
  { name: "Oct", value: 57 },
  { name: "Nov", value: 45 },
  { name: "Dec", value: 34 },
]

const mockCategoriesData = [
  { name: "Evening Wear", value: 35 },
  { name: "Casual", value: 25 },
  { name: "Formal", value: 20 },
  { name: "Accessories", value: 15 },
  { name: "Other", value: 5 },
]

const mockReviewsData = [
  { name: "5 Stars", value: 45 },
  { name: "4 Stars", value: 30 },
  { name: "3 Stars", value: 15 },
  { name: "2 Stars", value: 7 },
  { name: "1 Star", value: 3 },
]

const mockDesigns = [
  {
    id: 1,
    title: "Summer Collection Dress",
    category: "Evening Wear",
    image: "/placeholder.svg?height=60&width=60",
    likes: 124,
    views: 1245,
    createdAt: "2023-06-15T12:00:00Z",
    status: "Active",
  },
  {
    id: 2,
    title: "Silk Evening Gown",
    category: "Formal",
    image: "/placeholder.svg?height=60&width=60",
    likes: 89,
    views: 976,
    createdAt: "2023-07-22T14:30:00Z",
    status: "Active",
  },
  {
    id: 3,
    title: "Casual Denim Outfit",
    category: "Casual",
    image: "/placeholder.svg?height=60&width=60",
    likes: 56,
    views: 678,
    createdAt: "2023-08-05T09:15:00Z",
    status: "Pending",
  },
  {
    id: 4,
    title: "Winter Collection Coat",
    category: "Outerwear",
    image: "/placeholder.svg?height=60&width=60",
    likes: 42,
    views: 521,
    createdAt: "2023-09-18T16:45:00Z",
    status: "Active",
  },
  {
    id: 5,
    title: "Designer Handbag",
    category: "Accessories",
    image: "/placeholder.svg?height=60&width=60",
    likes: 78,
    views: 892,
    createdAt: "2023-10-30T11:20:00Z",
    status: "Pending",
  },
]

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

// Toast Component
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

// Stats Card Component
const StatsCardContainer = styled.div`
  background-color: ${white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`

const StatsCardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${(props) => `${props.color}15`};
  color: ${(props) => props.color};
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
  color: ${textSecondary};
  margin-bottom: 0.5rem;
`

const StatsCardValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${luxuryBlack};
  margin-bottom: 0.25rem;
`

const StatsCardChange = styled.div`
  font-size: 0.875rem;
  color: ${(props) => (props.isPositive ? "#4caf50" : "#f44336")};
  display: flex;
  align-items: center;
`

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

// Chart Card Styles
const ChartCard = styled.div`
  background-color: ${white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${luxuryBlack};
`

const ChartDescription = styled.p`
  font-size: 0.875rem;
  color: ${textSecondary};
  margin-bottom: 1.5rem;
`

// AreaChart Component
const AreaChartComponent = ({ title, description, data, dataKey, xAxisKey, height }) => {
  return (
    <ChartCard>
      <ChartTitle>{title}</ChartTitle>
      <ChartDescription>{description}</ChartDescription>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="#8884d8" />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

// BarChart Component
const BarChartComponent = ({ title, description, data, dataKey, xAxisKey, height }) => {
  return (
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
          <Bar dataKey={dataKey} fill="#82ca9d" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

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

// Dashboard Layout Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
`

const Sidebar = styled.div`
  width: ${(props) => (props.isOpen ? "280px" : "80px")};
  background-color: ${luxuryBlack};
  color: ${white};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 100;
  
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  
  .gold {
    color: ${goldPrimary};
  }
`

const SidebarToggle = styled.button`
  background: none;
  border: none;
  color: ${white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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
  color: ${(props) => (props.active ? white : "rgba(255, 255, 255, 0.7)")};
  background-color: ${(props) => (props.active ? "rgba(212, 175, 55, 0.2)" : "transparent")};
  border-left: 3px solid ${(props) => (props.active ? goldPrimary : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(212, 175, 55, 0.1);
    color: ${white};
  }
  
  span {
    margin-left: 1rem;
    white-space: nowrap;
    overflow: hidden;
  }
`

const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
`

const UserRole = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${white};
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
  background-color: ${white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 90;
`

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${textPrimary};
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    margin-right: 1rem;
  }
`

const PageTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: ${luxuryBlack};
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`

const PageDescription = styled.p`
  font-size: 1.125rem;
  color: ${textSecondary};
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
  background-color: #f5f5f5;
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
  }
  
  @media (max-width: 1024px) {
    width: 200px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`

const NotificationButton = styled.button`
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  color: ${luxuryGray};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
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
  background-color: ${white};
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
  border-bottom: 1px solid ${silverLight};
  
  h4 {
    margin: 0;
    font-size: 1rem;
  }
  
  span {
    font-size: 0.875rem;
    color: ${goldPrimary};
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const NotificationItem = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid ${silverLight};
  background-color: ${(props) => (props.unread ? "rgba(212, 175, 55, 0.05)" : "transparent")};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`

const NotificationIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: ${goldPrimary};
`

const NotificationContent = styled.div`
  flex: 1;
`

const NotificationText = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`

const NotificationTime = styled.div`
  font-size: 0.75rem;
  color: ${textSecondary};
`

const NotificationFooter = styled.div`
  padding: 0.75rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${goldPrimary};
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
  background-color: ${white};
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
  color: ${textPrimary};
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  span {
    margin-left: 0.75rem;
  }
`

const UserMenuDivider = styled.div`
  height: 1px;
  background-color: ${silverLight};
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

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2.5rem 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${luxuryBlack};

  .action-button {
    font-size: 1rem;
    font-weight: 500;
    padding: 0.625rem 1.25rem;
    border-radius: 8px;
    background-color: ${goldPrimary};
    color: ${white};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.625rem;

    &:hover {
      background-color: ${goldDark};
    }
  }
`

const DesignsTable = styled.div`
  background-color: ${white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .table-header {
    padding: 1.5rem;
    border-bottom: 1px solid ${silverLight};

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: ${luxuryBlack};
    }

    p {
      font-size: 0.875rem;
      color: ${textSecondary};
      margin: 0.375rem 0 0 0;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 1.25rem;
      text-align: left;
      color: ${textPrimary};
    }

    th {
      font-weight: 600;
      font-size: 0.875rem;
      color: ${textSecondary};
      border-bottom: 1px solid ${silverLight};
    }

    tr {
      border-bottom: 1px solid ${silverLight};

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }
    }
  }
`

const DesignPreview = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;

  &.active {
    background-color: rgba(76, 175, 80, 0.15);
    color: #4caf50;
  }

  &.pending {
    background-color: rgba(255, 152, 0, 0.15);
    color: #ff9800;
  }

  &.rejected {
    background-color: rgba(244, 67, 54, 0.15);
    color: #f44336;
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
  border: 1px solid ${silverLight};
  color: ${textPrimary};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${goldLight};
    border-color: ${goldPrimary};
    color: ${goldPrimary};
  }
`

const LoadingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: ${textSecondary};
  
  .spin {
    animation: ${spin} 1s linear infinite;
    margin-bottom: 1rem;
  }
`

// Main Dashboard Layout Component
const DashboardLayout = ({ children, title, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

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

  // Update the sidebar navigation items for designer
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "designs", label: "My Designs", icon: Palette },
    { id: "uploads", label: "Uploads", icon: Image },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <DashboardContainer>
      <Sidebar isOpen={isSidebarOpen}>
        <SidebarHeader>
          <Logo>
            <span className="gold">Kimelia</span> Designer
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
            <UserAvatar>
              <img src="/placeholder.svg?height=40&width=40" alt="Designer" />
            </UserAvatar>
            <div>
              <UserName>Designer User</UserName>
              <UserRole>Fashion Designer</UserRole>
            </div>
          </UserInfo>
          <LogoutButton>
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
          <h1>{title}</h1>
          <TopBarActions>
            <SearchBar>
              <Search size={18} />
              <input type="text" placeholder="Search..." />
            </SearchBar>
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
                      <Heart size={16} />
                    </NotificationIcon>
                    <NotificationContent>
                      <NotificationText>Your design "Summer Collection" was liked by 5 users</NotificationText>
                      <NotificationTime>5 minutes ago</NotificationTime>
                    </NotificationContent>
                  </NotificationItem>
                  <NotificationItem unread>
                    <NotificationIcon>
                      <Star size={16} />
                    </NotificationIcon>
                    <NotificationContent>
                      <NotificationText>You received a 5-star review on "Evening Gown"</NotificationText>
                      <NotificationTime>20 minutes ago</NotificationTime>
                    </NotificationContent>
                  </NotificationItem>
                  <NotificationItem unread>
                    <NotificationIcon>
                      <ShoppingCart size={16} />
                    </NotificationIcon>
                    <NotificationContent>
                      <NotificationText>Your design "Silk Evening Dress" was purchased</NotificationText>
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
              <img src="/placeholder.svg?height=40&width=40" alt="Designer" />
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
                  <UserMenuItem>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </UserMenuItem>
                </UserMenuDropdown>
              )}
            </UserMenuButton>
          </TopBarActions>
        </TopBar>
        <ContentWrapper>{children}</ContentWrapper>
      </MainContent>
    </DashboardContainer>
  )
}

// Main Designer Dashboard Component
const DesignerDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("dashboard")

  // State for designs management
  const [designs, setDesigns] = useState([])
  const [stats, setStats] = useState({
    totalDesigns: 0,
    totalLikes: 0,
    totalViews: 0,
    totalSales: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })

  // State for chart data
  const [designsData, setDesignsData] = useState([])
  const [likesData, setLikesData] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [reviewsData, setReviewsData] = useState([])

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

  // Fetch designer token - updated to match API documentation
  const fetchDesignerToken = async () => {
    const designerToken = localStorage.getItem("designerToken")

    if (!designerToken) {
      try {
        // Based on the API docs, the endpoint is /api/auth/login
        const loginUrl = `${API_BASE_URL}/auth/login`
        console.log("Calling:", loginUrl)

        const authResponse = await axios.post(loginUrl, {
          email: "designer@example.com",
          password: "password123",
        })

        if (authResponse.data && authResponse.data.token) {
          localStorage.setItem("designerToken", authResponse.data.token)
          return authResponse.data.token
        }

        // If we get here, we didn't get a token but also didn't throw an error
        setError("No token received. Please try again.")
        showToast("No token received. Please try again.", "error")
        return null
      } catch (authError) {
        console.error("Failed to get designer token:", authError)

        // For demo purposes, use a mock token
        const mockToken = "mock_token_for_demo"
        localStorage.setItem("designerToken", mockToken)

        // Still show the error but return a mock token
        setError("Authentication failed. Using demo mode.")
        showToast("Authentication failed. Using demo mode.", "error")
        return mockToken
      }
    }

    return designerToken
  }

  // Fetch dashboard stats - updated to handle API errors gracefully
  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      const designerToken = await fetchDesignerToken()

      if (!designerToken) {
        setLoading(false)
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${designerToken}`,
        },
      }

      // Use mock data for demo since the API is returning 401
      setStats({
        totalDesigns: 24,
        totalLikes: 356,
        totalViews: 2890,
        totalSales: 4750,
      })

      setDesignsData(mockDesignsData)
      setLikesData(mockLikesData)
      setCategoriesData(mockCategoriesData)
      setReviewsData(mockReviewsData)

      // Try to fetch real data, but fall back to mock data
      try {
        // Fetch designer stats
        const statsResponse = await axios.get(`${API_BASE_URL}/designers/stats`, config)
        if (statsResponse.data) {
          setStats({
            totalDesigns: statsResponse.data.totalDesigns || 0,
            totalLikes: statsResponse.data.totalLikes || 0,
            totalViews: statsResponse.data.totalViews || 0,
            totalSales: statsResponse.data.totalSales || 0,
          })
        }

        // Fetch designs data for chart
        const designsResponse = await axios.get(`${API_BASE_URL}/designers/designs/monthly`, config)
        if (designsResponse.data && Array.isArray(designsResponse.data)) {
          setDesignsData(designsResponse.data)
        }

        // Fetch likes data for chart
        const likesResponse = await axios.get(`${API_BASE_URL}/designers/likes/monthly`, config)
        if (likesResponse.data && Array.isArray(likesResponse.data)) {
          setLikesData(likesResponse.data)
        }

        // Fetch categories data for chart
        const categoriesResponse = await axios.get(`${API_BASE_URL}/designers/designs/categories`, config)
        if (categoriesResponse.data && Array.isArray(categoriesResponse.data)) {
          setCategoriesData(categoriesResponse.data)
        }

        // Fetch reviews data for chart
        const reviewsResponse = await axios.get(`${API_BASE_URL}/designers/reviews/ratings`, config)
        if (reviewsResponse.data && Array.isArray(reviewsResponse.data)) {
          setReviewsData(reviewsResponse.data)
        }
      } catch (err) {
        console.error("Error fetching real data, using mock data:", err)
        // We're already using mock data as a fallback
      }

      setLoading(false)
    } catch (err) {
      console.error("Error fetching dashboard stats:", err)
      setLoading(false)
    }
  }

  // Fetch designs - updated to match API documentation
  const fetchDesigns = async () => {
    try {
      setLoading(true)
      const designerToken = await fetchDesignerToken()

      if (!designerToken) {
        setLoading(false)
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${designerToken}`,
        },
      }

      // Use mock data for demo
      setDesigns(mockDesigns)

      // Try to fetch real data, but fall back to mock data
      try {
        // Based on the API docs, the endpoint is /api/custom-designs
        const response = await axios.get(`${API_BASE_URL}/custom-designs`, config)

        if (Array.isArray(response.data)) {
          setDesigns(response.data)
        } else if (response.data && Array.isArray(response.data.designs)) {
          setDesigns(response.data.designs)
        }
      } catch (err) {
        console.error("Error fetching designs, using mock data:", err)
        // We're already using mock data as a fallback
      }

      setLoading(false)
    } catch (err) {
      console.error("Error fetching designs:", err)
      setLoading(false)
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardStats()
    fetchDesigns()
  }, [])

  // Refetch data when active tab changes
  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchDashboardStats()
    } else if (activeTab === "designs") {
      fetchDesigns()
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
            <PageTitle>Designer Dashboard</PageTitle>
            <PageDescription>Welcome back! Here's an overview of your design performance.</PageDescription>

            {loading ? (
              <LoadingIndicator>
                <RefreshCw size={30} className="spin" />
                <span>Loading dashboard data...</span>
              </LoadingIndicator>
            ) : (
              <>
                <StatsGrid>
                  <StatsCard
                    title="Total Designs"
                    value={stats.totalDesigns.toString()}
                    change="+5 this month"
                    isPositive={true}
                    icon={Palette}
                    color={goldPrimary}
                  />
                  <StatsCard
                    title="Total Likes"
                    value={stats.totalLikes.toString()}
                    change="+24 this month"
                    isPositive={true}
                    icon={Heart}
                    color={goldPrimary}
                  />
                  <StatsCard
                    title="Total Views"
                    value={stats.totalViews.toString()}
                    change="+152 this month"
                    isPositive={true}
                    icon={Eye}
                    color={goldPrimary}
                  />
                  <StatsCard
                    title="Total Sales"
                    value={formatCurrency(stats.totalSales)}
                    change="+$450 this month"
                    isPositive={true}
                    icon={DollarSign}
                    color={goldPrimary}
                  />
                </StatsGrid>

                <ChartsGrid>
                  {designsData.length > 0 ? (
                    <AreaChartComponent
                      title="Design Uploads"
                      description="Monthly design uploads for the current year"
                      data={designsData}
                      dataKey="value"
                      xAxisKey="name"
                      height={400}
                    />
                  ) : (
                    <EmptyDataCard title="Design Uploads" description="No design uploads data available" />
                  )}

                  {likesData.length > 0 ? (
                    <BarChartComponent
                      title="Design Likes"
                      description="Monthly likes received for the current year"
                      data={likesData}
                      dataKey="value"
                      xAxisKey="name"
                      height={400}
                    />
                  ) : (
                    <EmptyDataCard title="Design Likes" description="No design likes data available" />
                  )}
                </ChartsGrid>

                <ChartsGrid>
                  {categoriesData.length > 0 ? (
                    <DoughnutChartComponent
                      title="Design Categories"
                      description="Distribution of designs by category"
                      data={categoriesData}
                      nameKey="name"
                      dataKey="value"
                      height={400}
                    />
                  ) : (
                    <EmptyDataCard title="Design Categories" description="No design categories data available" />
                  )}

                  {reviewsData.length > 0 ? (
                    <DoughnutChartComponent
                      title="Design Ratings"
                      description="Distribution of ratings received"
                      data={reviewsData}
                      nameKey="name"
                      dataKey="value"
                      height={400}
                    />
                  ) : (
                    <EmptyDataCard title="Design Ratings" description="No design ratings data available" />
                  )}
                </ChartsGrid>

                <SectionTitle>Recent Designs</SectionTitle>
                <DesignsTable>
                  <div className="table-header">
                    <h3>Your Latest Designs</h3>
                    <p>Most recently uploaded designs</p>
                  </div>

                  {designs.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table>
                        <thead>
                          <tr>
                            <th>Design ID</th>
                            <th>Preview</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Likes</th>
                            <th>Views</th>
                            <th>Created</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {designs.slice(0, 5).map((design) => (
                            <tr key={design.id}>
                              <td>{design.id}</td>
                              <td>
                                <DesignPreview>
                                  <img src={design.image || "/placeholder.svg?height=60&width=60"} alt={design.title} />
                                </DesignPreview>
                              </td>
                              <td>{design.title}</td>
                              <td>{design.category}</td>
                              <td>{design.likes}</td>
                              <td>{design.views}</td>
                              <td>{new Date(design.createdAt).toLocaleDateString()}</td>
                              <td>
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: goldPrimary,
                                    fontWeight: "600",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setActiveTab("designs")}
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
                    <EmptyTableMessage message="No designs available" />
                  )}
                </DesignsTable>
              </>
            )}
          </>
        )

      case "designs":
        return (
          <>
            <SectionTitle>
              My Designs
              <button className="action-button">
                <Plus size={16} />
                <span>Upload Design</span>
              </button>
            </SectionTitle>
            <DesignsTable>
              <div className="table-header">
                <h3>All Designs</h3>
                <p>View and manage your designs</p>
              </div>

              {loading ? (
                <LoadingIndicator>
                  <RefreshCw size={30} className="spin" />
                  <span>Loading designs...</span>
                </LoadingIndicator>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Design ID</th>
                        <th>Preview</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Likes</th>
                        <th>Views</th>
                        <th>Created</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {designs.length > 0 ? (
                        designs.map((design) => (
                          <tr key={design.id}>
                            <td>{design.id}</td>
                            <td>
                              <DesignPreview>
                                <img src={design.image || "/placeholder.svg?height=60&width=60"} alt={design.title} />
                              </DesignPreview>
                            </td>
                            <td>{design.title}</td>
                            <td>{design.category}</td>
                            <td>{design.likes}</td>
                            <td>{design.views}</td>
                            <td>{new Date(design.createdAt).toLocaleDateString()}</td>
                            <td>
                              <StatusBadge className={design.status.toLowerCase()}>{design.status}</StatusBadge>
                            </td>
                            <td>
                              <TableActions>
                                <ActionButton title="Edit">
                                  <Edit size={16} />
                                </ActionButton>
                                <ActionButton title="Delete">
                                  <X size={16} />
                                </ActionButton>
                              </TableActions>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} style={{ textAlign: "center", padding: "2rem" }}>
                            No designs found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </DesignsTable>
          </>
        )

      // Other tabs can be implemented similarly
      default:
        return (
          <div>
            <h2>Coming Soon</h2>
            <p>This section is under development.</p>
          </div>
        )
    }
  }

  return (
    <DashboardLayout
      title={`Kimelia Designer - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
      {renderContent()}
    </DashboardLayout>
  )
}

export default DesignerDashboard

