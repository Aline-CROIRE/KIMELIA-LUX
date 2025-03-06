// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation checks (can be expanded)
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

        // Simulate signup process (replace with actual API call)
        console.log('Signup attempt with:', formData);
        //  Here you would typically call an API to create a new user
        //  Example:
        //  api.signup(formData)
        //   .then(response => {
        //      console.log('Signup successful', response);
        //      navigate('/'); // Redirect on success
        //      onClose();
        //   })
        //   .catch(error => {
        //     console.error('Signup failed', error);
        //     setError('Signup failed. Please try again.'); // Provide a general error message
        //   });

        //For this example, let's just simulate success:
        setTimeout(() => { // Simulate API delay
            navigate('/');
            onClose();
        }, 500);


    };

    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
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
                                    onClick={() => setFormData({ ...formData, role })}
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
                        />
                        <label htmlFor="agreeTerms">
                            I agree to the <TermsLink to="/terms">Terms</TermsLink> and{' '}
                            <TermsLink to="/privacy">Privacy Policy</TermsLink>
                        </label>
                    </CheckboxGroup>

                    <SubmitButton type="submit">Create Account</SubmitButton>
                </FormWrapper>

                {/* Added Login Option */}
                <LoginPrompt>
                    Already have an account?{' '}
                    <LoginLink onClick={onSwitchToLogin}>Log in</LoginLink>
                </LoginPrompt>
            </ModalContent>
        </Overlay>
    );
};


// ✅ Styled Components (Updated Overlay Styles)
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


// 🔥 Other styled components remain the same.
const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100vh; /* Changed to 100vh to prevent height overflow */
  overflow: hidden; /* Hide scrollbars on the ModalWrapper */
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh; /* Changed to 90vh to prevent height overflow */
  overflow: hidden; /* Hide scrollbars on the ModalContent */
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
  flex: 1; /* Important: Allow FormWrapper to take up available vertical space */
  overflow: auto; /* Add scroll to the FormWrapper if content overflows */
  padding-right: 1rem; /* Add padding to avoid content touching the scrollbar */

  &::-webkit-scrollbar { /* Targetting WebKit browsers like Chrome, Safari */
    width: 0 !important; /* Hide the scrollbar */
  }
  scrollbar-width: none; /* Targetting Firefox */
  -ms-overflow-style: none; /* Targetting IE */
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
  cursor: pointer;
  flex: 1;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;


export default SignupPage;