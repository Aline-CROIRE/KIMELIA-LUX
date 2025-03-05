import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowRight, FiZap } from 'react-icons/fi';

const AiSuggestionsPage = () => {
  return (
    <PageContainer>
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>AI Outfit Suggestions</h1>
            <p>
              Get personalized outfit recommendations powered by artificial intelligence.
            </p>
          </HeroContent>
        </div>
      </HeroSection>

      <ToolSection>
        <div className="container">
          <ToolGrid>
            <ToolImage>
              <img src="/images/ai-suggestions-detail.jpg" alt="AI Outfit Suggestions" />
            </ToolImage>
            <ToolContent>
              <ToolIcon>
                <FiZap />
              </ToolIcon>
              <h2>Smart Fashion Recommendations</h2>
              <p>
                Our AI suggests outfit combinations based on your preferences, body type, occasion, and current fashion trends.
                The more you use it, the better it understands your style.
              </p>
              <FeatureList>
                <li>
                  <FiArrowRight /> Personalized recommendations
                </li>
                <li>
                  <FiArrowRight /> Trend-based suggestions
                </li>
                <li>
                  <FiArrowRight /> Occasion-specific outfits
                </li>
                <li>
                  <FiArrowRight /> Style evolution tracking
                </li>
              </FeatureList>
              <ButtonGroup>
                <Link to="/design-tools/ai-suggestions/demo" className="btn btn-gold">
                  Try Demo
                </Link>
                <Link to="/signup" className="btn btn-outline">
                  Sign Up for Full Access
                </Link>
              </ButtonGroup>
            </ToolContent>
          </ToolGrid>
        </div>
      </ToolSection>

      <HowItWorksSection>
        <div className="container">
          <SectionTitle>
            <h2>How It Works</h2>
            <p>
              Our AI-powered outfit suggestion system uses advanced algorithms to provide personalized fashion recommendations.
            </p>
          </SectionTitle>
          <StepsGrid>
            <StepCard>
              <StepNumber>1</StepNumber>
              <h3>Create Your Profile</h3>
              <p>
                Tell us about your style preferences, body type, colors you love, and occasions you dress for.
              </p>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <h3>Upload Your Wardrobe</h3>
              <p>
                Add items from your existing wardrobe or browse our marketplace to create your digital closet.
              </p>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <h3>Get Recommendations</h3>
              <p>
                Our AI analyzes your profile and wardrobe to suggest outfit combinations that match your style.
              </p>
            </StepCard>
            <StepCard>
              <StepNumber>4</StepNumber>
              <h3>Provide Feedback</h3>
              <p>
                Rate the suggestions to help our AI learn and improve its recommendations over time.
              </p>
            </StepCard>
          </StepsGrid>
        </div>
      </HowItWorksSection>

      <TestimonialsSection>
        <div className="container">
          <SectionTitle>
            <h2>What Our Users Say</h2>
            <p>
              Hear from fashion enthusiasts who have transformed their style with our AI outfit suggestions.
            </p>
          </SectionTitle>
          <TestimonialsGrid>
            <TestimonialCard>
              <TestimonialContent>
                "The AI outfit suggestions have completely transformed my wardrobe. I'm getting compliments on my style like never before!"
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/images/testimonials/user1.jpg" alt="Sarah J." />
                <div>
                  <h4>Sarah J.</h4>
                  <p>Fashion Blogger</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialContent>
                "As someone who struggles with fashion choices, this tool has been a game-changer. It's like having a personal stylist in my pocket."
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/images/testimonials/user2.jpg" alt="Michael T." />
                <div>
                  <h4>Michael T.</h4>
                  <p>Business Professional</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialContent>
                "I love how the AI learns my style over time. The recommendations get better with each use, and I've discovered combinations I never would have thought of."
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/images/testimonials/user3.jpg" alt="Priya K." />
                <div>
                  <h4>Priya K.</h4>
                  <p>Student</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </div>
      </TestimonialsSection>

      <CTASection>
        <div className="container">
          <CTAContent>
            <h2>Elevate Your Style with AI</h2>
            <p>
              Sign up today and discover outfit combinations that express your unique style.
            </p>
            <ButtonGroup>
              <Link to="/signup" className="btn btn-gold">
                Create Free Account
              </Link>
              <Link to="/pricing" className="btn btn-outline">
                View Pricing
              </Link>
            </ButtonGroup>
          </CTAContent>
        </div>
      </CTASection>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  background: linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.7)), url('/images/ai-suggestions-hero.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
  }
`;

const ToolSection = styled.section`
  padding: 5rem 0;
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ToolContent = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const ToolIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    color: var(--gold-primary);
    font-size: 1.8rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    
    svg {
      color: var(--gold-primary);
      margin-right: 0.75rem;
      flex-shrink: 0;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  a {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`;

const ToolImage = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const HowItWorksSection = styled.section`
  padding: 5rem 0;
  background-color: #f9f9f9;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    max-width: 600px;
    margin: 0 auto;
    color: var(--text-secondary);
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const StepCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const StepNumber = styled.div`
  position: absolute;
  top: -20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
`;

const TestimonialsSection = styled.section`
  padding: 5rem 0;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const TestimonialContent = styled.p`
  font-style: italic;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  position: relative;
  
  &::before {
    content: '"';
    font-size: 4rem;
    color: rgba(212, 175, 55, 0.1);
    position: absolute;
    top: -20px;
    left: -10px;
    z-index: -1;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  
  h4 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
`;

const CTASection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(to right, var(--luxury-black), #1a1a1a);
  color: white;
`;

const CTAContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    opacity: 0.9;
  }

  .btn-outline {
    border-color: white;
    color: white;
  }

  .btn-outline:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default AiSuggestionsPage;