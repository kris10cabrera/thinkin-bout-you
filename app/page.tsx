"use client"

import Chamber from "@/components/Chamber"
import Crush from "@/components/Crush"
import Footer from "@/components/Footer"
import Form from "@/components/Form"
import Info from "@/components/Info"
import Overlay from "@/components/Overlay"
import Title from "@/components/Title"
import PixelTrail from "@/components/fancy/pixel-trail"
import { useGetCrushes } from "@/lib/hooks"

export default function Home() {
  const crushesData = useGetCrushes()

  return (
    <main className="font-kosugi-maru min-h-screen p-6 lg:p-20 text-black">
      <Overlay />
      <Title />
      <Info />
      <Form />

      <div className="fixed top-0 right-0 left-0 bottom-0">
        <div className="inset-0 w-screen h-screen">
          <Chamber />
        </div>
      </div>
      <div className=" mt-10 flex flex-row flex-wrap gap-2">
        {crushesData.data?.map((crush, index) => (
          <Crush index={index} key={index} crush={crush} />
        ))}
      </div>
      <Footer />
      <PixelTrail pixelSize={16} pixelClassName="bg-light_pink" />
    </main>
  )
}
