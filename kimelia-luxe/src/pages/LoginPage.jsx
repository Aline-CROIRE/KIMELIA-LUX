// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = ({ onClose, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!password) {
            setError('Please enter your password.');
            return;
        }

        console.log('Login attempt with:', { email, password, rememberMe });

        // Simulate success:
        setTimeout(() => {
            onClose();
        }, 500);
    };

    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose} aria-label="Close">×</CloseButton>

                <Header>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your Kimelia Luxe account</p>
                </Header>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </FormGroup>

                    <PasswordContainer>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <PasswordInputWrapper>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                                <PasswordToggle onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </PasswordToggle>
                            </PasswordInputWrapper>
                        </FormGroup>
                    </PasswordContainer>

                    <CheckboxGroup>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe">Remember me</label>
                    </CheckboxGroup>

                    <SubmitButton type="submit">Sign In</SubmitButton>
                </Form>

                <Footer>
                    Don't have an account? <SignupLink onClick={onSwitchToSignup}>Sign up</SignupLink></Footer>
            </ModalContent>
        </Overlay>
    );
};

// ✅ Styled Components (Consistent with SignupPage)
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #555;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  h1 {
    font-size: 28px;
    color: #D4AF37;
    margin-bottom: 0.5rem;
  }
  p {
    color: #777;
    font-size: 16px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  outline: none;

  &:focus {
    border-color: #D4AF37;
    box-shadow: 0 0 5px rgba(212, 175, 55, 0.3);
  }

  &::placeholder {
    color: #999;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const PasswordInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const PasswordToggle = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;

  &:hover {
    color: #555;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #555;
`;

const SubmitButton = styled.button`
  padding: 14px;
  border-radius: 5px;
  border: none;
  background: #D4AF37;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #C09A30;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
`;

const Footer = styled.p`
  margin-top: 15px;
  color: #bbb;
  text-align: center;
`;

const SignupLink = styled.span`
  color: #D4AF37;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background: #ffebeb;
  color: #d32f2f;
  padding: 12px;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  margin-bottom: 1rem;
`;

export default LoginPage;