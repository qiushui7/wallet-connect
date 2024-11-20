'use client'

import { WalletType } from '@/hooks/useWallet'
import { WALLET_LIST } from '@/constants/wallet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectWallet: (type: WalletType) => void
}

export function WalletModal({ isOpen, onClose, onSelectWallet }: WalletModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>选择钱包</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {WALLET_LIST.map((wallet) => (
            <button
              key={wallet.type}
              className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => {
                onSelectWallet(wallet.type)
                onClose()
              }}
            >
              {wallet.icon && (
                <img 
                  src={wallet.icon} 
                  alt={wallet.name} 
                  className="w-6 h-6 mr-3"
                />
              )}
              <span>{wallet.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 