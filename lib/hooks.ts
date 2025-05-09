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

const CONTRACT_ADDRESS = "0x9B3249313741fa8599dfF15455AD2545c36543dB"

export function useGetCrushCount() {
  return useQuery({
    queryKey: ["crushCount"],
    queryFn: async () => {
      try {
        const data = await readContract(publicClient, {
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi,
          functionName: "crushCount",
          args: []
        })
        return Number(data)
      } catch (error) {
        console.error("Error fetching crush count:", error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000 // 5 mins
  })
}

export function useGetCrushes() {
  return useQuery({
    queryKey: ["crushes"],
    queryFn: async () => {
      try {
        const crushes = await readContract(publicClient, {
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi,
          functionName: "getCrushes",
          args: [BigInt(1), BigInt(333)]
        })

        return Array.isArray(crushes)
          ? crushes.filter((crush) => crush !== "").reverse()
          : []
      } catch (error) {
        console.error("Error fetching crushes:", error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000 // 5 mins
  })
}

export function useRefreshCrushData() {
  const crushCountQuery = useGetCrushCount()
  const crushesQuery = useGetCrushes()

  const refreshAll = () => {
    crushCountQuery.refetch()
    crushesQuery.refetch()
  }

  return {
    refreshAll,
    isRefreshing: crushCountQuery.isFetching || crushesQuery.isFetching
  }
}
