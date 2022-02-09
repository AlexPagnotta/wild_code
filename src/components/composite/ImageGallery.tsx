import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { galleryData } from '../../data/galleryData'
import { getByInfiniteIndex } from '../../utils/arrayUtils'
import Image from '../ui/Image'
import LinkButton from '../ui/LinkButton'
import Text from '../ui/Text'

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

      <Wrapper>
        <HeaderTitle variant='h4'> XYZ Photography</HeaderTitle>
        <AnimatePresence>
          <Background
            key={`background_${currentElement.id}`}
            src={currentElement.image1X}
            srcRetina={currentElement.image2X}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <Grid>
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
          <AnimatePresence exitBeforeEnter>
            <TextWrapper
              key={`title_${currentElement.id}`}
              as={motion.p}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Text variant='h1'>{currentElement.title}</Text>
            </TextWrapper>
          </AnimatePresence>
        </Grid>
        <InfoWrapper>
          <Text>
            {currentElement.authorName}
            {'\n'}for {currentElement.client}
          </Text>
          <Text>{currentElement.pubblicationDate}</Text>
          <LinkButton href={currentElement.authorSite}>HAVE A LOOK</LinkButton>
          {/**/}
        </InfoWrapper>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  position: relative;
  overflow: hidden;

  padding: 16px;
`

const HeaderTitle = styled(Text)`
  position: absolute;
  top: 16px;
  left: 16px;
`

type BackgroundProps = {
  src: string
  srcRetina: string
}

const Background = styled(motion.div)<BackgroundProps>`
  ${({ src, srcRetina }) =>
    src
      ? css`
          background-image: url('${src}');
          background-image: image-set(url('${srcRetina}') 2x);
        `
      : null};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  width: 100%;
  height: 100%;

  position: absolute;
  z-index: -99;
  top: 0;
`

const Grid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 2rem;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'before current next';
`

const TextWrapper = styled.div`
  grid-area: current;
  text-align: center;
  align-self: center;
  justify-self: center;
  z-index: 1;

  max-width: 900px;
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

const InfoWrapper = styled.div`
  position: absolute;
  bottom: 90px;
  right: 155px;

  white-space: pre;

  div {
    margin-bottom: 16px;
  }

  div:last-of-type {
    text-align: right;
  }
`

export default ImageGallery
