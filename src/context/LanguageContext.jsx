"use client"

import { createContext, useState, useEffect } from "react"

// Available languages
export const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
]

// Create context
export const LanguageContext = createContext()

const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or default to English
  const getInitialLanguage = () => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language")
      if (savedLanguage) return savedLanguage

      // Check browser language
      const browserLang = navigator.language.split("-")[0]
      return languages.some((lang) => lang.code === browserLang) ? browserLang : "en"
    }
    return "en" // Default for SSR
  }

  const [language, setLanguage] = useState("en") // Default to English for initial render
  const [translations, setTranslations] = useState({})

  // Set language on client-side after mount
  useEffect(() => {
    setLanguage(getInitialLanguage())
  }, [])

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // For simplicity, we'll use a basic translations object
        // In a real app, you'd fetch this from a file or API
        const basicTranslations = {
          en: {
            dashboard: "Dashboard",
            settings: "Settings",
            users: "Users",
            products: "Products",
            orders: "Orders",
            analytics: "Analytics",
            designers: "Designers",
            sellers: "Sellers",
            designs: "Designs",
            sketches: "Sketches",
            customOrders: "Custom Orders",
            inventory: "Inventory",
            sales: "Sales",
            profile: "Profile",
            logout: "Logout",
            search: "Search...",
          },
          fr: {
            dashboard: "Tableau de Bord",
            settings: "Paramètres",
            users: "Utilisateurs",
            products: "Produits",
            orders: "Commandes",
            analytics: "Analytique",
            designers: "Designers",
            sellers: "Vendeurs",
            designs: "Designs",
            sketches: "Croquis",
            customOrders: "Commandes Personnalisées",
            inventory: "Inventaire",
            sales: "Ventes",
            profile: "Profil",
            logout: "Déconnexion",
            search: "Rechercher...",
          },
        }

        setTranslations(basicTranslations[language] || basicTranslations.en)

        if (typeof window !== "undefined") {
          localStorage.setItem("language", language)
          document.documentElement.lang = language
        }
      } catch (error) {
        console.error("Failed to load translations:", error)
      }
    }

    loadTranslations()
  }, [language])

  // Translate function
  const t = (key) => {
    return translations[key] || key
  }

  // Change language
  const changeLanguage = (code) => {
    if (languages.some((lang) => lang.code === code)) {
      setLanguage(code)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, languages }}>{children}</LanguageContext.Provider>
  )
}

export default LanguageProvider

