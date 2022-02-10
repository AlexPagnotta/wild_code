import { motion, useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import styled from 'styled-components'

type Props = {
  progressPercentage: number
}

const ProgressCursor = ({ progressPercentage }: Props): JSX.Element => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  const radius = 20
  const circumference = Math.ceil(2 * Math.PI * radius)
  const fillPercentage = Math.abs(
    Math.ceil((circumference / 100) * (progressPercentage - 100))
  )

  return (
    <Cursor
      as={motion.div}
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    >
      <ProgressCircleWrapper>
        <svg
          width='42'
          height='42'
          viewBox='0 0 42 42'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='20' cy='20' r='2' fill='white' />
          <circle
            cx='21'
            cy='21'
            r={radius}
            stroke='white'
            strokeWidth='2'
            strokeOpacity={0.2}
            fill='transparent'
          />
        </svg>
        <ProgressIndicator
          width='42'
          height='42'
          viewBox='0 0 42 42'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='21'
            cy='21'
            r={radius}
            stroke='white'
            strokeWidth='2'
            fill='transparent'
            strokeDashoffset={fillPercentage}
            strokeDasharray={circumference}
          />
        </ProgressIndicator>
      </ProgressCircleWrapper>
    </Cursor>
  )
}

const Cursor = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  pointer-events: none;
`

const ProgressCircleWrapper = styled.div`
  position: relative;
`

const ProgressIndicator = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);

  circle {
    transition: stroke-dashoffset 1s linear;
  }
`

export default ProgressCursor
