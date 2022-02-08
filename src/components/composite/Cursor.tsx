import { motion, useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import styled from 'styled-components'

const ProgressCursor = (): JSX.Element => {
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

  return (
    <Cursor
      as={motion.div}
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    />
  )
}

const Cursor = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  border-radius: 50px;
  border: 8px solid white;
  z-index: 999;
  pointer-events: none;
`

export default ProgressCursor
