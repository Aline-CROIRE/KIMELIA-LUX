// src/pages/AboutPage.jsx
import React from "react";
import styled from "styled-components";
import { FaGem, FaGlobe, FaStar, FaShippingFast, FaHeadphonesAlt, FaLock, FaAward, FaArrowRight, FaReact, FaNodeJs, FaDatabase, FaBrain } from "react-icons/fa";
import banner from '../assets/images/abanner.webp';
import craft from '../assets/images/craft.webp';
import kim from '../assets/images/kim2.png';
import future from '../assets/images/future.webp';
import t1 from '../assets/images/dia.jpg';
import t2 from '../assets/images/pas.png';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  padding: 150px 20px;
  overflow: hidden;
  color: white;
  text-align: center;

  /* Option 1: Banner as the primary background (before) */
  background-image: url(${banner}); /* Set banner as the primary background */
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(6, 6, 12, 0.7), rgba(22, 33, 62, 0.7)); /* Add a darkening gradient overlay */
    z-index: -1;
    opacity: 0.5; /* Adjusted opacity to help text stand out */
  }

`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 20px;
  background: linear-gradient(to right, #d4af37, #f5e7a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  letter-spacing: 1.5px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.8rem;
  max-width: 800px;
  margin: 0 auto;
  color: #f0f0f0;
  line-height: 1.9;
  font-weight: 500;
  text-shadow: 2px 2px 4px #000000; /* Add text shadow for better visibility */
`;

// Story Section
const SectionContainer = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const StoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
`;

const StoryText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 10px;
`;

const StoryImageContainer = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SmallImage = styled.img`
  position: absolute;
  bottom: -24px;
  left: -24px;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
  border: 4px solid white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: ${props => props.outline ? 'transparent' : '#d4af37'};
  color: ${props => props.outline ? '#d4af37' : 'white'};
  border: 2px solid #d4af37;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background: ${props => props.outline ? '#d4af37' : 'transparent'};
    color: ${props => props.outline ? '#white' : '#d4af37'};
  }

  svg {
    margin-left: 8px;
  }
`;

// Mission & Vision Section
const MissionSection = styled.section`
  padding: 80px 20px;
  background-color: #f9f9f9;
`;

const MissionGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MissionCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconContainer = styled.div`
  width: fit-content;
  padding: 12px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  margin-bottom: 20px;

  svg {
    font-size: 24px;
    color: #d4af37;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
`;


// Brand Values Section
const ValuesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  padding: 80px 20px;
  background: #fff;
  max-width: 1200px;
  margin: 0 auto;
`;

const ValueCard = styled.div`
  width: 300px;
  text-align: center;
  padding: 30px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  border-top: 4px solid ${props => props.borderColor || '#d4af37'};

  &:hover {
    transform: translateY(-5px);
  }
`;

const ValueIcon = styled.div`
  font-size: 50px;
  color: ${props => props.iconColor || '#d4af37'};
  margin-bottom: 20px;
`;

const ValueTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
`;

const ValueText = styled.p`
  font-size: 1.2rem;
  color: #777;
  line-height: 1.6;
`;

// Team Section
const TeamSection = styled.section`
  padding: 80px 20px;
  background-color: #f9f9f9;
`;

const TeamHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px auto;
`;

const TeamGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TeamCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const TeamImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const TeamInfo = styled.div`
  padding: 24px;
`;

const TeamName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`;

const TeamRole = styled.p`
  font-size: 1rem;
  color: #d4af37;
  font-weight: 500;
  margin-bottom: 15px;
`;

const TeamBio = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

// Future Plans Section
const FutureSection = styled.section`
  padding: 80px 20px;
`;

const FutureGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const FutureContent = styled.div`
  order: 2;

  @media (min-width: 992px) {
    order: 1;
  }
`;

const FutureImage = styled.div`
  order: 1;

  @media (min-width: 992px) {
    order: 2;
  }

  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
`;

const FeatureIcon = styled.div`
  margin-right: 16px;
  margin-top: 4px;
  padding: 8px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);

  svg {
    color: #d4af37;
    font-size: 18px;
  }
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const FeatureText = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
`;

// CTA Section
const CTASection = styled.section`
  padding: 80px 20px;
  background: linear-gradient(to right, #1a1a2e, #16213e);
  color: white;
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(to right, #d4af37, #f5e7a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  letter-spacing: 1.5px;
`;

const CTAText = styled.p`
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto 30px auto;
  opacity: 0.9;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;

  @media (min-width: 576px) {
    flex-direction: row;
  }
`;

const OutlineButton = styled(Button)`
  background: transparent;
  color: white;
  border-color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

// Testimonials Section
const TestimonialContainer = styled.section`
  padding: 90px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  text-align: center;
`;

const TestimonialTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 40px;
  font-weight: 600;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #d4af37;
  }
`;

const TestimonialGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  width: 350px;
  padding: 30px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  position: relative;

  &:before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 60px;
    color: rgba(212, 175, 55, 0.2);
    font-family: Georgia, serif;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const CustomerName = styled.p`
  font-weight: bold;
  color: #333;
  margin-top: 15px;
  font-size: 1.2rem;
`;

const CustomerTitle = styled.p`
  font-style: italic;
  color: #777;
  font-size: 1rem;
`;

const TestimonialText = styled.p`
  font-size: 1.15rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
`;

// Additional Info Section
const AdditionalInfoContainer = styled.section`
  padding: 80px 20px;
  background: #fff;
  text-align: center;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const InfoCard = styled.div`
  padding: 30px;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: left;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const InfoTitle = styled.h4`
  font-size: 1.7rem;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: #d4af37;
  }
`;

const InfoText = styled.p`
  font-size: 1.15rem;
  color: #666;
  line-height: 1.6;
`;
const OpenButton = styled.button`
padding: 14px;
border-radius: 5px;
border: none;
background: #D4AF37;
color: white;
font-size: 18px;
cursor: pointer;
transition: background 0.2s ease-in-out;

&:hover {
background: #C09A30;
}

&:active {
transform: translateY(1px);
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}
`
const AboutPage = ({openSignupModal}) => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Step into the World of Kimelia Luxe</HeroTitle>
          <HeroSubtitle>Where Rwandan artistry meets timeless elegance. Discover ethically crafted designs, celebrating local heritage with global appeal.</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* Our Story Section */}
      <SectionContainer>
        <StoryGrid>
          <StoryContent>
            <SectionTitle>Our Story</SectionTitle>
            <StoryText>
              Kimelia Luxe was founded by Aline NIYONIZERA with a vision to bridge the gap between creativity and accessibility
              in Rwandan fashion design. Recognizing the challenges faced by designers and consumers in the industry,
              Aline set out to create a platform that would revolutionize how fashion is created, visualized, and
              purchased.
            </StoryText>
            <StoryText>
              The journey began with a simple idea: what if we could make fashion more accessible,
              sustainable, and personalized? This question led to the development of our innovative design tools and
              e-commerce marketplace that now serves designers and fashion enthusiasts in Rwanda.
            </StoryText>
            <StoryText>
              Today, Kimelia Luxe stands at the forefront of Rwandan fashion, combining modern design with
              e-commerce to create a seamless experience for everyone involved in the fashion ecosystem.
            </StoryText>
            <Button href="/about/team">
              Meet Our Team <FaArrowRight />
            </Button>
          </StoryContent>
          <StoryImageContainer>
            <MainImage src={kim} alt="Founder Portrait" />
            <SmallImage src={craft} alt="Fashion Design" />
          </StoryImageContainer>
        </StoryGrid>
      </SectionContainer>

      {/* Mission & Vision Section */}
      <MissionSection>
        <MissionGrid>
          <MissionCard>
            <IconContainer>
              <FaAward />
            </IconContainer>
            <CardTitle>Our Mission</CardTitle>
            <CardText>
              To empower Rwandan designers and fashion enthusiasts with innovative resources that simplifies the design
              process, enhances creativity, and creates a direct connection between creators and consumers. We aim to
              make fashion more accessible, sustainable, and personalized through our platform.
            </CardText>
          </MissionCard>
          <MissionCard>
            <IconContainer>
              <FaGlobe />
            </IconContainer>
            <CardTitle>Our Vision</CardTitle>
            <CardText>
              To become the leading platform in Rwandan fashion, revolutionizing how fashion is designed, produced,
              and consumed. We envision a future where innovation enhances the creative process, reduces waste in the
              fashion industry, and allows for truly personalized fashion experiences.
            </CardText>
          </MissionCard>
        </MissionGrid>
      </MissionSection>


      {/* Brand Values Section
      <ValuesContainer>
        <ValueCard borderColor="#E6B800" >
          <ValueIcon iconColor="#E6B800"><FaGem /></ValueIcon>
          <ValueTitle>Luxury & Quality</ValueTitle>
          <ValueText>
            We curate only the finest designs with exceptional craftsmanship,
            ensuring every piece is a timeless investment.
          </ValueText>
        </ValueCard>

        <ValueCard borderColor="#2E7D32">
          <ValueIcon iconColor="#2E7D32"><FaGlobe /></ValueIcon>
          <ValueTitle>Sustainability</ValueTitle>
          <ValueText>
            Eco-conscious fashion that respects both people and the planet. We
            partner with designers committed to ethical practices.
          </ValueText>
        </ValueCard>

        <ValueCard borderColor="#C6A700">
          <ValueIcon iconColor="#C6A700"><FaStar /></ValueIcon>
          <ValueTitle>Exclusivity</ValueTitle>
          <ValueText>
            Unique, limited-edition pieces that elevate your personal style
            and set you apart from the crowd.
          </ValueText>
        </ValueCard>
      </ValuesContainer> */}

{/* Brand Values Section */}
<ValuesContainer>
        <ValueCard>
          <ValueIcon>💎</ValueIcon>
          <ValueTitle>Luxury & Quality</ValueTitle>
          <ValueText>
            We curate only the finest designs with exceptional craftsmanship.
          </ValueText>
        </ValueCard>

        <ValueCard>
          <ValueIcon>🌎</ValueIcon>
          <ValueTitle>Sustainability</ValueTitle>
          <ValueText>
            Eco-friendly fashion that respects both people and the planet.
          </ValueText>
        </ValueCard>

        <ValueCard>
          <ValueIcon>🌟</ValueIcon>
          <ValueTitle>Exclusivity</ValueTitle>
          <ValueText>
            Unique, limited-edition pieces that elevate your personal style.
          </ValueText>
        </ValueCard>
      </ValuesContainer>

      {/* Team Section */}
      <TeamSection>
        <TeamHeader>
          <SectionTitle>Meet Our Team</SectionTitle>
          <StoryText>
            The talented individuals behind Kimelia Luxe who are passionate about fashion and technology.
          </StoryText>
        </TeamHeader>
        <TeamGrid>
          <TeamCard>
            <TeamImage src={kim} alt="Aline NIYONIZERA" />
            <TeamInfo>
              <TeamName>Aline NIYONIZERA</TeamName>
              <TeamRole>Founder & CEO</TeamRole>
              <TeamBio>
                Fashion designer and tech enthusiast with a vision to revolutionize the fashion industry through
                technology.
              </TeamBio>
            </TeamInfo>
          </TeamCard>
          <TeamCard>
            <TeamImage src={t2} alt="Jean Mutabazi" />
            <TeamInfo>
              <TeamName>Pascal N</TeamName>
              <TeamRole>CTO</TeamRole>
              <TeamBio>
                Tech expert with extensive experience, leading our technology development.
              </TeamBio>
            </TeamInfo>
          </TeamCard>
          <TeamCard>
            <TeamImage src={t1}alt="Marie Uwase" />
            <TeamInfo>
              <TeamName>Diane Uwase</TeamName>
              <TeamRole>Head of Design</TeamRole>
              <TeamBio>
                Fashion industry veteran with a passion for combining traditional craftsmanship with modern design.
              </TeamBio>
            </TeamInfo>
          </TeamCard>
        </TeamGrid>
        <ButtonContainer>
          <Button href="/about/team">
            View Full Team <FaArrowRight />
          </Button>
        </ButtonContainer>
      </TeamSection>

      {/* Future Plans Section */}
  <FutureSection>
    <FutureGrid>
      <FutureContent>
        <SectionTitle>Future Enhancements</SectionTitle>
        <FeatureList>
          <FeatureItem>
            <FeatureIcon>
              <FaArrowRight />
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Mobile App</FeatureTitle>
              <FeatureText>
                iOS and Android applications for a personalized mobile experience, allowing users to design and
                shop on the go.
              </FeatureText>
            </FeatureContent>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>
              <FaArrowRight />
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>AR Integration</FeatureTitle>
              <FeatureText>
                Augmented Reality features to see how clothes fit in the real world, enhancing the virtual fitting
                room experience.
              </FeatureText>
            </FeatureContent>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>
              <FaArrowRight />
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Global Expansion</FeatureTitle>
              <FeatureText>
                Plans to expand to other African countries and globally, bringing our innovative platform to
                fashion enthusiasts worldwide.
              </FeatureText>
            </FeatureContent>
          </FeatureItem>
        </FeatureList>
      </FutureContent>
      <FutureImage>
        <img src={future} alt="Future Vision" />
      </FutureImage>
    </FutureGrid>
  </FutureSection>
      {/* Testimonials Section */}
      <TestimonialContainer>
        <TestimonialTitle>What Our Customers Say</TestimonialTitle>
        <TestimonialGrid>
          <TestimonialCard>
            <TestimonialText>"Kimelia Luxe transformed my wardrobe! The quality is unmatched and I love knowing the brands are ethically sourced."</TestimonialText>
            <CustomerName>— Sophia R.</CustomerName>
            <CustomerTitle>Fashion Blogger</CustomerTitle>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialText>"Finally, a marketplace that offers exclusive and stylish pieces I can't find anywhere else. The customer service is also outstanding!"</TestimonialText>
            <CustomerName>— Alex M.</CustomerName>
            <CustomerTitle>Entrepreneur</CustomerTitle>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialText>"Sustainable luxury is the future, and Kimelia Luxe is leading the way. I feel good about my purchases and look great wearing them!"</TestimonialText>
            <CustomerName>— Emily T.</CustomerName>
            <CustomerTitle>Sustainability Advocate</CustomerTitle>
          </TestimonialCard>
        </TestimonialGrid>
      </TestimonialContainer>

      {/* Additional Information Section */}
      <AdditionalInfoContainer>
        <SectionTitle>Why Choose Kimelia Luxe?</SectionTitle>
        <StoryText>We go beyond providing luxury fashion. We're committed to a seamless and enriching shopping experience.</StoryText>
        <InfoGrid>
          <InfoCard>
            <InfoTitle><FaShippingFast /> Delivery Across Rwanda</InfoTitle>
            <InfoText>Enjoy reliable delivery of your purchases anywhere in Rwanda, ensuring your luxury items arrive safely and on time.</InfoText>
          </InfoCard>
          <InfoCard>
            <InfoTitle><FaHeadphonesAlt /> Dedicated Customer Support</InfoTitle>
            <InfoText>Our expert support team is available to assist you with any queries or concerns, providing personalized assistance every step of the way.</InfoText>
          </InfoCard>
          <InfoCard>
            <InfoTitle><FaLock /> Secure Payments</InfoTitle>
            <InfoText>Shop with confidence knowing that your payment information is protected.</InfoText>
          </InfoCard>
        </InfoGrid>
      </AdditionalInfoContainer>

      {/* CTA Section */}
      <CTASection>
        <CTAContent>
          <CTATitle>Join the Fashion Revolution</CTATitle>
          <CTAText>
            Be part of the future of Rwandan fashion with Kimelia Luxe. Sign up today to explore our design tools and
            marketplace.
          </CTAText>
          <CTAButtons>
            <OpenButton onClick={openSignupModal}>
              Sign Up Now
            </OpenButton>
            <OutlineButton href="/contact">
              Contact Us
              </OutlineButton>

          </CTAButtons>
        </CTAContent>
      </CTASection>
    </PageContainer>
  );
};

export default AboutPage;