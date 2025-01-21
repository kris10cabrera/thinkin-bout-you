import { cn } from "@/lib/utils"
import { motion, useAnimationControls } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

interface PixelTrailProps {
  pixelSize: number
  className?: string
  pixelClassName?: string
}

interface Dimensions {
  width: number
  height: number
}

export default function PixelTrail({
  pixelSize = 20,
  className,
  pixelClassName
}: PixelTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastActivationRef = useRef<{ [key: string]: number }>({})
  const [dimensions, setDimensions] = useState<Dimensions | null>(null)

  useEffect(() => {
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

      const pixelKey = `${x}-${y}`
      const now = Date.now()
      const lastActivation = lastActivationRef.current[pixelKey] || 0

      if (now - lastActivation > 100) {
        const pixelElement = document.getElementById(`pixel-${x}-${y}`)
        if (pixelElement) {
          const animatePixel = (pixelElement as any).__animatePixel
          if (animatePixel) {
            animatePixel()
            lastActivationRef.current[pixelKey] = now
          }
        }
      }
    },
    [pixelSize]
  )

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
  className?: string
}

function PixelDot({ id, size, className }: PixelDotProps) {
  const controls = useAnimationControls()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const animatePixel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    controls.start({
      opacity: 1,
      transition: { duration: 0 }
    })

    timeoutRef.current = setTimeout(() => {
      controls.start({
        opacity: 0,
        transition: { duration: 0.5 }
      })
    }, 3000)
  }, [controls])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

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
