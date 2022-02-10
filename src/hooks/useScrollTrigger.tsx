import { debounce } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'

type Props = {
  scrollUpHandler: () => void
  scrollDownHandler: () => void
}

export const useScrollTrigger = ({
  scrollUpHandler,
  scrollDownHandler,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedScrollTrigger = useCallback(
    debounce((direction: 'up' | 'down') => {
      if (direction === 'up') scrollUpHandler()
      else scrollDownHandler()
    }, 100),
    []
  )

  useEffect(() => {
    const listener = (event: WheelEvent) => {
      event.preventDefault()

      debouncedScrollTrigger(event.deltaY > 0 ? 'down' : 'up')
    }

    if (ref && ref.current) {
      const currentRef = ref.current

      currentRef.addEventListener('wheel', listener, { passive: false })
      return () => {
        currentRef.removeEventListener('wheel', listener)
      }
    }
  }, [debouncedScrollTrigger])

  return ref
}
