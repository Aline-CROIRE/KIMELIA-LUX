"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FiShoppingCart, FiHeart, FiShare2, FiChevronRight, FiStar, FiCheck } from "react-icons/fi"
import styled from "styled-components"
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
  margin-bottom: 1rem;
  color: black;
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

// Mock data
const product = {
  id: 1,
  name: "Elegant Silk Evening Dress",
  category: "Women / Dresses / Evening",
  price: 199.99,
  originalPrice: 249.99,
  discount: "20%",
  rating: 4.8,
  reviewCount: 24,
  description:
    "This stunning silk evening dress features a flattering A-line silhouette with delicate embroidery details. Perfect for formal events and special occasions, this dress combines timeless elegance with modern design elements.",
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
  sku: "ED-12345",
  designer: "Kimelia Collection",
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
    price: 149.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 3,
    name: "Embroidered Gown",
    price: 229.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 4,
    name: "Satin Wrap Dress",
    price: 179.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 5,
    name: "Beaded Evening Dress",
    price: 259.99,
    image: "/placeholder.svg?height=250&width=250",
  },
]

const ProductDetailPage = () => {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

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
              <FiShoppingCart style={{ marginRight: "0.5rem" }} /> Add to Cart
            </AddToCartButton>
            <Button variant="outline">Try it On (Virtual Fitting)</Button>
          </ProductOptions>

          <ProductFeatures>
            <OptionTitle>Product Features</OptionTitle>
            <FeaturesList>
              {product.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FiCheck /> {feature}
                </FeatureItem>
              ))}
            </FeaturesList>
          </ProductFeatures>

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
                <RelatedPrice>${product.price}</RelatedPrice>
              </RelatedInfo>
            </RelatedCard>
          ))}
        </RelatedGrid>
      </RelatedSection>
    </PageWrapper>
  )
}

export default ProductDetailPage

