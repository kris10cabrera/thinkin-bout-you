import { useGetCrushCount } from "@/lib/hooks"

export default function Info() {
  const crushCountData = useGetCrushCount()

  const crushCount = crushCountData.data
  return (
    <div className="text">
      <p className="text-base sm:text-5xl bg-gradient z-40 relative leading-none text-[6vw] pb-6 max-w-[40ch]  pointer-events-none">
        carve your names into this website to celebrate
      </p>
      <p className="z-40 relative leading-none text-base lg:text-4xl bg-gradient">
        (pretend you are carving your names in a tree). it's anonymous and
        forever.
      </p>
      <p className="bg-gradient border  border-black inline-block rounded  p-2 lg:p-3 z-40 relative my-8 leading-none lg:text-2xl">
        accepting 333 crushes total. {crushCount ?? 0} crushes recorded.
      </p>{" "}
      <p className="bg-gradient z-40 relative leading-none  text-base lg:text-3xl max-w-[40ch] pb-8">
        reminder that love is all around us! especially on this website (2025).
        xoxo!
      </p>
    </div>
  )
}
