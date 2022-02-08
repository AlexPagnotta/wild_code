import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;

        // Remove cursor
        cursor: none;
    }

    body {
        margin: 0;
        font-family: ${theme.fontFamily.base};
        color: white;
    }

    h1, h2, h3, h4, h5, p {
    margin: 0;
  }
`
