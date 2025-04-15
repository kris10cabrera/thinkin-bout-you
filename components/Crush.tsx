import { cn } from "@/lib/utils"

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
        "relative z-30  bg-white/80 p-2 uppercase shadow-[0_0_20px_9px_white] rounded-md"
      )}
    >
      <span className="text-7xl md:text-9xl font-tram relative">
        {crush[0]}
        <span className="text-4xl md:text-7xl">&</span>
        {crush[1]}
        <span className="text-base font-kosugi-maru whitespace-nowrap">
          forever
        </span>
      </span>
    </div>
  )
}
