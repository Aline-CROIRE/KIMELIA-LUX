"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { 
  FiShoppingBag, 
  FiHeart, 
  FiShare2, 
  FiChevronRight, 
  FiStar, 
  FiCheck, 
  FiArrowLeft,
  FiTruck,
  FiShield,
  FiRefreshCw
} from "react-icons/fi"
import Button from "../../components/common/Button"

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

const ProductSection = styled.section`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProductGallery = styled.div`
  position: relative;
`

const MainImage = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? "#D4AF37" : "transparent")};
  transition: border 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: ${(props) => (props.active ? "#D4AF37" : "rgba(0, 0, 0, 0.2)")};
  }
`

const ProductActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  svg {
    color: black;
  }

  &:hover {
    background: #D4AF37;
    transform: translateY(-2px);
    
    svg {
      color: white;
    }
  }
`

const ProductInfo = styled.div``

const ProductCategory = styled.div`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.5rem;
`

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: black;
`

const ProductDesigner = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  
  a {
    color: #D4AF37;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`

const Stars = styled.div`
  display: flex;
  margin-right: 0.5rem;

  svg {
    color: #FFC107;
    margin-right: 0.2rem;
  }
`

const ReviewCount = styled.span`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
`

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: black;

  .original-price {
    text-decoration: line-through;
    color: rgba(0, 0, 0, 0.5);
    font-size: 1.1rem;
    margin-right: 0.5rem;
  }

  .discount {
    background: #D4AF37;
    color: black;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }
`

const ProductDescription = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.8);
`

const ProductOptions = styled.div`
  margin-bottom: 2rem;
`

const OptionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: black;
`

const ColorOptions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`

const ColorOption = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? "black" : "transparent")};
  transition: transform 0.3s ease, border 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`

const SizeOptions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`

const SizeOption = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.selected ? "black" : "rgba(0, 0, 0, 0.2)")};
  background: ${(props) => (props.selected ? "black" : "transparent")};
  color: ${(props) => (props.selected ? "white" : "black")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: black;
  }

  &.out-of-stock {
    opacity: 0.5;
    cursor: not-allowed;
    text-decoration: line-through;
  }
`

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 1rem;
`

const AddToCartButton = styled(Button)`
  width: 100%;
  margin-bottom: 1rem;
`

const ProductMeta = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`

const MetaItem = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
`

const MetaLabel = styled.span`
  width: 100px;
  color: rgba(0, 0, 0, 0.6);
`

const MetaValue = styled.span`
  color: black;
`

const ProductFeatures = styled.div`
  margin-top: 2rem;
`

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  svg {
    color: #D4AF37;
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
`

const CustomizationSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.3);
`

const CustomizationTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: #D4AF37;
  }
`

const CustomizationText = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
`

const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
`

const ShippingItem = styled.div`
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

const RelatedSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 2rem;
  color: black;
  text-align: center;
`

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`

const RelatedCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`

const RelatedImage = styled.div`
  height: 250px;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const RelatedInfo = styled.div`
  padding: 1rem;
`

const RelatedName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const RelatedPrice = styled.div`
  font-weight: 600;
`

const TabsContainer = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #D4AF37;
  }
`

const TabButton = styled.button`
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#D4AF37' : 'transparent'};
  color: ${props => props.active ? 'black' : 'rgba(0, 0, 0, 0.6)'};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: black;
  }
`

const TabContent = styled.div`
  line-height: 1.6;
`

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const ReviewCard = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background: #f9f9f9;
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ReviewerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ReviewerName = styled.div`
  font-weight: 600;
`

const ReviewDate = styled.div`
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.6);
`

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    color: #FFC107;
    margin-right: 0.2rem;
  }
`

const ReviewText = styled.p`
  margin: 0;
`

const BackToProducts = styled(Link)`
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
const product = {
  id: 1,
  name: "Elegant Silk Evening Gown",
  designer: "KIM Couture",
  category: "Dresses / Evening Wear",
  price: 299.99,
  originalPrice: 349.99,
  discount: "15%",
  rating: 4.8,
  reviewCount: 24,
  description:
    "This stunning silk evening gown features a flattering A-line silhouette with delicate embroidery details. Perfect for formal events and special occasions, this dress combines timeless elegance with modern design elements.",
  colors: [
    { id: 1, name: "Black", code: "#000000", selected: true },
    { id: 2, name: "Navy Blue", code: "#000080", selected: false },
    { id: 3, name: "Burgundy", code: "#800020", selected: false },
    { id: 4, name: "Emerald", code: "#50C878", selected: false },
  ],
  sizes: [
    { id: 1, name: "XS", available: true, selected: false },
    { id: 2, name: "S", available: true, selected: true },
    { id: 3, name: "M", available: true, selected: false },
    { id: 4, name: "L", available: true, selected: false },
    { id: 5, name: "XL", available: false, selected: false },
  ],
  features: [
    "100% Premium Silk Material",
    "Hand-embroidered Details",
    "Fully Lined Interior",
    "Hidden Side Zipper",
    "Designed and Made in Rwanda",
  ],
  isCustom: true,
  sku: "ED-12345",
  designer: "KIM Couture",
  images: [
    "/placeholder.svg?height=500&width=400",
    "/placeholder.svg?height=500&width=400",
    "/placeholder.svg?height=500&width=400",
    "/placeholder.svg?height=500&width=400",
  ],
}

const relatedProducts = [
  {
    id: 2,
    name: "Silk Cocktail Dress",
    designer: "KIM Couture",
    price: 149.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 3,
    name: "Embroidered Gown",
    designer: "Bridal Dreams",
    price: 229.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 4,
    name: "Satin Wrap Dress",
    designer: "Fresh Designs",
    price: 179.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 5,
    name: "Beaded Evening Dress",
    designer: "KIM Couture",
    price: 259.99,
    image: "/placeholder.svg?height=250&width=250",
  },
]

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "August 15, 2023",
    rating: 5,
    text: "This dress exceeded my expectations! The quality of the silk is exceptional, and the fit is perfect. I received so many compliments when I wore it to a gala event. Definitely worth the investment."
  },
  {
    id: 2,
    name: "Michael Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "July 28, 2023",
    rating: 4,
    text: "Purchased this for my wife and she absolutely loves it. The craftsmanship is excellent and the design is elegant. The only reason for 4 stars instead of 5 is that the delivery took longer than expected."
  },
  {
    id: 3,
    name: "Emily Parker",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "June 10, 2023",
    rating: 5,
    text: "The customization options made this purchase special. I was able to adjust the length and neckline to my preferences. The final product is stunning and fits like it was made for me - because it was!"
  }
]

const ProductDetailPage = () => {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const handleColorSelect = (colorId) => {
    // In a real app, you would update the state here
    console.log(`Selected color: ${colorId}`)
  }

  const handleSizeSelect = (sizeId) => {
    // In a real app, you would update the state here
    console.log(`Selected size: ${sizeId}`)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <PageWrapper>
      <Breadcrumb>
        <Link to="/">Home</Link>
        <FiChevronRight />
        <Link to="/marketplace">Marketplace</Link>
        <FiChevronRight />
        <Link to="/marketplace/dresses">Dresses</Link>
        <FiChevronRight />
        <span>{product.name}</span>
      </Breadcrumb>

      <ProductSection>
        <ProductGallery>
          <BackToProducts to="/marketplace">
            <FiArrowLeft /> Back to Products
          </BackToProducts>
          
          <MainImage>
            <img src={product.images[activeImage] || "/placeholder.svg"} alt={product.name} />
          </MainImage>
          <ThumbnailsContainer>
            {product.images.map((image, index) => (
              <Thumbnail key={index} active={activeImage === index} onClick={() => setActiveImage(index)}>
                <img src={image || "/placeholder.svg"} alt={`${product.name} - View ${index + 1}`} />
              </Thumbnail>
            ))}
          </ThumbnailsContainer>
          <ProductActions>
            <ActionButton>
              <FiHeart />
            </ActionButton>
            <ActionButton>
              <FiShare2 />
            </ActionButton>
          </ProductActions>
        </ProductGallery>

        <ProductInfo>
          <ProductCategory>{product.category}</ProductCategory>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductDesigner>By <Link to={`/marketplace/designers/${product.designer.toLowerCase().replace(/\s+/g, '-')}`}>{product.designer}</Link></ProductDesigner>
          <ProductRating>
            <Stars>
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} fill={i < Math.floor(product.rating) ? "#FFC107" : "none"} />
              ))}
            </Stars>
            <ReviewCount>
              {product.rating} ({product.reviewCount} reviews)
            </ReviewCount>
          </ProductRating>
          <ProductPrice>
            {product.originalPrice && <span className="original-price">${product.originalPrice}</span>}${product.price}
            {product.discount && <span className="discount">{product.discount} OFF</span>}
          </ProductPrice>
          <ProductDescription>
            <p>{product.description}</p>
          </ProductDescription>

          <ProductOptions>
            <OptionTitle>Color</OptionTitle>
            <ColorOptions>
              {product.colors.map((color) => (
                <ColorOption
                  key={color.id}
                  color={color.code}
                  selected={color.selected}
                  onClick={() => handleColorSelect(color.id)}
                />
              ))}
            </ColorOptions>

            <OptionTitle>Size</OptionTitle>
            <SizeOptions>
              {product.sizes.map((size) => (
                <SizeOption
                  key={size.id}
                  selected={size.selected}
                  className={!size.available ? "out-of-stock" : ""}
                  onClick={() => size.available && handleSizeSelect(size.id)}
                >
                  {size.name}
                </SizeOption>
              ))}
            </SizeOptions>

            <OptionTitle>Quantity</OptionTitle>
            <QuantitySelector>
              <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
              <QuantityInput
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                min="1"
              />
              <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
            </QuantitySelector>

            <AddToCartButton>
              <FiShoppingBag style={{ marginRight: "0.5rem" }} /> Add to Cart
            </AddToCartButton>
            <Button variant="outline">
              <FiHeart style={{ marginRight: "0.5rem" }} /> Add to Wishlist
            </Button>
          </ProductOptions>

          {product.isCustom && (
            <CustomizationSection>
              <CustomizationTitle>
                <FiCheck /> Custom Design Available
              </CustomizationTitle>
              <CustomizationText>
                This item can be customized to your specifications. Adjust measurements, choose different fabrics, or request design modifications.
              </CustomizationText>
              <Button variant="outline">Request Customization</Button>
            </CustomizationSection>
          )}

          <ShippingInfo>
            <ShippingItem>
              <FiTruck />
              <div>
                <h4>Free Shipping</h4>
                <p>On orders over $200 (Domestic only)</p>
              </div>
            </ShippingItem>
            <ShippingItem>
              <FiShield />
              <div>
                <h4>Secure Payment</h4>
                <p>Multiple payment options available</p>
              </div>
            </ShippingItem>
            <ShippingItem>
              <FiRefreshCw />
              <div>
                <h4>30-Day Returns</h4>
                <p>Shop with confidence</p>
              </div>
            </ShippingItem>
          </ShippingInfo>

          <ProductMeta>
            <MetaItem>
              <MetaLabel>SKU:</MetaLabel>
              <MetaValue>{product.sku}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Designer:</MetaLabel>
              <MetaValue>{product.designer}</MetaValue>
            </MetaItem>
          </ProductMeta>
        </ProductInfo>
      </ProductSection>

      <TabsContainer>
        <TabsHeader>
          <TabButton 
            active={activeTab === "description"} 
            onClick={() => setActiveTab("description")}
          >
            Description
          </TabButton>
          <TabButton 
            active={activeTab === "features"} 
            onClick={() => setActiveTab("features")}
          >
            Features & Materials
          </TabButton>
          <TabButton 
            active={activeTab === "reviews"} 
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </TabButton>
          <TabButton 
            active={activeTab === "shipping"} 
            onClick={() => setActiveTab("shipping")}
          >
            Shipping & Returns
          </TabButton>
        </TabsHeader>
        
        <TabContent>
          {activeTab === "description" && (
            <div>
              <p>{product.description}</p>
              <p>This elegant evening gown is designed to make you stand out at any formal event. The premium silk material drapes beautifully, creating a flattering silhouette that moves gracefully with every step. The hand-embroidered details add a touch of luxury and uniqueness to this already stunning piece.</p>
              <p>Available in multiple colors, this versatile gown can be styled for various occasions from black-tie events to wedding receptions. Pair with statement jewelry and elegant heels for a complete sophisticated look.</p>
            </div>
          )}
          
          {activeTab === "features" && (
            <ProductFeatures>
              <FeaturesList>
                {product.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FiCheck /> {feature}
                  </FeatureItem>
                ))}
              </FeaturesList>
              <p style={{ marginTop: "1.5rem" }}>This gown is crafted from 100% premium silk, known for its luxurious feel and beautiful drape. The fabric has a subtle sheen that catches the light elegantly. The interior is fully lined with a soft, breathable material for comfort throughout wear.</p>
              <p>Care instructions: Dry clean only. Store on a padded hanger to maintain shape.</p>
            </ProductFeatures>
          )}
          
          {activeTab === "reviews" && (
            <ReviewsContainer>
              {reviews.map(review => (
                <ReviewCard key={review.id}>
                  <ReviewHeader>
                    <ReviewerInfo>
                      <ReviewerAvatar>
                        <img src={review.avatar || "/placeholder.svg"} alt={review.name} />
                      </ReviewerAvatar>
                      <div>
                        <ReviewerName>{review.name}</ReviewerName>
                        <ReviewDate>{review.date}</ReviewDate>
                      </div>
                    </ReviewerInfo>
                    <ReviewRating>
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} fill={i < review.rating ? "#FFC107" : "none"} />
                      ))}
                    </ReviewRating>
                  </ReviewHeader>
                  <ReviewText>{review.text}</ReviewText>
                </ReviewCard>
              ))}
              
              <Button variant="outline">Write a Review</Button>
            </ReviewsContainer>
          )}
          
          {activeTab === "shipping" && (
            <div>
              <h3>Shipping Information</h3>
              <p>We offer the following shipping options:</p>
              <ul>
                <li><strong>Standard Shipping:</strong> 5-7 business days (Free on orders over $200)</li>
                <li><strong>Express Shipping:</strong> 2-3 business days ($15)</li>
                <li><strong>Next Day Delivery:</strong> Next business day if ordered before 2pm ($25)</li>
              </ul>
              <p>International shipping is available to select countries. Shipping times and fees vary by location.</p>
              
              <h3>Returns Policy</h3>
              <p>We accept returns within 30 days of delivery. Items must be unworn, unwashed, and with all original tags attached. Custom-designed pieces have special return conditions and may be subject to a restocking fee.</p>
              <p>To initiate a return, please contact our customer service team through the <Link to="/contact" style={{ color: "#D4AF37" }}>Contact Page</Link>.</p>
            </div>
          )}
        </TabContent>
      </TabsContainer>

      <RelatedSection>
        <SectionTitle>You May Also Like</SectionTitle>
        <RelatedGrid>
          {relatedProducts.map((product) => (
            <RelatedCard key={product.id}>
              <RelatedImage>
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
              </RelatedImage>
              <RelatedInfo>
                <RelatedName>{product.name}</RelatedName>
                <div style={{ fontSize: "0.9rem", color: "rgba(0, 0, 0, 0.6)", marginBottom: "0.5rem" }}>{product.designer}</div>
                <RelatedPrice>${product.price.toFixed(2)}</RelatedPrice>
              </RelatedInfo>
            </RelatedCard>
          ))}
        </RelatedGrid>
      </RelatedSection>
    </PageWrapper>
  )
}

export default ProductDetailPage
