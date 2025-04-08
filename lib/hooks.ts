import { publicClient } from "@/app/providers"
import { useQuery } from "@tanstack/react-query"
import { type RefObject, useEffect, useState } from "react"
import { readContract } from "viem/actions"
import { abi } from "./abi"

interface Dimensions {
  width: number
  height: number
}

export function useDimensions(
  ref: RefObject<HTMLElement | SVGElement>
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [ref])

  return dimensions
}

const CONTRACT_ADDRESS = "0x92ffa823b1C167285ee03593FEc67F0aD4dF0fFf"

export function useGetCrush() {
  return useQuery({
    queryKey: ["crush"],
    queryFn: async () => {
      const data = await readContract(publicClient, {
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "getCrush",
        args: [BigInt(0)]
      })
      return data
    }
  })
}

export function useGetCrushCount() {
  return useQuery({
    queryKey: ["crushCount"],
    queryFn: async () => {
      const data = await readContract(publicClient, {
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "getCrushCount",
        args: []
      })
      return Number(data)
    }
  })
}

export function useGetCrushes() {
  return useQuery({
    queryKey: ["crushes"],
    queryFn: async () => {
      const crushCount = await readContract(publicClient, {
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "getCrushCount",
        args: []
      })
      const crushes = await Promise.all(
        Array.from({ length: Number(crushCount) }, (_, index) =>
          readContract(publicClient, {
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "getCrush",
            args: [BigInt(index)]
          })
        )
      )
      return crushes.filter((crush) => crush !== "").reverse()
    }
  })
}
