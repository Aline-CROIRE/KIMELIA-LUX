"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import axios from "axios"
import styled from "styled-components"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
import {
  FiUpload,
  FiCamera,
  FiRotateCw,
  FiCheck,
  FiArrowRight,
  FiInfo,
  FiX,
  FiMaximize,
  FiSliders,
  FiUser,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi"

import placeholderImage300x200 from '../../assets/images/dres1.jpg' ; // Adjust path as needed
import placeholderImage600x400 from '../../assets/images/dres2.jpeg'; // Adjust path as needed


const fallbackGarments = [
  {
    id: "1",
    name: "Elegant Evening Gown",
    price: 299.99,
    image: placeholderImage300x200, // Use imported variable
    overlayImage: placeholderImage600x400, // Use imported variable
    category: "Dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#000", "#000080", "#800020", "#50C878"],
    description:
      "This stunning elegant evening gown features a flattering silhouette with delicate embroidery details.",
    bodyTypes: ["hourglass", "pear"],
    skinTones: ["fair", "medium", "olive", "dark"],
    fabricType: "silk",
    stretchFactor: "low",
    overlayPosition: { x: 0, y: 0.25, width: 0.8, height: 0.6 },
  },
  {
    id: "P002",
    name: "Tailored Business Suit",
    price: 399.99,
    image: placeholderImage300x200, // Use imported variable
    overlayImage: placeholderImage600x400, // Use imported variable
    category: "Suits",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#000", "#000080", "#808080", "#8B4513"],
    description: "A sophisticated tailored business suit with a professional look.",
    bodyTypes: ["rectangle", "inverted triangle"],
    skinTones: ["all"],
    fabricType: "wool",
    stretchFactor: "low",
    overlayPosition: { x: 0, y: 0.2, width: 0.8, height: 0.7 },
  },
  {
    id: "P003",
    name: "Summer Collection Blouse",
    price: 89.99,
    image: placeholderImage300x200, // Use imported variable
    overlayImage: placeholderImage600x400, // Use imported variable
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#FFB6C1", "#98FB98", "#87CEEB", "#FFFACD"],
    description: "A light and airy summer blouse with a beautiful pattern.",
    bodyTypes: ["all"],
    skinTones: ["fair", "medium", "olive"],
    fabricType: "cotton blend",
    stretchFactor: "medium",
    overlayPosition: { x: 0, y: 0.15, width: 0.8, height: 0.4 },
  },
  {
    id: "P004",
    name: "Handcrafted Leather Jacket",
    price: 499.99,
    image: placeholderImage300x200, // Use imported variable
    overlayImage: placeholderImage600x400, // Use imported variable
    category: "Outerwear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#000", "#8B4513", "#A52A2A", "#708090"],
    description: "A stylish leather jacket for an edgy, fashionable look.",
    bodyTypes: ["hourglass", "rectangle", "inverted triangle"],
    skinTones: ["all"],
    fabricType: "leather",
    stretchFactor: "low",
    overlayPosition: { x: 0, y: 0.15, width: 0.8, height: 0.5 },
  },
  {
    id: "P005",
    name: "Casual Denim Collection",
    price: 129.99,
    image: placeholderImage300x200, // Use imported variable
    overlayImage: placeholderImage600x400, // Use imported variable
    category: "Jeans",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#000080", "#4169E1", "#000", "#708090"],
    description: "Classic denim jeans with a comfortable fit and timeless style.",
    bodyTypes: ["all"],
    skinTones: ["all"],
    fabricType: "denim",
    stretchFactor: "medium",
    overlayPosition: { x: 0, y: 0.5, width: 0.8, height: 0.5 },
  },
];
// Standard size measurements in inches for reference
const standardSizeMeasurements = {
  XS: { bust: 32, waist: 25, hips: 35, inseam: 30 },
  S: { bust: 34, waist: 27, hips: 37, inseam: 30.5 },
  M: { bust: 36, waist: 29, hips: 39, inseam: 31 },
  L: { bust: 38, waist: 31, hips: 41, inseam: 31.5 },
  XL: { bust: 40, waist: 33, hips: 43, inseam: 32 },
}

// Skin tone color palette for recommendations
const skinToneColorPalettes = {
  fair: {
    recommended: ["#000", "#000080", "#800020", "#008000", "#4B0082"],
    avoid: ["#FFFF00", "#FFA500", "#FFD700"],
  },
  medium: {
    recommended: ["#000080", "#800020", "#008000", "#4B0082", "#A52A2A"],
    avoid: ["#F0E68C", "#FAFAD2"],
  },
  olive: {
    recommended: ["#800020", "#A52A2A", "#008000", "#000080", "#4B0082"],
    avoid: ["#FF69B4", "#FF1493"],
  },
  dark: {
    recommended: ["#FFFFFF", "#FFD700", "#FF0000", "#00FF00", "#00FFFF"],
    avoid: ["#000000", "#A52A2A", "#800000"],
  },
}

// 3D Model component for clothing
const ClothingModel = ({ modelPath, color, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF(modelPath)

  // Clone the scene to avoid modifying the cached original
  const model = scene.clone()

  // Apply color to all meshes in the model
  model.traverse((node) => {
    if (node.isMesh && node.material) {
      node.material = node.material.clone()
      if (color) {
        node.material.color.set(color)
      }
    }
  })

  return <primitive object={model} position={position} scale={scale} rotation={rotation} />
}

// Human Model component that will wear the clothes
const HumanModel = ({ userPhoto, position = [0, 0, 0], scale = 1 }) => {
  // Use a default human model
  const { scene } = useGLTF("/assets/3d/duck.glb") // Using duck as placeholder, replace with human model

  // If user photo is provided, we'll use it as a texture on a plane behind the model
  // This is a simplified approach - a real implementation would map the photo to the model
  return (
    <group position={position} scale={scale}>
      <primitive object={scene} />
      {userPhoto && (
        <mesh position={[0, 0, -0.5]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2, 3]} />
          <meshBasicMaterial>
            <Html transform position={[0, 0, 0.1]} scale={0.1} sprite>
              <div style={{ width: "500px", height: "800px", overflow: "hidden" }}>
                <img
                  src={userPhoto || "/placeholder.svg"}
                  alt="User"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Html>
          </meshBasicMaterial>
        </mesh>
      )}
    </group>
  )
}

// 3D Scene component for the virtual try-on
const TryOnScene = ({ userPhoto, selectedGarment, selectedColor }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={<Html center>Loading 3D models...</Html>}>
        <HumanModel userPhoto={userPhoto} position={[0, -1, 0]} scale={1} />
        {selectedGarment && (
          <ClothingModel
            modelPath={selectedGarment.model3d || "/assets/3d/duck.glb"}
            color={selectedColor}
            position={[0, -1, 0]}
            scale={1}
          />
        )}
        <Environment preset="studio" />
        <OrbitControls enablePan={false} enableZoom={true} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
      </Suspense>
    </Canvas>
  )
}

const VirtualFittingRoom = () => {
  // State for the multi-step process
  const [activeStep, setActiveStep] = useState(1)
  const [inputMethod, setInputMethod] = useState("photo") // "photo" or "measurements"

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
  const [garments, setGarments] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedGarment, setSelectedGarment] = useState(null)
  const [selectedGarmentDetails, setSelectedGarmentDetails] = useState(null)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("")

  // UI states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tryOnLoading, setTryOnLoading] = useState(false)
  const [tryOnError, setTryOnError] = useState(null)
  const [fitAnalysis, setFitAnalysis] = useState(null)
  const [colorAnalysis, setColorAnalysis] = useState(null)

  // Camera states
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraPermission, setCameraPermission] = useState(null)
  const [availableCameras, setAvailableCameras] = useState([])
  const [selectedCamera, setSelectedCamera] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [isFrontCamera, setIsFrontCamera] = useState(true)

  // Fetch garments from the API
  useEffect(() => {
    const fetchGarments = async () => {
      setLoading(true)
      try {
        // Try to get products from API
        try {
          const response = await axios.get("http://localhost:5005/api/products")
          console.log("API Response:", response.data)

          if (response.data && Array.isArray(response.data)) {
            // Transform the API data to match our component's expected format
            const formattedGarments = response.data.map((item) => ({
              id: item._id || item.id,
              name: item.name,
              price: item.price,
              image: item.images && item.images.length > 0 ? item.images[0] : "/placeholder.svg?height=300&width=200",
              model3d: item.model3d || "/assets/3d/duck.glb", // Default 3D model if not provided
              category: item.category || "Uncategorized",
              sizes: item.sizes || ["XS", "S", "M", "L", "XL"],
              colors: item.colors || ["#000", "#000080", "#800020", "#50C878"],
              description: item.description || "No description available",
              bodyTypes: item.bodyTypes || ["all"],
              skinTones: item.skinTones || ["all"],
              fabricType: item.fabricType || "unknown",
              stretchFactor: item.stretchFactor || "medium",
            }))

            setGarments(formattedGarments)

            // Extract unique categories
            const uniqueCategories = ["All", ...new Set(formattedGarments.map((item) => item.category))]
            setCategories(uniqueCategories)

            // Ensure we're showing all products initially
            setActiveCategory("All")
          } else {
            console.log("Invalid API response format, using fallback data")
            // Use fallback data if API response is not in expected format
            setGarments(fallbackGarments)
            setCategories(["All", "Dresses", "Suits", "Tops", "Outerwear", "Jeans"])
          }
        } catch (err) {
          console.error("Error fetching garments from API:", err)
          // Use fallback data if API fails
          console.log("Using fallback garment data due to API error")
          setGarments(fallbackGarments)
          setCategories(["All", "Dresses", "Suits", "Tops", "Outerwear", "Jeans"])
        }
      } catch (err) {
        console.error("Error in fetchGarments:", err)
        setError("Failed to load garments. Please try again later.")

        // Fallback to mock data if everything fails
        console.log("Using fallback garment data due to error")
        setGarments(fallbackGarments)
        setCategories(["All", "Dresses", "Suits", "Tops", "Outerwear", "Jeans"])
      } finally {
        setLoading(false)
      }
    }

    fetchGarments()
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

    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Maximum size is 10MB.")
      return
    }

    // Validate file type
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

    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Maximum size is 10MB.")
      return
    }

    // Validate file type
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

  // Handle garment selection
  const handleGarmentSelect = (id) => {
    const garment = garments.find((g) => g.id === id)
    setSelectedGarment(id)
    setSelectedGarmentDetails(garment)

    if (garment && garment.colors && garment.colors.length > 0) {
      setSelectedColor(garment.colors[0])
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

    // Update color analysis when color changes
    if (userSkinTone) {
      analyzeColorMatch(color)
    }
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
    const bustFit = calculateFitPercentage(Number.parseFloat(userMeasurements.bust), standardSize.bust)
    const waistFit = calculateFitPercentage(Number.parseFloat(userMeasurements.waist), standardSize.waist)
    const hipsFit = calculateFitPercentage(Number.parseFloat(userMeasurements.hips), standardSize.hips)

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

  // Analyze if the selected color matches the user's skin tone
  const analyzeColorMatch = (color) => {
    if (!userSkinTone || userSkinTone === "") {
      return
    }

    const palette = skinToneColorPalettes[userSkinTone] || skinToneColorPalettes["medium"]

    // Check if color is in recommended or avoid lists
    const isRecommended = palette.recommended.includes(color)
    const shouldAvoid = palette.avoid.includes(color)

    let matchScore = 0
    let matchMessage = ""

    if (isRecommended) {
      matchScore = 90
      matchMessage = `This color complements your ${userSkinTone} skin tone beautifully.`
    } else if (shouldAvoid) {
      matchScore = 30
      matchMessage = `This color may not be the most flattering for your ${userSkinTone} skin tone.`
    } else {
      matchScore = 60
      matchMessage = `This color is a neutral choice for your ${userSkinTone} skin tone.`
    }

    setColorAnalysis({
      matchScore,
      matchMessage,
      isRecommended,
      shouldAvoid,
    })
  }

  // Process virtual try-on
  const handleTryOn = async () => {
    if ((!userPhoto && inputMethod === "photo") || !selectedGarment) {
      alert("Please provide a photo and select a garment first")
      return
    }

    setTryOnLoading(true)
    setTryOnError(null)

    try {
      // Get selected garment details
      const garmentDetails = garments.find((g) => g.id === selectedGarment)

      if (!garmentDetails) {
        throw new Error("Selected garment not found")
      }

      // Set the selected garment details for the 3D model
      setSelectedGarmentDetails(garmentDetails)

      // If we're using measurements, analyze the fit
      if (inputMethod === "measurements") {
        analyzeFit(selectedSize)
      }

      // Analyze color match with skin tone
      if (userSkinTone) {
        analyzeColorMatch(selectedColor)
      }
    } catch (err) {
      console.error("Error processing try-on:", err)
      setTryOnError("Failed to process virtual try-on. Please try again.")

      // Generate mock fit and color analysis for demo
      if (inputMethod === "measurements") {
        setFitAnalysis({
          overallFit: 65,
          fitPosition: 65,
          fitMessage: "This size appears to be a good fit based on your measurements, with a slightly relaxed fit.",
          details: {
            bust: 70,
            waist: 60,
            hips: 65,
          },
        })
      }

      if (userSkinTone) {
        setColorAnalysis({
          matchScore: 75,
          matchMessage: `This color generally works well with your ${userSkinTone} skin tone.`,
          isRecommended: true,
          shouldAvoid: false,
        })
      }
    } finally {
      setTryOnLoading(false)
    }
  }

  // Handle adding item to cart
  const handleAddToCart = async () => {
    if (!selectedGarment) return

    try {
      await axios.post("http://localhost:5005/api/cart", {
        garmentId: selectedGarment,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      })

      alert("Item added to cart successfully!")
    } catch (err) {
      console.error("Error adding to cart:", err)
      alert("Failed to add item to cart. Please try again.")
    }
  }

  // Handle saving design
  const handleSaveDesign = async () => {
    if (!selectedGarment) return

    try {
      await axios.post("http://localhost:5005/api/custom-designs", {
        garmentId: selectedGarment,
        size: selectedSize,
        color: selectedColor,
        userMeasurements: inputMethod === "measurements" ? userMeasurements : null,
      })

      alert("Design saved successfully!")
    } catch (err) {
      console.error("Error saving design:", err)
      alert("Failed to save design. Please try again.")
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

    if (activeStep === 2 && !selectedGarment) {
      alert("Please select a garment first")
      return
    }

    if (activeStep === 2) {
      handleTryOn()
    }

    setActiveStep((prev) => Math.min(prev + 1, 3))
  }

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1))
  }

  // Filter garments by category
  const filteredGarments =
    activeCategory === "All" ? garments : garments.filter((garment) => garment.category === activeCategory)

  // Add a useEffect to ensure garments are displayed even if API fails
  useEffect(() => {
    // If after loading completes we have no garments, use fallback data
    if (!loading && garments.length === 0) {
      console.log("No garments found after loading, using fallback data")
      setGarments(fallbackGarments)
      setCategories(["All", "Dresses", "Suits", "Tops", "Outerwear", "Jeans"])
    }
  }, [loading, garments])

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <HeroContent>
            <h1>Virtual Fitting Room</h1>
            <p>
              Try on clothes virtually before you buy. Our advanced 3D technology creates a realistic representation of
              how garments will look on your body and provides personalized fit recommendations.
            </p>
          </HeroContent>
        </div>
      </HeroSection>

      {/* Main Content */}
      <MainSection>
        <div className="container">
          <StepIndicator>
            <Step active={activeStep >= 1} completed={activeStep > 1}>
              <StepNumber>{activeStep > 1 ? <FiCheck /> : 1}</StepNumber>
              <StepLabel>Body Profile</StepLabel>
            </Step>
            <StepConnector completed={activeStep > 1} />
            <Step active={activeStep >= 2} completed={activeStep > 2}>
              <StepNumber>{activeStep > 2 ? <FiCheck /> : 2}</StepNumber>
              <StepLabel>Select Garments</StepLabel>
            </Step>
            <StepConnector completed={activeStep > 2} />
            <Step active={activeStep >= 3}>
              <StepNumber>3</StepNumber>
              <StepLabel>Try On</StepLabel>
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
                    <FiCamera />
                    <h3>Use Photo</h3>
                    <p>Upload or take a photo for our AI to analyze your body shape</p>
                  </InputOption>
                  <InputOption active={inputMethod === "measurements"} onClick={() => setInputMethod("measurements")}>
                    <FiSliders />
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
                          <button onClick={capturePhoto} className="btn btn-gold">
                            Take Photo
                          </button>
                          <button onClick={switchCamera} className="btn btn-outline">
                            <FiRotateCw /> Switch Camera
                          </button>
                          <button
                            onClick={() => {
                              if (stream) {
                                stream.getTracks().forEach((track) => track.stop())
                              }
                              setCameraActive(false)
                            }}
                            className="btn btn-outline"
                          >
                            Cancel
                          </button>
                        </CameraControls>
                      </CameraInterface>
                    ) : userPhoto ? (
                      <PhotoPreview>
                        <img src={userPhoto || "/placeholder.svg"} alt="User" />
                        <PhotoControls>
                          <button onClick={() => setUserPhoto(null)} className="btn btn-outline">
                            <FiX /> Remove
                          </button>
                        </PhotoControls>
                      </PhotoPreview>
                    ) : (
                      <UploadArea onDragOver={handleDragOver} onDrop={handleDrop}>
                        <FiUpload />
                        <p>Drag and drop your photo here or</p>
                        <div className="upload-buttons">
                          <label className="btn btn-gold">
                            Browse Files
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              style={{ display: "none" }}
                            />
                          </label>
                          <button onClick={startCamera} className="btn btn-outline">
                            <FiCamera /> Use Camera
                          </button>
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

                    {userPhoto && (
                      <SkinToneSelector>
                        <h3>Select your skin tone:</h3>
                        <div className="skin-tones">
                          <SkinTone
                            color="#F5D5C5"
                            active={userSkinTone === "fair"}
                            onClick={() => handleSkinToneSelect("fair")}
                            label="Fair"
                          />
                          <SkinTone
                            color="#D8A990"
                            active={userSkinTone === "medium"}
                            onClick={() => handleSkinToneSelect("medium")}
                            label="Medium"
                          />
                          <SkinTone
                            color="#B07B59"
                            active={userSkinTone === "olive"}
                            onClick={() => handleSkinToneSelect("olive")}
                            label="Olive"
                          />
                          <SkinTone
                            color="#70461E"
                            active={userSkinTone === "dark"}
                            onClick={() => handleSkinToneSelect("dark")}
                            label="Dark"
                          />
                        </div>
                      </SkinToneSelector>
                    )}
                  </PhotoInputSection>
                )}

                {inputMethod === "measurements" && (
                  <MeasurementsInputSection>
                    <div className="measurements-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="bust">Bust (inches)</label>
                          <input
                            type="number"
                            id="bust"
                            name="bust"
                            value={userMeasurements.bust}
                            onChange={handleMeasurementChange}
                            placeholder="e.g., 36"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="waist">Waist (inches)</label>
                          <input
                            type="number"
                            id="waist"
                            name="waist"
                            value={userMeasurements.waist}
                            onChange={handleMeasurementChange}
                            placeholder="e.g., 28"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="hips">Hips (inches)</label>
                          <input
                            type="number"
                            id="hips"
                            name="hips"
                            value={userMeasurements.hips}
                            onChange={handleMeasurementChange}
                            placeholder="e.g., 38"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="inseam">Inseam (inches)</label>
                          <input
                            type="number"
                            id="inseam"
                            name="inseam"
                            value={userMeasurements.inseam}
                            onChange={handleMeasurementChange}
                            placeholder="e.g., 30"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="height">Height (inches)</label>
                          <input
                            type="number"
                            id="height"
                            name="height"
                            value={userMeasurements.height}
                            onChange={handleMeasurementChange}
                            placeholder="e.g., 65"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="weight">Weight (lbs)</label>
                          <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={userMeasurements.weight}
                            onChange={handleMeasurementChange}
                            placeholder="e.g., 140"
                          />
                        </div>
                      </div>
                    </div>

                    <BodyTypeSelector>
                      <h3>Select your body type:</h3>
                      <div className="body-types">
                        <BodyType
                          active={userBodyType === "hourglass"}
                          onClick={() => handleBodyTypeSelect("hourglass")}
                        >
                          <div className="body-icon hourglass-icon"></div>
                          <span>Hourglass</span>
                        </BodyType>
                        <BodyType active={userBodyType === "pear"} onClick={() => handleBodyTypeSelect("pear")}>
                          <div className="body-icon pear-icon"></div>
                          <span>Pear</span>
                        </BodyType>
                        <BodyType
                          active={userBodyType === "rectangle"}
                          onClick={() => handleBodyTypeSelect("rectangle")}
                        >
                          <div className="body-icon rectangle-icon"></div>
                          <span>Rectangle</span>
                        </BodyType>
                        <BodyType
                          active={userBodyType === "inverted triangle"}
                          onClick={() => handleBodyTypeSelect("inverted triangle")}
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

                    <SkinToneSelector>
                      <h3>Select your skin tone:</h3>
                      <div className="skin-tones">
                        <SkinTone
                          color="#F5D5C5"
                          active={userSkinTone === "fair"}
                          onClick={() => handleSkinToneSelect("fair")}
                          label="Fair"
                        />
                        <SkinTone
                          color="#D8A990"
                          active={userSkinTone === "medium"}
                          onClick={() => handleSkinToneSelect("medium")}
                          label="Medium"
                        />
                        <SkinTone
                          color="#B07B59"
                          active={userSkinTone === "olive"}
                          onClick={() => handleSkinToneSelect("olive")}
                          label="Olive"
                        />
                        <SkinTone
                          color="#70461E"
                          active={userSkinTone === "dark"}
                          onClick={() => handleSkinToneSelect("dark")}
                          label="Dark"
                        />
                      </div>
                    </SkinToneSelector>
                  </MeasurementsInputSection>
                )}

                <ButtonGroup>
                  <button
                    className="btn btn-gold"
                    onClick={handleNextStep}
                    disabled={
                      (inputMethod === "photo" && !userPhoto) ||
                      (inputMethod === "measurements" &&
                        (!userMeasurements.bust || !userMeasurements.waist || !userMeasurements.hips))
                    }
                  >
                    Continue <FiArrowRight />
                  </button>
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
                      {filteredGarments.length === 0 ? (
                        <NoGarmentsMessage>No garments found in this category.</NoGarmentsMessage>
                      ) : (
                        filteredGarments.map((garment) => (
                          <GarmentCard
                            key={garment.id}
                            selected={selectedGarment === garment.id}
                            onClick={() => handleGarmentSelect(garment.id)}
                          >
                            <GarmentImage>
                              <img src={garment.image || "/placeholder.svg?height=300&width=200"} alt={garment.name} />
                              {selectedGarment === garment.id && (
                                <SelectedBadge>
                                  <FiCheck />
                                </SelectedBadge>
                              )}
                            </GarmentImage>
                            <GarmentInfo>
                              <h3>{garment.name}</h3>
                              <p className="price">${garment.price}</p>
                              <p className="category">{garment.category}</p>
                            </GarmentInfo>
                          </GarmentCard>
                        ))
                      )}
                    </GarmentGrid>

                    {selectedGarmentDetails && (
                      <GarmentDetails>
                        <h3>Selected Garment Details</h3>
                        <p className="description">{selectedGarmentDetails.description}</p>

                        <div className="options-container">
                          <div className="size-selector">
                            <h4>Size</h4>
                            <div className="sizes">
                              {selectedGarmentDetails.sizes.map((size) => (
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
                              {selectedGarmentDetails.colors.map((color) => (
                                <ColorOption
                                  key={color}
                                  color={color}
                                  active={selectedColor === color}
                                  onClick={() => handleColorSelect(color)}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </GarmentDetails>
                    )}
                  </>
                )}

                <ButtonGroup>
                  <button className="btn btn-outline" onClick={handlePrevStep}>
                    Back
                  </button>
                  <button className="btn btn-gold" onClick={handleNextStep} disabled={!selectedGarment || loading}>
                    Try On <FiArrowRight />
                  </button>
                </ButtonGroup>
              </SelectGarmentsStep>
            )}

            {activeStep === 3 && (
              <TryOnStep>
                <h2>Virtual Try-On</h2>
                <p>
                  Here's how the selected garment looks on you in 3D. You can rotate the view, adjust size and color to
                  see different options.
                </p>

                <TryOnContainer>
                  <TryOnViewer>
                    <div className="try-on-image">
                      {tryOnLoading ? (
                        <LoadingIndicator>Processing your virtual try-on...</LoadingIndicator>
                      ) : tryOnError ? (
                        <ErrorMessage>{tryOnError}</ErrorMessage>
                      ) : (
                        <div style={{ width: "100%", height: "100%" }}>
                          <TryOnScene
                            userPhoto={userPhoto}
                            selectedGarment={selectedGarmentDetails}
                            selectedColor={selectedColor}
                          />
                        </div>
                      )}
                    </div>
                    <TryOnControls>
                      <button>
                        <FiRotateCw /> Rotate View
                      </button>
                      <button>
                        <FiMaximize /> Fullscreen
                      </button>
                    </TryOnControls>
                  </TryOnViewer>

                  <TryOnOptions>
                    {selectedGarmentDetails && (
                      <TryOnInfo>
                        <h3>{selectedGarmentDetails.name}</h3>
                        <p className="price">${selectedGarmentDetails.price}</p>
                        <p className="description">{selectedGarmentDetails.description}</p>

                        <div className="size-selector">
                          <h4>Size</h4>
                          <div className="sizes">
                            {selectedGarmentDetails.sizes.map((size) => (
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
                            {selectedGarmentDetails.colors.map((color) => (
                              <ColorOption
                                key={color}
                                color={color}
                                active={selectedColor === color}
                                onClick={() => handleColorSelect(color)}
                              />
                            ))}
                          </div>
                        </div>

                        {fitAnalysis && (
                          <FitAnalysis>
                            <h4>
                              Fit Analysis <FiInfo />
                            </h4>
                            <FitBar>
                              <FitIndicator position={fitAnalysis.fitPosition} />
                            </FitBar>
                            <FitLabels>
                              <span>Too Tight</span>
                              <span>Perfect Fit</span>
                              <span>Too Loose</span>
                            </FitLabels>
                            <FitMessage>{fitAnalysis.fitMessage}</FitMessage>

                            <FitDetails>
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
                            </FitDetails>
                          </FitAnalysis>
                        )}

                        {colorAnalysis && (
                          <ColorAnalysis>
                            <h4>
                              Color Analysis <FiInfo />
                            </h4>
                            <ColorMatchBar>
                              <ColorMatchIndicator score={colorAnalysis.matchScore} />
                            </ColorMatchBar>
                            <ColorMatchLabels>
                              <span>Not Flattering</span>
                              <span>Neutral</span>
                              <span>Ideal Match</span>
                            </ColorMatchLabels>
                            <ColorMatchMessage>{colorAnalysis.matchMessage}</ColorMatchMessage>
                          </ColorAnalysis>
                        )}

                        <ButtonGroup>
                          <button className="btn btn-gold" onClick={handleAddToCart} disabled={tryOnLoading}>
                            <FiShoppingCart className="icon-left" /> Add to Cart
                          </button>
                          <button className="btn btn-outline" onClick={handleSaveDesign} disabled={tryOnLoading}>
                            <FiHeart className="icon-left" /> Save Design
                          </button>
                        </ButtonGroup>
                      </TryOnInfo>
                    )}
                  </TryOnOptions>
                </TryOnContainer>

                <ButtonGroup>
                  <button className="btn btn-outline" onClick={handlePrevStep}>
                    Back
                  </button>
                  <button className="btn btn-outline" onClick={() => setActiveStep(2)}>
                    Try Another Garment
                  </button>
                </ButtonGroup>
              </TryOnStep>
            )}
          </StepContent>
        </div>
      </MainSection>

      {/* Features Section */}
      <FeaturesSection>
        <div className="container">
          <h2>Key Features of Our 3D Virtual Fitting Room</h2>

          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <FiUser />
              </FeatureIcon>
              <h3>3D Body Visualization</h3>
              <p>
                Our advanced 3D technology creates a realistic model of how clothes will look on your body from every
                angle.
              </p>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FiRotateCw />
              </FeatureIcon>
              <h3>360° Visualization</h3>
              <p>View garments from all angles to get a complete understanding of the fit and style.</p>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FiCheck />
              </FeatureIcon>
              <h3>Personalized Recommendations</h3>
              <p>Get personalized size and color recommendations based on your body shape and skin tone.</p>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>
    </PageContainer>
  )
}

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  background: linear-gradient(to right, rgba(242, 240, 235, 0.9), rgba(227, 223, 214, 0.7));
  --gold-primary: #D4AF37;
  --gold-light: #F4D160;
  --gold-dark: #AA8C2C;
  --luxury-black: #1A1A1A;
`

const HeroSection = styled.section`
  background: linear-gradient(
    to right,
    rgba(4, 5, 7, 0.7),
    rgba(223, 223, 224, 0.5)
  ), url("/placeholder.svg?height=800&width=1600");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 8rem 0;
  text-align: center;
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.3rem;
    line-height: 1.7;
  }
`

const MainSection = styled.section`
  padding: 5rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
`

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  ${(props) =>
    props.active &&
    `
    .step-number {
      background-color: var(--gold-primary);
      color: black;
    }
  `}

  ${(props) =>
    props.completed &&
    `
    .step-number {
      background-color: var(--gold-primary);
      color: black;
    }
  `}
`

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.5);
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
  width: 100px;
  height: 2px;
  background-color: ${(props) => (props.completed ? "var(--gold-primary)" : "rgba(0, 0, 0, 0.1)")};
  margin: 0 1rem;

  @media (max-width: 768px) {
    width: 50px;
  }
`

const StepContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`

// Body Profile Step Components
const BodyProfileStep = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: black;
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
  padding: 2rem;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.active ? "var(--gold-primary)" : "rgba(0, 0, 0, 0.1)")};
  background: ${(props) => (props.active ? "rgba(212, 175, 55, 0.05)" : "white")};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--gold-primary);
  }

  svg {
    font-size: 2rem;
    color: var(--gold-primary);
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    color: black;
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
    border-color: var(--gold-primary);
  }

  svg {
    font-size: 3rem;
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

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    svg {
      font-size: 1rem;
      margin-right: 0.5rem;
      margin-bottom: 0;
    }
  }

  .btn-gold {
    background: var(--gold-primary);
    color: black;
    border: none;

    &:hover {
      background: var(--gold-dark);
    }
  }

  .btn-outline {
    background: transparent;
    color: black;
    border: 1px solid black;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`

const CameraInterface = styled.div`
  margin-bottom: 2rem;
  
  video {
    width: 100%;
    max-height: 500px;
    border-radius: 8px;
    background-color: #000;
    margin-bottom: 1rem;
  }
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
      border-color: var(--gold-primary);
    }
  }
`

const CameraControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  
  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    svg {
      margin-right: 0.5rem;
      font-size: 1rem;
    }
  }

  .btn-gold {
    background: var(--gold-primary);
    color: black;
    border: none;

    &:hover {
      background: var(--gold-dark);
    }
  }

  .btn-outline {
    background: transparent;
    color: black;
    border: 1px solid black;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
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
  
  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    svg {
      margin-right: 0.5rem;
    }
  }

  .btn-outline {
    background: transparent;
    color: black;
    border: 1px solid black;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`

const PhotoTips = styled.div`
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: black;
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
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    
    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }
  
  .form-group {
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
        border-color: var(--gold-primary);
      }
    }
  }
`

const BodyTypeSelector = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: black;
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
  border: 2px solid ${(props) => (props.active ? "var(--gold-primary)" : "rgba(0, 0, 0, 0.1)")};
  background: ${(props) => (props.active ? "rgba(212, 175, 55, 0.05)" : "white")};
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100px;
  
  &:hover {
    border-color: var(--gold-primary);
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

const SkinToneSelector = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: black;
  }
  
  .skin-tones {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
`

const SkinTone = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 3px solid ${(props) => (props.active ? "var(--gold-primary)" : "transparent")};
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &::after {
    content: "${(props) => props.label}";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8rem;
    white-space: nowrap;
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

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    svg {
      margin-left: 0.5rem;
    }
    
    .icon-left {
      margin-right: 0.5rem;
      margin-left: 0;
    }
  }

  .btn-gold {
    background: var(--gold-primary);
    color: black;
    border: none;

    &:hover {
      background: var(--gold-dark);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .btn-outline {
    background: transparent;
    color: black;
    border: 1px solid black;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`

// Select Garments Step Components
const SelectGarmentsStep = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: black;
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
  background: ${(props) => (props.active ? "var(--gold-primary)" : "transparent")};
  color: ${(props) => (props.active ? "black" : "rgba(0, 0, 0, 0.7)")};
  border: 1px solid ${(props) => (props.active ? "var(--gold-primary)" : "rgba(0, 0, 0, 0.1)")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--gold-primary);
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
  border: 2px solid ${(props) => (props.selected ? "var(--gold-primary)" : "transparent")};

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
  background: var(--gold-primary);
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
    color: black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    color: var(--gold-primary);
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
    color: black;
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
    color: black;
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

// Try On Step Components
const TryOnStep = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 2rem;
    max-width: 700px;
  }
`

const TryOnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TryOnViewer = styled.div`
  .try-on-image {
    width: 100%;
    height: 500px;
    background: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const TryOnControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.05);
    border: none;
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    transition: all 0.3s ease;

    svg {
      margin-right: 0.5rem;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`

const TryOnOptions = styled.div``

const TryOnInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: black;
  }

  .price {
    font-size: 1.2rem;
    color: var(--gold-primary);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .description {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: black;
    display: flex;
    align-items: center;
    
    svg {
      margin-left: 0.5rem;
      color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }

  .size-selector, .color-selector {
    margin-bottom: 1.5rem;
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
  border: 1px solid ${(props) => (props.active ? "var(--gold-primary)" : "rgba(0, 0, 0, 0.1)")};
  background: ${(props) => (props.active ? "var(--gold-primary)" : "transparent")};
  color: ${(props) => (props.active ? "black" : "rgba(0, 0, 0, 0.7)")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--gold-primary);
  }
`

const ColorOption = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? "var(--gold-primary)" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`

const FitAnalysis = styled.div`
  margin-bottom: 2rem;
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
  background: var(--gold-primary);
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

const FitDetails = styled.div`
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

const ColorAnalysis = styled.div`
  margin-bottom: 2rem;
`

const ColorMatchBar = styled.div`
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  margin-bottom: 0.5rem;
`

const ColorMatchIndicator = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--gold-primary);
  border-radius: 50%;
  top: 50%;
  left: ${(props) => props.score}%;
  transform: translate(-50%, -50%);
`

const ColorMatchLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
`

const ColorMatchMessage = styled.div`
  padding: 1rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 4px;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
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
  background-color: rgba(255, 0, 0, 0.1);
  color: #d32f2f;
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
  padding: 5rem 0;
  background: rgba(0, 0, 0, 0.02);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
    color: black;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const FeatureCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: black;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.6;
  }
`

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  svg {
    font-size: 2rem;
    color: var(--gold-primary);
  }
`

export default VirtualFittingRoom

