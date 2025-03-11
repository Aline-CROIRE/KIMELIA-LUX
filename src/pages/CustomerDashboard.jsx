import React from 'react';
import styled from 'styled-components';
import { FiShoppingBag, FiHeart, FiUser, FiTruck } from 'react-icons/fi';

const DashboardWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  background: #D4AF37;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-size: 1.5rem;
`;

const CardContent = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  p {
    font-size: 1rem;
    color: #666;
  }
`;

const CustomerDashboard = () => {
  return (
    <DashboardWrapper>
      <SectionTitle>Customer Dashboard</SectionTitle>
      <Grid>
        <Card>
          <IconWrapper><FiShoppingBag /></IconWrapper>
          <CardContent>
            <h3>My Orders</h3>
            <p>Track and manage your past and current orders.</p>
          </CardContent>
        </Card>
        <Card>
          <IconWrapper><FiHeart /></IconWrapper>
          <CardContent>
            <h3>Saved Designs</h3>
            <p>View and manage your saved fashion designs.</p>
          </CardContent>
        </Card>
        <Card>
          <IconWrapper><FiTruck /></IconWrapper>
          <CardContent>
            <h3>Order Tracking</h3>
            <p>Check the status of your deliveries in real time.</p>
          </CardContent>
        </Card>
        <Card>
          <IconWrapper><FiUser /></IconWrapper>
          <CardContent>
            <h3>Profile Settings</h3>
            <p>Update your personal details and preferences.</p>
          </CardContent>
        </Card>
      </Grid>
    </DashboardWrapper>
  );
};

export default CustomerDashboard;
