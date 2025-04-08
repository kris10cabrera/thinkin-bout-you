import { cn } from "@/lib/utils"
import { Heart } from "./chamber"

interface CrushProps {
  index: number
  crush: string
}
export default function Crush(props: CrushProps) {
  const { index, crush } = props
  return (
    <div
      key={index}
      className={cn(
        (index % 3 === 0 || index % 4 === 0) && "mr-40",
        "relative z-30 bg-white/80 p-2 uppercase "
      )}
    >
      <span className="text-9xl font-tram relative">
        {crush[0]}
        <span className="text-7xl">&</span>
        {crush[1]}
        <span className="text-base font-kosugi-maru a">
          {crush[0]}
          <span>&</span>
          {crush[1]} forever
        </span>
        <Heart />
      </span>
    </div>
  )
}
