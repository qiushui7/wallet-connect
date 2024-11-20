'use client'
import { config } from '@/config/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient()

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
