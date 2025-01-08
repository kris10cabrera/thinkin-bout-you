import Image from "next/image"
import { useMemo } from "react"
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
  "flan-heart.png"
]

const generateFloatParams = (
  index: number
): {
  speed: number
  amplitude: [number, number, number]
  rotationRange: [number, number, number]
  timeOffset: number
} => {
  const baseSpeed = 0.3 + (index % 3) * 0.1
  const baseAmplitude = 10 + (index % 4) * 5
  const baseRotation = 5 + (index % 3) * 2.5

  return {
    speed: baseSpeed,
    amplitude: [baseAmplitude, baseAmplitude * 1.2, baseAmplitude * 0.8],
    rotationRange: [baseRotation, baseRotation * 0.8, baseRotation * 0.5],
    timeOffset: index * 2
  }
}

interface Position {
  xPos: number
  yPos: number
}

const generateDeterministicPositions = (count: number): Position[] => {
  const positions: Position[] = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)) // Golden angle for better distribution

  for (let i = 0; i < count; i++) {
    const angle = goldenAngle * i

    // Use index-based distance calculation instead of random
    const distancePercent = 10 + (i % 3) * 10 + Math.floor(i / 3) * 5
    const distance = Math.min(distancePercent, 30) // Cap at 40% from center

    const xPos = 50 + Math.cos(angle) * distance
    const yPos = 50 + Math.sin(angle) * distance

    positions.push({ xPos, yPos })
  }

  return positions
}

const Chamber = () => {
  const floatParams = useMemo(
    () => heartImages.map((_, index) => generateFloatParams(index)),
    []
  )

  const positions = useMemo(
    () => generateDeterministicPositions(heartImages.length),
    []
  )

  return (
    <div className="absolute left-0 top-0 w-screen h-screen overflow-hidden pointer-events-none">
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
            <div className="relative w-28 h-28">
              <Image
                src={`/${image}`}
                alt={image.replace("-heart.png", "")}
                fill
                sizes="100px"
                className="object-contain"
                priority={index < 4}
              />
            </div>
          </Float>
        </div>
      ))}
    </div>
  )
}

export default Chamber
