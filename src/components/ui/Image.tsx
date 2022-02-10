import React from 'react'

type Props = {
  src: string
  srcRetina?: string
  alt?: string
  width?: number
  height?: number
  className?: string
}

const Image = ({
  src,
  srcRetina,
  alt,
  width,
  height,
  className,
}: Props): JSX.Element => {
  return (
    <img
      src={src}
      srcSet={`${src} 1x, ${srcRetina || src} 2x`}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}

export default Image
