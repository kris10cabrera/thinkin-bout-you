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
    amplitude: [baseAmplitude, baseAmplitude * 1.2, baseAmplitude * 0.8] as [
      number,
      number,
      number
    ],
    rotationRange: [baseRotation, baseRotation * 0.8, baseRotation * 0.5] as [
      number,
      number,
      number
    ],
    timeOffset: index * 2
  }
}

const Chamber = () => {
  const floatParams = useMemo(
    () => heartImages.map((_, index) => generateFloatParams(index)),
    []
  )

  return (
    <div className="absolute left-0 top-0 w-screen h-screen overflow-hidden ">
      {heartImages.map((image, index) => {
        // Generate a random angle and distance from center
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 30 + 10 // Random distance between 10-40% from center

        const xPos = 50 + Math.cos(angle) * distance
        const yPos = 50 + Math.sin(angle) * distance

        // TODO: add loading heart
        return (
          <div
            key={image}
            className="absolute"
            style={{
              left: `${xPos}%`,
              top: `${yPos}%`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <Float
              {...floatParams[index]}
              className="flex items-center justify-center"
            >
              <div className="relative w-32 h-32">
                <Image
                  src={`/${image}`}
                  alt={image.replace("-heart.png", "")}
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>
            </Float>
          </div>
        )
      })}
    </div>
  )
}

export default Chamber
