import styled from "styled-components"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

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

const LineChart = ({ title, description, labels, datasets, height = 300, options = {} }) => {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.color || "var(--color-primary)",
      backgroundColor: dataset.fill ? `${dataset.color}20` || "rgba(212, 175, 55, 0.1)" : "transparent",
      tension: 0.4,
      fill: dataset.fill || false,
      pointBackgroundColor: dataset.color || "var(--color-primary)",
      pointBorderColor: "var(--color-background)",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      ...dataset,
    })),
  }

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
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
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              const currentDataset = datasets[context.datasetIndex]
              label += new Intl.NumberFormat("en-US", {
                style: currentDataset.currency ? "currency" : "decimal",
                currency: currentDataset.currency || "USD",
              }).format(context.parsed.y)
            }
            return label
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "var(--color-border)",
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "var(--color-foreground)",
        },
      },
      y: {
        grid: {
          color: "var(--color-border)",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "var(--color-foreground)",
          callback: (value) =>
            datasets[0].currency
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: datasets[0].currency || "USD",
                  maximumFractionDigits: 0,
                }).format(value)
              : value,
        },
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
      <div style={{ height: `${height}px` }}>
        <Line data={data} options={{ ...defaultOptions, ...options }} />
      </div>
    </ChartContainer>
  )
}

export default LineChart

