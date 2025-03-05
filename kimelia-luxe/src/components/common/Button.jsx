// src/components/common/Button.jsx
import React from 'react';
import styled, { css } from 'styled-components';

const ButtonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  outline: none;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled.button`
  ${ButtonBase}
  background: ${props => props.theme.gradients.goldGradient};
  color: ${props => props.theme.colors.black.main};
  
  &:hover {
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  ${ButtonBase}
  background: ${props => props.theme.gradients.silverGradient};
  color: ${props => props.theme.colors.black.main};
  
  &:hover {
    box-shadow: 0 4px 12px rgba(192, 192, 192, 0.3);
    transform: translateY(-2px);
  }
`;

const OutlineButton = styled.button`
  ${ButtonBase}
  background: transparent;
  color: ${props => props.theme.colors.gold.main};
  border: 1px solid ${props => props.theme.colors.gold.main};
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
    transform: translateY(-2px);
  }
`;

const DarkButton = styled.button`
  ${ButtonBase}
  background: ${props => props.theme.gradients.darkGradient};
  color: ${props => props.theme.colors.white};
  
  &:hover {
    box-shadow: 0 4px 12px rgba(5, 5, 5, 0.3);
    transform: translateY(-2px);
  }
`;

const Button = ({ children, variant = 'primary', ...props }) => {
  switch (variant) {
    case 'secondary':
      return <SecondaryButton {...props}>{children}</SecondaryButton>;
    case 'outline':
      return <OutlineButton {...props}>{children}</OutlineButton>;
    case 'dark':
      return <DarkButton {...props}>{children}</DarkButton>;
    default:
      return <PrimaryButton {...props}>{children}</PrimaryButton>;
  }
};

export default Button;