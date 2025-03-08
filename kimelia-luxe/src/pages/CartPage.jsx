"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { 
  FiShoppingBag, 
  FiTrash2, 
  FiHeart, 
  FiChevronRight, 
  FiArrowLeft,
  FiShoppingCart,
  FiInfo,
  FiCreditCard,
  FiLock
} from "react-icons/fi"
import Button from "../components/common/Button"

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

const CartSection = styled.section`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: black;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 1rem;
    color: #D4AF37;
  }
`

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const CartItems = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`

const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr auto;
  padding: 1rem 1.5rem;
  background: #f9f9f9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: 600;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const CartHeaderItem = styled.div`
  &:nth-child(2), &:nth-child(3), &:nth-child(4) {
    text-align: center;
  }
`

const CartItemsList = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr auto;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(3, auto);
    gap: 0.5rem 1rem;
  }
`

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-column: 1 / -1;
  }
`

const ItemImage = styled.div`
  width: 80px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  background: #f5f5f5;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ItemDetails = styled.div`
  flex: 1;
`

const ItemName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
`

const ItemDesigner = styled.p`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.5rem;
`

const ItemMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
`

const ItemPrice = styled.div`
  font-weight: 600;
  
  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 2;
    
    &::before {
      content: 'Price: ';
      font-weight: normal;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 3;
    justify-content: flex-start;
    
    &::before {
      content: 'Quantity: ';
      font-weight: normal;
      color: rgba(0, 0, 0, 0.6);
      margin-right: 0.5rem;
    }
  }
`

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
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
  width: 40px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 0.9rem;
`

const ItemSubtotal = styled.div`
  font-weight: 600;
  text-align: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 2 / 4;
    flex-direction: column;
  }
`

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    color: rgba(0, 0, 0, 0.7);
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    
    svg {
      color: ${props => props.delete ? '#e53935' : '#D4AF37'};
    }
  }
`

const CartSummary = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: fit-content;
`

const SummaryHeader = styled.div`
  padding: 1.5rem;
  background: #f9f9f9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: 1.25rem;
    margin: 0;
  }
`

const SummaryContent = styled.div`
  padding: 1.5rem;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: ${props => props.total ? 'black' : 'rgba(0, 0, 0, 0.7)'};
  font-weight: ${props => props.total ? '600' : '400'};
  padding-bottom: ${props => props.total ? '1rem' : '0'};
  border-bottom: ${props => props.total ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
  padding-top: ${props => props.total ? '1rem' : '0'};
`

const PromoCode = styled.div`
  display: flex;
  margin: 1.5rem 0;
`

const PromoInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const PromoButton = styled.button`
  padding: 0 1rem;
  background: black;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #333;
  }
`

const CheckoutButton = styled(Button)`
  width: 100%;
  margin-bottom: 1rem;
`

const SecureCheckout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  
  svg {
    margin-right: 0.5rem;
    color: #D4AF37;
  }
`

const PaymentMethods = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
`

const PaymentIcon = styled.div`
  width: 40px;
  height: 24px;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
`

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem 2rem;
`

const EmptyCartIcon = styled.div`
  font-size: 3rem;
  color: rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;
`

const EmptyCartTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const EmptyCartText = styled.p`
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 2rem;
`

const BackToShopping = styled(Link)`
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

const RelatedProducts = styled.div`
  margin-top: 4rem;
`

const RelatedTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`

const RelatedCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const RelatedImage = styled.div`
  height: 220px;
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
const cartItems = [
  {
    id: 1,
    name: "Elegant Silk Evening Gown",
    designer: "KIM Couture",
    price: 299.99,
    quantity: 1,
    color: "Black",
    size: "S",
    image: "/placeholder.svg?height=100&width=80"
  },
  {
    id: 2,
    name: "Designer Scarf",
    designer: "Luxury Accessories",
    price: 79.99,
    quantity: 2,
    color: "Blue",
    size: "One Size",
    image: "/placeholder.svg?height=100&width=80"
  },
  {
    id: 3,
    name: "Tailored Business Suit",
    designer: "Modern Tailor",
    price: 399.99,
    quantity: 1,
    color: "Navy",
    size: "M",
    image: "/placeholder.svg?height=100&width=80"
  }
];

const relatedProducts = [
  {
    id: 1,
    name: "Summer Collection Blouse",
    designer: "Fresh Designs",
    price: 89.99,
    image: "/placeholder.svg?height=220&width=220"
  },
  {
    id: 2,
    name: "Handcrafted Leather Jacket",
    designer: "Artisan Leathers",
    price: 499.99,
    image: "/placeholder.svg?height=220&width=220"
  },
  {
    id: 3,
    name: "Casual Denim Collection",
    designer: "Urban Style",
    price: 129.99,
    image: "/placeholder.svg?height=220&width=220"
  },
  {
    id: 4,
    name: "Silk Evening Scarf",
    designer: "Luxury Accessories",
    price: 79.99,
    image: "/placeholder.svg?height=220&width=220"
  }
];

const CartPage = () => {
  const [items, setItems] = useState(cartItems);
  const isEmpty = items.length === 0;
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const moveToWishlist = (id) => {
    // In a real app, this would add to wishlist and remove from cart
    removeItem(id);
  };
  
  // Calculate totals
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 15.00;
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + shipping + tax;
  
  return (
    <PageWrapper>
      <Breadcrumb>
        <Link to="/">Home</Link>
        <FiChevronRight />
        <Link to="/marketplace">Marketplace</Link>
        <FiChevronRight />
        <span>Shopping Cart</span>
      </Breadcrumb>
      
      <CartSection>
        <PageTitle>
          <FiShoppingBag /> Shopping Cart
        </PageTitle>
        
        {isEmpty ? (
          <EmptyCart>
            <EmptyCartIcon>
              <FiShoppingCart />
            </EmptyCartIcon>
            <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
            <EmptyCartText>Looks like you haven't added any items to your cart yet.</EmptyCartText>
            <Button as={Link} to="/marketplace">
              Continue Shopping
            </Button>
          </EmptyCart>
        ) : (
          <>
            <BackToShopping to="/marketplace">
              <FiArrowLeft /> Continue Shopping
            </BackToShopping>
            
            <CartGrid>
              <CartItems>
                <CartHeader>
                  <CartHeaderItem>Product</CartHeaderItem>
                  <CartHeaderItem>Price</CartHeaderItem>
                  <CartHeaderItem>Quantity</CartHeaderItem>
                  <CartHeaderItem>Subtotal</CartHeaderItem>
                  <CartHeaderItem></CartHeaderItem>
                </CartHeader>
                
                <CartItemsList>
                  {items.map(item => (
                    <CartItem key={item.id}>
                      <ItemInfo>
                        <ItemImage>
                          <img src={item.image || "/placeholder.svg"} alt={item.name} />
                        </ItemImage>
                        <ItemDetails>
                          <ItemName>{item.name}</ItemName>
                          <ItemDesigner>{item.designer}</ItemDesigner>
                          <ItemMeta>
                            <span>Color: {item.color}</span>
                            <span>Size: {item.size}</span>
                          </ItemMeta>
                        </ItemDetails>
                      </ItemInfo>
                      
                      <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                      
                      <ItemQuantity>
                        <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          -
                        </QuantityButton>
                        <QuantityInput
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                        />
                        <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </QuantityButton>
                      </ItemQuantity>
                      
                      <ItemSubtotal>${(item.price * item.quantity).toFixed(2)}</ItemSubtotal>
                      
                      <ItemActions>
                        <ActionButton onClick={() => moveToWishlist(item.id)}>
                          <FiHeart />
                        </ActionButton>
                        <ActionButton delete onClick={() => removeItem(item.id)}>
                          <FiTrash2 />
                        </ActionButton>
                      </ItemActions>
                    </CartItem>
                  ))}
                </CartItemsList>
              </CartItems>
              
              <CartSummary>
                <SummaryHeader>
                  <h2>Order Summary</h2>
                </SummaryHeader>
                
                <SummaryContent>
                  <SummaryRow>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Tax (15%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </SummaryRow>
                  
                  <PromoCode>
                    <PromoInput type="text" placeholder="Promo code" />
                    <PromoButton>Apply</PromoButton>
                  </PromoCode>
                  
                  <SummaryRow total>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </SummaryRow>
                  
                  <CheckoutButton as={Link} to="/marketplace/checkout">
                    Proceed to Checkout
                  </CheckoutButton>
                  
                  <SecureCheckout>
                    <FiLock /> Secure Checkout
                  </SecureCheckout>
                  
                  <PaymentMethods>
                    <PaymentIcon>VISA</PaymentIcon>
                    <PaymentIcon>MC</PaymentIcon>
                    <PaymentIcon>AMEX</PaymentIcon>
                    <PaymentIcon>MOMO</PaymentIcon>
                    <PaymentIcon>PAYP</PaymentIcon>
                  </PaymentMethods>
                </SummaryContent>
              </CartSummary>
            </CartGrid>
            
            <RelatedProducts>
              <RelatedTitle>You May Also Like</RelatedTitle>
              <RelatedGrid>
                {relatedProducts.map(product => (
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
            </RelatedProducts>
          </>
        )}
      </CartSection>
    </PageWrapper>
  );
};

export default CartPage;
