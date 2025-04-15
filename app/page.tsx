"use client"

import Crush from "@/components/Crush"
import Form from "@/components/Form"
import Overlay from "@/components/Overlay"
import Chamber from "@/components/chamber"
import PixelTrail from "@/components/fancy/pixel-trail"
import { useGetCrushCount, useGetCrushes } from "@/lib/hooks"

export default function Home() {
  const crushCountData = useGetCrushCount()
  const crushesData = useGetCrushes()
  const crushCount = crushCountData.data

  return (
    <div className="font-kosugi-maru min-h-screen p-20  gap-16 text-black">
      <main className="">
        <Overlay />
        <div className="text">
          <div className="">
            <h1 className="bg-gradient z-40 relative font-tram inline-block text-[20vw] pointer-events-none leading-none">
              are you in love?
            </h1>
            <p className="bg-gradient z-40 relative leading-none text-[6vw] pt-3 max-w-[40ch]  pointer-events-none">
              carve your names into this website to celebrate your love,
              forever.
            </p>
            <p className="z-40  relative leading-none text-4xl skew-x-5 pl-3 pt-4 bg-gradient">
              ( pretend you are carving your names in a tree )
            </p>
            <p className="bg-gradient z-40 relative my-8 leading-none text-4xl max-w-[40ch]">
              accepting 333 crushes total
            </p>{" "}
            <p className="text-2xl mb-4 font-kosugiMari z-50 relative ">
              {crushCount} crushes recorded
            </p>
            <p className="bg-gradient z-40 relative leading-none text-3xl max-w-[40ch] mb-8">
              reminder that love is all around us! especially on this website
              (2025). xoxo!
            </p>
          </div>
        </div>
        <Form />

        <div className="fixed top-0">
          <div className="inset-0 w-screen h-screen">
            <Chamber />
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {crushesData.data?.map((crush, index) => (
            <Crush index={index} key={index} crush={crush} />
          ))}
        </div>
        <p className="bg-gradient z-40 relative leading-none text-3xl pt-32 max-w-[40ch]  pointer-events-none">
          dedicated to my abuela who cried the first time i showed her one of my
          websites.
        </p>
        <PixelTrail pixelSize={16} pixelClassName="bg-light_pink" />
      </main>
    </div>
  )
}
