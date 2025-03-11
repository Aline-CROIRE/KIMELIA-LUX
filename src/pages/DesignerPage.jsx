"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { 
  FiSearch, 
  FiChevronRight, 
  FiArrowRight, 
  FiMapPin, 
  FiAward, 
  FiFilter,
  FiGrid,
  FiList
} from "react-icons/fi"

import SignupPage from './SingnupPage'; // Import the SignupPage component (adjust path as needed)

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
  padding: 6rem 2rem;
  text-align: center;
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

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
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.5);
`

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background: #f5f5f5;
  font-size: 0.9rem;

  a {
    color: rgba(0, 0, 0, 0.7);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #D4AF37;
    }
  }

  svg {
    margin: 0 0.5rem;
    font-size: 0.8rem;
  }

  span {
    color: rgba(0, 0, 0, 0.5);
  }
`

const DesignersSection = styled.section`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 2rem;
`

const FiltersBar = styled.div`
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
  border: 1px solid ${props => props.active ? '#D4AF37' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 4px;
  background: ${props => props.active ? 'rgba(212, 175, 55, 0.1)' : 'white'};
  color: ${props => props.active ? '#D4AF37' : 'black'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    border-color: #D4AF37;
  }
`

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ViewToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: ${props => props.active ? 'black' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: black;
  }
`

const DesignersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const DesignersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const DesignerCard = styled.div`
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

const DesignerImage = styled.div`
  position: relative;
  height: 300px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const DesignerOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
`

const DesignerName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`

const DesignerSpecialty = styled.p`
  opacity: 0.9;
  font-size: 0.9rem;
`

const DesignerInfo = styled.div`
  padding: 1.5rem;
`

const DesignerBio = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
`

const DesignerMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
  
  svg {
    color: #D4AF37;
    margin-right: 0.5rem;
  }
`

const DesignerActions = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    text-decoration: none;
  }
`

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  background: black;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
  }
`

const OutlineButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: 1px solid black;
  background: transparent;
  color: black;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

const DesignerListItem = styled.div`
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ListItemImage = styled.div`
  width: 300px;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`

const ListItemContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`

const ListItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const ListItemTitle = styled.div``

const ListItemActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    width: 100%;
    justify-content: space-between;
  }
`

const FeaturedBadge = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #D4AF37;
  color: black;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  gap: 0.5rem;
`

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? '#D4AF37' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 4px;
  background: ${props => props.active ? '#D4AF37' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #D4AF37;
  }
  
  &.arrow {
    width: auto;
    padding: 0 1rem;
  }
`

// Mock data
const designers = [
  {
    id: 1,
    name: "KIM Couture",
    specialty: "Evening Wear Specialist",
    location: "Kigali, Rwanda",
    experience: "15+ years",
    bio: "Specializing in elegant evening wear with a modern twist, KIM's designs have been featured in major fashion events across Africa and Europe.",
    image: "/placeholder.svg?height=300&width=280",
    featured: true
  },
  {
    id: 2,
    name: "Modern Tailor",
    specialty: "Bespoke Suits & Formal Wear",
    location: "Nairobi, Kenya",
    experience: "12 years",
    bio: "With over a decade of experience, Modern Tailor creates impeccably fitted suits and formal wear for all occasions, specializing in modern interpretations of classic designs.",
    image: "/placeholder.svg?height=300&width=280",
    featured: false
  },
  {
    id: 3,
    name: "Fresh Designs",
    specialty: "Contemporary Casual Wear",
    location: "Lagos, Nigeria",
    experience: "8 years",
    bio: "Fresh Designs creates contemporary casual wear that combines comfort with style for the modern fashion enthusiast, using sustainable materials and ethical production methods.",
    image: "/placeholder.svg?height=300&width=280",
    featured: true
  },
  {
    id: 4,
    name: "Artisan Leathers",
    specialty: "Leather Goods & Accessories",
    location: "Marrakech, Morocco",
    experience: "20+ years",
    bio: "A family-owned business specializing in handcrafted leather goods using traditional techniques passed down through generations, creating unique and durable pieces.",
    image: "/placeholder.svg?height=300&width=280",
    featured: false
  },
  {
    id: 5,
    name: "Urban Style",
    specialty: "Streetwear & Urban Fashion",
    location: "Johannesburg, South Africa",
    experience: "6 years",
    bio: "Urban Style brings fresh and bold streetwear designs that reflect the vibrant energy of African cities, combining local cultural elements with global urban trends.",
    image: "/placeholder.svg?height=300&width=280",
    featured: false
  },
  {
    id: 6,
    name: "Luxury Accessories",
    specialty: "High-End Accessories",
    location: "Cairo, Egypt",
    experience: "10 years",
    bio: "Creating exquisite accessories that add the perfect finishing touch to any outfit, from handcrafted jewelry to luxury scarves and bags using premium materials.",
    image: "/placeholder.svg?height=300&width=280",
    featured: true
  },
  {
    id: 7,
    name: "Bridal Dreams",
    specialty: "Wedding & Bridal Wear",
    location: "Tunis, Tunisia",
    experience: "15 years",
    bio: "Specializing in creating dream wedding dresses and bridal wear that combine traditional elements with contemporary designs, making each bride feel unique on her special day.",
    image: "/placeholder.svg?height=300&width=280",
    featured: false
  },
  {
    id: 8,
    name: "Cozy Knits",
    specialty: "Knitwear & Winter Fashion",
    location: "Addis Ababa, Ethiopia",
    experience: "9 years",
    bio: "Handmade knitwear created with love and attention to detail, using locally sourced wool and sustainable practices to create warm and stylish pieces for the colder months.",
    image: "/placeholder.svg?height=300&width=280",
    featured: false
  }
];

const DesignersPage = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [activeFilter, setActiveFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // State to control the visibility of the SignupPage overlay
  const [showSignup, setShowSignup] = useState(false);

  const filteredDesigners = activeFilter === "featured" 
    ? designers.filter(designer => designer.featured) 
    : designers;

  // Function to open the SignupPage as an overlay
  const openSignup = () => {
    setShowSignup(true);
  };

  // Function to close the SignupPage overlay
  const closeSignup = () => {
    setShowSignup(false);
  };
  
  return (
    <PageWrapper>
      <HeroSection>
        <HeroContent>
          <h1>Meet Our Designers</h1>
          <p>
            Discover the talented fashion designers and artisans who bring their creativity and craftsmanship to Kimelia Luxe Marketplace.
          </p>
          <SearchContainer>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
            <SearchInput type="text" placeholder="Search designers by name or specialty..." />
          </SearchContainer>
        </HeroContent>
          {/* Button to trigger the signup overlay */}
          <button onClick={openSignup} style={{ padding: '10px 20px', background: '#D4AF37', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Create an Account
          </button>
      </HeroSection>
      
      <Breadcrumb>
        <Link to="/">Home</Link>
        <FiChevronRight />
        <Link to="/marketplace">Marketplace</Link>
        <FiChevronRight />
        <span>Designers</span>
      </Breadcrumb>
      
      <DesignersSection>
        <FiltersBar>
          <FilterGroup>
            <FilterButton 
              active={activeFilter === "all"} 
              onClick={() => setActiveFilter("all")}
            >
              <FiFilter /> All Designers
            </FilterButton>
            <FilterButton 
              active={activeFilter === "featured"} 
              onClick={() => setActiveFilter("featured")}
            >
              <FiAward /> Featured Designers
            </FilterButton>
          </FilterGroup>
          
          <ViewToggle>
            <ViewToggleBtn 
              active={viewMode === "grid"} 
              onClick={() => setViewMode("grid")}
            >
              <FiGrid />
            </ViewToggleBtn>
            <ViewToggleBtn 
              active={viewMode === "list"} 
              onClick={() => setViewMode("list")}
            >
              <FiList />
            </ViewToggleBtn>
          </ViewToggle>
        </FiltersBar>
        
        {viewMode === "grid" ? (
          <DesignersGrid>
            {filteredDesigners.map(designer => (
              <DesignerCard key={designer.id}>
                <DesignerImage>
                  <img src={designer.image || "/placeholder.svg"} alt={designer.name} />
                  <DesignerOverlay>
                    <DesignerName>{designer.name}</DesignerName>
                    <DesignerSpecialty>{designer.specialty}</DesignerSpecialty>
                  </DesignerOverlay>
                </DesignerImage>
                <DesignerInfo>
                  <DesignerBio>{designer.bio}</DesignerBio>
                  <DesignerMeta>
                    <span><FiMapPin /> {designer.location}</span>
                    <span><FiAward /> {designer.experience}</span>
                  </DesignerMeta>
                  <DesignerActions>
                    <ActionButton to={`/marketplace/designers/${designer.id}`}>
                      View Collection
                    </ActionButton>
                    <OutlineButton to={`/marketplace/designers/${designer.id}/contact`}>
                      Contact
                    </OutlineButton>
                  </DesignerActions>
                </DesignerInfo>
              </DesignerCard>
            ))}
          </DesignersGrid>
        ) : (
          <DesignersList>
            {filteredDesigners.map(designer => (
              <DesignerListItem key={designer.id}>
                <ListItemImage>
                  <img src={designer.image || "/placeholder.svg"} alt={designer.name} />
                </ListItemImage>
                <ListItemContent>
                  <ListItemHeader>
                    <ListItemTitle>
                      {designer.featured && <FeaturedBadge>Featured Designer</FeaturedBadge>}
                      <DesignerName>{designer.name}</DesignerName>
                      <DesignerSpecialty>{designer.specialty}</DesignerSpecialty>
                    </ListItemTitle>
                    <ListItemActions>
                      <ActionButton to={`/marketplace/designers/${designer.id}`}>
                        View Collection
                      </ActionButton>
                      <OutlineButton to={`/marketplace/designers/${designer.id}/contact`}>
                        Contact
                      </OutlineButton>
                    </ListItemActions>
                  </ListItemHeader>
                  <DesignerBio>{designer.bio}</DesignerBio>
                  <DesignerMeta>
                    <span><FiMapPin /> {designer.location}</span>
                    <span><FiAward /> {designer.experience}</span>
                  </DesignerMeta>
                </ListItemContent>
              </DesignerListItem>
            ))}
          </DesignersList>
        )}
        
        <Pagination>
          <PageButton className="arrow">
            Previous
          </PageButton>
          <PageButton active={currentPage === 1} onClick={() => setCurrentPage(1)}>
            1
          </PageButton>
          <PageButton active={currentPage === 2} onClick={() => setCurrentPage(2)}>
            2
          </PageButton>
          <PageButton active={currentPage === 3} onClick={() => setCurrentPage(3)}>
            3
          </PageButton>
          <PageButton className="arrow">
            Next
          </PageButton>
        </Pagination>
      </DesignersSection>

      {/* Conditionally render the SignupPage component as an overlay */}
      {showSignup && <SignupPage onClose={closeSignup} />}
    </PageWrapper>
  )
}

export default DesignersPage