import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --text: rgba(255, 255, 255, 0.96);
    --detail: rgba(255, 255, 255, 0.67);
    --background: #242424;
    --component-background: #1b1b1b;
    --main: #8739f9;
    --main-op: rgba(135, 57, 249, .6);

  }

  body {
    background: var(--background);
    color: var(--detail);
    position: relative;
    -webkit-font-smoothing: antialiased;
    margin: 0;
  }

  body, input, textarea, button {
    font: 400 1rem 'Inter', sans-serif;
  }

  @media(max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media(max-width: 720) {
    html {
      font-size: 87.5%;
    }
  }
`
