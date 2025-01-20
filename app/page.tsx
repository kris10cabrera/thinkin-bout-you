"use client"
import Chamber from "@/components/chamber"
import PixelTrail from "@/components/fancy/pixel-trail"
import Image from "next/image"

export default function Home() {
  return (
    <div className="font-kosugi-maru min-h-screen p-8 pb-20 gap-16 sm:p-20 text-pink">
      <main className="">
        <div className="text">
          <h1 className="font-tram inline-block text-8xl text-pink relative">
            are you in love?
          </h1>
          <p className="leading-none text-3xl max-w-[40ch]">
            carve your names into this website to celebrate your love, forever.
          </p>
          <p className="mt-4 leading-none text-4xl max-w-[40ch]">
            accepting 333 crushes total
          </p>
        </div>
        <h3 className="mt-24 text-3xl">sign your name</h3>
        <label htmlFor="your">first letter of your name</label>
        <input id="first" />

        <label htmlFor="their">first letter of their name</label>
        <input id="their" type="text" />
        <Image
          alt=""
          src="/cloud-heart.png"
          fill
          sizes="1000px"
          className="object-contain heart big-heart ml-auto"
        />
        <Chamber />
        <PixelTrail
          pixelSize={16}
          delay={130}
          fadeDuration={0}
          pixelClassName="bg-light_pink"
        />
      </main>
    </div>
  )
}
