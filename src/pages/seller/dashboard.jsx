import styled from "styled-components"
import { Package, ShoppingBag, DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

import DashboardLayout from "../../Layouts/Dashboard-Layout.jsx"
import StatsCard from "../../components/common/StatsCard"
import LineChart from "../../components/common/charts/LineChart.jsx"
import BarChart from "../../components/common/charts/Barchart.jsx"
import DoughnutChart from "../../components/common/charts/DoughnutChart.jsx"

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
    grid-template-columns: repeat(4, 1fr);
  }
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
`

const AlertsContainer = styled.div`
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  height: 100%;
  
  .header {
    margin-bottom: 1.5rem;
    
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
  
  .alerts {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

const Alert = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  
  &.warning {
    background-color: rgba(255, 152, 0, 0.1);
  }
  
  &.success {
    background-color: rgba(76, 175, 80, 0.1);
  }
  
  .icon {
    margin-top: 0.25rem;
    
    &.warning {
      color: var(--color-warning);
    }
    
    &.success {
      color: var(--color-success);
    }
  }
  
  .content {
    flex: 1;
    
    .title {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .message {
      font-size: 0.875rem;
      color: var(--color-foreground);
      opacity: 0.7;
    }
    
    .time {
      font-size: 0.75rem;
      color: var(--color-foreground);
      opacity: 0.5;
      margin-top: 0.5rem;
    }
  }
`

const InventoryTable = styled.div`
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  margin-top: 1.5rem;
  
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    
    button {
      padding: 0.5rem 1rem;
      border-radius: var(--radius-md);
      background-color: var(--color-primary);
      color: white;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: var(--color-primary-dark);
      }
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

const StockBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  
  &.in-stock {
    background-color: rgba(76, 175, 80, 0.1);
    color: var(--color-success);
  }
  
  &.low-stock {
    background-color: rgba(255, 152, 0, 0.1);
    color: var(--color-warning);
  }
  
  &.out-of-stock {
    background-color: rgba(244, 67, 54, 0.1);
    color: var(--color-error);
  }
`

const ActionButton = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  font-weight: 600;
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
`

const SellerDashboard = () => {
  // Mock data for stats
  const stats = [
    {
      title: "Total Products",
      value: "124",
      change: "+8",
      isPositive: true,
      icon: Package,
      color: "var(--color-primary)",
    },
    {
      title: "Total Orders",
      value: "85",
      change: "+12",
      isPositive: true,
      icon: ShoppingBag,
      color: "#6C63FF",
    },
    {
      title: "Revenue",
      value: "$12,845",
      change: "+15.2%",
      isPositive: true,
      icon: DollarSign,
      color: "#2CCCE4",
    },
    {
      title: "Conversion Rate",
      value: "2.8%",
      change: "-0.5%",
      isPositive: false,
      icon: TrendingUp,
      color: "#FF9E80",
    },
  ]

  // Mock data for sales chart
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales",
        data: [4500, 5200, 6000, 5800, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000],
        color: "var(--color-primary)",
        fill: true,
        currency: "USD",
      },
    ],
  }

  // Mock data for product categories
  const productCategoriesData = {
    labels: ["Dresses", "Suits", "Casual Wear", "Formal Wear", "Accessories"],
    data: [45, 25, 20, 15, 19],
    colors: ["var(--color-primary)", "#6C63FF", "#2CCCE4", "#FF9E80", "#B388FF"],
  }

  // Mock data for inventory
  const inventoryItems = [
    {
      id: "PRD-001",
      name: "Summer Dress - Floral",
      category: "Dresses",
      price: "$89.99",
      stock: 24,
      status: "in-stock",
    },
    {
      id: "PRD-002",
      name: "Formal Blazer - Black",
      category: "Formal Wear",
      price: "$129.99",
      stock: 8,
      status: "low-stock",
    },
    {
      id: "PRD-003",
      name: "Casual T-Shirt - Blue",
      category: "Casual Wear",
      price: "$29.99",
      stock: 42,
      status: "in-stock",
    },
    {
      id: "PRD-004",
      name: "Evening Gown - Red",
      category: "Formal Wear",
      price: "$199.99",
      stock: 0,
      status: "out-of-stock",
    },
    {
      id: "PRD-005",
      name: "Jeans - Slim Fit",
      category: "Casual Wear",
      price: "$59.99",
      stock: 15,
      status: "in-stock",
    },
  ]

  // Mock data for alerts
  const alerts = [
    {
      type: "warning",
      title: "Low Stock Alert",
      message: "Formal Blazer - Black is running low on stock (8 items remaining).",
      time: "2 hours ago",
    },
    {
      type: "warning",
      title: "Out of Stock Alert",
      message: "Evening Gown - Red is now out of stock. Consider restocking soon.",
      time: "5 hours ago",
    },
    {
      type: "success",
      title: "Order Fulfilled",
      message: "Order #ORD-085 has been successfully fulfilled and shipped.",
      time: "1 day ago",
    },
    {
      type: "success",
      title: "New Order Received",
      message: "You have received a new order #ORD-086 worth $145.98.",
      time: "1 day ago",
    },
  ]

  // Mock data for top selling products
  const topSellingData = {
    labels: ["Summer Dress", "Formal Blazer", "Casual T-Shirt", "Jeans", "Evening Gown"],
    datasets: [
      {
        label: "Units Sold",
        data: [45, 38, 32, 28, 22],
        color: "#6C63FF",
      },
    ],
  }

  return (
    <DashboardLayout title="Seller Dashboard">
      <PageTitle>Seller Dashboard</PageTitle>
      <PageDescription>Welcome back! Here's an overview of your store performance.</PageDescription>

      <StatsGrid>
        {stats.map((stat, index) => (
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
      </StatsGrid>

      <ChartsGrid>
        <LineChart
          title="Sales Overview"
          description="Monthly sales for the current year"
          labels={salesData.labels}
          datasets={salesData.datasets}
          height={350}
        />

        <AlertsContainer>
          <div className="header">
            <h3>Recent Alerts</h3>
            <p>Important notifications for your store</p>
          </div>

          <div className="alerts">
            {alerts.slice(0, 3).map((alert, index) => (
              <Alert key={index} className={alert.type}>
                <div className={`icon ${alert.type}`}>
                  {alert.type === "warning" ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                </div>
                <div className="content">
                  <div className="title">{alert.title}</div>
                  <div className="message">{alert.message}</div>
                  <div className="time">{alert.time}</div>
                </div>
              </Alert>
            ))}
          </div>
        </AlertsContainer>
      </ChartsGrid>

      <ChartsGrid>
        <BarChart
          title="Top Selling Products"
          description="Best performing products by units sold"
          labels={topSellingData.labels}
          datasets={topSellingData.datasets}
          height={350}
          options={{
            indexAxis: "y",
            scales: {
              x: {
                beginAtZero: true,
              },
            },
          }}
        />

        <DoughnutChart
          title="Product Categories"
          description="Distribution of your products by category"
          labels={productCategoriesData.labels}
          data={productCategoriesData.data}
          colors={productCategoriesData.colors}
          height={350}
        />
      </ChartsGrid>

      <InventoryTable>
        <div className="table-header">
          <div>
            <h3>Inventory Management</h3>
            <p>Track your product inventory</p>
          </div>
          <button>Add New Product</button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>
                    <StockBadge className={item.status}>
                      {item.status
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </StockBadge>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <ActionButton className="secondary">Edit</ActionButton>
                      {item.status === "low-stock" || item.status === "out-of-stock" ? (
                        <ActionButton className="primary">Restock</ActionButton>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InventoryTable>
    </DashboardLayout>
  )
}

export default SellerDashboard

