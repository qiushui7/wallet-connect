import { WalletType } from "@/hooks/useWallet"

interface WalletInfo {
  type: WalletType
  name: string
  icon?: string
}

export const WALLET_LIST: WalletInfo[] = [
  {
    type: 'metamask',
    name: 'MetaMask',
  },
  {
    type: 'okx',
    name: 'OKX Wallet',
  },
  {
    type: 'unisat',
    name: 'UniSat',
  },
]

export const getWalletName = (type: WalletType): string => {
  const wallet = WALLET_LIST.find(w => w.type === type)
  return wallet?.name || '未知钱包'
} 