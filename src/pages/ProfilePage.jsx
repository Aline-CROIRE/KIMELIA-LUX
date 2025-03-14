import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const NoItemsMessage = styled.p`
  font-size: 1.1rem;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  padding: 2rem;
`;

// Styles for the edit profile form
const EditProfileFormWrapper = styled.div`
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const EditProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-weight: 500;
  }

  input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 0.75rem 1rem;
    background-color: #D4AF37;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #c09b23;
    }
  }
`;

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]); // Initialize to an empty array
    const [savedDesigns, setSavedDesigns] = useState([]); // Initialize to an empty array

    // EDIT PROFILE STATES
    const [editingProfile, setEditingProfile] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState(null); // State for the selected image

    const API_ENDPOINT = 'https://kimelia-api.onrender.com/api/auth/profile';
    const ORDERS_ENDPOINT = 'https://kimelia-api.onrender.com/api/orders/myorders';
    const DESIGNS_ENDPOINT = 'YOUR_DESIGNS_ENDPOINT'; // Replace with your API's desings end point

    // Used for navigation after logout
    const navigate = useNavigate();

    useEffect(() => {
      const fetchProfileData = async () => {
            try {
              const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No token found. User not logged in.');
                }

                const response = await fetch(API_ENDPOINT, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const contentType = response.headers.get("content-type");
                    let errorMessage = `HTTP error! status: ${response.status}`;

                    try {
                        if (contentType && contentType.includes("application/json")) {
                            const errorData = await response.json();
                            errorMessage = errorData.message || errorMessage;
                        } else {
                            errorMessage = await response.text() || errorMessage;
                        }
                    } catch (parseError) {
                        console.error("Error parsing error message:", parseError);
                    }

                    throw new Error(errorMessage);
                }

                const data = await response.json();
                setProfile(data);

                // Initialize form values with the fetched profile data
                setFirstName(data.firstName || '');
                setLastName(data.lastName || '');
                setEmail(data.email || '');
                setProfileImage(data.profileImage || null)


            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch profile:", e);
            } finally {
                setLoading(false);
            }
        };
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No token found. User not logged in.');
                }

                const response = await fetch(ORDERS_ENDPOINT, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const contentType = response.headers.get("content-type");
                    let errorMessage = `HTTP error! status: ${response.status}`;

                    try {
                        if (contentType && contentType.includes("application/json")) {
                            const errorData = await response.json();
                            errorMessage = errorData.message || errorMessage;
                        } else {
                            errorMessage = await response.text() || errorMessage;
                        }
                    } catch (parseError) {
                        console.error("Error parsing error message:", parseError);
                    }

                    throw new Error(errorMessage);
                }

                const data = await response.json();

                 //  Check API Response and extract the orders correctly before setOrders

                if (Array.isArray(data)) {
                    // If the API returns just the array
                    setOrders(data);
                } else if (data && data.orders && Array.isArray(data.orders)) {
                    //  If the API returns { orders: [ ... ] }
                    setOrders(data.orders);
                } else if (data && data.data && data.data.orders && Array.isArray(data.data.orders)) {
                    // If the API returns { data: { orders: [ ... ] } }
                    setOrders(data.data.orders);
                } else {
                    // If orders can't be found, show error message.  You might want to customize this
                    console.warn("Could not find orders in the API response, displaying 'No orders found'."); // changed setError to console.warn
                    setOrders([]); // prevent errors while rendering.
                    return;
                }


            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch orders:", e);
                setOrders([]) // set to [] to prevent errors while rendering
            } finally {
                // No setLoading(false) here, as it might depend on profile loading
            }
        };

        const fetchDesigns = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No token found. User not logged in.');
                }

                const response = await fetch(DESIGNS_ENDPOINT, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const contentType = response.headers.get("content-type");
                    let errorMessage = `HTTP error! status: ${response.status}`;

                    try {
                        if (contentType && contentType.includes("application/json")) {
                            const errorData = await response.json();
                            errorMessage = errorData.message || errorMessage;
                        } else {
                            errorMessage = await response.text() || errorMessage;
                        }
                    } catch (parseError) {
                        console.error("Error parsing error message:", parseError);
                    }

                    throw new Error(errorMessage);
                }

                const data = await response.json();
                setSavedDesigns(data);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch designs:", e);
            } finally {
                // setLoading(false);  // Removed: Design loading shouldn't block main loading
            }
        };

        // Execute fetches.  Profile MUST be fetched first.
        fetchProfileData(); //fetch data
        fetchOrders();
        //fetchDesigns();  // Uncomment if needed

    }, []);

     // Edit Profile Functionality
     const handleEditProfile = () => {
        setEditingProfile(true); // Enable edit mode
    };

    //Image Handler
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file

        if (file) {
            // Convert the image to a base64 string for preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Set the base64 string to profileImage state
            };
            reader.readAsDataURL(file);
        }
    };

    //Save Profile
    const handleSaveProfile = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        try {
            setLoading(true); // Set loading to true while saving
            setError(null); // Reset error

            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No token found. User not logged in.');
            }

            const formData = new FormData(); // Create FormData object to send the data to the server
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);

            // Append the profile image only if one was selected
            if (profileImage) {
                formData.append('profileImage', dataURLtoFile(profileImage, 'profileImage.png')); // Convert data URL to file
            }

            const response = await fetch(API_ENDPOINT, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData, // Send the form data in the body
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let errorMessage = `HTTP error! status: ${response.status}`;

                try {
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorMessage;
                    } else {
                        errorMessage = await response.text() || errorMessage;
                    }
                } catch (parseError) {
                    console.error("Error parsing error message:", parseError);
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            setProfile(data); // Update the profile state with the new data

            // Also update local state after successful save
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setEmail(data.email || '');
            setProfileImage(data.profileImage || null);

            setEditingProfile(false); //  Disable edit mode
        } catch (e) {
            setError(e.message); // Set the error state if there's an error
            console.error("Failed to update profile:", e);
        } finally {
            setLoading(false); //  Set loading back to false
        }
    };

    // Helper function to convert data URL to File object
    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }


    // Logout Functionality
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to the home page
    };


    // Conditional rendering based on loading and error states
    if (loading) {
        return <PageWrapper>Loading profile...</PageWrapper>;
    }

    if (error) {
        return <PageWrapper>Error: {error}</PageWrapper>;
    }

    if (!profile) {
        return <PageWrapper>Could not load profile data.</PageWrapper>;
    }

    return (
        <PageWrapper>
            <ProfileHeader>
                <ProfileAvatar>
                {editingProfile ? (
                    <input
                        type="file"
                        id="profileImageInput"
                        accept="image/*" // Accept only image files
                        onChange={handleImageChange}
                        style={{ display: 'none' }} // Hide the actual input
                    />
                      ) : null}

                    <img src={profileImage || profile.profileImage || "/placeholder.svg?height=120&width=120"} alt="User Avatar"
                    style={{ cursor: editingProfile ? 'pointer' : 'default' }}
                    onClick={() => { if (editingProfile) document.getElementById('profileImageInput').click(); }}
                     />

                     {/* Conditionally render the edit icon when not in edit mode */}
                {!editingProfile && (
                    <div className="edit-icon">
                        <FiEdit size={16} />
                    </div>
                )}
                </ProfileAvatar>
                <ProfileName>{profile.firstName} {profile.lastName}</ProfileName>
                <ProfileEmail>{profile.email}</ProfileEmail>

                {editingProfile ? (
                    <Button onClick={handleSaveProfile}>Save Profile</Button>
                    ) : (
                    <Button variant="outline" onClick={handleEditProfile}>Edit Profile</Button>
                )}

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
                            <a href="#" onClick={handleLogout}>
                                <FiLogOut /> Logout
                            </a>
                        </ProfileMenuItem>
                    </ProfileMenu>
                </ProfileSidebar>

                <ProfileMain>

                {editingProfile ? (
                  <EditProfileFormWrapper>
                    <SectionTitle><FiUser /> Edit Profile</SectionTitle>
                    <EditProfileForm onSubmit={handleSaveProfile}>
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />

                      <label htmlFor="lastName">Last Name:</label>
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />

                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                    <label htmlFor="profileImageInput">Profile Image:</label>
                        <input
                            type="file"
                            id="profileImageInput"
                            accept="image/*" // Accept only image files
                            onChange={handleImageChange}
                            style={{ display: 'none' }} // Hide the actual input
                        />
                        <Button variant="outline" onClick={() => document.getElementById('profileImageInput').click()}>
                            Upload Image
                        </Button>
                    </EditProfileForm>
                  </EditProfileFormWrapper>
                    ) : null}

                    {activeTab === 'orders' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <SectionTitle><FiShoppingBag /> My Orders</SectionTitle>
                            {orders?.length > 0 ? (
                                <OrdersGrid>
                                    {orders?.map(order => (
                                        <OrderCard key={order.id}>
                                            <OrderHeader>
                                                <OrderNumber>{order.orderNumber}</OrderNumber>
                                                <OrderStatus status={order.status}>
                                                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                                </OrderStatus>
                                            </OrderHeader>
                                            <OrderDetails>
                                                {order.products?.map(item => (
                                                    <OrderItem key={item._id}>
                                                        <OrderItemImage>
                                                            <img src={item.product?.imageCover || "/placeholder.svg"} alt={item.product?.name} />
                                                        </OrderItemImage>
                                                        <OrderItemDetails>
                                                            <OrderItemName>{item.product?.name}</OrderItemName>
                                                            <OrderItemPrice>{item.product?.price}</OrderItemPrice>
                                                        </OrderItemDetails>
                                                    </OrderItem>
                                                ))}
                                            </OrderDetails>
                                            <OrderFooter>
                                                <OrderDate>{order.createdAt}</OrderDate>
                                                <OrderTotal>{order.totalOrderPrice}</OrderTotal>
                                            </OrderFooter>
                                        </OrderCard>
                                    ))}
                                </OrdersGrid>
                            ) : (
                                <NoItemsMessage>No orders found.</NoItemsMessage>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'designs' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <SectionTitle><FiHeart /> Saved Designs</SectionTitle>
                            {savedDesigns?.length > 0 ? (
                                <SavedDesignsGrid>
                                    {savedDesigns?.map(design => (
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
                            ) : (
                                <NoItemsMessage>No saved designs found.</NoItemsMessage>
                            )}
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