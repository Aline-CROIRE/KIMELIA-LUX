"use client"
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiMessageSquare, FiHelpCircle } from "react-icons/fi"
import styled from "styled-components"
import Button from "../components/common/Button"

const PageWrapper = styled.div`
  background: white;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`

const ContactHeader = styled.section`
  background: linear-gradient(135deg, #000000, #333333);
  color: white;
  padding: 5rem 2rem;
  text-align: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/placeholder.svg?height=400&width=1200') center/cover no-repeat;
    opacity: 0.2;
    z-index: 1;
  }
`

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`

const ContactGrid = styled.section`
  max-width: 1200px;
  margin: -3rem auto 4rem;
  padding: 0 2rem;
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ContactInfo = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  height: fit-content;
`

const ContactForm = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`

const InfoTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: black;
`

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const InfoItem = styled.li`
  display: flex;
  margin-bottom: 1.5rem;
`

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: #D4AF37;
`

const InfoContent = styled.div``

const InfoLabel = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: black;
`

const InfoText = styled.p`
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.9rem;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  transition: all 0.3s ease;

  &:hover {
    background: #D4AF37;
    color: black;
    transform: translateY(-3px);
  }
`

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: black;
`

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const SubmitButton = styled(Button)`
  margin-top: 1rem;
`

const MapSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
`

const MapTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 2rem;
  color: black;
  text-align: center;
`

const MapContainer = styled.div`
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.5);
`

const FaqSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
`

const FaqTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 2rem;
  color: black;
  text-align: center;
`

const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FaqItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`

const FaqQuestion = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: black;
  display: flex;
  align-items: center;

  svg {
    color: #D4AF37;
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
`

const FaqAnswer = styled.p`
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.6;
`

const ContactPage = () => {
  return (
    <PageWrapper>
      <ContactHeader>
        <HeaderContent>
          <PageTitle>Get in Touch</PageTitle>
          <PageSubtitle>
            Have questions about our services or need assistance with your order? We're here to help you with any
            inquiries.
          </PageSubtitle>
        </HeaderContent>
      </ContactHeader>

      <ContactGrid>
        <ContactInfo>
          <InfoTitle>Contact Information</InfoTitle>
          <InfoList>
            <InfoItem>
              <InfoIcon>
                <FiMapPin />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Our Location</InfoLabel>
                <InfoText>Kigali Heights, KG 7 Ave, Kigali, Rwanda</InfoText>
              </InfoContent>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <FiPhone />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Phone Number</InfoLabel>
                <InfoText>+250 788 123 456</InfoText>
              </InfoContent>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <FiMail />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Email Address</InfoLabel>
                <InfoText>support@kimelialuxe.com</InfoText>
              </InfoContent>
            </InfoItem>
            <InfoItem>
              <InfoIcon>
                <FiClock />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Working Hours</InfoLabel>
                <InfoText>Monday - Friday: 9am to 6pm</InfoText>
                <InfoText>Saturday: 10am to 4pm</InfoText>
              </InfoContent>
            </InfoItem>
          </InfoList>

          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FiSend />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FiMessageSquare />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FiHelpCircle />
            </SocialLink>
          </SocialLinks>
        </ContactInfo>

        <ContactForm>
          <FormTitle>Send Us a Message</FormTitle>
          <FormGrid>
            <FormGroup>
              <FormLabel>First Name</FormLabel>
              <FormInput type="text" placeholder="Your first name" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Last Name</FormLabel>
              <FormInput type="text" placeholder="Your last name" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <FormInput type="email" placeholder="Your email address" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Phone Number</FormLabel>
              <FormInput type="tel" placeholder="Your phone number" />
            </FormGroup>
            <FormGroup fullWidth>
              <FormLabel>Subject</FormLabel>
              <FormSelect>
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="orders">Order Status</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="feedback">Feedback</option>
              </FormSelect>
            </FormGroup>
            <FormGroup fullWidth>
              <FormLabel>Message</FormLabel>
              <FormTextarea placeholder="How can we help you?" />
            </FormGroup>
            <FormGroup fullWidth>
              <SubmitButton>Send Message</SubmitButton>
            </FormGroup>
          </FormGrid>
        </ContactForm>
      </ContactGrid>

      <MapSection>
        <MapTitle>Visit Our Store</MapTitle>
        <MapContainer>
          <p>Map will be displayed here</p>
        </MapContainer>
      </MapSection>

      <FaqSection>
        <FaqTitle>Frequently Asked Questions</FaqTitle>
        <FaqGrid>
          <FaqItem>
            <FaqQuestion>
              <FiHelpCircle /> How does the virtual fitting room work?
            </FaqQuestion>
            <FaqAnswer>
              Our virtual fitting room uses advanced AI technology to create a digital representation of your body.
              Simply upload a photo, and our system will allow you to try on different clothing items virtually to see
              how they look on you before making a purchase.
            </FaqAnswer>
          </FaqItem>
          <FaqItem>
            <FaqQuestion>
              <FiHelpCircle /> What payment methods do you accept?
            </FaqQuestion>
            <FaqAnswer>
              We accept various payment methods including credit/debit cards, Mobile Money (MoMo), PayPal, and bank
              transfers. All transactions are secure and encrypted to ensure your financial information is protected.
            </FaqAnswer>
          </FaqItem>
          <FaqItem>
            <FaqQuestion>
              <FiHelpCircle /> How long does shipping take?
            </FaqQuestion>
            <FaqAnswer>
              Shipping times vary depending on your location. Within Rwanda, delivery typically takes 1-3 business days.
              International shipping can take 7-14 business days. You can track your order in real-time through your
              account dashboard.
            </FaqAnswer>
          </FaqItem>
          <FaqItem>
            <FaqQuestion>
              <FiHelpCircle /> Can I return or exchange items?
            </FaqQuestion>
            <FaqAnswer>
              Yes, we offer a 30-day return policy for most items. Custom-designed pieces have special return
              conditions. Please refer to our Returns & Exchanges policy for detailed information or contact our
              customer support team for assistance.
            </FaqAnswer>
          </FaqItem>
        </FaqGrid>
      </FaqSection>
    </PageWrapper>
  )
}

export default ContactPage

