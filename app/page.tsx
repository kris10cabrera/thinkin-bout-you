"use client"

import Form from "@/components/Form"
import Chamber from "@/components/chamber"
import PixelTrail from "@/components/fancy/pixel-trail"
import { useGetCrushCount, useGetCrushes } from "@/lib/hooks"

export default function Home() {
  const crushCountData = useGetCrushCount()
  const crushesData = useGetCrushes()
  const crushCount = crushCountData.data
  console.log(crushesData.data)
  return (
    <div className="font-kosugi-maru min-h-screen p-8 pb-20 gap-16 px-4 sm:pt-10 text-black">
      <main className="">
        <div className="text">
          <div className="">
            <h1 className="bg-gradient z-40 relative font-tram inline-block text-[20vw] pointer-events-none leading-none">
              are you in love?
            </h1>
            <p className="bg-gradient z-40 relative leading-none text-[6vw] pt-3 max-w-[40ch]  pointer-events-none">
              carve your names into this website to celebrate your love,
              forever.
            </p>
            <p className="z-40 relative leading-none text-base skew-x-5 pl-3 pt-4">
              (pretend you are carving your names in a tree)
            </p>
            <p className="bg-gradient z-40 relative my-8 leading-none text-3xl max-w-[40ch]">
              accepting 333 crushes total
            </p>
          </div>
          <Form />
          <p className="text-2xl mt-4 font-kosugiMari z-50 relative ">
            _{crushCount} crushes recorded
          </p>
          <p>_accepting crushes since</p>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {crushesData.data?.map((crush, index) => (
            <div
              key={index}
              className="relative z-30 bg-white p-2 rounded-lg uppercase"
            >
              <span className="text-8xl font-tram"> {crush}</span>
              <span className="text-sm">_forever</span>
            </div>
          ))}
        </div>
        <div className="fixed inset-0 w-screen h-screen">
          <Chamber />
        </div>
        <PixelTrail pixelSize={16} pixelClassName="bg-light_pink" />
      </main>
    </div>
  )
}
