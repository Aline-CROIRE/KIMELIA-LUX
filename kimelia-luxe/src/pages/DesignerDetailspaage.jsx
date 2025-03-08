"use client"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import { 
  FiChevronRight, 
  FiMapPin, 
  FiAward, 
  FiMail, 
  FiPhone, 
  FiGlobe, 
  FiInstagram, 
  FiTwitter, 
  FiShoppingBag, 
  FiHeart, 
  FiFilter,
  FiArrowLeft
} from "react-icons/fi"

const PageWrapper = styled.div`
  background: white;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
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

const DesignerHero = styled.section`
  position: relative;
  height: 400px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('/placeholder.svg?height=400&width=1200');
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: flex-end;
`

const DesignerProfile = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 1rem;
  }
`

const DesignerAvatar = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 4px solid white;
  overflow: hidden;
  margin-bottom: -50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  background: #f5f5f5;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`

const DesignerInfo = styled.div`
  flex: 1;
`

const DesignerName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`

const DesignerSpecialty = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 1rem;
`

const DesignerMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  span {
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.5rem;
      color: #D4AF37;
    }
  }
`

const DesignerActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    justify-content: center;
  }
`

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  background: ${props => props.primary ? '#D4AF37' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.primary ? 'black' : 'white'};
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary ? '#c4a030' : 'rgba(255, 255, 255, 0.3)'};
  }
`

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto 2rem;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const MainContent = styled.div``

const Sidebar = styled.div`
  @media (max-width: 992px) {
    order: -1;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: black;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: #D4AF37;
  }
`

const AboutSection = styled.div`
  margin-bottom: 3rem;
`

const AboutText = styled.div`
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.8);
  
  p {
    margin-bottom: 1rem;
  }
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

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`

const ProductCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const ProductImage = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const CustomBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #D4AF37;
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
`

const ProductInfo = styled.div`
  padding: 1rem;
`

const ProductCategory = styled.div`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.25rem;
`

const ProductName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${ProductCard}:hover & {
    color: #D4AF37;
  }
`

const ProductPrice = styled.div`
  font-weight: 600;
`

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`

const AddToCartButton = styled.button`
  background-color: transparent;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  svg {
    color: rgba(0, 0, 0, 0.7);
  }

  &:hover {
    background-color: rgba(212, 175, 55, 0.1);

    svg {
      color: #D4AF37;
    }
  }
`

const WishlistButton = styled.button`
  background-color: transparent;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  svg {
    color: rgba(0, 0, 0, 0.7);
  }

  &:hover {
    background-color: rgba(212, 175, 55, 0.1);

    svg {
      color: #D4AF37;
    }
  }
`

const LoadMoreButton = styled.button`
  display: block;
  margin: 3rem auto 0;
  padding: 0.75rem 2rem;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #D4AF37;
    color: #D4AF37;
  }
`

const SidebarCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`

const SidebarCardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.2rem;
    margin: 0;
  }
`

const SidebarCardBody = styled.div`
  padding: 1.5rem;
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    color: #D4AF37;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: #D4AF37;
    }
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  transition: all 0.3s ease;
  
  &:hover {
    background: #D4AF37;
    color: white;
    transform: translateY(-3px);
  }
`

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const AchievementItem = styled.div`
  display: flex;
  align-items: flex-start;
  
  svg {
    color: #D4AF37;
    margin-right: 1rem;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
  
  div {
    flex: 1;
  }
  
  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 0.95rem;
  }
  
  p {
    margin: 0;
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
  }
`

const BackToDesigners = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    color: #D4AF37;
  }
`

// Mock data
const designer = {
  id: 1,
  name: "KIM Couture",
  specialty: "Evening Wear Specialist",
  location: "Kigali, Rwanda",
  experience: "15+ years",
  email: "contact@kimcouture.com",
  phone: "+250 788 123 456",
  website: "www.kimcouture.com",
  bio: `KIM Couture is a renowned fashion house specializing in elegant evening wear with a modern twist. Founded by Kim Ndahiro in 2008, the brand has quickly risen to prominence in the African fashion scene and has been featured in major fashion events across the continent and in Europe.

  With a focus on luxurious fabrics, impeccable craftsmanship, and innovative designs, KIM Couture creates garments that celebrate the female form while incorporating elements of traditional African aesthetics with contemporary silhouettes.

  Each piece is meticulously crafted in our Kigali atelier, where a team of skilled artisans work under Kim's creative direction to bring her vision to life. The brand is committed to ethical fashion practices and supports local textile industries by sourcing materials locally whenever possible.`,
  achievements: [
    {
      title: "African Fashion Designer of the Year",
      year: "2022",
      description: "Recognized for outstanding contribution to African fashion"
    },
    {
      title: "Featured in Vogue Africa",
      year: "2021",
      description: "Exclusive feature highlighting innovative designs"
    },
    {
      title: "Paris Fashion Week Showcase",
      year: "2020",
      description: "Invited to showcase collection at prestigious event"
    }
  ],
  avatar: "/placeholder.svg?height=180&width=180",
  coverImage: "/placeholder.svg?height=400&width=1200"
};

const products = [
  {
    id: 1,
    name: "Elegant Silk Evening Gown",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=220",
    category: "Dresses",
    isCustom: false
  },
  {
    id: 2,
    name: "Beaded Cocktail Dress",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=220",
    category: "Dresses",
    isCustom: true
  },
  {
    id: 3,
    name: "Embroidered Gala Gown",
    price: 399.99,
    image: "/placeholder.svg?height=300&width=220",
    category: "Dresses",
    isCustom: true
  },
  {
    id: 4,
    name: "Satin Wrap Dress",
    price: 179.99,
    image: "/placeholder.svg?height=300&width=220",
    category: "Dresses",
    isCustom: false
  },
  {
    id: 5,
    name: "Silk Evening Scarf",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=220",
    category: "Accessories",
    isCustom: false
  },
  {
    id: 6,
    name: "Embellished Clutch Purse",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=220",
    category: "Accessories",
    isCustom: false
  },
  {
    id: 7,
    name: "Custom Wedding Gown",
    price: 899.99,
    image: "/placeholder.svg?height=300&width=220",
    category: "Wedding",
    isCustom: true
  },
  {
    id: 8,
    name: "Formal Jumpsuit",
    price: 229.99,
    image: "/placeholder.svg?height=300&width=220",
    category: "Jumpsuits",
    isCustom: false
  }
];

const DesignerDetailPage = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filteredProducts = activeFilter === "all" 
    ? products 
    : activeFilter === "custom" 
      ? products.filter(product => product.isCustom)
      : products.filter(product => product.category.toLowerCase() === activeFilter);
  
  return (
    <PageWrapper>
      <Breadcrumb>
        <Link to="/">Home</Link>
        <FiChevronRight />
        <Link to="/marketplace">Marketplace</Link>
        <FiChevronRight />
        <Link to="/marketplace/designers">Designers</Link>
        <FiChevronRight />
        <span>{designer.name}</span>
      </Breadcrumb>
      
      <DesignerHero>
        <DesignerProfile>
          <DesignerAvatar>
            <img src={designer.avatar || "/placeholder.svg"} alt={designer.name} />
          </DesignerAvatar>
          <DesignerInfo>
            <DesignerName>{designer.name}</DesignerName>
            <DesignerSpecialty>{designer.specialty}</DesignerSpecialty>
            <DesignerMeta>
              <span><FiMapPin /> {designer.location}</span>
              <span><FiAward /> {designer.experience}</span>
            </DesignerMeta>
          </DesignerInfo>
          <DesignerActions>
            <ActionButton to={`/marketplace/designers/${designer.id}/contact`} primary>
              Contact Designer
            </ActionButton>
            <ActionButton to={`/marketplace/designers/${designer.id}/follow`}>
              Follow
            </ActionButton>
          </DesignerActions>
        </DesignerProfile>
      </DesignerHero>
      
      <ContentSection>
        <MainContent>
          <BackToDesigners to="/marketplace/designers">
            <FiArrowLeft /> Back to All Designers
          </BackToDesigners>
          
          <AboutSection>
            <SectionTitle>
              About {designer.name}
            </SectionTitle>
            <AboutText>
              {designer.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </AboutText>
          </AboutSection>
          
          <SectionTitle>
            <FiShoppingBag /> Designer Collection
          </SectionTitle>
          
          <FiltersBar>
            <FilterGroup>
              <FilterButton 
                active={activeFilter === "all"} 
                onClick={() => setActiveFilter("all")}
              >
                <FiFilter /> All Items
              </FilterButton>
              <FilterButton 
                active={activeFilter === "custom"} 
                onClick={() => setActiveFilter("custom")}
              >
                Custom Designs
              </FilterButton>
              <FilterButton 
                active={activeFilter === "dresses"} 
                onClick={() => setActiveFilter("dresses")}
              >
                Dresses
              </FilterButton>
              <FilterButton 
                active={activeFilter === "accessories"} 
                onClick={() => setActiveFilter("accessories")}
              >
                Accessories
              </FilterButton>
            </FilterGroup>
            
            <SortSelect>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </SortSelect>
          </FiltersBar>
          
          <ProductsGrid>
            {filteredProducts.map(product => (
              <ProductCard key={product.id}>
                <ProductImage>
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  {product.isCustom && (
                    <CustomBadge>Custom Design</CustomBadge>
                  )}
                </ProductImage>
                <ProductInfo>
                  <ProductCategory>{product.category}</ProductCategory>
                  <ProductName>{product.name}</ProductName>
                  <ProductFooter>
                    <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                    <div>
                      <WishlistButton>
                        <FiHeart />
                      </WishlistButton>
                      <AddToCartButton>
                        <FiShoppingBag />
                      </AddToCartButton>
                    </div>
                  </ProductFooter>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
          
          <LoadMoreButton>
            Load More Products
          </LoadMoreButton>
        </MainContent>
        
        <Sidebar>
          <SidebarCard>
            <SidebarCardHeader>
              <h3>Contact Information</h3>
            </SidebarCardHeader>
            <SidebarCardBody>
              <ContactInfo>
                <ContactItem>
                  <FiMail />
                  <a href={`mailto:${designer.email}`}>{designer.email}</a>
                </ContactItem>
                <ContactItem>
                  <FiPhone />
                  <a href={`tel:${designer.phone}`}>{designer.phone}</a>
                </ContactItem>
                <ContactItem>
                  <FiGlobe />
                  <a href={`https://${designer.website}`} target="_blank" rel="noopener noreferrer">
                    {designer.website}
                  </a>
                </ContactItem>
              </ContactInfo>
              
              <SocialLinks>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <FiInstagram />
                </SocialLink>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <FiTwitter />
                </SocialLink>
              </SocialLinks>
            </SidebarCardBody>
          </SidebarCard>
          
          <SidebarCard>
            <SidebarCardHeader>
              <h3>Achievements</h3>
            </SidebarCardHeader>
            <SidebarCardBody>
              <AchievementsList>
                {designer.achievements.map((achievement, index) => (
                  <AchievementItem key={index}>
                    <FiAward />
                    <div>
                      <h4>{achievement.title} ({achievement.year})</h4>
                      <p>{achievement.description}</p>
                    </div>
                  </AchievementItem>
                ))}
              </AchievementsList>
            </SidebarCardBody>
          </SidebarCard>
        </Sidebar>
      </ContentSection>
    </PageWrapper>
  )
}

export default DesignerDetailPage
