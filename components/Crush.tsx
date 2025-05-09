import { cn } from "@/lib/utils"

interface CrushProps {
  index: number
  crush: string
}

export default function Crush(props: CrushProps) {
  const { index, crush } = props

  // Generate more random margin variations based on index
  const getRandomMargin = () => {
    // Use a hash-like approach for pseudo-randomness based on index
    const random = Math.sin(index * 9999) * 10000;
    const marginOptions = [
      "mr-20",
      "mr-32",
      "mr-40",
      "ml-16",
      "ml-28",
      "mx-12",
      "ml-8 mr-24"
    ];

    // Select a margin option based on the hash
    const selectedOption = marginOptions[Math.abs(Math.floor(random)) % marginOptions.length];
    return selectedOption;
  }

  return (
    <div
      key={index}
      className={cn(
        getRandomMargin(),
        " bg-white/80 p-2 uppercase shadow-[0_0_20px_9px_white] rounded-md z-50 relative"
      )}
    >
      <span className="text-5xl md:text-7xl font-scorpius relative">
        {crush[0]}
        <span className="text-5xl ">&</span>
        {crush[1]}
        <span className="text-sm font-kosugi-maru whitespace-nowrap">
          forever
        </span>
      </span>
    </div>
  )
}