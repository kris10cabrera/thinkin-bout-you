"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { http, createPublicClient } from "viem"
import { base } from "viem/chains"
import { WagmiProvider, createConfig } from "wagmi"

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(
      `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    )
  }
})

export const publicClient = createPublicClient({
  chain: base,
  transport: http(
    `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  )
})

const queryClient = new QueryClient()
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
