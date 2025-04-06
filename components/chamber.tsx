import Image, { type StaticImageData } from "next/image"
import { useEffect, useState } from "react"

import { positions } from "@/lib/utils"
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

export default function Chamber() {
  const [mounted, setMounted] = useState(false)
  const [shuffledHearts, setShuffledHearts] = useState<HeartImage[]>([])
  const [loadedCount, setLoadedCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

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

    // Set loading state to false after a short delay if images are taking too long
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Track image loading progress
  const handleImageLoad = () => {
    setLoadedCount((prev) => {
      const newCount = prev + 1
      // Set loading to false when all images are loaded
      if (newCount >= heartImages.length) {
        setIsLoading(false)
      }
      return newCount
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="inset-0 h-full w-full">
      {/* Loading overlay - appears during loading */}
      {isLoading && (
        <div className=" inset-0 z-10 flex items-center justify-center bg-background/80">
          <div className="text-center">
            <div className="mb-2 h-6 w-6 animate-spin rounded-full border-b-2 border-primary" />
            <p className="text-muted-foreground">
              Loading hearts...{" "}
              {loadedCount > 0
                ? `${Math.round((loadedCount / heartImages.length) * 100)}%`
                : ""}
            </p>
          </div>
        </div>
      )}

      <div className="heartheart flex h-full w-full flex-row flex-wrap">
        {shuffledHearts.map((image, index) => (
          <div
            key={image.name}
            style={{
              position: "absolute",
              left: `${positions[index].xPos}%`,
              top: `${positions[index].yPos}%`,
              transform: "translate(-50%, -50%)",
              opacity: isLoading ? 0 : 1,
              transition: `opacity 0.5s ease-in-out ${Math.min(index * 50, 1000)}ms`,
              willChange: "opacity"
            }}
          >
            <div className="relative size-[800px]">
              <Image
                src={image.src}
                alt={image.name.replace("-heart.png", "")}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="heart object-contain"
                placeholder="blur"
                priority={index < 8} // Mark first 8 images as priority
                onLoad={handleImageLoad}
                loading={index < 12 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Heart({ className }: { className?: string }) {
  const randomIndex = Math.floor(Math.random() * heartImages.length)

  return (
    <div className={className} style={{ position: "relative" }}>
      <Image
        src={heartImages[randomIndex].src}
        alt={heartImages[randomIndex].name}
        sizes="100px"
        width={50}
        height={50}
        className="heart object-contain"
        placeholder="blur"
        priority
      />
    </div>
  )
}
