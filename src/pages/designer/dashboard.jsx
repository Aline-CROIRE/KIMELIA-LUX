import styled from "styled-components"
import { Palette, Scissors, Eye, Download, Share2, Users } from "lucide-react"

import DashboardLayout from "../../Layouts/Dashboard-Layout"
import StatsCard from "../../components/common/StatsCard"
import LineChart from "../../components/common/charts/LineChart"
import DoughnutChart from "../../components/common/charts/DoughnutChart"

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .action-button {
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    background-color: var(--color-primary);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      background-color: var(--color-primary-dark);
    }
  }
`

const DesignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const DesignCard = styled.div`
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--color-border);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`

const DesignImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  
  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover .overlay {
    opacity: 1;
  }
`

const ActionButton = styled.button`
  background-color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--color-primary);
    color: white;
  }
`

const DesignContent = styled.div`
  padding: 1.25rem;
`

const DesignTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`

const DesignMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  
  .stats {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.875rem;
    color: var(--color-foreground);
    opacity: 0.7;
    
    .stat {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }
  
  .date {
    font-size: 0.75rem;
    color: var(--color-foreground);
    opacity: 0.7;
  }
`

const OrdersTable = styled.div`
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  margin-top: 1.5rem;
  
  .table-header {
    padding: 1.25rem;
    border-bottom: 1px solid var(--color-border);
    
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
    }
    
    p {
      font-size: 0.875rem;
      color: var(--color-foreground);
      opacity: 0.7;
      margin: 0.25rem 0 0 0;
    }
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 1rem;
      text-align: left;
    }
    
    th {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--color-foreground);
      opacity: 0.7;
    }
    
    tr {
      border-bottom: 1px solid var(--color-border);
      
      &:last-child {
        border-bottom: none;
      }
      
      &:hover {
        background-color: var(--color-muted);
      }
    }
  }
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--color-muted);
  border-radius: var(--radius-full);
  overflow: hidden;
  
  .progress {
    height: 100%;
    background-color: var(--color-primary);
    width: ${(props) => props.progress}%;
  }
`

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 200px;
  
  .percentage {
    font-size: 0.875rem;
    font-weight: 600;
    min-width: 40px;
  }
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  
  &.completed {
    background-color: rgba(76, 175, 80, 0.1);
    color: var(--color-success);
  }
  
  &.in-progress {
    background-color: rgba(33, 150, 243, 0.1);
    color: var(--color-info);
  }
  
  &.pending {
    background-color: rgba(255, 152, 0, 0.1);
    color: var(--color-warning);
  }
`

const DesignerDashboard = () => {
  // Mock data for stats
  const stats = [
    {
      title: "Total Designs",
      value: "48",
      change: "+8 this month",
      isPositive: true,
      icon: Palette,
      color: "var(--color-primary)",
    },
    {
      title: "Custom Orders",
      value: "24",
      change: "+5 this month",
      isPositive: true,
      icon: Scissors,
      color: "#6C63FF",
    },
    {
      title: "Design Views",
      value: "3,842",
      change: "+12.5% this month",
      isPositive: true,
      icon: Eye,
      color: "#2CCCE4",
    },
  ]

  // Mock data for recent designs
  const recentDesigns = [
    {
      id: "DSG-001",
      title: "Summer Collection Dress",
      image: "/placeholder.svg?height=200&width=300",
      views: 245,
      likes: 42,
      date: "2 days ago",
    },
    {
      id: "DSG-002",
      title: "Formal Suit Set",
      image: "/placeholder.svg?height=200&width=300",
      views: 189,
      likes: 36,
      date: "3 days ago",
    },
    {
      id: "DSG-003",
      title: "Casual Weekend Outfit",
      image: "/placeholder.svg?height=200&width=300",
      views: 312,
      likes: 58,
      date: "5 days ago",
    },
  ]

  // Mock data for custom orders
  const customOrders = [
    {
      id: "CO-001",
      customer: "John Doe",
      design: "Custom Wedding Dress",
      deadline: "2023-04-15",
      progress: 75,
      status: "in-progress",
    },
    {
      id: "CO-002",
      customer: "Jane Smith",
      design: "Business Suit",
      deadline: "2023-04-10",
      progress: 30,
      status: "in-progress",
    },
    {
      id: "CO-003",
      customer: "Robert Johnson",
      design: "Evening Gown",
      deadline: "2023-04-20",
      progress: 100,
      status: "completed",
    },
    {
      id: "CO-004",
      customer: "Emily Davis",
      design: "Summer Dress",
      deadline: "2023-04-25",
      progress: 0,
      status: "pending",
    },
  ]

  // Mock data for design views chart
  const designViewsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Design Views",
        data: [1200, 1500, 1800, 2100, 2400, 2700, 3000, 3300, 3600, 3900, 4200, 4500],
        color: "var(--color-primary)",
        fill: true,
      },
    ],
  }

  // Mock data for design categories
  const designCategoriesData = {
    labels: ["Dresses", "Suits", "Casual Wear", "Formal Wear", "Accessories"],
    data: [18, 12, 8, 6, 4],
    colors: ["var(--color-primary)", "#6C63FF", "#2CCCE4", "#FF9E80", "#B388FF"],
  }

  return (
    <DashboardLayout title="Designer Dashboard">
      <PageTitle>Designer Dashboard</PageTitle>
      <PageDescription>Welcome back! Here's an overview of your designs and orders.</PageDescription>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={true}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </StatsGrid>

      <ChartsGrid>
        <LineChart
          title="Design Views"
          description="Monthly views for all your designs"
          labels={designViewsData.labels}
          datasets={designViewsData.datasets}
          height={350}
        />

        <DoughnutChart
          title="Design Categories"
          description="Distribution of your designs by category"
          labels={designCategoriesData.labels}
          data={designCategoriesData.data}
          colors={designCategoriesData.colors}
          height={350}
        />
      </ChartsGrid>

      <SectionTitle>
        Recent Designs
        <button className="action-button">
          <Palette size={16} />
          Create New Design
        </button>
      </SectionTitle>

      <DesignsGrid>
        {recentDesigns.map((design) => (
          <DesignCard key={design.id}>
            <DesignImage style={{ backgroundImage: `url(${design.image})` }}>
              <div className="overlay">
                <ActionButton>
                  <Eye size={16} />
                </ActionButton>
                <ActionButton>
                  <Share2 size={16} />
                </ActionButton>
                <ActionButton>
                  <Download size={16} />
                </ActionButton>
              </div>
            </DesignImage>
            <DesignContent>
              <DesignTitle>{design.title}</DesignTitle>
              <div style={{ fontSize: "0.875rem", color: "var(--color-foreground)", opacity: "0.7" }}>
                Design ID: {design.id}
              </div>
              <DesignMeta>
                <div className="stats">
                  <div className="stat">
                    <Eye size={16} />
                    {design.views}
                  </div>
                  <div className="stat">
                    <Users size={16} />
                    {design.likes}
                  </div>
                </div>
                <div className="date">{design.date}</div>
              </DesignMeta>
            </DesignContent>
          </DesignCard>
        ))}
      </DesignsGrid>

      <OrdersTable>
        <div className="table-header">
          <h3>Custom Orders</h3>
          <p>Track your custom design orders</p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Design</th>
                <th>Deadline</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.design}</td>
                  <td>{order.deadline}</td>
                  <td>
                    <ProgressWrapper>
                      <ProgressBar progress={order.progress}>
                        <div className="progress" />
                      </ProgressBar>
                      <span className="percentage">{order.progress}%</span>
                    </ProgressWrapper>
                  </td>
                  <td>
                    <StatusBadge className={order.status}>
                      {order.status
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </StatusBadge>
                  </td>
                  <td>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-primary)",
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
    </DashboardLayout>
  )
}

export default DesignerDashboard

