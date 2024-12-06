import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    &::-webkit-scrollbar {
      border-radius: 20px;
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.neutralL0};
      border-radius: 20px;
    }
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  textarea:focus, input:focus, select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }
`
