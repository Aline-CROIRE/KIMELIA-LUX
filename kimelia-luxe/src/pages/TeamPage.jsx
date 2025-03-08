// src/pages/TeamPage.jsx
import React from "react";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import kim from '../assets/images/kim2.png';
import t1 from '../assets/images/dia.jpg';
import t2 from '../assets/images/pas.png';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
`;

const SectionContainer = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const StoryText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 10px;
  text-align: center;
`;

const Button = styled(Link)`
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
    color: ${props => props.outline ? 'white' : '#d4af37'};
  }

  svg {
    margin-right: 8px;
  }
`;

const TeamGrid = styled.div`
  max-width: 1200px;
  margin: 40px auto 0;
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

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #555;
  text-decoration: none;
  margin-bottom: 30px;

  svg {
    margin-right: 8px;
  }
`;

const TeamPage = () => {
  return (
    <PageContainer>
      <SectionContainer>
        <BackButton to="/about">
          <FaArrowLeft /> Back to About
        </BackButton>
        <SectionTitle>Our Talented Team</SectionTitle>
        <StoryText>
          Meet the passionate individuals driving Kimelia Luxe forward with their expertise and dedication.
        </StoryText>
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
            <TeamImage src={t1} alt="Marie Uwase" />
            <TeamInfo>
              <TeamName>Diane Uwase</TeamName>
              <TeamRole>Head of Design</TeamRole>
              <TeamBio>
                Fashion industry veteran with a passion for combining traditional craftsmanship with modern design.
              </TeamBio>
            </TeamInfo>
          </TeamCard>
        </TeamGrid>
      </SectionContainer>
    </PageContainer>
  );
};

export default TeamPage;