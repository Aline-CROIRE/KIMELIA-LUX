"use client"

import { useState, useContext } from "react"
import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Home,
  Users,
  ShoppingBag,
  Package,
  Palette,
  Scissors,
  BarChart2,
  DollarSign,
  Heart,
  Eye,
} from "lucide-react"

import { ThemeContext } from "../context/ThemeContext"
import { LanguageContext, languages } from "../context/LanguageContext"

// Styled Components
const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`

const Sidebar = styled.aside`
  width: ${(props) => (props.isOpen ? "280px" : "80px")};
  background-color: var(--color-secondary);
  color: white;
  height: 100vh;
  position: fixed;
  transition: width 0.3s ease;
  z-index: 50;
  overflow-x: hidden;
  box-shadow: var(--shadow-lg);
  
  @media (max-width: 768px) {
    width: 280px;
    transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
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
  display: flex;
  align-items: center;
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.5rem;
    color: white;
    margin-right: 1rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
    font-weight: 700;
    background: linear-gradient(135deg, white, var(--color-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: ${(props) => (props.isCollapsed ? "none" : "block")};
  }
`

const SidebarContent = styled.div`
  padding: 1rem 0;
  height: calc(100vh - 80px);
  overflow-y: auto;
`

const NavGroup = styled.div`
  margin-bottom: 1.5rem;
  
  .group-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    padding: 0 1.5rem;
    margin-bottom: 0.5rem;
    display: ${(props) => (props.isCollapsed ? "none" : "block")};
  }
`

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;
  position: relative;
  
  &:hover, &.active {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background-color: var(--color-primary);
  }
  
  .icon {
    min-width: 24px;
    margin-right: ${(props) => (props.isCollapsed ? "0" : "1rem")};
  }
  
  .text {
    display: ${(props) => (props.isCollapsed ? "none" : "block")};
    white-space: nowrap;
  }
`

const MainContent = styled.main`
  flex: 1;
  margin-left: ${(props) => props.sidebarWidth};
  transition: margin-left 0.3s ease;
  background-color: var(--color-background);
  min-height: 100vh;
  
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 40;
  box-shadow: var(--shadow-sm);
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  
  .menu-trigger {
    display: none;
    background: none;
    border: none;
    color: var(--color-foreground);
    cursor: pointer;
    margin-right: 1rem;
    
    @media (max-width: 768px) {
      display: block;
    }
  }
  
  .page-title {
    font-size: 1.25rem;
    font-weight: 600;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const SearchBar = styled.div`
  position: relative;
  width: 300px;
  
  input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--color-border);
    background-color: var(--color-muted);
    color: var(--color-foreground);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-foreground);
    opacity: 0.5;
  }
  
  @media (max-width: 992px) {
    display: none;
  }
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--color-foreground);
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  position: relative;
  
  &:hover {
    background-color: var(--color-muted);
  }
  
  .notification-badge {
    position: absolute;
    top: 0;
    right: 0;
    width: 18px;
    height: 18px;
    background-color: var(--color-primary);
    color: white;
    border-radius: var(--radius-full);
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const UserMenu = styled.div`
  position: relative;
  
  .trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: var(--color-muted);
    }
    
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-full);
      background-color: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
    }
    
    .info {
      display: flex;
      flex-direction: column;
      
      @media (max-width: 768px) {
        display: none;
      }
      
      .name {
        font-weight: 600;
        font-size: 0.875rem;
      }
      
      .role {
        font-size: 0.75rem;
        color: var(--color-foreground);
        opacity: 0.7;
      }
    }
  }
  
  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 200px;
    background-color: var(--color-background);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--color-border);
    padding: 0.5rem;
    z-index: 100;
    display: ${(props) => (props.isOpen ? "block" : "none")};
    
    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      color: var(--color-foreground);
      border-radius: var(--radius-sm);
      cursor: pointer;
      
      &:hover {
        background-color: var(--color-muted);
      }
      
      &.logout {
        color: var(--color-error);
      }
    }
  }
`

const LanguageMenu = styled.div`
  position: relative;
  
  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 150px;
    background-color: var(--color-background);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--color-border);
    padding: 0.5rem;
    z-index: 100;
    display: ${(props) => (props.isOpen ? "block" : "none")};
    
    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      color: var(--color-foreground);
      border-radius: var(--radius-sm);
      cursor: pointer;
      
      &:hover {
        background-color: var(--color-muted);
      }
      
      &.active {
        background-color: var(--color-primary-light);
        color: var(--color-primary-dark);
      }
    }
  }
`

const PageContent = styled.div`
  padding: 2rem;
`

// Dashboard Layout Component
const DashboardLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const location = useLocation()

  const { theme, toggleTheme } = useContext(ThemeContext)
  const { language, changeLanguage, t } = useContext(LanguageContext)

  // Get user role from URL path
  const getRole = () => {
    const path = location.pathname
    if (path.includes("/admin")) return "admin"
    if (path.includes("/designer")) return "designer"
    if (path.includes("/seller")) return "seller"
    return "customer"
  }

  const role = getRole()

  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { title: t("dashboard"), icon: Home, path: `/${role}/dashboard` },
      { title: t("settings"), icon: Settings, path: `/${role}/settings` },
    ]

    const roleItems = {
      admin: [
        { title: t("users"), icon: Users, path: "/admin/users" },
        { title: t("products"), icon: Package, path: "/admin/products" },
        { title: t("orders"), icon: ShoppingBag, path: "/admin/orders" },
        { title: t("analytics"), icon: BarChart2, path: "/admin/analytics" },
        { title: t("designers"), icon: Palette, path: "/admin/designers" },
        { title: t("sellers"), icon: DollarSign, path: "/admin/sellers" },
      ],
      designer: [
        { title: t("designs"), icon: Palette, path: "/designer/designs" },
        { title: t("sketches"), icon: Scissors, path: "/designer/sketches" },
        { title: t("customOrders"), icon: ShoppingBag, path: "/designer/custom-orders" },
        { title: t("analytics"), icon: BarChart2, path: "/designer/analytics" },
      ],
      seller: [
        { title: t("products"), icon: Package, path: "/seller/products" },
        { title: t("inventory"), icon: Package, path: "/seller/inventory" },
        { title: t("orders"), icon: ShoppingBag, path: "/seller/orders" },
        { title: t("sales"), icon: DollarSign, path: "/seller/sales" },
        { title: t("analytics"), icon: BarChart2, path: "/seller/analytics" },
      ],
      customer: [
        { title: t("orders"), icon: ShoppingBag, path: "/customer/orders" },
        { title: t("designs"), icon: Heart, path: "/customer/designs" },
        { title: t("fitting"), icon: Eye, path: "/customer/fitting" },
      ],
    }

    return [...commonItems, ...roleItems[role]]
  }

  const navItems = getNavItems()

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    const name = "John Doe" // Replace with actual user name
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Get user display name
  const getUserDisplayName = () => {
    return "John Doe" // Replace with actual user name
  }

  // Get role display name
  const getRoleDisplayName = () => {
    return role.charAt(0).toUpperCase() + role.slice(1)
  }

  return (
    <LayoutContainer>
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <Logo isCollapsed={!sidebarOpen}>
            <div className="logo-icon">K</div>
            <div className="logo-text">KIMELIA LUX</div>
          </Logo>
          <IconButton onClick={toggleSidebar} style={{ color: "white" }}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </IconButton>
        </SidebarHeader>

        <SidebarContent>
          <NavGroup isCollapsed={!sidebarOpen}>
            <h3 className="group-title">{t("mainNavigation")}</h3>
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                to={item.path}
                isCollapsed={!sidebarOpen}
                className={location.pathname === item.path ? "active" : ""}
              >
                <item.icon className="icon" size={20} />
                <span className="text">{item.title}</span>
              </NavItem>
            ))}
          </NavGroup>
        </SidebarContent>
      </Sidebar>

      <MainContent sidebarWidth={sidebarOpen ? "280px" : "80px"}>
        <Header>
          <HeaderLeft>
            <button className="menu-trigger" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <h1 className="page-title">{title || t("dashboard")}</h1>
          </HeaderLeft>

          <HeaderRight>
            <SearchBar>
              <Search className="search-icon" size={18} />
              <input type="text" placeholder={t("search")} />
            </SearchBar>

            <LanguageMenu isOpen={languageMenuOpen}>
              <IconButton onClick={() => setLanguageMenuOpen(!languageMenuOpen)}>
                <Globe size={20} />
              </IconButton>
              <div className="dropdown">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`dropdown-item ${language === lang.code ? "active" : ""}`}
                    onClick={() => {
                      changeLanguage(lang.code)
                      setLanguageMenuOpen(false)
                    }}
                  >
                    {lang.name}
                  </div>
                ))}
              </div>
            </LanguageMenu>

            <IconButton onClick={toggleTheme}>{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}</IconButton>

            <IconButton>
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </IconButton>

            <UserMenu isOpen={userMenuOpen}>
              <div className="trigger" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <div className="avatar">{getUserInitials()}</div>
                <div className="info">
                  <span className="name">{getUserDisplayName()}</span>
                  <span className="role">{getRoleDisplayName()}</span>
                </div>
                <ChevronDown size={16} />
              </div>
              <div className="dropdown">
                <div className="dropdown-item">
                  <User size={18} />
                  <span>{t("profile")}</span>
                </div>
                <div className="dropdown-item">
                  <Settings size={18} />
                  <span>{t("settings")}</span>
                </div>
                <div className="dropdown-item logout">
                  <LogOut size={18} />
                  <span>{t("logout")}</span>
                </div>
              </div>
            </UserMenu>
          </HeaderRight>
        </Header>

        <PageContent>{children}</PageContent>
      </MainContent>
    </LayoutContainer>
  )
}

export default DashboardLayout

