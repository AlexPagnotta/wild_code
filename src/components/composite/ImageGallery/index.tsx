import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { galleryData } from '../../../data/galleryData'
import { useScrollTrigger } from '../../../hooks/useScrollTrigger'
import { adaptInfiniteIndex } from '../../../utils/arrayUtils'
import Image from '../../ui/Image'
import LinkButton from '../../ui/LinkButton'
import Text from '../../ui/Text'
import Cursor from '../ProgressCursor'

import GalleryProgressIndicator from './GalleryProgressIndicator'

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

  const scrollRef = useScrollTrigger({
    scrollDownHandler: loadPrevious,
    scrollUpHandler: loadNext,
  })

  const currentElementIndex = adaptInfiniteIndex(
    currentIndex,
    galleryData.length
  )

  const initialElement =
    galleryData[adaptInfiniteIndex(currentIndex - 1, galleryData.length)]

  const previousElement =
    galleryData[adaptInfiniteIndex(currentIndex, galleryData.length)]

  const currentElement =
    galleryData[adaptInfiniteIndex(currentIndex + 1, galleryData.length)]

  const nextElement =
    galleryData[adaptInfiniteIndex(currentIndex + 2, galleryData.length)]

  const lastElement =
    galleryData[adaptInfiniteIndex(currentIndex + 3, galleryData.length)]

  return (
    <>
      {/* Custom Cursor */}
      <Cursor
        progressPercentage={
          (currentElementIndex / (galleryData.length - 1)) * 100
        }
      />
      <Wrapper ref={scrollRef}>
        <AnimatePresence>
          <Background
            key={`background_${currentElement.id}`}
            src={currentElement.imageBlur}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <Container>
          <Grid>
            <HeaderTitle variant='h4'> XYZ Photography</HeaderTitle>
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
                <ImageCard
                  key={currentIndex + index}
                  layout
                  variants={galleryItemVariants}
                  animate={
                    status === 'initial' || status === 'last'
                      ? 'hidden'
                      : 'visible'
                  }
                  onClick={() =>
                    status === 'next'
                      ? loadNext()
                      : status === 'previous'
                      ? loadPrevious()
                      : undefined
                  }
                  transition={{ ease: 'easeOut', duration: 1 }}
                  status={status}
                >
                  <ImageItem
                    src={item.image1X}
                    srcRetina={item.image2X}
                    alt={''}
                  />
                </ImageCard>
              )
            })}
            <AnimatePresence exitBeforeEnter>
              <TitleWrapper
                key={`title_${currentElement.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Text variant='h1'>{currentElement.title}</Text>
                <GalleryProgressIndicator
                  currentIndex={currentElementIndex + 1}
                  totalItems={galleryData.length}
                />
              </TitleWrapper>
            </AnimatePresence>
            <InfoWrapper>
              <Text>
                {currentElement.authorName}
                {'\n'}for {currentElement.client}
              </Text>
              <Text>{currentElement.pubblicationDate}</Text>
              <LinkButton href={currentElement.authorSite} openInNewTab>
                Have a look
              </LinkButton>
            </InfoWrapper>
          </Grid>
        </Container>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  position: relative;
  overflow: hidden;
`

const Container = styled.div`
  margin: 0 auto;
  padding: 16px;
  max-width: 1920px;
  height: 100%;
`

type BackgroundProps = {
  src: string
}

const Background = styled(motion.div)<BackgroundProps>`
  background-image: url(${({ src }) => src});

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
  gap: 32px;

  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'next next next'
    'current current current'
    'before before before';

  @media (min-width: ${({ theme }) => `${theme.screens.md}px`}) {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto;

    grid-template-areas: 'before current next';
  }
`

const HeaderTitle = styled(Text)`
  grid-column-start: 1;
  grid-row-start: 1;
`

const TitleWrapper = styled(motion.div)`
  grid-area: current;
  text-align: center;
  align-self: center;
  justify-self: center;
  z-index: 1;

  max-width: 900px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

type ImageCardProps = {
  status: 'initial' | 'previous' | 'current' | 'next' | 'last'
}

const imageCardVariant = ({ status }: ImageCardProps) => {
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

const ImageCard = styled(motion.div)<ImageCardProps>`
  border-radius: 10px;
  border: 1px solid #000000;
  overflow: hidden;
  position: relative;

  ${({ status }) =>
    status === 'current'
      ? css`
          aspect-ratio: 64 / 85;

          width: 250px;

          @media (min-width: ${({ theme }) => `${theme.screens.md}px`}) {
            width: 420px;
          }

          @media (min-width: ${({ theme }) => `${theme.screens.xl}px`}) {
            width: 512px;
          }
        `
      : css`
          aspect-ratio: 124 / 165;

          width: 80px;

          @media (min-width: ${({ theme }) => `${theme.screens.md}px`}) {
            width: 120px;
          }

          @media (min-width: ${({ theme }) => `${theme.screens.xl}px`}) {
            width: 248px;
          }
        `}

  ${imageCardVariant};
`

const ImageItem = styled(Image)`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;

  position: absolute;
  top: 0;
`

const InfoWrapper = styled.div`
  grid-area: next;
  align-self: end;

  max-width: 100px;
  margin-bottom: 80px;

  white-space: pre;

  div {
    margin-bottom: 16px;
  }

  div:last-of-type {
    text-align: right;
  }

  display: none;

  @media (min-width: ${({ theme }) => `${theme.screens.md}px`}) {
    display: block;
  }
`

export default ImageGallery
