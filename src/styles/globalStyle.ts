import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }

    // Remove cursor
    * {
        box-sizing: border-box;
        cursor: none;
    }
`
