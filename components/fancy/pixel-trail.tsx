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

export default function PixelTrail({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName
}: PixelTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize with null to prevent hydration mismatch
  const [dimensions, setDimensions] = useState<Dimensions | null>(null)

  // Use useEffect to handle all client-side operations
  useEffect(() => {
    // Initial dimensions update
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    // Run initial update
    updateDimensions()

    // Set up resize listener
    window.addEventListener("resize", updateDimensions)

    // Cleanup
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

  // Only calculate grid when dimensions are available
  const columns = useMemo(
    () => (dimensions ? Math.ceil(dimensions.width / pixelSize) : 0),
    [dimensions, pixelSize]
  )

  const rows = useMemo(
    () => (dimensions ? Math.ceil(dimensions.height / pixelSize) : 0),
    [dimensions, pixelSize]
  )

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 w-full h-full z-40", className)}
      onMouseMove={handleMouseMove}
    >
      {dimensions && (
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

function PixelDot({ id, size, fadeDuration, delay, className }: PixelDotProps) {
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
      className={cn("bg-light_pink", className)}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
      initial={{ opacity: 0 }}
      animate={controls}
    />
  )
}
