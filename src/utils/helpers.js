/**
 * Generates a unique ID for design elements
 * @returns {string} A unique ID string
 */
export const generateUniqueId = () => {
    return "id_" + Math.random().toString(36).substr(2, 9)
  }
  
  /**
   * Clamps a number between a minimum and maximum value
   * @param {number} num - The number to clamp
   * @param {number} min - The minimum value
   * @param {number} max - The maximum value
   * @returns {number} The clamped number
   */
  export const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max)
  }
  
  /**
   * Converts a hex color to RGBA
   * @param {string} hex - The hex color code
   * @param {number} alpha - The alpha value (0-1)
   * @returns {string} RGBA color string
   */
  export const hexToRgba = (hex, alpha = 1) => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  
  /**
   * Formats a price with currency symbol
   * @param {number} price - The price to format
   * @param {string} currency - The currency code (default: USD)
   * @returns {string} Formatted price string
   */
  export const formatPrice = (price, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price)
  }
  
  /**
   * Debounces a function call
   * @param {Function} func - The function to debounce
   * @param {number} wait - The debounce wait time in milliseconds
   * @returns {Function} Debounced function
   */
  export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  