interface Window {
  unisat?: {
    requestAccounts: () => Promise<string[]>
    getAccounts: () => Promise<string[]>
    getNetwork: () => Promise<string>
    switchNetwork: (network: string) => Promise<void>
  }
} 