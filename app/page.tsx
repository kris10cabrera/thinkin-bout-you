"use client"

import Form from "@/components/Form"
import Chamber from "@/components/chamber"
import PixelTrail from "@/components/fancy/pixel-trail"

export default function Home() {
  return (
    <div className="font-kosugi-maru min-h-screen p-8 pb-20 gap-16 px-4 sm:pt-10 text-black">
      <main className="">
        <div className="text">
          <div className="">
            <h1 className=" z-40 relative font-tram inline-block text-[20vw] pointer-events-none leading-none">
              are you in love?
            </h1>
            <p className=" z-40 relative leading-none text-[6vw] pt-3 max-w-[40ch]  pointer-events-none">
              carve your names into this website to celebrate your love,
              forever.
            </p>
            <p className="z-40 relative leading-none text-base skew-x-5 pl-3 pt-4">
              (it's like carving your names in a tree)
            </p>
            <p className="z-40 relative mt-8 leading-none text-3xl max-w-[40ch]">
              accepting 333 crushes total
            </p>
          </div>
          <Form />
        </div>
        <div className="fixed inset-0 w-screen h-screen">
          <Chamber />
        </div>
        <PixelTrail pixelSize={16} pixelClassName="bg-light_pink" />
      </main>
    </div>
  )
}
