"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createClient } from "viem"
import { baseSepolia } from "viem/chains"
import { http, WagmiProvider, createConfig } from "wagmi"

const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http()
  }
})

export const publicClient = createClient({
  chain: baseSepolia,
  transport: http()
})

const queryClient = new QueryClient()
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
