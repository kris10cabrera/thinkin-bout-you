import { useState } from "react"
import { padHex, stringToHex } from "viem"
import Cupid1 from "./icons/Cupid1"

export default function Form() {
  const [initials, setInitials] = useState("")
  const [error, setError] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  const validateInitials = (value: string): boolean => {
    return /^[A-Za-z]{2}$/.test(value)
  }

  const handleInitialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setInitials(value)

    if (hasAttemptedSubmit && validateInitials(value)) {
      setError("")
    }
  }

  const handleSubmit = async () => {
    setHasAttemptedSubmit(true)
    if (!validateInitials(initials)) {
      setError("Enter 2 letters")
      return
    }
    if (honeypot) return

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
            args: { _initials: bytes2Hex }
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
    <div className="flex flex-col gap-2 items-start">
      <section className="inline-flex flex-col items-start gap-2 text-black border border-black relative mt-30 z-40 rounded-lg p-2">
        <label htmlFor="initials ">you + your crush's initials:</label>
        <div className="inline-flex flex-row gap-2">
          <input
            id="initials"
            type="text"
            maxLength={2}
            value={initials}
            placeholder="XX"
            onChange={handleInitialsChange}
            className="block focus-within:outline-none border border-black text-black rounded-lg uppercase p-[0.5] text-3xl tracking-widest w-12 text-center font-bold"
          />

          <div className="flex flex-row gap-2 items-center">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="hover:scale-125 transition:transform duration-300 ease-in-out rotate-[30deg]"
          >
            <Cupid1 className="size-8 rotate-30" />
          </button>
        </div>
      </section>
      {hasAttemptedSubmit && error && (
        <span className="text-black mt-1 z-40 relative bg-white text-base">
          {error}
        </span>
      )}
    </div>
  )
}
