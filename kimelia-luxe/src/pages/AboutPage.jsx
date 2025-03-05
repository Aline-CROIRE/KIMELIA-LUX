import React from 'react';
import styled from 'styled-components';
import { FiAward, FiGlobe, FiUsers, FiArrowRight, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Styled Components
const AboutContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  position: relative;
  padding: 120px 0;
  text-align: center;
  background: linear-gradient(rgba(5, 5, 5, 0.8), rgba(5, 5, 5, 0.8)), url('/images/about-hero.jpg');
  background-size: cover;
  background-position: center;
  color: white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(5, 5, 5, 0.7) 100%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

const StorySection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #FFFDD0 0%, #F5F3C2 100%);
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StoryContent = styled.div``;

const ImageContainer = styled.div`
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
`;

const SmallImage = styled.div`
  position: absolute;
  bottom: -30px;
  left: -30px;
  width: 180px;
  height: 180px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 4px solid white;
  box-shadow: var(--shadow-md);
`;

const MissionSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, var(--luxury-black) 0%, var(--luxury-light) 100%);
  color: white;
`;

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MissionCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: var(--radius-round);
  background: var(--gold-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const TeamSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #F5F3C2 0%, #FFFFFF 100%);
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled(motion.div)`
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
  }
`;

const TeamImage = styled.div`
  height: 300px;
  overflow: hidden;
`;

const TeamInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const TechSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 100%);
  color: var(--luxury-black);
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TechCard = styled.div`
  background: white;
  border-radius: var(--radius-lg);
  padding: 30px;
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FutureSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, var(--luxury-black) 0%, var(--accent-burgundy) 50%, var(--gold-dark) 100%);
  color: white;
`;

const FutureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FutureList = styled.ul`
  list-style: none;
`;

const FutureItem = styled.li`
  display: flex;
  margin-bottom: 30px;
`;

const FutureIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: var(--radius-round);
  background: var(--gold-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  flex-shrink: 0;
`;

const FutureContent = styled.div``;

const CTASection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%);
  color: white;
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 15px 30px;
  border-radius: var(--radius-md);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const PrimaryButton = styled(Button)`
  background: var(--luxury-black);
  color: white;

  &:hover {
    background: var(--luxury-light);
    transform: translateY(-3px);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: white;
  border: 2px solid white;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const SectionTitle = styled.h2`
  position: relative;
  display: inline-block;
  margin-bottom: 50px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 100px;
    height: 3px;
    background: var(--gold-primary);
  }
`;

const CenteredSectionTitle = styled(SectionTitle)`
  text-align: center;
  
  &::after {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gradient-gold"
            style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
          >
            About Kimelia Luxe
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
          >
            Revolutionizing fashion with AI, 3D modeling, and e-commerce. Discover the story behind our innovative platform.
          </motion.p>
        </HeroContent>
      </HeroSection>

      {/* Our Story Section */}
      <StorySection>
        <div className="container">
          <StoryGrid>
            <StoryContent>
              <SectionTitle>Our Story</SectionTitle>
              <p>
                Kimelia Luxe was founded by Aline NIYONIZERA with a vision to bridge the gap between technology and fashion design. 
                Recognizing the challenges faced by designers and consumers in the fashion industry, Aline set out to create a platform 
                that would revolutionize how fashion is created, visualized, and purchased.
              </p>
              <p>
                The journey began with a simple idea: what if we could use technology to make fashion more accessible, 
                sustainable, and personalized? This question led to the development of our innovative design tools and 
                e-commerce marketplace that now serves designers and fashion enthusiasts worldwide.
              </p>
              <p>
                Today, Kimelia Luxe stands at the forefront of fashion technology, combining AI, 3D modeling, and e-commerce 
                to create a seamless experience for everyone involved in the fashion ecosystem.
              </p>
              <PrimaryButton href="/about/team" style={{ marginTop: '20px' }}>
                Meet Our Team <FiArrowRight style={{ marginLeft: '10px', display: 'inline' }} />
              </PrimaryButton>
            </StoryContent>
            <ImageContainer>
              <img src="/images/founder.jpg" alt="Founder" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
              <SmallImage>
                <img src="/images/design-process.jpg" alt="Design Process" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </SmallImage>
            </ImageContainer>
          </StoryGrid>
        </div>
      </StorySection>

      {/* Mission & Vision Section */}
      <MissionSection>
        <div className="container">
          <CenteredSectionTitle style={{ color: 'white' }}>Our Mission & Vision</CenteredSectionTitle>
          <MissionGrid>
            <MissionCard>
              <IconContainer>
                <FiAward size={30} color="#050505" />
              </IconContainer>
              <h3>Our Mission</h3>
              <p>
                To empower designers and fashion enthusiasts with innovative technology that simplifies the 
                design process, enhances creativity, and creates a direct connection between creators and consumers. 
                We aim to make fashion more accessible, sustainable, and personalized through our platform.
              </p>
            </MissionCard>
            <MissionCard>
              <IconContainer>
                <FiGlobe size={30} color="#050505" />
              </IconContainer>
              <h3>Our Vision</h3>
              <p>
                To become the global leader in fashion technology, revolutionizing how fashion is designed, 
                produced, and consumed. We envision a future where technology enhances the creative process, 
                reduces waste in the fashion industry, and allows for truly personalized fashion experiences.
              </p>
            </MissionCard>
          </MissionGrid>
        </div>
      </MissionSection>

      {/* Team Section */}
      <TeamSection>
        <div className="container">
          <CenteredSectionTitle>Meet Our Team</CenteredSectionTitle>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            The talented individuals behind Kimelia Luxe who are passionate about fashion and technology.
          </p>
          <TeamGrid>
            <TeamCard
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TeamImage>
                <img src="/images/aline.jpg" alt="Aline NIYONIZERA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </TeamImage>
              <TeamInfo>
                <h3>Aline NIYONIZERA</h3>
                <p style={{ color: 'var(--gold-primary)', fontWeight: '600', marginBottom: '10px' }}>Founder & CEO</p>
                <p>
                  Fashion designer and tech enthusiast with a vision to revolutionize the fashion industry through technology.
                </p>
              </TeamInfo>
            </TeamCard>
            <TeamCard
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TeamImage>
                <img src="/images/jean.jpg" alt="Jean Mutabazi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </TeamImage>
              <TeamInfo>
                <h3>Jean Mutabazi</h3>
                <p style={{ color: 'var(--gold-primary)', fontWeight: '600', marginBottom: '10px' }}>CTO</p>
                <p>
                  Tech expert with extensive experience in AI and 3D modeling, leading our technology development.
                </p>
              </TeamInfo>
            </TeamCard>
            <TeamCard
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TeamImage>
                <img src="/images/marie.jpg" alt="Marie Uwase" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </TeamImage>
              <TeamInfo>
                <h3>Marie Uwase</h3>
                <p style={{ color: 'var(--gold-primary)', fontWeight: '600', marginBottom: '10px' }}>Head of Design</p>
                <p>
                  Fashion industry veteran with a passion for combining traditional craftsmanship with modern technology.
                </p>
              </TeamInfo>
            </TeamCard>
          </TeamGrid>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <SecondaryButton href="/about/team" style={{ background: 'var(--gold-primary)', color: 'var(--luxury-black)', border: 'none' }}>
              View Full Team <FiArrowRight style={{ marginLeft: '10px', display: 'inline' }} />
            </SecondaryButton>
          </div>
        </div>
      </TeamSection>

      {/* Technology Section */}
      <TechSection>
        <div className="container">
          <CenteredSectionTitle style={{ color: 'var(--luxury-black)' }}>Our Technology</CenteredSectionTitle>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto', color: 'var(--luxury-black)' }}>
            Kimelia Luxe is built on cutting-edge technology that powers our design tools and e-commerce platform.
          </p>
          <TechGrid>
            <TechCard>
              <h3>Frontend: React.js</h3>
              <p>
                Our user interface is built with React.js, providing a responsive and interactive experience 
                with reusable components for consistent design.
              </p>
            </TechCard>
            <TechCard>
              <h3>Backend: Node.js</h3>
              <p>
                Our server-side logic is powered by Node.js, enabling fast and scalable API endpoints 
                for our design tools and e-commerce features.
              </p>
            </TechCard>
            <TechCard>
              <h3>Database: MongoDB</h3>
              <p>
                We use MongoDB, a NoSQL database, to store user data, product information, and design assets 
                with flexibility and performance.
              </p>
            </TechCard>
            <TechCard>
              <h3>AI: TensorFlow.js</h3>
              <p>
                Our AI-based outfit suggestions and virtual fitting room are powered by TensorFlow.js, 
                providing intelligent recommendations and accurate sizing.
              </p>
            </TechCard>
          </TechGrid>
        </div>
      </TechSection>

      {/* Future Plans Section */}
      <FutureSection>
        <div className="container">
          <FutureGrid>
            <div>
              <SectionTitle style={{ color: 'white' }}>Future Enhancements</SectionTitle>
              <FutureList>
                <FutureItem>
                  <FutureIconContainer>
                    <FiStar size={24} color="#050505" />
                  </FutureIconContainer>
                  <FutureContent>
                    <h3>Mobile App</h3>
                    <p>
                      iOS and Android applications for a personalized mobile experience, allowing users to design and shop on the go.
                    </p>
                  </FutureContent>
                </FutureItem>
                <FutureItem>
                  <FutureIconContainer>
                    <FiStar size={24} color="#050505" />
                  </FutureIconContainer>
                  <FutureContent>
                    <h3>AR Integration</h3>
                    <p>
                      Augmented Reality features to see how clothes fit in the real world, enhancing the virtual fitting room experience.
                    </p>
                  </FutureContent>
                </FutureItem>
                <FutureItem>
                  <FutureIconContainer>
                    <FiStar size={24} color="#050505" />
                  </FutureIconContainer>
                  <FutureContent>
                    <h3>Global Expansion</h3>
                    <p>
                      Plans to expand to other African countries and globally, bringing our innovative platform to fashion enthusiasts worldwide.
                    </p>
                  </FutureContent>
                </FutureItem>
              </FutureList>
            </div>
            <div>
              <img src="/images/future-vision.jpg" alt="Future Vision" style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} />
            </div>
          </FutureGrid>
        </div>
      </FutureSection>

      {/* CTA Section */}
      <CTASection>
        <div className="container">
          <CTAContent>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--luxury-black)' }}
            >
              Join the Fashion Revolution
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: '1.2rem', color: 'var(--luxury-black)' }}
            >
              Be part of the future of fashion with Kimelia Luxe. Sign up today to explore our design tools and marketplace.
            </motion.p>
            <ButtonGroup>
              <PrimaryButton href="/signup">Sign Up Now</PrimaryButton>
              <SecondaryButton href="/contact">Contact Us</SecondaryButton>
            </ButtonGroup>
          </CTAContent>
        </div>
      </CTASection>
    </AboutContainer>
  );
};

export default AboutPage;
