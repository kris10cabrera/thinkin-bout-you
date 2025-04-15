"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createPublicClient } from "viem"
import { baseSepolia } from "viem/chains"
import { http, WagmiProvider, createConfig } from "wagmi"

const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http()
  }
})

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(
    `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  )
})

const queryClient = new QueryClient()
export default function Providers({ children }: { children: React.ReactNode }) {
  console.log(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
