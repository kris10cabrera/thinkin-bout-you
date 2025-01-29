"use client"
import Image, { type StaticImageData } from "next/image"
import { useEffect, useMemo, useState } from "react"
import Float from "./fancy/float"

import AraucariaHeart from "../public/araucaria-heart.png"
import BathroomHeart from "../public/bathroom-heart.png"
// Static imports for all heart images
import BeachHeart from "../public/beach-heart.png"
import BerlinHeart from "../public/berlin-heart.png"
import Berlin1Heart from "../public/berlin1-heart.png"
import BouquetHeart from "../public/bouquet-heart.png"
import BudapestHeart from "../public/budapest-heart.png"
import CaiobaHeart from "../public/caioba-heart.png"
import CapivaraHeart from "../public/capivara-heart.png"
import CarHeart from "../public/car-heart.png"
import CasaPedregalHeart from "../public/casa-pedregal-heart.png"
import CloudHeart from "../public/cloud-heart.png"
import ConcreteHeart from "../public/concrete-heart.png"
import CopenhagenOperaHeart from "../public/copenhagen-opera-heart.png"
import CratesHeart from "../public/crates-heart.png"
import CuritibaHeart from "../public/curitiba-heart.png"
import DominoHeart from "../public/domino-heart.png"
import EyeHeart from "../public/eye-heart.png"
import EyesHeart from "../public/eyes-heart.png"
import FlanHeart from "../public/flan-heart.png"
import FlowerShoeHeart from "../public/flower-shoe-heart.png"
import GraffitiHeart from "../public/graffiti-heart.png"
import GreenHeart from "../public/green-heart.png"
import GuiaHeart from "../public/guia-heart.png"
import ItaloThaiHeart from "../public/italo-thai-heart.png"
import LaHeart from "../public/la-heart.png"
import NadabienHeart from "../public/nadabien-heart.png"
import NavecerradaHeart from "../public/navecerrada-heart.png"
import PhoneHeart from "../public/phone-heart.png"
import PokemonHeart from "../public/pokemon-heart.png"
import RaccoonHeart from "../public/raccoon-heart.png"
import SpikyHeart from "../public/spiky-heart.png"
import THeart from "../public/t-heart.png"
import TreeHeart from "../public/tree-heart.png"
import WindowHeart from "../public/window-heart.png"
import WoodsHeart from "../public/woods-heart.png"

interface HeartImage {
  src: StaticImageData
  name: string
}

// Create array of image objects with static imports
const heartImages: HeartImage[] = [
  { src: BeachHeart, name: "beach-heart.png" },
  { src: WoodsHeart, name: "woods-heart.png" },
  { src: Berlin1Heart, name: "berlin1-heart.png" },
  { src: BerlinHeart, name: "berlin-heart.png" },
  { src: BathroomHeart, name: "bathroom-heart.png" },
  { src: CasaPedregalHeart, name: "casa-pedregal-heart.png" },
  { src: ConcreteHeart, name: "concrete-heart.png" },
  { src: GreenHeart, name: "green-heart.png" },
  { src: NadabienHeart, name: "nadabien-heart.png" },
  { src: NavecerradaHeart, name: "navecerrada-heart.png" },
  { src: ItaloThaiHeart, name: "italo-thai-heart.png" },
  { src: CloudHeart, name: "cloud-heart.png" },
  { src: FlanHeart, name: "flan-heart.png" },
  { src: SpikyHeart, name: "spiky-heart.png" },
  { src: CapivaraHeart, name: "capivara-heart.png" },
  { src: AraucariaHeart, name: "araucaria-heart.png" },
  { src: CaiobaHeart, name: "caioba-heart.png" },
  { src: GraffitiHeart, name: "graffiti-heart.png" },
  { src: CuritibaHeart, name: "curitiba-heart.png" },
  { src: CopenhagenOperaHeart, name: "copenhagen-opera-heart.png" },
  { src: BouquetHeart, name: "bouquet-heart.png" },
  { src: TreeHeart, name: "tree-heart.png" },
  { src: CarHeart, name: "car-heart.png" },
  { src: BudapestHeart, name: "budapest-heart.png" },
  { src: EyesHeart, name: "eyes-heart.png" },
  { src: GuiaHeart, name: "guia-heart.png" },
  { src: EyeHeart, name: "eye-heart.png" },
  { src: FlowerShoeHeart, name: "flower-shoe-heart.png" },
  { src: PhoneHeart, name: "phone-heart.png" },
  { src: CratesHeart, name: "crates-heart.png" },
  { src: WindowHeart, name: "window-heart.png" },
  { src: LaHeart, name: "la-heart.png" },
  { src: THeart, name: "t-heart.png" },
  { src: PokemonHeart, name: "pokemon-heart.png" },
  { src: DominoHeart, name: "domino-heart.png" },
  { src: RaccoonHeart, name: "raccoon-heart.png" }
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

const generateDeterministicPosition = (
  index: number,
  total: number
): Position => {
  const centerX = 50 // Center horizontally
  // Increased spacing by reducing number of items per column
  const verticalSpacing = 140 / total // Increased from 70 to 140 for more spacing
  const yPos = 5 + verticalSpacing * index // Start at 5% from top

  // Add slight horizontal variation
  const horizontalJitter = 1
  const jitterX = (((index * 31) % 100) / 100 - 0.5) * horizontalJitter

  return {
    xPos: Math.max(15, Math.min(85, centerX + jitterX)),
    yPos: Math.max(5, Math.min(95, yPos))
  }
}

const generateVerticalPositions = (count: number): Position[] => {
  const positions: Position[] = []

  for (let i = 0; i < count; i++) {
    positions.push(generateDeterministicPosition(i, count))
  }

  return positions
}

export default function Chamber() {
  const [mounted, setMounted] = useState(false)
  const [shuffledHearts, setShuffledHearts] = useState<HeartImage[]>([])

  useEffect(() => {
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    setMounted(true)
    setShuffledHearts(shuffleArray(heartImages))
  }, [])

  const floatParams = useMemo(
    () => heartImages.map((_, index) => generateFloatParams(index)),
    []
  )

  const positions = useMemo(
    () => generateVerticalPositions(heartImages.length),
    []
  )

  if (!mounted) {
    return null
  }

  return (
    <div className="absolute inset-0">
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-full">
        {shuffledHearts.map((image, index) => (
          <div
            key={image.name}
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
              <div className="relative size-44">
                <Image
                  src={image.src}
                  alt={image.name.replace("-heart.png", "")}
                  fill
                  sizes="400px"
                  className="object-contain heart"
                  placeholder="blur"
                  priority={index < 4}
                />
              </div>
            </Float>
          </div>
        ))}
      </div>
    </div>
  )
}
