"use client"
import PixelTrail from "@/components/fancy/pixel-trail"

export default function Home() {
  return (
    <div className="font-kosugi-maru min-h-screen p-8 pb-20 gap-16 sm:p-20 text-pink">
      <main className="">
        <h1 className="font-tram inline-block text-8xl text-pink relative">
          are you in love?
          <span
            className="font-kosugi-maru uppercase text-3xl text-meadow
          left-1/2 top-[83%] -translate-x-1/2
          absolute "
          >
            prove it
          </span>
        </h1>

        <p className="leading-none max-w-64">
          carve your names into this website to celebrate your love, forever.
          accepting 333 crushes total.
        </p>
        <div className=" px-2 py-1 rounded-full font-kosugi-maru text-sm">
          enamorarme es bien fácil, pero olvidarme es difícil{" "}
          <span className="uppercase italic text-xs">- bad bunny</span>
        </div>
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
