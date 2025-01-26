import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.palette.text.primary};
  }

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: none;

    &:hover {
      text-decoration: underline
    }
  }
`;
