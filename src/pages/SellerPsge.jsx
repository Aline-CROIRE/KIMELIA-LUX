import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDollarSign, FiGlobe, FiTrendingUp, FiUsers, FiShield, FiPackage } from 'react-icons/fi';

const PageContainer = styled.div`
  background: white;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('/images/seller-hero.jpg') center/cover no-repeat;
  color: white;
  padding: 8rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const PrimaryButton = styled(Link)`
  background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
  color: black;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    margin-left: 0.5rem;
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #D4AF37;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
    transform: translateY(-3px);
  }
  
  svg {
    margin-left: 0.5rem;
  }
`;

const BenefitsSection = styled.section`
  padding: 5rem 2rem;
  background: #f9f9f9;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #000;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: #D4AF37;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BenefitCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  color: #D4AF37;
  margin-bottom: 1.5rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #000;
`;

const BenefitDescription = styled.p`
  color: #555;
  line-height: 1.6;
`;

const HowItWorksSection = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const StepsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Step = styled.div`
  display: flex;
  margin-bottom: 4rem;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: 70px;
    left: 40px;
    height: calc(100% - 40px);
    width: 2px;
    background: #D4AF37;
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: black;
  flex-shrink: 0;
  z-index: 1;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
`;

const StepContent = styled.div`
  padding-left: 2rem;
  
  @media (max-width: 768px) {
    padding-left: 1rem;
    margin-top: 1.5rem;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #000;
`;

const StepDescription = styled.p`
  color: #555;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const TestimonialsSection = styled.section`
  padding: 5rem 2rem;
  background: #111;
  color: white;
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 8px;
  position: relative;
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -15px;
  left: 20px;
  font-size: 4rem;
  color: rgba(212, 175, 55, 0.2);
  z-index: 0;
`;

const TestimonialText = styled.p`
  font-style: italic;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  font-size: 1.1rem;
  color: #D4AF37;
  margin-bottom: 0.2rem;
`;

const AuthorRole = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const CTABOX = styled.div`
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 100%);
  border: 1px solid #D4AF37;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  margin-top: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CTATitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #D4AF37;
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FAQSection = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

const FAQQuestion = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: #000;
  display: flex;
  align-items: center;
  
  &:before {
    content: 'Q:';
    color: #D4AF37;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const FAQAnswer = styled.p`
  color: #555;
  line-height: 1.6;
  padding-left: 1.5rem;
  position: relative;
  
  &:before {
    content: 'A:';
    color: #D4AF37;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const BecomeSellerPage = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <PageTitle>Become a Seller on Kimelia Luxe</PageTitle>
          <PageSubtitle>
            Are you a fashion designer or tailor? Join our marketplace and showcase your creations to customers worldwide.
          </PageSubtitle>
          <ButtonGroup>
            <PrimaryButton to="/seller/apply">
              Apply Now <FiArrowRight />
            </PrimaryButton>
            <SecondaryButton to="/seller/information">
              Learn More <FiArrowRight />
            </SecondaryButton>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>
      
      <BenefitsSection>
        <SectionTitle>Why Sell on Kimelia Luxe?</SectionTitle>
        <BenefitsGrid>
          <BenefitCard>
            <BenefitIcon>
              <FiGlobe />
            </BenefitIcon>
            <BenefitTitle>Global Reach</BenefitTitle>
            <BenefitDescription>
              Showcase your designs to customers from around the world. Expand your business beyond local markets and connect with international fashion enthusiasts.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>
              <FiDollarSign />
            </BenefitIcon>
            <BenefitTitle>Competitive Commission</BenefitTitle>
            <BenefitDescription>
              Enjoy one of the most competitive commission rates in the industry. Keep more of what you earn and maximize your profits with our seller-friendly fee structure.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>
              <FiTrendingUp />
            </BenefitIcon>
            <BenefitTitle>Growth Opportunities</BenefitTitle>
            <BenefitDescription>
              Access marketing tools, analytics, and promotional opportunities to grow your brand. Our platform is designed to help you scale your fashion business.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>
              <FiUsers />
            </BenefitIcon>
            <BenefitTitle>Community Support</BenefitTitle>
            <BenefitDescription>
              Join a community of like-minded designers and fashion entrepreneurs. Share experiences, collaborate, and learn from each other's successes.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>
              <FiShield />
            </BenefitIcon>
            <BenefitTitle>Secure Payments</BenefitTitle>
            <BenefitDescription>
              Receive payments securely and on time. Our payment system ensures that you get paid for every sale without worrying about fraud or chargebacks.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>
              <FiPackage />
            </BenefitIcon>
            <BenefitTitle>Simplified Logistics</BenefitTitle>
            <BenefitDescription>
              Focus on creating beautiful designs while we handle the complexities of shipping, returns, and customer service. Our logistics support makes selling hassle-free.
            </BenefitDescription>
          </BenefitCard>
        </BenefitsGrid>
      </BenefitsSection>
      
      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Apply to Become a Seller</StepTitle>
              <StepDescription>
                Fill out our seller application form with details about your brand, design experience, and product offerings. Our team reviews each application carefully to ensure quality standards.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Set Up Your Shop</StepTitle>
              <StepDescription>
                Once approved, create your seller profile and shop page. Upload product photos, write descriptions, set prices, and organize your collections to showcase your unique style.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Receive Orders</StepTitle>
              <StepDescription>
                As customers discover and purchase your designs, you'll receive order notifications. Review order details and prepare items for shipping according to our seller guidelines.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Ship Products</StepTitle>
              <StepDescription>
                Package orders securely and ship them using our integrated shipping partners. Update tracking information to keep customers informed about their purchase status.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>5</StepNumber>
            <StepContent>
              <StepTitle>Get Paid</StepTitle>
              <StepDescription>
                Receive payments directly to your account based on our payment schedule. Track your earnings, analyze sales performance, and grow your business on our platform.
              </StepDescription>
            </StepContent>
          </Step>
        </StepsContainer>
      </HowItWorksSection>
      
      <TestimonialsSection>
        <SectionTitle style={{ color: 'white' }}>Success Stories</SectionTitle>
        <TestimonialsContainer>
          <TestimonialGrid>
            <TestimonialCard>
              <QuoteIcon>"</QuoteIcon>
              <TestimonialText>
                Joining Kimelia Luxe transformed my small tailoring business into an international brand. The platform's exposure helped me connect with clients I never would have reached otherwise.
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorImage>
                  <img src="/placeholder.svg?height=50&width=50" alt="Amara Diallo" />
                </AuthorImage>
                <AuthorInfo>
                  <AuthorName>Amara Diallo</AuthorName>
                  <AuthorRole>Fashion Designer, Dakar</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <QuoteIcon>"</QuoteIcon>
              <TestimonialText>
                The seller tools and analytics provided by Kimelia Luxe helped me understand what my customers want. My sales have increased by 300% since I joined the platform last year.
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorImage>
                  <img src="/placeholder.svg?height=50&width=50" alt="David Okafor" />
                </AuthorImage>
                <AuthorInfo>
                  <AuthorName>David Okafor</AuthorName>
                  <AuthorRole>Menswear Designer, Lagos</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <QuoteIcon>"</QuoteIcon>
              <TestimonialText>
                As a new designer, I was struggling to find my audience. Kimelia Luxe not only provided me with customers but also with a community of mentors who helped me refine my craft.
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorImage>
                  <img src="/placeholder.svg?height=50&width=50" alt="Sarah Kimani" />
                </AuthorImage>
                <AuthorInfo>
                  <AuthorName>Sarah Kimani</AuthorName>
                  <AuthorRole>Accessories Designer, Nairobi</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialGrid>
          
          <CTABOX>
            <CTATitle>Ready to Grow Your Fashion Business?</CTATitle>
            <CTAText>
              Join thousands of successful designers and artisans who have expanded their reach and increased their sales on Kimelia Luxe.
            </CTAText>
            <PrimaryButton to="/seller/apply">
              Apply Now <FiArrowRight />
            </PrimaryButton>
          </CTABOX>
        </TestimonialsContainer>
      </TestimonialsSection>
      
      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQContainer>
          <FAQItem>
            <FAQQuestion>What are the requirements to become a seller?</FAQQuestion>
            <FAQAnswer>
              To become a seller on Kimelia Luxe, you need to be a fashion designer, tailor, or brand with original designs. We look for quality craftsmanship, unique style, and professionalism. You'll need to provide examples of your work, business information, and agree to our seller terms.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>How much does it cost to sell on Kimelia Luxe?</FAQQuestion>
            <FAQAnswer>
              There is no upfront cost to join as a seller. We operate on a commission-based model, taking a percentage of each sale. Our standard commission rate is 15%, which is competitive compared to other fashion marketplaces. Volume sellers may qualify for lower rates.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>How long does the application process take?</FAQQuestion>
            <FAQAnswer>
              The application review process typically takes 5-7 business days. Our curation team carefully reviews each application to ensure all sellers meet our quality standards. You'll receive an email notification once your application has been reviewed.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>How do I get paid for my sales?</FAQQuestion>
            <FAQAnswer>
              Payments are processed every two weeks for all completed orders. We support multiple payment methods including bank transfers, mobile money, and PayPal. Funds are released after the customer's satisfaction period (typically 7 days after delivery) has passed.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>Who handles shipping and returns?</FAQQuestion>
            <FAQAnswer>
              Sellers are responsible for shipping products to customers, but we provide integrated shipping solutions with discounted rates from our partners. For returns, we have a standardized policy that protects both sellers and buyers. Our customer service team helps mediate any issues.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>Can I sell internationally?</FAQQuestion>
            <FAQAnswer>
              Yes! Kimelia Luxe is a global marketplace, and you can sell to customers worldwide. You can specify which countries you ship to in your seller settings. We provide translation services for product listings to help you reach customers in different regions.
            </FAQAnswer>
          </FAQItem>
        </FAQContainer>
      </FAQSection>
    </PageContainer>
  );
};

export default BecomeSellerPage;
