import React from 'react'
import { ThemeProvider } from 'styled-components'

import Homepage from './pages/Homepage'
import { GlobalStyle } from './styles/globalStyle'
import { theme } from './styles/theme'

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Homepage />
    </ThemeProvider>
  )
}

export default App
