"use client"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiShoppingBag, FiTag, FiFilter, FiSearch, FiArrowRight } from 'react-icons/fi';
import banner from '../assets/images/mrkbg.webp'
import elegant from "../assets/images/elegant.jpg"
import suit from "../assets/images/suit.jpg"
import summer from "../assets/images/summer.jpg"
import sweater from "../assets/images/sweater.jpg";
import scaf from "../assets/images/scaf.jpg";
import collect from '../assets/images/collect.jpg';
import wedding from '../assets/images/wedding.jpg';
import jacket from '../assets/images/Jacket.jpg'
import KIM from '../assets/images/kim1.png';
import d1 from '../assets/images/hy8.jpg';
import d2 from '../assets/images/hy4.jpg';
// Sample product data
const products = [
  {
    id: 1,
    name: "Elegant Evening Gown",
    designer: "KIM Couture",
    price: 299.99 * 1200, //Example conversion to RWF
    image:elegant,
    category: "Dresses",
    isCustom: false,
    imageSrcSet: `${elegant} 300w, ${elegant} 768w, ${elegant} 1200w`, // Example responsive images
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw"
  },
  {
    id: 2,
    name: "Tailored Business Suit",
    designer: "Modern Tailor",
    price: 399.99 * 1200, //Example conversion to RWF
    image: suit,
    category: "Suits",
    isCustom: true,
    imageSrcSet: `${suit} 300w, ${suit} 768w, ${suit} 1200w`, // Example responsive images
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw"
  },
  {
    id: 3,
    name: "Summer Collection Blouse",
    designer: "Fresh Designs",
    price: 89.99 * 1200, //Example conversion to RWF
    image: summer,
    category: "Tops",
    isCustom: false,
    imageSrcSet: `${summer} 300w, ${summer} 768w, ${summer} 1200w`, // Example responsive images
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw"
  },
  {
    id: 4,
    name: "Handcrafted Leather Jacket",
    designer: "Artisan Leathers",
    price: 499.99 * 1200, //Example conversion to RWF
    image: jacket,
    category: "Outerwear",
    isCustom: true,
    imageSrcSet: `${jacket} 300w, ${jacket} 768w, ${jacket} 1200w`, // Example responsive images
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw"
  },
  {
    id: 5,
    name: "Casual Denim Collection",
    designer: "Urban Style",
    price: 129.99 * 1200, //Example conversion to RWF
    image: collect,
    category: "Jeans",
    isCustom: false,
    imageSrcSet: `${collect} 300w, ${collect} 768w, ${collect} 1200w`, // Example responsive images
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw"
  },
  {
    id: 6,
    name: "Silk Evening Scarf",
    designer: "Luxury Accessories",
    price: 79.99 * 1200, //Example conversion to RWF
    image:scaf,
    category: "Accessories",
    isCustom: false,
    imageSrcSet: `${scaf} 300w, ${scaf} 768w, ${scaf} 1200w`, // Example responsive images
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw"
  },
  {
    id: 7,
    name: "Custom Wedding Dress",
    designer: "Bridal Dreams",
    price: 1299.99 * 1200, //Example conversion to RWF
    image: wedding,
    category: "Wedding",
    isCustom: true,
    imageSrcSet: `${wedding} 300w, ${wedding} 768w, ${wedding} 1200w`, // Example responsive images
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw"
  },
  {
    id: 8,
    name: "Handmade Wool Sweater",
    designer: "Cozy Knits",
    price: 149.99 * 1200, //Example conversion to RWF
    image: sweater,
    category: "Knitwear",
    isCustom: true,
     imageSrcSet: `${sweater} 300w, ${sweater} 768w, ${sweater} 1200w`, // Example responsive images
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw"
  },
];

// Sample categories
const categories = [
  "All Categories",
  "Dresses",
  "Suits",
  "Tops",
  "Outerwear",
  "Jeans",
  "Accessories",
  "Wedding",
  "Knitwear",
  "Imishanana", // Traditional Rwandan Cloth
  "Agaseke", // Traditional Rwandan Basket
];

const MarketplacePage = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>Kimelia Luxe Marketplace - Rwanda</h1>
            <p>
              Discover unique fashion, from modern designs to traditional Rwandan craftsmanship. Support local designers and tailors.
            </p>
            <ButtonGroup>
              <Link to="/shop" className="btn btn-gold">
                Shop Now
              </Link>
              <Link to="/marketplace/designers" className="btn btn-outline">
                Meet Our Designers
              </Link>
            </ButtonGroup>
          </HeroContent>
        </div>
      </HeroSection>

      {/* Marketplace Features */}
      <FeaturesSection>
        <div className="container">
          <FeaturesGrid>
            <FeatureBox>
              <FeatureIcon>
                <FiShoppingBag />
              </FeatureIcon>
              <h3>Diverse Vendor Marketplace</h3>
              <p>
                Connect with Rwandan designers and tailors, offering a range of styles from modern trends to cultural heritage.
              </p>
            </FeatureBox>
            <FeatureBox>
              <FeatureIcon>
                <FiTag />
              </FeatureIcon>
              <h3>Secure & Convenient Payments</h3>
              <p>
                Pay safely with Mobile Money (MoMo), credit cards, and other convenient options. Secure transactions guaranteed.
              </p>
            </FeatureBox>
            <FeatureBox>
              <FeatureIcon>
                <FiFilter />
              </FeatureIcon>
              <h3>Refined Search & Filtering</h3>
              <p>
                Easily find what you're looking for by category, style, size, and more with our powerful search tools.
              </p>
            </FeatureBox>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      {/* Products Section */}
      <ProductsSection id="products">
        <div className="container">
          <ProductsLayout>
            {/* Sidebar Filters */}
            <Sidebar>
              <FilterSection>
                <h3>Categories</h3>
                <FilterOptions>
                  {categories.map((category, index) => (
                    <FilterOption key={index}>
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        className="filter-checkbox"
                      />
                      <label htmlFor={`category-${index}`}>
                        {category}
                      </label>
                    </FilterOption>
                  ))}
                </FilterOptions>
              </FilterSection>

              <FilterSection>
                <h3>Price Range (RWF)</h3> {/* Rwandan Francs */}
                <PriceRange>
                  <PriceInput>
                    <label htmlFor="min-price">Min</label>
                    <input
                      type="number"
                      id="min-price"
                      placeholder="0"
                    />
                  </PriceInput>
                  <PriceInput>
                    <label htmlFor="max-price">Max</label>
                    <input
                      type="number"
                      id="max-price"
                      placeholder="100000" // Adjusted Placeholder
                    />
                  </PriceInput>
                </PriceRange>
                <button className="btn btn-outline btn-sm">Apply</button>
              </FilterSection>

              <FilterSection>
                <h3>Product Type</h3>
                <FilterOptions>
                  <FilterOption>
                    <input
                      type="checkbox"
                      id="ready-made"
                      className="filter-checkbox"
                    />
                    <label htmlFor="ready-made">
                      Ready-made
                    </label>
                  </FilterOption>
                  <FilterOption>
                    <input
                      type="checkbox"
                      id="custom"
                      className="filter-checkbox"
                    />
                    <label htmlFor="custom">
                      Custom Design
                    </label>
                  </FilterOption>
                </FilterOptions>
              </FilterSection>
            </Sidebar>

            {/* Products Grid */}
            <ProductsContent>
              <ProductsHeader>
                <h2>Featured Products</h2>
                <SearchBox>
                  <FiSearch />
                  <input
                    type="text"
                    placeholder="Search products..."
                  />
                </SearchBox>
              </ProductsHeader>

              <ProductsGrid>
                {products.map((product) => (
                  <ProductCard key={product.id}>
                    <ProductImage>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        srcSet={product.imageSrcSet}  // Add srcset
                        sizes={product.imageSizes}    // Add sizes
                      />
                      {product.isCustom && (
                        <CustomBadge>Custom Design</CustomBadge>
                      )}
                    </ProductImage>
                    <ProductInfo>
                      <ProductCategory>{product.category}</ProductCategory>
                      <ProductName>{product.name}</ProductName>
                      <ProductDesigner>{product.designer}</ProductDesigner>
                      <ProductFooter>
                        <ProductPrice>RWF {product.price.toFixed(0)}</ProductPrice> {/* Display price in RWF */}
                        <AddToCartButton>
                          <FiShoppingBag />
                        </AddToCartButton>
                      </ProductFooter>
                    </ProductInfo>
                       {/* "View Details" link */}
                       <DetailLink to={`/product/${product.id}`}>
                            View Details
                        </DetailLink>
                      {/* "View Details" icon - optional */}
                      {/*<DetailLink to={`/product/${product.id}`}>
                          <FiArrowRight />
                       </DetailLink>*/}
                  </ProductCard>
                ))}
              </ProductsGrid>

              <LoadMoreButton>
                <button className="btn btn-outline">Load More Products</button>
              </LoadMoreButton>
            </ProductsContent>
          </ProductsLayout>
        </div>
      </ProductsSection>

      {/* Designer Spotlight */}
      <DesignerSection>
        <div className="container">
          <SectionTitle>
            <h2>Meet Our Designers</h2>
            <p>
              Discover the creativity and skill of Rwanda's talented fashion designers and tailors.
            </p>
          </SectionTitle>

          <DesignerGrid>
            <DesignerCard>
              <DesignerImage>
                <img src={KIM} alt="Designer Portrait" />
                <DesignerOverlay>
                  <h3>KIM Couture</h3>
                  <p>Evening Wear Specialist</p>
                </DesignerOverlay>
              </DesignerImage>
              <DesignerInfo>
                <p>
                  Specializing in elegant evening wear with a modern twist, KIM's designs have been featured in major fashion events.
                </p>
                <Link to="/marketplace/designers/aline-couture" className="btn btn-outline btn-sm">
                  View Collection <FiArrowRight />
                </Link>
              </DesignerInfo>
            </DesignerCard>

            <DesignerCard>
              <DesignerImage>
                <img src={d1} alt="Designer Portrait" />
                <DesignerOverlay>
                  <h3>Modern Tailor</h3>
                  <p>Bespoke Suits & Formal Wear</p>
                </DesignerOverlay>
              </DesignerImage>
              <DesignerInfo>
                <p>
                  With over 15 years of experience, Modern Tailor creates impeccably fitted suits and formal wear for all occasions.
                </p>
                <Link to="/marketplace/designers/modern-tailor" className="btn btn-outline btn-sm">
                  View Collection <FiArrowRight />
                </Link>
              </DesignerInfo>
            </DesignerCard>

            <DesignerCard>
              <DesignerImage>
                <img src={d2}alt="Designer Portrait" />
                <DesignerOverlay>
                  <h3>Fresh Designs</h3>
                  <p>Contemporary Casual Wear</p>
                </DesignerOverlay>
              </DesignerImage>
              <DesignerInfo>
                <p>
                  Fresh Designs creates contemporary casual wear that combines comfort with style for the modern fashion enthusiast.
                </p>
                <Link to="/marketplace/designers/fresh-designs" className="btn btn-outline btn-sm">
                  View Collection <FiArrowRight />
                </Link>
              </DesignerInfo>
            </DesignerCard>
          </DesignerGrid>

          <ViewAllDesigners>
            <Link to="/marketplace/designers" className="btn btn-gold">
              View All Designers <FiArrowRight />
            </Link>
          </ViewAllDesigners>
        </div>
      </DesignerSection>

      {/* CTA Section */}
      <CTASection>
        <div className="container">
          <CTAContent>
            <h2>Become a Seller on Kimelia Luxe - Rwanda</h2>
            <p>
              Are you a Rwandan fashion designer or tailor? Join our marketplace and showcase your creations to a wider audience.
            </p>
            <ButtonGroup>
              <Link to="/seller" className="btn btn-gold">
                Become A seller
              </Link>
              <Link to="/seller/information" className="btn btn-outline">
                Learn More
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
  background: linear-gradient(to right, rgba(5, 5, 5, 0.4), rgba(12, 0, 0, 0.4)), url(${banner});
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
    margin-bottom: 2rem;
    line-height: 1.6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  a {
    margin: 0.5rem;
  }

  .btn-outline {
    border-color: var(--gold-primary);
    color: var(--gold-primary);
  }
`;

const FeaturesSection = styled.section`
  padding: 3rem 0;
  background-color: #f9f9f9;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureBox = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 1rem 0;
    font-size: 1.5rem;
  }

  p {
    color: var(--text-secondary);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  svg {
    color: var(--gold-primary);
    font-size: 1.8rem;
  }
`;

const ProductsSection = styled.section`
  padding: 5rem 0;
`;

const ProductsLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    width: 100%;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 0.5rem;
  }

  label {
    font-size: 0.875rem;
  }
`;

const PriceRange = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const PriceInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
  }
`;

const ProductsContent = styled.div`
  width: 100%;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SearchBox = styled.div`
  position: relative;
  width: 250px;

  @media (max-width: 576px) {
    width: 100%;
  }

  svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
  }

  input {
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
    image-rendering: optimizeQuality; /* or try crisp-edges */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
      /*transition: transform 0.3s ease;   Remove the image transition*/
  }

  /*${ProductCard}:hover & img {  Remove the hover scale
    transform: scale(1.05);
  }*/
`;

const CustomBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--gold-primary);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductCategory = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${ProductCard}:hover & {
    color: var(--gold-primary);
  }
`;

const ProductDesigner = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductPrice = styled.div`
  font-weight: 600;
`;

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
    color: var(--text-primary);
  }

  &:hover {
    background-color: rgba(212, 175, 55, 0.1);

    svg {
      color: var(--gold-primary);
    }
  }
`;

const LoadMoreButton = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const DesignerSection = styled.section`
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

const DesignerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const DesignerCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const DesignerImage = styled.div`
  position: relative;
  aspect-ratio: 3/4;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DesignerOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  p {
    opacity: 0.8;
  }
`;

const DesignerInfo = styled.div`
  padding: 1.5rem;

  p {
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }

  .btn-sm {
    display: inline-flex;
    align-items: center;

    svg {
      margin-left: 0.5rem;
    }
  }
`;

const ViewAllDesigners = styled.div`
  text-align: center;
  margin-top: 3rem;

  .btn {
    display: inline-flex;
    align-items: center;

    svg {
      margin-left: 0.5rem;
    }
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

const DetailLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 0.5rem;
  color: var(--gold-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: var(--gold-light);
  }
`;

export default MarketplacePage;