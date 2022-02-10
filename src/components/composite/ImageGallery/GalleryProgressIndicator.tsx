import React from 'react'
import styled, { css } from 'styled-components'

import Text from '../../ui/Text'

type Props = {
  currentIndex: number
  totalItems: number
}

const GalleryProgressIndicator = ({
  currentIndex,
  totalItems,
}: Props): JSX.Element => {
  return (
    <Wrapper>
      <Text variant={'body'}>
        {currentIndex} of {totalItems}
      </Text>
      <ProgressIndicatorsWrapper>
        {[...Array(totalItems)].map((_, index) => (
          <ProgressIndicator key={index} isActive={index < currentIndex} />
        ))}
      </ProgressIndicatorsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

const ProgressIndicatorsWrapper = styled.div`
  display: flex;
  gap: 8px;
`

type ProgressIndicatorProps = {
  isActive: boolean
}

const ProgressIndicator = styled.div<ProgressIndicatorProps>`
  width: 5px;
  height: 8px;

  border-radius: 2px;
  border: 1px solid #ffffff;

  ${({ isActive }) =>
    isActive
      ? css`
          background-color: #ffffff;
        `
      : ''}
`

export default GalleryProgressIndicator
