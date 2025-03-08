"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FiChevronRight, FiCreditCard, FiShield, FiCheck } from "react-icons/fi"
import styled from "styled-components"
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

const CheckoutSection = styled.section`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: black;
`

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const CheckoutForm = styled.div``

const CheckoutSummary = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
`

const FormSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: black;
  display: flex;
  align-items: center;

  .section-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #D4AF37;
    color: black;
    font-size: 0.9rem;
    margin-right: 0.75rem;
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const FormRow = styled.div`
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const PaymentOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const PaymentOption = styled.div`
  flex: 1;
  min-width: 120px;
  border: 1px solid ${(props) => (props.selected ? "#D4AF37" : "rgba(0, 0, 0, 0.2)")};
  border-radius: 4px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;

  &:hover {
    border-color: #D4AF37;
  }

  .check-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: #D4AF37;
    opacity: ${(props) => (props.selected ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`

const PaymentIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`

const PaymentName = styled.div`
  font-size: 0.9rem;
`

const SummaryTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: black;
`

const SummaryItems = styled.div`
  margin-bottom: 1.5rem;
`

const SummaryItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
`

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
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

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`

const ItemVariant = styled.div`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.25rem;
`

const ItemPrice = styled.div`
  font-size: 0.9rem;
`

const SummaryTotals = styled.div`
  margin-bottom: 1.5rem;
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: ${(props) => (props.final ? "black" : "rgba(0, 0, 0, 0.7)")};
  font-weight: ${(props) => (props.final ? "600" : "400")};
  padding-bottom: ${(props) => (props.final ? "0.75rem" : "0")};
  border-bottom: ${(props) => (props.final ? "1px solid rgba(0, 0, 0, 0.1)" : "none")};
`

const PlaceOrderButton = styled(Button)`
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
  }
`

const PromoCode = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
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

const ShippingOptions = styled.div`
  margin-bottom: 1.5rem;
`

const ShippingOption = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${(props) => (props.selected ? "#D4AF37" : "rgba(0, 0, 0, 0.2)")};
  border-radius: 4px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #D4AF37;
  }
`

const ShippingRadio = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.selected ? "#D4AF37" : "rgba(0, 0, 0, 0.3)")};
  margin-right: 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #D4AF37;
    opacity: ${(props) => (props.selected ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`

const ShippingInfo = styled.div`
  flex: 1;
`

const ShippingName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`

const ShippingDescription = styled.div`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
`

const ShippingPrice = styled.div`
  font-weight: 500;
`

// Mock data
const cartItems = [
  {
    id: 1,
    name: "Elegant Silk Evening Dress",
    variant: "Black / Size S",
    price: 199.99,
    quantity: 1,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Designer Scarf",
    variant: "Floral Pattern",
    price: 49.99,
    quantity: 1,
    image: "/placeholder.svg?height=60&width=60",
  },
]

const shippingOptions = [
  {
    id: 1,
    name: "Standard Shipping",
    description: "Delivery in 5-7 business days",
    price: 9.99,
  },
  {
    id: 2,
    name: "Express Shipping",
    description: "Delivery in 2-3 business days",
    price: 19.99,
  },
  {
    id: 3,
    name: "Next Day Delivery",
    description: "Order before 2pm for next day delivery",
    price: 29.99,
  },
]

const paymentMethods = [
  {
    id: 1,
    name: "Credit Card",
    icon: FiCreditCard,
  },
  {
    id: 2,
    name: "Mobile Money",
    icon: FiCreditCard,
  },
  {
    id: 3,
    name: "PayPal",
    icon: FiCreditCard,
  },
]

const CheckoutPage = () => {
  const [selectedShipping, setSelectedShipping] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState(1)

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = shippingOptions.find((option) => option.id === selectedShipping)?.price || 0
  const tax = subtotal * 0.15 // 15% tax
  const total = subtotal + shipping + tax

  return (
    <PageWrapper>
      <Breadcrumb>
        <Link to="/">Home</Link>
        <FiChevronRight />
        <Link to="/cart">Shopping Cart</Link>
        <FiChevronRight />
        <span>Checkout</span>
      </Breadcrumb>

      <CheckoutSection>
        <PageTitle>Checkout</PageTitle>

        <CheckoutGrid>
          <CheckoutForm>
            <FormSection>
              <SectionTitle>
                <span className="section-number">1</span> Contact Information
              </SectionTitle>
              <FormGrid>
                <FormRow>
                  <FormLabel>First Name</FormLabel>
                  <FormInput type="text" placeholder="Your first name" />
                </FormRow>
                <FormRow>
                  <FormLabel>Last Name</FormLabel>
                  <FormInput type="text" placeholder="Your last name" />
                </FormRow>
                <FormRow fullWidth>
                  <FormLabel>Email Address</FormLabel>
                  <FormInput type="email" placeholder="Your email address" />
                </FormRow>
                <FormRow fullWidth>
                  <FormLabel>Phone Number</FormLabel>
                  <FormInput type="tel" placeholder="Your phone number" />
                </FormRow>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <span className="section-number">2</span> Shipping Address
              </SectionTitle>
              <FormGrid>
                <FormRow fullWidth>
                  <FormLabel>Street Address</FormLabel>
                  <FormInput type="text" placeholder="Your street address" />
                </FormRow>
                <FormRow fullWidth>
                  <FormLabel>Apartment, Suite, etc. (optional)</FormLabel>
                  <FormInput type="text" placeholder="Apartment, suite, unit, etc." />
                </FormRow>
                <FormRow>
                  <FormLabel>City</FormLabel>
                  <FormInput type="text" placeholder="Your city" />
                </FormRow>
                <FormRow>
                  <FormLabel>State/Province</FormLabel>
                  <FormInput type="text" placeholder="Your state or province" />
                </FormRow>
                <FormRow>
                  <FormLabel>Postal Code</FormLabel>
                  <FormInput type="text" placeholder="Your postal code" />
                </FormRow>
                <FormRow>
                  <FormLabel>Country</FormLabel>
                  <FormSelect>
                    <option value="">Select a country</option>
                    <option value="RW">Rwanda</option>
                    <option value="KE">Kenya</option>
                    <option value="UG">Uganda</option>
                    <option value="TZ">Tanzania</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                  </FormSelect>
                </FormRow>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <span className="section-number">3</span> Shipping Method
              </SectionTitle>
              <ShippingOptions>
                {shippingOptions.map((option) => (
                  <ShippingOption
                    key={option.id}
                    selected={selectedShipping === option.id}
                    onClick={() => setSelectedShipping(option.id)}
                  >
                    <ShippingRadio selected={selectedShipping === option.id} />
                    <ShippingInfo>
                      <ShippingName>{option.name}</ShippingName>
                      <ShippingDescription>{option.description}</ShippingDescription>
                    </ShippingInfo>
                    <ShippingPrice>${option.price.toFixed(2)}</ShippingPrice>
                  </ShippingOption>
                ))}
              </ShippingOptions>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <span className="section-number">4</span> Payment Method
              </SectionTitle>
              <PaymentOptions>
                {paymentMethods.map((method) => (
                  <PaymentOption
                    key={method.id}
                    selected={selectedPayment === method.id}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="check-icon">
                      <FiCheck />
                    </div>
                    <PaymentIcon>
                      <method.icon />
                    </PaymentIcon>
                    <PaymentName>{method.name}</PaymentName>
                  </PaymentOption>
                ))}
              </PaymentOptions>

              {selectedPayment === 1 && (
                <FormGrid>
                  <FormRow fullWidth>
                    <FormLabel>Card Number</FormLabel>
                    <FormInput type="text" placeholder="1234 5678 9012 3456" />
                  </FormRow>
                  <FormRow>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormInput type="text" placeholder="MM/YY" />
                  </FormRow>
                  <FormRow>
                    <FormLabel>Security Code (CVV)</FormLabel>
                    <FormInput type="text" placeholder="123" />
                  </FormRow>
                  <FormRow fullWidth>
                    <FormLabel>Name on Card</FormLabel>
                    <FormInput type="text" placeholder="Name as it appears on your card" />
                  </FormRow>
                </FormGrid>
              )}

              {selectedPayment === 2 && (
                <FormGrid>
                  <FormRow fullWidth>
                    <FormLabel>Mobile Money Number</FormLabel>
                    <FormInput type="tel" placeholder="Your mobile money number" />
                  </FormRow>
                </FormGrid>
              )}
            </FormSection>
          </CheckoutForm>

          <CheckoutSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItems>
              {cartItems.map((item) => (
                <SummaryItem key={item.id}>
                  <ItemImage>
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </ItemImage>
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemVariant>{item.variant}</ItemVariant>
                    <ItemPrice>
                      ${item.price.toFixed(2)} × {item.quantity}
                    </ItemPrice>
                  </ItemDetails>
                </SummaryItem>
              ))}
            </SummaryItems>

            <PromoCode>
              <PromoInput type="text" placeholder="Promo code" />
              <PromoButton>Apply</PromoButton>
            </PromoCode>

            <SummaryTotals>
              <TotalRow>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </TotalRow>
              <TotalRow>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </TotalRow>
              <TotalRow>
                <span>Tax (15%)</span>
                <span>${tax.toFixed(2)}</span>
              </TotalRow>
              <TotalRow final>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </TotalRow>
            </SummaryTotals>

            <PlaceOrderButton>Place Order</PlaceOrderButton>
            <SecureCheckout>
              <FiShield /> Secure Checkout
            </SecureCheckout>
          </CheckoutSummary>
        </CheckoutGrid>
      </CheckoutSection>
    </PageWrapper>
  )
}

export default CheckoutPage

