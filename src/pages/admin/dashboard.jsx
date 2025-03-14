import styled from "styled-components"
import { Palette, Scissors, Eye, Download, Share2, Users, Package, ShoppingCart } from "lucide-react"
import { FaChartLine, FaChartPie } from 'react-icons/fa';


import DashboardLayout from "../../Layouts/Dashboard-Layout"
import StatsCard from "../../components/common/StatsCard"
import LineChart from "../../components/common/charts/LineChart"
import DoughnutChart from "../../components/common/charts/DoughnutChart"

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

const PageTitle = styled.h1`
  font-size: 2.25rem;  // Increased size
  font-weight: 700;
  margin-bottom: 0.75rem; // Increased margin
  color: ${luxuryBlack};
`

const PageDescription = styled.p`
  font-size: 1.125rem; // Increased size
  color: ${textSecondary};
  opacity: 0.8;
  margin-bottom: 2.5rem; // Increased margin
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.75rem; // Increased gap
  margin-bottom: 2.5rem; // Increased margin

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);  // Add a 4th column on larger screens
  }
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; // Increased gap
  margin-bottom: 2.5rem; // Increased margin

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.5rem; // Increased size
  font-weight: 600;
  margin: 2.5rem 0 1.25rem; // Increased margin
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${luxuryBlack};

  .action-button {
    font-size: 1rem; // Increased size
    font-weight: 500;
    padding: 0.625rem 1.25rem; // Increased padding
    border-radius: var(--radius-md);
    background-color: ${goldPrimary};
    color: ${white};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.625rem; // Increased gap

    &:hover {
      background-color: ${goldDark};
    }
  }
`

const DesignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.75rem; // Increased gap

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1280px) {
      grid-template-columns: repeat(4, 1fr);
  }
`

const DesignCard = styled.div`
  background-color: ${white};
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid ${silverLight};

  &:hover {
    transform: translateY(-7px); // Increased effect
    box-shadow: var(--shadow-lg);
  }
`

const DesignImage = styled.div`
  height: 250px; // Increased height
  background-size: cover;
  background-position: center;
  position: relative;

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6); // Darker overlay
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem; // Increased gap
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .overlay {
    opacity: 1;
  }
`

const ActionButton = styled.button`
  background-color: rgba(255, 255, 255, 0.8); // Semi-transparent white
  border: none;
  border-radius: var(--radius-md);
  padding: 0.625rem; // Increased padding
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${goldPrimary};
    color: ${white};
  }
`

const DesignContent = styled.div`
  padding: 1.5rem; // Increased padding
`

const DesignTitle = styled.h3`
  font-size: 1.375rem; // Increased size
  font-weight: 600;
  margin: 0 0 0.375rem 0; // Increased margin
  color: ${luxuryBlack};
`

const DesignMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem; // Increased margin

  .stats {
    display: flex;
    align-items: center;
    gap: 1.25rem; // Increased gap
    font-size: 1rem; // Increased size
    color: ${textSecondary};
    opacity: 0.8;

    .stat {
      display: flex;
      align-items: center;
      gap: 0.375rem; // Increased gap
    }
  }

  .date {
    font-size: 0.875rem; // Increased size
    color: ${textSecondary};
    opacity: 0.8;
  }
`

const OrdersTable = styled.div`
  background-color: ${white};
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  border: 1px solid ${silverLight};
  margin-top: 2rem; // Increased margin

  .table-header {
    padding: 1.5rem; // Increased padding
    border-bottom: 1px solid ${silverLight};

    h3 {
      font-size: 1.375rem; // Increased size
      font-weight: 600;
      margin: 0;
      color: ${luxuryBlack};
    }

    p {
      font-size: 1rem; // Increased size
      color: ${textSecondary};
      opacity: 0.8;
      margin: 0.375rem 0 0 0; // Increased margin
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1.25rem; // Increased padding
      text-align: left;
      color: ${textPrimary};
    }

    th {
      font-weight: 600;
      font-size: 1rem; // Increased size
      color: ${textSecondary};
      opacity: 0.8;
    }

    tr {
      border-bottom: 1px solid ${silverLight};

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: ${cream};
      }
    }
  }
`

const ProgressBar = styled.div`
  width: 100%;
  height: 10px; // Increased height
  background-color: ${silverLight};
  border-radius: var(--radius-full);
  overflow: hidden;

  .progress {
    height: 100%;
    background-color: ${goldPrimary};
    width: ${(props) => props.progress}%;
  }
`

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; // Increased gap
  width: 100%;
  max-width: 250px; // Increased width

  .percentage {
    font-size: 1rem; // Increased size
    font-weight: 600;
    min-width: 45px;  // Increased width
    color: ${textPrimary};
  }
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 1rem; // Increased padding
  border-radius: var(--radius-full);
  font-size: 0.875rem; // Increased size
  font-weight: 600;

  &.completed {
    background-color: rgba(76, 175, 80, 0.15); // Slightly darker
    color: var(--color-success);
  }

  &.in-progress {
    background-color: rgba(33, 150, 243, 0.15); // Slightly darker
    color: var(--color-info);
  }

  &.pending {
    background-color: rgba(255, 152, 0, 0.15); // Slightly darker
    color: var(--color-warning);
  }
`

const AdditionalStats = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.75rem;
    margin-bottom: 2.5rem;

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1280px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const DesignerDashboard = () => {
  // Mock data for stats
  const stats = [
    {
      title: "Total Designs",
      value: "48",
      change: "+8 this month",
      isPositive: true,
      icon: Palette,
      color: goldPrimary,
    },
    {
      title: "Custom Orders",
      value: "24",
      change: "+5 this month",
      isPositive: true,
      icon: Scissors,
      color: goldPrimary,
    },
    {
      title: "Design Views",
      value: "3,842",
      change: "+12.5% this month",
      isPositive: true,
      icon: Eye,
      color: goldPrimary,
    },
  ]

  // Additional Stats
  const additionalStats = [
      {
          title: "Fabric Usage",
          value: "120m",
          change: "-3% this month",
          isPositive: false,
          icon: Package,
          color: goldPrimary,
      },
      {
          title: "Sales Revenue",
          value: "$12,500",
          change: "+15% this month",
          isPositive: true,
          icon: ShoppingCart,
          color: goldPrimary,
      },
  ];

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
        color: goldPrimary,
        fill: true,
      },
    ],
  }

  // Mock data for design categories
  const designCategoriesData = {
    labels: ["Dresses", "Suits", "Casual Wear", "Formal Wear", "Accessories"],
    data: [18, 12, 8, 6, 4],
    colors: [goldPrimary, silverPrimary, "#2CCCE4", "#FF9E80", "#B388FF"],
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

        <AdditionalStats>
            {additionalStats.map((stat, index) => (
                <StatsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    change={stat.change}
                    isPositive={stat.isPositive}
                    icon={stat.icon}
                    color={stat.color}
                />
            ))}
        </AdditionalStats>

      <ChartsGrid>
        <LineChart
          title="Design Views"
          description="Monthly views for all your designs"
          labels={designViewsData.labels}
          datasets={designViewsData.datasets}
          height={400} //Increased Height
        />

        <DoughnutChart
          title="Design Categories"
          description="Distribution of your designs by category"
          labels={designCategoriesData.labels}
          data={designCategoriesData.data}
          colors={designCategoriesData.colors}
          height={400} // Increased Height
        />
          {/* Add a new chart component here */}
          {/* Replace with your custom chart component */}

      </ChartsGrid>

      <SectionTitle>
        Recent Designs
        <button className="action-button">
          <Palette size={20} />
          Create New Design
        </button>
      </SectionTitle>

      <DesignsGrid>
        {recentDesigns.map((design) => (
          <DesignCard key={design.id}>
            <DesignImage style={{ backgroundImage: `url(${design.image})` }}>
              <div className="overlay">
                <ActionButton>
                  <Eye size={20} />
                </ActionButton>
                <ActionButton>
                  <Share2 size={20} />
                </ActionButton>
                <ActionButton>
                  <Download size={20} />
                </ActionButton>
              </div>
            </DesignImage>
            <DesignContent>
              <DesignTitle>{design.title}</DesignTitle>
              <div style={{ fontSize: "1rem", color: textSecondary, opacity: "0.8" }}>
                Design ID: {design.id}
              </div>
              <DesignMeta>
                <div className="stats">
                  <div className="stat">
                    <Eye size={20} />
                    {design.views}
                  </div>
                  <div className="stat">
                    <Users size={20} />
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
    </DashboardLayout>
  )
}

export default DesignerDashboard