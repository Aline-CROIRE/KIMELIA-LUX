// src/styles/theme.js
export const theme = {
    colors: {
      gold: {
        main: '#D4AF37',
        light: '#F5E7A3',
        dark: '#AA8C2C',
      },
      silver: {
        main: '#C0C0C0',
        light: '#E8E8E8',
        dark: '#A0A0A0',
      },
      black: {
        main: '#050505',
        light: '#333333',
      },
      cream: '#FFFDD0',
      white: '#FFFFFF',
      gray: {
        light: '#F5F5F5',
        main: '#CCCCCC',
        dark: '#888888',
      },
    },
    gradients: {
      goldGradient: 'linear-gradient(135deg, #D4AF37 0%, #F5E7A3 50%, #D4AF37 100%)',
      silverGradient: 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #C0C0C0 100%)',
      darkGradient: 'linear-gradient(135deg, #050505 0%, #333333 50%, #050505 100%)',
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Montserrat', sans-serif",
    },
    breakpoints: {
      mobile: '576px',
      tablet: '768px',
      desktop: '1024px',
      large: '1200px',
    },
  };