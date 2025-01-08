import { cn } from "@/lib/utils"
import { motion, useAnimationControls } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

interface PixelTrailProps {
  pixelSize: number
  fadeDuration?: number
  delay?: number
  className?: string
  pixelClassName?: string
}

interface Dimensions {
  width: number
  height: number
}

const PixelTrail = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName
}: PixelTrailProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.floor((e.clientX - rect.left) / pixelSize)
      const y = Math.floor((e.clientY - rect.top) / pixelSize)

      const pixelElement = document.getElementById(`pixel-${x}-${y}`)
      if (pixelElement) {
        const animatePixel = (pixelElement as any).__animatePixel
        if (animatePixel) animatePixel()
      }
    },
    [pixelSize]
  )

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize]
  )

  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize]
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none ",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {isClient && dimensions.width > 0 && dimensions.height > 0 && (
        <div className="relative w-full h-full">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <PixelDot
                  key={`${colIndex}-${rowIndex}`}
                  id={`pixel-${colIndex}-${rowIndex}`}
                  size={pixelSize}
                  fadeDuration={fadeDuration}
                  delay={delay}
                  className={pixelClassName}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface PixelDotProps {
  id: string
  size: number
  fadeDuration: number
  delay: number
  className?: string
}

const PixelDot = ({
  id,
  size,
  fadeDuration,
  delay,
  className
}: PixelDotProps) => {
  const controls = useAnimationControls()

  const animatePixel = useCallback(() => {
    controls.start({
      opacity: [1, 0],
      transition: { duration: fadeDuration / 1000, delay: delay / 1000 }
    })
  }, [controls, fadeDuration, delay])

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        ;(node as any).__animatePixel = animatePixel
      }
    },
    [animatePixel]
  )

  return (
    <motion.div
      id={id}
      ref={ref}
      className={cn("cursor-pointer-none", className)}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
      initial={{ opacity: 0 }}
      animate={controls}
    />
  )
}

export default PixelTrail
