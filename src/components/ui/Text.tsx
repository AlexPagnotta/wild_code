import React, { ReactNode } from 'react'
import styled from 'styled-components'

type TextVariants = 'h1' | 'h4' | 'body'

type Props = {
  variant?: TextVariants
  className?: string
  children?: ReactNode
}

const Text = ({
  variant = 'body',
  className,
  children,
}: Props): JSX.Element => {
  return variant === 'h1' ? (
    <H1 className={className}>{children}</H1>
  ) : variant === 'h4' ? (
    <H4 className={className}>{children}</H4>
  ) : (
    <Body className={className}>{children}</Body>
  )
}

const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.title};
  font-weight: 400;

  letter-spacing: 0.04em;
  text-transform: uppercase;

  font-size: 60px;
  line-height: 50px;

  @media (min-width: ${({ theme }) => `${theme.screens.md}px`}) {
    font-size: 100px;
    line-height: 80px;
  }

  @media (min-width: ${({ theme }) => `${theme.screens.xl}px`}) {
    font-size: 220px;
    line-height: 176px;
  }
`

const H4 = styled.h4`
  font-family: ${({ theme }) => theme.fontFamily.title};
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const Body = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.base};
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

export default Text
