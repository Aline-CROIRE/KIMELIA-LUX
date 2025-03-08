import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUpload, FiCheck, FiX, FiInfo } from 'react-icons/fi';

const PageContainer = styled.div`
  background: white;
  color: rgb(19, 17, 17);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const HeaderSection = styled.section`
  background: linear-gradient(to right, #000, #333);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const FormSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

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
`;

const FormContainer = styled.form`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const FormSection2 = styled.div`
  margin-bottom: 2.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #000;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #D4AF37;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
  }
  
  &.selected {
    background: rgba(212, 175, 55, 0.1);
    border-color: #D4AF37;
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const FileUploadContainer = styled.div`
  border: 2px dashed #ddd;
  padding: 2rem;
  border-radius: 4px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #D4AF37;
    background: rgba(212, 175, 55, 0.05);
  }
`;

const UploadIcon = styled.div`
  font-size: 2.5rem;
  color: #D4AF37;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  margin-bottom: 0.5rem;
  color: #555;
`;

const UploadSubtext = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadedFilesList = styled.div`
  margin-top: 1.5rem;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  background: white;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const FileName = styled.span`
  font-size: 0.9rem;
  color: #333;
  flex-grow: 1;
  margin-right: 1rem;
`;

const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  
  &:hover {
    color: #ff0000;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #D4AF37 0%, #FFDF00 50%, #D4AF37 100%);
  color: black;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  width: 100%;
  margin-top: 2rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const InfoBox = styled.div`
  background: rgba(212, 175, 55, 0.1);
  border-left: 4px solid #D4AF37;
  padding: 1rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
`;

const InfoIcon = styled.div`
  color: #D4AF37;
  font-size: 1.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const InfoText = styled.p`
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const SuccessMessage = styled.div`
  background: rgba(39, 174, 96, 0.1);
  border-left: 4px solid #27ae60;
  padding: 1.5rem;
  margin: 2rem 0;
  display: flex;
  align-items: center;
`;

const SuccessIcon = styled.div`
  color: #27ae60;
  font-size: 2rem;
  margin-right: 1rem;
`;

const SuccessContent = styled.div``;

const SuccessTitle = styled.h3`
  color: #27ae60;
  margin-bottom: 0.5rem;
`;

const SuccessText = styled.p`
  color: #555;
`;

const SellerApplicationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    brandName: '',
    website: '',
    instagram: '',
    experience: '',
    description: '',
    categories: [],
    productTypes: [],
    priceRange: '',
    productionCapacity: '',
    shippingCountries: '',
    referral: ''
  });
  
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e, category) => {
    const { checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        categories: [...formData.categories, category]
      });
    } else {
      setFormData({
        ...formData,
        categories: formData.categories.filter(item => item !== category)
      });
    }
  };
  
  const handleProductTypeChange = (e, type) => {
    const { checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        productTypes: [...formData.productTypes, type]
      });
    } else {
      setFormData({
        ...formData,
        productTypes: formData.productTypes.filter(item => item !== type)
      });
    }
  };
  
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file)
    }));
    
    setPortfolioFiles([...portfolioFiles, ...newFiles]);
  };
  
  const removeFile = (index) => {
    const updatedFiles = [...portfolioFiles];
    URL.revokeObjectURL(updatedFiles[index].preview);
    updatedFiles.splice(index, 1);
    setPortfolioFiles(updatedFiles);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    console.log('Portfolio files:', portfolioFiles);
    
    // Show success message
    setSubmitted(true);
    
    // In a real application, you would handle the API call here
    // and only set submitted to true on successful response
  };
  
  if (submitted) {
    return (
      <PageContainer>
        <HeaderSection>
          <HeaderContent>
            <PageTitle>Application Submitted</PageTitle>
            <PageDescription>
              Thank you for applying to become a seller on Kimelia Luxe.
            </PageDescription>
          </HeaderContent>
        </HeaderSection>
        
        <FormSection>
          <BackLink to="/seller">
            <FiArrowLeft /> Back to Seller Home
          </BackLink>
          
          <SuccessMessage>
            <SuccessIcon>
              <FiCheck />
            </SuccessIcon>
            <SuccessContent>
              <SuccessTitle>Application Successfully Submitted!</SuccessTitle>
              <SuccessText>
                We've received your application to become a seller on Kimelia Luxe. Our team will review your information and get back to you within 5-7 business days. You'll receive an email notification once your application has been reviewed.
              </SuccessText>
            </SuccessContent>
          </SuccessMessage>
          
          <InfoBox>
            <InfoIcon>
              <FiInfo />
            </InfoIcon>
            <InfoText>
              While you wait, you can prepare your product inventory, take high-quality photos, and write compelling product descriptions. This will help you launch your shop quickly once approved.
            </InfoText>
          </InfoBox>
        </FormSection>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <HeaderSection>
        <HeaderContent>
          <PageTitle>Seller Application</PageTitle>
          <PageDescription>
            Complete the form below to apply as a seller on Kimelia Luxe. We carefully review each application to ensure quality standards.
          </PageDescription>
        </HeaderContent>
      </HeaderSection>
      
      <FormSection>
        <BackLink to="/seller">
          <FiArrowLeft /> Back to Seller Home
        </BackLink>
        
        <InfoBox>
          <InfoIcon>
            <FiInfo />
          </InfoIcon>
          <InfoText>
            Please provide accurate and detailed information about your brand and products. This helps us understand your business better and expedites the approval process.
          </InfoText>
        </InfoBox>
        
        <FormContainer onSubmit={handleSubmit}>
          <FormSection2>
            <SectionTitle>Personal Information</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="firstName">First Name *</Label>
              <Input 
                type="text" 
                id="firstName" 
                name="firstName" 
                value={formData.firstName}
                onChange={handleInputChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input 
                type="text" 
                id="lastName" 
                name="lastName" 
                value={formData.lastName}
                onChange={handleInputChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
              />
            </FormGroup>
          </FormSection2>
          
          <FormSection2>
            <SectionTitle>Brand Information</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="brandName">Brand/Business Name *</Label>
              <Input 
                type="text" 
                id="brandName" 
                name="brandName" 
                value={formData.brandName}
                onChange={handleInputChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="website">Website (if available)</Label>
              <Input 
                type="url" 
                id="website" 
                name="website" 
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://" 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="instagram">Instagram Handle (if available)</Label>
              <Input 
                type="text" 
                id="instagram" 
                name="instagram" 
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="@yourbrand" 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="experience">Years of Experience *</Label>
              <Select 
                id="experience" 
                name="experience" 
                value={formData.experience}
                onChange={handleInputChange}
                required
              >
                <option value="">Select experience</option>
                <option value="less-than-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="more-than-10">More than 10 years</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="description">Brand Description *</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us about your brand, design philosophy, and what makes your products unique..." 
                required
              />
            </FormGroup>
          </FormSection2>
          
          <FormSection2>
            <SectionTitle>Product Information</SectionTitle>
            
            <FormGroup>
              <Label>Product Categories *</Label>
              <CheckboxGroup>
                {['Women\'s Clothing', 'Men\'s Clothing', 'Children\'s Clothing', 'Accessories', 'Footwear', 'Jewelry', 'Traditional Wear'].map(category => (
                  <CheckboxLabel 
                    key={category} 
                    className={formData.categories.includes(category) ? 'selected' : ''}
                  >
                    <Checkbox 
                      type="checkbox" 
                      checked={formData.categories.includes(category)}
                      onChange={(e) => handleCheckboxChange(e, category)}
                    />
                    {category}
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
            </FormGroup>
            
            <FormGroup>
              <Label>Product Types *</Label>
              <CheckboxGroup>
                {['Ready-to-wear', 'Custom designs', 'Made-to-measure', 'Handcrafted items', 'Upcycled/Sustainable'].map(type => (
                  <CheckboxLabel 
                    key={type} 
                    className={formData.productTypes.includes(type) ? 'selected' : ''}
                  >
                    <Checkbox 
                      type="checkbox" 
                      checked={formData.productTypes.includes(type)}
                      onChange={(e) => handleProductTypeChange(e, type)}
                    />
                    {type}
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="priceRange">Average Price Range *</Label>
              <Select 
                id="priceRange" 
                name="priceRange" 
                value={formData.priceRange}
                onChange={handleInputChange}
                required
              >
                <option value="">Select price range</option>
                <option value="budget">Budget ($10-$50)</option>
                <option value="mid-range">Mid-range ($50-$150)</option>
                <option value="premium">Premium ($150-$500)</option>
                <option value="luxury">Luxury ($500+)</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="productionCapacity">Production Capacity *</Label>
              <Select 
                id="productionCapacity" 
                name="productionCapacity" 
                value={formData.productionCapacity}
                onChange={handleInputChange}
                required
              >
                <option value="">Select capacity</option>
                <option value="small">Small (1-10 items per week)</option>
                <option value="medium">Medium (11-50 items per week)</option>
                <option value="large">Large (50+ items per week)</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="shippingCountries">Countries You Can Ship To *</Label>
              <Input 
                type="text" 
                id="shippingCountries" 
                name="shippingCountries" 
                value={formData.shippingCountries}
                onChange={handleInputChange}
                placeholder="e.g., Worldwide, Africa only, Rwanda and neighboring countries" 
                required
              />
            </FormGroup>
          </FormSection2>
          
          <FormSection2>
            <SectionTitle>Portfolio</SectionTitle>
            
            <FormGroup>
              <Label>Upload Portfolio Images *</Label>
              <FileUploadContainer onClick={() => document.getElementById('portfolioUpload').click()}>
                <UploadIcon>
                  <FiUpload />
                </UploadIcon>
                <UploadText>Click or drag files to upload</UploadText>
                <UploadSubtext>Upload 3-10 high-quality images of your products (JPG, PNG, max 5MB each)</UploadSubtext>
                <HiddenFileInput 
                  type="file" 
                  id="portfolioUpload" 
                  multiple 
                  accept="image/*" 
                  onChange={handleFileUpload}
                />
              </FileUploadContainer>
              
              {portfolioFiles.length > 0 && (
                <UploadedFilesList>
                  {portfolioFiles.map((file, index) => (
                    <FileItem key={index}>
                      <FileName>{file.name}</FileName>
                      <RemoveFileButton type="button" onClick={() => removeFile(index)}>
                        <FiX />
                      </RemoveFileButton>
                    </FileItem>
                  ))}
                </UploadedFilesList>
              )}
            </FormGroup>
          </FormSection2>
          
          <FormSection2>
            <SectionTitle>Additional Information</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="referral">How did you hear about us?</Label>
              <Select 
                id="referral" 
                name="referral" 
                value={formData.referral}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="social-media">Social Media</option>
                <option value="search-engine">Search Engine</option>
                <option value="friend">Friend or Colleague</option>
                <option value="fashion-event">Fashion Event</option>
                <option value="other">Other</option>
              </Select>
            </FormGroup>
          </FormSection2>
          
          <SubmitButton type="submit" disabled={portfolioFiles.length === 0}>
            Submit Application
          </SubmitButton>
        </FormContainer>
      </FormSection>
    </PageContainer>
  );
};

export default SellerApplicationPage;
