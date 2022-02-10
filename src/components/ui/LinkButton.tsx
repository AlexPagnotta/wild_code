import React, { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  href: string
  openInNewTab?: boolean
  className?: string
  children?: ReactNode
}

const LinkButton = ({
  href,
  openInNewTab,
  className,
  children,
}: Props): JSX.Element => {
  const openInNewTabAttrs = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : undefined

  return (
    <StyledLink href={href} {...openInNewTabAttrs} className={className}>
      {children}
    </StyledLink>
  )
}

const StyledLink = styled.a`
  display: inline-block;
  text-align: center;

  background-color: white;
  color: black;
  padding: 9px 16px 8px;
  border-radius: 24px;

  font-family: ${({ theme }) => theme.fontFamily.base};
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
`

export default LinkButton
