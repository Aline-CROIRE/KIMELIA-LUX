import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeTerms: false
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation checks
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your first and last name.');
      return;
    }

    if (!formData.email) {
      setError('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!formData.password) {
      setError('Please enter a password.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!formData.role) {
      setError('Please select a role');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    // Prepare data for API
    const apiData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role === 'customer' ? 'user' : formData.role // Map 'customer' to 'user' for API
    };

    try {
      setLoading(true);
      
      // Make API call to register endpoint
      const response = await fetch('https://kimelia-api.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Show success notification
      toast.success('Registration successful! Redirecting to login...', {
        position: "top-center",
        autoClose: 3000
      });

      // Wait for toast to be visible before redirecting
      setTimeout(() => {
        setLoading(false);
        onSwitchToLogin(); // Switch to login overlay
      }, 3000);
      
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Registration failed. Please try again.');
      toast.error(error.message || 'Registration failed', {
        position: "top-center"
      });
    }
  };

  return (
    <Overlay>
      <ToastContainer />
      <ModalWrapper>
        <ModalContent>
          <CloseButton onClick={onClose} aria-label="Close">×</CloseButton>

          <SignupHeader>
            <h1>Create Account</h1>
            <p>Join Kimelia Luxe for exclusive access</p>
          </SignupHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormWrapper onSubmit={handleSubmit}>
            <NameFieldsContainer>
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter first name"
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Enter last name"
                  disabled={loading}
                />
              </FormGroup>
            </NameFieldsContainer>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                disabled={loading}
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
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <PasswordToggle onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </PasswordToggle>
                </PasswordInputWrapper>
              </FormGroup>
            </PasswordContainer>

            <PasswordContainer>
              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInputWrapper>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                  <PasswordToggle onClick={toggleConfirmPasswordVisibility}>
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </PasswordToggle>
                </PasswordInputWrapper>
              </FormGroup>
            </PasswordContainer>

            <FormGroup>
              <Label>Select Your Role</Label>
              <RoleSelectionContainer>
                {['customer', 'designer', 'seller'].map(role => (
                  <RoleOption
                    key={role}
                    selected={formData.role === role}
                    onClick={() => !loading && setFormData({ ...formData, role })}
                    disabled={loading}
                  >
                    <RoleTitle>{role.charAt(0).toUpperCase() + role.slice(1)}</RoleTitle>
                  </RoleOption>
                ))}
              </RoleSelectionContainer>
            </FormGroup>

            <CheckboxGroup>
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                disabled={loading}
              />
              <label htmlFor="agreeTerms">
                I agree to the <TermsLink to="/terms">Terms</TermsLink> and{' '}
                <TermsLink to="/privacy">Privacy Policy</TermsLink>
              </label>
            </CheckboxGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </SubmitButton>
          </FormWrapper>

          <LoginPrompt>
            Already have an account?{' '}
            <LoginLink onClick={onSwitchToLogin} disabled={loading}>Log in</LoginLink>
          </LoginPrompt>
        </ModalContent>
      </ModalWrapper>
    </Overlay>
  );
};

// Styled Components
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

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
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

const SignupHeader = styled.div`
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

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  overflow: auto;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NameFieldsContainer = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
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

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const RoleSelectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const RoleOption = styled.div`
  padding: 12px;
  border-radius: 5px;
  border: 2px solid ${({ selected }) => (selected ? '#D4AF37' : '#ccc')};
  text-align: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  flex: 1;
  transition: all 0.2s ease-in-out;
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 2px 5px rgba(0, 0, 0, 0.1)'};
  }
`;

const RoleTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #555;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #555;
`;

const TermsLink = styled(Link)`
  color: #D4AF37;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  padding: 14px;
  border-radius: 5px;
  border: none;
  background: #D4AF37;
  color: white;
  font-size: 18px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s ease-in-out;
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    background: ${props => props.disabled ? '#D4AF37' : '#C09A30'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(1px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.15)'};
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

const LoginPrompt = styled.p`
  text-align: center;
  font-size: 14px;
  color: #555;
  margin-top: 1rem;
`;

const LoginLink = styled.button`
  background: none;
  border: none;
  color: #D4AF37;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  text-decoration: none;
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    text-decoration: ${props => props.disabled ? 'none' : 'underline'};
  }
`;

export default SignupPage;
