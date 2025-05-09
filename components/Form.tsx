import { useRefreshCrushData } from "@/lib/hooks"
import { useCallback, useEffect, useState } from "react"
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
  const [isRateLimited, setIsRateLimited] = useState(false)

  const { refreshAll } = useRefreshCrushData();

  useEffect(() => {
    function checkRateLimit() {
      const submittedTimestamp = localStorage.getItem('crushSubmitted')

      if (submittedTimestamp) {
        const expirationTime = Number.parseInt(submittedTimestamp)

        if (expirationTime > Date.now()) {
          // Still rate limited
          setIsRateLimited(true)
        } else {
          // Clear expired timestamp
          localStorage.removeItem('crushSubmitted')
          setIsRateLimited(false)
        }
      } else {
        setIsRateLimited(false)
      }
    }
    checkRateLimit()


    const interval = setInterval(checkRateLimit, 60000) // Check every min
    return () => clearInterval(interval)
  }, [])


  function handleInitialsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toUpperCase()
    setInitials(value)

    if (hasAttemptedSubmit) {
      const isValid = /^[A-Za-z]{2}$/.test(value)
      if (isValid) {
        setError("")
      }
    }
  }

  useEffect(() => {
    let hideTimer: NodeJS.Timeout
    let refreshTimer: NodeJS.Timeout

    if (showThankYou) {
      hideTimer = setTimeout(() => {
        setHideForm(true)
      }, 5000)

      refreshTimer = setTimeout(() => {
        refreshAll()
      }, 5000)
    }

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(refreshTimer)
    }
  }, [showThankYou, refreshAll])

  const handleSubmit = useCallback(async () => {
    setHasAttemptedSubmit(true)

    if (isRateLimited) {
      return
    }

    const isValidInitials = /^[A-Za-z]{2}$/.test(initials)

    if (!isValidInitials) {
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
          contractAddress: "0x9B3249313741fa8599dfF15455AD2545c36543dB",
          chainId: 8453,
          functionSignature: "addCrush(bytes2 _initials)",
          args: { _initials: bytes2Hex }
        })
      })

      // Set rate limiting for 1 hour
      const expirationTime = Date.now() + (60 * 60 * 1000)
      localStorage.setItem('crushSubmitted', expirationTime.toString())
      setIsRateLimited(true)

      setInitials("")
      setShowThankYou(true)
    } catch (error) {
      console.error("Error sending transaction:", error)
      setError("Failed to submit crush. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }, [
    initials,
    honeypot,
    isRateLimited,

  ])

  if (hideForm) {
    return null
  }


  if (isRateLimited) {
    return (
      <div className="flex flex-col gap-2 items-start z-50 relative text-sm">
        <section className="inline-flex flex-col items-center gap-2 text-black bg-gradient backdrop-blur-sm bg-[#ffffffa1] relative lg:mt-30 rounded-lg p-4 border border-dashed border-[#003fff]">
          <span className="text-center w-full leading-none">
            You may submit another crush in 1 hour
          </span>
        </section>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-2 items-start z-50 relative text-base lg:text-3xl ">
      {showThankYou ? (
        <div className="inline-flex flex-col items-center justify-center gap-2 text-black bg-white/80 border-white border backdrop-blur-sm relative mt-30 z-40 rounded-lg p-4 text-center animate-fade-out">
          <span className="font-bold text-xl">
            THANKS FOR YOUR SUBMISSION, your crush will be live in a moment
          </span>
        </div>
      ) : (
        <>
          <section className="inline-flex flex-col items-start gap-2 text-black bg-gradient backdrop-blur-sm bg-[#ffffffa1] relative lg:mt-30 rounded-lg p-2 max-w-[40ch] border border-dashed border-[#003fff]">
            <span>
              <span className="italic block text-xl">submit your crush</span>
              <label htmlFor="initials" className="leading-none text-base">only 1 crush allowed per hour per computer. <br /> you + your crush's initials:</label>
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