import { motion, useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import styled from 'styled-components'

type Props = {
  progressPercentage: number
}

const ProgressCursor = ({ progressPercentage }: Props): JSX.Element => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Used to track mouse cursor position
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

  // Set the progress indicator circle radius
  const cirlceRadius = 20

  // Calcualte the progress indicator properties
  const circleDiameter = cirlceRadius * 2
  const cirlceStrokeWidth = 2
  const cirlceFullSize = circleDiameter + cirlceStrokeWidth

  // Calculate circumference and fillPercentage, needed for progress indicator
  const circumference = Math.ceil(2 * Math.PI * cirlceRadius)
  const fillPercentage = Math.abs(
    Math.ceil((circumference / 100) * (progressPercentage - 100))
  )

  return (
    <Cursor
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    >
      <ProgressCircleWrapper>
        <svg
          width={`${cirlceFullSize}`}
          height={`${cirlceFullSize}`}
          viewBox={`0 0 ${cirlceFullSize} ${cirlceFullSize}`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx={cirlceRadius} cy={cirlceRadius} r='2' fill='white' />
          <circle
            cx={cirlceRadius + cirlceStrokeWidth / 2}
            cy={cirlceRadius + cirlceStrokeWidth / 2}
            r={cirlceRadius}
            stroke='white'
            strokeWidth={cirlceStrokeWidth}
            strokeOpacity={0.2}
            fill='transparent'
          />
        </svg>
        <ProgressIndicator
          width={`${cirlceFullSize}`}
          height={`${cirlceFullSize}`}
          viewBox={`0 0 ${cirlceFullSize} ${cirlceFullSize}`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx={cirlceRadius + cirlceStrokeWidth / 2}
            cy={cirlceRadius + cirlceStrokeWidth / 2}
            r={cirlceRadius}
            stroke='white'
            strokeWidth={cirlceStrokeWidth}
            fill='transparent'
            strokeDashoffset={fillPercentage}
            strokeDasharray={circumference}
          />
        </ProgressIndicator>
      </ProgressCircleWrapper>
    </Cursor>
  )
}

const Cursor = styled(motion.div)`
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
