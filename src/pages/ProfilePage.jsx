import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiHeart, FiEdit, FiSettings, FiLogOut } from 'react-icons/fi';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

const PageWrapper = styled.div`
  background: white;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const ProfileHeader = styled.section`
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
  padding: 4rem 2rem;
  text-align: center;
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #D4AF37;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 4px solid white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .edit-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #D4AF37;
    }
  }
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: black;
`;

const ProfileEmail = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1.5rem;
`;

const ProfileContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSidebar = styled.div`
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
`;

const ProfileMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProfileMenuItem = styled.li`
  margin-bottom: 0.5rem;

  a {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    color: black;
    text-decoration: none;
    transition: all 0.3s ease;

    svg {
      margin-right: 0.75rem;
    }

    &:hover, &.active {
      background: #D4AF37;
      color: black;
    }
  }
`;

const ProfileMain = styled.div``;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: black;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.75rem;
  }
`;

const OrdersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const OrderNumber = styled.span`
  font-weight: 600;
`;

const OrderStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'delivered':
        return 'rgba(0, 200, 83, 0.1)';
      case 'processing':
        return 'rgba(255, 193, 7, 0.1)';
      case 'shipped':
        return 'rgba(33, 150, 243, 0.1)';
      default:
        return 'rgba(0, 0, 0, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'delivered':
        return '#00C853';
      case 'processing':
        return '#FFC107';
      case 'shipped':
        return '#2196F3';
      default:
        return 'black';
    }
  }};
`;

const OrderDetails = styled.div`
  margin-bottom: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
`;

const OrderItemImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OrderItemDetails = styled.div`
  flex: 1;
`;

const OrderItemName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const OrderItemPrice = styled.div`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const OrderDate = styled.span`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
`;

const OrderTotal = styled.span`
  font-weight: 600;
`;

const SavedDesignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const DesignCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const DesignImage = styled.div`
  height: 200px;
  background: #f5f5f5;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .design-actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }

  .design-action {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #D4AF37;
    }
  }
`;

const DesignInfo = styled.div`
  padding: 1rem;
`;

const DesignName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const DesignDate = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
`;

// Mock data
const orders = [
  {
    id: 'ORD-12345',
    status: 'delivered',
    date: '2023-10-15',
    total: '$129.99',
    items: [
      {
        id: 1,
        name: 'Custom Silk Blouse',
        price: '$79.99',
        image: '/placeholder.svg?height=50&width=50'
      },
      {
        id: 2,
        name: 'Designer Scarf',
        price: '$49.99',
        image: '/placeholder.svg?height=50&width=50'
      }
    ]
  },
  {
    id: 'ORD-12346',
    status: 'shipped',
    date: '2023-11-02',
    total: '$89.99',
    items: [
      {
        id: 3,
        name: 'Tailored Pants',
        price: '$89.99',
        image: '/placeholder.svg?height=50&width=50'
      }
    ]
  },
  {
    id: 'ORD-12347',
    status: 'processing',
    date: '2023-11-10',
    total: '$159.99',
    items: [
      {
        id: 4,
        name: 'Evening Dress',
        price: '$159.99',
        image: '/placeholder.svg?height=50&width=50'
      }
    ]
  }
];

const savedDesigns = [
  {
    id: 1,
    name: 'Summer Collection',
    date: '2023-09-20',
    image: '/placeholder.svg?height=200&width=250'
  },
  {
    id: 2,
    name: 'Formal Attire',
    date: '2023-10-05',
    image: '/placeholder.svg?height=200&width=250'
  },
  {
    id: 3,
    name: 'Casual Wear',
    date: '2023-10-18',
    image: '/placeholder.svg?height=200&width=250'
  },
  {
    id: 4,
    name: 'Winter Collection',
    date: '2023-11-01',
    image: '/placeholder.svg?height=200&width=250'
  }
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <PageWrapper>
      <ProfileHeader>
        <ProfileAvatar>
          <img src="/placeholder.svg?height=120&width=120" alt="User Avatar" />
          <div className="edit-icon">
            <FiEdit size={16} />
          </div>
        </ProfileAvatar>
        <ProfileName>Sarah Johnson</ProfileName>
        <ProfileEmail>sarah.johnson@example.com</ProfileEmail>
        <Button variant="outline">Edit Profile</Button>
      </ProfileHeader>

      <ProfileContent>
        <ProfileSidebar>
          <ProfileMenu>
            <ProfileMenuItem>
              <a 
                href="#orders" 
                className={activeTab === 'orders' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('orders');
                }}
              >
                <FiShoppingBag /> My Orders
              </a>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <a 
                href="#designs" 
                className={activeTab === 'designs' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('designs');
                }}
              >
                <FiHeart /> Saved Designs
              </a>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <a 
                href="#settings" 
                className={activeTab === 'settings' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('settings');
                }}
              >
                <FiSettings /> Account Settings
              </a>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <a href="/logout">
                <FiLogOut /> Logout
              </a>
            </ProfileMenuItem>
          </ProfileMenu>
        </ProfileSidebar>

        <ProfileMain>
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle><FiShoppingBag /> My Orders</SectionTitle>
              <OrdersGrid>
                {orders.map(order => (
                  <OrderCard key={order.id}>
                    <OrderHeader>
                      <OrderNumber>{order.id}</OrderNumber>
                      <OrderStatus status={order.status}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </OrderStatus>
                    </OrderHeader>
                    <OrderDetails>
                      {order.items.map(item => (
                        <OrderItem key={item.id}>
                          <OrderItemImage>
                            <img src={item.image || "/placeholder.svg"} alt={item.name} />
                          </OrderItemImage>
                          <OrderItemDetails>
                            <OrderItemName>{item.name}</OrderItemName>
                            <OrderItemPrice>{item.price}</OrderItemPrice>
                          </OrderItemDetails>
                        </OrderItem>
                      ))}
                    </OrderDetails>
                    <OrderFooter>
                      <OrderDate>{order.date}</OrderDate>
                      <OrderTotal>{order.total}</OrderTotal>
                    </OrderFooter>
                  </OrderCard>
                ))}
              </OrdersGrid>
            </motion.div>
          )}

          {activeTab === 'designs' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle><FiHeart /> Saved Designs</SectionTitle>
              <SavedDesignsGrid>
                {savedDesigns.map(design => (
                  <DesignCard key={design.id}>
                    <DesignImage>
                      <img src={design.image || "/placeholder.svg"} alt={design.name} />
                      <div className="design-actions">
                        <div className="design-action">
                          <FiEdit size={14} />
                        </div>
                        <div className="design-action">
                          <FiHeart size={14} />
                        </div>
                      </div>
                    </DesignImage>
                    <DesignInfo>
                      <DesignName>{design.name}</DesignName>
                      <DesignDate>Created on {design.date}</DesignDate>
                    </DesignInfo>
                  </DesignCard>
                ))}
              </SavedDesignsGrid>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle><FiSettings /> Account Settings</SectionTitle>
              {/* Account settings form would go here */}
              <p>Account settings functionality coming soon.</p>
            </motion.div>
          )}
        </ProfileMain>
      </ProfileContent>
    </PageWrapper>
  );
};

export default ProfilePage;
