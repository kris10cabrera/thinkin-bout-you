import { useState } from "react"
import { padHex, stringToHex } from "viem"
import Cupid1 from "./icons/Cupid1"

export default function Form() {
  const [initials, setInitials] = useState("")

  const handleSubmit = async () => {
    const bytes2Hex = padHex(stringToHex(initials), { size: 2 })

    try {
      const response = await fetch(
        "https://api.syndicate.io/transact/sendTransaction",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer 1OtI2XkIRvgqjzq07Kw3",
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            projectId: "2c3cff3e-e3da-41d1-83d5-b1e9e6e425b8",
            contractAddress: "0x92ffa823b1C167285ee03593FEc67F0aD4dF0fFf",
            chainId: 84532,
            functionSignature: "addCrush(bytes2 _initials)",
            args: {
              _initials: bytes2Hex
            }
          })
        }
      )

      const data = await response.json()
      console.log("CRUSH IS LIVE:", data)
    } catch (error) {
      console.error("Error sending transaction:", error)
    }
  }

  return (
    <section className=" items-center relative mt-30 z-40 bg-white/60 p-4 backdrop-blur-sm">
      <label htmlFor="initials">your initials</label>
      <input
        id="initials"
        type="text"
        maxLength={2}
        value={initials}
        onChange={(e) => setInitials(e.target.value)}
        className="block focus-within:outline-none border border-black rounded-sm uppercase p-[0.5] text-3xl tracking-widest w-12 text-center font-bold"
      />

      <button
        className="bg-black text-white rounded px-2 text-md mt-2 uppercase"
        onClick={handleSubmit}
        type="button"
      >
        <Cupid1 />
        sign your love
      </button>
    </section>
  )
}
