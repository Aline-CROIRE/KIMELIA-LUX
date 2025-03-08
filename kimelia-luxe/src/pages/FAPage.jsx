
"use client"
import { useState } from "react"
import styled from "styled-components"
import { FiPlus, FiMinus, FiSearch, FiChevronRight, FiShoppingBag, FiTruck, FiRefreshCw, FiTool, FiCreditCard, FiUser } from "react-icons/fi"
import { Link } from "react-router-dom"

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

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem 1rem 3rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.2rem;
`

const FAQContainer = styled.section`
  max-width: 1000px;
  margin: 4rem auto;
  padding: 0 2rem;
`

const FAQTabs = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

const FAQTab = styled.button`
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#D4AF37' : 'transparent'};
  color: ${props => props.active ? 'black' : 'rgba(0, 0, 0, 0.6)'};
  font-weight: ${props => props.active ? '600' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: black;
  }
`

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FAQItem = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
`

const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  color: black;
  
  svg {
    font-size: 1.2rem;
    color: ${props => props.isOpen ? '#D4AF37' : 'rgba(0, 0, 0, 0.5)'};
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`

const FAQAnswer = styled.div`
  padding: ${props => props.isOpen ? '0 1.5rem 1.5rem' : '0 1.5rem'};
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.7);
`

const ContactSection = styled.section`
  background: #f9f9f9;
  padding: 4rem 0;
  text-align: center;
`

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`

const ContactTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: black;
`

const ContactText = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 2rem;
  line-height: 1.6;
`

const ContactButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const ContactButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.primary ? 'black' : 'transparent'};
  color: ${props => props.primary ? 'white' : 'black'};
  border: 2px solid ${props => props.primary ? 'black' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary ? '#333' : 'rgba(0, 0, 0, 0.05)'};
  }
`

const PopularTopics = styled.section`
  max-width: 1000px;
  margin: 4rem auto;
  padding: 0 2rem;
`

const TopicsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: black;
  text-align: center;
`

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`

const TopicCard = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`

const TopicIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    color: #D4AF37;
    font-size: 1.8rem;
  }
`

const TopicTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: black;
`

const TopicDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.6;
  margin-bottom: 1rem;
`

const TopicLink = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #D4AF37;
  font-weight: 500;
  margin-top: auto;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`

// Mock data
const faqCategories = [
  "General", "Account", "Orders", "Shipping", "Returns", "Design Tools", "Payments"
];

const faqItems = {
  "General": [
    {
      question: "What is Kimelia Luxe?",
      answer: "Kimelia Luxe is a fashion platform that combines innovative design tools with an e-commerce marketplace. We provide tools for virtual fitting, 3D fashion sketching, AI outfit suggestions, and custom design editing, along with a marketplace featuring both ready-made and custom fashion items from talented designers and tailors."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of the website. You'll need to provide your email address, create a password, and fill in some basic information. Once you've completed the registration form, you'll receive a confirmation email to verify your account."
    },
    {
      question: "Is Kimelia Luxe available internationally?",
      answer: "Yes, Kimelia Luxe is available internationally. We ship to most countries worldwide, though shipping times and costs may vary depending on your location. Our design tools are accessible from anywhere with an internet connection."
    }
  ],
  "Account": [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Login' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
    },
    {
      question: "Can I have multiple shipping addresses?",
      answer: "Yes, you can save multiple shipping addresses in your account settings. When you're checking out, you'll be able to select from your saved addresses or add a new one."
    },
    {
      question: "How do I update my account information?",
      answer: "To update your account information, log in to your account and navigate to the 'Account Settings' or 'Profile' section. From there, you can edit your personal information, change your password, update your shipping addresses, and manage your payment methods."
    }
  ],
  "Orders": [
    {
      question: "How do I track my order?",
      answer: "Once your order has been shipped, you'll receive a shipping confirmation email with a tracking number. You can use this tracking number on the carrier's website to track your package. You can also view the status of your orders in the 'Order History' section of your account."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "You can modify or cancel your order within 24 hours of placing it, as long as it hasn't been shipped yet. To do so, contact our customer service team with your order number. After 24 hours or once the order has been shipped, modifications or cancellations may not be possible."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, Mobile Money (MoMo), and bank transfers. All payments are processed securely through our payment partners."
    }
  ],
  "Shipping": [],
  "Returns": [],
  "Design Tools": [],
  "Payments": []
};

const popularTopics = [
  {
    icon: "FiShoppingBag",
    title: "How to Place an Order",
    description: "Learn how to browse products, add items to your cart, and complete the checkout process.",
    link: "/support/how-to-place-order"
  },
  {
    icon: "FiTruck",
    title: "Shipping Information",
    description: "Find out about shipping methods, delivery times, and tracking your packages.",
    link: "/support/shipping"
  },
  {
    icon: "FiRefreshCw",
    title: "Returns & Exchanges",
    description: "Understand our return policy and how to initiate a return or exchange.",
    link: "/support/returns"
  },
  {
    icon: "FiTool",
    title: "Using Design Tools",
    description: "Get help with our virtual fitting room, 3D sketch tool, and other design features.",
    link: "/support/design-tools-help"
  },
  {
    icon: "FiCreditCard",
    title: "Payment Methods",
    description: "Learn about the payment options available and how to manage your payment information.",
    link: "/support/payment-methods"
  },
  {
    icon: "FiUser",
    title: "Account Management",
    description: "Find out how to update your profile, manage addresses, and view order history.",
    link: "/support/account-management"
  }
];

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  
  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const filteredFAQs = faqItems[activeCategory] || [];
  
  return (
    <PageWrapper>
      <HeroSection>
        <HeroContent>
          <h1>Frequently Asked Questions</h1>
          <p>
            Find answers to common questions about Kimelia Luxe, our design tools, marketplace, and more.
          </p>
          <SearchContainer>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search for answers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </HeroContent>
      </HeroSection>
      
      <FAQContainer>
        <FAQTabs>
          {faqCategories.map((category, index) => (
            <FAQTab 
              key={index} 
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </FAQTab>
          ))}
        </FAQTabs>
        
        <FAQList>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion 
                  isOpen={openItems[index]} 
                  onClick={() => toggleItem(index)}
                >
                  {faq.question}
                  {openItems[index] ? <FiMinus /> : <FiPlus />}
                </FAQQuestion>
                <FAQAnswer isOpen={openItems[index]}>
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))
          ) : (
            <p>No FAQs available for this category yet. Please check back soon or contact us for assistance.</p>
          )}
        </FAQList>
      </FAQContainer>
      
      <PopularTopics>
        <TopicsTitle>Popular Help Topics</TopicsTitle>
        <TopicsGrid>
          {popularTopics.map((topic, index) => (
            <TopicCard key={index} to={topic.link}>
              <TopicIcon>
                {topic.icon === "FiShoppingBag" && <FiShoppingBag />}
                {topic.icon === "FiTruck" && <FiTruck />}
                {topic.icon === "FiRefreshCw" && <FiRefreshCw />}
                {topic.icon === "FiTool" && <FiTool />}
                {topic.icon === "FiCreditCard" && <FiCreditCard />}
                {topic.icon === "FiUser" && <FiUser />}
              </TopicIcon>
              <TopicTitle>{topic.title}</TopicTitle>
              <TopicDescription>{topic.description}</TopicDescription>
              <TopicLink>
                Learn More <FiChevronRight />
              </TopicLink>
            </TopicCard>
          ))}
        </TopicsGrid>
      </PopularTopics>
      
      <ContactSection>
        <ContactContainer>
          <ContactTitle>Still Have Questions?</ContactTitle>
          <ContactText>
            Our customer support team is here to help. Reach out to us through any of the following channels.
          </ContactText>
          <ContactButtons>
            <ContactButton to="/support/contact" primary>
              Contact Us
            </ContactButton>
            <ContactButton to="/support/live-chat">
              Live Chat
            </ContactButton>
            <ContactButton to="mailto:support@kimelialuxe.com">
              Email Support
            </ContactButton>
          </ContactButtons>
        </ContactContainer>
      </ContactSection>
    </PageWrapper>
  );
};

export default FAQPage;
