import styled from "styled-components"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const Card = styled.div`
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--color-border);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor || "var(--color-primary)"};
  color: white;
`

const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-foreground);
  opacity: 0.7;
  margin: 0;
`

const Value = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0.5rem 0;
`

const Change = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => (props.isPositive ? "var(--color-success)" : "var(--color-error)")};
`

const StatsCard = ({ title, value, change, isPositive = true, icon: Icon, color }) => {
  return (
    <Card>
      <CardHeader>
        <Title>{title}</Title>
        <IconWrapper bgColor={color}>
          <Icon size={24} />
        </IconWrapper>
      </CardHeader>
      <Value>{value}</Value>
      <Change isPositive={isPositive}>
        {isPositive ? (
          <ArrowUpRight size={16} style={{ marginRight: "0.25rem" }} />
        ) : (
          <ArrowDownRight size={16} style={{ marginRight: "0.25rem" }} />
        )}
        {change}
      </Change>
    </Card>
  )
}

export default StatsCard

