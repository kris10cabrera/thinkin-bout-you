"use client"
import Image from "next/image"

import Chamber from "@/components/chamber"
import dynamic from "next/dynamic"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="font-kosugi-maru min-h-screen p-8 pb-20 gap-16 sm:p-20 text-red">
      <main className="">
        <h1 className="font-tram text-8xl text-red">are you in love?</h1>
        <p className="leading-none max-w-64">
          carve your names into this website to celebrate your love, forever.
          accepting 333 crushes total.
        </p>
        <div className=" px-2 py-1 rounded-full font-kosugi-maru text-sm">
          enamorarme es bien fácil, pero olvidarme es difícil{" "}
          <span className="uppercase italic text-xs">- bad bunny</span>
        </div>
        <Chamber />
      </main>
    </div>
  )
}
