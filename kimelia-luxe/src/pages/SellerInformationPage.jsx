import styled from "styled-components"
import { Link } from "react-router-dom"
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiDollarSign,
  FiPercent,
  FiClock,
  FiShield,
  FiTruck,
  FiHelpCircle,
} from "react-icons/fi"

const PageContainer = styled.div`
  background: white;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`

const HeaderSection = styled.section`
  background: linear-gradient(to right, #000, #333);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
`

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const PageDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
`

const ContentSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: #D4AF37;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    color: #000;
  }
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #000;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: #D4AF37;
  }
`

const InfoCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #000;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: #D4AF37;
  }
`

const InfoContent = styled.div`
  color: #555;
  line-height: 1.8;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.8rem;
      position: relative;
      
      &:before {
        content: '•';
        color: #D4AF37;
        font-weight: bold;
        position: absolute;
        left: -1rem;
      }
    }
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: #D4AF37;
  margin-bottom: 1rem;
`

const FeatureTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: #000;
`

const FeatureDescription = styled.p`
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
`

const TableHead = styled.thead`
  background: #f0f0f0;
  
  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #000;
    border-bottom: 2px solid #D4AF37;
  }
`

const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background: #f9f9f9;
    }
    
    td {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      color: #555;
    }
  }
`

const CTABOX = styled.div`
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 100%);
  border: 1px solid #D4AF37;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  margin-top: 4rem;
  color: white;
`

const CTATitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #D4AF37;
`

const CTAText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
`

const CTAButton = styled(Link)`
  background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
  color: black;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    margin-left: 0.5rem;
  }
`

const SellerInformationPage = () => {
  return (
    <PageContainer>
      <HeaderSection>
        <HeaderContent>
          <PageTitle>Seller Information</PageTitle>
          <PageDescription>
            Learn more about selling on Kimelia Luxe, our commission structure, and the benefits of joining our
            marketplace.
          </PageDescription>
        </HeaderContent>
      </HeaderSection>

      <ContentSection>
        <BackLink to="/seller">
          <FiArrowLeft /> Back to Seller Home
        </BackLink>

        <InfoCard>
          <InfoTitle>
            <FiDollarSign /> Commission Structure
          </InfoTitle>
          <InfoContent>
            <p>
              At Kimelia Luxe, we believe in a transparent and fair commission structure that rewards sellers for their
              quality products and sales performance.
            </p>

            <Table>
              <TableHead>
                <tr>
                  <th>Sales Volume (Monthly)</th>
                  <th>Commission Rate</th>
                  <th>You Keep</th>
                </tr>
              </TableHead>
              <TableBody>
                <tr>
                  <td>$0 - $1,000</td>
                  <td>15%</td>
                  <td>85%</td>
                </tr>
                <tr>
                  <td>$1,001 - $5,000</td>
                  <td>12%</td>
                  <td>88%</td>
                </tr>
                <tr>
                  <td>$5,001 - $10,000</td>
                  <td>10%</td>
                  <td>90%</td>
                </tr>
                <tr>
                  <td>$10,001+</td>
                  <td>8%</td>
                  <td>92%</td>
                </tr>
              </TableBody>
            </Table>

            <p>
              Our tiered commission structure rewards higher sales volumes with lower commission rates, allowing you to
              maximize your earnings as your business grows on our platform.
            </p>
          </InfoContent>
        </InfoCard>

        <InfoCard>
          <InfoTitle>
            <FiPercent /> Fees and Payments
          </InfoTitle>
          <InfoContent>
            <p>
              We strive to keep our fee structure simple and transparent so you can focus on what you do best: creating
              amazing fashion products.
            </p>

            <ul>
              <li>
                <strong>No listing fees:</strong> It's free to list your products on Kimelia Luxe.
              </li>
              <li>
                <strong>No monthly subscription:</strong> We don't charge any recurring fees to maintain your seller
                account.
              </li>
              <li>
                <strong>Payment processing:</strong> Payment processing fees are included in the commission rate.
              </li>
              <li>
                <strong>Payout schedule:</strong> Payments are processed every two weeks for all completed orders.
              </li>
              <li>
                <strong>Payment methods:</strong> We support bank transfers, mobile money, and PayPal for seller
                payouts.
              </li>
              <li>
                <strong>Minimum payout:</strong> The minimum payout amount is $50. Balances below this amount will roll
                over to the next payout period.
              </li>
            </ul>
          </InfoContent>
        </InfoCard>

        <SectionTitle>Seller Benefits</SectionTitle>

        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <FiCheck />
            </FeatureIcon>
            <FeatureTitle>Dedicated Seller Dashboard</FeatureTitle>
            <FeatureDescription>
              Access a comprehensive dashboard to manage your products, track orders, view analytics, and monitor your
              performance in real-time.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiTruck />
            </FeatureIcon>
            <FeatureTitle>Shipping Integration</FeatureTitle>
            <FeatureDescription>
              Connect with our shipping partners to get discounted rates, print labels, and track shipments directly
              from your seller dashboard.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiClock />
            </FeatureIcon>
            <FeatureTitle>Automated Processes</FeatureTitle>
            <FeatureDescription>
              Save time with automated inventory management, order processing, and customer notifications to streamline
              your operations.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FiShield />
            </FeatureIcon>
            <FeatureTitle>Seller Protection</FeatureTitle>
            <FeatureDescription>
              Our seller protection program helps safeguard against fraudulent orders and unfair customer claims to
              protect your business.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>

        <InfoCard>
          <InfoTitle>
            <FiHelpCircle /> Seller Support
          </InfoTitle>
          <InfoContent>
            <p>
              We're committed to your success on Kimelia Luxe. Our dedicated seller support team is available to help
              you with any questions or issues you may encounter.
            </p>

            <ul>
              <li>
                <strong>Dedicated account manager:</strong> Sellers with monthly sales over $5,000 receive a dedicated
                account manager for personalized support.
              </li>
              <li>
                <strong>Seller community:</strong> Connect with other sellers to share tips, experiences, and best
                practices.
              </li>
              <li>
                <strong>Knowledge base:</strong> Access comprehensive guides, tutorials, and resources to help you
                optimize your shop.
              </li>
              <li>
                <strong>Priority support:</strong> Get faster response times for urgent issues that affect your ability
                to sell.
              </li>
              <li>
                <strong>Training webinars:</strong> Participate in regular webinars on topics like product photography,
                pricing strategies, and marketing.
              </li>
            </ul>
          </InfoContent>
        </InfoCard>

        <CTABOX>
          <CTATitle>Ready to Join Kimelia Luxe?</CTATitle>
          <CTAText>
            Apply now to become a seller and start showcasing your fashion creations to our global audience.
          </CTAText>
          <CTAButton to="/seller/apply">
            Apply as a Seller <FiArrowRight />
          </CTAButton>
        </CTABOX>
      </ContentSection>
    </PageContainer>
  )
}

export default SellerInformationPage

