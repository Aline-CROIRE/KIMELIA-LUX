"use client"

import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Camera, Upload, User, Check, ArrowRight, RefreshCw, X, Info, ShoppingCart, Heart } from "lucide-react"

// Fallback product data in case API fails
const fallbackProducts = [
  {
    id: "1",
    name: "Elegant Evening Gown",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=200",
    category: "Dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#000", "#000080", "#800020", "#50C878"],
    description:
      "This stunning elegant evening gown features a flattering silhouette with delicate embroidery details.",
    bodyTypes: ["hourglass", "pear"],
    skinTones: ["fair", "medium", "olive", "dark"],
    fabricType: "silk",
    stretchFactor: "low",
  },
  {
    id: "2",
    name: "Tailored Business Suit",
    price: 399.99,
    image: "/placeholder.svg?height=300&width=200",
    category: "Suits",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#000", "#000080", "#808080", "#8B4513"],
    description: "A sophisticated tailored business suit with a professional look.",
    bodyTypes: ["rectangle", "inverted triangle"],
    skinTones: ["all"],
    fabricType: "wool",
    stretchFactor: "low",
  },
  {
    id: "3",
    name: "Summer Collection Blouse",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=200",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#FFB6C1", "#98FB98", "#87CEEB", "#FFFACD"],
    description: "A light and airy summer blouse with a beautiful pattern.",
    bodyTypes: ["all"],
    skinTones: ["fair", "medium", "olive"],
    fabricType: "cotton blend",
    stretchFactor: "medium",
  },
  {
    id: "4",
    name: "Handcrafted Leather Jacket",
    price: 499.99,
    image: "/placeholder.svg?height=300&width=200",
    category: "Outerwear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#000", "#8B4513", "#A52A2A", "#708090"],
    description: "A stylish leather jacket for an edgy, fashionable look.",
    bodyTypes: ["hourglass", "rectangle", "inverted triangle"],
    skinTones: ["all"],
    fabricType: "leather",
    stretchFactor: "low",
  },
  {
    id: "5",
    name: "Casual Denim Collection",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=200",
    category: "Jeans",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#000080", "#4169E1", "#000", "#708090"],
    description: "Classic denim jeans with a comfortable fit and timeless style.",
    bodyTypes: ["all"],
    skinTones: ["all"],
    fabricType: "denim",
    stretchFactor: "medium",
  },
]

// Main component
const VirtualFittingRoom = () => {
  // State for the multi-step process
  const [activeStep, setActiveStep] = useState(1)
  const [inputMethod, setInputMethod] = useState("measurements") // "photo" or "measurements"

  // User data states
  const [userPhoto, setUserPhoto] = useState(null)
  const [userMeasurements, setUserMeasurements] = useState({
    bust: "",
    waist: "",
    hips: "",
    inseam: "",
    height: "",
    weight: "",
  })
  const [userBodyType, setUserBodyType] = useState("")
  const [userSkinTone, setUserSkinTone] = useState("")

  // Product selection states
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedProductDetails, setSelectedProductDetails] = useState(null)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("")

  // UI states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fitAnalysis, setFitAnalysis] = useState(null)

  // Camera states
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraPermission, setCameraPermission] = useState(null)
  const [availableCameras, setAvailableCameras] = useState([])
  const [selectedCamera, setSelectedCamera] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [isFrontCamera, setIsFrontCamera] = useState(true)

  // Standard size measurements in inches for reference
  const standardSizeMeasurements = {
    XS: { bust: 32, waist: 25, hips: 35, inseam: 30 },
    S: { bust: 34, waist: 27, hips: 37, inseam: 30.5 },
    M: { bust: 36, waist: 29, hips: 39, inseam: 31 },
    L: { bust: 38, waist: 31, hips: 41, inseam: 31.5 },
    XL: { bust: 40, waist: 33, hips: 43, inseam: 32 },
  }

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        try {
          const response = await fetch("http://localhost:5005/api/products")

          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
          }

          const data = await response.json()
          console.log("API response data:", data)

          // More flexible handling of API data
          if (data) {
            // Handle array format
            const productsArray = Array.isArray(data)
              ? data
              : // Handle object with products array property
                data.products && Array.isArray(data.products)
                ? data.products
                : // Handle object with items array property
                  data.items && Array.isArray(data.items)
                  ? data.items
                  : // Handle object with data array property
                    data.data && Array.isArray(data.data)
                    ? data.data
                    : // Handle single product object
                      !Array.isArray(data) && typeof data === "object"
                      ? [data]
                      : // Fallback
                        []

            // Transform the API data to match our component's expected format
            const formattedProducts = productsArray.map((item) => ({
              id: item._id || item.id || Math.random().toString(36).substr(2, 9),
              name: item.name || item.title || "Unnamed Product",
              price: item.price || 0,
              image:
                item.images && item.images.length > 0
                  ? item.images[0]
                  : item.image || item.thumbnail || item.photo || "/placeholder.svg?height=300&width=200",
              category: item.category || item.type || "Uncategorized",
              sizes: item.sizes || ["XS", "S", "M", "L", "XL"],
              colors: item.colors || ["#000", "#000080", "#800020", "#50C878"],
              description: item.description || "No description available",
              bodyTypes: item.bodyTypes || ["all"],
              skinTones: item.skinTones || ["all"],
              fabricType: item.fabricType || item.fabric || "unknown",
              stretchFactor: item.stretchFactor || item.stretch || "medium",
            }))

            console.log("Formatted products:", formattedProducts)
            setProducts(formattedProducts)

            // Extract unique categories
            const uniqueCategories = ["All", ...new Set(formattedProducts.map((item) => item.category))]
            setCategories(uniqueCategories)
          } else {
            console.log("Empty API response, using fallback data")
            throw new Error("Empty API response")
          }
        } catch (err) {
          console.error("Error fetching products from API:", err)
          // Use fallback data if API fails
          console.log("Using fallback product data due to API error")
          setProducts(fallbackProducts)

          // Extract unique categories from fallback data
          const uniqueCategories = ["All", ...new Set(fallbackProducts.map((item) => item.category))]
          setCategories(uniqueCategories)
        }
      } catch (err) {
        console.error("Error in fetchProducts:", err)
        setError("Failed to load products. Please try again later.")

        // Ensure we have fallback data even if everything fails
        if (products.length === 0) {
          setProducts(fallbackProducts)
          const uniqueCategories = ["All", ...new Set(fallbackProducts.map((item) => item.category))]
          setCategories(uniqueCategories)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Clean up camera resources when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  // Get available cameras
  const getAvailableCameras = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.error("enumerateDevices() not supported in this browser")
        return
      }

      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter((device) => device.kind === "videoinput")

      console.log("Available cameras:", videoDevices)
      setAvailableCameras(videoDevices)

      // Select the first camera by default
      if (videoDevices.length > 0 && !selectedCamera) {
        setSelectedCamera(videoDevices[0].deviceId)
      }
    } catch (err) {
      console.error("Error getting available cameras:", err)
    }
  }

  // Handle camera activation
  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser doesn't support camera access. Please try a different browser.")
        return
      }

      // Get available cameras first
      await getAvailableCameras()

      // Request camera permissions
      const constraints = {
        video: {
          facingMode: isFrontCamera ? "user" : "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
        },
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)

      setStream(mediaStream)
      setCameraActive(true)
      setCameraPermission("granted")

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((e) => {
            console.error("Error playing video:", e)
            alert("Could not start video stream. Please check your camera permissions.")
          })
        }
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setCameraPermission("denied")
        alert("Camera access was denied. Please allow camera access in your browser settings.")
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setCameraPermission("unavailable")
        alert("No camera found on your device.")
      } else {
        setCameraPermission("error")
        alert("Failed to access camera. Error: " + err.message)
      }
    }
  }

  // Switch between front and back cameras
  const switchCamera = async () => {
    if (stream) {
      // Stop current stream
      stream.getTracks().forEach((track) => track.stop())
    }

    // Toggle camera mode
    setIsFrontCamera(!isFrontCamera)

    // Restart camera with new facing mode
    try {
      const constraints = {
        video: {
          facingMode: !isFrontCamera ? "user" : "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
        },
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((e) => {
            console.error("Error playing video:", e)
          })
        }
      }
    } catch (err) {
      console.error("Error switching camera:", err)
      alert("Failed to switch camera. Error: " + err.message)
    }
  }

  // Handle camera selection change
  const handleCameraChange = async (deviceId) => {
    setSelectedCamera(deviceId)

    if (stream) {
      // Stop current stream
      stream.getTracks().forEach((track) => track.stop())
    }

    // Start new stream with selected camera
    try {
      const constraints = {
        video: {
          deviceId: { exact: deviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((e) => {
            console.error("Error playing video:", e)
          })
        }
      }
    } catch (err) {
      console.error("Error changing camera:", err)
      alert("Failed to switch to selected camera. Error: " + err.message)
    }
  }

  // Handle taking a photo from the camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480

      // Draw the video frame to the canvas
      const context = canvas.getContext("2d")
      if (context) {
        try {
          context.drawImage(video, 0, 0, canvas.width, canvas.height)

          // Convert canvas to data URL
          const photoDataUrl = canvas.toDataURL("image/jpeg", 0.9)
          console.log("Photo captured successfully")
          setUserPhoto(photoDataUrl)

          // Stop the camera stream
          if (stream) {
            stream.getTracks().forEach((track) => track.stop())
          }

          setCameraActive(false)
        } catch (e) {
          console.error("Error capturing photo:", e)
          alert("Error capturing photo. Please try again.")
        }
      }
    } else {
      console.error("Video or canvas reference not available")
      alert("Camera is not properly initialized. Please try again.")
    }
  }

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file size and type
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Maximum size is 10MB.")
      return
    }

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.")
      return
    }

    // Create preview URL
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setUserPhoto(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }

  // Handle drag and drop for photo upload
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files[0]
    if (!file) return

    // Validate file size and type
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Maximum size is 10MB.")
      return
    }

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.")
      return
    }

    // Create preview URL
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setUserPhoto(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }

  // Handle measurement input changes
  const handleMeasurementChange = (e) => {
    const { name, value } = e.target
    setUserMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle body type selection
  const handleBodyTypeSelect = (type) => {
    setUserBodyType(type)
  }

  // Handle skin tone selection
  const handleSkinToneSelect = (tone) => {
    setUserSkinTone(tone)
  }

  // Handle product selection
  const handleProductSelect = (id) => {
    const product = products.find((p) => p.id === id)
    setSelectedProduct(id)
    setSelectedProductDetails(product)

    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0])
    }
  }

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size)

    // Update fit analysis when size changes
    if (inputMethod === "measurements" && Object.values(userMeasurements).some((val) => val !== "")) {
      analyzeFit(size)
    }
  }

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color)
  }

  // Handle category selection
  const handleCategorySelect = (category) => {
    setActiveCategory(category)
  }

  // Analyze if the selected size fits the user based on measurements
  const analyzeFit = (size) => {
    if (!userMeasurements.bust || !userMeasurements.waist || !userMeasurements.hips) {
      return
    }

    const standardSize = standardSizeMeasurements[size]

    // Calculate fit percentage for each measurement
    const bustFit = calculateFitPercentage(Number(userMeasurements.bust), standardSize.bust)
    const waistFit = calculateFitPercentage(Number(userMeasurements.waist), standardSize.waist)
    const hipsFit = calculateFitPercentage(Number(userMeasurements.hips), standardSize.hips)

    // Calculate overall fit score (0-100)
    const overallFit = Math.round((bustFit + waistFit + hipsFit) / 3)

    // Generate fit analysis
    let fitMessage = ""
    let fitPosition = 50 // Default position (middle)

    if (overallFit < 30) {
      fitMessage = "This size is too tight for your measurements. Consider sizing up."
      fitPosition = 20
    } else if (overallFit < 45) {
      fitMessage = "This size may be slightly tight in some areas. The garment will have a very fitted look."
      fitPosition = 35
    } else if (overallFit >= 45 && overallFit <= 65) {
      fitMessage = "This size is a good fit for your measurements."
      fitPosition = 50
    } else if (overallFit <= 80) {
      fitMessage = "This size may be slightly loose in some areas but still wearable."
      fitPosition = 65
    } else {
      fitMessage = "This size is too loose for your measurements. Consider sizing down."
      fitPosition = 80
    }

    // Add specific area feedback
    const areaFeedback = []

    if (bustFit < 40) areaFeedback.push("tight in the bust")
    if (bustFit > 70) areaFeedback.push("loose in the bust")

    if (waistFit < 40) areaFeedback.push("tight in the waist")
    if (waistFit > 70) areaFeedback.push("loose in the waist")

    if (hipsFit < 40) areaFeedback.push("tight in the hips")
    if (hipsFit > 70) areaFeedback.push("loose in the hips")

    if (areaFeedback.length > 0) {
      fitMessage += " It may be " + areaFeedback.join(" and ") + "."
    }

    setFitAnalysis({
      overallFit,
      fitPosition,
      fitMessage,
      details: {
        bust: bustFit,
        waist: waistFit,
        hips: hipsFit,
      },
    })
  }

  // Calculate fit percentage (how well user measurement fits the standard size)
  const calculateFitPercentage = (userMeasurement, standardMeasurement) => {
    // Perfect fit is around 50-60%
    // Below 40% is too tight, above 70% is too loose
    const difference = (userMeasurement / standardMeasurement) * 100 - 100

    if (difference < -15) {
      // Too tight
      return Math.max(0, 40 - Math.abs(difference))
    } else if (difference > 15) {
      // Too loose
      return Math.min(100, 60 + difference)
    } else {
      // Good fit (difference between -15% and +15%)
      return 50 + difference * 0.67 // Scale to 40-60 range
    }
  }

  // Handle navigation between steps
  const handleNextStep = () => {
    if (activeStep === 1) {
      // Validate step 1
      if (inputMethod === "photo" && !userPhoto) {
        alert("Please upload or take a photo first")
        return
      }

      if (
        inputMethod === "measurements" &&
        (!userMeasurements.bust || !userMeasurements.waist || !userMeasurements.hips)
      ) {
        alert("Please provide at least bust, waist, and hip measurements")
        return
      }
    }

    if (activeStep === 2 && !selectedProduct) {
      alert("Please select a product first")
      return
    }

    if (activeStep === 2) {
      // Analyze fit before moving to step 3
      if (inputMethod === "measurements") {
        analyzeFit(selectedSize)
      }
    }

    setActiveStep((prev) => Math.min(prev + 1, 3))
  }

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1))
  }

  // Filter products by category
  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <h1>Virtual Fitting Room</h1>
          <p>
            Try on clothes virtually before you buy. Our technology creates a personalized fit recommendation based on
            your body measurements and the garment's dimensions.
          </p>
        </HeroContent>
      </HeroSection>

      {/* Main Content */}
      <MainSection>
        <StepIndicator>
          <Step active={activeStep >= 1} completed={activeStep > 1}>
            <StepNumber>{activeStep > 1 ? <Check size={16} /> : 1}</StepNumber>
            <StepLabel>Body Profile</StepLabel>
          </Step>
          <StepConnector completed={activeStep > 1} />
          <Step active={activeStep >= 2} completed={activeStep > 2}>
            <StepNumber>{activeStep > 2 ? <Check size={16} /> : 2}</StepNumber>
            <StepLabel>Select Garments</StepLabel>
          </Step>
          <StepConnector completed={activeStep > 2} />
          <Step active={activeStep >= 3}>
            <StepNumber>3</StepNumber>
            <StepLabel>Fit Analysis</StepLabel>
          </Step>
        </StepIndicator>

        <StepContent>
          {activeStep === 1 && (
            <BodyProfileStep>
              <h2>Create Your Body Profile</h2>
              <p>
                To provide accurate fitting recommendations, we need to understand your body. Choose how you'd like to
                create your profile.
              </p>

              <InputOptions>
                <InputOption active={inputMethod === "photo"} onClick={() => setInputMethod("photo")}>
                  <Camera size={24} />
                  <h3>Use Photo</h3>
                  <p>Upload or take a photo for our AI to analyze your body shape</p>
                </InputOption>
                <InputOption active={inputMethod === "measurements"} onClick={() => setInputMethod("measurements")}>
                  <User size={24} />
                  <h3>Enter Measurements</h3>
                  <p>Manually enter your body measurements for precise fitting</p>
                </InputOption>
              </InputOptions>

              {inputMethod === "photo" && (
                <PhotoInputSection>
                  {cameraActive ? (
                    <CameraInterface>
                      {availableCameras.length > 1 && (
                        <CameraSelector>
                          <label>Select Camera:</label>
                          <select value={selectedCamera || ""} onChange={(e) => handleCameraChange(e.target.value)}>
                            {availableCameras.map((camera, index) => (
                              <option key={camera.deviceId} value={camera.deviceId}>
                                {camera.label || `Camera ${index + 1}`}
                              </option>
                            ))}
                          </select>
                        </CameraSelector>
                      )}
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{
                          width: "100%",
                          maxHeight: "500px",
                          borderRadius: "8px",
                          backgroundColor: "#000",
                          objectFit: "cover",
                        }}
                      />
                      <canvas ref={canvasRef} style={{ display: "none" }} />
                      <CameraControls>
                        <Button primary onClick={capturePhoto}>
                          Take Photo
                        </Button>
                        <Button onClick={switchCamera}>
                          <RefreshCw size={16} /> Switch Camera
                        </Button>
                        <Button
                          onClick={() => {
                            if (stream) {
                              stream.getTracks().forEach((track) => track.stop())
                            }
                            setCameraActive(false)
                          }}
                        >
                          Cancel
                        </Button>
                      </CameraControls>
                    </CameraInterface>
                  ) : userPhoto ? (
                    <PhotoPreview>
                      <img src={userPhoto || "/placeholder.svg"} alt="User" />
                      <PhotoControls>
                        <Button onClick={() => setUserPhoto(null)}>
                          <X size={16} /> Remove
                        </Button>
                      </PhotoControls>
                    </PhotoPreview>
                  ) : (
                    <UploadArea onDragOver={handleDragOver} onDrop={handleDrop}>
                      <Upload size={48} />
                      <p>Drag and drop your photo here or</p>
                      <div className="upload-buttons">
                        <Button as="label" primary>
                          Browse Files
                          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                        </Button>
                        <Button onClick={startCamera}>
                          <Camera size={16} /> Use Camera
                        </Button>
                      </div>
                      <small>Supported formats: JPG, PNG. Max size: 10MB</small>
                    </UploadArea>
                  )}

                  <PhotoTips>
                    <h3>Tips for best results:</h3>
                    <ul>
                      <li>Stand straight with arms slightly away from your body</li>
                      <li>Wear fitted clothing to get accurate measurements</li>
                      <li>Use a plain background if possible</li>
                      <li>Ensure good lighting for clear visibility</li>
                    </ul>
                  </PhotoTips>
                </PhotoInputSection>
              )}

              {inputMethod === "measurements" && (
                <MeasurementsInputSection>
                  <div className="measurements-form">
                    <FormRow>
                      <FormGroup>
                        <label htmlFor="bust">Bust (inches)</label>
                        <input
                          type="number"
                          id="bust"
                          name="bust"
                          value={userMeasurements.bust}
                          onChange={handleMeasurementChange}
                          placeholder="e.g., 36"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="waist">Waist (inches)</label>
                        <input
                          type="number"
                          id="waist"
                          name="waist"
                          value={userMeasurements.waist}
                          onChange={handleMeasurementChange}
                          placeholder="e.g., 28"
                        />
                      </FormGroup>
                    </FormRow>
                    <FormRow>
                      <FormGroup>
                        <label htmlFor="hips">Hips (inches)</label>
                        <input
                          type="number"
                          id="hips"
                          name="hips"
                          value={userMeasurements.hips}
                          onChange={handleMeasurementChange}
                          placeholder="e.g., 38"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="inseam">Inseam (inches)</label>
                        <input
                          type="number"
                          id="inseam"
                          name="inseam"
                          value={userMeasurements.inseam}
                          onChange={handleMeasurementChange}
                          placeholder="e.g., 30"
                        />
                      </FormGroup>
                    </FormRow>
                    <FormRow>
                      <FormGroup>
                        <label htmlFor="height">Height (inches)</label>
                        <input
                          type="number"
                          id="height"
                          name="height"
                          value={userMeasurements.height}
                          onChange={handleMeasurementChange}
                          placeholder="e.g., 65"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="weight">Weight (lbs)</label>
                        <input
                          type="number"
                          id="weight"
                          name="weight"
                          value={userMeasurements.weight}
                          onChange={handleMeasurementChange}
                          placeholder="e.g., 140"
                        />
                      </FormGroup>
                    </FormRow>
                  </div>

                  <BodyTypeSelector>
                    <h3>Select your body type:</h3>
                    <div className="body-types">
                      <BodyType active={userBodyType === "hourglass"} onClick={() => handleBodyTypeSelect("hourglass")}>
                        <div className="body-icon hourglass-icon"></div>
                        <span>Hourglass</span>
                      </BodyType>
                      <BodyType active={userBodyType === "pear"} onClick={() => handleBodyTypeSelect("pear")}>
                        <div className="body-icon pear-icon"></div>
                        <span>Pear</span>
                      </BodyType>
                      <BodyType active={userBodyType === "rectangle"} onClick={() => handleBodyTypeSelect("rectangle")}>
                        <div className="body-icon rectangle-icon"></div>
                        <span>Rectangle</span>
                      </BodyType>
                      <BodyType
                        active={userBodyType === "inverted-triangle"}
                        onClick={() => handleBodyTypeSelect("inverted-triangle")}
                      >
                        <div className="body-icon inverted-triangle-icon"></div>
                        <span>Inverted Triangle</span>
                      </BodyType>
                      <BodyType active={userBodyType === "apple"} onClick={() => handleBodyTypeSelect("apple")}>
                        <div className="body-icon apple-icon"></div>
                        <span>Apple</span>
                      </BodyType>
                    </div>
                  </BodyTypeSelector>
                </MeasurementsInputSection>
              )}

              <ButtonGroup>
                <Button
                  primary
                  onClick={handleNextStep}
                  disabled={
                    (inputMethod === "photo" && !userPhoto) ||
                    (inputMethod === "measurements" &&
                      (!userMeasurements.bust || !userMeasurements.waist || !userMeasurements.hips))
                  }
                >
                  Continue <ArrowRight size={16} />
                </Button>
              </ButtonGroup>
            </BodyProfileStep>
          )}

          {activeStep === 2 && (
            <SelectGarmentsStep>
              <h2>Select Garments to Try On</h2>
              <p>Choose from our collection of garments to virtually try on.</p>

              {loading ? (
                <LoadingIndicator>Loading garments...</LoadingIndicator>
              ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
              ) : (
                <>
                  <GarmentCategories>
                    {categories.map((category) => (
                      <GarmentCategory
                        key={category}
                        active={activeCategory === category}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </GarmentCategory>
                    ))}
                  </GarmentCategories>

                  <GarmentGrid>
                    {filteredProducts.length === 0 ? (
                      <NoGarmentsMessage>No garments found in this category.</NoGarmentsMessage>
                    ) : (
                      filteredProducts.map((product) => (
                        <GarmentCard
                          key={product.id}
                          selected={selectedProduct === product.id}
                          onClick={() => handleProductSelect(product.id)}
                        >
                          <GarmentImage>
                            <img src={product.image || "/placeholder.svg?height=300&width=200"} alt={product.name} />
                            {selectedProduct === product.id && (
                              <SelectedBadge>
                                <Check size={16} />
                              </SelectedBadge>
                            )}
                          </GarmentImage>
                          <GarmentInfo>
                            <h3>{product.name}</h3>
                            <p className="price">${product.price}</p>
                            <p className="category">{product.category || "Uncategorized"}</p>
                          </GarmentInfo>
                        </GarmentCard>
                      ))
                    )}
                  </GarmentGrid>

                  {selectedProductDetails && (
                    <GarmentDetails>
                      <h3>Selected Garment Details</h3>
                      <p className="description">{selectedProductDetails.description || "No description available"}</p>

                      <div className="options-container">
                        <div className="size-selector">
                          <h4>Size</h4>
                          <div className="sizes">
                            {(selectedProductDetails.sizes || ["XS", "S", "M", "L", "XL"]).map((size) => (
                              <SizeOption
                                key={size}
                                active={selectedSize === size}
                                onClick={() => handleSizeSelect(size)}
                              >
                                {size}
                              </SizeOption>
                            ))}
                          </div>
                        </div>

                        <div className="color-selector">
                          <h4>Color</h4>
                          <div className="colors">
                            {(selectedProductDetails.colors || ["#000", "#000080", "#800020", "#50C878"]).map(
                              (color) => (
                                <ColorOption
                                  key={color}
                                  color={color}
                                  active={selectedColor === color}
                                  onClick={() => handleColorSelect(color)}
                                />
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </GarmentDetails>
                  )}
                </>
              )}

              <ButtonGroup>
                <Button onClick={handlePrevStep}>Back</Button>
                <Button primary onClick={handleNextStep} disabled={!selectedProduct || loading}>
                  Analyze Fit <ArrowRight size={16} />
                </Button>
              </ButtonGroup>
            </SelectGarmentsStep>
          )}

          {activeStep === 3 && (
            <FitAnalysisStep>
              <h2>Fit Analysis</h2>
              <p>Here's how the selected garment will fit you based on your measurements.</p>

              <FitAnalysisContainer>
                <ProductPreview>
                  {selectedProductDetails && (
                    <>
                      <img
                        src={selectedProductDetails.image || "/placeholder.svg?height=500&width=400"}
                        alt={selectedProductDetails.name}
                      />
                      <ProductInfo>
                        <h3>{selectedProductDetails.name}</h3>
                        <p className="price">${selectedProductDetails.price}</p>
                        <p className="size">Size: {selectedSize}</p>
                        <ColorSwatch color={selectedColor} />
                      </ProductInfo>
                    </>
                  )}
                </ProductPreview>

                <FitDetails>
                  {fitAnalysis ? (
                    <>
                      <FitSummary>
                        <h3>
                          Fit Analysis <Info size={16} />
                        </h3>
                        <FitBar>
                          <FitIndicator position={fitAnalysis.fitPosition} />
                        </FitBar>
                        <FitLabels>
                          <span>Too Tight</span>
                          <span>Perfect Fit</span>
                          <span>Too Loose</span>
                        </FitLabels>
                        <FitMessage>{fitAnalysis.fitMessage}</FitMessage>

                        <FitMeasurements>
                          <div className="fit-detail">
                            <span>Bust Fit:</span>
                            <FitMeter value={fitAnalysis.details.bust} />
                          </div>
                          <div className="fit-detail">
                            <span>Waist Fit:</span>
                            <FitMeter value={fitAnalysis.details.waist} />
                          </div>
                          <div className="fit-detail">
                            <span>Hips Fit:</span>
                            <FitMeter value={fitAnalysis.details.hips} />
                          </div>
                        </FitMeasurements>
                      </FitSummary>

                      <SizeRecommendation>
                        <h3>Size Recommendation</h3>
                        <p>
                          {fitAnalysis.overallFit < 40
                            ? "We recommend trying a larger size for a more comfortable fit."
                            : fitAnalysis.overallFit > 70
                              ? "We recommend trying a smaller size for a more flattering fit."
                              : "This size should fit you well based on your measurements."}
                        </p>
                        <div className="size-options">
                          {(selectedProductDetails?.sizes || ["XS", "S", "M", "L", "XL"]).map((size) => (
                            <SizeOption
                              key={size}
                              active={selectedSize === size}
                              recommended={
                                (fitAnalysis.overallFit < 40 &&
                                  (selectedProductDetails?.sizes || ["XS", "S", "M", "L", "XL"]).indexOf(size) >
                                    (selectedProductDetails?.sizes || ["XS", "S", "M", "L", "XL"]).indexOf(
                                      selectedSize,
                                    )) ||
                                (fitAnalysis.overallFit > 70 &&
                                  (selectedProductDetails?.sizes || ["XS", "S", "M", "L", "XL"]).indexOf(size) <
                                    (selectedProductDetails?.sizes || ["XS", "S", "M", "L", "XL"]).indexOf(
                                      selectedSize,
                                    )) ||
                                (fitAnalysis.overallFit >= 40 && fitAnalysis.overallFit <= 70 && size === selectedSize)
                              }
                              onClick={() => handleSizeSelect(size)}
                            >
                              {size}
                            </SizeOption>
                          ))}
                        </div>
                      </SizeRecommendation>
                    </>
                  ) : (
                    <LoadingIndicator>Analyzing fit...</LoadingIndicator>
                  )}

                  <ButtonGroup>
                    <Button primary>
                      <ShoppingCart size={16} /> Add to Cart
                    </Button>
                    <Button>
                      <Heart size={16} /> Save to Wishlist
                    </Button>
                  </ButtonGroup>
                </FitDetails>
              </FitAnalysisContainer>

              <ButtonGroup>
                <Button onClick={handlePrevStep}>Back</Button>
                <Button onClick={() => setActiveStep(1)}>Start Over</Button>
              </ButtonGroup>
            </FitAnalysisStep>
          )}
        </StepContent>
      </MainSection>

      {/* Features Section */}
      <FeaturesSection>
        <h2>Key Features of Our Virtual Fitting Room</h2>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <User size={24} />
            </FeatureIcon>
            <h3>Personalized Size Analysis</h3>
            <p>
              Our technology compares your exact measurements with each garment's dimensions to provide personalized fit
              recommendations.
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <RefreshCw size={24} />
            </FeatureIcon>
            <h3>Detailed Fit Breakdown</h3>
            <p>
              Get detailed analysis of how each garment will fit across different body areas like bust, waist, and hips.
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Check size={24} />
            </FeatureIcon>
            <h3>Size Recommendations</h3>
            <p>Receive personalized size recommendations based on your unique body measurements.</p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
    </PageContainer>
  )
}

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  background: #f8f9fa;
  font-family: 'Inter', sans-serif;
  color: #333;
  --gold-primary: #D4AF37;
  --gold-light: #F4D160;
  --gold-dark: #C09B2A;
  --luxury-black: #1A1A1A;
`

const HeroSection = styled.section`
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.6)
  ), url("/placeholder.svg?height=800&width=1600");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  
  h1 {
    background: linear-gradient(135deg, #D4AF37 0%, #F4D160 50%, #D4AF37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
  }
`

const MainSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
`

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`

const StepNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#D4AF37" : "rgba(0, 0, 0, 0.1)")};
  color: ${(props) => (props.active ? "black" : "rgba(0, 0, 0, 0.5)")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
`

const StepLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
`

const StepConnector = styled.div`
  width: 80px;
  height: 2px;
  background-color: ${(props) => (props.completed ? "#D4AF37" : "rgba(0, 0, 0, 0.1)")};
  margin: 0 1rem;

  @media (max-width: 768px) {
    width: 40px;
  }
`

const StepContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`

// Body Profile Step Components
const BodyProfileStep = styled.div`
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 2rem;
    max-width: 700px;
  }
`

const InputOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const InputOption = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.active ? "#D4AF37" : "rgba(0, 0, 0, 0.1)")};
  background: ${(props) => (props.active ? "rgba(212, 175, 55, 0.05)" : "white")};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #D4AF37;
  }

  svg {
    color: #D4AF37;
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0;
    font-size: 0.9rem;
  }
`

const PhotoInputSection = styled.div`
  margin-bottom: 2rem;
`

const UploadArea = styled.div`
  border: 2px dashed rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #D4AF37;
  }

  svg {
    color: rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  small {
    display: block;
    margin-top: 1rem;
    color: rgba(0, 0, 0, 0.5);
  }

  .upload-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: center;
    }
  }
`

const CameraInterface = styled.div`
  margin-bottom: 2rem;
`

const CameraSelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  label {
    margin-right: 1rem;
    font-weight: 500;
  }
  
  select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: white;
    
    &:focus {
      outline: none;
      border-color: #D4AF37;
    }
  }
`

const CameraControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`

const PhotoPreview = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  
  img {
    max-width: 100%;
    max-height: 500px;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
`

const PhotoControls = styled.div`
  display: flex;
  justify-content: center;
`

const PhotoTips = styled.div`
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      color: rgba(0, 0, 0, 0.7);
    }
  }
`

const MeasurementsInputSection = styled.div`
  margin-bottom: 2rem;
  
  .measurements-form {
    margin-bottom: 2rem;
  }
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #D4AF37;
    }
  }
`

const BodyTypeSelector = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .body-types {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`

const BodyType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.active ? "#D4AF37" : "rgba(0, 0, 0, 0.1)")};
  background: ${(props) => (props.active ? "rgba(212, 175, 55, 0.05)" : "white")};
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100px;
  
  &:hover {
    border-color: #D4AF37;
  }
  
  .body-icon {
    width: 40px;
    height: 60px;
    margin-bottom: 0.5rem;
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .hourglass-icon {
    clip-path: polygon(50% 0%, 70% 0%, 80% 50%, 70% 100%, 30% 100%, 20% 50%, 30% 0%);
  }
  
  .pear-icon {
    clip-path: polygon(50% 0%, 70% 0%, 75% 50%, 90% 100%, 10% 100%, 25% 50%, 30% 0%);
  }
  
  .rectangle-icon {
    clip-path: polygon(20% 0%, 80% 0%, 80% 100%, 20% 100%);
  }
  
  .inverted-triangle-icon {
    clip-path: polygon(10% 0%, 90% 0%, 70% 100%, 30% 100%);
  }
  
  .apple-icon {
    clip-path: polygon(30% 0%, 70% 0%, 90% 50%, 70% 100%, 30% 100%, 10% 50%);
  }
  
  span {
    font-size: 0.8rem;
    text-align: center;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => (props.primary ? "#D4AF37" : "transparent")};
  color: ${(props) => (props.primary ? "black" : "#333")};
  border: 1px solid ${(props) => (props.primary ? "#D4AF37" : "rgba(0, 0, 0, 0.1)")};

  &:hover {
    background: ${(props) => (props.primary ? "#C09B2A" : "rgba(0, 0, 0, 0.05)")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    margin-left: ${(props) => (props.children && typeof props.children !== "string" ? "0" : "0.5rem")};
    margin-right: ${(props) => (props.children && typeof props.children !== "string" ? "0.5rem" : "0")};
  }
`

// Select Garments Step Components
const SelectGarmentsStep = styled.div`
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 2rem;
    max-width: 700px;
  }
`

const GarmentCategories = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const GarmentCategory = styled.div`
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  background: ${(props) => (props.active ? "#D4AF37" : "transparent")};
  color: ${(props) => (props.active ? "black" : "rgba(0, 0, 0, 0.7)")};
  border: 1px solid ${(props) => (props.active ? "#D4AF37" : "rgba(0, 0, 0, 0.1)")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #D4AF37;
  }
`

const GarmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const GarmentCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${(props) => (props.selected ? "#D4AF37" : "transparent")};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`

const GarmentImage = styled.div`
  position: relative;
  height: 250px;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const SelectedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #D4AF37;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`

const GarmentInfo = styled.div`
  padding: 1rem;
  background: white;

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    color: #D4AF37;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .category {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 0;
  }
`

const GarmentDetails = styled.div`
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .description {
    margin-bottom: 1.5rem;
    color: rgba(0, 0, 0, 0.7);
  }
  
  .options-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  
  h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .sizes {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .colors {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`

const SizeOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${(props) => {
    if (props.recommended) return "#2ecc71"
    return props.active ? "#D4AF37" : "rgba(0, 0, 0, 0.1)"
  }};
  background: ${(props) => {
    if (props.recommended) return "rgba(46, 204, 113, 0.1)"
    return props.active ? "#D4AF37" : "transparent"
  }};
  color: ${(props) => {
    if (props.recommended && !props.active) return "#2ecc71"
    return props.active ? "black" : "rgba(0, 0, 0, 0.7)"
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${(props) => (props.recommended ? "bold" : "normal")};

  &:hover {
    border-color: #D4AF37;
  }
`

const ColorOption = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? "#D4AF37" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`

// Fit Analysis Step Components
const FitAnalysisStep = styled.div`
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 2rem;
    max-width: 700px;
  }
`

const FitAnalysisContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProductPreview = styled.div`
  text-align: center;
  
  img {
    max-width: 100%;
    max-height: 400px;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
`

const ProductInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .price {
    font-size: 1.2rem;
    color: #D4AF37;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .size {
    margin-bottom: 0.5rem;
  }
`

const ColorSwatch = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 auto;
  border: 2px solid rgba(0, 0, 0, 0.1);
`

const FitDetails = styled.div`
`

const FitSummary = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #333;
    display: flex;
    align-items: center;
    
    svg {
      margin-left: 0.5rem;
      color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }
`

const FitBar = styled.div`
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  margin-bottom: 0.5rem;
`

const FitIndicator = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: #D4AF37;
  border-radius: 50%;
  top: 50%;
  left: ${(props) => props.position}%;
  transform: translate(-50%, -50%);
`

const FitLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
`

const FitMessage = styled.div`
  padding: 1rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 4px;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
`

const FitMeasurements = styled.div`
  .fit-detail {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    
    span {
      width: 80px;
      font-size: 0.9rem;
    }
  }
`

const FitMeter = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: ${(props) => props.value}%;
    background: ${(props) => {
      if (props.value < 40) return "#e74c3c"
      if (props.value > 70) return "#3498db"
      return "#2ecc71"
    }};
    border-radius: 3px;
  }
`

const SizeRecommendation = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  .size-options {
    display: flex;
    gap: 0.5rem;
  }
`

// Additional styled components for loading and error states
const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.2rem;
`

const ErrorMessage = styled.div`
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
`

const NoGarmentsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(0, 0, 0, 0.5);
  grid-column: 1 / -1;
`

// Features Section Components
const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.02);
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 3rem;
    color: #333;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const FeatureCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.6;
  }
`

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  svg {
    color: #D4AF37;
  }
`

export default VirtualFittingRoom

