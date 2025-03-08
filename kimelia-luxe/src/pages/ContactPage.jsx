// "use client"
// import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiMessageSquare, FiHelpCircle } from "react-icons/fi"
// import styled from "styled-components"
// import Button from "../components/common/Button"

// const PageWrapper = styled.div`
//   background: white;
//   color: rgb(19, 17, 17);
//   min-height: 100vh;
//   font-family: 'Poppins', sans-serif;
// `

// const ContactHeader = styled.section`
//   background: linear-gradient(135deg, #000000, #333333);
//   color: white;
//   padding: 5rem 2rem;
//   text-align: center;
//   position: relative;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: url('/placeholder.svg?height=400&width=1200') center/cover no-repeat;
//     opacity: 0.2;
//     z-index: 1;
//   }
// `

// const HeaderContent = styled.div`
//   position: relative;
//   z-index: 2;
//   max-width: 800px;
//   margin: 0 auto;
// `

// const PageTitle = styled.h1`
//   font-size: 3rem;
//   margin-bottom: 1.5rem;
// `

// const PageSubtitle = styled.p`
//   font-size: 1.2rem;
//   margin-bottom: 2rem;
//   opacity: 0.9;
// `

// const ContactGrid = styled.section`
//   max-width: 1200px;
//   margin: -3rem auto 4rem;
//   padding: 0 2rem;
//   position: relative;
//   z-index: 3;
//   display: grid;
//   grid-template-columns: 1fr 2fr;
//   gap: 2rem;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `

// const ContactInfo = styled.div`
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   padding: 2rem;
//   height: fit-content;
// `

// const ContactForm = styled.div`
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   padding: 2rem;
// `

// const InfoTitle = styled.h2`
//   font-size: 1.5rem;
//   margin-bottom: 1.5rem;
//   color: black;
// `

// const InfoList = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
// `

// const InfoItem = styled.li`
//   display: flex;
//   margin-bottom: 1.5rem;
// `

// const InfoIcon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background: rgba(0, 0, 0, 0.05);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 1rem;
//   color: #D4AF37;
// `

// const InfoContent = styled.div``

// const InfoLabel = styled.h3`
//   font-size: 1rem;
//   margin-bottom: 0.25rem;
//   color: black;
// `

// const InfoText = styled.p`
//   color: rgba(0, 0, 0, 0.7);
//   font-size: 0.9rem;
// `

// const SocialLinks = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 2rem;
// `

// const SocialLink = styled.a`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background: rgba(0, 0, 0, 0.05);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: black;
//   transition: all 0.3s ease;

//   &:hover {
//     background: #D4AF37;
//     color: black;
//     transform: translateY(-3px);
//   }
// `

// const FormTitle = styled.h2`
//   font-size: 1.5rem;
//   margin-bottom: 1.5rem;
//   color: black;
// `

// const FormGrid = styled.form`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1.5rem;

//   @media (max-width: 576px) {
//     grid-template-columns: 1fr;
//   }
// `

// const FormGroup = styled.div`
//   grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
// `

// const FormLabel = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-size: 0.9rem;
//   color: rgba(0, 0, 0, 0.7);
// `

// const FormInput = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   border: 1px solid rgba(0, 0, 0, 0.2);
//   border-radius: 4px;
//   font-size: 1rem;
//   transition: border-color 0.3s ease;

//   &:focus {
//     outline: none;
//     border-color: #D4AF37;
//   }
// `

// const FormSelect = styled.select`
//   width: 100%;
//   padding: 0.75rem;
//   border: 1px solid rgba(0, 0, 0, 0.2);
//   border-radius: 4px;
//   font-size: 1rem;
//   transition: border-color 0.3s ease;
//   appearance: none;
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
//   background-repeat: no-repeat;
//   background-position: right 0.5rem center;
//   background-size: 1rem;

//   &:focus {
//     outline: none;
//     border-color: #D4AF37;
//   }
// `

// const FormTextarea = styled.textarea`
//   width: 100%;
//   padding: 0.75rem;
//   border: 1px solid rgba(0, 0, 0, 0.2);
//   border-radius: 4px;
//   font-size: 1rem;
//   transition: border-color 0.3s ease;
//   min-height: 150px;
//   resize: vertical;

//   &:focus {
//     outline: none;
//     border-color: #D4AF37;
//   }
// `

// const SubmitButton = styled(Button)`
//   margin-top: 1rem;
// `

// const MapSection = styled.section`
//   max-width: 1200px;
//   margin: 0 auto 4rem;
//   padding: 0 2rem;
// `

// const MapTitle = styled.h2`
//   font-size: 1.75rem;
//   margin-bottom: 2rem;
//   color: black;
//   text-align: center;
// `

// const MapContainer = styled.div`
//   height: 400px;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   background: #f5f5f5;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: rgba(0, 0, 0, 0.5);
// `

// const FaqSection = styled.section`
//   max-width: 1200px;
//   margin: 0 auto 4rem;
//   padding: 0 2rem;
// `

// const FaqTitle = styled.h2`
//   font-size: 1.75rem;
//   margin-bottom: 2rem;
//   color: black;
//   text-align: center;
// `

// const FaqGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 2rem;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `

// const FaqItem = styled.div`
//   background: white;
//   border-radius: 8px;
//   padding: 1.5rem;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
//   border: 1px solid rgba(0, 0, 0, 0.05);
// `

// const FaqQuestion = styled.h3`
//   font-size: 1.1rem;
//   margin-bottom: 1rem;
//   color: black;
//   display: flex;
//   align-items: center;

//   svg {
//     color: #D4AF37;
//     margin-right: 0.75rem;
//     flex-shrink: 0;
//   }
// `

// const FaqAnswer = styled.p`
//   color: rgba(0, 0, 0, 0.7);
//   line-height: 1.6;
// `

// const ContactPage = () => {
//   return (
//     <PageWrapper>
//       <ContactHeader>
//         <HeaderContent>
//           <PageTitle>Get in Touch</PageTitle>
//           <PageSubtitle>
//             Have questions about our services or need assistance with your order? We're here to help you with any
//             inquiries.
//           </PageSubtitle>
//         </HeaderContent>
//       </ContactHeader>

//       <ContactGrid>
//         <ContactInfo>
//           <InfoTitle>Contact Information</InfoTitle>
//           <InfoList>
//             <InfoItem>
//               <InfoIcon>
//                 <FiMapPin />
//               </InfoIcon>
//               <InfoContent>
//                 <InfoLabel>Our Location</InfoLabel>
//                 <InfoText>Kigali Heights, KG 7 Ave, Kigali, Rwanda</InfoText>
//               </InfoContent>
//             </InfoItem>
//             <InfoItem>
//               <InfoIcon>
//                 <FiPhone />
//               </InfoIcon>
//               <InfoContent>
//                 <InfoLabel>Phone Number</InfoLabel>
//                 <InfoText>+250 788 123 456</InfoText>
//               </InfoContent>
//             </InfoItem>
//             <InfoItem>
//               <InfoIcon>
//                 <FiMail />
//               </InfoIcon>
//               <InfoContent>
//                 <InfoLabel>Email Address</InfoLabel>
//                 <InfoText>support@kimelialuxe.com</InfoText>
//               </InfoContent>
//             </InfoItem>
//             <InfoItem>
//               <InfoIcon>
//                 <FiClock />
//               </InfoIcon>
//               <InfoContent>
//                 <InfoLabel>Working Hours</InfoLabel>
//                 <InfoText>Monday - Friday: 9am to 6pm</InfoText>
//                 <InfoText>Saturday: 10am to 4pm</InfoText>
//               </InfoContent>
//             </InfoItem>
//           </InfoList>

//           <SocialLinks>
//             <SocialLink href="#" target="_blank" rel="noopener noreferrer">
//               <FiSend />
//             </SocialLink>
//             <SocialLink href="#" target="_blank" rel="noopener noreferrer">
//               <FiMessageSquare />
//             </SocialLink>
//             <SocialLink href="#" target="_blank" rel="noopener noreferrer">
//               <FiHelpCircle />
//             </SocialLink>
//           </SocialLinks>
//         </ContactInfo>

//         <ContactForm>
//           <FormTitle>Send Us a Message</FormTitle>
//           <FormGrid>
//             <FormGroup>
//               <FormLabel>First Name</FormLabel>
//               <FormInput type="text" placeholder="Your first name" />
//             </FormGroup>
//             <FormGroup>
//               <FormLabel>Last Name</FormLabel>
//               <FormInput type="text" placeholder="Your last name" />
//             </FormGroup>
//             <FormGroup>
//               <FormLabel>Email Address</FormLabel>
//               <FormInput type="email" placeholder="Your email address" />
//             </FormGroup>
//             <FormGroup>
//               <FormLabel>Phone Number</FormLabel>
//               <FormInput type="tel" placeholder="Your phone number" />
//             </FormGroup>
//             <FormGroup fullWidth>
//               <FormLabel>Subject</FormLabel>
//               <FormSelect>
//                 <option value="">Select a subject</option>
//                 <option value="general">General Inquiry</option>
//                 <option value="support">Technical Support</option>
//                 <option value="orders">Order Status</option>
//                 <option value="returns">Returns & Exchanges</option>
//                 <option value="feedback">Feedback</option>
//               </FormSelect>
//             </FormGroup>
//             <FormGroup fullWidth>
//               <FormLabel>Message</FormLabel>
//               <FormTextarea placeholder="How can we help you?" />
//             </FormGroup>
//             <FormGroup fullWidth>
//               <SubmitButton>Send Message</SubmitButton>
//             </FormGroup>
//           </FormGrid>
//         </ContactForm>
//       </ContactGrid>

//       <MapSection>
//         <MapTitle>Visit Our Store</MapTitle>
//         <MapContainer>
//           <p>Map will be displayed here</p>
//         </MapContainer>
//       </MapSection>

//       <FaqSection>
//         <FaqTitle>Frequently Asked Questions</FaqTitle>
//         <FaqGrid>
//           <FaqItem>
//             <FaqQuestion>
//               <FiHelpCircle /> How does the virtual fitting room work?
//             </FaqQuestion>
//             <FaqAnswer>
//               Our virtual fitting room uses advanced AI technology to create a digital representation of your body.
//               Simply upload a photo, and our system will allow you to try on different clothing items virtually to see
//               how they look on you before making a purchase.
//             </FaqAnswer>
//           </FaqItem>
//           <FaqItem>
//             <FaqQuestion>
//               <FiHelpCircle /> What payment methods do you accept?
//             </FaqQuestion>
//             <FaqAnswer>
//               We accept various payment methods including credit/debit cards, Mobile Money (MoMo), PayPal, and bank
//               transfers. All transactions are secure and encrypted to ensure your financial information is protected.
//             </FaqAnswer>
//           </FaqItem>
//           <FaqItem>
//             <FaqQuestion>
//               <FiHelpCircle /> How long does shipping take?
//             </FaqQuestion>
//             <FaqAnswer>
//               Shipping times vary depending on your location. Within Rwanda, delivery typically takes 1-3 business days.
//               International shipping can take 7-14 business days. You can track your order in real-time through your
//               account dashboard.
//             </FaqAnswer>
//           </FaqItem>
//           <FaqItem>
//             <FaqQuestion>
//               <FiHelpCircle /> Can I return or exchange items?
//             </FaqQuestion>
//             <FaqAnswer>
//               Yes, we offer a 30-day return policy for most items. Custom-designed pieces have special return
//               conditions. Please refer to our Returns & Exchanges policy for detailed information or contact our
//               customer support team for assistance.
//             </FaqAnswer>
//           </FaqItem>
//         </FaqGrid>
//       </FaqSection>
//     </PageWrapper>
//   )
// }

// export default ContactPage

"use client"
import { useState } from "react"
import styled from "styled-components"
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiMessageSquare, 
  FiSend,
  FiClock,
  FiInstagram,
  FiFacebook,
  FiTwitter
} from "react-icons/fi"

const PageWrapper = styled.div`
  background: white;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`

const HeroSection = styled.section`
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/placeholder.svg?height=500&width=1200');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 5rem 0;
  text-align: center;
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
    opacity: 0.9;
  }
`

const ContactSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: black;
`

const SectionDescription = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 2rem;
  line-height: 1.6;
`

const ContactCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ContactCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    color: #D4AF37;
    font-size: 1.5rem;
  }
`

const ContactDetails = styled.div`
  flex-grow: 1;
`

const ContactTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: black;
`

const ContactText = styled.p`
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.6;
  
  a {
    color: #D4AF37;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const BusinessHours = styled.div`
  margin-top: 2rem;
`

const HoursTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: black;
`

const HoursList = styled.ul`
  list-style: none;
  padding: 0;
`

const HoursItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`

const Day = styled.span`
  font-weight: 500;
`

const Hours = styled.span`
  color: rgba(0, 0, 0, 0.7);
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
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease;
  
  &:hover {
    background: #D4AF37;
    color: white;
    transform: translateY(-3px);
  }
  
  svg {
    font-size: 1.2rem;
  }
`

const ContactForm = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
`

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: black;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FormLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
`

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const FormTextarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const FormSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #333;
  }
  
  svg {
    font-size: 1.2rem;
  }
`

const MapSection = styled.section`
  margin: 4rem 0;
`

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  background: #f9f9f9;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`

const FAQSection = styled.section`
  max-width: 1000px;
  margin: 4rem auto;
  padding: 0 2rem;
  text-align: center;
`

const FAQTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: black;
`

const FAQDescription = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`

const FAQButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: black;
  border: 2px solid black;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: black;
    color: white;
  }
`

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  
  return (
    <PageWrapper>
      <HeroSection>
        <HeroContent>
          <h1>Contact Us</h1>
          <p>
            Have questions or need assistance? We're here to help. Reach out to our team through any of the channels below.
          </p>
        </HeroContent>
      </HeroSection>
      
      <ContactSection>
        <ContactInfo>
          <div>
            <SectionTitle>Get in Touch</SectionTitle>
            <SectionDescription>
              We'd love to hear from you. Whether you have a question about our design tools, marketplace, or anything else, our team is ready to answer all your questions.
            </SectionDescription>
          </div>
          
          <ContactCards>
            <ContactCard>
              <ContactIcon>
                <FiMail />
              </ContactIcon>
              <ContactDetails>
                <ContactTitle>Email Us</ContactTitle>
                <ContactText>
                  <a href="mailto:info@kimelialuxe.com">info@kimelialuxe.com</a><br />
                  <a href="mailto:support@kimelialuxe.com">support@kimelialuxe.com</a>
                </ContactText>
              </ContactDetails>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>
                <FiPhone />
              </ContactIcon>
              <ContactDetails>
                <ContactTitle>Call Us</ContactTitle>
                <ContactText>
                  <a href="tel:+250123456789">+250 123 456 789</a><br />
                  <a href="tel:+250987654321">+250 987 654 321</a>
                </ContactText>
              </ContactDetails>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>
                <FiMapPin />
              </ContactIcon>
              <ContactDetails>
                <ContactTitle>Visit Us</ContactTitle>
                <ContactText>
                  Kimelia Luxe Headquarters<br />
                  KG 123 St, Kigali<br />
                  Rwanda
                </ContactText>
              </ContactDetails>
            </ContactCard>
            
            <ContactCard>
              <ContactIcon>
                <FiMessageSquare />
              </ContactIcon>
              <ContactDetails>
                <ContactTitle>Live Chat</ContactTitle>
                <ContactText>
                  Chat with our customer support team in real-time during business hours.
                </ContactText>
              </ContactDetails>
            </ContactCard>
          </ContactCards>
          
          <BusinessHours>
            <HoursTitle>Business Hours</HoursTitle>
            <HoursList>
              <HoursItem>
                <Day>Monday - Friday</Day>
                <Hours>9:00 AM - 6:00 PM</Hours>
              </HoursItem>
              <HoursItem>
                <Day>Saturday</Day>
                <Hours>10:00 AM - 4:00 PM</Hours>
              </HoursItem>
              <HoursItem>
                <Day>Sunday</Day>
                <Hours>Closed</Hours>
              </HoursItem>
            </HoursList>
          </BusinessHours>
          
          <SocialLinks>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FiFacebook />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
        
        <ContactForm>
          <FormTitle>Send Us a Message</FormTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <FormInput 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="email">Your Email</FormLabel>
              <FormInput 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormSelect 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Design Tools Support">Design Tools Support</option>
                <option value="Marketplace Support">Marketplace Support</option>
                <option value="Order Issue">Order Issue</option>
                <option value="Partnership Opportunity">Partnership Opportunity</option>
                <option value="Other">Other</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="message">Your Message</FormLabel>
              <FormTextarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <SubmitButton type="submit">
              Send Message <FiSend />
            </SubmitButton>
          </Form>
        </ContactForm>
      </ContactSection>
      
      <MapSection>
        <MapContainer>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63799.41051610982!2d30.03955565!3d-1.9440867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42f34d5faff%3A0x5b7b4f95a9c9b545!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1647874587123!5m2!1sen!2sus" 
            allowFullScreen="" 
            loading="lazy"
            title="Kimelia Luxe Location"
          ></iframe>
        </MapContainer>
      </MapSection>
      
      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQDescription>
          Find answers to common questions about Kimelia Luxe, our design tools, marketplace, and more in our comprehensive FAQ section.
        </FAQDescription>
        <FAQButton href="/support/faq">
          View FAQs
        </FAQButton>
      </FAQSection>
    </PageWrapper>
  );
};

export default ContactPage;


