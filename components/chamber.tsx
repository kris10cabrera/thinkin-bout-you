import Image, { type StaticImageData } from "next/image"
import { useCallback, useEffect, useMemo, useState } from "react"
import AraucariaHeart from "../public/araucaria-heart.png"
import BathroomHeart from "../public/bathroom-heart.png"

import BeachHeart from "../public/beach-heart.png"
import BerlinHeart from "../public/berlin-heart.png"
import Berlin1Heart from "../public/berlin1-heart.png"
import BouquetHeart from "../public/bouquet-heart.png"
import BudapestHeart from "../public/budapest-heart.png"
import ButterflyHeart from "../public/butterfly-heart.png"
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
import MonkeysHeart from "../public/monkeys-heart.png"
import NadabienHeart from "../public/nadabien-heart.png"
import NavecerradaHeart from "../public/navecerrada-heart.png"
import PhoneHeart from "../public/phone-heart.png"
import PokemonHeart from "../public/pokemon-heart.png"
import RaccoonHeart from "../public/raccoon-heart.png"
import SpikyHeart from "../public/spiky-heart.png"
import THeart from "../public/t-heart.png"
import TreeHeart from "../public/tree-heart.png"
import WindowHeart from "../public/window-heart.png"
import WindowsHeart from "../public/windows-heart.png"
import WoodsHeart from "../public/woods-heart.png"

interface HeartImage {
  src: StaticImageData
  name: string
}

interface Position {
  xPos: number
  yPos: number
  rotation: number
  scale: number
}

const heartImages: HeartImage[] = [
  { src: BeachHeart, name: "beach-heart.png" },
  { src: WoodsHeart, name: "woods-heart.png" },
  { src: Berlin1Heart, name: "berlin1-heart.png" },
  { src: BerlinHeart, name: "berlin-heart.png" },
  { src: BathroomHeart, name: "bathroom-heart.png" },
  { src: ButterflyHeart, name: "butterfly-heart.png" },
  { src: MonkeysHeart, name: "monkeys-heart.png" },
  { src: WindowsHeart, name: "windows-heart.png" },
  { src: LaHeart, name: "la-heart.png" },
  { src: BouquetHeart, name: "bouquet-heart.png" },
  { src: NadabienHeart, name: "nadabien-heart.png" },
  { src: NavecerradaHeart, name: "navecerrada-heart.png" },
  { src: GraffitiHeart, name: "graffiti-heart.png" },
  { src: CasaPedregalHeart, name: "casa-pedregal-heart.png" },
  { src: ConcreteHeart, name: "concrete-heart.png" },
  { src: GreenHeart, name: "green-heart.png" },
  { src: ItaloThaiHeart, name: "italo-thai-heart.png" },
  { src: CloudHeart, name: "cloud-heart.png" },
  { src: FlanHeart, name: "flan-heart.png" },
  { src: SpikyHeart, name: "spiky-heart.png" },
  { src: CapivaraHeart, name: "capivara-heart.png" },
  { src: AraucariaHeart, name: "araucaria-heart.png" },
  { src: CaiobaHeart, name: "caioba-heart.png" },
  { src: CuritibaHeart, name: "curitiba-heart.png" },
  { src: CopenhagenOperaHeart, name: "copenhagen-opera-heart.png" },
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
  { src: THeart, name: "t-heart.png" },
  { src: PokemonHeart, name: "pokemon-heart.png" },
  { src: DominoHeart, name: "domino-heart.png" },
  { src: RaccoonHeart, name: "raccoon-heart.png" }
]

function generateSporadicPositions(
  count: number,
  isMobile: boolean,
  seed = 1
): Position[] {
  const positions: Position[] = []
  let seedValue = seed

  const seededRandom = () => {
    const x = Math.sin(seedValue++) * 10000
    return x - Math.floor(x)
  }

  for (let i = 0; i < count; i++) {
    if (isMobile) {
      positions.push({
        xPos: 5 + seededRandom() * 85, // 5-90% of screen width
        yPos: 5 + seededRandom() * 85, // 5-90% of screen height
        rotation: seededRandom() * 40 - 20, // Random rotation -20 to +20 degrees
        scale: 0.5 + seededRandom() * 0.8 // Random scaling between 0.5 and 1.3
      })
    } else {
      positions.push({
        xPos: 5 + seededRandom() * 85,
        yPos: 5 + seededRandom() * 85,
        rotation: seededRandom() * 20 - 10, // Less rotation on desktop
        scale: 0.7 + seededRandom() * 0.6 // Random scaling between 0.7 and 1.3
      })
    }
  }

  return positions
}

// Memoized shuffle function to avoid recreating the shuffle on every render
function shuffleArray<T>(array: T[], seed = 1): T[] {
  const shuffled = [...array]
  let seedValue = seed

  const seededRandom = () => {
    const x = Math.sin(seedValue++) * 10000
    return x - Math.floor(x)
  }

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

// Separate HeartImage component to prevent re-renders of all hearts
function HeartImage({
  image,
  position,
  isMobile,
  isLoading,
  index,
  onLoad
}: {
  image: HeartImage
  position: Position
  isMobile: boolean
  isLoading: boolean
  index: number
  onLoad: () => void
}) {
  return (
    <div
      className={`transform ${isMobile ? "mb-4" : ""}`}
      style={{
        position: "absolute",
        left: `${position.xPos}%`,
        top: `${position.yPos}%`,
        transform: `rotate(${position.rotation}deg)`,
        opacity: isLoading ? 0 : 1,
        transition: `opacity 0.5s ease-in-out ${Math.min(index * 50, 1000)}ms, transform 0.3s ease-in-out`,
        willChange: "opacity, transform"
      }}
    >
      <div
        className={`relative ${isMobile ? "size-[80px] md:size-[120px]" : "size-[100px] lg:size-[180px]"}`}
      >
        <Image
          src={image.src}
          alt={image.name.replace("-heart.png", "")}
          fill
          sizes={isMobile ? "80px" : "(max-width: 768px) 100px, 180px"}
          className="heart object-contain"
          placeholder="blur"
          priority={index < 8} // Mark first 8 images as priority
          onLoad={onLoad}
          loading={index < 12 ? "eager" : "lazy"}
        />
      </div>
    </div>
  )
}

export default function Chamber() {
  const [mounted, setMounted] = useState<boolean>(false)
  const [loadedCount, setLoadedCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [seed] = useState<number>(() => Math.floor(Math.random() * 10000)) // Create a stable seed on first render

  // Memoize the shuffled hearts to prevent re-shuffling on re-renders
  const shuffledHearts = useMemo(() => {
    return shuffleArray(heartImages, seed)
  }, [seed])

  // Memoize the positions to prevent recalculation on re-renders
  const sporadicPositions = useMemo(() => {
    return generateSporadicPositions(heartImages.length, isMobile, seed)
  }, [isMobile, seed])

  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleImageLoad = useCallback(() => {
    setLoadedCount((prev) => {
      const newCount = prev + 1
      if (newCount >= heartImages.length) {
        setIsLoading(false)
      }
      return newCount
    })
  }, [])

  useEffect(() => {
    // Set initial states and add event listeners
    checkIsMobile()
    setMounted(true)

    // Force loading to finish after timeout (failsafe)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // Add resize listener with throttling to reduce the number of updates
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        checkIsMobile()
      }, 150) // Throttle to 150ms
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("visibilitychange", () => {
      // Prevent recalculation when tab becomes visible again
      // Only update if necessary based on size changes
      if (document.visibilityState === "visible") {
        checkIsMobile()
      }
    })

    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimeout)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("visibilitychange", handleResize)
    }
  }, [checkIsMobile])

  if (!mounted) {
    return null
  }

  return (
    <div className="inset-0 h-full w-full">
      {isLoading && (
        <div className="inset-0 z-10 flex items-center justify-center bg-background/80">
          <div className="text-center">
            <div className="mb-2 h-6 w-6 animate-spin rounded-full border-b-2 border-primary" />
            <p className="text-muted-foreground">
              {loadedCount > 0
                ? `${Math.round((loadedCount / heartImages.length) * 100)}%`
                : ""}
            </p>
          </div>
        </div>
      )}

      <div className="heartheart relative h-full w-full">
        {shuffledHearts.map((image, index) => (
          <HeartImage
            key={image.name}
            image={image}
            position={sporadicPositions[index]}
            isMobile={isMobile}
            isLoading={isLoading}
            index={index}
            onLoad={handleImageLoad}
          />
        ))}
      </div>
    </div>
  )
}

export function Heart({ className }: { className?: string }) {
  // Memoize the random index calculation to prevent recalculation on parent re-renders
  const randomIndex = useMemo(
    () => Math.floor(Math.random() * heartImages.length),
    []
  )

  return (
    <div className={className} style={{ position: "relative" }}>
      <Image
        src={heartImages[randomIndex].src}
        alt={heartImages[randomIndex].name}
        sizes="100px"
        width={100}
        height={100}
        className="heart object-contain"
        placeholder="blur"
        priority
      />
    </div>
  )
}
