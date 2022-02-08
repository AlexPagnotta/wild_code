import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { galleryData } from '../data/galleryData'
import { getByInfiniteIndex } from '../utils/arrayUtils'

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
            <Image
              key={currentIndex + index}
              layout
              variants={galleryItemVariants}
              animate={
                status === 'initial' || status === 'last' ? 'hidden' : 'visible'
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
              {currentIndex + index}
            </Image>
          )
        })}
      </Container>
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
  overflow: hidden;
  position: relative;
`

type ImageProps = {
  status: 'initial' | 'previous' | 'current' | 'next' | 'last'
}

const imageVariant = ({ status }: ImageProps) => {
  switch (status) {
    case 'initial':
      return css`
        position: absolute;
        bottom: 0;
        left: -300px;
      `

    case 'previous':
      return css`
        align-self: end;
        justify-self: start;
      `

    case 'current':
      return css`
        align-self: center;
        justify-self: center;
      `

    case 'next':
      return css`
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

const Image = styled.div<ImageProps>`
  background-color: red;
  border-radius: 2rem;

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

export default ImageGallery
