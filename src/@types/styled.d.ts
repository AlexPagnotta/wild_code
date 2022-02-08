/* eslint-disable @typescript-eslint/consistent-type-definitions */
import 'styled-components'

declare module 'styled-components' {
  export interface Theme {
    screens: {
      sm: number
      md: number
      lg: number
      xl: number
      '2xl': number
    }

    fontFamily: {
      title: string
      base: string
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
