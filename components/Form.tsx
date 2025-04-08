import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { padHex, stringToHex } from "viem"
import Cupid1 from "./icons/Cupid1"

export default function Form() {
  const [initials, setInitials] = useState("")
  const [error, setError] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [hideForm, setHideForm] = useState(false)

  const queryClient = useQueryClient()

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

  useEffect(() => {
    let hideTimer: NodeJS.Timeout

    if (showThankYou) {
      // Set timer to hide the form after 5 seconds
      hideTimer = setTimeout(() => {
        setHideForm(true)
      }, 5000)
    }

    return () => {
      clearTimeout(hideTimer)
    }
  }, [showThankYou])

  const handleSubmit = async () => {
    setHasAttemptedSubmit(true)
    if (!validateInitials(initials)) {
      setError("Enter 2 letters")
      return
    }
    if (honeypot) return

    setIsSubmitting(true)

    const bytes2Hex = padHex(stringToHex(initials), { size: 2 })

    try {
      await fetch("https://api.syndicate.io/transact/sendTransaction", {
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
      })

      const currentCrushes =
        queryClient.getQueryData<string[]>(["crushes"]) || []
      queryClient.setQueryData(["crushes"], [initials, ...currentCrushes])

      setInitials("")
      setShowThankYou(true)
    } catch (error) {
      console.error("Error sending transaction:", error)
      setError("Failed to submit crush. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (hideForm) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 items-start z-50 relative text-3xl ">
      {showThankYou ? (
        <div className="inline-flex flex-col items-center justify-center gap-2 text-black border border-black backdrop-blur-sm relative mt-30 z-40 rounded-lg p-4 text-center animate-fade-out">
          <span className="font-bold text-xl">
            THANKS FOR YOUR SUBMISSION, your crush is now live{" "}
          </span>
        </div>
      ) : (
        <>
          <section className="inline-flex flex-col items-start gap-2 text-black border border-black backdrop-blur-sm relative mt-30 z-40 rounded-lg p-2">
            <span>
              <span className="italic block">submit your crush</span>
              <label htmlFor="initials">you + your crush's initials:</label>
            </span>
            <div className="inline-flex flex-row gap-2">
              <input
                id="initials"
                type="text"
                maxLength={2}
                value={initials}
                placeholder="XX"
                onChange={handleInitialsChange}
                className="block focus-within:outline-none border border-black text-red rounded-lg uppercase p-[0.5] text-3xl tracking-widest w-12 text-center font-bold"
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              >
                <Cupid1
                  className={`size-8 rotate-30 ${isSubmitting ? "opacity-50" : ""}`}
                />
              </button>
            </div>
          </section>
          {hasAttemptedSubmit && error && (
            <span className="text-red-600 mt-1 z-40 relative bg-white text-base">
              {error}
            </span>
          )}
        </>
      )}
    </div>
  )
}
