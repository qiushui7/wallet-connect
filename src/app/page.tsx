'use client'

import { ConnectButton } from '@/components/ConnectButton'
import Providers from '@/providers'

export default function Home() {
  return (
    <Providers>
      <main className="min-h-screen flex items-center justify-center">
        <ConnectButton />
      </main>
    </Providers>
  )
} 