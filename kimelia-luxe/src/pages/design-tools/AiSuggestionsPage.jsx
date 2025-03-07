// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { FiArrowRight, FiZap } from 'react-icons/fi';

// const AiSuggestionsPage = () => {
//   return (
//     <PageContainer>
//       <HeroSection>
//         <div className="container">
//           <HeroContent>
//             <h1>AI Outfit Suggestions</h1>
//             <p>
//               Get personalized outfit recommendations powered by artificial intelligence.
//             </p>
//           </HeroContent>
//         </div>
//       </HeroSection>

//       <ToolSection>
//         <div className="container">
//           <ToolGrid>
//             <ToolImage>
//               <img src="/images/ai-suggestions-detail.jpg" alt="AI Outfit Suggestions" />
//             </ToolImage>
//             <ToolContent>
//               <ToolIcon>
//                 <FiZap />
//               </ToolIcon>
//               <h2>Smart Fashion Recommendations</h2>
//               <p>
//                 Our AI suggests outfit combinations based on your preferences, body type, occasion, and current fashion trends.
//                 The more you use it, the better it understands your style.
//               </p>
//               <FeatureList>
//                 <li>
//                   <FiArrowRight /> Personalized recommendations
//                 </li>
//                 <li>
//                   <FiArrowRight /> Trend-based suggestions
//                 </li>
//                 <li>
//                   <FiArrowRight /> Occasion-specific outfits
//                 </li>
//                 <li>
//                   <FiArrowRight /> Style evolution tracking
//                 </li>
//               </FeatureList>
//               <ButtonGroup>
//                 <Link to="/design-tools/ai-suggestions/demo" className="btn btn-gold">
//                   Try Demo
//                 </Link>
//                 <Link to="/signup" className="btn btn-outline">
//                   Sign Up for Full Access
//                 </Link>
//               </ButtonGroup>
//             </ToolContent>
//           </ToolGrid>
//         </div>
//       </ToolSection>

//       <HowItWorksSection>
//         <div className="container">
//           <SectionTitle>
//             <h2>How It Works</h2>
//             <p>
//               Our AI-powered outfit suggestion system uses advanced algorithms to provide personalized fashion recommendations.
//             </p>
//           </SectionTitle>
//           <StepsGrid>
//             <StepCard>
//               <StepNumber>1</StepNumber>
//               <h3>Create Your Profile</h3>
//               <p>
//                 Tell us about your style preferences, body type, colors you love, and occasions you dress for.
//               </p>
//             </StepCard>
//             <StepCard>
//               <StepNumber>2</StepNumber>
//               <h3>Upload Your Wardrobe</h3>
//               <p>
//                 Add items from your existing wardrobe or browse our marketplace to create your digital closet.
//               </p>
//             </StepCard>
//             <StepCard>
//               <StepNumber>3</StepNumber>
//               <h3>Get Recommendations</h3>
//               <p>
//                 Our AI analyzes your profile and wardrobe to suggest outfit combinations that match your style.
//               </p>
//             </StepCard>
//             <StepCard>
//               <StepNumber>4</StepNumber>
//               <h3>Provide Feedback</h3>
//               <p>
//                 Rate the suggestions to help our AI learn and improve its recommendations over time.
//               </p>
//             </StepCard>
//           </StepsGrid>
//         </div>
//       </HowItWorksSection>

//       <TestimonialsSection>
//         <div className="container">
//           <SectionTitle>
//             <h2>What Our Users Say</h2>
//             <p>
//               Hear from fashion enthusiasts who have transformed their style with our AI outfit suggestions.
//             </p>
//           </SectionTitle>
//           <TestimonialsGrid>
//             <TestimonialCard>
//               <TestimonialContent>
//                 "The AI outfit suggestions have completely transformed my wardrobe. I'm getting compliments on my style like never before!"
//               </TestimonialContent>
//               <TestimonialAuthor>
//                 <img src="/images/testimonials/user1.jpg" alt="Sarah J." />
//                 <div>
//                   <h4>Sarah J.</h4>
//                   <p>Fashion Blogger</p>
//                 </div>
//               </TestimonialAuthor>
//             </TestimonialCard>
//             <TestimonialCard>
//               <TestimonialContent>
//                 "As someone who struggles with fashion choices, this tool has been a game-changer. It's like having a personal stylist in my pocket."
//               </TestimonialContent>
//               <TestimonialAuthor>
//                 <img src="/images/testimonials/user2.jpg" alt="Michael T." />
//                 <div>
//                   <h4>Michael T.</h4>
//                   <p>Business Professional</p>
//                 </div>
//               </TestimonialAuthor>
//             </TestimonialCard>
//             <TestimonialCard>
//               <TestimonialContent>
//                 "I love how the AI learns my style over time. The recommendations get better with each use, and I've discovered combinations I never would have thought of."
//               </TestimonialContent>
//               <TestimonialAuthor>
//                 <img src="/images/testimonials/user3.jpg" alt="Priya K." />
//                 <div>
//                   <h4>Priya K.</h4>
//                   <p>Student</p>
//                 </div>
//               </TestimonialAuthor>
//             </TestimonialCard>
//           </TestimonialsGrid>
//         </div>
//       </TestimonialsSection>

//       <CTASection>
//         <div className="container">
//           <CTAContent>
//             <h2>Elevate Your Style with AI</h2>
//             <p>
//               Sign up today and discover outfit combinations that express your unique style.
//             </p>
//             <ButtonGroup>
//               <Link to="/signup" className="btn btn-gold">
//                 Create Free Account
//               </Link>
//               <Link to="/pricing" className="btn btn-outline">
//                 View Pricing
//               </Link>
//             </ButtonGroup>
//           </CTAContent>
//         </div>
//       </CTASection>
//     </PageContainer>
//   );
// };

// // Styled Components
// const PageContainer = styled.div`
//   width: 100%;
// `;

// const HeroSection = styled.section`
//   background: linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.7)), url('/images/ai-suggestions-hero.jpg');
//   background-size: cover;
//   background-position: center;
//   color: white;
//   padding: 6rem 0;
//   text-align: center;
// `;

// const HeroContent = styled.div`
//   max-width: 800px;
//   margin: 0 auto;

//   h1 {
//     font-size: 3.5rem;
//     margin-bottom: 1.5rem;
//     background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   p {
//     font-size: 1.2rem;
//     line-height: 1.6;
//   }
// `;

// const ToolSection = styled.section`
//   padding: 5rem 0;
// `;

// const ToolGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 4rem;
//   align-items: center;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const ToolContent = styled.div`
//   h2 {
//     font-size: 2.5rem;
//     margin-bottom: 1.5rem;
//   }

//   p {
//     color: var(--text-secondary);
//     margin-bottom: 1.5rem;
//     line-height: 1.6;
//   }
// `;

// const ToolIcon = styled.div`
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   background-color: rgba(212, 175, 55, 0.1);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 1.5rem;
  
//   svg {
//     color: var(--gold-primary);
//     font-size: 1.8rem;
//   }
// `;

// const FeatureList = styled.ul`
//   list-style: none;
//   margin-bottom: 2rem;

//   li {
//     display: flex;
//     align-items: center;
//     margin-bottom: 0.75rem;
    
//     svg {
//       color: var(--gold-primary);
//       margin-right: 0.75rem;
//       flex-shrink: 0;
//     }
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   flex-wrap: wrap;

//   a {
//     margin-right: 1rem;
//     margin-bottom: 1rem;
//   }
// `;

// const ToolImage = styled.div`
//   img {
//     width: 100%;
//     border-radius: 8px;
//     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   }
// `;

// const HowItWorksSection = styled.section`
//   padding: 5rem 0;
//   background-color: #f9f9f9;
// `;

// const SectionTitle = styled.div`
//   text-align: center;
//   margin-bottom: 3rem;

//   h2 {
//     font-size: 2.5rem;
//     margin-bottom: 1rem;
//   }

//   p {
//     max-width: 600px;
//     margin: 0 auto;
//     color: var(--text-secondary);
//   }
// `;

// const StepsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 2rem;
// `;

// const StepCard = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   padding: 2rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//   position: relative;
  
//   h3 {
//     font-size: 1.5rem;
//     margin-bottom: 1rem;
//   }

//   p {
//     color: var(--text-secondary);
//     line-height: 1.6;
//   }
// `;

// const StepNumber = styled.div`
//   position: absolute;
//   top: -20px;
//   left: 20px;
//   width: 40px;
//   height: 40px;
//   background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   font-weight: 700;
//   font-size: 1.2rem;
// `;

// const TestimonialsSection = styled.section`
//   padding: 5rem 0;
// `;

// const TestimonialsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 2rem;
// `;

// const TestimonialCard = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   padding: 2rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
// `;

// const TestimonialContent = styled.p`
//   font-style: italic;
//   color: var(--text-secondary);
//   margin-bottom: 1.5rem;
//   line-height: 1.6;
//   position: relative;
  
//   &::before {
//     content: '"';
//     font-size: 4rem;
//     color: rgba(212, 175, 55, 0.1);
//     position: absolute;
//     top: -20px;
//     left: -10px;
//     z-index: -1;
//   }
// `;

// const TestimonialAuthor = styled.div`
//   display: flex;
//   align-items: center;
  
//   img {
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     margin-right: 1rem;
//   }
  
//   h4 {
//     font-size: 1rem;
//     margin-bottom: 0.25rem;
//   }
  
//   p {
//     font-size: 0.875rem;
//     color: var(--text-secondary);
//   }
// `;

// const CTASection = styled.section`
//   padding: 5rem 0;
//   background: linear-gradient(to right, var(--luxury-black), #1a1a1a);
//   color: white;
// `;

// const CTAContent = styled.div`
//   text-align: center;
//   max-width: 800px;
//   margin: 0 auto;

//   h2 {
//     font-size: 2.5rem;
//     margin-bottom: 1.5rem;
//     background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   p {
//     margin-bottom: 2rem;
//     font-size: 1.2rem;
//     opacity: 0.9;
//   }

//   .btn-outline {
//     border-color: white;
//     color: white;
//   }

//   .btn-outline:hover {
//     background-color: rgba(255, 255, 255, 0.1);
//   }
// `;

// export default AiSuggestionsPage;


"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { 
  FiZap, 
  FiFilter, 
  FiHeart, 
  FiShoppingBag, 
  FiRefreshCw, 
  FiChevronRight, 
  FiCalendar, 
  FiMapPin, 
  FiSun, 
  FiThumbsUp, 
  FiThumbsDown 
} from "react-icons/fi"
import Button from "../../components/common/Button"

const PageWrapper = styled.div`
  background: white;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`

const HeroSection = styled.section`
  background: linear-gradient(135deg, #000000, #333333);
  color: white;
  padding: 6rem 2rem 8rem;
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

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`

const OutfitSection = styled.section`
  max-width: 1200px;
  margin: -4rem auto 4rem;
  padding: 0 2rem;
  position: relative;
  z-index: 3;
`

const OutfitContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: ${props => props.active ? 'black' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    border-color: black;
  }

  svg {
    font-size: 1rem;
  }
`

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #D4AF37;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c4a030;
  }

  svg {
    font-size: 1rem;
  }
`

const OutfitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const OutfitCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`

const OutfitImage = styled.div`
  height: 350px;
  background: #f5f5f5;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .outfit-actions {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .outfit-action {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &:hover {
      background: #D4AF37;
      color: white;
    }
  }

  .outfit-tag {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    background: #D4AF37;
    color: black;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .outfit-context {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .context-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
  }
`

const OutfitInfo = styled.div`
  padding: 1.5rem;
`

const OutfitTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: black;
`

const OutfitDescription = styled.p`
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`

const OutfitItems = styled.div`
  margin-bottom: 1rem;
`

const OutfitItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  &::before {
    content: '•';
    color: #D4AF37;
    margin-right: 0.5rem;
  }
`

const OutfitFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`

const OutfitFeedback = styled.div`
  display: flex;
  gap: 0.75rem;
`

const FeedbackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.like ? '#00C853' : '#FF3D00'};
    border-color: ${props => props.like ? '#00C853' : '#FF3D00'};
    color: white;
  }
`

const OutfitPrice = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`

const LoadMoreButton = styled(Button)`
  display: block;
  margin: 0 auto;
`

const PreferencesSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: black;
  text-align: center;
`

const PreferencesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const PreferenceCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
`

const PreferenceIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  svg {
    color: #D4AF37;
    font-size: 1.5rem;
  }
`

const PreferenceTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: black;
`

const PreferenceDescription = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

// Mock data
const outfits = [
  {
    id: 1,
    title: "Casual Weekend Brunch",
    description: "A comfortable yet stylish outfit perfect for weekend brunches or casual outings.",
    image: "/placeholder.svg?height=350&width=300",
    tag: "Casual",
    occasion: "Weekend",
    weather: "Sunny",
    location: "Outdoor",
    items: [
      "White linen shirt",
      "Tailored beige chinos",
      "Brown leather loafers",
      "Minimalist watch"
    ],
    price: "$249.99"
  },
  {
    id: 2,
    title: "Business Meeting Attire",
    description: "Professional and polished look for important business meetings and presentations.",
    image: "/placeholder.svg?height=350&width=300",
    tag: "Business",
    occasion: "Meeting",
    weather: "Indoor",
    location: "Office",
    items: [
      "Navy blue blazer",
      "White dress shirt",
      "Charcoal dress pants",
      "Black Oxford shoes"
    ],
    price: "$399.99"
  },
  {
    id: 3,
    title: "Evening Cocktail Party",
    description: "Elegant ensemble for cocktail parties and semi-formal evening events.",
    image: "/placeholder.svg?height=350&width=300",
    tag: "Evening",
    occasion: "Party",
    weather: "Night",
    location: "Indoor",
    items: [
      "Black cocktail dress",
      "Statement earrings",
      "Strappy heels",
      "Clutch purse"
    ],
    price: "$329.99"
  },
  {
    id: 4,
    title: "Summer Beach Day",
    description: "Light and breezy outfit for a day at the beach or resort vacation.",
    image: "/placeholder.svg?height=350&width=300",
    tag: "Summer",
    occasion: "Vacation",
    weather: "Hot",
    location: "Beach",
    items: [
      "Linen shirt",
      "Swim shorts",
      "Straw hat",
      "Leather sandals"
    ],
    price: "$189.99"
  },
  {
    id: 5,
    title: "Autumn Weekend Getaway",
    description: "Cozy and stylish outfit for a weekend trip during the fall season.",
    image: "/placeholder.svg?height=350&width=300",
    tag: "Autumn",
    occasion: "Weekend",
    weather: "Cool",
    location: "Outdoor",
    items: [
      "Knit sweater",
      "Dark jeans",
      "Leather boots",
      "Wool scarf"
    ],
    price: "$279.99"
  },
  {
    id: 6,
    title: "Fitness & Athleisure",
    description: "Functional and fashionable workout attire that transitions to casual wear.",
    image: "/placeholder.svg?height=350&width=300",
    tag: "Fitness",
    occasion: "Workout",
    weather: "Any",
    location: "Gym",
    items: [
      "Performance t-shirt",
      "Athletic shorts",
      "Running shoes",
      "Lightweight jacket"
    ],
    price: "$159.99"
  }
];

const OutfitSuggestionsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleOutfits, setVisibleOutfits] = useState(outfits);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setVisibleOutfits(outfits);
    } else {
      setVisibleOutfits(outfits.filter(outfit => outfit.tag === filter));
    }
  };

  const handleRefresh = () => {
    // In a real app, this would fetch new outfit suggestions
    console.log("Refreshing outfit suggestions");
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroContent>
          <PageTitle>AI Outfit Suggestions</PageTitle>
          <PageSubtitle>
            Discover personalized outfit recommendations tailored to your style preferences, body type, and upcoming occasions. Our AI analyzes thousands of fashion combinations to suggest the perfect look for you.
          </PageSubtitle>
        </HeroContent>
      </HeroSection>

      <OutfitSection>
        <OutfitContainer>
          <FilterBar>
            <FilterGroup>
              <FilterButton 
                active={activeFilter === "All"} 
                onClick={() => handleFilterChange("All")}
              >
                <FiFilter /> All Styles
              </FilterButton>
              <FilterButton 
                active={activeFilter === "Casual"} 
                onClick={() => handleFilterChange("Casual")}
              >
                Casual
              </FilterButton>
              <FilterButton 
                active={activeFilter === "Business"} 
                onClick={() => handleFilterChange("Business")}
              >
                Business
              </FilterButton>
              <FilterButton 
                active={activeFilter === "Evening"} 
                onClick={() => handleFilterChange("Evening")}
              >
                Evening
              </FilterButton>
              <FilterButton 
                active={activeFilter === "Summer"} 
                onClick={() => handleFilterChange("Summer")}
              >
                Summer
              </FilterButton>
            </FilterGroup>
            <RefreshButton onClick={handleRefresh}>
              <FiRefreshCw /> Refresh Suggestions
            </RefreshButton>
          </FilterBar>

          <OutfitGrid>
            {visibleOutfits.map((outfit, index) => (
              <OutfitCard 
                key={outfit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <OutfitImage>
                  <img src={outfit.image || "/placeholder.svg"} alt={outfit.title} />
                  <div className="outfit-tag">{outfit.tag}</div>
                  <div className="outfit-actions">
                    <div className="outfit-action">
                      <FiHeart />
                    </div>
                    <div className="outfit-action">
                      <FiShoppingBag />
                    </div>
                  </div>
                  <div className="outfit-context">
                    <div className="context-item">
                      <FiCalendar /> {outfit.occasion}
                    </div>
                    <div className="context-item">
                      <FiSun /> {outfit.weather}
                    </div>
                    <div className="context-item">
                      <FiMapPin /> {outfit.location}
                    </div>
                  </div>
                </OutfitImage>
                <OutfitInfo>
                  <OutfitTitle>{outfit.title}</OutfitTitle>
                  <OutfitDescription>{outfit.description}</OutfitDescription>
                  <OutfitItems>
                    {outfit.items.map((item, idx) => (
                      <OutfitItem key={idx}>{item}</OutfitItem>
                    ))}
                  </OutfitItems>
                  <OutfitFooter>
                    <OutfitFeedback>
                      <FeedbackButton like>
                        <FiThumbsUp />
                      </FeedbackButton>
                      <FeedbackButton>
                        <FiThumbsDown />
                      </FeedbackButton>
                    </OutfitFeedback>
                    <OutfitPrice>{outfit.price}</OutfitPrice>
                  </OutfitFooter>
                </OutfitInfo>
              </OutfitCard>
            ))}
          </OutfitGrid>

          <LoadMoreButton variant="outline">Load More Suggestions</LoadMoreButton>
        </OutfitContainer>
      </OutfitSection>

      <PreferencesSection>
        <SectionTitle>How It Works</SectionTitle>
        <PreferencesGrid>
          <PreferenceCard>
            <PreferenceIcon>
              <FiZap />
            </PreferenceIcon>
            <PreferenceTitle>AI-Powered Analysis</PreferenceTitle>
            <PreferenceDescription>
              Our advanced AI analyzes your style preferences, body measurements, and fashion history to create personalized outfit recommendations.
            </PreferenceDescription>
            <Link to="/design-tools/style-quiz">
              <Button variant="outline">Take Style Quiz</Button>
            </Link>
          </PreferenceCard>
          <PreferenceCard>
            <PreferenceIcon>
              <FiCalendar />
            </PreferenceIcon>
            <PreferenceTitle>Occasion-Based Suggestions</PreferenceTitle>
            <PreferenceDescription>
              Get outfit recommendations tailored to specific occasions, from business meetings to weekend getaways and special events.
            </PreferenceDescription>
            <Link to="/design-tools/occasion-planner">
              <Button variant="outline">Plan Your Outfit</Button>
            </Link>
          </PreferenceCard>
          <PreferenceCard>
            <PreferenceIcon>
              <FiRefreshCw />
            </PreferenceIcon>
            <PreferenceTitle>Continuous Learning</PreferenceTitle>
            <PreferenceDescription>
              The more you interact with suggestions, the smarter our system becomes. Your feedback helps refine future recommendations.
            </PreferenceDescription>
            <Link to="/design-tools/preference-settings">
              <Button variant="outline">Update Preferences</Button>
            </Link>
          </PreferenceCard>
        </PreferencesGrid>
      </PreferencesSection>
    </PageWrapper>
  );
};

export default OutfitSuggestionsPage;
