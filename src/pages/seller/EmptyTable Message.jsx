import styled from "styled-components"
import { Image } from "lucide-react"

const EmptyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #666666;
`

const IconContainer = styled.div`
  margin-bottom: 1rem;
  color: #A0A0A0;
`

const EmptyTableMessage = ({ message }) => {
  return (
    <EmptyMessageContainer>
      <IconContainer>
        <Image size={48} />
      </IconContainer>
      <p>{message}</p>
    </EmptyMessageContainer>
  )
}

export default EmptyTableMessage

