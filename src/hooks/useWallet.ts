import { useCallback, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useToast } from '@/components/hooks/use-toast'

export type WalletType = 'metamask' | 'okx' | 'unisat' | null

interface WalletError extends Error {
  code?: number;
  data?: unknown;
}

export function useWallet() {
  const { address, isConnected, connector } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const { connectAsync, connectors } = useConnect()
  const { toast } = useToast()
  const [ unisatAddress, setUnisatAddress ] = useState<string | null>(null)
  const [ unisatConnected, setUnisatConnected ] = useState(false)

  const handleWalletError = (error: WalletError) => {
    let message = '连接钱包失败'
    
    // MetaMask 错误码处理
    if (error.code) {
      switch (error.code) {
        case 4001:
          message = '用户拒绝了连接请求'
          break
        case -32002:
          message = '钱包已经在处理连接请求，请检查钱包'
          break
        case -32603:
          message = '钱包内部错误'
          break
      }
    }

    // UniSat 特定错误处理
    if (error.message?.includes('User rejected')) {
      message = '用户拒绝了连接请求'
    }

    toast({
      variant: "destructive",
      title: "错误",
      description: message,
    })
  }

  const connectWallet = useCallback(async (type: WalletType) => {
    if (!type) return
    
    try {
      await disconnectAsync()
      
      switch (type) {
        case 'metamask':
          const metamaskConnector = connectors.find(connector => connector.id === 'io.metamask')
          if (!window.ethereum || !metamaskConnector) {
            toast({
              variant: "destructive",
              title: "错误",
              description: "请先安装 MetaMask 钱包",
            })
            return
          }
          if (metamaskConnector) {
            await connectAsync({
              connector: metamaskConnector,
            })
          }
          break
          
        case 'okx':
          const okxConnector = connectors.find(connector => connector.id === 'com.okex.wallet')
          if (!window.ethereum || !okxConnector) {
            toast({
              variant: "destructive",
              title: "错误",
              description: "请先安装 OKX 钱包",
            })
            return
          }
          if (okxConnector) {
            await connectAsync({
              connector: okxConnector,
            })
          }
          break
          
        case 'unisat':
          if (typeof window === 'undefined' || !window.unisat) {
            toast({
              variant: "destructive",
              title: "错误",
              description: "请先安装 UniSat 钱包",
            })
            return
          }
          try {
            const accounts = await window.unisat.requestAccounts()
            if (!accounts || accounts.length === 0) {
              throw new Error('No accounts returned')
            }
            setUnisatAddress(accounts[0])
            setUnisatConnected(true)
          } catch (error) {
            handleWalletError(error as WalletError)
            return
          }
          break
      }
      
      toast({
        title: "成功",
        description: "钱包连接成功",
      })
    } catch (error) {
      handleWalletError(error as WalletError)
    }
  }, [disconnectAsync, connectAsync, connectors, toast])

  const disconnectWallet = useCallback(async () => {
    try {
      await disconnectAsync()
      setUnisatAddress(null)
      setUnisatConnected(false)
      toast({
        title: "成功",
        description: "钱包已断开连接",
      })
    } catch {
      toast({
        variant: "destructive",
        title: "错误",
        description: "断开连接失败",
      })
    }
  }, [disconnectAsync, toast])

  return {
    connector: unisatConnected ? { id: 'unisat', name: 'Unisat Wallet' } : connector,
    address: unisatConnected ? unisatAddress : address,
    isConnected: unisatConnected || isConnected,
    connectWallet,
    disconnectWallet,
  }
}