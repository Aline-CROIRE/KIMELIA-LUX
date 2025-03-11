import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --gold-primary: #D4AF37;
    --gold-light: #F5E7A3;
    --gold-dark: #AA8C2C;
    --silver-primary: #C0C0C0;
    --silver-light: #E8E8E8;
    --silver-dark: #A0A0A0;
    --luxury-black: #050505;
    --luxury-gray: #333333;
    --cream: #FFFDD0;
    --white: #FFFFFF;
    --text-primary: #333333;
    --text-secondary: #666666;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    color: var(--text-primary);
    background-color: var(--white);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .gradient-gold {
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
  }

  .gradient-silver {
    background: linear-gradient(135deg, var(--silver-primary) 0%, var(--silver-light) 50%, var(--silver-primary) 100%);
  }

  .gradient-luxury {
    background: linear-gradient(135deg, var(--luxury-black) 0%, var(--luxury-gray) 50%, var(--luxury-black) 100%);
    color: var(--white);
  }

  .text-gradient-gold {
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-gold {
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 50%, var(--gold-primary) 100%);
    color: var(--luxury-black);
    border: none;
  }

  .btn-silver {
    background: linear-gradient(135deg, var(--silver-primary) 0%, var(--silver-light) 50%, var(--silver-primary) 100%);
    color: var(--luxury-black);
    border: none;
  }

  .btn-outline {
    background: transparent;
    border: 2px solid var(--gold-primary);
    color: var(--gold-primary);
  }

  .btn-outline:hover {
    background-color: rgba(212, 175, 55, 0.1);
  }
`;

export default GlobalStyles;