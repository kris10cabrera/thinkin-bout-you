"use client"


import Chamber from "@/components/Chamber"
import Crush from "@/components/Crush"
import Form from "@/components/Form"
import Overlay from "@/components/Overlay"
import PixelTrail from "@/components/fancy/pixel-trail"
import { useGetCrushCount, useGetCrushes } from "@/lib/hooks"

export default function Home() {
  const crushCountData = useGetCrushCount()
  const crushesData = useGetCrushes()
  const crushCount = crushCountData.data


  return (

    <main className="font-kosugi-maru min-h-screen p-6 lg:p-20 text-black">
      <Overlay />
      <div className="text">
        <h1 className="font-tram inline-block text-[18vw] leading-[.8] bg-white/80 p-2 shadow-[0_0_20px_9px_white] rounded-md 
        " >
          are you in love?
        </h1>
        <p className="text-base sm:text-6xl bg-gradient  z-40 relative leading-none text-[6vw] py-6 max-w-[40ch]  pointer-events-none">
          carve your names into this website to celebrate your love.
        </p>
        <p className="z-40 relative leading-none text-base lg:text-4xl bg-gradient">
          (pretend you are carving your names in a tree). it's anonymous and forever.
        </p>
        <p className="bg-gradient border  border-black inline-block rounded  p-2 lg:p-3 z-40 relative my-8 leading-none lg:text-2xl">
          accepting 333 crushes total
        </p>{" "}
        <p className="bg-gradient z-40 relative leading-none  text-base lg:text-3xl max-w-[40ch] pb-8">
          reminder that love is all around us! especially on this website
          (2025). xoxo!
        </p>
      </div>
      <Form />
      <p className="text-sm border border-dashed border-black bg-white inline-block px-1 mt-4 mb-4 font-kosugiMari z-50 relative ">
        {crushCount ?? 0} crushes recorded
      </p>
      <div className="fixed top-0 right-0 left-0 bottom-0">
        <div className="inset-0 w-screen h-screen">
          <Chamber />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {crushesData.data?.map((crush, index) => (
          <Crush index={index} key={index} crush={crush} />
        ))}
      </div>
      <div className="bg-white/80 p-2 pointer-events-auto  border-white border-4 z-50 relative leading-none text-lg lg:text-3xl mt-32 max-w-[50ch]">
        dedicated to my abuela who cried the first time i showed her one of my
        websites.
      </div>
      <div className="bg-white/80 border-white border-4 text-base mt-2  p-2 pointer-events-auto   z-50 relative">
        Each crush is recorded onchain. View the contract  <a href="https://basescan.org/address/0x9B3249313741fa8599dfF15455AD2545c36543dB" target="_blank" className="underline" rel="noreferrer" >here</a>.
        Design, code & smart contract by <a href="https://www.kris10cabrera.com/" target="_blank" rel="noreferrer" className="underline">kris10cabrera</a>.
      </div>
      <PixelTrail pixelSize={16} pixelClassName="bg-light_pink" />
    </main >
  )
}
