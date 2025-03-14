import styled from "styled-components"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

const ChartContainer = styled.div`
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  height: 100%;
  border: 1px solid var(--color-border);
`

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const ChartTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`

const ChartDescription = styled.p`
  font-size: 0.875rem;
  color: var(--color-foreground);
  opacity: 0.7;
  margin: 0.25rem 0 0 0;
`

const DoughnutChart = ({
  title,
  description,
  labels,
  data,
  colors = ["var(--color-primary)", "#6C63FF", "#2CCCE4", "#FF9E80", "#B388FF"],
  height = 300,
  options = {},
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: "var(--color-background)",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  }

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "var(--color-foreground)",
        },
      },
      tooltip: {
        backgroundColor: "var(--color-secondary)",
        padding: 10,
        cornerRadius: 6,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
      },
    },
  }

  return (
    <ChartContainer>
      <ChartHeader>
        <div>
          <ChartTitle>{title}</ChartTitle>
          {description && <ChartDescription>{description}</ChartDescription>}
        </div>
      </ChartHeader>
      <div style={{ height: `${height}px`, position: "relative" }}>
        <Doughnut data={chartData} options={{ ...defaultOptions, ...options }} />
      </div>
    </ChartContainer>
  )
}

export default DoughnutChart

