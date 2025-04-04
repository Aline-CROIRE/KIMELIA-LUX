"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FiShoppingBag, FiTag, FiFilter, FiSearch, FiArrowRight, FiHeart, FiX, FiShoppingCart } from "react-icons/fi"
import banner from "../assets/images/mrkbg.webp"
import elegant from "../assets/images/elegant.jpg"
import suit from "../assets/images/suit.jpg"
import summer from "../assets/images/summer.jpg"
import sweater from "../assets/images/sweater.jpg"
import scaf from "../assets/images/scaf.jpg"
import collect from "../assets/images/collect.jpg"
import wedding from "../assets/images/wedding.jpg"
import jacket from "../assets/images/Jacket.jpg"
import KIM from "../assets/images/kim1.png"
import d1 from "../assets/images/hy8.jpg"
import d2 from "../assets/images/hy4.jpg"

// Initial marketplace products data
const initialProducts = [
  {
    id: "P001",
    name: "Elegant Evening Gown",
    designer: "KIM Couture",
    price: 299.99,
    rwfPrice: 299.99 * 1200, // RWF conversion
    stock: 15,
    image: elegant,
    category: "Dresses",
    status: "Active",
    isCustom: false,
    imageSrcSet: `${elegant} 300w, ${elegant} 768w, ${elegant} 1200w`,
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw",
  },
  {
    id: "P002",
    name: "Tailored Business Suit",
    designer: "Modern Tailor",
    price: 399.99,
    rwfPrice: 399.99 * 1200,
    stock: 8,
    image: suit,
    category: "Suits",
    status: "Active",
    isCustom: true,
    imageSrcSet: `${suit} 300w, ${suit} 768w, ${suit} 1200w`,
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw",
  },
  {
    id: "P003",
    name: "Summer Collection Blouse",
    designer: "Fresh Designs",
    price: 89.99,
    rwfPrice: 89.99 * 1200,
    stock: 25,
    image: summer,
    category: "Tops",
    status: "Active",
    isCustom: false,
    imageSrcSet: `${summer} 300w, ${summer} 768w, ${summer} 1200w`,
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw",
  },
  {
    id: "P004",
    name: "Handcrafted Leather Jacket",
    designer: "Artisan Leathers",
    price: 499.99,
    rwfPrice: 499.99 * 1200,
    stock: 5,
    image: jacket,
    category: "Outerwear",
    status: "Active",
    isCustom: true,
    imageSrcSet: `${jacket} 300w, ${jacket} 768w, ${jacket} 1200w`,
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw",
  },
  {
    id: "P005",
    name: "Casual Denim Collection",
    designer: "Urban Style",
    price: 129.99,
    rwfPrice: 129.99 * 1200,
    stock: 18,
    image: collect,
    category: "Jeans",
    status: "Active",
    isCustom: false,
    imageSrcSet: `${collect} 300w, ${collect} 768w, ${collect} 1200w`,
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw",
  },
  {
    id: "P006",
    name: "Silk Evening Scarf",
    designer: "Luxury Accessories",
    price: 79.99,
    rwfPrice: 79.99 * 1200,
    stock: 30,
    image: scaf,
    category: "Accessories",
    status: "Active",
    isCustom: false,
    imageSrcSet: `${scaf} 300w, ${scaf} 768w, ${scaf} 1200w`,
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw",
  },
  {
    id: "P007",
    name: "Custom Wedding Dress",
    designer: "Bridal Dreams",
    price: 1299.99,
    rwfPrice: 1299.99 * 1200,
    stock: 3,
    image: wedding,
    category: "Wedding",
    status: "Active",
    isCustom: true,
    imageSrcSet: `${wedding} 300w, ${wedding} 768w, ${wedding} 1200w`,
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw",
  },
  {
    id: "P008",
    name: "Handmade Wool Sweater",
    designer: "Cozy Knits",
    price: 149.99,
    rwfPrice: 149.99 * 1200,
    stock: 12,
    image: sweater,
    category: "Knitwear",
    status: "Active",
    isCustom: true,
    imageSrcSet: `${sweater} 300w, ${sweater} 768w, ${sweater} 1200w`,
    imageSizes: "(max-width: 300px) 100vw, (max-width: 768px) 50vw, 33.3vw",
  },
]

// Categories
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
]

const MarketplacePage = () => {
  // State for products
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // State for filters
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState(["All Categories"])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 }) // Higher max for RWF
  const [productType, setProductType] = useState({ readyMade: true, custom: true })

  // State for cart and wishlist
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [showCartNotification, setShowCartNotification] = useState(false)

  // State for product detail modal
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductDetail, setShowProductDetail] = useState(false)

  // Load products from localStorage or use initial products
  useEffect(() => {
    setLoading(true)

    try {
      // Try to get products from localStorage (shared with seller dashboard)
      const storedProducts = localStorage.getItem("sellerProducts")

      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts)

        // Add RWF prices if they don't exist
        const productsWithRwf = parsedProducts.map((product) => ({
          ...product,
          rwfPrice: product.rwfPrice || product.price * 1200,
        }))

        setProducts(productsWithRwf)
        setFilteredProducts(productsWithRwf)
      } else {
        // If no products in localStorage, use initial products
        localStorage.setItem("sellerProducts", JSON.stringify(initialProducts))
        setProducts(initialProducts)
        setFilteredProducts(initialProducts)
      }
    } catch (error) {
      console.error("Error loading products:", error)
      // Fallback to initial products if there's an error
      setProducts(initialProducts)
      setFilteredProducts(initialProducts)
    }

    setLoading(false)
  }, [])

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters()
  }, [searchQuery, selectedCategories, priceRange, productType, products])

  // Apply all filters to products
  const applyFilters = () => {
    let result = [...products]

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.designer.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (!selectedCategories.includes("All Categories")) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply price range filter (using RWF price)
    result = result.filter((product) => product.rwfPrice >= priceRange.min && product.rwfPrice <= priceRange.max)

    // Apply product type filter
    if (productType.readyMade && !productType.custom) {
      result = result.filter((product) => !product.isCustom)
    } else if (!productType.readyMade && productType.custom) {
      result = result.filter((product) => product.isCustom)
    }

    setFilteredProducts(result)
  }

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    if (category === "All Categories") {
      setSelectedCategories(["All Categories"])
    } else {
      const newCategories = selectedCategories.filter((c) => c !== "All Categories")

      if (selectedCategories.includes(category)) {
        // Remove category if already selected
        const updatedCategories = newCategories.filter((c) => c !== category)
        setSelectedCategories(updatedCategories.length ? updatedCategories : ["All Categories"])
      } else {
        // Add category if not selected
        setSelectedCategories([...newCategories, category])
      }
    }
  }

  // Handle price range change
  const handlePriceRangeChange = (e) => {
    const { id, value } = e.target
    const field = id === "min-price" ? "min" : "max"

    setPriceRange((prev) => ({
      ...prev,
      [field]: value ? Number(value) : 0,
    }))
  }

  // Handle product type change
  const handleProductTypeChange = (type) => {
    setProductType((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Add to cart functionality
  const addToCart = (product) => {
    // Add to cart
    setCart((prev) => [...prev, product])

    // Show notification
    setShowCartNotification(true)
    setTimeout(() => setShowCartNotification(false), 3000)
  }

  // Add to wishlist functionality
  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id))
    } else {
      setWishlist((prev) => [...prev, product])
    }
  }

  // View product details
  const viewProductDetails = (product) => {
    setSelectedProduct(product)
    setShowProductDetail(true)
  }

  // Close product detail modal
  const closeProductDetail = () => {
    setShowProductDetail(false)
    setSelectedProduct(null)
  }

  // Load more products (simulated)
  const handleLoadMore = () => {
    // This is a simulated load more function
    // In a real app, you would fetch more products from an API
    // For now, we'll just show a notification
    alert("More products would be loaded here in a real application.")
  }

  return (
    <PageContainer>
      {/* Cart Notification */}
      {showCartNotification && (
        <CartNotification>
          <FiShoppingCart size={18} />
          <span>Product added to cart!</span>
          <CloseButton onClick={() => setShowCartNotification(false)}>
            <FiX size={16} />
          </CloseButton>
        </CartNotification>
      )}

      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>Kimelia Luxe Marketplace - Rwanda</h1>
            <p>
              Discover unique fashion, from modern designs to traditional Rwandan craftsmanship. Support local designers
              and tailors.
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
                Connect with Rwandan designers and tailors, offering a range of styles from modern trends to cultural
                heritage.
              </p>
            </FeatureBox>
            <FeatureBox>
              <FeatureIcon>
                <FiTag />
              </FeatureIcon>
              <h3>Secure & Convenient Payments</h3>
              <p>
                Pay safely with Mobile Money (MoMo), credit cards, and other convenient options. Secure transactions
                guaranteed.
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
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <label htmlFor={`category-${index}`}>{category}</label>
                    </FilterOption>
                  ))}
                </FilterOptions>
              </FilterSection>

              <FilterSection>
                <h3>Price Range (RWF)</h3>
                <PriceRange>
                  <PriceInput>
                    <label htmlFor="min-price">Min</label>
                    <input
                      type="number"
                      id="min-price"
                      placeholder="0"
                      value={priceRange.min}
                      onChange={handlePriceRangeChange}
                    />
                  </PriceInput>
                  <PriceInput>
                    <label htmlFor="max-price">Max</label>
                    <input
                      type="number"
                      id="max-price"
                      placeholder="2000000"
                      value={priceRange.max}
                      onChange={handlePriceRangeChange}
                    />
                  </PriceInput>
                </PriceRange>
                <button className="btn btn-outline btn-sm" onClick={applyFilters}>
                  Apply
                </button>
              </FilterSection>

              <FilterSection>
                <h3>Product Type</h3>
                <FilterOptions>
                  <FilterOption>
                    <input
                      type="checkbox"
                      id="ready-made"
                      className="filter-checkbox"
                      checked={productType.readyMade}
                      onChange={() => handleProductTypeChange("readyMade")}
                    />
                    <label htmlFor="ready-made">Ready-made</label>
                  </FilterOption>
                  <FilterOption>
                    <input
                      type="checkbox"
                      id="custom"
                      className="filter-checkbox"
                      checked={productType.custom}
                      onChange={() => handleProductTypeChange("custom")}
                    />
                    <label htmlFor="custom">Custom Design</label>
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
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </SearchBox>
              </ProductsHeader>

              {loading ? (
                <LoadingIndicator>
                  <div className="spinner"></div>
                  <p>Loading products...</p>
                </LoadingIndicator>
              ) : filteredProducts.length > 0 ? (
                <ProductsGrid>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id}>
                      <ProductImage>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          srcSet={product.imageSrcSet}
                          sizes={product.imageSizes}
                        />
                        {product.isCustom && <CustomBadge>Custom Design</CustomBadge>}
                        <ProductActions>
                          <ActionButton
                            onClick={() => toggleWishlist(product)}
                            className={wishlist.some((item) => item.id === product.id) ? "active" : ""}
                          >
                            <FiHeart />
                          </ActionButton>
                          <ActionButton onClick={() => addToCart(product)}>
                            <FiShoppingCart />
                          </ActionButton>
                        </ProductActions>
                      </ProductImage>
                      <ProductInfo>
                        <ProductCategory>{product.category}</ProductCategory>
                        <ProductName>{product.name}</ProductName>
                        <ProductDesigner>{product.designer}</ProductDesigner>
                        <ProductFooter>
                          <ProductPrice>RWF {product.rwfPrice.toFixed(0)}</ProductPrice>
                          <AddToCartButton onClick={() => addToCart(product)}>
                            <FiShoppingBag />
                          </AddToCartButton>
                        </ProductFooter>
                      </ProductInfo>
                      <DetailLink onClick={() => viewProductDetails(product)}>View Details</DetailLink>
                    </ProductCard>
                  ))}
                </ProductsGrid>
              ) : (
                <NoProductsMessage>
                  <FiFilter size={40} />
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search criteria</p>
                </NoProductsMessage>
              )}

              {filteredProducts.length > 0 && (
                <LoadMoreButton>
                  <button className="btn btn-outline" onClick={handleLoadMore}>
                    Load More Products
                  </button>
                </LoadMoreButton>
              )}
            </ProductsContent>
          </ProductsLayout>
        </div>
      </ProductsSection>

      {/* Designer Spotlight */}
      <DesignerSection>
        <div className="container">
          <SectionTitle>
            <h2>Meet Our Designers</h2>
            <p>Discover the creativity and skill of Rwanda's talented fashion designers and tailors.</p>
          </SectionTitle>

          <DesignerGrid>
            <DesignerCard>
              <DesignerImage>
                <img src={KIM || "/placeholder.svg"} alt="Designer Portrait" />
                <DesignerOverlay>
                  <h3>KIM Couture</h3>
                  <p>Evening Wear Specialist</p>
                </DesignerOverlay>
              </DesignerImage>
              <DesignerInfo>
                <p>
                  Specializing in elegant evening wear with a modern twist, KIM's designs have been featured in major
                  fashion events.
                </p>
                <Link to="/marketplace/designers/aline-couture" className="btn btn-outline btn-sm">
                  View Collection <FiArrowRight />
                </Link>
              </DesignerInfo>
            </DesignerCard>

            <DesignerCard>
              <DesignerImage>
                <img src={d1 || "/placeholder.svg"} alt="Designer Portrait" />
                <DesignerOverlay>
                  <h3>Modern Tailor</h3>
                  <p>Bespoke Suits & Formal Wear</p>
                </DesignerOverlay>
              </DesignerImage>
              <DesignerInfo>
                <p>
                  With over 15 years of experience, Modern Tailor creates impeccably fitted suits and formal wear for
                  all occasions.
                </p>
                <Link to="/marketplace/designers/modern-tailor" className="btn btn-outline btn-sm">
                  View Collection <FiArrowRight />
                </Link>
              </DesignerInfo>
            </DesignerCard>

            <DesignerCard>
              <DesignerImage>
                <img src={d2 || "/placeholder.svg"} alt="Designer Portrait" />
                <DesignerOverlay>
                  <h3>Fresh Designs</h3>
                  <p>Contemporary Casual Wear</p>
                </DesignerOverlay>
              </DesignerImage>
              <DesignerInfo>
                <p>
                  Fresh Designs creates contemporary casual wear that combines comfort with style for the modern fashion
                  enthusiast.
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
              Are you a Rwandan fashion designer or tailor? Join our marketplace and showcase your creations to a wider
              audience.
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

      {/* Product Detail Modal */}
      {showProductDetail && selectedProduct && (
        <ProductDetailModal>
          <ProductDetailContent>
            <CloseDetailButton onClick={closeProductDetail}>
              <FiX size={24} />
            </CloseDetailButton>
            <ProductDetailImage>
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.name}
                srcSet={selectedProduct.imageSrcSet}
                sizes={selectedProduct.imageSizes}
              />
            </ProductDetailImage>
            <ProductDetailInfo>
              <ProductDetailCategory>{selectedProduct.category}</ProductDetailCategory>
              <ProductDetailName>{selectedProduct.name}</ProductDetailName>
              <ProductDetailDesigner>{selectedProduct.designer}</ProductDetailDesigner>
              <ProductDetailPrice>
                {selectedProduct.price ? `$${selectedProduct.price.toFixed(2)}` : ""}
                <span className="rwf">RWF {selectedProduct.rwfPrice.toFixed(0)}</span>
              </ProductDetailPrice>
              <ProductDetailDescription>
                This premium {selectedProduct.name.toLowerCase()} is crafted with the finest materials and attention to
                detail.
                {selectedProduct.isCustom
                  ? " As a custom design piece, it can be tailored to your specific measurements and preferences."
                  : " This ready-to-wear piece combines style, comfort, and durability."}
              </ProductDetailDescription>
              <ProductDetailStock>
                <strong>Availability:</strong>{" "}
                {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock} items)` : "Out of Stock"}
              </ProductDetailStock>
              <ProductDetailButtons>
                <AddToCartDetailButton
                  onClick={() => {
                    addToCart(selectedProduct)
                    closeProductDetail()
                  }}
                >
                  <FiShoppingBag /> Add to Cart
                </AddToCartDetailButton>
                <Link to={`/product/${selectedProduct.id}`} className="view-full">
                  View Full Product Page
                </Link>
              </ProductDetailButtons>
            </ProductDetailInfo>
          </ProductDetailContent>
        </ProductDetailModal>
      )}
    </PageContainer>
  )
}

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  position: relative;
`

const CartNotification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: var(--gold-primary, #D4AF37);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  
  &:hover {
    opacity: 0.8;
  }
`

const HeroSection = styled.section`
  background: linear-gradient(to right, rgba(5, 5, 5, 0.4), rgba(12, 0, 0, 0.4)), url(${banner});
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 0;
  text-align: center;
`

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
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  a {
    margin: 0.5rem;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s ease;
  }
  
  .btn-gold {
    background-color: var(--gold-primary, #D4AF37);
    color: white;
    border: none;
    
    &:hover {
      background-color: var(--gold-dark, #AA8C2C);
    }
  }

  .btn-outline {
    border: 2px solid var(--gold-primary, #D4AF37);
    color: var(--gold-primary, #D4AF37);
    background: transparent;
    
    &:hover {
      background-color: rgba(212, 175, 55, 0.1);
    }
  }
`

const FeaturesSection = styled.section`
  padding: 3rem 0;
  background-color: #f9f9f9;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

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
`

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
`

const ProductsSection = styled.section`
  padding: 5rem 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`

const ProductsLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Sidebar = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

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
    background: transparent;
    border: 1px solid var(--gold-primary, #D4AF37);
    color: var(--gold-primary, #D4AF37);
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: rgba(212, 175, 55, 0.1);
    }
  }
`

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FilterOption = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 0.5rem;
  }

  label {
    font-size: 0.875rem;
  }
`

const PriceRange = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

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
`

const ProductsContent = styled.div`
  width: 100%;
`

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
`

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
`

const LoadingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(212, 175, 55, 0.3);
    border-radius: 50%;
    border-top-color: var(--gold-primary, #D4AF37);
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  p {
    color: #666666;
  }
`

const NoProductsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  
  svg {
    color: #ccc;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666666;
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
  image-rendering: optimizeQuality;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ProductActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ProductCard}:hover & {
    opacity: 1;
  }
`

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: #333;
  transition: all 0.2s ease;
  
  &:hover, &.active {
    background-color: var(--gold-primary, #D4AF37);
    color: white;
  }
`

const CustomBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--gold-primary, #D4AF37);
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
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
`

const ProductName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${ProductCard}:hover & {
    color: var(--gold-primary, #D4AF37);
  }
`

const ProductDesigner = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ProductPrice = styled.div`
  font-weight: 600;
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
    color: var(--text-primary);
  }

  &:hover {
    background-color: rgba(212, 175, 55, 0.1);

    svg {
      color: var(--gold-primary, #D4AF37);
    }
  }
`

const LoadMoreButton = styled.div`
  text-align: center;
  margin-top: 3rem;
  
  button {
    padding: 0.75rem 1.5rem;
    background: transparent;
    border: 2px solid var(--gold-primary, #D4AF37);
    color: var(--gold-primary, #D4AF37);
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: rgba(212, 175, 55, 0.1);
    }
  }
`

const DesignerSection = styled.section`
  padding: 5rem 0;
  background-color: #f9f9f9;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`

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
`

const DesignerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const DesignerCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`

const DesignerImage = styled.div`
  position: relative;
  aspect-ratio: 3/4;

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
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  p {
    opacity: 0.8;
  }
`

const DesignerInfo = styled.div`
  padding: 1.5rem;

  p {
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }

  .btn-sm {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid var(--gold-primary, #D4AF37);
    color: var(--gold-primary, #D4AF37);
    border-radius: 4px;
    font-size: 0.875rem;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: rgba(212, 175, 55, 0.1);
    }

    svg {
      margin-left: 0.5rem;
    }
  }
`

const ViewAllDesigners = styled.div`
  text-align: center;
  margin-top: 3rem;

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background-color: var(--gold-primary, #D4AF37);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: var(--gold-dark, #AA8C2C);
    }

    svg {
      margin-left: 0.5rem;
    }
  }
`

const CTASection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(to right, var(--luxury-black, #050505), #1a1a1a);
  color: white;
`

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
`

const DetailLink = styled.button`
  display: block;
  text-align: center;
  margin-top: 0.5rem;
  padding-bottom: 1rem;
  color: var(--gold-primary, #D4AF37);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    color: var(--gold-light, #F5E7A3);
  }
`

const ProductDetailModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`

const ProductDetailContent = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const CloseDetailButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  
  &:hover {
    background: #f5f5f5;
  }
`

const ProductDetailImage = styled.div`
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`

const ProductDetailInfo = styled.div`
  padding: 2rem;
`

const ProductDetailCategory = styled.div`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.5rem;
`

const ProductDetailName = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
`

const ProductDetailDesigner = styled.div`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
`

const ProductDetailPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  
  .rwf {
    display: block;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: normal;
    margin-top: 0.25rem;
  }
`

const ProductDetailDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.8);
`

const ProductDetailStock = styled.div`
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`

const ProductDetailButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .view-full {
    text-align: center;
    padding: 0.75rem 1.5rem;
    background: transparent;
    color: black;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: black;
    }
  }
`

const AddToCartDetailButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
  }
  
  svg {
    font-size: 1rem;
  }
`

export default MarketplacePage

