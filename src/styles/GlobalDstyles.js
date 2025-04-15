import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  :root {
    /* Light Theme Colors */
    --color-background: #FFFFFF;
    --color-foreground: #111111;
    --color-primary: #D4AF37; /* Gold */
    --color-primary-light: #F2E6C2;
    --color-primary-dark: #AA8C2C;
    --color-secondary: #222222;
    --color-accent: #F8F4E3;
    --color-muted: #F5F5F5;
    --color-border: #E0E0E0;
    --color-success: #4CAF50;
    --color-warning: #FF9800;
    --color-error: #F44336;
    --color-info: #2196F3;
    
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
    
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 1rem;
    --radius-full: 9999px;
  }
  
  .dark {
    --color-background: #111111;
    --color-foreground: #FFFFFF;
    --color-primary: #D4AF37; /* Gold remains the same */
    --color-primary-light: #AA8C2C;
    --color-primary-dark: #F2E6C2;
    --color-secondary: #2A2A2A;
    --color-accent: #1A1A1A;
    --color-muted: #222222;
    --color-border: #333333;
    --color-success: #4CAF50;
    --color-warning: #FF9800;
    --color-error: #F44336;
    --color-info: #2196F3;
    
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    font-family: 'Poppins', 'Montserrat', sans-serif;
    background-color: var(--color-background);
    color: var(--color-foreground);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--color-primary-dark);
    }
  }
  
  button, input, select, textarea {
    font-family: inherit;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--color-muted);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: var(--radius-full);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary-dark);
  }
`

export default GlobalStyles

