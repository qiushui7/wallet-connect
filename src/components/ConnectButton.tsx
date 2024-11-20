'use client'

import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { WalletModal } from './WalletModal'
import { Button } from '@/components/ui/button'

export function ConnectButton() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { connector, address, isConnected, connectWallet, disconnectWallet } = useWallet()

  return (
    <>
      {isConnected ? (
        <Button
          variant="destructive"
          onClick={disconnectWallet}
        >
          {connector && connector.name} ({address?.slice(0, 6)}...{address?.slice(-4)})
        </Button>
      ) : (
        <Button
          onClick={() => setIsModalOpen(true)}
        >
          连接钱包
        </Button>
      )}

      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectWallet={connectWallet}
      />
    </>
  )
} 