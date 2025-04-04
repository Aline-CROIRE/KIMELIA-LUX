import styled from "styled-components"
import { Image } from "lucide-react"

const EmptyCardContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`

const EmptyCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #050505;
`

const EmptyCardDescription = styled.p`
  font-size: 0.875rem;
  color: #666666;
  margin-bottom: 1.5rem;
`

const IconContainer = styled.div`
  margin-top: 1.5rem;
  color: #A0A0A0;
`

const EmptyDataCard = ({ title, description }) => {
  return (
    <EmptyCardContainer>
      <EmptyCardTitle>{title}</EmptyCardTitle>
      <EmptyCardDescription>{description}</EmptyCardDescription>
      <IconContainer>
        <Image size={48} />
      </IconContainer>
    </EmptyCardContainer>
  )
}

export default EmptyDataCard

