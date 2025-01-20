"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import Float from "./fancy/float"

const heartImages = [
  "beach-heart.png",
  "woods-heart.png",
  "berlin1-heart.png",
  "berlin-heart.png",
  "bathroom-heart.png",
  "casa-pedregal-heart.png",
  "concrete-heart.png",
  "green-heart.png",
  "nadabien-heart.png",
  "navecerrada-heart.png",
  "italo-thai-heart.png",
  "cloud-heart.png",
  "flan-heart.png",
  "spiky-heart.png",
  "capivara-heart.png",
  "araucaria-heart.png",
  "caioba-heart.png",
  "graffiti-heart.png",
  "curitiba-heart.png"
]

const generateFloatParams = (index: number) => {
  const baseSpeed = 0.15 + (index % 3) * 0.05
  const baseAmplitude = 5 + (index % 3) * 2
  const baseRotation = 3 + (index % 3) * 1.5

  return {
    speed: baseSpeed,
    amplitude: [baseAmplitude, baseAmplitude * 0.8, baseAmplitude * 0.6] as [
      number,
      number,
      number
    ],
    rotationRange: [baseRotation, baseRotation * 0.6, baseRotation * 0.4] as [
      number,
      number,
      number
    ],
    timeOffset: index * 2
  }
}

interface Position {
  xPos: number
  yPos: number
}

// Deterministic position generator using the index as seed
const generateDeterministicPosition = (
  index: number,
  total: number
): Position => {
  const centerX = 50
  const centerY = 50
  const spreadX = 28
  const spreadY = 20

  // Use index-based calculations instead of Math.random()
  const angle = (index / total) * Math.PI * 2
  const radius = 0.6 + (((index * 17) % 100) / 100) * 0.4
  const randomOffset = 0.85 + (((index * 23) % 100) / 100) * 0.3

  const xPos = centerX + Math.cos(angle) * spreadX * radius * randomOffset
  const yPos = centerY + Math.sin(angle) * spreadY * radius * randomOffset

  const jitter = 6
  const jitterX = (((index * 31) % 100) / 100 - 0.5) * jitter
  const jitterY = (((index * 37) % 100) / 100 - 0.5) * jitter

  return {
    xPos: Math.max(15, Math.min(85, xPos + jitterX)),
    yPos: Math.max(15, Math.min(85, yPos + jitterY))
  }
}

const generateCloudPositions = (count: number): Position[] => {
  const positions: Position[] = []

  for (let i = 0; i < count; i++) {
    positions.push(generateDeterministicPosition(i, count))
  }

  return positions
}

export default function Chamber() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const floatParams = useMemo(
    () => heartImages.map((_, index) => generateFloatParams(index)),
    []
  )

  const positions = useMemo(
    () => generateCloudPositions(heartImages.length),
    []
  )

  // Render nothing until mounted on client
  if (!mounted) {
    return null
  }

  return (
    <div className="relative h-[440px] overflow-hidden">
      {heartImages.map((image, index) => (
        <div
          key={image}
          className="absolute"
          style={{
            left: `${positions[index].xPos}%`,
            top: `${positions[index].yPos}%`,
            transform: "translate(-50%, -50%)"
          }}
        >
          <Float
            {...floatParams[index]}
            className="flex items-center justify-center"
          >
            <div className="relative w-24 h-24">
              <Image
                src={`/${image}`}
                alt={image.replace("-heart.png", "")}
                fill
                sizes="100px"
                className="object-contain heart"
                priority={index < 4}
              />
            </div>
          </Float>
        </div>
      ))}
    </div>
  )
}
