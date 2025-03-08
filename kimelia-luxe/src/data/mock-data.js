// src/data/mock-data.js
export const products = [
    {
      id: 1,
      name: "Elegant Silk Evening Gown",
      designer: "KIM Couture",
      category: "Dresses / Evening Wear",
      price: 299.99,
      originalPrice: 349.99,
      discount: "15%",
      rating: 4.8,
      reviewCount: 24,
      description:
        "This stunning silk evening gown features a flattering A-line silhouette with delicate embroidery details. Perfect for formal events and special occasions, this dress combines timeless elegance with modern design elements.",
      colors: [
        { id: 1, name: "Black", code: "#000000", selected: true },
        { id: 2, name: "Navy Blue", code: "#000080", selected: false },
        { id: 3, name: "Burgundy", code: "#800020", selected: false },
        { id: 4, name: "Emerald", code: "#50C878", selected: false },
      ],
      sizes: [
        { id: 1, name: "XS", available: true, selected: false },
        { id: 2, name: "S", available: true, selected: true },
        { id: 3, name: "M", available: true, selected: false },
        { id: 4, name: "L", available: true, selected: false },
        { id: 5, name: "XL", available: false, selected: false },
      ],
      features: [
        "100% Premium Silk Material",
        "Hand-embroidered Details",
        "Fully Lined Interior",
        "Hidden Side Zipper",
        "Designed and Made in Rwanda",
      ],
      isCustom: true,
      sku: "ED-12345",
      designer: "KIM Couture",
      images: [
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
      ],
    },
    {
      id: 2,
      name: "Silk Cocktail Dress",
      designer: "KIM Couture",
      price: 149.99,
      image: "/placeholder.svg?height=250&width=250",
    },
    {
      id: 3,
      name: "Embroidered Gown",
      designer: "Bridal Dreams",
      price: 229.99,
      image: "/placeholder.svg?height=250&width=250",
    },
    {
      id: 4,
      name: "Satin Wrap Dress",
      designer: "Fresh Designs",
      price: 179.99,
      image: "/placeholder.svg?height=250&width=250",
    },
    {
      id: 5,
      name: "Beaded Evening Dress",
      designer: "KIM Couture",
      price: 259.99,
      image: "/placeholder.svg?height=250&width=250",
    },
  ];
  
  export const relatedProducts = [
    {
      id: 2,
      name: "Silk Cocktail Dress",
      designer: "KIM Couture",
      price: 149.99,
      image: "/placeholder.svg?height=250&width=250",
    },
    {
      id: 3,
      name: "Embroidered Gown",
      designer: "Bridal Dreams",
      price: 229.99,
      image: "/placeholder.svg?height=250&width=250",
    },
    {
      id: 4,
      name: "Satin Wrap Dress",
      designer: "Fresh Designs",
      price: 179.99,
      image: "/placeholder.svg?height=250&width=250",
    },
    {
      id: 5,
      name: "Beaded Evening Dress",
      designer: "KIM Couture",
      price: 259.99,
      image: "/placeholder.svg?height=250&width=250",
    },
  ];
  
  export const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "August 15, 2023",
      rating: 5,
      text: "This dress exceeded my expectations! The quality of the silk is exceptional, and the fit is perfect. I received so many compliments when I wore it to a gala event. Definitely worth the investment."
    },
    {
      id: 2,
      name: "Michael Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "July 28, 2023",
      rating: 4,
      text: "Purchased this for my wife and she absolutely loves it. The craftsmanship is excellent and the design is elegant. The only reason for 4 stars instead of 5 is that the delivery took longer than expected."
    },
    {
      id: 3,
      name: "Emily Parker",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "June 10, 2023",
      rating: 5,
      text: "The customization options made this purchase special. I was able to adjust the length and neckline to my preferences. The final product is stunning and fits like it was made for me - because it was!"
    }
  ];