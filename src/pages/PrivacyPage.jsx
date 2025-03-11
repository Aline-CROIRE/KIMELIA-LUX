import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShield, FiLock, FiUser, FiDatabase, FiGlobe, FiCreditCard, FiMail } from 'react-icons/fi';

const PageContainer = styled.div`
  background: white;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const HeaderSection = styled.section`
  background: linear-gradient(to right, #000, #333);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: #D4AF37;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    color: #000;
  }
`;

const LastUpdated = styled.p`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 2rem;
`;

const PolicySection = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #000;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: #D4AF37;
  }
`;

const SectionContent = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.8);
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  a {
    color: #D4AF37;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubSection = styled.div`
  margin-bottom: 2rem;
`;

const SubSectionTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #000;
`;

const ContactSection = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 3rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #000;
`;

const ContactInfo = styled.p`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #D4AF37;
  }
`;

const PrivacyPolicyPage = () => {
  return (
    <PageContainer>
      <HeaderSection>
        <HeaderContent>
          <PageTitle>Privacy Policy</PageTitle>
          <PageDescription>
            At Kimelia Luxe, we value your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data.
          </PageDescription>
        </HeaderContent>
      </HeaderSection>
      
      <ContentSection>
        <BackLink to="/">
          <FiArrowLeft /> Back to Home
        </BackLink>
        
        <LastUpdated>Last Updated: March 8, 2025</LastUpdated>
        
        <PolicySection>
          <SectionTitle>
            <FiShield /> Introduction
          </SectionTitle>
          <SectionContent>
            <p>
              Welcome to Kimelia Luxe's Privacy Policy. This policy describes how Kimelia Luxe ("we," "our," or "us") 
              collects, uses, and shares your personal information when you visit our website, use our design tools, 
              shop in our marketplace, or otherwise interact with our services.
            </p>
            <p>
              By using Kimelia Luxe, you agree to the collection and use of information in accordance with this policy. 
              We take your privacy seriously and are committed to protecting your personal data.
            </p>
          </SectionContent>
        </PolicySection>
        
        <PolicySection>
          <SectionTitle>
            <FiUser /> Information We Collect
          </SectionTitle>
          <SectionContent>
            <SubSection>
              <SubSectionTitle>Personal Information</SubSectionTitle>
              <p>We may collect the following types of personal information:</p>
              <ul>
                <li>Contact information (name, email address, phone number, shipping address)</li>
                <li>Account credentials (username, password)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Profile information (profile picture, preferences, saved designs)</li>
                <li>Body measurements (when using the Virtual Fitting Room)</li>
                <li>For designers and sellers: professional information, portfolio, and business details</li>
              </ul>
            </SubSection>
            
            <SubSection>
              <SubSectionTitle>Automatically Collected Information</SubSectionTitle>
              <p>When you visit our website or use our services, we automatically collect certain information, including:</p>
              <ul>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, clicks, interactions with design tools)</li>
                <li>Location information (country, city)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </SubSection>
          </SectionContent>
        </PolicySection>
        
        <PolicySection>
          <SectionTitle>
            <FiDatabase /> How We Use Your Information
          </SectionTitle>
          <SectionContent>
            <p>We use your personal information for the following purposes:</p>
            <ul>
              <li>To provide and maintain our services, including processing transactions and orders</li>
              <li>To personalize your experience and offer tailored recommendations</li>
              <li>To improve our website, design tools, and marketplace</li>
              <li>To communicate with you about your account, orders, or inquiries</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To detect and prevent fraud and unauthorized access</li>
              <li>To comply with legal obligations</li>
              <li>For designers and sellers: to facilitate connections with potential customers</li>
            </ul>
          </SectionContent>
        </PolicySection>
        
        <PolicySection>
          <SectionTitle>
            <FiGlobe /> Information Sharing and Disclosure
          </SectionTitle>
          <SectionContent>
            <p>We may share your personal information with:</p>
            <ul>
              <li>Service providers who perform services on our behalf (payment processors, shipping companies, cloud storage providers)</li>
              <li>Designers and sellers on our marketplace (only information necessary to fulfill orders)</li>
              <li>Business partners with your consent</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. Any third-party service providers we work with 
              are bound by contractual obligations to keep personal information confidential and use it only for the 
              purposes for which we disclose it to them.
            </p>
          </SectionContent>
        </PolicySection>
        
        <PolicySection>
          <SectionTitle>
            <FiLock /> Data Security
          </SectionTitle>
          <SectionContent>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. These measures include:
            </p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Secure socket layer (SSL) technology</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication procedures</li>
              <li>Secure data storage practices</li>
            </ul>
            <p>
              While we strive to protect your personal information, no method of transmission over the Internet or electronic 
              storage is 100% secure. We cannot guarantee absolute security but are committed to implementing and maintaining 
              reasonable security practices.
            </p>
          </SectionContent>
        </PolicySection>
        
        <PolicySection>
          <SectionTitle>
            <FiCreditCard /> Your Rights and Choices
          </SectionTitle>
          <SectionContent>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li>Access and receive a copy of your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Data portability (receiving your data in a structured, machine-readable format)</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below. 
              We will respond to your request within a reasonable timeframe and in accordance with applicable laws.
            </p>
          </SectionContent>
        </PolicySection>
        
        <PolicySection>
          <SectionTitle>
            <FiMail /> Cookies and Tracking Technologies
          </SectionTitle>
          <SectionContent>
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing activities and 
              to improve your experience on our website. Cookies are small text files that are stored on your device when 
              you visit a website.
            </p>
            <p>We use the following types of cookies:</p>
            <ul>
              <li>Essential cookies: necessary for the website to function properly</li>
              <li>Functional cookies: remember your preferences and settings</li>
              <li>Analytical cookies: help us understand how visitors interact with our website</li>
              <li>Marketing cookies: track your browsing habits to deliver targeted advertising</li>
            </ul>
            <p>
              You can manage your cookie preferences through your browser settings. Most browsers allow you to block or 
              delete cookies. However, if you block essential cookies, you may not be able to access all features of our website.
            </p>
          </SectionContent>
        </PolicySection>
        
        <ContactSection>
          <ContactTitle>Contact Us</ContactTitle>
          <SectionContent>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us at:
            </p>
            <ContactInfo>
              <FiMail /> Email: privacy@kimelialuxe.com
            </ContactInfo>
            <ContactInfo>
              <FiGlobe /> Address: Kigali, Rwanda
            </ContactInfo>
            <p>
              We will respond to your inquiry as soon as possible and within the timeframe required by applicable law.
            </p>
          </SectionContent>
        </ContactSection>
      </ContentSection>
    </PageContainer>
  );
};

export default PrivacyPolicyPage;
