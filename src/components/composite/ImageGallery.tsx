import { motion } from 'framer-motion'
import React, { useState } from 'react'
import ReactScrollWheelHandler from 'react-scroll-wheel-handler'
import styled, { css } from 'styled-components'

import { galleryData } from '../../data/galleryData'
import { getByInfiniteIndex } from '../../utils/arrayUtils'
import Image from '../ui/Image'

import Cursor from './Cursor'

const galleryItemVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const ImageGallery = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const loadPrevious = () => {
    setCurrentIndex((prev) => prev - 1)
  }

  const loadNext = () => {
    setCurrentIndex((prev) => prev + 1)
  }

  const initialElement = getByInfiniteIndex(galleryData, currentIndex - 2)
  const previousElement = getByInfiniteIndex(galleryData, currentIndex - 1)
  const currentElement = getByInfiniteIndex(galleryData, currentIndex)
  const nextElement = getByInfiniteIndex(galleryData, currentIndex + 1)
  const lastElement = getByInfiniteIndex(galleryData, currentIndex + 2)

  return (
    <>
      <Cursor />
      <ReactScrollWheelHandler
        upHandler={() => loadNext()}
        downHandler={() => loadPrevious()}
        timeout={600}
        disableSwipe
      >
        <Container>
          {[
            initialElement,
            previousElement,
            currentElement,
            nextElement,
            lastElement,
          ].map((item, index) => {
            const status =
              index === 0
                ? 'initial'
                : index === 1
                ? 'previous'
                : index === 2
                ? 'current'
                : index === 3
                ? 'next'
                : 'last'

            return (
              <ImageWrapper
                key={currentIndex + index}
                layout
                variants={galleryItemVariants}
                animate={
                  status === 'initial' || status === 'last'
                    ? 'hidden'
                    : 'visible'
                }
                onClick={() =>
                  status === 'previous'
                    ? loadNext()
                    : status === 'next'
                    ? loadPrevious()
                    : undefined
                }
                as={motion.div}
                transition={{ ease: 'easeOut', duration: 1 }}
                status={status}
              >
                <ImageItem
                  src={item.image1X}
                  srcRetina={item.image2X}
                  alt={''}
                />
              </ImageWrapper>
            )
          })}
          <Text as={motion.p}>{currentElement.title}</Text>
        </Container>
      </ReactScrollWheelHandler>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: gray;
  display: grid;
  gap: 2rem;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'before current next';
  overflow: hidden;
  position: relative;
`

const Text = styled.p`
  grid-area: current;
  font-size: 5rem;
  align-self: center;
  justify-self: center;
`

type ImageWrapperProps = {
  status: 'initial' | 'previous' | 'current' | 'next' | 'last'
}

const imageVariant = ({ status }: ImageWrapperProps) => {
  switch (status) {
    case 'initial':
      return css`
        position: absolute;
        bottom: 0;
        left: -300px;
      `

    case 'previous':
      return css`
        grid-area: before;

        align-self: end;
        justify-self: start;
      `

    case 'current':
      return css`
        grid-area: current;

        align-self: center;
        justify-self: center;
      `

    case 'next':
      return css`
        grid-area: next;

        align-self: start;
        justify-self: end;
      `

    case 'last':
      return css`
        position: absolute;
        top: 0;
        right: -300px;
      `
  }
}

const ImageWrapper = styled.div<ImageWrapperProps>`
  border-radius: 0.625rem;
  border: 1px solid #000000;
  overflow: hidden;

  ${({ status }) =>
    status === 'current'
      ? css`
          height: 680px;
          width: 512px;
        `
      : css`
          height: 330px;
          width: 248px;
        `}

  ${imageVariant};
`

const ImageItem = styled(Image)`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
`

export default ImageGallery
