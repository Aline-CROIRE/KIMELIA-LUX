"use client"


import { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import {
  Download,
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
  BarChart2,
  DollarSign,
  Calendar,
  X,
  AlertCircle,
  CheckCircle,
  Menu,
  Home,
} from "lucide-react"
import {
  LineChart,
  Line,
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
const API_DOCS_URL = "https://kimelia-api.onrender.com/api-docs"

// Toast Component
const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`

const ToastContent = styled.div`
  background-color: #fff;
  color: #333;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
`

const ToastMessage = styled.p`
  margin: 0;
  font-size: 14px;
`

const ToastCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0;
  margin-left: auto;
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

// Chart Components
const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${silverLight};
`

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${luxuryBlack};
  margin: 0;
`

const ChartDescription = styled.p`
  font-size: 0.875rem;
  color: ${textSecondary};
  margin: 0.375rem 0 0 0;
`

const ChartActions = styled.div`
  display: flex;
  gap: 1rem;
`

const ChartActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: ${white};
  border: 1px solid ${silverLight};
  color: ${textPrimary};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${goldLight};
    border-color: ${goldLight};
  }
`

const ChartContent = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`

const EmptyChartMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${textSecondary};
  
  .spin {
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

// Section Title Component
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

// Products Table Component
const ProductsTable = styled.div`
  background-color: ${white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 1rem;
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

// Line Chart Component
const LineChartComponent = ({ title, description, data, dataKey = "value", xAxisKey = "name", height }) => {
  return (
    <ChartContainer height={height}>
      <ChartHeader>
        <div>
          <ChartTitle>{title}</ChartTitle>
          <ChartDescription>{description}</ChartDescription>
        </div>
        <ChartActions>
          <ChartActionButton>
            <Calendar size={16} />
            <span>This Month</span>
          </ChartActionButton>
          <ChartActionButton>
            <Download size={16} />
          </ChartActionButton>
        </ChartActions>
      </ChartHeader>
      <ChartContent>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={silverLight} />
              <XAxis dataKey={xAxisKey} stroke={textSecondary} />
              <YAxis stroke={textSecondary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: white,
                  borderColor: silverLight,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={goldPrimary}
                strokeWidth={2}
                activeDot={{ r: 8, fill: goldPrimary, stroke: white, strokeWidth: 2 }}
                dot={{ r: 4, fill: goldPrimary, stroke: white, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChartMessage>
            <RefreshCw size={30} className="spin" />
            <p>Loading chart data...</p>
          </EmptyChartMessage>
        )}
      </ChartContent>
    </ChartContainer>
  )
}

// Bar Chart Component
const BarChartComponent = ({ title, description, data, dataKey = "value", xAxisKey = "name", height }) => {
  return (
    <ChartContainer height={height}>
      <ChartHeader>
        <div>
          <ChartTitle>{title}</ChartTitle>
          <ChartDescription>{description}</ChartDescription>
        </div>
        <ChartActions>
          <ChartActionButton>
            <Calendar size={16} />
            <span>This Month</span>
          </ChartActionButton>
          <ChartActionButton>
            <Download size={16} />
          </ChartActionButton>
        </ChartActions>
      </ChartHeader>
      <ChartContent>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={silverLight} />
              <XAxis dataKey={xAxisKey} stroke={textSecondary} />
              <YAxis stroke={textSecondary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: white,
                  borderColor: silverLight,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Bar dataKey={dataKey} fill={goldPrimary} radius={[4, 4, 0, 0]} barSize={30} />
            </RechartsBarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChartMessage>
            <RefreshCw size={30} className="spin" />
            <p>Loading chart data...</p>
          </EmptyChartMessage>
        )}
      </ChartContent>
    </ChartContainer>
  )
}

// Area Chart Component
const AreaChartComponent = ({ title, description, data, dataKey = "value", xAxisKey = "name", height }) => {
  return (
    <ChartContainer height={height}>
      <ChartHeader>
        <div>
          <ChartTitle>{title}</ChartTitle>
          <ChartDescription>{description}</ChartDescription>
        </div>
        <ChartActions>
          <ChartActionButton>
            <Calendar size={16} />
            <span>This Month</span>
          </ChartActionButton>
          <ChartActionButton>
            <Download size={16} />
          </ChartActionButton>
        </ChartActions>
      </ChartHeader>
      <ChartContent>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={goldPrimary} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={goldPrimary} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={silverLight} />
              <XAxis dataKey={xAxisKey} stroke={textSecondary} />
              <YAxis stroke={textSecondary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: white,
                  borderColor: silverLight,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Area type="monotone" dataKey={dataKey} stroke={goldPrimary} fillOpacity={1} fill="url(#colorValue)" />
            </RechartsAreaChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChartMessage>
            <RefreshCw size={30} className="spin" />
            <p>Loading chart data...</p>
          </EmptyChartMessage>
        )}
      </ChartContent>
    </ChartContainer>
  )
}

// Doughnut Chart Component
const DoughnutChartComponent = ({ title, description, data, nameKey = "name", dataKey = "value", height }) => {
  const COLORS = [goldPrimary, silverPrimary, "#2CCCE4", "#FF9E80", "#B388FF"]

  return (
    <ChartContainer height={height}>
      <ChartHeader>
        <div>
          <ChartTitle>{title}</ChartTitle>
          <ChartDescription>{description}</ChartDescription>
        </div>
        <ChartActions>
          <ChartActionButton>
            <Calendar size={16} />
            <span>This Month</span>
          </ChartActionButton>
          <ChartActionButton>
            <Download size={16} />
          </ChartActionButton>
        </ChartActions>
      </ChartHeader>
      <ChartContent>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey={dataKey}
                nameKey={nameKey}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: white,
                  borderColor: silverLight,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value, name, props) => [`${value}`, props.payload[nameKey]]}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{
                  paddingLeft: "20px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChartMessage>
            <RefreshCw size={30} className="spin" />
            <p>Loading chart data...</p>
          </EmptyChartMessage>
        )}
      </ChartContent>
    </ChartContainer>
  )
}

// Main Dashboard Layout Component
const DashboardLayout = ({ children, title, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [adminName, setAdminName] = useState("Admin User") // Default admin name

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

    // Get admin name from localStorage if available
    const storedAdminName = localStorage.getItem("adminName")
    if (storedAdminName) {
      setAdminName(storedAdminName)
    }

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Update the sidebar navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "designers", label: "Designers", icon: Edit },
    { id: "sellers", label: "Sellers", icon: ShoppingCart },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Handle logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminName")
      window.location.href = "/"
    }
  }

  return (
    <DashboardContainer>
      <Sidebar isOpen={isSidebarOpen}>
        <SidebarHeader>
          <Logo>
            <span className="gold">Kimelia</span> Admin
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
              <img src="https://via.placeholder.com/40" alt="Admin" />
            </UserAvatar>
            <div>
              <UserName>{adminName}</UserName>
              <UserRole>Administrator</UserRole>
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
              <img src="https://via.placeholder.com/40" alt="Admin" />
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
        <ContentWrapper>{children}</ContentWrapper>
      </MainContent>
    </DashboardContainer>
  )
}

// Main Admin Dashboard Component
const AdminDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("dashboard")

  // State for products management
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  // Update the state declarations
  const [designers, setDesigners] = useState([])
  const [sellers, setSellers] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDesigners: 0,
    totalSellers: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    imageFile: null,
    imagePreview: "",
    tags: [],
    sizes: [],
    colors: [],
    materials: [],
    isCustomizable: false,
    customizationOptions: "",
  })
  const [viewMode, setViewMode] = useState("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiDocs, setApiDocs] = useState(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
  })
  const [adminName, setAdminName] = useState("Admin User") // Default admin name

  // State for chart data
  const [salesData, setSalesData] = useState([])
  const [ordersData, setOrdersData] = useState([])
  const [productCategoriesData, setProductCategoriesData] = useState([])
  const [customerDemographicsData, setCustomerDemographicsData] = useState([])
  const [customDesigns, setCustomDesigns] = useState([])

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

  // Fetch API documentation
  const fetchApiDocs = async () => {
    try {
      const response = await axios.get(API_DOCS_URL)
      setApiDocs(response.data)
      console.log("API Docs:", response.data)
    } catch (err) {
      console.error("Error fetching API docs:", err)
    }
  }

  // Fetch admin token
  const fetchAdminToken = async () => {
    const adminToken = localStorage.getItem("adminToken")

    if (!adminToken) {
      try {
        const loginUrl = `${API_BASE_URL}/auth/login`
        console.log("Calling:", loginUrl)

        const authResponse = await axios.post(loginUrl, {
          email: "niyocroirealine1@gmail.com",
          password: "1234567890",
        })

        if (authResponse.data && authResponse.data.token) {
          localStorage.setItem("adminToken", authResponse.data.token)

          // Store admin name if available
          if (authResponse.data.user && authResponse.data.user.name) {
            localStorage.setItem("adminName", authResponse.data.user.name)
            setAdminName(authResponse.data.user.name)
          }

          return authResponse.data.token
        }

        setError("No token received. Please try again.")
        showToast("No token received. Please try again.", "error")
        return null
      } catch (authError) {
        console.error("Failed to get admin token:", authError)
        setError("Authentication failed. Please login again.")
        showToast("Authentication failed. Please login again.", "error")
        return null
      }
    }

    return adminToken
  }

  // Update the fetchDashboardStats function to fetch user, designer, and seller stats
  const fetchDashboardStats = async () => {
    try {
      const adminToken = await fetchAdminToken()

      if (!adminToken) {
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }

      // Fetch stats from the API
      const statsResponse = await axios.get(`${API_BASE_URL}/stats`, config)
      console.log("Stats response:", statsResponse.data)

      if (statsResponse.data) {
        setStats({
          totalUsers: statsResponse.data.totalUsers || 0,
          totalDesigners: statsResponse.data.totalDesigners || 0,
          totalSellers: statsResponse.data.totalSellers || 0,
          totalRevenue: statsResponse.data.totalRevenue || 0,
        })
      } else {
        // Fallback to mock data
        setStats({
          totalUsers: 3842,
          totalDesigners: 156,
          totalSellers: 278,
          totalRevenue: 84245,
        })
      }

      // Fetch user growth data for chart
      const userGrowthResponse = await axios.get(`${API_BASE_URL}/stats/users/growth`, config)
      console.log("User growth response:", userGrowthResponse.data)
      if (userGrowthResponse.data && Array.isArray(userGrowthResponse.data)) {
        setSalesData(userGrowthResponse.data)
      } else {
        // Fallback to mock data if API doesn't return expected format
        const mockUserGrowthData = [
          { name: "Jan", value: 250 },
          { name: "Feb", value: 320 },
          { name: "Mar", value: 410 },
          { name: "Apr", value: 530 },
          { name: "May", value: 620 },
          { name: "Jun", value: 750 },
          { name: "Jul", value: 830 },
          { name: "Aug", value: 940 },
          { name: "Sep", value: 1050 },
          { name: "Oct", value: 1180 },
          { name: "Nov", value: 1290 },
          { name: "Dec", value: 1420 },
        ]
        setSalesData(mockUserGrowthData)
      }

      // Fetch designer activity data for chart
      const designerActivityResponse = await axios.get(`${API_BASE_URL}/stats/designers/activity`, config)
      console.log("Designer activity response:", designerActivityResponse.data)
      if (designerActivityResponse.data && Array.isArray(designerActivityResponse.data)) {
        setOrdersData(designerActivityResponse.data)
      } else {
        // Fallback to mock data
        const mockDesignerActivityData = [
          { name: "Jan", value: 45 },
          { name: "Feb", value: 52 },
          { name: "Mar", value: 68 },
          { name: "Apr", value: 74 },
          { name: "May", value: 92 },
          { name: "Jun", value: 108 },
          { name: "Jul", value: 115 },
          { name: "Aug", value: 131 },
          { name: "Sep", value: 142 },
          { name: "Oct", value: 158 },
          { name: "Nov", value: 172 },
          { name: "Dec", value: 185 },
        ]
        setOrdersData(mockDesignerActivityData)
      }

      // Generate user type distribution data
      const userTypesResponse = await axios.get(`${API_BASE_URL}/stats/users/types`, config)
      console.log("User types response:", userTypesResponse.data)
      if (userTypesResponse.data && Array.isArray(userTypesResponse.data)) {
        setProductCategoriesData(userTypesResponse.data)
      } else {
        // Fallback to mock data
        const mockUserTypesData = [
          { name: "Regular Users", value: 65 },
          { name: "Designers", value: 15 },
          { name: "Sellers", value: 12 },
          { name: "Admin", value: 3 },
          { name: "Other", value: 5 },
        ]
        setProductCategoriesData(mockUserTypesData)
      }

      // Fetch user demographics data
      const demographicsResponse = await axios.get(`${API_BASE_URL}/stats/demographics`, config)
      console.log("Demographics response:", demographicsResponse.data)
      if (demographicsResponse.data && Array.isArray(demographicsResponse.data)) {
        setCustomerDemographicsData(demographicsResponse.data)
      } else {
        // Fallback to mock data
        const mockDemographicsData = [
          { name: "18-24", value: 15 },
          { name: "25-34", value: 30 },
          { name: "35-44", value: 25 },
          { name: "45-54", value: 20 },
          { name: "55+", value: 10 },
        ]
        setCustomerDemographicsData(mockDemographicsData)
      }
    } catch (err) {
      console.error("Error fetching dashboard stats:", err)
      // Fallback to mock data for all charts
      setSalesData([
        { name: "Jan", value: 250 },
        { name: "Feb", value: 320 },
        { name: "Mar", value: 410 },
        { name: "Apr", value: 530 },
        { name: "May", value: 620 },
        { name: "Jun", value: 750 },
        { name: "Jul", value: 830 },
        { name: "Aug", value: 940 },
        { name: "Sep", value: 1050 },
        { name: "Oct", value: 1180 },
        { name: "Nov", value: 1290 },
        { name: "Dec", value: 1420 },
      ])

      setOrdersData([
        { name: "Jan", value: 45 },
        { name: "Feb", value: 52 },
        { name: "Mar", value: 68 },
        { name: "Apr", value: 74 },
        { name: "May", value: 92 },
        { name: "Jun", value: 108 },
        { name: "Jul", value: 115 },
        { name: "Aug", value: 131 },
        { name: "Sep", value: 142 },
        { name: "Oct", value: 158 },
        { name: "Nov", value: 172 },
        { name: "Dec", value: 185 },
      ])

      setProductCategoriesData([
        { name: "Regular Users", value: 65 },
        { name: "Designers", value: 15 },
        { name: "Sellers", value: 12 },
        { name: "Admin", value: 3 },
        { name: "Other", value: 5 },
      ])

      setCustomerDemographicsData([
        { name: "18-24", value: 15 },
        { name: "25-34", value: 30 },
        { name: "35-44", value: 25 },
      ])

      // Set fallback stats
      setStats({
        totalUsers: 3842,
        totalDesigners: 156,
        totalSellers: 278,
        totalRevenue: 84245,
      })
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const adminToken = await fetchAdminToken()

      const config = {
        headers: {},
      }

      if (adminToken) {
        config.headers["Authorization"] = `Bearer ${adminToken}`
      }

      const response = await axios.get(`${API_BASE_URL}/products`, config)

      // Ensure we're setting an array even if the API returns something unexpected
      if (Array.isArray(response.data)) {
        setProducts(response.data)
      } else if (response.data && Array.isArray(response.data.products)) {
        // Some APIs nest the array under a 'products' key
        setProducts(response.data.products)
      } else {
        console.error("API did not return an array of products:", response.data)
        setProducts([])
      }
    } catch (err) {
      console.error("Error handling products:", err)
      setError("Failed to load products. Please try again later.")
      showToast("Failed to load products. Please try again later.", "error")
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const adminToken = await fetchAdminToken()

      if (!adminToken) {
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }

      const response = await axios.get(`${API_BASE_URL}/orders`, config)

      if (Array.isArray(response.data)) {
        setOrders(response.data)
      } else if (response.data && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders)
      } else {
        // Fallback to mock data
        const mockOrders = [
          {
            id: "ORD-001",
            customer: "John Doe",
            products: ["Elegant Silk Evening Dress", "Designer Handbag"],
            total: 349.98,
            date: "2023-04-05",
            status: "completed",
          },
          {
            id: "ORD-002",
            customer: "Jane Smith",
            products: ["Formal Suit Set"],
            total: 299.99,
            date: "2023-04-06",
            status: "processing",
          },
          {
            id: "ORD-003",
            customer: "Robert Johnson",
            products: ["Casual Weekend Outfit", "Designer Sunglasses"],
            total: 189.98,
            date: "2023-04-07",
            status: "processing",
          },
          {
            id: "ORD-004",
            customer: "Emily Davis",
            products: ["Summer Collection Dress"],
            total: 129.99,
            date: "2023-04-08",
            status: "shipped",
          },
          {
            id: "ORD-005",
            customer: "Michael Wilson",
            products: ["Luxury Watch"],
            total: 499.99,
            date: "2023-04-09",
            status: "pending",
          },
        ]
        setOrders(mockOrders)
      }
    } catch (err) {
      console.error("Error fetching orders:", err)
      // Fallback to mock data
      setOrders([
        {
          id: "ORD-001",
          customer: "John Doe",
          products: ["Elegant Silk Evening Dress", "Designer Handbag"],
          total: 349.98,
          date: "2023-04-05",
          status: "completed",
        },
        {
          id: "ORD-002",
          customer: "Jane Smith",
          products: ["Formal Suit Set"],
          total: 299.99,
          date: "2023-04-06",
          status: "processing",
        },
        {
          id: "ORD-003",
          customer: "Robert Johnson",
          products: ["Casual Weekend Outfit", "Designer Sunglasses"],
          total: 189.98,
          date: "2023-04-07",
          status: "processing",
        },
        {
          id: "ORD-004",
          customer: "Emily Davis",
          products: ["Summer Collection Dress"],
          total: 129.99,
          date: "2023-04-08",
          status: "shipped",
        },
        {
          id: "ORD-005",
          customer: "Michael Wilson",
          products: ["Luxury Watch"],
          total: 499.99,
          date: "2023-04-09",
          status: "pending",
        },
      ])
    }
  }

  // Update the fetchUsers function
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const adminToken = await fetchAdminToken()

      if (!adminToken) {
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }

      const response = await axios.get(`${API_BASE_URL}/users`, config)

      if (Array.isArray(response.data)) {
        setCustomers(response.data)
      } else if (response.data && Array.isArray(response.data.users)) {
        setCustomers(response.data.users)
      } else {
        // Fallback to mock data
        const mockUsers = [
          {
            id: "USR-001",
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            role: "User",
            status: "Active",
            joinDate: "2023-01-15",
          },
          {
            id: "USR-002",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "+1 (555) 987-6543",
            role: "User",
            status: "Active",
            joinDate: "2023-02-20",
          },
          {
            id: "USR-003",
            name: "Robert Johnson",
            email: "robert.johnson@example.com",
            phone: "+1 (555) 456-7890",
            role: "User",
            status: "Inactive",
            joinDate: "2023-03-10",
          },
          {
            id: "USR-004",
            name: "Emily Davis",
            email: "emily.davis@example.com",
            phone: "+1 (555) 234-5678",
            role: "User",
            status: "Active",
            joinDate: "2023-04-05",
          },
          {
            id: "USR-005",
            name: "Michael Wilson",
            email: "michael.wilson@example.com",
            phone: "+1 (555) 876-5432",
            role: "User",
            status: "Active",
            joinDate: "2023-05-12",
          },
        ]
        setCustomers(mockUsers)
      }
      setLoading(false)
    } catch (err) {
      console.error("Error fetching users:", err)
      // Fallback to mock data
      const mockUsers = [
        {
          id: "USR-001",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          role: "User",
          status: "Active",
          joinDate: "2023-01-15",
        },
        {
          id: "USR-002",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "+1 (555) 987-6543",
          role: "User",
          status: "Active",
          joinDate: "2023-02-20",
        },
        {
          id: "USR-003",
          name: "Robert Johnson",
          email: "robert.johnson@example.com",
          phone: "+1 (555) 456-7890",
          role: "User",
          status: "Inactive",
          joinDate: "2023-03-10",
        },
        {
          id: "USR-004",
          name: "Emily Davis",
          email: "emily.davis@example.com",
          phone: "+1 (555) 234-5678",
          role: "User",
          status: "Active",
          joinDate: "2023-04-05",
        },
        {
          id: "USR-005",
          name: "Michael Wilson",
          email: "michael.wilson@example.com",
          phone: "+1 (555) 876-5432",
          role: "User",
          status: "Active",
          joinDate: "2023-05-12",
        },
      ]
      setCustomers(mockUsers)
      setLoading(false)
    }
  }

  // Add fetchDesigners function
  const fetchDesigners = async () => {
    try {
      setLoading(true)
      const adminToken = await fetchAdminToken()

      if (!adminToken) {
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }

      console.log("Fetching designers from:", `${API_BASE_URL}/designers`)
      const response = await axios.get(`${API_BASE_URL}/designers`, config)
      console.log("Designers response:", response.data)

      if (Array.isArray(response.data)) {
        setDesigners(response.data)
      } else if (response.data && Array.isArray(response.data.designers)) {
        setDesigners(response.data.designers)
      } else {
        // Fallback to mock data
        const mockDesigners = [
          {
            id: "DSG-001",
            name: "Sophia Martinez",
            email: "sophia.martinez@example.com",
            phone: "+1 (555) 111-2233",
            specialty: "Evening Wear",
            rating: 4.8,
            designs: 24,
            status: "Active",
            joinDate: "2022-11-15",
          },
          {
            id: "DSG-002",
            name: "Daniel Lee",
            email: "daniel.lee@example.com",
            phone: "+1 (555) 444-5566",
            specialty: "Casual Wear",
            rating: 4.6,
            designs: 18,
            status: "Active",
            joinDate: "2022-12-10",
          },
          {
            id: "DSG-003",
            name: "Olivia Brown",
            email: "olivia.brown@example.com",
            phone: "+1 (555) 777-8899",
            specialty: "Formal Wear",
            rating: 4.9,
            designs: 32,
            status: "Active",
            joinDate: "2023-01-05",
          },
          {
            id: "DSG-004",
            name: "William Taylor",
            email: "william.taylor@example.com",
            phone: "+1 (555) 222-3344",
            specialty: "Accessories",
            rating: 4.5,
            designs: 15,
            status: "Inactive",
            joinDate: "2023-02-20",
          },
          {
            id: "DSG-005",
            name: "Emma Garcia",
            email: "emma.garcia@example.com",
            phone: "+1 (555) 555-6677",
            specialty: "Suits",
            rating: 4.7,
            designs: 27,
            status: "Active",
            joinDate: "2023-03-15",
          },
        ]
        setDesigners(mockDesigners)
      }
      setLoading(false)
    } catch (err) {
      console.error("Error fetching designers:", err)
      // Fallback to mock data
      const mockDesigners = [
        {
          id: "DSG-001",
          name: "Sophia Martinez",
          email: "sophia.martinez@example.com",
          phone: "+1 (555) 111-2233",
          specialty: "Evening Wear",
          rating: 4.8,
          designs: 24,
          status: "Active",
          joinDate: "2022-11-15",
        },
        {
          id: "DSG-002",
          name: "Daniel Lee",
          email: "daniel.lee@example.com",
          phone: "+1 (555) 444-5566",
          specialty: "Casual Wear",
          rating: 4.6,
          designs: 18,
          status: "Active",
          joinDate: "2022-12-10",
        },
        {
          id: "DSG-003",
          name: "Olivia Brown",
          email: "olivia.brown@example.com",
          phone: "+1 (555) 777-8899",
          specialty: "Formal Wear",
          rating: 4.9,
          designs: 32,
          status: "Active",
          joinDate: "2023-01-05",
        },
        {
          id: "DSG-004",
          name: "William Taylor",
          email: "william.taylor@example.com",
          phone: "+1 (555) 222-3344",
          specialty: "Accessories",
          rating: 4.5,
          designs: 15,
          status: "Inactive",
          joinDate: "2023-02-20",
        },
        {
          id: "DSG-005",
          name: "Emma Garcia",
          email: "emma.garcia@example.com",
          phone: "+1 (555) 555-6677",
          specialty: "Suits",
          rating: 4.7,
          designs: 27,
          status: "Active",
          joinDate: "2023-03-15",
        },
      ]
      setDesigners(mockDesigners)
      setLoading(false)
    }
  }

  // Add fetchSellers function
  const fetchSellers = async () => {
    try {
      setLoading(true)
      const adminToken = await fetchAdminToken()

      if (!adminToken) {
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }

      console.log("Fetching sellers from:", `${API_BASE_URL}/sellers`)
      const response = await axios.get(`${API_BASE_URL}/sellers`, config)
      console.log("Sellers response:", response.data)

      if (Array.isArray(response.data)) {
        setSellers(response.data)
      } else if (response.data && Array.isArray(response.data.sellers)) {
        setSellers(response.data.sellers)
      } else {
        // Fallback to mock data
        const mockSellers = [
          {
            id: "SLR-001",
            name: "Alexander White",
            email: "alexander.white@example.com",
            phone: "+1 (555) 123-9876",
            storeType: "Boutique",
            rating: 4.7,
            products: 45,
            sales: 156,
            revenue: 12500,
            status: "Active",
            joinDate: "2022-10-05",
          },
          {
            id: "SLR-002",
            name: "Isabella Clark",
            email: "isabella.clark@example.com",
            phone: "+1 (555) 987-1234",
            storeType: "Designer",
            rating: 4.9,
            products: 32,
            sales: 210,
            revenue: 18750,
            status: "Active",
            joinDate: "2022-11-12",
          },
          {
            id: "SLR-003",
            name: "James Rodriguez",
            email: "james.rodriguez@example.com",
            phone: "+1 (555) 456-7891",
            storeType: "Marketplace",
            rating: 4.5,
            products: 78,
            sales: 320,
            revenue: 24300,
            status: "Active",
            joinDate: "2022-12-20",
          },
          {
            id: "SLR-004",
            name: "Charlotte Lewis",
            email: "charlotte.lewis@example.com",
            phone: "+1 (555) 234-5679",
            storeType: "Boutique",
            rating: 4.6,
            products: 28,
            sales: 95,
            revenue: 8200,
            status: "Inactive",
            joinDate: "2023-01-15",
          },
          {
            id: "SLR-005",
            name: "Benjamin Walker",
            email: "benjamin.walker@example.com",
            phone: "+1 (555) 876-5433",
            storeType: "Designer",
            rating: 4.8,
            products: 36,
            sales: 185,
            revenue: 15600,
            status: "Active",
            joinDate: "2023-02-08",
          },
        ]
        setSellers(mockSellers)
      }
      setLoading(false)
    } catch (err) {
      console.error("Error fetching sellers:", err)
      // Fallback to mock data
      const mockSellers = [
        {
          id: "SLR-001",
          name: "Alexander White",
          email: "alexander.white@example.com",
          phone: "+1 (555) 123-9876",
          storeType: "Boutique",
          rating: 4.7,
          products: 45,
          sales: 156,
          revenue: 12500,
          status: "Active",
          joinDate: "2022-10-05",
        },
        {
          id: "SLR-002",
          name: "Isabella Clark",
          email: "isabella.clark@example.com",
          phone: "+1 (555) 987-1234",
          storeType: "Designer",
          rating: 4.9,
          products: 32,
          sales: 210,
          revenue: 18750,
          status: "Active",
          joinDate: "2022-11-12",
        },
        {
          id: "SLR-003",
          name: "James Rodriguez",
          email: "james.rodriguez@example.com",
          phone: "+1 (555) 456-7891",
          storeType: "Marketplace",
          rating: 4.5,
          products: 78,
          sales: 320,
          revenue: 24300,
          status: "Active",
          joinDate: "2022-12-20",
        },
        {
          id: "SLR-004",
          name: "Charlotte Lewis",
          email: "charlotte.lewis@example.com",
          phone: "+1 (555) 234-5679",
          storeType: "Boutique",
          rating: 4.6,
          products: 28,
          sales: 95,
          revenue: 8200,
          status: "Inactive",
          joinDate: "2023-01-15",
        },
        {
          id: "SLR-005",
          name: "Benjamin Walker",
          email: "benjamin.walker@example.com",
          phone: "+1 (555) 876-5433",
          storeType: "Designer",
          rating: 4.8,
          products: 36,
          sales: 185,
          revenue: 15600,
          status: "Active",
          joinDate: "2023-02-08",
        },
      ]
      setSellers(mockSellers)
      setLoading(false)
    }
  }

  // Add function to fetch custom designs
  const fetchCustomDesigns = async () => {
    try {
      setLoading(true)
      const adminToken = await fetchAdminToken()

      if (!adminToken) {
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }

      console.log("Fetching custom designs from:", `${API_BASE_URL}/custom-designs/all`)
      const response = await axios.get(`${API_BASE_URL}/custom-designs/all`, config)
      console.log("Custom designs response:", response.data)

      if (Array.isArray(response.data)) {
        setCustomDesigns(response.data)
      } else if (response.data && Array.isArray(response.data.designs)) {
        setCustomDesigns(response.data.designs)
      } else {
        // Fallback to mock data
        const mockCustomDesigns = [
          {
            id: "CD-001",
            title: "Evening Gown",
            description: "Elegant evening gown with silk fabric",
            designer: "Sophia Martinez",
            client: "Emma Thompson",
            status: "In Progress",
            createdAt: "2023-05-15",
            completionDate: "2023-06-30",
            price: 1200,
          },
          {
            id: "CD-002",
            title: "Wedding Dress",
            description: "Custom wedding dress with lace details",
            designer: "Daniel Lee",
            client: "Jessica Parker",
            status: "Completed",
            createdAt: "2023-04-10",
            completionDate: "2023-05-25",
            price: 2500,
          },
          {
            id: "CD-003",
            title: "Business Suit",
            description: "Tailored business suit for professional settings",
            designer: "Olivia Brown",
            client: "Michael Johnson",
            status: "In Progress",
            createdAt: "2023-05-20",
            completionDate: "2023-07-05",
            price: 950,
          },
          {
            id: "CD-004",
            title: "Summer Dress",
            description: "Light summer dress with floral pattern",
            designer: "William Taylor",
            client: "Sophia Wilson",
            status: "Pending Approval",
            createdAt: "2023-05-25",
            completionDate: "2023-07-10",
            price: 750,
          },
          {
            id: "CD-005",
            title: "Formal Tuxedo",
            description: "Classic black tuxedo for formal events",
            designer: "Emma Garcia",
            client: "David Brown",
            status: "Completed",
            createdAt: "2023-04-05",
            completionDate: "2023-05-20",
            price: 1100,
          },
        ]
        setCustomDesigns(mockCustomDesigns)
      }
      setLoading(false)
    } catch (err) {
      console.error("Error fetching custom designs:", err)
      // Fallback to mock data
      const mockCustomDesigns = [
        {
          id: "CD-001",
          title: "Evening Gown",
          description: "Elegant evening gown with silk fabric",
          designer: "Sophia Martinez",
          client: "Emma Thompson",
          status: "In Progress",
          createdAt: "2023-05-15",
          completionDate: "2023-06-30",
          price: 1200,
        },
        {
          id: "CD-002",
          title: "Wedding Dress",
          description: "Custom wedding dress with lace details",
          designer: "Daniel Lee",
          client: "Jessica Parker",
          status: "Completed",
          createdAt: "2023-04-10",
          completionDate: "2023-05-25",
          price: 2500,
        },
        {
          id: "CD-003",
          title: "Business Suit",
          description: "Tailored business suit for professional settings",
          designer: "Olivia Brown",
          client: "Michael Johnson",
          status: "In Progress",
          createdAt: "2023-05-20",
          completionDate: "2023-07-05",
          price: 950,
        },
        {
          id: "CD-004",
          title: "Summer Dress",
          description: "Light summer dress with floral pattern",
          designer: "William Taylor",
          client: "Sophia Wilson",
          status: "Pending Approval",
          createdAt: "2023-05-25",
          completionDate: "2023-07-10",
          price: 750,
        },
        {
          id: "CD-005",
          title: "Formal Tuxedo",
          description: "Classic black tuxedo for formal events",
          designer: "Emma Garcia",
          client: "David Brown",
          status: "Completed",
          createdAt: "2023-04-05",
          completionDate: "2023-05-20",
          price: 1100,
        },
      ]
      setCustomDesigns(mockCustomDesigns)
      setLoading(false)
    }
  }

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const adminToken = await fetchAdminToken()

      if (!adminToken) {
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }

      const response = await axios.get(`${API_BASE_URL}/customers`, config)

      if (Array.isArray(response.data)) {
        setCustomers(response.data)
      } else if (response.data && Array.isArray(response.data.customers)) {
        setCustomers(response.data.customers)
      } else {
        // Fallback to mock data if needed
        setCustomers([])
      }
    } catch (err) {
      console.error("Error fetching customers:", err)
      setCustomers([])
    }
  }

  // Add function to create a new user
  const createUser = async (userData) => {
    try {
      setLoading(true)
      const adminToken = await fetchAdminToken()

      if (!adminToken) {
        showToast("Authentication required. Please login again.", "error")
        setLoading(false)
        return false
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      }

      // Try to create user via API
      try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData, config)

        if (response.data) {
          // Add the new user to the local state
          const newUser = response.data
          setCustomers((prevUsers) => {
            // Ensure prevUsers is an array
            if (!Array.isArray(prevUsers)) {
              return [newUser]
            }
            return [...prevUsers, newUser]
          })

          // Save to localStorage for persistence
          const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]")
          localUsers.push(newUser)
          localStorage.setItem("localUsers", JSON.stringify(localUsers))

          showToast(`User ${userData.name} created successfully!`, "success")
          return true
        }
      } catch (apiError) {
        console.error("API error creating user:", apiError)

        // Fallback: Create user locally if API fails
        const newUser = {
          id: `USR-${Math.floor(Math.random() * 10000)}`,
          name: userData.name,
          email: userData.email,
          phone: userData.phone || "N/A",
          role: userData.role,
          status: "Active",
          joinDate: new Date().toISOString().split("T")[0],
        }

        // Add to state
        setCustomers((prevUsers) => {
          // Ensure prevUsers is an array
          if (!Array.isArray(prevUsers)) {
            return [newUser]
          }
          return [...prevUsers, newUser]
        })

        // Save to localStorage for persistence
        const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]")
        localUsers.push(newUser)
        localStorage.setItem("localUsers", JSON.stringify(localUsers))

        showToast(`User ${userData.name} created successfully (locally)!`, "success")
        return true
      }

      return false
    } catch (err) {
      console.error("Error creating user:", err)
      showToast("Failed to create user. Please try again.", "error")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Validate user form
  const validateUserForm = () => {
    const errors = {}
    if (!userForm.name.trim()) errors.name = "Name is required"
    if (!userForm.email.trim()) errors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(userForm.email)) errors.email = "Email is invalid"
    if (!userForm.password.trim()) errors.password = "Password is required"
    if (userForm.password.length < 6) errors.password = "Password must be at least 6 characters"
    if (!userForm.role) errors.role = "Role is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle user form change
  const handleUserFormChange = (e) => {
    const { name, value } = e.target

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      })
    }

    setUserForm({
      ...userForm,
      [name]: value,
    })
  }

  // Handle user form submit
  const handleUserSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateUserForm()) {
      showToast("Please fix the errors in the form", "error")
      return
    }

    setIsSubmitting(true)

    const success = await createUser(userForm)

    if (success) {
      setUserForm({
        name: "",
        email: "",
        password: "",
        role: "user",
        phone: "",
      })
      setShowUserModal(false)

      // Refresh users list
      fetchUsers()
    }

    setIsSubmitting(false)
  }

  // Fetch products and API docs on component mount
  useEffect(() => {
    fetchProducts()
    fetchApiDocs()
    fetchDashboardStats()
    fetchUsers()
    fetchDesigners()
    fetchSellers()
    fetchOrders()
    fetchCustomers()

    // Load locally stored users if available
    const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]")
    if (localUsers.length > 0) {
      setCustomers((prevUsers) => {
        // Merge local users with existing users, avoiding duplicates
        const existingIds = new Set(prevUsers.map((user) => user.id))
        const uniqueLocalUsers = localUsers.filter((user) => !existingIds.has(user.id))
        return [...prevUsers, ...uniqueLocalUsers]
      })
    }

    // Get admin name from localStorage if available
    const storedAdminName = localStorage.getItem("adminName")
    if (storedAdminName) {
      setAdminName(storedAdminName)
    }
  }, [])

  // Refetch data when active tab changes
  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchDashboardStats()
    } else if (activeTab === "products") {
      fetchProducts()
    } else if (activeTab === "orders") {
      fetchOrders()
    } else if (activeTab === "customers") {
      fetchCustomers()
    }
    // Update the useEffect for tab changes
  }, [activeTab])

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchDashboardStats()
    } else if (activeTab === "users") {
      fetchUsers()
    } else if (activeTab === "designers") {
      fetchDesigners()
    } else if (activeTab === "sellers") {
      fetchSellers()
    }
  }, [activeTab])

  // Validate form
  const validateForm = () => {
    const errors = {}
    if (!productForm.name.trim()) errors.name = "Product name is required"
    if (!productForm.category) errors.category = "Category is required"
    if (!productForm.price || Number(productForm.price) <= 0) errors.price = "Valid price is required"
    if (!productForm.description.trim()) errors.description = "Description is required"
    if (!currentProduct && !productForm.imageFile) errors.image = "Product image is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle product form change
  const handleProductFormChange = (e) => {
    const { name, value, type, checked } = e.target

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      })
    }

    let newValue

    // Handle different input types
    if (type === "checkbox") {
      newValue = checked
    } else if (["tags", "sizes", "colors", "materials"].includes(name)) {
      // Convert comma-separated strings to arrays for these fields
      newValue = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "")
    } else {
      newValue = value
    }

    setProductForm({
      ...productForm,
      [name]: newValue,
    })
  }

  // Handle image file change
  const handleImageFileChange = (e) => {
    const files = e.target.files

    if (files && files[0]) {
      const file = files[0]

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFormErrors({
          ...formErrors,
          image: "Image size should not exceed 2MB",
        })
        return
      }

      const reader = new FileReader()

      reader.onloadend = () => {
        setProductForm({
          ...productForm,
          imageFile: file,
          imagePreview: reader.result,
        })
      }

      reader.readAsDataURL(file)
    }
  }

  // Handle product form submit
  const handleProductSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Get admin token
      const adminToken = await fetchAdminToken()

      if (!adminToken) {
        setError("Authentication failed. Please login again.")
        showToast("Authentication failed. Please login again.", "error")
        setIsSubmitting(false)
        return
      }

      // Create FormData object
      const formData = new FormData()

      // Append basic fields
      formData.append("name", productForm.name)
      formData.append("category", productForm.category.toLowerCase())
      formData.append("price", productForm.price.toString())
      formData.append("description", productForm.description)

      // Handle stock field
      if (productForm.stock) {
        formData.append("stock", productForm.stock.toString())
      }

      // Append image file if it exists
      if (productForm.imageFile) {
        formData.append("image", productForm.imageFile)
      }

      // Handle array fields
      if (Array.isArray(productForm.colors)) {
        productForm.colors.forEach((color) => {
          formData.append("colors[]", color)
        })
      } else if (productForm.colors) {
        formData.append("colors[]", productForm.colors)
      }

      // Tags
      if (Array.isArray(productForm.tags)) {
        productForm.tags.forEach((tag) => {
          formData.append("tags[]", tag)
        })
      } else if (productForm.tags) {
        formData.append("tags[]", productForm.tags)
      }

      // Sizes
      if (Array.isArray(productForm.sizes)) {
        productForm.sizes.forEach((size) => {
          formData.append("sizes[]", size)
        })
      } else if (productForm.sizes) {
        formData.append("sizes[]", productForm.sizes)
      }

      // Materials
      if (Array.isArray(productForm.materials)) {
        productForm.materials.forEach((material) => {
          formData.append("materials[]", material)
        })
      } else if (productForm.materials) {
        formData.append("materials[]", productForm.materials)
      }

      // Append boolean and customization options
      formData.append("isCustomizable", productForm.isCustomizable.toString())
      formData.append("customizationOptions", productForm.customizationOptions || "")

      // Set up the request config with the correct headers
      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }

      let response

      if (currentProduct) {
        response = await axios.put(`${API_BASE_URL}/products/${currentProduct.id}`, formData, config)
      } else {
        response = await axios.post(`${API_BASE_URL}/products`, formData, config)
      }

      if (response.status === 200 || response.status === 201) {
        // Successful submission
        showToast(`Product "${productForm.name}" ${currentProduct ? "updated" : "added"} successfully!`)

        // Update products state locally
        if (currentProduct) {
          // Update existing product
          setProducts((prevProducts) => {
            // Ensure prevProducts is an array before mapping
            if (!Array.isArray(prevProducts)) {
              return [response.data]
            }
            return prevProducts.map((product) => (product.id === response.data.id ? response.data : product))
          })
        } else {
          // Add new product
          setProducts((prevProducts) => {
            // Ensure prevProducts is an array before spreading
            if (!Array.isArray(prevProducts)) {
              return [response.data]
            }
            return [...prevProducts, response.data]
          })
        }

        // Refresh dashboard stats
        fetchDashboardStats()

        setProductForm({
          name: "",
          category: "",
          price: "",
          stock: "",
          description: "",
          imageFile: null,
          imagePreview: "",
          tags: [],
          sizes: [],
          colors: [],
          materials: [],
          isCustomizable: false,
          customizationOptions: "",
        })
        setCurrentProduct(null)
        setShowProductModal(false)
      } else {
        setError(`Unexpected status code: ${response.status}`)
        showToast(`Error: Unexpected status code ${response.status}`, "error")
      }
    } catch (err) {
      console.error("Error saving product:", err)

      let errorMessage = "Failed to save product. Please try again."

      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      setError(errorMessage)
      showToast(errorMessage, "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle edit product
  const handleEditProduct = (product) => {
    setCurrentProduct(product)

    // Set the values for existing fields
    setProductForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      description: product.description || "",
      imageFile: null,
      imagePreview: product.image || "",
      tags: product.tags || [],
      sizes: product.sizes || [],
      colors: product.colors || [],
      materials: product.materials || [],
      isCustomizable: product.isCustomizable || false,
      customizationOptions: product.customizationOptions || "",
    })
    setFormErrors({})
    setShowProductModal(true)
  }

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true)
      try {
        let success = false

        // Get admin token
        const adminToken = localStorage.getItem("adminToken")

        const config = {
          headers: {},
        }

        if (adminToken) {
          config.headers["Authorization"] = `Bearer ${adminToken}`
        }

        try {
          await axios.delete(`${API_BASE_URL}/products/${productId}`, config)
          success = true

          // Update state to remove deleted product:
          setProducts((prevProducts) => {
            // Ensure prevProducts is an array before filtering
            if (!Array.isArray(prevProducts)) {
              return []
            }
            return prevProducts.filter((p) => p.id !== productId)
          })

          // Refresh dashboard stats
          fetchDashboardStats()
        } catch (apiError) {
          console.warn("API connection failed, simulating successful deletion:", apiError)
          // Remove the product from local state
          setProducts((prevProducts) => {
            if (!Array.isArray(prevProducts)) {
              return []
            }
            return prevProducts.filter((p) => p.id !== productId)
          })

          success = true
        }

        if (success) {
          showToast("Product deleted successfully!")
        }
      } catch (err) {
        console.error("Error deleting product:", err)
        showToast("Failed to delete product. Please try again.", "error")
      } finally {
        setLoading(false)
      }
    }
  }

  // Filter and sort products
  const filteredProducts = Array.isArray(products)
    ? products
        .filter((product) => {
          const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesCategory = filterCategory === "all" || product.category === filterCategory
          return matchesSearch && matchesCategory
        })
        .sort((a, b) => {
          if (sortBy === "newest") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          } else if (sortBy === "oldest") {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          } else if (sortBy === "price-high") {
            return b.price - a.price
          } else if (sortBy === "price-low") {
            return a.price - b.price
          } else if (sortBy === "name-asc") {
            return a.name.localeCompare(b.name)
          } else if (sortBy === "name-desc") {
            return b.name.localeCompare(a.name)
          }
          return 0
        })
    : []

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  // Get unique categories for filter
  const categories = [
    "all",
    ...Array.from(new Set(Array.isArray(products) ? products.map((product) => product.category) : [])),
  ]

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Update the renderContent function to handle the new tabs
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <PageTitle>Admin Dashboard</PageTitle>
            <PageDescription>Welcome back! Here's an overview of your platform's performance.</PageDescription>

            <StatsGrid>
              <StatsCard
                title="Total Users"
                value={stats.totalUsers.toString()}
                change="+12% this month"
                isPositive={true}
                icon={Users}
                color={goldPrimary}
              />
              <StatsCard
                title="Total Designers"
                value={stats.totalDesigners.toString()}
                change="+8.5% this month"
                isPositive={true}
                icon={Edit}
                color={goldPrimary}
              />
              <StatsCard
                title="Total Sellers"
                value={stats.totalSellers.toString()}
                change="+10.3% this month"
                isPositive={true}
                icon={ShoppingCart}
                color={goldPrimary}
              />
              <StatsCard
                title="Total Revenue"
                value={formatCurrency(stats.totalRevenue)}
                change="+12.3% this month"
                isPositive={true}
                icon={DollarSign}
                color={goldPrimary}
              />
            </StatsGrid>

            <ChartsGrid>
              <AreaChartComponent
                title="User Growth"
                description="Monthly user registrations for the current year"
                data={salesData}
                dataKey="value"
                xAxisKey="name"
                height={400}
              />

              <BarChartComponent
                title="Designer Activity"
                description="Monthly designer uploads for the current year"
                data={ordersData}
                dataKey="value"
                xAxisKey="name"
                height={400}
              />
            </ChartsGrid>

            <ChartsGrid>
              <DoughnutChartComponent
                title="User Types"
                description="Distribution of users by role"
                data={productCategoriesData}
                nameKey="name"
                dataKey="value"
                height={400}
              />

              <DoughnutChartComponent
                title="User Demographics"
                description="Age distribution of users"
                data={customerDemographicsData}
                nameKey="name"
                dataKey="value"
                height={400}
              />
            </ChartsGrid>

            <SectionTitle>Top Sellers</SectionTitle>
            <OrdersTable>
              <div className="table-header">
                <h3>Top Performing Sellers</h3>
                <p>Sellers with highest revenue this month</p>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Seller ID</th>
                      <th>Name</th>
                      <th>Store Type</th>
                      <th>Products</th>
                      <th>Sales</th>
                      <th>Revenue</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.slice(0, 5).map((seller) => (
                      <tr key={seller.id}>
                        <td>{seller.id}</td>
                        <td>{seller.name}</td>
                        <td>{seller.storeType}</td>
                        <td>{seller.products}</td>
                        <td>{seller.sales}</td>
                        <td>{formatCurrency(seller.revenue)}</td>
                        <td>{seller.rating}/5.0</td>
                        <td>
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              color: goldPrimary,
                              fontWeight: "600",
                              cursor: "pointer",
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </OrdersTable>
          </>
        )

      case "users":
        return (
          <>
            <SectionTitle>
              User Management
              <button className="action-button" onClick={() => setShowUserModal(true)}>
                <Plus size={16} />
                Add User
              </button>
            </SectionTitle>
            <CustomerTable>
              <div className="table-header">
                <h3>All Users</h3>
                <p>View and manage user accounts</p>
              </div>

              {loading ? (
                <LoadingIndicator>
                  <RefreshCw size={30} className="spin" />
                  <span>Loading users...</span>
                </LoadingIndicator>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Join Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.length > 0 ? (
                        customers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone || "N/A"}</td>
                            <td>{user.role}</td>
                            <td>
                              <StatusBadge className={user.status ? user.status.toLowerCase() : ""}>
                                {user.status || "N/A"}
                              </StatusBadge>
                            </td>
                            <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                            <td>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: goldPrimary,
                                  fontWeight: "600",
                                  cursor: "pointer",
                                }}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} style={{ textAlign: "center", padding: "2rem" }}>
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CustomerTable>
          </>
        )

      case "designers":
        return (
          <>
            <SectionTitle>Designer Management</SectionTitle>
            <CustomerTable>
              <div className="table-header">
                <h3>All Designers</h3>
                <p>View and manage designer accounts</p>
              </div>

              {loading ? (
                <LoadingIndicator>
                  <RefreshCw size={30} className="spin" />
                  <span>Loading designers...</span>
                </LoadingIndicator>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Specialty</th>
                        <th>Designs</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {designers.length > 0 ? (
                        designers.map((designer) => (
                          <tr key={designer.id}>
                            <td>{designer.id}</td>
                            <td>{designer.name}</td>
                            <td>{designer.email}</td>
                            <td>{designer.specialty}</td>
                            <td>{designer.designs}</td>
                            <td>{designer.rating}/5.0</td>
                            <td>
                              <StatusBadge className={designer.status ? designer.status.toLowerCase() : ""}>
                                {designer.status || "N/A"}
                              </StatusBadge>
                            </td>
                            <td>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: goldPrimary,
                                  fontWeight: "600",
                                  cursor: "pointer",
                                }}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} style={{ textAlign: "center", padding: "2rem" }}>
                            No designers found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CustomerTable>
          </>
        )

      case "sellers":
        return (
          <>
            <SectionTitle>Seller Management</SectionTitle>
            <CustomerTable>
              <div className="table-header">
                <h3>All Sellers</h3>
                <p>View and manage seller accounts</p>
              </div>

              {loading ? (
                <LoadingIndicator>
                  <RefreshCw size={30} className="spin" />
                  <span>Loading sellers...</span>
                </LoadingIndicator>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Store Type</th>
                        <th>Products</th>
                        <th>Sales</th>
                        <th>Revenue</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sellers.length > 0 ? (
                        sellers.map((seller) => (
                          <tr key={seller.id}>
                            <td>{seller.id}</td>
                            <td>{seller.name}</td>
                            <td>{seller.email}</td>
                            <td>{seller.storeType}</td>
                            <td>{seller.products}</td>
                            <td>{seller.sales}</td>
                            <td>{formatCurrency(seller.revenue)}</td>
                            <td>{seller.rating}/5.0</td>
                            <td>
                              <StatusBadge className={seller.status.toLowerCase()}>{seller.status}</StatusBadge>
                            </td>
                            <td>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: goldPrimary,
                                  fontWeight: "600",
                                  cursor: "pointer",
                                }}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10} style={{ textAlign: "center", padding: "2rem" }}>
                            No sellers found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CustomerTable>
          </>
        )

      case "analytics":
        return (
          <>
            <SectionTitle>Analytics Dashboard</SectionTitle>
            <PageDescription>Detailed analytics and insights about your platform's performance</PageDescription>

            <ChartsGrid>
              <AreaChartComponent
                title="User Growth Trends"
                description="Monthly user registration trends for the current year"
                data={salesData}
                dataKey="value"
                xAxisKey="name"
                height={400}
              />

              <BarChartComponent
                title="Designer Activity"
                description="Monthly design uploads by designers"
                data={ordersData}
                dataKey="value"
                xAxisKey="name"
                height={400}
              />
            </ChartsGrid>

            <ChartsGrid>
              <DoughnutChartComponent
                title="User Distribution"
                description="Distribution of users by role"
                data={productCategoriesData}
                nameKey="name"
                dataKey="value"
                height={400}
              />

              <DoughnutChartComponent
                title="Age Demographics"
                description="Distribution of users by age group"
                data={customerDemographicsData}
                nameKey="name"
                dataKey="value"
                height={400}
              />
            </ChartsGrid>
          </>
        )

      case "settings":
        return (
          <>
            <SectionTitle>Settings</SectionTitle>
            <PageDescription>Manage your platform settings and preferences</PageDescription>

            <SettingsContainer>
              <SettingsCard>
                <SettingsCardHeader>
                  <h3>Platform Information</h3>
                  <p>Update your platform details and contact information</p>
                </SettingsCardHeader>
                <SettingsCardContent>
                  <FormGroup>
                    <FormLabel>Platform Name</FormLabel>
                    <FormInput type="text" defaultValue="Kimelia Luxury Fashion" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email Address</FormLabel>
                    <FormInput type="email" defaultValue="contact@kimelia.com" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Phone Number</FormLabel>
                    <FormInput type="tel" defaultValue="+1 (555) 123-4567" />
                  </FormGroup>
                  <FormActions>
                    <FormButton type="button">Save Changes</FormButton>
                  </FormActions>
                </SettingsCardContent>
              </SettingsCard>

              <SettingsCard>
                <SettingsCardHeader>
                  <h3>Account Settings</h3>
                  <p>Manage your account and security preferences</p>
                </SettingsCardHeader>
                <SettingsCardContent>
                  <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <FormInput
                      type="text"
                      defaultValue={adminName}
                      onChange={(e) => {
                        const newName = e.target.value
                        setAdminName(newName)
                        localStorage.setItem("adminName", newName)
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email Address</FormLabel>
                    <FormInput type="email" defaultValue="admin@kimelia.com" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>New Password</FormLabel>
                    <FormInput type="password" placeholder="Enter new password" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormInput type="password" placeholder="Confirm new password" />
                  </FormGroup>
                  <FormActions>
                    <FormButton type="button">Update Account</FormButton>
                  </FormActions>
                </SettingsCardContent>
              </SettingsCard>
            </SettingsContainer>
          </>
        )

      default:
        return (
          <div>
            <h2>Page Not Found</h2>
            <p>The requested page does not exist.</p>
          </div>
        )
    }
  }

  // Check if token exists and is valid
  useEffect(() => {
    const checkAdminToken = async () => {
      const adminToken = localStorage.getItem("adminToken")

      if (!adminToken) {
        try {
          const authResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: "niyocroirealine1@gmail.com",
            password: "1234567890",
          })

          if (authResponse.data && authResponse.data.token) {
            localStorage.setItem("adminToken", authResponse.data.token)

            // Store admin name if available
            if (authResponse.data.user && authResponse.data.user.name) {
              localStorage.setItem("adminName", authResponse.data.user.name)
              setAdminName(authResponse.data.user.name)
            }
          }
        } catch (authError) {
          console.error("Failed to get admin token:", authError)
        }
      }
    }

    checkAdminToken()
  }, [])

  return (
    <DashboardLayout
      title={`Kimelia Admin - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      {renderContent()}

      {/* Product Modal */}
      {showProductModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h2>{currentProduct ? "Edit Product" : "Add New Product"}</h2>
              <ModalCloseButton onClick={() => setShowProductModal(false)}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <ProductForm onSubmit={handleProductSubmit}>
                <FormGroup>
                  <FormLabel>Product Name</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleProductFormChange}
                    required
                    error={formErrors.name}
                  />
                  {formErrors.name && <FormError>{formErrors.name}</FormError>}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Category</FormLabel>
                  <FormSelect
                    name="category"
                    value={productForm.category}
                    onChange={handleProductFormChange}
                    required
                    error={formErrors.category}
                  >
                    <option value="">Select Category</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Suits">Suits</option>
                    <option value="Casual Wear">Casual Wear</option>
                    <option value="Formal Wear">Formal Wear</option>
                    <option value="Accessories">Accessories</option>
                  </FormSelect>
                  {formErrors.category && <FormError>{formErrors.category}</FormError>}
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Price ($)</FormLabel>
                    <FormInput
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductFormChange}
                      required
                      min="0"
                      step="0.01"
                      error={formErrors.price}
                    />
                    {formErrors.price && <FormError>{formErrors.price}</FormError>}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Stock</FormLabel>
                    <FormInput
                      type="number"
                      name="stock"
                      value={productForm.stock}
                      onChange={handleProductFormChange}
                      required
                      min="0"
                      error={formErrors.stock}
                    />
                    {formErrors.stock && <FormError>{formErrors.stock}</FormError>}
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <FormLabel>Description</FormLabel>
                  <FormTextarea
                    name="description"
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    required
                    error={formErrors.description}
                  />
                  {formErrors.description && <FormError>{formErrors.description}</FormError>}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <FormInput type="text" name="tags" value={productForm.tags} onChange={handleProductFormChange} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Sizes (comma-separated)</FormLabel>
                  <FormInput type="text" name="sizes" value={productForm.sizes} onChange={handleProductFormChange} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Colors (comma-separated)</FormLabel>
                  <FormInput type="text" name="colors" value={productForm.colors} onChange={handleProductFormChange} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Materials (comma-separated)</FormLabel>
                  <FormInput
                    type="text"
                    name="materials"
                    value={productForm.materials}
                    onChange={handleProductFormChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Is Customizable</FormLabel>
                  <FormInput
                    type="checkbox"
                    name="isCustomizable"
                    checked={productForm.isCustomizable}
                    onChange={handleProductFormChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Customization Options</FormLabel>
                  <FormTextarea
                    name="customizationOptions"
                    value={productForm.customizationOptions}
                    onChange={handleProductFormChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Product Image</FormLabel>
                  <ImageUploadContainer error={formErrors.image}>
                    {productForm.imagePreview ? (
                      <ImagePreview>
                        <img
                          src={productForm.imagePreview || "https://via.placeholder.com/600"}
                          alt="Product preview"
                        />
                        <RemoveImageButton
                          type="button"
                          onClick={() =>
                            setProductForm({
                              ...productForm,
                              imageFile: null,
                              imagePreview: "",
                            })
                          }
                        >
                          ×
                        </RemoveImageButton>
                      </ImagePreview>
                    ) : (
                      <ImageUploadLabel>
                        <Plus size={24} />
                        <span>Upload Image</span>
                        <ImageInput
                          type="file"
                          name="imageFile"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          required={!currentProduct}
                        />
                      </ImageUploadLabel>
                    )}
                  </ImageUploadContainer>
                  {formErrors.image && <FormError>{formErrors.image}</FormError>}
                  <ImageUploadHint>Recommended size: 600x600px. Max size: 2MB</ImageUploadHint>
                </FormGroup>
                <FormActions>
                  <FormButton type="button" secondary={true} onClick={() => setShowProductModal(false)}>
                    Cancel
                  </FormButton>
                  <FormButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={16} className="spin" />
                        {currentProduct ? "Updating..." : "Adding..."}
                      </>
                    ) : currentProduct ? (
                      "Update Product"
                    ) : (
                      "Add Product"
                    )}
                  </FormButton>
                </FormActions>
              </ProductForm>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* User Modal */}
      {showUserModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h2>Add New User</h2>
              <ModalCloseButton onClick={() => setShowUserModal(false)}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <ProductForm onSubmit={handleUserSubmit}>
                <FormGroup>
                  <FormLabel>Full Name</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={handleUserFormChange}
                    required
                    error={formErrors.name}
                  />
                  {formErrors.name && <FormError>{formErrors.name}</FormError>}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Email Address</FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleUserFormChange}
                    required
                    error={formErrors.email}
                  />
                  {formErrors.email && <FormError>{formErrors.email}</FormError>}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Password</FormLabel>
                  <FormInput
                    type="password"
                    name="password"
                    value={userForm.password}
                    onChange={handleUserFormChange}
                    required
                    error={formErrors.password}
                  />
                  {formErrors.password && <FormError>{formErrors.password}</FormError>}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Phone Number</FormLabel>
                  <FormInput type="tel" name="phone" value={userForm.phone} onChange={handleUserFormChange} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Role</FormLabel>
                  <FormSelect
                    name="role"
                    value={userForm.role}
                    onChange={handleUserFormChange}
                    required
                    error={formErrors.role}
                  >
                    <option value="user">Regular User</option>
                    <option value="designer">Designer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </FormSelect>
                  {formErrors.role && <FormError>{formErrors.role}</FormError>}
                </FormGroup>
                <FormActions>
                  <FormButton type="button" secondary={true} onClick={() => setShowUserModal(false)}>
                    Cancel
                  </FormButton>
                  <FormButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={16} className="spin" />
                        Adding...
                      </>
                    ) : (
                      "Add User"
                    )}
                  </FormButton>
                </FormActions>
              </ProductForm>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </DashboardLayout>
  )
}

// Styled Components
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

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`

const ChartContainer = styled.div`
  background-color: ${white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 1rem;
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

const CustomerTable = styled(ProductsTable)``

const ProductTableImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
`

const TableActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: ${white};
  border: 1px solid ${silverLight};
  color: ${(props) => (props.disabled ? textSecondary : luxuryBlack)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.2s ease;
  
  &:not(:disabled):hover {
    background-color: ${goldPrimary};
    border-color: ${goldPrimary};
    color: ${white};
  }
`

const PaginationInfo = styled.div`
  font-size: 0.875rem;
  color: ${textSecondary};
`

const OrdersTable = styled.div`
  background-color: ${white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-top: 2rem;

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

  &.completed, &.active {
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
  
  &.cancelled, &.inactive {
    background-color: rgba(244, 67, 54, 0.15);
    color: #f44336;
  }
  
  &.delivered {
    background-color: rgba(76, 175, 80, 0.15);
    color: #4caf50;
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
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const ErrorMessage = styled.div`
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
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
  background-color: ${white};
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid ${silverLight};
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: ${luxuryBlack};
  }
  `

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${textSecondary};
  cursor: pointer;
  
  &:hover {
    color: ${luxuryBlack};
  }
`

const ModalBody = styled.div`
  padding: 1.5rem;
`
const ProductForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const FormRow = styled.div`
  display: flex;
  gap: 1.25rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${luxuryBlack};
  margin-bottom: 0.5rem;
`

const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${silverLight};
  color: ${textPrimary};
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${goldPrimary};
  }
  
  &[type="checkbox"] {
    width: auto;
    height: auto;
    margin-top: 0.25rem;
  }
`

const FormSelect = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${silverLight};
  color: ${textPrimary};
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${goldPrimary};
  }
`

const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${silverLight};
  color: ${textPrimary};
  font-size: 0.875rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${goldPrimary};
  }
`

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`

const FormButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${(props) =>
    props.secondary
      ? `
    background-color: ${white};
    border: 1px solid ${silverLight};
    color: ${luxuryBlack};
    
    &:hover {
      background-color: ${silverLight};
    }
  `
      : `
    background-color: ${goldPrimary};
    color: ${white};
    border: none;
    
    &:hover {
      background-color: ${goldDark};
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const FormError = styled.div`
  font-size: 0.75rem;
  color: #f44336;
  margin-top: 0.25rem;
`

const ImageUploadContainer = styled.div`
  border: 2px dashed ${silverLight};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: ${goldPrimary};
  }
  
  ${(props) =>
    props.error &&
    `
    border-color: #f44336;
  `}
`

const ImageUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${textSecondary};
  
  span {
    font-size: 0.875rem;
  }
`

const ImageInput = styled.input`
  display: none;
`

const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }
`

const RemoveImageButton = styled.button`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #f44336;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #d32f2f;
  }
`

const ImageUploadHint = styled.div`
  font-size: 0.75rem;
  color: ${textSecondary};
  margin-top: 0.5rem;
  text-align: center;
`

const SettingsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const SettingsCard = styled.div`
  background-color: ${white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const SettingsCardHeader = styled.div`
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
`

const SettingsCardContent = styled.div`
  padding: 1.5rem;
`

export default AdminDashboard

